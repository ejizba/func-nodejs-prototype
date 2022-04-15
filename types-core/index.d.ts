declare module '@azure/functions-core' {
    export interface FunctionMetadata {
        bindings: any[];
    }

    export type FunctionCallback = (...args: any[]) => Promise<any>;

    export type InvocationContext = {};

    export function registerFunction(name: string, funcMetadata: FunctionMetadata, callback: FunctionCallback): void;

    /**
     * Represents a type which can release resources, such as event listening or a timer.
     */
    export class Disposable {
        static from(...disposableLikes: { dispose: () => any }[]): Disposable;
        constructor(callOnDispose: () => any);
        dispose(): any;
    }
}
