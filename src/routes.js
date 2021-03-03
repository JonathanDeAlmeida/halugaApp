import Vue from 'vue'
import VueRouter from 'vue-router'

import Gerenciar from './components/Gerenciar'
import Agendamentos from './components/Agendamentos'
import CriarLocal from './components/CriarLocal.vue'
import CadastroPerfil from './components/CadastroPerfil.vue'
import Login from './components/Login.vue'
import PesquisarLocais from './components/PesquisarLocais.vue'
import Horarios from './components/Horarios.vue'

Vue.use(VueRouter)

const routes = [
    {
        name: 'Gerenciar',
        path: '/gerenciar',
        component: Gerenciar
    },
    {
        name: 'Agendamentos',
        path: '/agendamentos',
        component: Agendamentos
    },
    {
        name: 'CriarLocal',
        path: '/criar-local',
        component: CriarLocal
    },
    {
        name: 'CadastroPerfil',
        path: '/cadastro-perfil',
        component: CadastroPerfil
    },
    {
        name: 'Login',
        path: '/login',
        component: Login
    },
    {
        name: 'PesquisarLocais',
        path: '/',
        component: PesquisarLocais
    },
    {
        name: 'Horarios',
        path: '/horarios',
        component: Horarios
    },
]

const router = new VueRouter({routes, mode: 'history'})

export default router