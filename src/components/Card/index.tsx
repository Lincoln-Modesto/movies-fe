import "./styles.scss";

interface PropsCard {
  id: number;  
  name: string;
  gender: string;
  date: string ;
  active: boolean;
  onClick: (number: number) => void;
}

function Card(props: PropsCard) {

  const handleCard = (id: number) => {
    props.onClick(id)
  }

  return (
    <button className="base-card" onClick={() => handleCard(props.id)}>
      <div className="content-card-info">
        <span>{props.name}</span>
      </div>
      <div className="content-card-info">
        <p>{props.gender}</p>
      </div>
      <div className="content-card-info">
        <p>{props.active ? 'Ativo' : 'Inativo'}</p>
      </div>
      <div className="content-card-hidden-responsively">
        <p>{props.date}</p>
      </div>
    </button>
  );
}

export default Card;
