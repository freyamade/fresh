<template>
  <div>
    <Nav v-bind:has-drop-down="false" />

    <main>
      <div class="error-wrapper">
        <h1>oops</h1>
        <p>
          you've taken a wrong turn somewhere along the way
        </p>
        <p>
          let me set you back on <g-link to="/">the right path</g-link>
        </p>
      </div>
    </main>
  </div>
</template>

<script>
import Nav from '~/components/navbar.vue'
export default {
  components: {
    Nav
  },
  metaInfo: {
    titleTemplate: '%s a 404 page',
    meta: [
      { name: 'author', content: 'freyamade' },
      { name: 'description', content: '404 error page' },
    ],
  }
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.error-wrapper {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 400%;
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(to right, #0046cc, #ff206e);
  border-image-slice: 1;
  flex-grow: 0;
  margin-bottom: 2%;
  display: inline-block;
  line-height: 1.25;
}
</style>
