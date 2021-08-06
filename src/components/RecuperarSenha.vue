<template>
    <div class="container mt-65">

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
                <router-link class="d-block" to="/cadastrar-perfil">Ainda não tenho cadastro</router-link>
                <router-link to="/login">Fazer Login</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { apiUrl } from './config'

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
            this.$http.post(apiUrl + 'recover-password', this.form).then(response => {
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
    }
}

import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

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