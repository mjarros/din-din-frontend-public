import api from "../../Services/api";
import "./styles.css";
import editar from "../../images/editar.svg";
import excluir from "../../images/excluir.svg";
import { useState } from "react";
import { getItem } from "../../utils/storage";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ExibirModalEditarRegistro from "../../Components/Modal-Editar-Registro";

export default function Entradas({ lancamento, lancamentos, setIdTransacao, arrayCategories, setArrayCategories, setLancamentoEditar, categorieEditarEntrada, setCategorieEditarEntrada }) {
  const [modalExcluirRegistro, setModalExcluirRegistro] = useState(false);
  const [modalEditarRegistro, setModalEditarRegistro] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function editarRegistro(event) {
    setIdTransacao(event.target.id);
    setModalEditarRegistro(!modalEditarRegistro);
  }

  function excluirRegistro(e) {
    setModalExcluirRegistro(!modalExcluirRegistro);
    lancamentos.find((entry) => {
      return parseInt(entry.id) === parseInt(e.target.id);
    });
  }

  function refreshPage() {
    window.location.reload(false);
  }

  async function handleDeleteItem() {
    const token = getItem("token");

    try {
      await api.delete(`/transacao/${lancamento.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setModalExcluirRegistro(!modalExcluirRegistro);
      refreshPage();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div key={lancamento.id} className='home-main-diplay-entries padding_adicional positio_relative'>
      <span className='home-main-diplay-entries-data width_padrao'>{format(new Date(lancamento.data), "dd-MM-yy")}</span>
      <span className='home-main-diplay-entries-data_nome width_padrao'>{format(new Date(lancamento.data), "eee", { locale: ptBR })}</span>
      <span className='home-main-diplay-entries-descricao width_padrao'>{lancamento.descricao}</span>
      <span className='home-main-diplay-entries-categoria width_padrao'>{lancamento.categoria_nome}</span>
      <span className='home-main-diplay-entries-valor width_padrao' style={lancamento.tipo === "saida" ? { color: "#FA8C10" } : { color: "#7B61FF" }}>
        {`R$ ${lancamento.valor.toFixed(2).toLocaleString()}`}
      </span>
      <img className='cursor_pointer' id={lancamento.id} src={editar} onClick={(e) => editarRegistro(e)} alt='imagem_editar' />
      <img className='cursor_pointer' onClick={(e) => excluirRegistro(e)} id={lancamento.id} src={excluir} alt='imagem_excluir' />
      {modalExcluirRegistro && (
        <div className='modal-excluir_registro'>
          <span className='modal-excluir_registro-apagarItem'>Apagar item?</span>
          <div className='modal-excluir_registro-opcoes'>
            <div onClick={() => handleDeleteItem()} className='modal-excluir_registro-opcoes-sim'>
              <span>Sim</span>
            </div>
            <div onClick={() => setModalExcluirRegistro(!modalExcluirRegistro)} className='modal-excluir_registro-opcoes-nao'>
              <span>Nao</span>
            </div>
          </div>
        </div>
      )}
      {modalEditarRegistro && <ExibirModalEditarRegistro errorMsg={errorMsg} setErrorMsg={setErrorMsg} lancamento={lancamento} arrayCategories={arrayCategories} setArrayCategories={setArrayCategories} setLancamentoEditar={setLancamentoEditar} categorieEditarEntrada={categorieEditarEntrada} setCategorieEditarEntrada={setCategorieEditarEntrada} modalEditarRegistro={modalEditarRegistro} setModalEditarRegistro={setModalEditarRegistro} />}
    </div>
  );
}
