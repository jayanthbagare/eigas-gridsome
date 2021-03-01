const basic = require("../sources/basic")

<template>
  <Layout>
    <div>
      <span> Current locale: {{ $context.locale }} </span>
      <LocaleSwitcher></LocaleSwitcher>
    </div>
    <br />
    <b-container fluid>
      <b-row cols="2">
        <b-col v-for="edge in $page.allData.edges" :key="edge.node.id">
            <b-link :to="getLink(edge.node.id)">
          <b-card>

            <b-card-body>
              <b-card-img top :src="getSingleCoverPhotoImage(edge.node.cdnPhotoUrl)"></b-card-img>
              <b-card-title>{{ edge.node.name }},{{ edge.node.state[0].state }}</b-card-title>
              <b-card-text>
                <blockquote class="card-blockquote">{{ edge.node.quote }}</blockquote>
              </b-card-text>
            </b-card-body>

          </b-card>
            </b-link>

          <br />
        </b-col>
      </b-row>
    </b-container>
    <Pager :info="$page.allData.pageInfo" />
  </Layout>
</template>

<page-query>
query ($locale:String,$page: Int!){
  allData(
     filter:{status:{eq:"ToBePublished"},language:{eq:$locale}},perPage: 10, page: $page
  ) @paginate {
    pageInfo {
        totalPages
        currentPage
      }
    edges{
      node{
        id
        name
        websiteContent
        cdnPhotoUrl{
          thumbnails{
            large{
              url
            }
          }
        }
        status
        language
        quote
        state{
          state
        }
      }
    } 
  }
}
</page-query>

<script>
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
import { Pager } from "gridsome";

export default {
  components: {
    LocaleSwitcher,
    Pager,
  },
  methods: {
    getSlug: function(bigText) {
      console.log(bigText);
      return bigText.substring(0, 100) + "...";
    },
    getLink: function(rawLink) {
      return "/main/person/" + rawLink;
    },
    getSingleCoverPhotoImage(coverPhotos){
      if(coverPhotos.length == 0){
        return 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659650_960_720.png'
      }else{
        return coverPhotos[0].thumbnails.large.url;
      }
    }
  },
};
</script>
