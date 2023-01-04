import "./styles.css";
import closeButton from "../../images/close_button.svg";
import arrowDown from "../../images/arrow_down.svg";
import api from "../../Services/api";
import { getItem } from "../../utils/storage";
import { useEffect, useState } from "react";
import handleUpdateEntryInformation from "../../utils/updateEntryInformation";

function ExibirModalAddRegistro({ errorMsg, setErrorMsg, modalAddRegistro, setModalAddRegistro, arrayCategories, setArrayCategories, setLancamentos }) {
  const [categorie, setCategorie] = useState({ id: "", descricao: "" });

  const [formEntrada, setFormEntrada] = useState({
    descricao: "",
    valor: "",
    data: "",
    categoria_id: "",
    tipo: "saida",
  });

  function hadleChangeSelect(event) {
    const localCategories = [...arrayCategories];

    const myCategorie = localCategories.find((categorie) => categorie.id === parseInt(event.target.value));

    setCategorie({ id: myCategorie.id, descricao: myCategorie.descricao });
    setFormEntrada({ ...formEntrada, categoria_id: myCategorie.id });
  }

  useEffect(() => {
    handdleGetCategories();
    // eslint-disable-next-line
  }, []);

  function handleChangeInputEntrada(e) {
    setErrorMsg("");
    setFormEntrada({ ...formEntrada, [e.target.name]: e.target.value });
  }

  async function handdleGetCategories() {
    const token = getItem("token");

    try {
      const response = await api.get("/categoria", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArrayCategories(response.data);
    } catch (error) {
      setErrorMsg(`${error.response.data.mensagem}`);
    }
  }

  async function handleAddRegistro(e) {
    e.preventDefault();

    const token = getItem("token");

    try {
      await api.post("/transacao", formEntrada, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setModalAddRegistro(!modalAddRegistro);
      handleUpdateEntryInformation({ getItem, setLancamentos });
    } catch (error) {
      setErrorMsg(`${error.response.data.mensagem}`);
    }
  }
  return (
    <>
      {modalAddRegistro && (
        <div className='modal-background'>
          <form onSubmit={(e) => handleAddRegistro(e)} className='modal-container'>
            <div className='modal-container-header'>
              <h2>Adicionar Registro</h2>
              <img className='modal-container-header-close_button' src={closeButton} onClick={() => setModalAddRegistro(!modalAddRegistro)} alt='imagem_close' />
            </div>
            <div className='modal-container-btns'>
              <button className='modal-container-btns-btns' style={formEntrada.tipo === "entrada" ? { background: "rgba(58, 159, 241, 1)" } : { background: "rgba(185, 185, 185, 1)" }} type='button' onClick={() => setFormEntrada({ ...formEntrada, tipo: "entrada" })}>
                Entrada
              </button>
              <button className='modal-container-btns-btns' style={formEntrada.tipo === "saida" ? { background: "rgba(255, 87, 107, 1)" } : { background: "rgba(185, 185, 185, 1)" }} type='button' onClick={() => setFormEntrada({ ...formEntrada, tipo: "saida" })}>
                Saída
              </button>
            </div>
            <div className='modal-container-inputs'>
              <label>
                Valor
                <input type='number' name='valor' value={formEntrada.valor} onChange={handleChangeInputEntrada}></input>
              </label>
              <label>
                Categoria
                <img src={arrowDown} alt='imagem_arrow_down' />
                <select value={categorie.id} onChange={(event) => hadleChangeSelect(event)}>
                  {arrayCategories.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.descricao}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Data
                <input type='date' name='data' value={formEntrada.data} onChange={handleChangeInputEntrada}></input>
              </label>
              <label>
                Descrição
                <input type='text' name='descricao' value={formEntrada.descricao} onChange={handleChangeInputEntrada}></input>
              </label>
            </div>
            <button className='modal-container-btn_confirmar' type='submit'>
              Confirmar
            </button>
            {errorMsg && <span className='modal-container-error_msg'>{errorMsg}</span>}
          </form>
        </div>
      )}
    </>
  );
}

export default ExibirModalAddRegistro;
