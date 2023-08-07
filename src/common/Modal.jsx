import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "55%",
    height: "60%",
    overflow: "hiden",
    /*
     * Created with https://www.css-gradient.com
     * Gradient link: https://www.css-gradient.com/?c1=0174b6&c2=52c4ec&gt=l&gd=dtl
     */
    background: "rgba(196, 228, 247, 1.0)",
    background:
      "linear-gradient(135deg, rgba(196, 228, 247, 1.0), rgba(82, 196, 236, 1.0))"
  }
};
/*
 * Created with https://www.css-gradient.com
 * Gradient link: https://www.css-gradient.com/?c1=c4e4f7&c2=52c4ec&gt=l&gd=dtl
 */
export default function App({
  modalIsOpen,
  closeModal,
  content,
  title = "title"
}) {
  // let subtitle;
  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = "#f00";
  // }
  return (
    <Modal
      isOpen={modalIsOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{title}</h2> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between"
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: "400" }}>{title}</div>
      </div>
      <div style={{ height: "85%", overflowY: "auto" }}>{content}</div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}
      >
        <button onClick={closeModal}>close</button>
      </div>
    </Modal>
  );
}
