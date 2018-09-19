const Nightmare = require('nightmare')
const nightmare = Nightmare({
    show: true
})

module.exports = class Start {
    constructor(data) {
        this.url = data.goto;
        this.type = data.type;
        this.type_key = data.type_key;
        this.click = data.click;
        this.wait = data.wait;
        this.next = data.next;
        this.selector = data.selector;
        //this.next_click = data.next_click;
        //this.test = null;
    }

    busca() {
        /* return new Promise((resolve) => { */
        this.startSearch()
        this.getUrls()

        /*  }) */

    }

    startSearch() {
        nightmare
            .goto(this.url)
            .type(this.type, this.type_key)
            .click(this.click)
            .wait(this.wait)
    }

    getUrls() {
        return new Promise((resolve) => {
            nightmare.evaluate((classe) => {
                    let retorno = {
                        page: null,
                        mais: false,
                        resultado: []
                    }
                    /* if (document.getElementsByClassName(next)) {
                        retorno.mais = true
                    } */
                    retorno.page = document.querySelector(".andes-pagination__button--current").textContent
                    document.querySelectorAll(classe).forEach(a => {
                        retorno.resultado.push(a.href)
                    })
                    return retorno
                }, this.selector)
                .then(resp => {
                    console.log("page: " + resp.page)
                    this.nextPage()
                    /* console.log(nightmare.exists(this.next))
                    if (!resp.mais) {
                        this.test.end()
                        resolve(resp.resultado)
                    } else { */
                    /* this.nextPage().then(resultado => {
                        console.log(resultado)
                        resultado.forEach(result => {
                            resp.resultado.push(result)
                        })
                        resolve(resultado)
                    }) */
                    /* }

                }).then(() => {
                    console.log("test")
                    return this.test.wait(this.next).click(this.next)*/
                })
        })
    }

    nextPage() {
        return new Promise((resolve) => {
            nightmare.exists(this.next)
                .then(resp => {
                    if (resp) {
                        nightmare.click(this.next)
                            .wait(this.wait)
                        this.getUrls()
                    } else {
                        console.log("FIM")
                    }
                })

            /* this.getUrls().then(resp => {
                resolve(resp.resultado)
            }) */
            /* nightmare.then(() => {
                console.log("ok")
                nightmare.click(this.next)
                    .wait(this.wait)
            }) */
            /* 
            .then(() => {
                this.getUrls().then(resp => {
                    resolve(resp.resultado)
                })
            }) */
            /* console.log(this.next)
            this.getUrls().then(resp => {
                resolve(resp.resultado)
            }) */
        })
    }
}