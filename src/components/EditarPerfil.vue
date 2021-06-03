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
                <p class="title-path">Edição</p>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(formSubmit)">
                        <div class="row">
                            <div class="col-md-6 mb-25">
                                <label>Nome</label>
                                <ValidationProvider rules="required" v-slot="{ errors }">
                                    <input v-model="form.name" class="form-control">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider> 
                            </div>
                            <div class="col-md-6 mb-25">
                                <label>Login</label>
                                <ValidationProvider rules="required|minmax:5,10" v-slot="{ errors }">
                                    <input v-model="form.login" class="form-control">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider>  
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-25">
                                <label>Email</label>
                                <ValidationProvider rules="required|email" v-slot="{ errors }">
                                    <input v-model="form.email" class="form-control">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider>  
                            </div>
                            <div class="col-md-6 mb-25">
                                <label>Senha</label>
                                <input type="password" v-model="form.password" class="form-control">
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
export default {
    name: 'EditarPerfil',
    components: {
        ValidationObserver,
        ValidationProvider
    },
    data: () => ({
        modalShow: false,
        form: {
            name: null,
            login: null,
            email: null,
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
            this.form.id = window.localStorage.getItem('user')
            this.$http.post('http://localhost:8000/api/user-edit', this.form).then(response => {
                if (response.body.user_enabled) {
                    this.setAlert('success', 'Sucesso', 'Usuário Editado Com Sucesso')
                } else {
                    this.setAlert('danger', 'Erro', response.body.message)
                }
            })
        },
        getUser () {
            let userId = window.localStorage.getItem('user')
            this.$http.post('http://localhost:8000/api/get-user', {user_id: userId}).then(response => {
                let user = response.body
                this.form = {
                    name: user.name,
                    login: user.login,
                    email: user.email
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
    },
    created () {
        this.getUser()
    }
}

import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { email, required } from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'O preenchimento do campo é obrigatório'
});

extend('email', {
    ...email,
    message: 'O campo deve ser preenchido com um email válido'
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
