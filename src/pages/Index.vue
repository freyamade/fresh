<template>
  <layout>
    <div class="block">
      <div class="block-content">
        <h1>hey, i'm freya!</h1>
        <p>i am a full stack web developer and devops engineer currently living and working in cork, ireland</p>
        <p>welcome to my slice of the internet, where i show off the things i like to do, including music, open source projects, and more!</p>
      </div>
      <div class="block-footer">
        <p>scroll down for my resume</p>
        <fa-icon icon="chevron-down" class="more-content" />
      </div>
    </div>
  </layout>
</template>

<script>
export default {
  data: function() {
    return {}
  },
  metaInfo: {
    titleTemplate: '%s a homepage',
    meta: [
      { name: 'author', content: 'freyamade' },
      { name: 'description', content: 'homepage of freya madeline broderick, full stack web developer, devops engineer, composer, lover of dungeons and dragons and developing software' },
    ],
  }
}
</script>

<style lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 400%;
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(to right, #0046cc, #ff206e);
  border-image-slice: 1;
  display: inline;
  margin-bottom: 2%;
  line-height: 1.25;
  flex-grow: 0;
}

.block {
  display: flex;
  flex: 0 0 auto;
  height: 92.2vh;
  width: 100%;
  flex-direction: column;

  & .block-header {
    flex-grow: 0;
    padding-top: 1%;
  }

  & .block-footer {
    flex-grow: 0;
  }

  & .block-content {
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  &:nth-child(even) {
    background-color: #222428;
  }
}

.more-content path {
  fill: #ff206e;
}
</style>
