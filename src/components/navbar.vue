<template>
  <nav role="navigation" aria-label="main navigation">
    <h2 class="brand">{{ $static.metaData.siteName }}</h2>
    <template v-if="this.hasDropDown">
      <div class="dropdown">
        <h3 class="subnav has-children">
          <span>{{currentRoute().title}}</span>&nbsp;
          <fa-icon icon="chevron-down" />
        </h3>
        <div class="dropdown-content">
          <h3 v-for="r in dropdownRoutes"><g-link :to="r.url">{{r.title}}</g-link></h3>
        </div>
      </div>
    </template>
  </nav>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<script>
export default {
  computed: {
    dropdownRoutes: function () {
      const current = this.$route.path
      return this.routes.filter(function(r) {
        return r.url != current
      })
    },
  },
  data() {
    return {
      routes: [
        // Home
        {url: '/', title: 'a homepage'},

        // /a/
        // {url: '/a/blog/', title: 'a blog'},
        // {url: '/a/language/', title: 'a language'},

        // /some/
        // {url: '/some/music/', title: 'some music'},
        // {url: '/some/plans/', title: 'some plans'},
      ],
    }
  },
  methods: {
    currentRoute: function() {
      const current = this.$route.path
      let route = this.routes[0]
      this.routes.forEach(function(r) {
        if (r.url === current) {
          route = r
        }
      })

      return route
    }
  },
  name: 'Nav',
  props: {
    hasDropDown: {
      type: Boolean,
      default: true,
    }
  }
}
</script>

<style lang="scss">
nav {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(to right, #0046cc, #ff206e);
  border-image-slice: 1;
  user-select: none;
  background-color: #1d1e22;
  height: 10.5vh;

  & a {
    text-decoration: none;
  }
}

.brand {
  color: #fff;
  font-size: 200%;
}

.subnav {
  & > span {
    color: #aaacb6;
    text-decoration: underline solid #d7004b88;
  }
}

.dropdown:hover {
  & .subnav {
    background-color: #151619;
  }

  & .dropdown-content {
    display: block;
  }
}

.dropdown-content {
  // padding: 0.3em;
  display: none;
  position: absolute;
  background-color: #151619;
  box-shadow: 0px 8px 16px 0px #d7004b11;
  z-index: 1;

  & a {
    color: #aaacb6;
    display: block;

    &:hover {
      background-color: #1d1e22;
      color: #aaacb6;
    }
  }
}

.svg-inline--fa path {
  fill: #aaacb6;
}

// Desktop stuff
@media only screen and (min-width: 768px) {
  nav {
    flex-direction: row;
    height: 7.6vh;
  }

  .subnav {
    padding: 0.3em;
    margin-top: 0.5em;
  }

  .brand {
    margin-top: 0.4em;
    margin-bottom: 0.4em;
  }
}
</style>
