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
                <p class="title-path">Cadastro</p>
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
                                <ValidationProvider rules="required|email" v-slot="{ errors }" vid="confirmationEmail">
                                    <input v-model="form.email" class="form-control">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider>  
                            </div>
                            <div class="col-md-6 mb-25">
                                <label>Confirmar Email</label>
                                <ValidationProvider rules="required|email|confirmed:confirmationEmail" v-slot="{ errors }">
                                    <input v-model="form.confirmEmail" class="form-control">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider> 
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-25">
                                <label>Senha</label>
                                <ValidationProvider rules="required|minmax:5,10" v-slot="{ errors }" vid="confirmationPassword">
                                    <input type="password" v-model="form.password" class="form-control">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                            <div class="col-md-6 mb-25">
                                <label>Confirmar Senha</label>                        
                                <ValidationProvider rules="required|minmax:5,10|confirmed:confirmationPassword" v-slot="{ errors }">
                                    <input type="password" v-model="form.confirmPassword" class="form-control">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider> 
                            </div>
                        </div>
                        <router-link class="btn-general green float-left" to="/login">Login</router-link>
                        <button type="submit" class="btn-general blue float-right">Cadastrar</button>
                    </form>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CadastroPerfil',
    components: {
        ValidationObserver,
        ValidationProvider
    },
    data: () => ({
        modalShow: false,
        alert: {
            status: false,
            title: "",
            type: "",
            message: ""
        },
        form: {
            name: null,
            login: null,
            email: null,
            confirmEmail: null,
            password: null,
            confirmPassword: null
        }
    }),
    methods: {
        formSubmit () {        
            this.$http.post('http://localhost:8000/api/user-create', this.form).then(response => {
                if (response.body.user_enabled) {
                    // window.localStorage.setItem('user', response.body.user.id)
                    this.setAlert('success', 'Sucesso', 'Usuário Cadastrado Com Sucesso')
                    setTimeout(() => {
                         this.$router.push('/login')
                    }, 3500)
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
    },
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
