/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IMovie } from "../../../models/movie";
import { Dispatch } from "redux";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { notifySuccess } from "../../../utils/useToast";
import Select, { ISelectList } from "../../../components/Select";
import { MovieState } from "../../../models/redux";
import {
  createMovieAsync,
  deleteMovieAsync,
  updateMovieAsync,
} from "../../../store/actions/actionCreators";
import Loader from "../../../components/Loader";
import arrow_back from "../../../assets/arrow_back.svg";
import Input from "../../../components/Input";
import ModalConfirm from "../../../components/Modal";
import "./styles.scss";

interface IHandleChange {
  target: {
    name: string;
    value: string | number | Date;
  };
}

const Movie: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [actionDefault, setActionDefault] = useState<"save" | "edit">("save");
  const [state, setState] = useState<IMovie>({
    movieId: 0,
    name: "",
    genderId: 0,
  });

  const addingMovie = useCallback(
    (movie: IMovie) => dispatch(createMovieAsync(movie)),
    [dispatch]
  );

  const editingMovie = useCallback(
    (movie: IMovie) => dispatch(updateMovieAsync(movie)),
    [dispatch]
  );

  const removingMovie = useCallback(
    (id: number) => dispatch(deleteMovieAsync(id)),
    [dispatch]
  );

  const handleChange = ({ target: { name, value } }: IHandleChange) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelect = (value: any) => {
    setState((prevState) => ({
      ...prevState,
      genderId: value.target.value,
    }));
  };

  const submit = async () => {
    if (actionDefault === "save") {
      addingMovie({
        ...state,
      });
      navigate("/");
    }

    if (actionDefault === "edit") {
      editingMovie(state);
      navigate("/");
    }
  };

  const remove = async (deleted: boolean): Promise<void> => {
    setModalVisible(false);

    if (deleted && id) {
      removingMovie(Number(id));
      notifySuccess("excluído");
      navigate("/");
    }
  };

  const movies: IMovie[] = useSelector(
    (state: MovieState) => state.movies,
    shallowEqual
  );

  const genders: ISelectList[] = useSelector(
    (state: MovieState) => state.genders,
    shallowEqual
  );

  const openModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    if (id) {
      const movie = movies.find((movie) => movie.movieId === Number(id));
      if (movie) {
        setActionDefault("edit");
        setState(movie);
      } else {
        navigate("/error");
      }
    }
  }, [id, movies]);

  return (
    <>
      <ModalConfirm modalVisible={modalVisible} remove={remove} />
      <Loader isLoading={isLoading} />
      <div className="container-home">
        <div className="container-actions">
          <div className="content-title">
            <Link to={`/`}>
              <img src={arrow_back} alt="voltar" />
            </Link>
            <h1>{actionDefault === "save" ? "Novo Filme" : "Editar Filme"}</h1>
          </div>
          <div className="container-form">
            <form action="">
              <Input
                placeholder="Informe o Nome"
                label="Nome"
                required={true}
                key={1}
                name="name"
                value={state.name}
                validation={state.name?.trim() === "" ? false : true}
                fallbackText="O Nome é obrigatório"
                onChange={handleChange}
              />
              <Select
                label="Gênero"
                required={true}
                key={2}
                value={state.genderId}
                validation={state.genderId === 0 ? false : true}
                fallbackText="O Gênero é obrigatório"
                defaultOption="Selecione o Gênero"
                onChange={handleSelect}
                list={genders}
              />
              <div className="container-button">
                <button
                  className="base-button"
                  onClick={submit}
                  type="button"
                  disabled={!state.name.trim() || !state.genderId}
                >
                  {actionDefault === "save" ? "Cadastrar" : "Editar"}
                </button>
                {actionDefault === "edit" && (
                  <button
                    className="base-button button-remove"
                    onClick={openModal}
                    type="button"
                  >
                    Excluir
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movie;
