declare module "@azure/functions-newE" {
  export namespace app {
    // Per the express docs, "get", "put", "post", and "delete" are "the most popular HTTP methods"
    // https://expressjs.com/en/4x/api.html#app.METHOD
    export function get(route: string, callback: HttpCallback): void;
    export function put(route: string, callback: HttpCallback): void;
    export function post(route: string, callback: HttpCallback): void;
    // todo: 'delete' is a reserved word. What should we name this?
    // export function delete(name: string, callback: HttpCallback): void;

    // todo decide on name
    export function timer(schedule: string, callback: TimerCallback): void;
    export function setInterval(schedule: string, callback: TimerCallback): void;
    export function schedule(schedule: string, callback: TimerCallback): void;

    // long-hand for `app.get` methods
    export function registerHttpFunction(name: string, callback: HttpCallback): void;
    export function registerHttpFunction(name: string, options: HttpOptions, callback: HttpCallback): void;
  }

  export type HttpCallback = (context: InvocationContext, req: HttpRequest, res: HttpResponse, ...inputs: any) => FunctionResult;

  export interface HttpOptions {
    trigger?: Partial<HttpTriggerBinding>;
    inputBindings?: GenericBinding[];
    outputBindings?: GenericBinding[];
  }

  export type TimerCallback = (context: InvocationContext, myTimer: Timer, ...inputs: any) => FunctionResult;

  export interface Timer {
    isPastDue: boolean;
  }

  export type FunctionResult = Promise<any> | void; // todo

  export class HttpResponse {
    send: (body: string) => void;
    status: (statusCode: number) => void;
    json: (body: any) => void;
  }

  export class HttpRequest {
    [key: string]: any; // todo
  }

  export interface InvocationContext {
    invocationId: string;

    log(...data: any[]): void;
  }

  // #region bindings

  export interface Binding {
    name: string;
  }

  export interface InputBinding extends Binding { }

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
