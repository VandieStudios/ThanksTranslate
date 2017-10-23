require('it-each')({ testPerIteration: true })
var assert = require('assert')
var lang = require('../lang')


describe('thanks-translate', function() {
    describe('#get()', function() {
        it.each(lang.languages, 'Can read "%s" language file and it has no missing elements',['element'], (curLang, done, next) => {
            if(curLang == 'en'){
                lang.get(curLang)
                .then(curLang => {
                    if(curLang.language.toLowerCase() == 'english') done()
                    else done(new Error('English has invalid setup'))
                }).catch(e => {
                    assert.equal(e,undefined,e.toString())
                })
            }else{
                lang.get(curLang)
                .then(curLang => { return checkAgainstEnglish(curLang)})
                .then(() => { done() })
                .catch(done)
            }
        })
    })
})

var checkAgainstEnglish = (curLang) => {
    return new Promise((resolve,reject) => {
        lang.get('en')
        .then(en => {
            let valid = true
            let missing = []
            for(ka in en){
                if(curLang[ka] == undefined) {
                    valid = false
                    missing.push(ka)
                }
                if(typeof en[ka] === 'object')
                for(kb in en[ka]){
                    if(curLang[ka][kb] == undefined){
                        valid = false
                        missing.push(ka+'.'+kb)
                    }
                    if(typeof en[ka][kb] === 'object')
                    for(kc in en[ka][kb]){
                        if(curLang[ka][kb][kc] == undefined){
                            valid = false
                            missing.push(ka+'.'+kb+'.'+kc)
                        }
                    }
                }
            }
            valid ? resolve() : reject(new Error('The following variables are missing from the "'+curLang.language+'" language file: '+missing.join(', ')))
        })
    })
}