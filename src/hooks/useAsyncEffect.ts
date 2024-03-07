import { DependencyList, useEffect } from "react";

/** PS: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30551 */
declare const UNDEFINED_VOID_ONLY: unique symbol;
export type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };
export type AsyncEffectCallback =
  | (() => Promise<void | Destructor>)
  | (() => void)
  | (() => Destructor);

export const useAsyncEffect = (
  effect: AsyncEffectCallback,
  deps?: DependencyList
) => {
  useEffect(() => {
    const destructorPromise = effect();
    return () => {
      if (destructorPromise instanceof Promise) {
        destructorPromise.then((destructor) => destructor && destructor());
      } else {
        destructorPromise && destructorPromise();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
