# Option E

The main design points:
- Opinionated wrappers on the built-in triggers to provide the "most Node.js" feeling. You don't provide any configuration to it, instead we provide a default configuration for the HTTP trigger and output binding, using whatever we deem to be best practice.
- As a fallback, we provide primitive methods for registering functions (similar to Option A).
- Use an Express-like API for working with the request/response, like having a `send` method for a plain text response, or `json` for sending a JSON response.

See `src\main.ts` for all code samples. Everything is in one file for this sample, but the binding options or callback functions can always be moved to another file.
