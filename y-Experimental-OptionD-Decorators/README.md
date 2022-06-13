# Option 3

Decorators! We have two options:

- [TypeScript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html): These are experimental, but somewhat commonly used. Unfortunately, they are unlikely to become non-experimental because Node.js decorators will be recommended eventually instead
- [Node.js Decorators](https://github.com/tc39/proposal-decorators): Currently a Stage 3 proposal. No idea when it will be finalized, but this will likely be the long term future of decorators in Node.js.

Our current plan is to offer this option as a "preview" or "experimental" programming model at the time we GA the "real" programming model. This is because we expect high demand for this and see it as a long term solution, but just can't do it as the "real" option because of state of decorators in Node.js/TypeScript. For this reason, we will delay some effort on this option until we have made more progress on the "real" programming model.
