<template>
    <Layout>
        <div v-for="edge in $page.allStoryDetails.edges" :key="edge.node.id">
          <h2>{{ edge.node.title }}</h2>
          <b-carousel
            :id="edge.node.id"
            controls
            indicators
            img-width=500
            img-height=500
          >

            <span v-for="a in edge.node.coverPhotoWeb">
                <b-carousel-slide :img-src="getCarouselPhotos(a)"></b-carousel-slide>
            </span>
            </b-carousel>
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
              width
              height
            }
          }
        }
        status
      }
    }
  }
}
</page-query>

<script>
export default {
  methods:{
    getCarouselPhotos:function(photos){
        return photos.thumbnails.large.url;
    }
  }
}
</script>