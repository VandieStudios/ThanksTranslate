var fs = require('fs')

var langDetails = (req) => {
    return new Promise( (resolve,reject) => {
        let rtls = ['ar','arc','dv','far','ha','he','khw','ks','ku','ur','yi']
        let accepted = ['en','de']
        let lang = req.acceptsLanguages(accepted)
        lang = lang != undefined ? lang : 'en'
        let dir = rtls.includes(lang) ? 'rtl' : 'ltr'
        getLangFile(lang).then( langData => resolve( { lang: lang, dir:dir, data:langData } ))
        .catch(err => reject(err))
    })
}

var getLangFile = lang => {
    return new Promise( (resolve,reject) => {
        fs.readFile(__dirname+'/langFiles/'+lang+'.json', function(err, data){
            err ? reject(err) : resolve(JSON.parse(data))
        })
    })
}

module.exports = langDetails
