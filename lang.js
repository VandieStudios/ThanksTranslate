var fs = require('fs')
var path = require('path')

//A list of languages that should be used in a right to left context
var rtls = ['ar','arc','dv','far','ha','he','khw','ks','ku','ur','yi']

//Registers all existing languages
var accepted = (() => {
    var accepted = []
    let files = fs.readdirSync(path.parse(__dirname+'/langFiles'))
    files.forEach(file => {
        file = file.replace('.json','')
        if(file != 'Explanation - Not Used') accepted.push(file)
    })
    return accepted
})()

/**
 * Automatically gets the language that the browser is using and gets english if that is unavailable
 * @param {*} req - An ExpressJS Request
 */
var langDetails = (req) => {
    return new Promise( (resolve,reject) => {
        let lang = req.acceptsLanguages(accepted)
        lang = lang != undefined ? lang : 'en'
        let dir = rtls.includes(lang) ? 'rtl' : 'ltr'
        getLangFile(lang).then( langData => resolve( { lang: lang, dir:dir, data:langData } ))
        .catch(err => reject(err))
    })
}

/**
 * Gets a language File
 * @param {String} lang - The 2 char language code that you want to get
 */
var getLangFile = lang => {
    return new Promise( (resolve,reject) => {
        if(accepted.indexOf(lang) != -1){
            fs.readFile(__dirname+'/langFiles/'+lang+'.json', function(err, data){
                err ? reject(err) : resolve(JSON.parse(data))
            })
        }else reject(new Error('Invalid Language Requested ('+lang+')'))
    })
}

module.exports = {
    auto: langDetails,
    get: getLangFile,
    languages: accepted
}