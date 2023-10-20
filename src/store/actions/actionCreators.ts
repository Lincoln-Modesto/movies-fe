import { DispatchType, IAction } from "../../models/redux";
import { IMovie } from "../../models/movie";
import { Api, HttpApiClientJSONResponse, endpoints } from "../../api";
import { ISelectList } from "../../components/Select";
import { IGender } from "../../models/gender";
import { notifyError, notifySuccess } from "../../utils/useToast";
import * as actionTypes from "./actionTypes";

const api = new Api();
const intializerStateMovies = async () => {
  const { data } = (await api.get(
    endpoints.getMovies
  )) as HttpApiClientJSONResponse<IMovie[]>;

  return data;
};

const intializerStateGenders = async () => {
  const { data } = (await api.get(
    endpoints.getGenders
  )) as HttpApiClientJSONResponse<IGender[]>;

  return data;
};

const postMovie = async (model: IMovie) => {
  model = {
    ...model,
    active: true
  }

  const { data } = (await api.post(
    endpoints.postMovies, model
  )) as HttpApiClientJSONResponse<IMovie>;

  return data;
}

const putMovie = async (model: IMovie) => {
  const formatModel = {
    ative: model.active,
    name: model.name,
    genderId: model.genderId
  }

  const { data } = (await api.put(
    `${endpoints.putMovies}/${model.movieId}`, formatModel
  )) as HttpApiClientJSONResponse<IMovie>;

  return data;
}

const deleteMovie = async (id: number) => {
  const { data } = (await api.delete(
    `${endpoints.deleteMovies}/${id}`, 
  )) as HttpApiClientJSONResponse<IMovie>;

  return data;
}

export const addMovie = (movie: IMovie) => {
  const action: IAction = {
    type: actionTypes.ADD_MOVIE,
    payload: movie,
  };

  return action;
};

export const editMovie = (movie: IMovie) => {
  const action: IAction = {
    type: actionTypes.EDIT_MOVIE,
    payload: movie,
  };

  return action;
};

export const removeMovie = (id: number) => {
  const action: IAction = {
    type: actionTypes.REMOVE_MOVIE,
    payload: id,
  };

  return action;
};

export const removeManyMovies = (ids: number[]) => {
  const action: IAction = {
    type: actionTypes.REMOVE_MANY_MOVIES,
    payload: ids,
  };

  return action;
};

export const setInitialMovies = (data: IMovie[]) => {
  data = data.map((movie) => ({
    ...movie,
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

export const createMovieAsync = (model: IMovie) => {
  return async (dispatch: DispatchType) => {
    try {
      const data = await postMovie(model);
      dispatch(addMovie(data));
      notifySuccess("cadastrado");
    } catch (error) {
      notifyError("Ops! não foi possível cadastrar o filme");
    }
  };
};

export const updateMovieAsync = (model: IMovie) => {
  return async (dispatch: DispatchType) => {
    try {
      const data = await putMovie(model);
      dispatch(editMovie(data));
      notifySuccess("editado");
    } catch (error) {
      notifyError("Ops! não foi possível editar o filme");
    }
  };
};

export const deleteMovieAsync = (id: number) => {
  return async (dispatch: DispatchType) => {
    try {
      await deleteMovie(id).then(() => dispatch(removeMovie(id)));
    } catch (error) {
      notifyError("Ops! não foi possível editar o filme");
    }
  };
};
