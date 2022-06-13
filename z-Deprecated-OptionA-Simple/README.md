# Option 4

**Deprecated**: Note we have removed this option from consideration because it doesn't provide enough functionality around Intellisense, etc. However, keep in mind the `@azure/functions-core` api will very closely match this option so users could theoretically still structure their code like this if they reference the core api directly.

Simplest option that should let you copy/paste your function.json config into a typescript/javascript file. For that reason, it does not have it's own "new" types folder - it is still using the old types package.

Also the option with the least amount of helpful features, like intellisense.
