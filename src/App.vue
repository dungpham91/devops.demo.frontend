<template>
  <img alt="Vue logo" src="./assets/logo.png">

  <div id="app">
    <BlockList />
  </div>
</template>

<script>
import BlockList from './components/BlockList.vue'

export default {
  name: 'App',
  components: {
    BlockList,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
