const mercadolivre = require('../json/mercado_livre.json');
const Crawler = require('../modules/crawler');

let crawler = new Crawler(mercadolivre)
crawler.busca().then(resultado => {
  console.log(resultado)
})
