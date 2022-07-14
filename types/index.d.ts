/**
 * NOTE: This file is necessary to get intellisense working during the prototype phase
 * Eventually, this file will be included in an npm package instead of in the project directly
 */

/**
 * Azure Functions programming model prototype
 */
declare module '@azure/functions-prototype' {
    /**
     * The root namespace for performing operations on your Azure Function App
     */
    export namespace app {
        /**
         * Registers an http function in your app that will be triggered by making a request to the function url
         * Shorthand for `app.addHttpFunction()`
         * @param name The name of the function. This will be the route unless a route is explicitly configured in the `HttpInputOptions`
         * @param options Configuration options describing the inputs and outputs of this function
         * @param callback The callback to use when the function is triggered
         */
        export function http(name: string, options: HttpFunctionOptions, callback: HttpCallback): void;

        /**
         * Registers an http function in your app that will be triggered by making a request to the function url
         * @param name The name of the function. This will be the route unless a route is explicitly configured in the `HttpInputOptions`
         * @param options Configuration options describing the inputs and outputs of this function
         * @param callback The callback to use when the function is triggered
         */
        export function addHttpFunction(name: string, options: HttpFunctionOptions, callback: HttpCallback): void;

        /**
         * Registers a timer function in your app that will be triggered on a schedule
         * Shorthand for `app.addTimerFunction()`
         * @param name The name of the function. The name must be unique within your app and will mostly be used for your own tracking purposes
         * @param options Configuration options describing the inputs and outputs of this function
         * @param callback The callback to use when the function is triggered
         */
        export function timer(name: string, options: TimerFunctionOptions, callback: TimerCallback): void;

        /**
         * Registers a timer function in your app that will be triggered on a schedule
         * @param name The name of the function. The name must be unique within your app and will mostly be used for your own tracking purposes
         * @param options Configuration options describing the inputs and outputs of this function
         * @param callback The callback to use when the function is triggered
         */
        export function addTimerFunction(name: string, options: TimerFunctionOptions, callback: TimerCallback): void;

        /**
         * Registers a queue function in your app that will be triggered whenever an item is added to a storage queue
         * @param name The name of the function. The name must be unique within your app and will mostly be used for your own tracking purposes
         * @param options Configuration options describing the inputs and outputs of this function
         * @param callback The callback to use when the function is triggered
         */
        export function addQueueFunction(name: string, options: QueueFunctionOptions, callback: QueueCallback): void;

        /**
         * A generic method for registering a function if the trigger type is not supported with its own method
         * @param name The name of the function. The name must be unique within your app and will mostly be used for your own tracking purposes
         * @param options Configuration options describing the inputs and outputs of this function
         * @param callback The callback to use when the function is triggered
         */
        export function addFunction(triggerType: string, name: string, options: FunctionOptions, callback: FunctionCallback): void;
    }

    export type FunctionCallback = (context: InvocationContext, triggerInput: unknown) => FunctionResult;
    export type HttpCallback = (context: InvocationContext, request: HttpRequest) => FunctionResult<HttpResponse>;
    export type TimerCallback = (context: InvocationContext, myTimer: Timer) => FunctionResult;
    export type QueueCallback = (context: InvocationContext, queueEntry: unknown) => FunctionResult;

    /**
     * Void if no `return` output is registered
     * Otherwise, the registered `return` output
     */
    export type FunctionResult<T = unknown> = T | Promise<T>;

    /**
     * Configures the inputs and outputs of an Azure Function
     */
    export interface FunctionOptions {
        /**
         * Configuration for the primary input to the function, aka the reason it will be triggered
         * This is the only input that is passed as an argument to the function callback during invocation
         */
        trigger: FunctionInput;

        /**
         * Configuration for the optional primary output of the function
         * This is the main output that you should set as the return value of the function callback during invocation
         */
        return?: FunctionOutput;

        /**
         * Configuration for an optional set of secondary inputs
         * During invocation, get these values with `context.extraInputs.get()`
         */
        extraInputs?: FunctionInput[];

        /**
         * Configuration for an optional set of secondary outputs
         * During invocation, set these values with `context.extraOutputs.set()`
         */
        extraOutputs?: FunctionOutput[];
    }

    export interface HttpFunctionOptions extends FunctionOptions {
        trigger: HttpInput;

        /**
         * Configuration for the optional primary output of the function. If not set, this will default to a standard http response output
         * This is the main output that you should set as the return value of the function callback during invocation
         */
        return?: FunctionOutput;
    }

    export interface TimerFunctionOptions extends FunctionOptions {
        trigger: TimerInput;
    }

