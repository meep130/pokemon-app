<template>
  <div>
    <button class="btn btn-link menu-icon" @click="toggleNavbar">
      <span class="navbar-toggler-icon custom-toggler-icon"></span>
    </button>
    <div :class="['navbar', { collapsed: isCollapsed }]">
      <h3>Pokémon App</h3>
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link active" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pokedex</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Items</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Settings</a>
        </li>
      </ul>
    </div>
    <div class="content flex-grow-1 p-3">
      <!-- Your main content goes here -->
    </div>
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
  methods: {
    toggleNavbar() {
      this.isCollapsed = !this.isCollapsed
    },
  },
}
</script>

<style scoped>
.navbar-toggler-icon.custom-toggler-icon {
  background-image: url('data:image/svg+xml;charset=utf8,%3Csvg viewBox%3D%220 0 30 30%22 xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cpath stroke%3D%22rgba(0, 0, 0, 1.0)%22 stroke-width%3D%222%22 stroke-linecap%3D%22round%22 stroke-miterlimit%3D%2210%22 d%3D%22M4 7h22M4 15h22M4 23h22%22/%3E%3C/svg%3E');
}
.navbar {
  width: 250px;
  height: 100vh;
  background-color: #f8f9fa;
  transition: width 0.3s;
}
.navbar.collapsed {
  width: 0;
  overflow: hidden;
}
.nav-link.active {
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
