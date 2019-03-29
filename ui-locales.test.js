const { pickLocale } = require('./');

test.each`
  supported              | uiLocales  | accepted            | expected
  ${'en, es, pt-BR, pt'} | ${'en'}    | ${'en-US,en;q=0.5'} | ${'en'}
  ${'en, es, pt-BR, pt'} | ${''}      | ${'en-US,en;q=0.5'} | ${'en'}
`(
  'result should be `$expected`\n    when suported languages are `$supported`\n    -- and ui_locales are `$uiLocales`\n    -- and accept-language is `$accepted`\n',
  ({supported, uiLocales, accepted, expected}) => {
    expect(pickLocale(supported.split(','), uiLocales.split(','), accepted)).toBe(expected);
  },
);