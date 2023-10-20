import { IAction, MovieState } from "../../models/redux";
import { ADD_MOVIE, EDIT_MOVIE, REMOVE_MOVIE, SET_INITIAL_MOVIES, SET_INITIAL_GENDERS } from "../actions/actionTypes";
import { IMovie } from "../../models/movie";
import { ISelectList } from '../../components/Select';

const initialState: MovieState = {
  movies: [],
  genders: []
};

const reducer = (
  state: MovieState = initialState,
  action: IAction
): MovieState => {
  switch (action.type) {
    case SET_INITIAL_MOVIES:
      return {
        ...state,
        movies: action.payload as IMovie[],
      };
    case SET_INITIAL_GENDERS:
      return {
        ...state,
        genders: action.payload as ISelectList[],
      };
    case ADD_MOVIE:
      return {
        ...state,
        movies: state.movies.concat(action.payload as IMovie),
      };
    case EDIT_MOVIE: {
      return {
        ...state,
        movies: [
          ...state.movies.map((item) => item.movieId === (action.payload as IMovie).movieId ? (action.payload as IMovie) : item)
        ]
      };
    }
    case REMOVE_MOVIE: {
      const updatedMovies: IMovie[] = state.movies.filter(
        (movie) => movie.movieId !== (action.payload as number)
      );
      return {
        ...state,
        movies: updatedMovies,
      };
    }
    default:
      return state;
  }
};

export default reducer;
