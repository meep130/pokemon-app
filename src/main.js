import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import PokedexPage from './components/PokedexPage.vue'
import ItemPage from './components/ItemPage.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const BlankPage = { template: '<div></div>' } // Temporary blank component

const routes = [
  { path: '/', component: BlankPage },
  { path: '/pokedex', component: PokedexPage },
  { path: '/items', component: ItemPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
