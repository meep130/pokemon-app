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
      <div v-if="pokemon" class="pokemon-details">
        <h2>{{ pokemon.name }}</h2>
        <img :src="pokemon.sprites.front_default" alt="Pokémon image" />
        <p><strong>Type:</strong> {{ pokemon.types.map((type) => type.type.name).join(', ') }}</p>
        <p><strong>Height:</strong> {{ pokemon.height }}</p>
        <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
        <button @click="playCry" class="play-cry-button">Play Cry</button>
        <audio ref="pokemonCry"></audio>
      </div>
      <div v-else-if="searchQuery" class="no-results">
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
      suggestions: [],
      allPokemonNames: [],
      pokemon: null,
    }
  },
  mounted() {
    this.fetchAllPokemonNames()
  },
  methods: {
    async fetchAllPokemonNames() {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
      const data = await response.json()
      this.allPokemonNames = data.results.map((pokemon) => pokemon.name)
    },
    filterSuggestions() {
      if (this.searchQuery.trim() === '') {
        this.suggestions = []
        return
      }
      this.suggestions = this.allPokemonNames.filter((name) =>
        name.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
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
</style>
