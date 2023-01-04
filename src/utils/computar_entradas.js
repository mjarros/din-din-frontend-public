export default function computarEntradas({
  lancamentos,
  setSaldoEntradas,
  setSaldoSaidas,
}) {
  let entradas = 0;
  let saidas = 0;

  for (let lancamento of lancamentos) {
    if (lancamento.tipo === "entrada") {
      entradas = entradas + lancamento.valor;
    } else {
      saidas = saidas + lancamento.valor;
    }
  }

  setSaldoEntradas(entradas);
  setSaldoSaidas(saidas);
}
