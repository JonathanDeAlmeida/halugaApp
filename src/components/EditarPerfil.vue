<template>
    <div class="container mt-container mb-container">

        <b-modal v-model="showModalUserDelete" hide-header hide-footer> 
            <template>
                <div class="col-md-12 modal-border">
                    <h4>Excluir</h4>
                </div>
                <div class="col-md-12 text-justify">
                    Seu perfil e seus anúncios serão excluídos, Tem certeza que deseja excluir permanentemente?
                </div>
                <hr>
                <div class="col-md-12">
                    <div class="float-right">
                        <button class="btn-general blue-light mr-2" @click="showModalUserDelete = false"> Fechar </button>
                        <button @click="excluir()" class="btn-general blue">Confirmar</button>
                    </div>
                </div>
            </template>
        </b-modal>

        <div class="row text-center">
            <div class="col-md-12 text-center">
                <p class="title-path">Editar Perfil</p>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(formSubmit)">
                        <div class="row">
                            <div class="col-md-3 mb-25">
                                <label class="label-line">Nome</label>
                                <ValidationProvider rules="required" v-slot="{ errors }">
                                    <input v-model="form.name" class="input-line">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider> 
                            </div>
                            <div class="col-md-3 mb-25">
                                <label class="label-line">Email</label>
                                <ValidationProvider rules="required|email" v-slot="{ errors }">
                                    <input v-model="form.email" class="input-line">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider>  
                            </div>
                            <div class="col-md-2 mb-25">
                                <label class="label-line">Senha</label>
                                <input type="password" v-model="form.password" class="input-line">
                            </div>
                            <div class="col-md-2 mb-25">
                                <label class="label-line">Confirmar Senha</label> 
                                <input type="password" v-model="form.confirmPassword" class="input-line">
                            </div>
                            <div class="col-md-2 mb-25 link-delete-user">
                                <a @click.prevent="showModalUserDelete = true" style="color: red" href="">Excluir meu usuário</a>
                            </div>
                        </div>
                        <button type="submit" class="btn-general blue">Salvar</button>
                    </form>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>

<script>
import { logout, getHeader, apiUrl } from './config'

export default {
    name: 'EditarPerfil',
    components: {
        ValidationObserver,
        ValidationProvider
    },
    data: () => ({
        modalShow: false,
        showModalUserDelete: false,
        form: {
            name: null,
            email: null,
            password: null,
            confirmPassword: null
        }
    }),
    methods: {
        validateForm () {
            if (this.form.password && this.form.password !== this.form.confirmPassword) {
                return false
            }
            if (this.form.confirmPassword && this.form.confirmPassword !== this.form.password) {
                return false
            }
            return true
        },
        formSubmit () {
            if (!this.validateForm()) {
                this.$store.dispatch('getAlertDanger', 'Os campos de confirmação de senha devem ser iguais')
                return false
            }
            this.$store.dispatch('getSpinner', true)
            this.form.id = window.localStorage.getItem('userId')
            this.$http.post(apiUrl + 'user-edit', this.form, {headers: getHeader()}).then(response => {
                if (response.body.user_enabled) {
                    this.$store.dispatch('getAlertSuccess', 'Usuário Editado Com Sucesso')
                    this.getUser()
                } else {
                    this.$store.dispatch('getAlertSuccess', response.body.message)
                }
                this.$store.dispatch('getSpinner', false)
            }, error => {
                if (error.status === 401) {
                    this.$store.dispatch('getUser', null)
                    logout()
                }
            })
        },
        getUserEdit () {
            let userId = window.localStorage.getItem('userId')
            this.$http.post(apiUrl + 'get-user', {user_id: userId}, {headers: getHeader()}).then(response => {
                let user = response.body
                this.form = {
                    name: user.name,
                    email: user.email
                }
                this.$store.dispatch('getSpinner', false)
            })
        },
        excluir () {
            this.$store.dispatch('getSpinner', true)
            this.showModalUserDelete = false
            let userId = window.localStorage.getItem('userId')
            this.$http.post(apiUrl + 'delete-user', {user_id: userId}, {headers: getHeader()}).then(() => {
                this.$store.dispatch('getSpinner', false)
                this.$store.dispatch('getUser', null)
                logout()
            }, error => {
                if (error.status === 401) {
                    this.$store.dispatch('getUser', null)
                    logout()
                }
            })
        },
        getUser () {
            let userId = window.localStorage.getItem('userId')
            if (userId) {
                this.$http.post(apiUrl + 'get-user', {user_id: userId}, {headers: getHeader()}).then(response => {
                    this.$store.dispatch('getUser', response.body)
                    this.getUserEdit()
                }, error => {
                    if (error.status === 401) {
                        this.$store.dispatch('getUser', null)
                        logout()
                    }
                })
            } else {
                this.$store.dispatch('getUser', null)
                logout()
            }
        }
    },
    created () {
        this.$store.dispatch('getSpinner', true)
        this.getUser()
    }
}

import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { email, required } from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'Preenchimento obrigatório'
});

extend('email', {
    ...email,
    message: 'O campo deve ser preenchido com um email válido'
});

</script>

<style scoped>
</style>
