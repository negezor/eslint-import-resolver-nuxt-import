/**
 * Assign default options
 *
 * @param {Object} defaultOptions
 * @param {Object} options
 *
 * @return {Object}
 */
export const assignDefaultOptions = (defaultOptions, options) => (
	Object.assign({}, defaultOptions, ...[...Object.entries(options)].map(([key, value]) => ({
		[key]: typeof value === 'object'
			? Object.assign(defaultOptions[key], value)
			: value
	})))
);

export const someHelpers = () => {};
