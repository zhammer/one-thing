import { Gateways } from "../../types";

export interface Context {
  gateways: Gateways;
  authInfo: {
    userId: string;
  };
}

export type Edge<T, CursorType = string> = {
  cursor: CursorType;
  node: T;
};

export type RelayConnection<T, CursorType = string> = {
  edges: Edge<T, CursorType>[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};
