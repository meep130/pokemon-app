<template>
  <div :class="['navbar', { collapsed: isCollapsed }]">
    <h3>Pokémon App</h3>
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link class="nav-link" to="/" active-class="active-link">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/pokedex" active-class="active-link">Pokedex</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/items" active-class="active-link">Items</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/about" active-class="active-link">About</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isCollapsed: false,
    }
  },
}
</script>

<style>
.navbar {
  width: 250px;
  height: 100vh;
  background-color: #f8f9fa;
  transition: width 0.3s;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
}
.navbar.collapsed {
  width: 0;
  overflow: hidden;
}
.nav-link.active-link {
  background-color: #ffcb05;
  color: #2a75bb;
}
.nav-link:hover {
  background-color: #ffcb05;
  color: #2a75bb;
}
.nav-link.btn-link {
  color: #000;
  text-align: left;
  width: 100%;
}
</style>
