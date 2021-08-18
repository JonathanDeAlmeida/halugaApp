<template>
  <section>
    <b-navbar toggleable="lg" class="navbar-main">
      <div class="container">

        <b-navbar-brand>
          <router-link to="/" class="mr-3">
            <img height="40" src="../static/logo-white.svg">
          </router-link>
        </b-navbar-brand>

        <template v-if="$store.state.user">

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item>
                <span class="item-menu" @click.prevent="goTo('/meus-imoveis')">
                  Meus Imóveis
                </span>
              </b-nav-item>
              <b-nav-item>
                <span class="item-menu" @click.prevent="goTo('/cadastrar-imovel')">
                  Cadastrar Imóvel
                </span>
              </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown>
                <template #button-content>
                  <em class="name-user-menu">{{$store.state.user.name}}</em>
                </template>
                <b-dropdown-item @click.prevent="goTo('/editar-perfil')">              
                  <span>Editar Perfil</span>
                </b-dropdown-item>
                <b-dropdown-item @click.prevent="exit">
                  <span>Sair</span>
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>  
          </b-collapse>
        
        </template>
        <template v-else>
          <template v-if="$route.path !== '/login' && $route.path !== '/cadastrar-perfil'">
            <b-navbar-nav class="search-menu">
              <b-dropdown class="mr-1" :text="$store.state.intent === 'rent' ? 'Alugar' : 'Comprar'">
                <b-dropdown-item @click="$store.state.intent = 'rent'">Alugar</b-dropdown-item>
                <b-dropdown-item @click="$store.state.intent = 'sell'">Comprar</b-dropdown-item>
              </b-dropdown>
              <b-dropdown :text="$store.state.condition === 'residencial' ? 'Residencial' : 'Comercial'">
                <b-dropdown-item @click="$store.state.condition = 'residencial'">Residencial</b-dropdown-item>
                <b-dropdown-item @click="$store.state.condition = 'comercial'">Comercial</b-dropdown-item>
              </b-dropdown> 
              <input v-model="$store.state.address" placeholder="Adicionar uma rua, bairro ou cidade" class="input-search-menu">
              <button class="btn-general blue float-right d-inline" @click.prevent="setFilter()">
                Filtro
              </button>
            </b-navbar-nav>
            <b-navbar-nav>
              <b-nav-item right>
                <router-link class="button-menu" to="/login">Anúnciar Imóvel</router-link>
              </b-nav-item>
            </b-navbar-nav>
          </template>
        </template>
      </div>
    </b-navbar>
  </section>
</template>

<script>
export default {
  name: 'Menu',
  data: () => ({
    user: null
  }),
  methods: {
    setFilter () {
      this.$store.dispatch('getModalFilterShow', true)
    },
    goTo (path) {
      this.$store.dispatch('getSpinner', true)
      this.$router.push(path)
      setTimeout(() => {
        this.$store.dispatch('getSpinner', false)
      }, 1000)
    },
    exit () {
      this.$store.dispatch('getSpinner', true)
      window.localStorage.clear()
      this.$store.dispatch('getUser', null)
      this.$router.push('/')
      setTimeout(() => {
        this.$store.dispatch('getSpinner', false)
      }, 1000)
    }
  }
}
</script>

<style scoped>
</style>
