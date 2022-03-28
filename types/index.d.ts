/**
 * This module will be a built-in part of the worker, similar to how Node.js provides built-in modules like "http" or "path" at runtime
 * It will not be available on npm and will not be listed in a user's package.json, but we could provide a "@types/azure__functions-worker" package for it
 * The goal of this module is to be very barebones and closely match the types the worker uses to communicate with the host over the rpc channel
 */
declare module '@azure/functions-core' {
    export interface FunctionMetadata {
        name: string;

        /**
         * An array containing json serialized bindings
         */
        rawBindings: string[];
    }

    export function registerFunction(funcMetadata: FunctionMetadata): void;

    /**
     * Represents a type which can release resources, such as event listening or a timer.
     */
    export class Disposable {
        static from(...disposableLikes: { dispose: () => any }[]): Disposable;
        constructor(callOnDispose: () => any);
        dispose(): any;
    }

    /**
     * Register a hook to interact with the lifecycle of Azure Functions.
     * Hooks are executed in the order they were registered and will block execution if they throw an error
     */
    export function registerHook(hookName: string, callback: HookCallback): Disposable;

    export type HookCallback = (context: HookContext) => void | Promise<void>;

    export type HookData = { [key: string]: any };

    /**
     * Base interface for all hook context objects
     */
    export interface HookContext {
        /**
         * The recommended place to share data between hooks
         */
        hookData: HookData;
    }
}

/**
 * This module provides all the main benefits of the new programming model. It should have:
 * 1. More intuitive methods compared to the barebones "@azure/functions-core" methods
 * 2. Any niceity we provide on top of the rpc types, including several pieces currently shipped with the worker like `Context` and `HttpRequest`
 * 3. Intellisense for both JS and TS users
 */
declare module '@azure/functions-new' {
    /**
     * NOTE: By having a separate method for each binding type, we get much better intellisense because we know the exact type used for `inputBinding` and `callback`
     * 
     * One alternative is to have a single `registerFunction` method with several overloads, but I find the intellisense errors to be pretty terrible because it 
     * doesn't know which overload you want to use. Something like this:
     *     registerFunction(type: 'http', name: string, type: string, inputBinding: HttpInputBinding, callback: HttpFunction): Function;
     *     registerFunction(type: 'timer', name: string, type: string, inputBinding: TimerInputBinding, callback: TimerFunction): Function;
     * 
     * NOTE #2: By making `app` a namespace (instead of a class), we don't have to worry about the ordering of who creates an instance of app and when.
     * For example, a separate module like 'applicationinsights' could register it's own hooks through the `app` namespace without having to be passed the app manually
     */
    export namespace app {
        export function registerHttpFunction(name: string, inputBinding: HttpInputBinding, callback: HttpCallback): Function;
        export function registerTimerFunction(name: string, inputBinding: TimerInputBinding, callback: TimerCallback): Function;
        export function registerQueueFunction(name: string, inputBinding: QueueInputBinding, callback: QueueCallback): Function;
        export function registerFunction(type: string, name: string, inputBinding: InputBinding, callback: FunctionCallback): Function; // generic fallback method

        export function registerPreInvocationHook(callback: PreInvocationCallback): Disposable;
        export function registerPostInvocationHook(callback: PostInvocationCallback): Disposable;
        export function registerHook(name: string, callback: HookCallback): Disposable;
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

    export type HookCallback = (context: HookContext) => void | Promise<void>;
    export type PreInvocationCallback = (context: PreInvocationContext) => void | Promise<void>;
    export type PostInvocationCallback = (context: PostInvocationContext) => void | Promise<void>;

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

    export type HookData = { [key: string]: any };

    /**
     * Base interface for all hook context objects
     */
    export interface HookContext {
        /**
         * The recommended place to share data between hooks
         */
        hookData: HookData;
    }

    /**
     * Context on a function that is about to be executed
     * This object will be passed to all pre invocation hooks
     */
    export interface PreInvocationContext extends HookContext {
        /**
         * The context object passed to the function
         */
        invocationContext: InvocationContext;

        /**
         * The input values for this specific invocation. Changes to this array _will_ affect the inputs passed to your function
         */
        inputs: any[];
    }

    export interface PostInvocationContext extends HookContext {
        /**
         * The context object passed to the function
         */
        invocationContext: InvocationContext;

        /**
         * The input values for this specific invocation
         */
        inputs: any[];

        /**
         * The result of the function, or null if there is no result. Changes to this value _will_ affect the overall result of the function
         */
        result: any;

        /**
         * The error for the function, or null if there is no error. Changes to this value _will_ affect the overall result of the function
         */
        error: any;
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

    /**
     * Represents a type which can release resources, such as event listening or a timer.
     */
    export class Disposable {
        static from(...disposableLikes: { dispose: () => any }[]): Disposable;
        constructor(callOnDispose: () => any);
        dispose(): any;
    }
}


