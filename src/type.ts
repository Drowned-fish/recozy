// 辅助类型：提取方法类型
export type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

// 辅助类型：提取状态类型
export type NonFunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

// 分离状态和方法类型
export type StatePart<T> = Pick<T, NonFunctionKeys<T>>;

export type MethodsPart<T> = {
  [K in FunctionKeys<T>]: T[K] extends (...args: infer P) => infer R
    ? (...args: P) => R
    : never;
};
