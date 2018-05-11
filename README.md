# eslint-import-resolver-nuxt-import
Solves the problem with unresolved imports in Nuxt.js with Eslint

## Installation
**[Node.js](https://nodejs.org/) 8.0.0 or newer is required**

### Yarn
Recommended
```shell
yarn add eslint-import-resolver-nuxt-import
```

### NPM
```shell
npm install eslint-import-resolver-nuxt-import --save
```

## Usage
Config is passed directly through to resolve as options:

```json
"settings": {
	"import/resolver": {
		"nuxt-import": {}
	}
}
```

Set default extensions
```json
"settings": {
	"import/resolver": {
		"nuxt-import": {
			"extensions": [".mjs", ".js", ".vue", ".graphql", ".json"]
		}
	}
}
```
