declare module '@azure/functions-new1' {
    export namespace app {
        export function registerHttpFunction(name: string, inputBinding: HttpInputBinding, callback: HttpCallback): Function;
        export function registerTimerFunction(name: string, inputBinding: TimerInputBinding, callback: TimerCallback): Function;
        export function registerQueueFunction(name: string, inputBinding: QueueInputBinding, callback: QueueCallback): Function;
        export function registerFunction(type: string, name: string, inputBinding: InputBinding, callback: FunctionCallback): Function; // generic fallback method
    }

    export class Function {
        registerHttpInput(binding: HttpInputBinding): Function;
        registerQueueInput(binding: QueueInputBinding): Function;
        registerInput(type: string, binding: InputBinding): Function;

        registerHttpOutput(binding: HttpOutputBinding): Function;
        registerQueueOutput(binding: QueueOutputBinding): Function;
        registerOutput(type: string, binding: InputBinding): Function;
    }

    /**
     * Just a thought: To simplify the callback, what if only the triggerInput gets passed as an arg, and all other input bindings have to be accessed on `context`
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

    export interface InputBinding extends Binding { }

    export interface OutputBinding extends Binding {
        name: '$return' | string; // todo does adding '$return' actually help with Intellisense?
    }

    export interface HttpInputBinding extends InputBinding {
        /**
         * The function HTTP authorization level.
         */
        authLevel: "anonymous" | "function" | "admin";

        methods?: ('get' | 'post' | 'delete' | 'head' | 'patch' | 'put' | 'options' | 'trace')[]; // todo is this optional?
    }

    export interface HttpOutputBinding extends OutputBinding { }

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

    export interface QueueOutputBinding extends QueueBinding, OutputBinding { }

    // #endregion bindings
}


