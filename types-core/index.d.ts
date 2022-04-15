declare module '@azure/functions-core' {
    export interface FunctionMetadata {
        name: string;

        /**
         * An array object bindings
         */
        rawBindings: any[];
    }

    export type FunctionCallback = () => Promise<void>; // todo

    export function registerFunction(funcMetadata: FunctionMetadata, callback: FunctionCallback): void;

    /**
     * Represents a type which can release resources, such as event listening or a timer.
     */
    export class Disposable {
        static from(...disposableLikes: { dispose: () => any }[]): Disposable;
        constructor(callOnDispose: () => any);
        dispose(): any;
    }
}
