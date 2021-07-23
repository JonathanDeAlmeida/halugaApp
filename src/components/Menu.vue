<template>
  <section>
    <b-navbar toggleable="lg" variant="dark" style="background-color: #e63946 !important">
      <div class="container">
      
        <b-navbar-brand>
          <router-link to="/" class="mr-3">
            <img height="40" src="..\assets\logo-white.svg">
          </router-link>
        </b-navbar-brand>

        <template v-if="$store.state.user">
          <router-link to="/agendamentos" class="link-menu">
            <span>Meus Imóveis</span>
          </router-link>
        </template>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      
        <b-collapse id="nav-collapse" is-nav>
          <template v-if="$store.state.user">
            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown right>
                <template #button-content>
                  <em class="color-white">{{$store.state.user.name}}</em>
                </template>
                <b-dropdown-item>              
                  <router-link style="color: black; text-decoration: none" to="/editar-perfil">Editar Perfil</router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <span @click.prevent="exit">Sair</span>
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
        </template>
          <template v-else>
          <b-navbar-nav class="ml-auto">
            <b-nav-item right v-if="$route.path !== '/login' && $route.path !== '/cadastro-perfil'">
              <router-link class="link-menu" to="/login" v-if="!$store.state.user">Anúnciar Imóvel</router-link>
            </b-nav-item>
          </b-navbar-nav>
          </template>
        </b-collapse>
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
    exit () {
      window.localStorage.clear()
      this.$store.dispatch('getUser', null)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>
