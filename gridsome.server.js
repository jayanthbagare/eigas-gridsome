// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(async ({ graphql,createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    const { data } = await graphql(`
    {
      allStoryDetails{
        edges{
          node{
            id
            title
            story
            coverPhotoWeb{
              thumbnails{
                large{
                  url
                }
              }
            }
            status
          }
        }
      }
    }
    `);

    data.allStoryDetails.edges.forEach(({ node }) => {
        createPage({
          path: `/main/person/${node.id}` ,
          component: "./src/templates/DetailsPage.vue",
          context: {
            id: node.id 
          }
        })
    })
  })
}
