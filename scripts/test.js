const Nightmare = require('nightmare')
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
  })