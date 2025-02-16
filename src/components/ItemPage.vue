<template>
  <div class="item-page">
    <h1>Pokédex Search</h1>
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        @input="filterSuggestions"
        placeholder="Enter Item name"
        class="search-input"
      />
      <ul v-if="suggestions.length > 0" class="suggestions-list">
        <li
          v-for="suggestion in suggestions"
          :key="suggestion"
          @click="selectSuggestion(suggestion)"
        >
          {{ suggestion }}
        </li>
      </ul>
      <div v-if="item" class="item-details">
        <h2>{{ item.name }}</h2>
        <img :src="item.sprites.default" alt="Item image" />
        <p><strong>Description:</strong> {{ item.effect_entries[0].short_effect }}</p>
      </div>
      <div v-else-if="searchQuery" class="no-results">
        No Pokémon found with the name "{{ searchQuery }}".
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemPage',
  data() {
    return {
      searchQuery: '',
      suggestions: [],
      allItemNames: [],
      item: null,
    }
  },
  mounted() {
    this.fetchAllItemNames()
  },
  methods: {
    async fetchAllItemNames() {
      const response = await fetch('https://pokeapi.co/api/v2/item?limit=1000')
      const data = await response.json()
      this.allItemNames = data.results.map((item) => item.name)
    },
    filterSuggestions() {
      if (this.searchQuery.trim() === '') {
        this.suggestions = []
        return
      }
      this.suggestions = this.allItemNames.filter((name) =>
        name.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
    },
    async selectSuggestion(suggestion) {
      this.searchQuery = suggestion
      this.suggestions = []
      await this.searchItem()
    },
    async searchItem() {
      if (this.searchQuery.trim() === '') {
        this.item = null
        return
      }

      const response = await fetch(
        `https://pokeapi.co/api/v2/item/${this.searchQuery.toLowerCase()}`,
      )
      if (response.ok) {
        this.item = await response.json()
      } else {
        this.item = null
      }
    },
  },
}
</script>

<style>
.item-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f8ff;
  height: 100vh;
}

.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.search-input {
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.suggestions-list {
  width: 300px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.suggestions-list li {
  padding: 10px;
  cursor: pointer;
}

.suggestions-list li:hover {
  background-color: #f0f0f0;
}

.pokemon-details {
  text-align: center;
}

.pokemon-details img {
  width: 150px;
  height: auto;
}

.no-results {
  color: red;
  margin-top: 20px;
}

.play-cry-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #2a75bb;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.play-cry-button:hover {
  background-color: #ffcb05;
  color: #2a75bb;
}
</style>
