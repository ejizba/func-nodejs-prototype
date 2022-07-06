/**
 * NOTE: This file is necessary to get intellisense working during the prototype phase
 * Eventually, this file will be included in an npm package instead of in the project directly
 */

/**
 * Azure Functions Option 1
 */
declare module '@azure/functions-option1' {
    /**
     * The root namespace for performing operations on your Azure Function App
     * This is a work-in-progress prototype and only essential/noteworthy pieces were included at this time
     */
    export namespace app {
        /**
         * Registers a function in your app. This must be done during app startup
         * @param name The name of the function. For an http trigger, this will be the route unless a route is explicitly configured on the `HttpInputBinding`
         * @param bindings An array of bindings configuring the inputs and outputs of this function
         * @param callback The callback to use when the function is triggered
         */
        export function registerFunction(name: string, bindings: Binding[], callback: FunctionCallback): Function;
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
    };

    export type FunctionCallback = (context: InvocationContext) => Promise<void>;

    /**
     * Base class for all bindings
     */
    export abstract class Binding {

    }

    /**
     * Base class for all http bindings
     */
    export abstract class HttpBinding extends Binding {

    }

    export class HttpInputBinding extends HttpBinding {
        /**
         * Configure an http input binding, to be passed in when registering a function
         */
        constructor(options?: HttpInputBindingOptions);

        /**
         * Get the http request during invocation
         */
        get(context: InvocationContext): HttpRequest;
    }

    export class TimerInputBinding extends Binding {
        /**
         * Configure a timer input binding, to be passed in when registering a function
         */
        constructor(options: TimerInputBindingOptions);

        /**
         * Get the timer metadata during invocation
         */
        get(context: InvocationContext): Timer;
    }

    export class HttpOutputBinding extends HttpBinding {
        /**
         * Configure an http output binding, to be passed in when registering a function
         */
        constructor(options?: HttpOutputBindingOptions);

        /**
         * Set the http response output during invocation
         */
        set(context: InvocationContext, response: HttpResponse): void;
    }

    export class QueueInputBinding extends Binding {
        /**
         * Configure a queue input binding, to be passed in when registering a function
         */
        constructor(options: QueueBindingOptions);

        /**
         * Get the queue entry during invocation
         */
        get(context: InvocationContext): any;
    }

    export class QueueOutputBinding extends Binding {
        /**
         * Configure a queue output binding, to be passed in when registering a function
         */
        constructor(options: QueueBindingOptions);

        /**
         * Set the queue entry output during invocation
         */
        set(context: InvocationContext, queueItem: any): void;
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

    /**
     * At the moment no options are supported for an http output
     */
    export interface HttpOutputBindingOptions {
    }

    export interface QueueBindingOptions {
        /**
         * The queue name
         */
        queueName: string;

        /**
         * An app setting (or environment variable) with the storage connection string to be used by this binding.
         */
        connection: string;
    }

    export interface HttpInputBindingOptions {
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
        route?: string;
    }

    export interface TimerInputBindingOptions {
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

    export interface HttpResponse {
        /**
         * HTTP response headers.
         */
        headers?: HttpResponseHeaders;

        /**
         * HTTP response body.
         */
        body?: any;

        /**
         * HTTP response status code.
         * @default 200
         */
        statusCode?: number | string;
    }
}
