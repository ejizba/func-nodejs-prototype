# ✨ New ✨ programming model for Node.js Azure Functions

See [this rollup issue](https://github.com/Azure/azure-functions-nodejs-worker/issues/480) for more information on our general goals and plan of action. This repo specifically contains prototypes for the last bullet point in the "plan of action".

## Code in this repo

- `src/main.ts`: The main entrypoint for a sample TypeScript app. The file name/path can be configured by the user by changing the `main` field in `package.json`.
- `src/functions/`: The source code for each function. This is purely an example and users can put code wherever they want.
- `types/index.d.ts`: Types for a new [programming model package](https://github.com/Azure/azure-functions-nodejs-worker/issues/568). This file will eventually ship as a part of our npm package and will not be controlled by the user.
