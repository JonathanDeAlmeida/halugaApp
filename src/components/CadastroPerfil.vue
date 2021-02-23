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
                        <input class="form-control">    
                    </div>
                    <div class="col-md-6 mb-25">
                        <label>Login</label>
                        <input class="form-control">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-25">
                        <label>Email</label>
                        <input class="form-control">    
                    </div>
                    <div class="col-md-6 mb-25">
                        <label>Confirmar Email</label>
                        <input class="form-control">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-25">
                        <label>Senha</label>
                        <input class="form-control">    
                    </div>
                    <div class="col-md-6 mb-25">
                        <label>Confirmar Senha</label>
                        <input class="form-control">    
                    </div>
                </div>
                <button class="btn-green float-left">Login</button>
                <button class="btn-blue float-right">Cadastrar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CadastroPerfil',
  props: {
    msg: String
  }
}
</script>

<style scoped>
</style>
