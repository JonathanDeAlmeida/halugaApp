<template>
    <div class="container mt-65">

        <div v-if="$store.state.alert.status" :class="'alert-general ' + $store.state.alert.type">
            <div :class="'border-alert ' + $store.state.alert.type">
                <span>{{$store.state.alert.title}}</span>
            </div>
            <div>
                <span>{{$store.state.alert.message}}</span>
            </div>
        </div>

        <div class="row text-center">
            <div class="col-md-12 text-center">
                <p class="title-path">Recuperar Senha</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 px-0">
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(formSubmit)">
                        <div class="col-md-4 mb-25 mx-auto">
                            <label class="label-line">Email</label>
                            <ValidationProvider rules="required|email" v-slot="{ errors }">
                                <input v-model="form.email" class="input-line">
                                <span class="form-error">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="col-md-12 text-center mb-25">
                            <button class="btn-general blue" type="submit">Enviar Email</button>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
            <div class="col-md-12 text-center">
                <router-link class="d-block" to="/cadastro-perfil">Ainda não tenho cadastro</router-link>
                <router-link to="/login">Fazer Login</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RecuperarSenha',
    components: {
        ValidationObserver,
        ValidationProvider
    },
    data: () => ({
        form: {
            email: null
        },
    }),
    methods: {
        formSubmit () {        
            this.$http.post('http://localhost:8000/api/recover-password', this.form).then(response => {
                console.log(response)
                if (response.body.not_found) {
                    this.$store.dispatch('getAlertDanger', response.body.message)
                } else {
                    this.$store.dispatch('getAlertSuccess', response.body.message)
                }
            })
        }
    },
    created () {
        window.localStorage.removeItem('user')
        this.$store.dispatch('getUser', null)

        // 'from' => [
        //     'address' => env('MAIL_FROM_ADDRESS', 'haluga.imoveis@gmail.com'),
        //     'name' => env('MAIL_FROM_NAME', 'Haluga Imoveis'),
        // ],

        // 'transport' => 'smtp',
        // 'host' => env('MAIL_HOST', 'smtp.gmail.com'),
        // 'port' => env('MAIL_PORT', 587),
        // 'encryption' => env('MAIL_ENCRYPTION', 'tls'),
        // 'username' => env('haluga.imoveis@gmail.com'),
        // 'password' => env('ilso88994004'),
        // 'timeout' => null,
        // 'auth_mode' => null,

        // MAIL_MAILER=smtp
        // MAIL_HOST=smtp.gmail.com
        // MAIL_PORT=587
        // MAIL_USERNAME=haluga.imoveis@gmail.com
        // MAIL_PASSWORD=ilso88994004
        // MAIL_ENCRYPTION=tls
        // MAIL_FROM_ADDRESS=haluga.imoveis@gmail.com
        // MAIL_FROM_NAME="${APP_NAME}"

        // MAIL_DRIVER=mailgun
        // MAILGUN_DOMAIN=sandboxbe2edb4761a447f69cef255278eee73a
        // MAILGUN_SECRET=98a1bd99011cca34a8491b97c7332291-e31dc3cc-f742b779
    }
}

import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'O preenchimento do campo é obrigatório'
});
extend('email', {
    ...email,
    message: 'O campo deve ser preenchido com um email válido'
});

</script>

<style scoped>
</style>