// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  plugins: [
    {
      use: '@gridsome/source-airtable',
        options: {
          apiKey: process.env.airtable_apikey, // required
          base: process.env.airtable_base, // required
          tables: [
              {
                name: 'State', // required
                typeName: 'State', // required
              },
              {
                name: process.env.airtable_table, // required
                typeName: process.env.airtable_table, // required
                links: [ // optional
                  {
                      fieldName: 'State',
                      typeName: 'State',
                      linkToFirst: false // optional
                  }
                      ]
              }
            ],
            
          }
    },
    {
      use:'gridsome-plugin-i18n',
      options:{
        locales: [ // locales list
          'en',
          'hi'
        ],
        pathAliases: { // path segment alias for each locales
          'en': 'en',
          'hi':'hi'
        },
        fallbackLocale: 'en', // fallback language
        defaultLocale: 'en', // default language
        enablePathRewrite: false, // rewrite path with locale prefix, default: true
        rewriteDefaultLanguage: false, // rewrite default locale, default: true
      }
    }
  ],
  transformers: {
    remark: {
      plugins: [
        'remark-html','gridsome-plugin-remark-youtube'
      ],config: {
        commonmark: true
    }
    }
  }
}
