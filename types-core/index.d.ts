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