    export interface QueueFunctionOptions extends FunctionOptions {
        trigger: QueueInput;
    }

    /**
     * Contains metadata and helper methods specific to this invocation
     */
    export class InvocationContext {
        /**
         * TODO: I added a constructor so that this could be used in tests
         * Still need to investigate if that will be possible or if users will need to mock their own InvocationContext
         */
        constructor();

        /**
         * A unique guid specific to this invocation
         */
        invocationId: string;

        /**
         * The name of the function that is being invoked
         */
        functionName: string;

        /**
         * An object used to get secondary inputs
         */
        extraInputs: InvocationContextExtraInputs;

        /**
         * An object used to set secondary outputs
         */
        extraOutputs: InvocationContextExtraOutputs;

        /**
         * The recommended way to log data during invocation.
         * Similar to Node.js's `console.log`, but has integration with Azure features like application insights
         */
        log(...args: any[]): void;
    }

    /**
     * An object used to get secondary inputs
     */
    export interface InvocationContextExtraInputs {
        /**
         * Get a secondary http request input for this invocation
         * @input the configuration object for this http input
         */
        get(input: HttpInput): HttpRequest;

        /**
         * Get a secondary timer metadata input for this invocation
         * @input the configuration object for this timer input
         */
        get(input: TimerInput): Timer;

        /**
         * Get a secondary queue entry input for this invocation
         * @input the configuration object for this queue input
         */
        get(input: QueueInput): unknown;

        /**
         * Get a secondary generic input for this invocation
         * @input the configuration object for this input
         */
        get(input: FunctionInput): unknown;
    }

    /**
     * An object used to set secondary outputs
     */
    export interface InvocationContextExtraOutputs {
        /**
         * Set a secondary http response output for this invocation
         * @input the configuration object for this http output
         * @response the http response output value
         */
        set(output: HttpOutput, response: HttpResponse): void;

        /**
         * Set a secondary queue entry output for this invocation
         * @input the configuration object for this queue output
         * @queueItem the queue entry output value
         */
        set(output: QueueOutput, queueItem: unknown): void;

        /**
         * Set a secondary generic output for this invocation
         * @input the configuration object for this output
         * @value the output value
         */
        set(output: FunctionOutput, value: unknown): void;
    }

    export class FunctionInput {
        /**
         * Configure a generic input
         */
        constructor(inputType: string, options: {});
    }

    export class FunctionOutput {
        /**
         * Configure a generic output
         */
        constructor(outputType: string, options: {});
    }

    export class HttpInput extends FunctionInput {
        /**
         * Configure an http input
         */
        constructor(options: HttpInputOptions);
    }

    export interface HttpInputOptions {
        /**
         * The function HTTP authorization level
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

    export class HttpOutput extends FunctionOutput {
        /**
         * Configure an http output
         */
        constructor(options?: HttpOutputOptions);
    }

    /**
     * At the moment no options are supported for an http output
     */
    export interface HttpOutputOptions {
    }

    export class TimerInput extends FunctionInput {
        /**
         * Configure a timer input
         */
        constructor(options: TimerInputOptions);
    }

    export interface TimerInputOptions {
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

    export class QueueInput extends FunctionInput {
        /**
         * Configure a queue input
         */
        constructor(options: QueueInputOptions);
    }

    export class QueueOutput extends FunctionOutput {
        /**
         * Configure a queue output
         */
        constructor(options: QueueOutputOptions);
    }

    export interface QueueCommonOptions {
        /**
         * The queue name
         */
        queueName: string;

        /**
         * An app setting (or environment variable) with the storage connection string to be used by this queue input or output.
         */
        connection: string;
    }

    export type QueueInputOptions = QueueCommonOptions;

    export type QueueOutputOptions = QueueCommonOptions;

    export class EmptyOutput extends FunctionOutput {
        /**
         * Placeholder configuration to indicate there will be no output
         * This is primarily used if a function has a default output and you want to override it to have no output
         */
        constructor();
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
    * HTTP request object. Provided to your function when using HTTP inputs
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
     * Work in progress: There are other options on a timer object that have not been listed out yet
     */
    export interface Timer {
        /**
         * Whether this timer invocation is due to a missed schedule occurrence.
         */
        isPastDue: boolean;

        scheduleStatus: {
            /**
             * The last recorded schedule occurrence. Date ISO string.
             */
            last: string;
            /**
             * The expected next schedule occurrence. Date ISO string.
             */
            next: string;
            /**
             * The last time this record was updated. This is used to re-calculate `next` with the current schedule after a host restart. Date ISO string.
             */
            lastUpdated: string;
        };
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
