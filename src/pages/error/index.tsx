import { Link } from 'react-router-dom';
import './styles.scss'

function Fallback() {
  return (
    <div className="error-page">
      <span>Erro 404</span>
      <h1>🫣 Ops! A url que você está tentando acessar não existe!</h1>
      <br />
      <Link to={'/'}>
        <button className="base-button" >Voltar ao Inicio</button>
      </Link>
    </div>
  );
}

export default Fallback;