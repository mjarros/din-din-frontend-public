import { useEffect } from "react";
import "./styles.css";
import computarEntradas from "../../utils/computar_entradas";
import { useState } from "react";

function MainContainerResumoAddRegistro({ modalAddRegistro, setModalAddRegistro, lancamentos }) {
  const [saldoEntradas, setSaldoEntradas] = useState(null);
  const [saldoSaidas, setSaldoSaidas] = useState(null);

  useEffect(() => {
    computarEntradas({ lancamentos, setSaldoEntradas, setSaldoSaidas });
    // eslint-disable-next-line
  }, []);

  return (
    <div className='home-main-container-resumo-adicionarRegistro'>
      <div className='home-main-resumo'>
        <h2>Resumo</h2>
        <div className='home-main-resumo-superior'>
          <div className='home-main-resumo-superior-esquerda'>
            <span>Entradas</span>
            <span>Saídas</span>
          </div>
          <div className='home-main-resumo-superior-direita'>
            <span className='home-main-resumo-superior-direita-entradas'>{`R$ ${saldoEntradas}`}</span>
            <span className='home-main-resumo-superior-direita-saidas'>{`R$ ${saldoSaidas}`}</span>
          </div>
        </div>

        <div className='home-main-resumo-inferior'>
          <span className='home-main-resumo-inferior-saldo'>Saldo</span>
          <span className='home-main-resumo-inferior-valor'> {`R$ ${saldoEntradas - saldoSaidas}`}</span>
        </div>
      </div>
      <button onClick={() => setModalAddRegistro(!modalAddRegistro)}>Adicionar Registro</button>
    </div>
  );
}

export default MainContainerResumoAddRegistro;
