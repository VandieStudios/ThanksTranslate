var fs = require('fs')

//A list of languages that should be used in a right to left context
var rtls = ['ar','arc','dv','far','ha','he','khw','ks','ku','ur','yi']
//The array in which all accepted languages are put.
var accepted = []

fs.readdir('./langFiles', (err, files) => {
    files.forEach(file => {
        file = file.replace('.json','')
        file != 'Explanation - Not Used' ? accepted.push(file) : false
    })
})

var langDetails = (req) => {
    return new Promise( (resolve,reject) => {
        let lang = req.acceptsLanguages(accepted)
        lang = lang != undefined ? lang : 'en'
        let dir = rtls.includes(lang) ? 'rtl' : 'ltr'
        getLangFile(lang).then( langData => resolve( { lang: lang, dir:dir, data:langData } ))
        .catch(err => reject(err))
    })
}

var getLangFile = lang => {
    return new Promise( (resolve,reject) => {
        if(accepted.indexOf(lang) != -1){
            fs.readFile(__dirname+'/langFiles/'+lang+'.json', function(err, data){
                err ? reject(err) : resolve(JSON.parse(data))
            })
        }else reject('Invalid Language Requested')
    })
}

module.exports = langDetails
