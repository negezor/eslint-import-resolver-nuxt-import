import createDebug from 'debug';
import requireResolve from 'resolve';

import nodePath from 'path';

import { defaultOptions } from './utils/constants';
import { assignDefaultOptions } from './utils/helpers';

const debug = createDebug('eslint-plugin-import:resolver:nuxt-import');

export const interfaceVersion = 2;

let firstCall = true;

export function resolve(source, file, pluginOptions = {}) {
	if (requireResolve.isCore(source)) {
		return {
			found: true,
			path: null
		};
	}

	const options = assignDefaultOptions(defaultOptions, pluginOptions);

	if (firstCall) {
		firstCall = false;

		debug('Options', options);
	}

	debug('Source', source, 'File', file);

	let { rootDir, srcDir } = options.config;

	if (rootDir === null) {
		rootDir = process.cwd();
	} else if (!nodePath.isAbsolute(rootDir)) {
		rootDir = nodePath.join(process.cwd(), rootDir);
	}

	if (srcDir === null) {
		srcDir = rootDir;
	} else if (!nodePath.isAbsolute(srcDir)) {
		srcDir = nodePath.join(rootDir, srcDir);
	}

	let realSource = source;
	if (source.startsWith('~~') || source.startsWith('@@')) {
		realSource = nodePath.join(rootDir, source.substring(2));
	} else if (source.startsWith('~') || source.startsWith('@')) {
		realSource = nodePath.join(srcDir, source.substring(1));
	}

	try {
		const resolvedPath = requireResolve.sync(realSource, {
			extensions: options.extensions,

			basedir: nodePath.dirname(nodePath.resolve(file)),
			packageFilter(pkg) {
				const key = 'jsnext:main';

				if (pkg[key]) {
					pkg.main = key;
				}

				return pkg;
			}
		});

		debug('ResolvedPath', resolvedPath);

		return {
			found: true,
			path: resolvedPath
		};
	} catch (e) {
		debug('error', e);

		return {
			found: false
		};
	}
}
