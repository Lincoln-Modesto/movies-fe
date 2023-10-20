/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMovie } from "../../../models/movie";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { MovieState } from "../../../models/redux";
import Loader from "../../../components/Loader";
import Card from "../../../components/Card";
import "./styles.scss";
import { initializeMoviesAsync, initializeGendersAsync } from "../../../store/actions/actionCreators";

const List: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movies: readonly IMovie[] = useSelector(
    (state: MovieState) => state.movies,
    shallowEqual
  )

  const callbackCard = (id: number) => {
    if (id) {
      navigate(`/filme/${id}`);
    }
  };

  useEffect(() => {
    if(!movies.length) {
      //@ts-ignore
      dispatch(initializeMoviesAsync())
      //@ts-ignore
      dispatch(initializeGendersAsync())
    }
  }, [dispatch]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="container-home">
        <div className="content-title-list">
          <h1>Listagem de Filmes</h1>
          <div className="container-list-button">
            <Link to={"/novo-filme"} className="base-button">
              Cadastrar Filme
            </Link>
          </div>
        </div>
        {movies.length ? (
          <div className="container-list">
            <div className="container-list-description">
              <h3 className="content-card">Nome</h3>
              <h3 className="content-card">Gênero</h3>
              <h3 className="content-card content-card-hidden-responsively">Status</h3>
              <h3 className="content-card content-card-hidden-responsively">Data de Criação</h3>
            </div>
            {movies.length &&
              movies.map((movie, i) => (
                <Card
                  key={i}
                  active={movie.active as boolean}
                  date={movie.date as string}
                  id={movie.movieId}
                  gender={movie.genderName as string}
                  name={movie.name}
                  onClick={callbackCard}
                />
              ))}
          </div>
        ) : (
          <div className="container-list-fallback">
            <h2>Nenhum filme cadastrado 👻</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default List;
