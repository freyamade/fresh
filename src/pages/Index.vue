<template>
  <layout>
    <!-- Intro -->
    <div class="block">
      <div class="block-content">
        <h1>hey, i'm freya!</h1>
        <p>i am a full stack web developer and devops engineer currently living and working in cork, ireland</p>
        <p>i like dungeons and dragons, making music, open source and video games</p>
      </div>
      <div class="block-footer">
        <p>scroll down for my resume</p>
        <fa-icon icon="chevron-down" class="more-content" />
      </div>
    </div>

    <!-- What I do -->
    <div class="block">
      <div class="block-content">
        <h2>what i do</h2>
        <p>i am currently a full stack developer of a rest api and saas platform written in python using django</p>
        <p>this also involves upgrading an old monolithic system written in python 2 into microservices architecture written in python 3</p>
        <br />
        <p>on top of that, i work on open source projects which i put up on <a href="https://github.com/freyamade/">my github</a></p>
      </div>
      <div class="block-footer">
        <fa-icon icon="chevron-down" class="more-content" />
      </div>
    </div>

    <!-- What I've Made -->
    <div class="block">
      <div class="block-content">
        <h2>what i've made</h2>
        <p>here's a list of things that i've made / i am currently making;</p>
        <ul>
          <li><a href="https://github.com/freyamade/github-user-languages" target="_blank">github user languages</a> - browser extension to show user languages in a pie chart on github</li>
          <li><a href="http://freyamade.netsoc.co" target="_blank">freyamade.netsoc.co</a> - various techtalks given at ucc netsoc in 2018 / 2019</li>
          <li><a href="https://github.com/freyamade/natural-void" target="_blank">natural void</a> - podcast hosting site made using go in the backend</li>
          <li><a href="https://github.com/freyamade/nocturne" target="_blank">nocturne</a> - village building management application for one of my d&d campaigns, made with crystal and vue.js</li>
          <li><a href="https://github.com/drizzle-lang/drizzle" target="_blank">drizzle</a> - an interpreted programming language of my own design being built in crystal</li>
        </ul>
      </div>
      <div class="block-footer">
        <fa-icon icon="chevron-down" class="more-content" />
      </div>
    </div>

    <!-- What I like -->
    <div class="block">
      <div class="block-content">
        <h2>what i like</h2>
        <p>here's a list of tools / languages that i personally like to use;</p>
        <ul>
          <li><a href="https://crystal-lang.org"target="_blank">crystal</a></li>
          <li><a href="https://www.typescriptlang.org/"target="_blank">typescript</a></li>
          <li><a href="https://www.python.org/"target="_blank">python</a></li>
          <li><a href="https://vuejs.org"target="_blank">vue.js</a></li>
        </ul>
      </div>
      <div class="block-footer">
        <fa-icon icon="chevron-down" class="more-content" />
      </div>
    </div>

    <!-- Contact Me -->
    <div class="block">
      <div class="block-content">
        <h2>contact me</h2>
        <p>i am not currently looking for a job</p>
        <p>if you want to get in contact to discuss projects or anything though, please feel free!</p>
        <p class="contact">contact (at) freyama (dot) de</p>
      </div>
    </div>

    <!-- to top -->
    <div id="to-top">
      <a><fa-icon icon="chevron-up" /></a>
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
  },
}
</script>

<style lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;

  h1, h2 {
    font-size: 400%;
    border-bottom: 2px solid transparent;
    border-image: linear-gradient(to right, #0046cc, #ff206e);
    border-image-slice: 1;
    display: inline;
    margin-bottom: 2%;
    line-height: 1.25;
    flex-grow: 0;
  }
}

.block {
  display: flex;
  flex: 0 0 auto;
  height: inherit;
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
    background-color: #1c1d20;

    & .more-content path {
      fill: #0046cc;
    }
  }

  &:nth-child(odd) .more-content path {
    fill: #ff206e;
  }
}

ul {
  list-style-position: outside;
  list-style: none;
}

li::before {
  font-weight: bold;
  content: "\2053";
  font-size: 1em;
  padding-right: 1.1225em;
  position: relative;
  top: 0em;
}

li:nth-child(even)::before {
  // purple
  color: #80339D;
}

li:nth-child(odd)::before {
  // blue
  color: #0046cc;
}

li:nth-child(4n+3)::before {
  // pink
  color: #ff206e;
}

.contact {
  color: #ff206e;
}

#to-top {
  display: none;
  position: absolute;
  right: 2%;
  bottom: 2%;
  background-color: #17181b;
  display: block;
  border: 1px solid transparent;
  border-image: linear-gradient(to right, #0046cc, #ff206e);
  border-image-slice: 1;

  & path {
    color: white;
  }

  & a {
    display: block;
    padding: 0.5vh;
  }
}
</style>
