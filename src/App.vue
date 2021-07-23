<template>
  <section>
      <div v-if="$store.state.alert.status" :class="'alert-general ' + $store.state.alert.type">
          <div :class="'border-alert ' + $store.state.alert.type">
              <span>{{$store.state.alert.title}}</span>
          </div>
          <div>
              <span>{{$store.state.alert.message}}</span>
          </div>
      </div>
      <Menu/>
      <router-view></router-view>
      <!-- <div class="spinner-gritcode"></div> -->
  </section>
</template>

<script>
import Menu from './components/Menu.vue'
import './assets/style.css'

export default {
  name: 'App',
  components: {
    Menu,
  }
}
</script>
