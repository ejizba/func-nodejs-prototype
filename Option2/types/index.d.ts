/**
 * NOTE: This file is necessary to get intellisense working during the prototype phase
 * Eventually, this file will be included in an npm package instead of in the project directly
 */

/**
 * Azure Functions Option 2
 */
declare module '@azure/functions-option2' {
    /**
     * The root namespace for performing operations on your Azure Function App
     * This is a work-in-progress prototype and only essential/noteworthy pieces were included at this time
     */
    export namespace app {
        /**
         * Registers an http function in your app that will be triggered by making a request to the function url
         * @param name The name of the function. This will be the route unless a route is explicitly configured in the `HttpTriggerOptions`
         * @param options Configuration options describing the http trigger
         * @param callback The callback to use when the function is triggered
         */
        export function addHttpFunction(name: string, options: HttpTriggerOptions, callback: HttpCallback): RegisteredFunction;

        /**
         * Registers a timer function in your app that will be triggered on a schedule
         * @param name The name of the function. The name must be unique within your app and will mostly be used for your own tracking purposes
         * @param options Configuration options describing the timer trigger
         * @param callback The callback to use when the function is triggered
         */
        export function addTimerFunction(name: string, options: TimerTriggerOptions, callback: TimerCallback): RegisteredFunction;

        /**
         * Registers a queue function in your app that will be triggered whenever an item is added to a storage queue
         * @param name The name of the function. The name must be unique within your app and will mostly be used for your own tracking purposes
         * @param options Configuration options describing the queue trigger
         * @param callback The callback to use when the function is triggered
         */
        export function addQueueFunction(name: string, options: QueueTriggerOptions, callback: QueueCallback): RegisteredFunction;

        /**
         * A generic method for adding a function if the trigger type is not supported with its own method
         */
        export function addFunction(triggerType: string, name: string, options: InputOptions, callback: FunctionCallback): RegisteredFunction; // generic fallback method
    }

    /**
     * Represents a function that has been registered, with additional options to add more inputs or outputs
     */
    export class RegisteredFunction {
        addHttpInput(options: HttpInputOptions): RegisteredFunction;
        addQueueInput(options: QueueInputOptions): RegisteredFunction;
        /**
         * A generic method for adding an input if the input type is not supported with its own method
         */
        addInput(inputType: string, options: InputOptions): RegisteredFunction;

        /**
         * Registers the output of your function as an http response
         */
        addHttpOutput(options: HttpOutputOptions): RegisteredFunction;

        /**
         * Registers the output of your function as an Azure Storage queue item
         */
        addQueueOutput(options: QueueOutputOptions): RegisteredFunction;

        /**
         * A generic method for adding an output if the output type is not supported with its own method
         */
        addOutput(outputType: string, options: InputOptions): RegisteredFunction;
    }

    /**
     * Only the trigger input is passed as an arg, and all other inputs have to be accessed from `context.inputs`
     */
    export type FunctionCallback = ((context: InvocationContext, triggerInput: unknown) => unknown);

    export type HttpCallback = (context: InvocationContext, request: HttpRequest) => FunctionResult;
    export type TimerCallback = (context: InvocationContext, myTimer: Timer) => FunctionResult;
    export type QueueCallback = (context: InvocationContext, queueEntry: any) => FunctionResult;

    /**
     * Void if there are no outputs registered
     * A dictionary of output names and output values if multiple outputs are registered
     * Otherwise, the single output
     */
    export type FunctionResult = Promise<void | { [key: string]: any } | any>;

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

    export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'HEAD' | 'PATCH' | 'PUT' | 'OPTIONS' | 'TRACE' | 'CONNECT';

    /**
     * HTTP request headers
     */
    export interface HttpRequestHeaders {
        [name: string]: string;
    }

    /**
     * HTTP response headers.
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
         * A key-value dictionary of all inputs other than the trigger input (which is passed as an argument to the function callback)
         */
        inputs: { [name: string]: any };
    }

    // #region input/output options

    /**
     * Base type for configuring all inputs
     */
    export interface InputOptions {
        /**
         * The name for this input in the `context.inputs` dictionary
         */
        name: string;
    }

    /**
     * Base type for configuring all outputs
     */
    export interface OutputOptions {
        /**
         * The name for this output in the dictionary used as the return value of a function callback
         */
        name: string;
    }

    export interface HttpTriggerOptions {
        /**
         * The function HTTP authorization level.
         */
        authLevel: "anonymous" | "function" | "admin";

        /**
         * Defaults to ["get", "post"] if not specified
         */
        methods?: ('get' | 'post' | 'delete' | 'head' | 'patch' | 'put' | 'options' | 'trace')[];

        /**
         * The route for this http input. If not specified, the function name will be used
         */
        route?: string;
    }

    export interface HttpInputOptions extends HttpTriggerOptions, InputOptions { }

    export interface HttpOutputOptions extends OutputOptions { }

    export interface TimerTriggerOptions {
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

    /**
     * Shared properties for all queue inputs and outputs
     */
    export interface QueueOptions {
        /**
         * The queue name
         */
        queueName: string;

        /**
         * An app setting (or environment variable) with the storage connection string to be used
         */
        connection: string;
    }

    export interface QueueTriggerOptions extends QueueOptions { }

    export interface QueueInputOptions extends QueueOptions, InputOptions { }

    export interface QueueOutputOptions extends QueueOptions, OutputOptions { }

    // #endregion input/output options
}
