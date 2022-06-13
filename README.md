# ✨ New ✨ programming model for Node.js Azure Functions

See [this rollup issue](https://github.com/Azure/azure-functions-nodejs-worker/issues/480) for more information on our general goals and plan of action. This repo specifically contains prototypes for the last bullet point in the "plan of action".

## Code in this repo

This repo has several different options, each following this general format:

- `Option<>/src/main.ts`: The main entrypoint for a sample TypeScript app
- `Option<>/types/index.d.ts`: Types for a new [programming model package](https://github.com/Azure/azure-functions-nodejs-worker/issues/568)

Here's a quick rundown of each option, but check the README in each "Option" folder for more details:

### In consideration

- OptionB: Rich classes for bindings. You get the best intellisense, but there's a decent overheard for our team to maintain the classes and for users to understand the classes.
- OptionC: Simple objects for bindings. We'll give intellisense where we can, but you won't instantiate a class at any point
- OptionE: The "Most Node.js" and "Least Azure Functions" option. We can always add this as an optional piece on top of the other options

### Experimental

- OptionD: Decorators: This option is still under consideration, but cannot be the GA option. See its README for more info.

### Deprecated

- OldOption: The existing programming model with no changes. Purely here for the sake of comparison.
- OptionA: The simplest programming model we can provide that still lets users define binding data in code.
