/**
 * options.js
 * Copyright (c) 2018 fumidzuki
 * Licensed under MIT (https://github.com/XXXXX/LICENSE)
 */
var app = new Vue({
  el: '#app',
  data() {
    return {
      options_enable: '',
      options: []
    }
  },
  beforeCreate: function () {
    const vm = this
    browser.storage.local.get('options_enable').then(function (e) {
      vm.options_enable = e.options_enable ? true : false
    })
    browser.storage.local.get('options').then(function (e) {
      vm.options = e.options ? e.options : []
    })
  },
  methods: {
    doAdd: function () {
      const vm = this
      vm.options.push({
        key: '',
        value: '',
        operation: '',
        comment: '',
        disabled: false
      })
    },
    doRemove: function (index) {
      const vm = this
      const options = vm.options.splice(index, 1)
    },
    doSave: function () {
      const vm = this
      browser.storage.local.set({
        'options': vm.options
      })
    },
    doSwitch: function () {
      const vm = this
      vm.options_enable = !vm.options_enable
      browser.storage.local.set({
        'options_enable': vm.options_enable
      })
      // ツールバーアイコン表示を設定する
      const options = browser.storage.local.get(['options_enable']).then(function (e) {
        if (!e) {
          return
        }
        let icon = 'icons/icon-off-48.svg'
        if (e.options_enable) {
          icon = 'icons/icon-on-48.svg'
        }
        browser.browserAction.setIcon({
          path: icon
        })
      })
    },
    openOptionsPage: function () {
      browser.runtime.openOptionsPage()
    }
  }
})
