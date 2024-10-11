export interface INodeProps {
  children?: React.ReactNode;
  styleClass?: string;
}

export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;
