/**
 * NOTE: This file is necessary to get intellisense working during the prototype phase
 * Eventually, this file will be included in an npm package instead of in the project directly
 */

/**
 * Azure Functions Option 3
 */
declare module "@azure/functions-option3" {
    /**
     * The root namespace for performing operations on your Azure Function App
     * This is a work-in-progress prototype and only essential/noteworthy pieces were included at this time
     */
    export namespace app {
        /**
         * Registers an http function in your app that will be triggered by making a "get" request to the function url
         *
         * Shorthand for `registerHttpFunction`, with several defaults already chosen
         */
        export function get(route: string, callback: HttpCallback): void;

        /**
         * Registers an http function in your app that will be triggered by making a "put" request to the function url
         *
         * Shorthand for `registerHttpFunction`, with several defaults already chosen
         */
        export function put(route: string, callback: HttpCallback): void;

        /**
         * Registers an http function in your app that will be triggered by making a "post" request to the function url
         *
         * Shorthand for `registerHttpFunction`, with several defaults already chosen
         */
        export function post(route: string, callback: HttpCallback): void;

        // Per the express docs, "get", "put", "post", and "delete" are "the most popular HTTP methods"
        // https://expressjs.com/en/4x/api.html#app.METHOD
        // todo: 'delete' is a reserved word. What should we name this?
        // export function delete(name: string, callback: HttpCallback): void;

        /**
         * Registers a timer function in your app that will be triggered on a schedule
         *
         * Shorthand for `registerTimerFunction`, with several defaults already chosen
         */
        export function timer(schedule: string, callback: TimerCallback): void;
        /**
         * Another option for the `timer` shorthand name
         */
        export function setInterval(schedule: string, callback: TimerCallback): void;
        /**
         * Another option for the `timer` shorthand name
         */
        export function schedule(schedule: string, callback: TimerCallback): void;

        /**
         * Registers an http function in your app that will be triggered by making a request to the function url
         * @param name The name of the function. This will be the route unless a route is explicitly configured in the `HttpOptions`
         * @param callback The callback to use when the function is triggered
         */
        export function registerHttpFunction(name: string, callback: HttpCallback): void;

        /**
         * Registers an http function in your app that will be triggered by making a request to the function url
         * @param name The name of the function. This will be the route unless a route is explicitly configured in the `HttpOptions`
         * @param options Configuration options describing the function's trigger, inputs, and outputs
         * @param callback The callback to use when the function is triggered
         */
        export function registerHttpFunction(name: string, options: HttpOptions, callback: HttpCallback): void;

        /**
         * Registers a timer function in your app that will be triggered on a schedule
         * @param name The name of the function. The name must be unique within your app and will mostly be used for your own tracking purposes
         * @param callback The callback to use when the function is triggered
         */
        export function registerTimerFunction(name: string, callback: TimerCallback): void;

        /**
         * Registers a timer function in your app that will be triggered on a schedule
         * @param name The name of the function. The name must be unique within your app and will mostly be used for your own tracking purposes
         * @param options Configuration options describing the function's trigger, inputs, and outputs
         * @param callback The callback to use when the function is triggered
         */
        export function registerTimerFunction(name: string, options: TimerOptions, callback: TimerCallback): void;

        /**
         * Registers a queue function in your app that will be triggered whenever an item is added to a storage queue
         * @param name The name of the function. The name must be unique within your app and will mostly be used for your own tracking purposes
         * @param options Configuration options describing the function's trigger, inputs, and outputs
         * @param callback The callback to use when the function is triggered
         */
        export function registerQueueFunction(name: string, options: QueueOptions, callback: QueueCallback): void;
    }

    export type HttpCallback = (context: InvocationContext, req: HttpRequest, res: HttpResponse, ...inputs: any) => FunctionResult;
    export type TimerCallback = (context: InvocationContext, myTimer: Timer, ...inputs: any) => FunctionResult;
    export type QueueCallback = (context: InvocationContext, queueItem: any, ...inputs: any) => FunctionResult;

    export interface HttpOptions {
        /**
         * The trigger for your function
         * Defaults to a ["get", "post"] request if not specified
         */
        trigger?: Partial<HttpInputBinding>;

        /**
         * Additional inputs to your function other than the trigger
         * There are no default inputs if not specified
         */
        inputBindings?: GenericBinding[];

