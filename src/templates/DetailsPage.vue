<template>
    <Layout>
        <div v-for="edge in $page.allData.edges" :key="edge.node.id">
          <h2>{{ edge.node.name }}</h2>
          <b-carousel
            :id="edge.node.id"
            controls
            no-animation=true
            indicators
            img-width=500
            img-height=500
          >
            <!-- <span v-for="a in edge.node.cdnPhotoUrl"> -->
              <span v-for="a in getMedia(edge.node.cdnPhotoUrl,edge.node.altPhotos,edge.node.video,edge.node.altTextVideo)">
                <div v-if="a.type==='image'">
                  <b-carousel-slide v-if="a.type==='image'" :img-src="a.url" :img-alt="a.alt"></b-carousel-slide>
                </div>
                <div v-else>
                  <b-carousel-slide>
                    <iframe width="854" height="480" :src="a.url" frameborder="0" allowfullscreen></iframe>
                  </b-carousel-slide>
                </div>
              </span>
            </b-carousel>
          <p v-html="getFormattedContent(edge.node.websiteContent)"></p>
        </div>
    </Layout>
</template>

<page-query>
query ($id:ID!){
  allData(filter:{id:{eq:$id}}){
    edges{
      node{
        id
        name
        websiteContent
        cdnPhotoUrl{
          thumbnails{
            large{
              url
              width
              height
            }
          }
        }
        status
        altPhotos
        video
        altTextVideo
      }
    }
  }
}
</page-query>

<script>
export default {
  methods:{
    getCarouselPhotos:function(photos){
      if(photos.length == 0){
        return 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659650_960_720.png'
      }else{
        return photos.thumbnails.large.url;
      }
        
    },
    getFormattedContent:function(websiteContent){
      var str = '';
      str = websiteContent.replace(/(?:\r\n|\r|\n)/g, '<br/>');
      return str;
    },
    getMedia:function(cdnPhotoUrl,altPhotos,video,altTextVideo){
      var result = [];
      var arrPos = 0;

      var altText = altPhotos.split("~");
      var video = video;
      var altVideo = altTextVideo;

      
      cdnPhotoUrl.forEach(element => {
        var obj = {"url":element.thumbnails.large.url,"alt":altText[arrPos],"type":"image"};
        result.push(obj);
        obj = {};  
        arrPos++;
      });

      var objVideo = {"url":video,"alt":altTextVideo,"type":"video"};
      result.push(objVideo);

return result;
    }
  }
}
</script>