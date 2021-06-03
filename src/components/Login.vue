<template>
    <div class="container">

        <div v-if="alert.status" :class="'alert-general ' + alert.type">
            <div :class="'border-alert ' + alert.type">
                <span>{{alert.title}}</span>
            </div>
            <div>
                <span>{{alert.message}}</span>
            </div>
        </div>

        <div class="row text-center">
            <div class="col-md-12 text-center">
                <p class="title-path">Login</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 px-0">
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(formSubmit)">
                        <div class="col-md-6 mb-25 mx-auto">
                            <label>Login</label>
                            <ValidationProvider rules="required" v-slot="{ errors }">
                                <input v-model="form.login" class="form-control">
                                <span class="form-error">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="col-md-6 mb-25 mx-auto">
                            <label>Senha</label>
                            <a class="float-right" href="">Esqueci a senha</a>
                            <ValidationProvider rules="required" v-slot="{ errors }">
                                <input v-model="form.password" class="form-control" type="password">
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
                <router-link to="/cadastro-perfil">Ainda não tenho cadastro</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    components: {
        ValidationObserver,
        ValidationProvider
    },
    data: () => ({
        modalShow: false,
        form: {
            login: null,
            password: null
        },
        alert: {
            status: false,
            title: "",
            type: "",
            message: ""
        },
    }),
    methods: {
        formSubmit () {        
            this.$http.post('http://localhost:8000/api/login', this.form).then(response => {
                if (response.body.user_enabled) {
                    window.localStorage.setItem('user', response.body.user_id)
                    this.$router.push('/gerenciar')
                } else {
                    this.setAlert('danger', 'Erro', response.body.message)
                }
            })
        },
        setAlert (type, title, message) {
            this.alert.type = type
            this.alert.title = title
            this.alert.message = message
            this.alert.status = true
            setTimeout(() => {
                this.alert.status = false
                this.alert.type = ""
                this.alert.title = ""
                this.alert.message = ""
            }, 5000)
        }
    }
}

import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'O preenchimento do campo é obrigatório'
});

</script>

<style scoped>
</style>
