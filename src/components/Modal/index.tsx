import "./styles.scss";

interface PropsModal {
  remove: (deleted: boolean) => void;
  modalVisible: boolean;
}

function ModalConfirm(props: PropsModal) {
  
  const handleCancel = () => {
    props.remove(false);
  };

  const handleRemove = () => {
    props.remove(true);
  };

  return (
    <>
      {props.modalVisible && (
        <div className="modal">
          <div className="container">
            <div>
              <h3>Tem certeza que deseja excluir o filme?</h3>
              <div className="container-modal-action-buttons">
                <button
                  className="base-button button-remove"
                  onClick={handleRemove}
                >
                  Excluir
                </button>
                <button
                  className="base-button button-gray"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalConfirm;