        /**
         * The outputs of your function
         * Defaults to an http response output if not specified
         */
        outputBindings?: GenericBinding[];
    }

    export interface TimerOptions {
        /**
         * The trigger for your function
         * Defaults to a timer running every 5 minutes if not specified
         */
        trigger?: Partial<TimerInputBinding>;

        /**
         * Additional inputs to your function other than the trigger
         * There are no default inputs if not specified
         */
        inputBindings?: GenericBinding[];

        /**
         * The outputs of your function
         * There are no default outputs if not specified
         */
        outputBindings?: GenericBinding[];
    }

    export interface QueueOptions {
        /**
         * The trigger for your function
         * This is required for a queue input
         */
        trigger: QueueInputBinding;

        /**
         * Additional inputs to your function other than the trigger
         * There are no default inputs if not specified
         */
        inputBindings?: GenericBinding[];

        /**
         * The outputs of your function
         * There are no default outputs if not specified
         */
        outputBindings?: GenericBinding[];
    }


    /**
     * Metadata about a timer invocation
     * 
     * Work in progress: There are other options on a timer object that have not been listed out yet
     */
    export interface Timer {
        /**
         * Whether this timer invocation is due to a missed schedule occurrence.
         */
        isPastDue: boolean;
    }

    export type FunctionResult = Promise<any> | void; // todo

    export class HttpResponse {
        /**
         * Send the response with a given body
         */
        send: (body: string) => void;

        /**
         * Set the http response status code. If not specified, it will default to 200
         */
        status: (statusCode: number) => void;

        /**
         * Set the body to a json object and send the response
         */
        json: (body: any) => void;
    }

    export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'HEAD' | 'PATCH' | 'PUT' | 'OPTIONS' | 'TRACE' | 'CONNECT';

    /**
     * HTTP request headers
     */
    export interface HttpRequestHeaders {
        [name: string]: string;
    }

    /**
     * HTTP response headers
     */
    export interface HttpResponseHeaders {
        [name: string]: string;
    }

    /**
     * Query string parameter keys and values from the URL
     */
    export interface HttpRequestQuery {
        [name: string]: string;
    }

    /**
     * Route parameter keys and values
     */
    export interface HttpRequestParams {
        [name: string]: string;
    }

    /**
    * HTTP request object. Provided to your function when using HTTP Bindings
    */
    export interface HttpRequest {
        /**
         * HTTP request method used to invoke this function
         */
        method: HttpMethod;

        /**
         * Request URL
         */
        url: string;

        /**
         * HTTP request headers.
         */
        headers: HttpRequestHeaders;

        /**
         * Query string parameter keys and values from the URL
         */
        query: HttpRequestQuery;

        /**
         * Route parameter keys and values.
         */
        params: HttpRequestParams;

        /**
         * The raw HTTP request body without decoding to a string
         */
        rawBody?: Buffer;

        /**
         * The HTTP request body decoded to a string
         */
        body?: string;

        /**
         * The HTTP request body decoded to a string and then parsed as JSON
         */
        jsonBody?: any;
    }

    /**
     * Contains metadata and helper methods specific to this invocation
     */
    export type InvocationContext = {
        /**
         * A unique guid specific to this invocation
         */
        invocationId: string;

        /**
         * The name of the function that is being invoked.
         */
        functionName: string;

        /**
         * The recommended way to log data during invocation.
         * Similar to Node.js's `console.log`, but has better integration with Azure resources like application insights
         */
        log(...args: any[]): void;

        /**
         * A dictionary of output binding names and values
         */
        outputBindings: {
            [name: string]: any;
        }
    }

    // #region bindings

    export interface Binding {
        name: string;
    }

    export interface InputBinding extends Binding { }

    export interface OutputBinding extends Binding {
        /**
         * The name of the output binding used as the key in `context.outputBindings`
         */
        name: string;
    }

    export interface HttpInputBinding extends InputBinding {
        /**
         * The function HTTP authorization level.
         */
        authLevel: "anonymous" | "function" | "admin";

        /**
         * Defaults to ["get", "post"] if not specified
         */
        methods?: (
            | "get"
            | "post"
            | "delete"
            | "head"
            | "patch"
            | "put"
            | "options"
            | "trace"
        )[];

        /**
         * The route for this http input. If not specified, the function name will be used
         */
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
        /**
         * The queue name
         */
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
