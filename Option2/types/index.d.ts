declare module '@azure/functions-newC' {
    export namespace app {
        export function addHttpFunction(name: string, options: HttpTriggerOptions, callback: HttpCallback): Function;
        export function addTimerFunction(name: string, options: TimerTriggerOptions, callback: TimerCallback): Function;
        export function addQueueFunction(name: string, options: QueueTriggerOptions, callback: QueueCallback): Function;
        export function addFunction(triggerType: string, name: string, options: InputOptions, callback: FunctionCallback): Function; // generic fallback method
    }

    export class Function {
        addHttpInput(options: HttpInputOptions): Function;
        addQueueInput(options: QueueInputOptions): Function;
        addInput(inputType: string, options: InputOptions): Function;

        addHttpOutput(options: HttpOutputOptions): Function;
        addQueueOutput(options: QueueOutputOptions): Function;
        addOutput(outputType: string, options: InputOptions): Function;
    }

    /**
     * Only the trigger input is passed as an arg, and all other inputs have to be accessed from `context`
     */
    export type FunctionCallback = ((context: InvocationContext, triggerInput: unknown) => unknown);

    export type HttpCallback = (context: InvocationContext, request: HttpRequest) => FunctionResult;
    export type TimerCallback = (context: InvocationContext, myTimer: Timer) => FunctionResult;
    export type QueueCallback = FunctionCallback; // todo

    export type FunctionResult = Promise<any>; // todo

    export class HttpResponse {
        [key: string]: any; // todo
    }

    export class HttpRequest {
        [key: string]: any; // todo
    }

    export interface Timer {
        isPastDue: boolean;
    }

    export interface InvocationContext {
        log(...args: any[]): void;

        inputs: { [name: string]: any };
    }

    // #region input/output options

    export interface InputOptions {
        name: string;
    }

    export interface OutputOptions {
        name: string;
    }

    export interface HttpTriggerOptions {
        /**
         * The function HTTP authorization level.
         */
        authLevel: "anonymous" | "function" | "admin";

        methods?: ('get' | 'post' | 'delete' | 'head' | 'patch' | 'put' | 'options' | 'trace')[]; // todo is this optional?
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

    export interface QueueOptions {
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


