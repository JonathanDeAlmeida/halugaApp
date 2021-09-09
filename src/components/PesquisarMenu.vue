<template>
    <b-navbar-nav class="search-menu">
      <div class="w-100">
        <div class="d-inline-flex mr-2">
          <b-dropdown class="mr-1" :text="intentText">
            <b-dropdown-item @click="changeIntent('rent', 'Alugar')">Alugar</b-dropdown-item>
            <b-dropdown-item @click="changeIntent('sell', 'Comprar')">Comprar</b-dropdown-item>
          </b-dropdown>
          <b-dropdown :text="addressTypeText">
            <b-dropdown-item @click="changeAddressType('city', 'Cidade')">Cidade</b-dropdown-item>
            <b-dropdown-item @click="changeAddressType('district', 'Bairro')">Bairro</b-dropdown-item>
            <b-dropdown-item @click="changeAddressType('street', 'Rua')">Rua</b-dropdown-item>
          </b-dropdown>
        </div>
        <div class="div-search-menu">
            <input v-if="$store.state.addressType === 'city'" v-model="$store.state.city" :placeholder="'Adicionar ' + addressTypeText + '...'" class="input-search-menu">
            <input v-else-if="$store.state.addressType === 'district'" v-model="$store.state.district" :placeholder="'Adicionar ' + addressTypeText + '...'" class="input-search-menu">
            <input v-else v-model="$store.state.street" :placeholder="'Adicionar ' + addressTypeText + '...'" class="input-search-menu">
            <span class="material-icons cursor-pointer icon-search-menu" @click="searchAddress()">search</span>
        </div>
        <div class="d-inline-flex float-right">
          <button class="btn-general blue d-inline" @click.prevent="setFilter()">
          Mais Filtros
          </button>
        </div>
      </div>
    </b-navbar-nav>
</template>

<script>
export default {
  name: 'Menu',
  data: () => ({
    intentText: 'Alugar',
    addressTypeText: 'Cidade'
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
    changeAddressType (addressType, addressTypeText) {
      this.$store.state.addressType = addressType
      this.addressTypeText = addressTypeText
    },
    searchAddress () {
      if (this.$store.state.addressType === 'city') {
        this.$store.state.district = ''
        this.$store.state.street = ''
      } else if (this.$store.state.addressType === 'district') {
        this.$store.state.city = ''
        this.$store.state.street = ''
      } else {
        this.$store.state.city = ''
        this.$store.state.district = ''
      }
      this.$store.dispatch('getSearch', !this.$store.state.search)
    }
  }
}
</script>

<style scoped>
</style>
