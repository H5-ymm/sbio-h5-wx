<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import VConsole from 'vconsole'
let vconsole = new VConsole()
window.vconsole = vconsole
  export default {
    name: 'app'
  }
</script>