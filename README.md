# ✨ New ✨ programming model for Node.js Azure Functions

See [this rollup issue](https://github.com/Azure/azure-functions-nodejs-worker/issues/480) for more information on our general goals and plan of action.

## Code In This Repo

This repo has two sample function apps. You can choose which app to run by switching the `main` field in `package.json`

- Simple app: Set `main` to `dist/src/index.js`. This is a very simple app with just an http and timer trigger all in one file.
- Complex app: Set `main` to `dist/src/functions/*.js`. This is a more complex app meant to demonstrate several different triggers where each function is in its own file.

## How to run

Details to be shared soon...