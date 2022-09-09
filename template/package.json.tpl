{
  "name": "{{{ name }}}",
  "version": "0.0.1",
  "description": "{{{ description }}}",
  "author": "{{{ author }}}",
  "keywords": [],
  "main": "./dist/index.umd.js",
  "module": "./dist/index.mjs",
  "unpkg": "dist/index.umd.js",
  "types": "./dist/index.d.ts",
  "license": "MIT",
  "files": [
    "dist"
  ],
  "sideEffects": [
    "*.css"
  ],
  "scripts": {
    "dev": "vite -c vite.config.preview.ts",
    "build": "run-p type-check build-only",
    "test": "vitest --environment jsdom",
    "build-only": "vite build",
    "build-watch": "vite build -w",
    "type-check": "vue-tsc --noEmit -p tsconfig.vitest.json --composite false",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "prepare": "husky install",
    "release": "standard-version",
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:deploy": "gh-pages -d docs/.vitepress/dist"
  },
  "dependencies": {
    "vue-demi": "^0.13.11"
  },
  "devDependencies": {
    "@commitlint/cli": "^17.1.2",
    "@commitlint/config-conventional": "^17.1.0",
    "@rushstack/eslint-patch": "^1.1.4",
    "@types/jsdom": "^20.0.0",
    "@types/node": "^16.11.56",
    "@vitejs/plugin-vue": "^3.0.3",
    "@vitejs/plugin-vue-jsx": "^2.0.1",
    "@vue/eslint-config-prettier": "^7.0.0",
    "@vue/eslint-config-typescript": "^11.0.0",
    "@vue/test-utils": "^2.0.2",
    "@vue/tsconfig": "^0.1.3",
    "eslint": "^8.22.0",
    "eslint-plugin-vue": "^9.3.0",
    "gh-pages": "^4.0.0",
    "husky": "^8.0.1",
    "jsdom": "^20.0.0",
    "lint-staged": "^13.0.3",
    "npm-run-all": "^4.1.5",
    "prettier": "^2.7.1",
    "standard-version": "^9.5.0",
    "typescript": "~4.7.4",
    "vite": "^3.0.9",
    "vite-plugin-dts": "^1.4.1",
    "vitest": "^0.23.0",
    "vue": "^3.2.38",
    "vue-tsc": "^0.40.7",
    "vitepress": "1.0.0-alpha.13"
  },
  "peerDependencies": {
    "@vue/composition-api": "^1.0.0-rc.1",
    "vue": "^2.0.0 || >=3.0.0"
  },
  "peerDependenciesMeta": {
    "@vue/composition-api": {
      "optional": true
    }
  },
  "commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
  },
  "lint-staged": {
    "*.{js,md,json}": [
      "prettier --write --ignore-unknown"
    ],
    "*.ts": [
      "prettier --parser=typescript --write"
    ]
  },
  "publishConfig": {
    "access": "public"
  }
}
