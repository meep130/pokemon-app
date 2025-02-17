<template>
  <div class="pokedex-page">
    <h1>Pokédex Search</h1>
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        @input="filterSuggestions"
        placeholder="Enter Pokémon name"
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
      <div v-if="totalPages > 1" class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
      <div v-if="pokemon" class="pokemon-details">
        <h2>{{ pokemon.name }}</h2>
        <img :src="pokemon.sprites.front_default" alt="Pokémon image" />
        <p><strong>Type:</strong> {{ pokemon.types.map((type) => type.type.name).join(', ') }}</p>
        <p><strong>Height:</strong> {{ pokemon.height }}</p>
        <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
        <button @click="playCry" class="play-cry-button">Play Cry</button>
        <audio ref="pokemonCry"></audio>
      </div>
      <div v-else-if="searchQuery && suggestions.length === 0" class="no-results">
        No Pokémon found with the name "{{ searchQuery }}".
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokedexPage',
  data() {
    return {
      searchQuery: '',
      allPokemonNames: [],
      suggestions: [],
      pokemon: null,
      currentPage: 1,
      itemsPerPage: 10,
      totalPokemon: 0,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalPokemon / this.itemsPerPage)
    },
  },
  mounted() {
    this.fetchInitialPokemonNames(0, 10)
  },
  methods: {
    async fetchInitialPokemonNames(offset) {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${this.itemsPerPage}&&offset=${offset}`,
      )
      const data = await response.json()

      this.allPokemonNames = data.results.map((pokemon) => pokemon.name)
      this.suggestions = this.allPokemonNames
      this.totalPokemon = data.count
      this.updatePaginatedSuggestions()
    },
    filterSuggestions() {
      if (this.searchQuery.trim() === '') {
        this.suggestions = this.allPokemonNames
        this.currentPage = 1
        this.updatePaginatedSuggestions()
        return
      }
      this.suggestions = this.allPokemonNames.filter((name) =>
        name.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
      this.currentPage = 1
      this.updatePaginatedSuggestions()
    },
    updatePaginatedSuggestions() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      fetchInitialPokemonNames(start, end)
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        const start = (this.currentPage - 1) * this.itemsPerPage
        this.fetchInitialPokemonNames(start)
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        const start = (this.currentPage - 1) * this.itemsPerPage
        this.fetchInitialPokemonNames(start)
      }
    },
    async selectSuggestion(suggestion) {
      this.searchQuery = suggestion
      this.suggestions = []
      await this.searchPokemon()
    },
    async searchPokemon() {
      if (this.searchQuery.trim() === '') {
        this.pokemon = null
        return
      }

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${this.searchQuery.toLowerCase()}`,
      )
      if (response.ok) {
        this.pokemon = await response.json()
      } else {
        this.pokemon = null
      }
    },
    async playCry() {
      if (this.pokemon) {
        const cryUrl = this.pokemon.cries.latest
        const response = await fetch(cryUrl)
        if (response.ok) {
          const cryAudio = this.$refs.pokemonCry
          cryAudio.src = cryUrl
          cryAudio.play()
        } else {
          alert('Cry not found')
        }
      }
    },
  },
}
</script>

<style>
.pokedex-page {
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #2a75bb;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
