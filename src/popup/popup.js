import Vue from 'vue'
import Popup from './popup.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(Popup)
})
