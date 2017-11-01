 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.org/VandieStudios/ThanksTranslate.svg?branch=master)](https://travis-ci.org/VandieStudios/ThanksTranslate)

# Thanks Translate
Vandie Studios Ltd makes use of this library to translate [Thanks™](https://gothank.me) to a range of languages. We open sourced it as we are only a small company and as such we hoped our community would help to ensure that their own language was supported. We beleive that this not only helps us, but you as well.

## Contribution
Before making any pull requests please ensure ~~you have added your language code to the `lang.js` file and~~ (This is no longer required as we have automated language registration) your language file fits the form shown in `en.json`. Please also keep in mind the following.

Any changes will be put through automated unit tests to ensure that everything is running smoothly.

## Translator Considerations

### Structure
There may be occasions were the correct structure is not possile due to how we've set up our parser, in these occasions, open a second issue for the proposed structure requirment (separate from any pull request or language request issue) and ensure your strings fit your own specification. We'll do our best to try and solve it as long as you do this for us.

### Gender neutrality in languages with grammatical gender
Thanks™ does not store the gender of any of it's members. As such, it's important to us that were possible you use the most gender nuatral version of any phrase (Even if it sounds a little strange considering the language). This is to ensure that no users feel uncomfortable with how they being refered. A wiki page on the use of gender neutrality in languages with gramatical gender can be found [here](https://en.wikipedia.org/wiki/Gender_neutrality_in_languages_with_grammatical_gender).
