
const path = require('path');
const withTM = require('next-transpile-modules')(['eventjuicer-site-components']);

  module.exports = withTM({
    webpack: (config) => {
      config.resolve.alias['react'] = path.resolve(__dirname, '.', 'node_modules', 'react');
  
      return config

    },


    i18n: {
      // These are all the locales you want to support in
      // your application
      locales: ['en','de'],
      // This is the default locale you want to be used when visiting
      // a non-locale prefixed path e.g. `/hello`
      defaultLocale: 'en',
      // This is a list of locale domains and the default locale they
      // should handle (these are only required when setting up domain routing)
      domains: [
        {
          domain: 'ecommerceberlin.de',
          defaultLocale: 'de',
        },
        {
          domain: 'ecommerceberlin.com',
          defaultLocale: 'en',
        }
      ],
    },
  
  });

