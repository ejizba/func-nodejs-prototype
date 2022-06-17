declare module "@azure/functions-newE" {
  export namespace app {
    /**
     * Shorthand for `registerHttpFunction`, with several defaults chosen for the user
     */
    export function get(route: string, callback: HttpCallback): void;
    export function put(route: string, callback: HttpCallback): void;
    export function post(route: string, callback: HttpCallback): void;

    // Per the express docs, "get", "put", "post", and "delete" are "the most popular HTTP methods"
    // https://expressjs.com/en/4x/api.html#app.METHOD
    // todo: 'delete' is a reserved word. What should we name this?
    // export function delete(name: string, callback: HttpCallback): void;

    /**
     * Shorthand for `registerTimerFunction`, with several defaults chosen for the user
     */
    export function timer(schedule: string, callback: TimerCallback): void;
    export function setInterval(schedule: string, callback: TimerCallback): void;
    export function schedule(schedule: string, callback: TimerCallback): void;

    export function registerHttpFunction(name: string, callback: HttpCallback): void;
    export function registerHttpFunction(name: string, options: HttpOptions, callback: HttpCallback): void;

    export function registerTimerFunction(name: string, callback: TimerCallback): void;
    export function registerTimerFunction(name: string, options: TimerOptions, callback: TimerCallback): void;

    export function registerQueueFunction(name: string, options: QueueOptions, callback: QueueCallback): void;
  }

  export type HttpCallback = (context: InvocationContext, req: HttpRequest, res: HttpResponse, ...inputs: any) => FunctionResult;
  export type TimerCallback = (context: InvocationContext, myTimer: Timer, ...inputs: any) => FunctionResult;
  export type QueueCallback = (context: InvocationContext, queueItem: any, ...inputs: any) => FunctionResult;

  export interface HttpOptions {
    trigger?: Partial<HttpInputBinding>;
    inputBindings?: GenericBinding[];
    outputBindings?: GenericBinding[];
  }

  export interface TimerOptions {
    trigger?: Partial<TimerInputBinding>;
    inputBindings?: GenericBinding[];
    outputBindings?: GenericBinding[];
  }

  export interface QueueOptions {
    trigger?: Partial<QueueInputBinding>;
    inputBindings?: GenericBinding[];
    outputBindings?: GenericBinding[];
  }


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

    outputBindings: {
      [key: string]: any;
    }

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

  export interface HttpInputBinding extends InputBinding {
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

  export interface TimerInputBinding extends Binding {
    /**
     * A cron expression of the format '{second} {minute} {hour} {day} {month} {day of week}' to specify the schedule.
     */
    schedule: string;

    /**
     * When true, your timer function will be invoked immediately after a runtime restart and on-schedule thereafter.
     */
    runOnStartup?: boolean;

    /**
     * When true, schedule will be persisted to aid in maintaining the correct schedule even through restarts. Defaults to true for schedules with interval >= 1 minute.
     */
    useMonitor?: boolean;
  }

  export interface QueueBinding extends Binding {
    queueName: string;

    /**
     * An app setting (or environment variable) with the storage connection string to be used by this binding.
     */
    connection: string;
  }

  export interface QueueInputBinding extends QueueBinding, InputBinding { }

  export interface GenericBinding extends Binding {
    [key: string]: any;
  }

  // #endregion bindings
}
