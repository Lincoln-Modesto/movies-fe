import { DispatchType, IAction } from "../../models/redux";
import { IMovie } from "../../models/movie";
import * as actionTypes from './actionTypes'

export const addMovie = (movie: IMovie) => {
  const action: IAction = {
    type: actionTypes.ADD_MOVIE,
    payload: movie,
  }

  return simulateHttpRequest(action)
};

export const editMovie = (movie: IMovie) => {
  const action: IAction = {
    type: actionTypes.EDIT_MOVIE,
    payload: movie,
  }

  return simulateHttpRequest(action)
};

export const removeMovie = (id: number) => {
  const action: IAction = {
    type: actionTypes.REMOVE_MOVIE,
    payload: id,
  }

  return simulateHttpRequest(action)
};

export const removeManyMovies = (ids: number[]) => {
  const action: IAction = {
    type: actionTypes.REMOVE_MANY_MOVIES,
    payload: ids,
  }
  
  return simulateHttpRequest(action)
};


export function simulateHttpRequest(action: IAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action)
    }, 500)
  }
}
