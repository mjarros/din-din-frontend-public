import "./styles.css";
import closeButton from "../../images/close_button.svg";
import arrowDown from "../../images/arrow_down.svg";
import api from "../../Services/api";
import { getItem } from "../../utils/storage";
import { useEffect, useState } from "react";
import { format } from "date-fns";

function ExibirModalEditarRegistro({ errorMsg, setErrorMsg, modalEditarRegistro, setModalEditarRegistro, arrayCategories, categorieEditarEntrada, setCategorieEditarEntrada, lancamento }) {
  const [lancamentoEditar, setLancamentoEditar] = useState({});

  useEffect(() => {
    setLancamentoEditar({
      descricao: lancamento.descricao,
      valor: lancamento.valor,
      data: format(new Date(lancamento.data), "yyyy-MM-dd"),
      categoria_id: lancamento.categoria_id,
      tipo: lancamento.tipo,
    });

    setCategorieEditarEntrada({
      id: lancamento.categoria_id,
      descricao: lancamento.categoria_nome,
    });
    // eslint-disable-next-line
  }, []);

  function hadleChangeSelect(event) {
    const localCategories = [...arrayCategories];

    const myCategorie = localCategories.find((categorie) => categorie.id === parseInt(event.target.value));

    setCategorieEditarEntrada({
      id: myCategorie.id,
      descricao: myCategorie.descricao,
    });
    setLancamentoEditar({ ...lancamentoEditar, categoria_id: myCategorie.id });
  }

  function handleChangeInputEntrada(e) {
    setErrorMsg("");
    setLancamentoEditar({
      ...lancamentoEditar,
      [e.target.name]: e.target.value,
    });
  }

  function refreshPage() {
    window.location.reload(false);
  }

  async function handleEditarRegistro(e) {
    e.preventDefault();

    const token = getItem("token");

    try {
      await api.put(`/transacao/${lancamento.id}`, lancamentoEditar, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setModalEditarRegistro(!modalEditarRegistro);
      refreshPage();
    } catch (error) {
      setErrorMsg(`${error.response.data.mensagem}`);
    }
  }
  return (
    <>
      <div className='modal-background'>
        <form onSubmit={(e) => handleEditarRegistro(e)} className='modal-container'>
          <div className='modal-container-header'>
            <h2>Editar Registro</h2>
            <img className='modal-container-header-close_button' src={closeButton} onClick={() => setModalEditarRegistro(!modalEditarRegistro)} alt='imagem_close' />
          </div>
          <div className='modal-container-btns'>
            <button className='modal-container-btns-btns' style={lancamentoEditar.tipo === "entrada" ? { background: "rgba(58, 159, 241, 1)" } : { background: "rgba(185, 185, 185, 1)" }} type='button' onClick={() => setLancamentoEditar({ ...lancamentoEditar, tipo: "entrada" })}>
              Entrada
            </button>
            <button className='modal-container-btns-btns' style={lancamentoEditar.tipo === "saida" ? { background: "rgba(255, 87, 107, 1)" } : { background: "rgba(185, 185, 185, 1)" }} type='button' onClick={() => setLancamentoEditar({ ...lancamentoEditar, tipo: "saida" })}>
              Saída
            </button>
          </div>
          <div className='modal-container-inputs'>
            <label>
              Valor
              <input type='number' name='valor' value={lancamentoEditar.valor} onChange={handleChangeInputEntrada}></input>
            </label>
            <label>
              Categoria
              <img src={arrowDown} alt='arrow_down' />
              <select value={categorieEditarEntrada.id} onChange={(event) => hadleChangeSelect(event)}>
                {arrayCategories.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.descricao}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Data
              <input type='date' name='data' value={lancamentoEditar.data} onChange={handleChangeInputEntrada}></input>
            </label>
            <label>
              Descrição
              <input type='text' name='descricao' value={lancamentoEditar.descricao} onChange={handleChangeInputEntrada}></input>
            </label>
          </div>
          <button className='modal-container-btn_confirmar' type='submit'>
            Confirmar
          </button>
          {errorMsg && <span className='modal-container-error_msg'>{errorMsg}</span>}
        </form>
      </div>
    </>
  );
}

export default ExibirModalEditarRegistro;
