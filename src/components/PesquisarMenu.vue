<template>
    <b-navbar-nav class="search-menu">
      <div class="w-100">
        <div class="d-inline-flex">
          <b-dropdown class="mr-1" :text="intentText">
          <b-dropdown-item @click="changeIntent('rent-residencial', 'Alugar - Residencial')">Alugar - Residencial</b-dropdown-item>
          <b-dropdown-item @click="changeIntent('rent-comercial', 'Alugar - Comercial')">Alugar - Comercial</b-dropdown-item>
          <b-dropdown-item @click="changeIntent('sell-residencial', 'Comprar - Residencial')">Comprar - Residencial</b-dropdown-item>
          <b-dropdown-item @click="changeIntent('sell-comercial', 'Comprar - Comercial')">Comprar - Comercial</b-dropdown-item>
          </b-dropdown>
          <button class="btn-general blue d-inline" @click.prevent="setFilter()">
          Mais Filtros
          </button>
        </div>
        <div class="div-search-menu float-right">
            <input v-model="$store.state.address" placeholder="Adicionar uma rua, bairro ou cidade" class="input-search-menu">
            <span class="material-icons ml-2 mt-2 cursor-pointer" @click="searchAddress()">search</span>
        </div>
      </div>
    </b-navbar-nav>
</template>

<script>
export default {
  name: 'Menu',
  data: () => ({
    intentText: 'Alugar - Residencial'
  }),
  methods: {
    setFilter () {
      this.$store.dispatch('getModalFilterShow', true)
    },
    changeIntent (intent, intentText) {
      this.$store.state.intent = intent
      this.intentText = intentText
      this.$store.dispatch('getSearch', !this.$store.state.search)
    },
    searchAddress () {
      this.$store.dispatch('getSearch', !this.$store.state.search)
    }
  }
}
</script>

<style scoped>
</style>
