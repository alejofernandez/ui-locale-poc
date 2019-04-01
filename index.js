const { pick, parse } = require('accept-language-parser');

function pickLocale(supported, uiLocales, accepted, defaultLocale) {
  const supportedParsed = supported.map(l => parse(l)[0]).filter(l => l);
  const uiLocalesParsed = uiLocales.map(l => parse(l)[0]).filter(l => l);

  // filter supported languages list with the requested ui-locales
  const supportedUiLocales = uiLocalesParsed
    .filter(uiLocale => supportedParsed
      .some(supported => supported.code === uiLocale.code)
    )
    // we only pick the country, but we may want to support country/region in the future
    .map(({code}) => code);

  // if there are no matches between supported and ui_locales we use supported
  const supportedToCheck = supportedUiLocales.length ?
    supportedUiLocales : supported;

  // check supported/ui-locales list against accepted
  const foundAccepted = supportedToCheck.length && accepted ?
    pick(supportedToCheck, accepted, { loose: true }) : null;

  return foundAccepted || supportedUiLocales[0] || defaultLocale || 'en';
}

module.exports = {
  pickLocale
};