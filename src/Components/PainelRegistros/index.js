import "./styles.css";
import Entradas from "../../Components/Entradas";
import arrowDown from "../../images/arrow_down.svg";
import { useState } from "react";

function PainelRegistros({
  setIdTransacao,
  lancamentos,
  setLancamentos,
  setLancamentoEditar,
  arrayCategories,
  setArrayCategories,
  categorieEditarEntrada,
  setCategorieEditarEntrada,
}) {
  const [listType, setListType] = useState("crescente");

  function handleDisplayList() {
    if (listType === "decrescente") {
      const novoArrayLancamentos = [...lancamentos];

      const arraySortCrescente = novoArrayLancamentos.sort((a, b) => {
        return new Date(a.data) - new Date(b.data);
      });

      setLancamentos(arraySortCrescente);

      setListType("crescente");
    }

    if (listType === "crescente") {
      const novoArrayLancamentos = [...lancamentos];

      const arraySortDecrescente = novoArrayLancamentos.sort((a, b) => {
        return new Date(b.data) - new Date(a.data);
      });

      setLancamentos(arraySortDecrescente);

      setListType("decrescente");
    }
  }

  return (
    <div className="home-main-diplay">
      <div className="home-main-diplay-header">
        <span
          className="width_padrao cursor_pointer select_data_order"
          onClick={() => handleDisplayList()}
        >
          Data
          <img
            src={arrowDown}
            alt="image_arrow_down"
            className={
              listType === "crescente"
                ? "select_data_order-arrow_down-rotate"
                : "select_data_order-arrow_down"
            }
          />
        </span>
        <span className="width_padrao">Dia da semana</span>
        <span className="width_padrao">Descrição</span>
        <span className="width_padrao">Categoria</span>
        <span className="width_padrao">Valor</span>
        <span className="width_padrao"></span>
        <span className="width_padrao"></span>
      </div>

      {lancamentos.map((lancamento) => (
        <Entradas
          lancamento={lancamento}
          lancamentos={lancamentos}
          key={lancamento.id}
          setIdTransacao={setIdTransacao}
          arrayCategories={arrayCategories}
          setArrayCategories={setArrayCategories}
          setLancamentoEditar={setLancamentoEditar}
          categorieEditarEntrada={categorieEditarEntrada}
          setCategorieEditarEntrada={setCategorieEditarEntrada}
        />
      ))}
    </div>
  );
}

export default PainelRegistros;
