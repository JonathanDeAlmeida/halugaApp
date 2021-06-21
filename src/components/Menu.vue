<template>
  <section class="mb-65">
    <nav class="navbar navbar-expand-lg bg-blue">
      <div class="container">
        <!-- <a class="navbar-brand">Reservas</a> -->
        <router-link class="navbar-brand" to="/">Locais</router-link>
        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent" v-if="user">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/criar-local">Local</router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link class="nav-link" to="/agendamentos">Agendamentos</router-link>
            </li> -->
            <!-- <li class="nav-item">
              <router-link class="nav-link" to="/mensagens">Mensagens</router-link>
            </li> -->
            <li class="nav-item">
              <router-link class="nav-link" to="/gerenciar">Gerenciar</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/editar-perfil">Editar Perfil</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="exit">Sair</a>
            </li>
            <!-- <li class="nav-item">
              <router-link class="nav-link" to="/cadastro-perfil">Cadastro</router-link>
            </li> -->
          </ul>
        </div>
        <div class="collapse navbar-collapse" v-else>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cadastro-perfil">Cadastro</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
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
      this.$router.push('/login')
    }
  },
  created () {
      let userId = window.localStorage.getItem('user')
      if (userId) {
        this.$http.post('http://localhost:8000/api/get-user', {user_id: userId}).then(response => {
          console.log(response.body)
          this.user = response.body
        })
      }
  }
}
</script>

<style scoped>
</style>
