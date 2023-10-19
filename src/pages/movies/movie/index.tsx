/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { IMovie } from "../../../models/movie";
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"
import { addMovie, editMovie, removeMovie } from '../../../store/actions/actionCreators'
import Loader from "../../../components/Loader";
import arrow_back from "../../../assets/arrow_back.svg";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import "./styles.scss";

interface IHandleChange {
  target: {
    name: string;
    value: string | number | Date;
  };
}

const listGenders = [
  {label: "Ação", value: "Ação",},
  {label: "Aventura", value: "Aventura",},
  {label: "Comédia", value: "Comédia",},
  {label: "Documentário", value: "Documentário",},
  {label: "Drama", value: "Drama",},
  {label: "Fantasia", value: "Fantasia",},
  {label: "Ficção Científica", value: "Ficção Científica",},
  {label: "Romance", value: "Romance",},
  {label: "Suspense", value: "Suspense",},
  {label: "Terror", value: "Terror",},
  {label: "Outro", value: "Outro",},
]

const Movie: React.FC = () =>{
  const dispatch: Dispatch<any> = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [actionDefault, setActionDefault] = useState<"save" | "edit">("save");
  const [state, setState] = useState<IMovie>({
    id: 0,
    name: "",
    date: "",
    active: 1,
    gender: "",
  });

  const addingMovie = useCallback(
    (movie: IMovie) => dispatch(addMovie(movie)),
    [dispatch]
  )

  const handleChange = ({ target: { name, value } }: IHandleChange) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelect = (value: any) => {
    setState((prevState) => ({
      ...prevState,
      gender: value.target.value,
    }));
  };

  const submit = async () => {

    actionDefault
    addingMovie({
      ...state,
      date: new Date().toLocaleString(),
      id: new Date().getDate()
    })
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="container-home">
        <div className="container-actions">
          <div className="content-title">
            <Link to={`/`}>
              <img src={arrow_back} alt="voltar" />
            </Link>
            <h1>Novo Filme</h1>
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
                label="Nome"
                required={true}
                key={2}
                value={state.gender}
                validation={state.gender?.trim() === "" ? false : true}
                fallbackText="O Gênero é obrigatório"
                defaultOption="Selecione o Gênero"
                onChange={handleSelect}
                list={listGenders}
              />
              <div className="container-button">
                <button
                  className="base-button"
                  onClick={submit}
                  type="button"
                  disabled={
                    !state.name.trim() ||
                    !state.gender
                  }
                >
                  {actionDefault === "save" ? "Cadastrar" : "Editar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Movie;
