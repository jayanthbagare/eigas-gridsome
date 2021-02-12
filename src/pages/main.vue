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
        <b-col v-for="edge in $page.allStoryDetails.edges" :key="edge.node.id">

          <!-- <g-link :to="getLink(edge.node.id)"> -->
            <b-link :to="getLink(edge.node.id)">
          <b-card>

            <b-card-body>
              <span v-for="a in edge.node.coverPhotoWeb">
                <b-card-img top :src="a.thumbnails.large.url"></b-card-img>
              </span>

              <b-card-title>{{ edge.node.title }}</b-card-title>
              <b-card-text>
                {{ getSlug(edge.node.story) }}
              </b-card-text>
            </b-card-body>

          </b-card>
            </b-link>
          <!-- </g-link> -->
          <br />
        </b-col>
      </b-row>
    </b-container>
    <Pager :info="$page.allStoryDetails.pageInfo" />
  </Layout>
</template>

<page-query>
query ($locale:String,$page: Int!){
  allStoryDetails(
     filter:{status:{eq:"ToBePublished"},language:{eq:$locale}},perPage: 10, page: $page
  ) @paginate {
    pageInfo {
        totalPages
        currentPage
      }
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
        language
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
      return bigText.substring(0, 100) + "...";
    },
    getLink: function(rawLink) {
      return "/main/person/" + rawLink;
    },
  },
};
</script>
