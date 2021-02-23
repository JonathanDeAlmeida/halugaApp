<template>
    <div class="container">
        <div class="row text-center">
            <div class="col-md-12 text-center">
                <p class="title-path">Login</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 px-0">
                <div class="col-md-6 mb-25 mx-auto">
                    <label>Nome</label>
                    <input class="form-control">    
                </div>
                <div class="col-md-6 mb-25 mx-auto">
                    <label>Login</label>
                    <a class="float-right" href="">Esqueci a senha</a>
                    <input class="form-control">    
                </div>
            </div>
            <div class="col-md-12 text-center mb-25">
                <button class="btn-blue">Entrar</button>
            </div>
            <div class="col-md-12 text-center">
                <a href="">Ainda não tenho cadastro</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: String
  }
}
</script>

<style scoped>
</style>
