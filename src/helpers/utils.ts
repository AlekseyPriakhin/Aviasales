export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export type RecursivePartial<T> = {
  [K in keyof T]?: T[K] extends (infer U)[]
    ? Partial<U>[]
    : T[K] extends object | undefined
      ? RecursivePartial<T[K]>
      : T[K];
};
