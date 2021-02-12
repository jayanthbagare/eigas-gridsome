<template>
    <Layout>
        <div v-for="edge in $page.allStoryDetails.edges" :key="edge.node.id">
          <h2>{{ edge.node.title }}</h2>
            <span v-for="a in edge.node.coverPhotoWeb">
                <g-image :src="a.thumbnails.large.url + '?nf_resize=fit&w=100'" width="a.thumbnails.large.width" height="a.thumbnails.large.height" fit="contain"/>
            </span>
          <h3>{{ edge.node.story }}</h3>
        </div>
    </Layout>
</template>

<page-query>
query ($id:ID!){
  allStoryDetails(filter:{id:{eq:$id}}){
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
</page-query>
