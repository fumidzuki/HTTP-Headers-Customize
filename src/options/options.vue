<template>
  <div id="app" class="d-flex flex-column" style="min-height: 100vh">
    <nav class="navbar">
      <div class="navbar-brand">HTTP Headers Customizer</div>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-2 my-2">
          <button class="btn btn-outline-success btn-block" v-on:click="doAdd">Add</button>
        </div>
        <div class="col-sm-2 my-2">
          <button class="btn btn-outline-success btn-block" v-on:click="doSave">Save</button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Operations</th>
              <th scope="col">Header Name</th>
              <th scope="col">Header Value</th>
              <th scope="col">Comment</th>
              <th scope="col">Disabled</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(e, index) in options" :key="index" :class="[e.disabled ? 'bg-secondary' : '']">
              <td>
                <select class="form-control" v-model="e.operation">
                  <option value="add">add</option>
                  <option value="modify">modify</option>
                  <option value="remove">remove</option>
                </select>
              </td>
              <td>
                <input type="text" class="form-control" v-model="e.key">
              </td>
              <td>
                <input type="text" class="form-control" v-model="e.value">
              </td>
              <td>
                <input type="text" class="form-control" v-model="e.comment">
              </td>
              <td>
                <input type="checkbox" class="form-control" v-model="e.disabled">
              </td>
              <td>
                <button class="btn btn-primary btn-block" v-on:click="doRemove(index)">remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row">
        <div class="col-sm-2 my-2">
          <button class="btn btn-outline-success btn-block" v-on:click="doAdd">Add</button>
        </div>
        <div class="col-sm-2 my-2">
          <button class="btn btn-outline-success btn-block" v-on:click="doSave">Save</button>
        </div>
      </div>
    </div>
    <div class="align-self-center mt-auto mb-2">
      <div>&copy; 2018 fumidzuki.com</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: []
    }
  },
  beforeCreate: async function() {
    const vm = this
    browser.storage.local.get('options').then(function(e) {
      vm.options = e.options ? e.options : []
    })
  },
  methods: {
    doAdd: function() {
      const vm = this
      vm.options.push({
        key: '',
        value: '',
        operation: '',
        comment: '',
        disabled: false
      })
    },
    doRemove: function(index) {
      const vm = this
      vm.options.splice(index, 1)
    },
    doSave: function() {
      const vm = this
      browser.storage.local.set({
        options: vm.options
      })
    }
  }
}
</script>
