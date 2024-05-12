import Modal from "react-modal";
import s from "./ImageModal.module.css";
const customStyles = {
  overlay: {
    backgroundColor: "#575757",
  },
  content: {
    width: "80%",
    height: "80%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
    borderRadius: 0,
    overflow: "hidden",
  },
};

Modal.setAppElement("#root");

function ImageModal({ onOpen, onClose, big }) {
  return (
    <div>
      <Modal
        className={s.modal}
        isOpen={onOpen}
        onRequestClose={onClose}
        style={customStyles}
        overlayClassName={s.overlay}
      >
        <img src={big} alt="photo" className={s.img} />
      </Modal>
    </div>
  );
}

export default ImageModal;
