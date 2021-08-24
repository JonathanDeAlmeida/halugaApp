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
            <PesquisarMenu/>
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
import PesquisarMenu from './PesquisarMenu.vue'

export default {
  name: 'Menu',
  components: {
    PesquisarMenu
  },
  data: () => ({
  }),
  methods: {
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
