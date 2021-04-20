<template>
    <div class="container">
        <div class="row text-center">
            <div class="col-md-12 text-center">
                <p class="title-path">Edição</p>
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
                        <label>Senha</label>
                        <input type="password" v-model="form.password" class="form-control">    
                    </div>
                </div>
                <router-link class="btn-general green float-left" to="/login">Login</router-link>
                <button @click.prevent="formSubmit()" class="btn-general blue float-right">Cadastrar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditarPerfil',
    props: {
        msg: String
    },
    data: () => ({
        modalShow: false,
        form: {
            name: null,
            login: null,
            email: null,
            password: null
        }
    }),
    methods: {
        formSubmit () {      
            this.form.id = window.localStorage.getItem('user')
            this.$http.post('http://localhost:8000/api/user-edit', this.form).then(() => {
                this.$router.go()
            })
        },
        getUser () {
            let userId = window.localStorage.getItem('user')
            this.$http.post('http://localhost:8000/api/get-user', {user_id: userId}).then(response => {
                let user = response.body
                this.form = {
                    name: user.name,
                    login: user.login,
                    email: user.email,
                    password: user.password
                }
            })
        }
    },
    created () {
        this.getUser()
    }
}
</script>

<style scoped>
</style>
