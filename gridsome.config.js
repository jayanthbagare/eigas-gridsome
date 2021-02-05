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
                name: process.env.airtable_table, // required
                typeName: process.env.airtable_table, // required
              }
            ]
          }
      }
  ]
}
