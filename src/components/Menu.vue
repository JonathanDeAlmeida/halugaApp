<template>
  <section class="mb-80">
    <nav class="navbar navbar-expand-lg bg-blue">
      <div class="container">
        <a class="navbar-brand" href="#">Reservas</a>
        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#">Agendamentos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Local</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Mensagens</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Gerenciar</a>
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
