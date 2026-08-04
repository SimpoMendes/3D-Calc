function brl(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function n(id) {
  return parseFloat(document.getElementById(id).value) || 0;
}

function set(id, v) {
  document.getElementById(id).textContent = brl(v);
}

function calcular() {
  const custoFilamento = (n('peso') / 1000) * n('filamento');
  const custoEnergia   = (n('tempo') * n('potencia') / 1000) * n('energia');
  const embalagem      = n('emb');
  const outros         = n('outros');

  const totalCusto = custoFilamento + custoEnergia + embalagem + outros;

  // Preço de venda considerando margem de lucro desejada
  const margem      = n('margem') / 100;
  const marketplace = n('marketplace') / 100;

  // O preço de venda cobre o custo + margem + taxa marketplace
  const precoVenda = totalCusto / (1 - margem - marketplace);

  const taxaMarketplace = precoVenda * marketplace;
  const lucroLiquido    = precoVenda - totalCusto - taxaMarketplace;

  set('r-filamento',  custoFilamento);
  set('r-energia',    custoEnergia);
  set('r-emb',        embalagem);
  set('r-outros',     outros);
  set('r-custo',      totalCusto);
  set('r-venda',      precoVenda);
  set('r-marketplace', taxaMarketplace);
  set('r-lucro',      lucroLiquido);

  document.getElementById('resultados').classList.remove('hidden');
}
