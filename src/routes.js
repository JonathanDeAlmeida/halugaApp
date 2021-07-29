import Vue from 'vue'
import VueRouter from 'vue-router'

import MeusImoveis from './components/MeusImoveis'
import CadastrarImovel from './components/CadastrarImovel.vue'
import CadastrarPerfil from './components/CadastrarPerfil.vue'
import Login from './components/Login.vue'
import PesquisarImovel from './components/PesquisarImovel.vue'
import DetalhesImovel from './components/DetalhesImovel.vue'
import EditarPerfil from './components/EditarPerfil.vue'
import RecuperarSenha from './components/RecuperarSenha.vue'


Vue.use(VueRouter)

const routes = [
    {
        name: 'MeusImoveis',
        path: '/meus-imoveis',
        component: MeusImoveis
    },
    {
        name: 'RecuperarSenha',
        path: '/recuperar-senha',
        component: RecuperarSenha
    },
    {
        name: 'CadastrarImovel',
        path: '/cadastrar-imovel',
        component: CadastrarImovel
    },
    {
        name: 'EditarImovel',
        path: '/editar-imovel/:id',
        component: CadastrarImovel
    },
    {
        name: 'CadastrarPerfil',
        path: '/cadastrar-perfil',
        component: CadastrarPerfil
    },
    {
        name: 'Login',
        path: '/login',
        component: Login
    },
    {
        name: 'PesquisarImovel',
        path: '/',
        component: PesquisarImovel
    },
    {
        name: 'DetalhesImovel',
        path: '/detalhes-imovel/:id',
        component: DetalhesImovel
    },
    {
        name: 'EditarPerfil',
        path: '/editar-perfil',
        component: EditarPerfil
    },
]

const router = new VueRouter({routes, mode: 'history'})

export default router