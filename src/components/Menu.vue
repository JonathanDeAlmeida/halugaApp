<template>
  <section class="mb-80">
    <nav class="navbar navbar-expand-lg bg-blue">
      <div class="container">
        <a class="navbar-brand">Reservas</a>
        <!-- <router-link class="navbar-brand" to="/">Reservas</router-link>
        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
          <span class="navbar-toggler-icon"></span>
        </button> -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <!-- <li class="nav-item">
              <router-link class="nav-link" to="/agendamentos">Agendamentos</router-link>
            </li> -->
            <li class="nav-item">
              <router-link class="nav-link" to="/criar-local">Local</router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link class="nav-link" to="/mensagens">Mensagens</router-link>
            </li> -->
            <li class="nav-item">
              <router-link class="nav-link" to="/gerenciar">Gerenciar</router-link>
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
  props: {
    msg: String
  }
}
</script>

<style scoped>
</style>
