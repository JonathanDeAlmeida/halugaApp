<template>
  <section>
      <!--<img alt="Vue logo" src="./assets/logo.png">-->
      <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
      <Menu/>
      <!-- <Agendamentos/> -->
      <!-- <Horarios/> -->
      <!-- <PesquisarLocais/> -->
      <Gerenciar/>
  </section>
</template>

<script>
import Menu from './components/Menu.vue'
// import HelloWorld from './components/HelloWorld.vue'
// import CriarLocal from './components/CriarLocal.vue'
// import CadastroPerfil from './components/CadastroPerfil.vue'
// import Login from './components/Login.vue'
// import PesquisarLocais from './components/PesquisarLocais.vue'
// import Agendamentos from './components/Agendamentos.vue'
import Gerenciar from './components/Gerenciar.vue'
// import Horarios from './components/Horarios.vue'

export default {
  name: 'App',
  components: {
    Menu,
    // HelloWorld,
    // CriarLocal,
    // CadastroPerfil,
    // Login,
    // PesquisarLocais,
    // Agendamentos,
    Gerenciar,
    // Horarios
  }
}
</script>

<style>
/*
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*/
.mb-25 {
  margin-bottom: 25px;
}
.mb-80 {
  margin-bottom: 80px;
}
/* .h-calendar {
  height: 240px !important;
} */
.btn-blue {
  background-color: rgb(14, 14, 255);
  border: none;
  border-radius: 2px;
  color: white;
}
.btn-green {
  background-color: rgb(26, 163, 79);
  border: none;
  border-radius: 2px;
  color: white;
}
.title-path {
  font-size: 50px;
}
.bg-blue {
  background-color: rgb(1, 1, 87);
}
.place-info {
  font-size: 15px;
  margin-bottom: 5px;
}
.place-border-schedules {
  border: 1px solid black;
  padding: 5px;
  margin-bottom: 35px;
}
.place-border {
  border: 1px solid black;
  padding: 5px;
  margin-bottom: 35px;
}
.scheduling-date-time {
  margin-top: 20px;
  background-color:  rgb(1, 1, 87);
  color: white;
}
.scheduling-date-time p {
  font-size: 17px;
}
.place-buttons {
  margin-top: 20px;
}
.place-buttons button {
  margin: 5px;
}
.place-border-schedules img {
  height: 100%;
  width: 100%;
}
@media (max-width: 991px)
{
  .place-border-schedules img {
    height: 250px;
    width: 100%;
  }
}
.place-border img {
  height: 100%;
  width: 100%;
}
@media (max-width: 767px)
{
  .place-border img {
    height: 250px;
    width: 100%;
  }
}
@media (min-width: 768px)
{
  .place-infos {
    padding-left: 0;
    padding-right: 25px;
    text-align: center;
    margin-top: 10px;
  }
  .place-infos.search {
    margin-top: 15px;
  }
}
@media (max-width: 768px)
{
  .place-infos {
    margin-top: 10px;
  }
}
.modal-backdrop {
  opacity: 0.6;
}
.modal-body {
  padding: 15px 0 !important;
}
.modal-border {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
.add-hours .start {
  margin-bottom: 24px;
}
@media (min-width: 992px)
{
  .add-hours .finish{
    float: right;
  }
}
@media (max-width: 991px)
{
  .add-hours {
    text-align: center;
  }
}
.vdatetime-input {
  font-size: 20px;
  text-align: center;
}
</style>
