const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

nightmare
  .goto('https://www.mercadolivre.com')
  .type('.nav-search-input', 'chapéu preto')
  .click('.nav-search-btn')
  .wait('#result-section')
  .evaluate(() => document.querySelector('#result-section').href)
  .end()
  .then(console.log)
  .catch(error => {
    console.error('Search failed:', error)
  })