import { IMovie } from "./movie";

export type MovieState = {
  movies: IMovie[];
  genders: ISelectList[];
}

export type IAction = {
  type: string;
  payload: IMovie | IMovie[] | ISelectList[] | number | number[];
}

export type DispatchType = (args: IAction) => IAction