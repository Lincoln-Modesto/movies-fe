import { IAction, MovieState } from "../../models/redux";
import { ADD_MOVIE, EDIT_MOVIE, REMOVE_MOVIE } from "../actions/actionTypes";
import { IMovie } from "../../models/movie";

const initialState: MovieState = {
  movies: [
    {
      active: 1,
      date: "15/12/2023",
      gender: "Terror",
      id: 1,
      name: "Sexta Feira 13",
    },
  ],
};

const reducer = (
  state: MovieState = initialState,
  action: IAction
): MovieState => {
  switch (action.type) {
    case ADD_MOVIE:
      return {
        ...state,
        movies: state.movies.concat(action.payload as IMovie),
      };
    case EDIT_MOVIE: {
      return {
        ...state,
        movies: [
          ...state.movies.map((item) => item.id === (action.payload as IMovie).id ? (action.payload as IMovie) : item)
        ]
      };
    }
    case REMOVE_MOVIE: {
      const updatedMovies: IMovie[] = state.movies.filter(
        (movie) => movie.id !== (action.payload as number)
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
