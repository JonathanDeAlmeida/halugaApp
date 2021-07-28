<template>
    <div class="container mt-container mb-container">

        <div class="row text-center">
            <div class="col-md-12 text-center">
                <img width="100%" height="100" src="..\assets\logo-color.svg">
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-12">
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(formSubmit)">
                        <div class="row">
                            <div class="col-md-5 mb-25 mx-auto">
                                <label class="label-line">Nome</label>
                                <ValidationProvider rules="required" v-slot="{ errors }">
                                    <input v-model="form.name" class="input-line">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5 mb-25 mx-auto">
                                <label class="label-line">Email</label>
                                <ValidationProvider rules="required|email" v-slot="{ errors }">
                                    <input v-model="form.email" class="input-line">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider>  
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5 mb-25 mx-auto">
                                <label class="label-line">Senha</label>
                                <ValidationProvider rules="required|minmax:5,10" v-slot="{ errors }" vid="confirmationPassword">
                                    <input type="password" v-model="form.password" class="input-line">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5 mb-25 mx-auto">
                                <label class="label-line">Confirmar Senha</label>                        
                                <ValidationProvider rules="required|minmax:5,10|confirmed:confirmationPassword" v-slot="{ errors }">
                                    <input type="password" v-model="form.confirmPassword" class="input-line">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider> 
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5 mb-25 mx-auto">
                                <router-link class="btn-general green float-left" to="/login">Login</router-link>
                                <button type="submit" class="btn-general blue float-right">Cadastrar</button>
                            </div>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>

<script>
import { getHeader, apiUrl } from './config'
export default {
    name: 'CadastroPerfil',
    components: {
        ValidationObserver,
        ValidationProvider
    },
    data: () => ({
        form: {
            name: null,
            email: null,
            password: null,
            confirmPassword: null
        }
    }),
    methods: {
        formSubmit () {        
            this.$store.dispatch('getSpinner', true)
            this.$http.post(apiUrl + 'user-create', this.form).then(response => {
                if (response.body.user_enabled) {
                    window.localStorage.setItem('userId', response.body.userId)
                    window.localStorage.setItem('authUser', response.body.authUser)
                    this.$store.dispatch('getSpinner', false)
                    this.$router.push('/criar-local')
                } else {
                    this.$store.dispatch('getAlertDanger', response.body.message)
                }
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
import { confirmed, email, required } from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'O preenchimento do campo é obrigatório'
});

extend('email', {
    ...email,
    message: 'O campo deve ser preenchido com um email válido'
});

extend('confirmed', {
    ...confirmed,
    message: 'O campo de confirmação deve ser igual ao campo correspondente'
});

extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max;
  },
  params: ['min', 'max'],
  message: 'O campo deve ter no mínimo 5 caracteres e no máximo 10 caracteres'
});

</script>

<style scoped>
</style>
