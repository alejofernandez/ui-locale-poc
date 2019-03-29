const { pick, parse } = require('accept-language-parser');

function pickLocale(supported, uiLocales, accepted) {
  const supportedParsed = supported.map(l => parse(l)[0]).filter(l => l);
  const uiLocalesParsed = uiLocales.map(l => parse(l)[0]).filter(l => l);

  // filter supported languages list with the requested ui-locales
  const supportedUiLocales = supportedParsed
    .filter(supported => uiLocalesParsed
      .some(uiLocale => uiLocale.code === supported.code)
    );

  // build the final list of locales to check against accepted
  const checkAgainstAccepted = (supportedUiLocales.length ? supportedUiLocales : supportedParsed)
    .map(({code, region}) => region ? `${code}-${region}` : code);

  // check supported/ui-locales list against accepted
  return pick(checkAgainstAccepted, accepted) || checkAgainstAccepted[0];
}

module.exports = {
  pickLocale
};