/* const Nightmare = require('nightmare')
const nightmare = Nightmare({
  show: true
})
const mercadoLivre = nightmare
  .goto('https://www.mercadolivre.com')
  .type('.nav-search-input', 'chapéu preto')
  .click('.nav-search-btn')
  .wait('#searchResults .item__info-link')

mercadoLivre
  .evaluate(() => {
    let teste = []
    document.querySelectorAll('.item__info-link').forEach(a => {
      teste.push(a.href)
    })
    return teste
  })
  .click('.andes-pagination__button--next a')
  .wait('#searchResults .item__info-link')
  .evaluate(() => {
    let teste = []
    document.querySelectorAll('.item__info-link').forEach(a => {
      teste.push(a.href)
    })
    return teste
  })
  .end()
  .then(resp => {
    console.log(resp)
  })
  .catch(error => {
    console.error('Search failed:', error)
  }) */
//import Start from "../modules/module.js";
//import Mercadolivre "../json/mercado_livre.json"
const mercadolivre = require('../json/mercado_livre.json');
const Start = require('../modules/busca.js');

//var urls
//var nightmare

let start = new Start(mercadolivre)
start.busca()/* .then(resultado => {
  console.log(resultado)
}) */

/* nightmare.evalute(mercadolivre.selector).then(hrefs => 
  {
    urls = hrefs
    console.log(urls)
  }) */

//console.log(busca)
