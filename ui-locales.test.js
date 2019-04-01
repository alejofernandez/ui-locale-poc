const { pickLocale } = require('./');

test.each`
  supported              | uiLocales     | accepted   | defaultLocale | expected
  ${'en,es,de,ja,fr,nl'} | ${'pt,es'}    | ${'es'}    | ${''}         | ${'es'}
  ${'en,es,de,ja,fr,nl'} | ${'pt,es'}    | ${'ja'}    | ${''}         | ${'es'}
  ${'en,es,de,ja,fr,nl'} | ${''}         | ${'es'}    | ${''}         | ${'es'}
  ${'en,es,de,ja,fr,nl'} | ${'ja'}       | ${'ja'}    | ${''}         | ${'ja'}
  ${'en,es,de,ja,fr,nl'} | ${'en-US,es'} | ${'en-GB'} | ${''}         | ${'en'}
  ${'en,es,de,ja,fr,nl'} | ${'en'}       | ${'es'}    | ${''}         | ${'en'}
  ${'en,es,de,ja,fr,nl'} | ${'nl-BE'}    | ${'nl-BE'} | ${''}         | ${'nl'}
  ${'en,es,de,ja,fr,nl'} | ${'pl'}       | ${'nl-BE'} | ${''}         | ${'nl'}
  ${'en,es,de,ja,fr,nl'} | ${'nl,en'}    | ${''}      | ${''}         | ${'nl'}
  ${'en,es,de,ja,fr,nl'} | ${'pl'}       | ${''}      | ${'nl'}       | ${'nl'}
  ${'en,es,de,ja,fr,nl'} | ${''}         | ${'pl'}    | ${'nl'}       | ${'nl'}
  ${'en,es,de,ja,fr,nl'} | ${''}         | ${''}      | ${''}         | ${'en'}
`(
  'result should be `$expected`\n    when suported languages are `$supported`\n    -- and ui_locales are `$uiLocales`\n    -- and accept-language is `$accepted`\n    -- and default_ui_locale is `$defaultLocale`\n',
  ({supported, uiLocales, accepted, defaultLocale, expected}) => {
    expect(pickLocale(supported.split(','), uiLocales.split(','), accepted, defaultLocale)).toBe(expected);
  },
);
