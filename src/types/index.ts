export type ID = string | number;

export interface IIdentifiable<T extends ID = ID> {
  id: T;
}

export interface INodeProps {
  children?: React.ReactNode;
  className?: string;
}
