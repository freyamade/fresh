<template>
  <layout>
    <div class="card" v-for="edge in $page.allAlbumDetails.edges" :key="edge.node._id" v-html="edge.node.content"></div>
  </layout>
</template>

<page-query>
query Album {
  allAlbumDetails {
    edges {
      node {
        id
        content
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    titleTemplate: '%s some music',
    meta: [
      { name: 'author', content: 'freyamade' },
      { name: 'description', content: 'freyamade some music' },
    ],
  }
}
</script>

<style lang="scss">
main {
  display: flex;
  padding: 0 5%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.card {
  width: 80%;
  background-color: #27282e;
  padding: 1%;
  // text-align: center;

  &:nth-child(odd) {
    box-shadow: 0 4px 8px 0 rgba(255, 32, 110, 0.2), 0 6px 20px 0 rgba(255, 32, 110, 0.19);
  }

  &:nth-child(even) {
    box-shadow: 0 4px 8px 0 rgba(0, 70, 204, 0.2), 0 6px 20px 0 rgba(0, 70, 204, 0.19);
  }

  & p {
    margin-bottom: 1%;
  }

  & img {
    display: block;
    float: right;
  }
}
</style>
