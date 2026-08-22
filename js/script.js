function brl(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function n(id) {
  return parseFloat(document.getElementById(id).value) || 0;
}

function set(id, v) {
  document.getElementById(id).textContent = v;
}

function calcular() {
  const custoFilamento = (n('peso') / 1000) * n('filamento');
  const custoEnergia   = (n('tempo') * n('potencia') / 1000) * n('energia');
  const maoObra        = n('maoobra_hora') * n('maoobra_tempo');
  const embalagem      = n('emb');
  const frete          = n('frete');
  const outros         = n('outros');

  const totalCustoBruto = custoFilamento + custoEnergia + maoObra + embalagem + frete + outros;
  const qtd        = Math.max(n('qtd') || 1, 1);
  const totalCusto = totalCustoBruto / qtd;

  const margem      = n('margem') / 100;
  const marketplace = n('marketplace') / 100;
  const vendaManual = n('venda');

  const divisor = 1 - margem - marketplace;
  if (divisor <= 0) {
    alert('A soma de margem + marketplace não pode ser 100% ou mais.');
    return;
  }

  const precoSugerido   = totalCusto / divisor;
  const precoVenda      = vendaManual > 0 ? vendaManual : precoSugerido;
  const taxaMarketplace = precoVenda * marketplace;
  const lucroLiquido    = precoVenda - totalCusto - taxaMarketplace;
  const lucroPercReal   = precoVenda > 0 ? (lucroLiquido / precoVenda) * 100 : 0;

  set('r-filamento',   brl(custoFilamento));
  set('r-energia',     brl(custoEnergia));
  set('r-maoobra',     brl(maoObra));
  set('r-emb',         brl(embalagem));
  set('r-frete',       brl(frete));
  set('r-outros',      brl(outros));
  set('r-custo-lote',  brl(totalCustoBruto));
  set('r-custo',       brl(totalCusto));
  set('r-marketplace', brl(taxaMarketplace));
  set('r-venda',       brl(precoVenda));
  set('r-lucro',       brl(lucroLiquido));
  set('r-lucro-pct',   lucroPercReal.toFixed(1) + '%');

  document.getElementById('resultados').classList.remove('hidden');
}
