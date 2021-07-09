import Vue from 'vue'
import VueRouter from 'vue-router'

import Agendamentos from './components/Agendamentos'
import CriarLocal from './components/CriarLocal.vue'
import CadastroPerfil from './components/CadastroPerfil.vue'
import Login from './components/Login.vue'
import PesquisarLocais from './components/PesquisarLocais.vue'
import Horarios from './components/Horarios.vue'
import EditarPerfil from './components/EditarPerfil.vue'

Vue.use(VueRouter)

const routes = [
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
        name: 'EditarLocal',
        path: '/editar-local/:id',
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
        path: '/horarios/:id',
        component: Horarios
    },
    {
        name: 'EditarPerfil',
        path: '/editar-perfil',
        component: EditarPerfil
    },
]

const router = new VueRouter({routes, mode: 'history'})

export default router