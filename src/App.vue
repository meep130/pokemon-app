<template>
  <div id="app" class="app-container">
    <Navbar />
    <router-view class="content flex-grow-1 p-3"></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
  },
}
</script>

<style>
body,
html,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.app-container {
  display: flex;
  width: 100%;
  height: 100vh;
}

.content {
  flex-grow: 1;
  padding: 3px;
}
</style>
