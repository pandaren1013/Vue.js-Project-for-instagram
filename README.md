<h1>
<div>Instagram</div>
</h1>

![Version](https://img.shields.io/badge/version-1.2.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-16.x-blue.svg)
[![Package - vue](https://img.shields.io/github/package-json/dependency-version/Longwater1234/wedemyclient/vue?color=blue)](https://www.npmjs.com/package/vue)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)](https://www.npmjs.com/package/vite)
[![License: MIT](https://img.shields.io/github/license/Longwater1234/WedemyClient)](https://github.com/Longwater1234/WedemyClient/blob/master/LICENSE)
[![Package - typescript](https://img.shields.io/github/package-json/dependency-version/Longwater1234/wedemyclient/dev/typescript?color=blue)](https://www.npmjs.com/package/typescript)

(Frontend Repo). Project built using Vue 3, Vite, Typescript, Pinia, and Element Plus.

### Disclaimer ⚠

> This project is an open-source project developed for Post purposes only. 

## Install

```sh
# Requires node 16.x or higher
npm install
```

## Usage

In local development, the app runs on port 5173 by default. You can change it in [vite.config.ts](vite.config.ts).
Create an `.env` file at project root and fill in appropriate values (see `.env.sample`).

```sh
npm run dev
```

For production, run `npm run build`, then follow official Vite guide
on [deployment](https://vitejs.dev/guide/static-deploy.html), depending on your hosting of choice. Remember to set ENV
variables on your target Cloud platform.
