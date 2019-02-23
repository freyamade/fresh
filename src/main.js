// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// FontAwesome setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChevronDown, faChevronUp)

import defaultLayout from '~/layouts/default.vue'

export default function (Vue, {router, head, isClient}) {
  // Set default layout as a global component
  Vue.component('layout', defaultLayout)

  // Add the FontAwesome component
  Vue.component('fa-icon', FontAwesomeIcon)
}
