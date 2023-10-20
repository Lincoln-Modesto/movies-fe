import { DispatchType, IAction } from "../../models/redux";
import { IMovie } from "../../models/movie";
import { toast } from "react-toastify";
import * as actionTypes from "./actionTypes";
import { Api, HttpApiClientJSONResponse, endpoints } from "../../api";
import { ISelectList } from "../../components/Select";
import { IGender } from "../../models/gender";

const notifyError = (message: string) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

const intializerStateMovies = async () => {
  const api = new Api();

  const { data } = (await api.get(
    endpoints.getMovies
  )) as HttpApiClientJSONResponse<IMovie[]>;

  return data;
};

const intializerStateGenders = async () => {
  const api = new Api();

  const { data } = (await api.get(
    endpoints.getGenders
  )) as HttpApiClientJSONResponse<IGender[]>;

  return data;
};

export const addMovie = (movie: IMovie) => {
  const action: IAction = {
    type: actionTypes.ADD_MOVIE,
    payload: movie,
  };

  return simulateHttpRequest(action);
};

export const editMovie = (movie: IMovie) => {
  const action: IAction = {
    type: actionTypes.EDIT_MOVIE,
    payload: movie,
  };

  return simulateHttpRequest(action);
};

export const removeMovie = (id: number) => {
  const action: IAction = {
    type: actionTypes.REMOVE_MOVIE,
    payload: id,
  };

  return simulateHttpRequest(action);
};

export const removeManyMovies = (ids: number[]) => {
  const action: IAction = {
    type: actionTypes.REMOVE_MANY_MOVIES,
    payload: ids,
  };

  return simulateHttpRequest(action);
};

export const setInitialMovies = (data: IMovie[]) => {
  data = data.map((movie) => ({
    ...movie,
    date: new Date(movie.date).toLocaleDateString(),
  }));

  return {
    type: actionTypes.SET_INITIAL_MOVIES,
    payload: data,
  };
};

export const setInitialGenders = (data: IGender[]) => {
  const listGenders = data.map((gender) => ({
    label: gender.name,
    value: gender.genderId,
  })) as ISelectList[];

  return {
    type: actionTypes.SET_INITIAL_GENDERS,
    payload: listGenders,
  };
};

export const initializeMoviesAsync = () => {
  return async (dispatch: DispatchType) => {
    try {
      const data = await intializerStateMovies();
      dispatch(setInitialMovies(data));
    } catch (error) {
      notifyError("Ops! não foi possível carregar os filmes");
    }
  };
};

export const initializeGendersAsync = () => {
  return async (dispatch: DispatchType) => {
    try {
      const data = await intializerStateGenders();
      dispatch(setInitialGenders(data));
    } catch (error) {
      notifyError("Ops! não foi possível carregar os gêneros");
    }
  };
};

export function simulateHttpRequest(action: IAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action);
    }, 500);
  };
}
