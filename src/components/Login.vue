<template>
    <div class="container mt-container mb-container">

        <div class="row text-center mb-3">
            <div class="col-md-12 text-center">
                <img width="100%" height="100" src="../static/logo-color.svg">
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 px-0">
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(formSubmit)">
                        <div class="col-md-4 mb-25 mx-auto">
                            <label class="label-line">Email</label>
                            <ValidationProvider rules="required" v-slot="{ errors }">
                                <input v-model="form.email" class="input-line">
                                <span class="form-error">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="col-md-4 mb-25 mx-auto">
                            <label class="label-line">Senha</label>
                            <ValidationProvider rules="required" v-slot="{ errors }">
                                <input v-model="form.password" class="input-line" type="password">
                                <span class="form-error">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="col-md-12 text-center mb-25">
                            <button class="btn-general blue" type="submit">Entrar</button>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
            <div class="col-md-12 text-center">
                <router-link class="link-blue d-block" to="/cadastrar-perfil">Ainda não tenho cadastro</router-link>
                <!-- <router-link to="/recuperar-senha">Esqueci a senha</router-link> -->
            </div>
        </div>
    </div>
</template>

<script>
import { getHeader, apiUrl } from './config'
export default {
    name: 'Login',
    components: {
        ValidationObserver,
        ValidationProvider
    },
    data: () => ({
        form: {
            email: null,
            password: null
        },
    }),
    methods: {
        formSubmit () {
            this.$store.dispatch('getSpinner', true)
            this.$http.post(apiUrl + 'login', this.form).then(response => {
                if (response.body.user_enabled) {
                    window.localStorage.setItem('userId', response.body.userId)
                    window.localStorage.setItem('authUser', response.body.authUser)
                    this.$router.push('/meus-imoveis')
                } else {
                    this.$store.dispatch('getAlertDanger', response.body.message)
                }
                this.$store.dispatch('getSpinner', false)
            })
        },
        getUser () {
            let userId = window.localStorage.getItem('userId')
            if (userId) {
                this.$http.post(apiUrl + 'get-user', {user_id: userId}, {headers: getHeader()}).then(response => {
                    this.$store.dispatch('getUser', response.body)
                    this.$router.push('/')
                    this.$store.dispatch('getSpinner', false)
                }, error => {
                    console.log(error)
                    this.$store.dispatch('getUser', null)
                    window.localStorage.clear();
                })
            } else {
                this.$store.dispatch('getSpinner', false)
            }
        }
    },
    created () {
        this.$store.dispatch('getSpinner', true)
        this.getUser()
    }
}

import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'Preenchimento obrigatório'
});

</script>

<style scoped>
</style>
