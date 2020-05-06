<template>
  <div id="app">
    <div id="nav">
      <p><router-link to="/">Home</router-link></p>
      <p><router-link to="/about">About</router-link></p>
      <p><router-link to="/vueApp1">子项目Home</router-link></p>
      <p><router-link to="/vueApp1/about">子项目About</router-link></p>
    </div>
    <div id="single-vue" class="single-spa-vue">
      <div id="vue"></div>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
