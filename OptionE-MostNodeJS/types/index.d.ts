declare module "@azure/functions-newE" {
  export namespace app {
    export function registerHttpFunction(
      name: string,
      callback: HttpCallback
    ): void;
    export function registerHttpFunction(
      name: string,
      triggerOverrides: Partial<HttpTriggerBinding>,
      callback: HttpCallback
    ): void;
    export function registerHttpFunction(
      name: string,
      additionalInputBindings: GenericBinding[],
      callback: HttpCallback
    ): void;
    export function registerHttpFunction(
      name: string,
      triggerOverrides: Partial<HttpTriggerBinding>,
      bindings: GenericBinding[],
      callback: HttpCallback
    ): void;
  }

  export type HttpFunctionContext = InvocationContext & {
    req: HttpRequest;
    send: (body: string) => void;
    status: (statusCode: number) => void;
    json: (body: any) => void;
  };

  /**
   * Just a thought: To simplify the callback, what if only the triggerInput gets passed as an arg, and all other input bindings have to be accessed on `context`
   */
  export type HttpCallback = (context: HttpFunctionContext, ...args: any) => FunctionResult;

  export type FunctionResult = Promise<any> | void; // todo

  export class HttpResponse {
    [key: string]: any; // todo
  }

  export class HttpRequest {
    [key: string]: any; // todo
  }

  export interface InvocationContext {
    [key: string]: any; // todo

    inputs: any[]; // I chose "inputs" to be consistent with "inputbinding", but this could be args instead
  }

  // #region bindings

  export interface Binding {
    name: string;
  }

  export interface InputBinding extends Binding {}

  export interface OutputBinding extends Binding {
    name: "$return" | string; // todo does adding '$return' actually help with Intellisense?
  }

  export interface HttpTriggerBinding extends InputBinding {
    /**
     * The function HTTP authorization level.
     */
    authLevel: "anonymous" | "function" | "admin";

    methods?: (
      | "get"
      | "post"
      | "delete"
      | "head"
      | "patch"
      | "put"
      | "options"
      | "trace"
    )[]; // todo is this optional?

    route: string;
  }

  export interface GenericBinding extends Binding {
    [key: string]: any;
  }

  // #endregion bindings
}
