<template>
    <div class="container">
        <div class="row text-center">
            <div class="col-md-12 text-center">
                <p class="title-path">Cadastro</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-6 mb-25">
                        <label>Nome</label>
                        <input v-model="form.name" class="form-control">    
                    </div>
                    <div class="col-md-6 mb-25">
                        <label>Login</label>
                        <input v-model="form.login" class="form-control">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-25">
                        <label>Email</label>
                        <input v-model="form.email" class="form-control">    
                    </div>
                    <div class="col-md-6 mb-25">
                        <label>Confirmar Email</label>
                        <input v-model="form.confirmEmail" class="form-control">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-25">
                        <label>Senha</label>
                        <input type="password" v-model="form.password" class="form-control">    
                    </div>
                    <div class="col-md-6 mb-25">
                        <label>Confirmar Senha</label>
                        <input type="password" v-model="form.confirmPassword" class="form-control">    
                    </div>
                </div>
                <router-link class="btn-green float-left" to="/login">Login</router-link>
                <button @click.prevent="formSubmit()" class="btn-blue float-right">Cadastrar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CadastroPerfil',
    props: {
        msg: String
    },
    data: () => ({
        modalShow: false,
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
                window.localStorage.setItem('user', response.body.id)
                this.$router.push('gerenciar')
            })
        }
    },
}
</script>

<style scoped>
</style>
