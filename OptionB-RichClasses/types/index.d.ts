declare module '@azure/functions-newB' {
    export namespace app {
        export function registerFunction(name: string, bindings: Binding[], callback: FunctionCallback): Function;
    }

    export type InvocationContext = {
        log(...args: any[]): void;
    };

    export type FunctionCallback = ((context: InvocationContext) => unknown);

    export abstract class Binding {

    }

    export abstract class HttpBinding extends Binding {

    }

    export class HttpInputBinding extends HttpBinding {
        constructor(options?: HttpInputBindingOptions);
        get(context: InvocationContext): HttpRequest;
    }

    export class TimerInputBinding extends Binding {
        constructor(options: TimerInputBindingOptions);
        get(context: InvocationContext): Timer;
    }

    export class HttpOutputBinding extends HttpBinding {
        constructor(options?: HttpOutputBindingOptions);
        set(context: InvocationContext, response: HttpResponse): void;
    }

    export class QueueOutputBinding extends Binding {
        constructor(options: QueueBindingOptions);
        set(context: InvocationContext, response: any): void;
    }

    export type HttpRequest = any;

    export interface Timer {
        isPastDue: boolean;
    }

    export interface HttpOutputBindingOptions {
    }

    export interface QueueBindingOptions {
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

        route?: string;
    }

    export interface TimerInputBindingOptions {
        schedule: string;
    }

    export type HttpResponse = any;
}
