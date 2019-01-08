const Nightmare = require('nightmare')
const nightmare = Nightmare({
    show: false
})

module.exports = class Crawler {
    constructor(data) {
        this.click = data.click;
        this.next = data.next;
        this.url = data.goto;
        this.next_click = data.next_click;
        this.next_end = data.next_end;
        this.titleSelector = data.titleSelector;
        this.type = data.type;
        this.type_key = data.type_key;
        this.urlSelector = data.urlSelector;
        this.wait = data.wait;
    }

    busca() {
        return new Promise((resolve, reject) => {
            this.startSearch()
            this.getData().then(data => {
                nightmare.end().then(() => {
                    resolve(data)
                }).catch(erro => {
                    reject(erro)
                })
            })
        })
    }

    startSearch() {
        nightmare
            .goto(this.url)
            .type(this.type, this.type_key)
            .click(this.click)
            .wait(this.wait)
    }

    getData() {
        return new Promise((resolve) => {
            let data = new Array
            this.getTitles().then(titles => {
                this.getUrls().then(urls => {
                    for (let key of titles.keys()) {
                        data.push({
                            title: titles[key],
                            url: urls[key]
                        })
                    }
                    this.nextPage().then(lastPage => {
                        if (lastPage) {
                            if (lastPage.length) {
                                console.log(lastPage)
                                lastPage.forEach(item => {
                                    data.push(item)
                                })
                            }
                            resolve(data)
                        }
                    })
                })
            })
        })
    }

    getTitles() {
        return new Promise((resolve) => {
            nightmare.evaluate((titleSelector) => {
                    let titles = new Array
                    document.querySelectorAll(titleSelector).forEach(title => {
                        titles.push(title.textContent)
                    })
                    return titles
                }, this.titleSelector)
                .then(titles => {
                    resolve(titles)
                })
        })
    }

    getUrls() {
        return new Promise((resolve) => {
            nightmare.evaluate((urlSelector) => {
                    let urls = new Array
                    document.querySelectorAll(urlSelector).forEach(a => {
                        urls.push(a.href)
                    })
                    return urls
                }, this.urlSelector)
                .then(urls => {
                    resolve(urls)
                })
        })
    }

    nextPage() {
        return new Promise((resolve) => {
            nightmare.exists(this.next)
                .then(resp => {
                    if (resp) {
                        nightmare.exists(this.next_end)
                            .then(resp => {
                                if (resp) {
                                    resolve(true)
                                } else {
                                    nightmare
                                        .click(this.next_click)
                                        .wait(this.wait)
                                    this.getData().then(data => {
                                        resolve(data)
                                    })
                                }
                            })
                    }
                })
        })
    }
}