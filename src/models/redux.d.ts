import { IMovie } from "./movie";

export type MovieState = {
  movies: IMovie[]
}

export type IAction = {
  type: string;
  payload: IMovie | number | number[];
}

export type DispatchType = (args: IAction) => IAction