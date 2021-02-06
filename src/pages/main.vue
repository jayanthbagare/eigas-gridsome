const basic = require("../sources/basic")

<template>
    <Layout>
        <div>
          <span>
            Current locale: {{ $context.locale }}
          </span>
          <LocaleSwitcher></LocaleSwitcher>
        </div>
        
        <div v-for="edge in $page.allStoryDetails.edges" :key="edge.node.id">
            <h2>{{ edge.node.title }}</h2>
            <h3>{{ edge.node.story }}</h3>
            <span v-for="a in edge.node.coverPhotoWeb">
                <g-image :src="a.thumbnails.large.url + '?nf_resize=fit&w=100'" width="a.thumbnails.large.width" height="a.thumbnails.large.height" fit="contain"/>
            </span>
        </div>
        <Pager :info="$page.allStoryDetails.pageInfo"/>
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
import LocaleSwitcher from '~/components/LocaleSwitcher.vue'
import { Pager } from 'gridsome';

export default {
  components: {
    LocaleSwitcher,
    Pager
  }
}
</script>
