<template>
  <section>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <div class="container">
      
        <b-navbar-brand v-if="$store.state.user">
          <router-link to="/agendamentos">Meus Imóveis</router-link>
        </b-navbar-brand>
        <b-navbar-brand v-else>
          <router-link to="/">Locais</router-link>
        </b-navbar-brand>
      
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      
        <b-collapse id="nav-collapse" is-nav>
          <template v-if="$store.state.user">
            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown right>
                <template #button-content>
                  <em>{{$store.state.user.name}}</em>
                </template>
                <b-dropdown-item>              
                  <router-link to="/editar-perfil">Editar Perfil</router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <span @click.prevent="exit">Sair</span>
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </template>
          <template v-else>
          <b-navbar-nav>
            <b-nav-item>
              <router-link to="/login" v-if="!$store.state.user">Fazer Login</router-link>
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
      window.localStorage.removeItem('user')
      this.$store.dispatch('getUser', null)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>
