<template>
  <div id="app">
    <div class="d-flex flex-column">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-2 my-2">
            <button class="btn btn-block" :class="[options_enable ? 'bg-success text-white' : 'bg-secondary text-white']"
              v-on:click="doSwitch">
              <span v-if="options_enable === true">Enabled</span>
              <span v-if="options_enable === false">Disabled</span>
            </button>
          </div>
          <div class="col-sm-2 my-2">
            <button class="btn btn-success btn-block" v-on:click="openOptionsPage">Open Options Page</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options_enable: ''
    }
  },
  beforeCreate: async function() {
    const vm = this
    await browser.storage.local.get('options_enable').then(function(e) {
      vm.options_enable = e.options_enable ? true : false
    })
  },
  methods: {
    doSwitch: function() {
      const vm = this
      vm.options_enable = !vm.options_enable
      browser.storage.local.set({
        options_enable: vm.options_enable
      })
      // ツールバーアイコン表示を設定する
      browser.storage.local.get(['options_enable']).then(function(e) {
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
    openOptionsPage: function() {
      browser.runtime.openOptionsPage()
    }
  }
}
</script>
