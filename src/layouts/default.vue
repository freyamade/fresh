<template>
  <div>
    <Nav v-bind:has-drop-down="false" />

    <main>
      <slot/> <!-- Page content inserted here -->
    </main>
  </div>
</template>

<script>
import Nav from '~/components/navbar.vue'

export default {
  components: {
    Nav
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  background-color: #18191c;
  color: #fff;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
}

a {
  color: #8fb6ff;

  & .svg-inline--fa path {
    fill: #8fb6ff;
  }

  &:hover {
    color: #ff5792;

    & .svg-inline--fa path {
      fill: #ff5792;
    }
  }
}

main {
  height: 89.5vh;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
}

p:not(:last-child) {
  margin-bottom: 0.5%;
}

// Accessibility
.sr-only {
  display: none;
}

// Desktop
@media only screen and (min-width: 768px) {
  main {
    height: 92.2vh;
  }
}
</style>
