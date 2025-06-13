import { useState, useEffect, useRef } from "react";
import { FunctionKeys, MethodsPart, NonFunctionKeys, StatePart } from "./type";

function defineStore<T extends Record<string, any>>(initialState: T) {
  // 分离状态和方法键
  const stateKeys = Object.keys(initialState).filter(
    (key) => typeof initialState[key as keyof T] !== "function"
  ) as NonFunctionKeys<T>[];

  const methodKeys = Object.keys(initialState).filter(
    (key) => typeof initialState[key as keyof T] === "function"
  ) as FunctionKeys<T>[];

  const currentState = stateKeys.reduce((acc, key) => {
    acc[key] = initialState[key];
    return acc;
  }, {} as StatePart<T>);

  const methods = methodKeys.reduce((acc, key) => {
    acc[key] = initialState[key];
    return acc;
  }, {} as MethodsPart<T>);

  type State = StatePart<T>;
  type Methods = MethodsPart<T>;

  const subscribers = new Set<(state: State) => void>();
  let updateQueue: (() => void)[] | null = null;

  // 创建类型安全的包装方法
  const protectedMethods = {} as Methods;

  // 为每个方法创建类型安全的包装
  methodKeys.forEach((key) => {
    const originalMethod = methods[key] as (...args: any[]) => any;

    protectedMethods[key] = function (...args: any[]) {
      // 调用原始方法
      const result = originalMethod.apply(currentState, args);
      notifySubscribers({ ...currentState });

      // 处理异步方法
      if (result instanceof Promise) {
        return result
          .then((asyncResult) => {
            return asyncResult;
          })
          .catch((error) => {
            console.error(`Error in method ${String(key)}:`, error);
            throw error;
          })
          .finally(() => {
            notifySubscribers({ ...currentState });
          });
      }

      return result;
    } as any;
  });

  function notifySubscribers(newState: State) {
    subscribers.forEach((subscriber) => subscriber(newState));
  }

  function hasChanged(oldState: State, newState: State) {
    const keys = Object.keys(newState) as (keyof State)[];
    return keys.some((key) => oldState[key] !== newState[key]);
  }

  const subscribe = (subscriber: (state: State) => void) => {
    subscribers.add(subscriber);
    return () => {
      subscribers.delete(subscriber);
    };
  };

  const useUniqueState = (): [state: State, methods: Methods] => {
    const [state, setState] = useState<State>({ ...currentState });
    const stateRef = useRef(state);
    stateRef.current = state;

    useEffect(() => {
      const unsubscribe = subscribe((newState) => {
        // 只有当状态实际变化时才更新
        if (hasChanged(stateRef.current, newState)) {
          setState(newState);
        }
      });
      return unsubscribe;
    }, []);

    return [state, protectedMethods];
  };

  return {
    useUniqueState,
    methods: protectedMethods,
    getState: () => ({ ...currentState }),
    subscribe,
  };
}

export default defineStore;
