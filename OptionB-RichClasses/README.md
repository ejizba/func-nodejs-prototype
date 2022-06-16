# Option B

Basically, you create a new binding class before registering the function which means a bit more overhead, but you get better intellisense.

For example, let's compare to an http trigger with the old programming model. In the "function.json" file you define an output binding like this:
```json
{
    "type": "http",
    "direction": "out",
    "name": "res"
}
```

And in the "index.ts" file you set the output like this:
```typescript
context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage
};
```

In both cases, the name "res" _has_ to match, otherwise it won't work. The downside is, you will never get any build error or intellisense to help ensure those names match. With a rich class, you wouldn't have to set the name as a string anywhere. You will get build errors if you mispell the name of `resBinding` and you will get intellisense when you type `resBinding.`.

```typescript
const resBinding = new HttpOutputBinding();

...

resBinding.set(context, {
    // status: 200, /* Defaults to 200 */
    body: responseMessage
});
```