<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 mb-25">
                <div style="background-color: black; width: 100%; height: 400px"></div>
            </div>
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-6 mb-25">
                        <input class="form-control" placeholder="Nome">    
                    </div>
                    <div class="col-md-6 mb-25">
                        <input class="form-control" placeholder="Telefone">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-25">
                        <input class="form-control" placeholder="Cep">    
                    </div>
                    <div class="col-md-6 mb-25">
                        <input class="form-control" placeholder="Rua">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-25">
                        <input class="form-control" placeholder="Bairro">    
                    </div>
                    <div class="col-md-4 mb-25">
                        <input class="form-control" placeholder="Cidade">    
                    </div>
                    <div class="col-md-2 mb-25">
                        <input class="form-control" placeholder="UF">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 mb-25">
                        <input class="form-control" placeholder="N">    
                    </div>
                    <div class="col-md-9 mb-25">
                        <input class="form-control" placeholder="Complemento">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 mb-25">
                        <textarea class="form-control" placeholder="Descrição"></textarea>
                    </div>
                </div>
                <button class="btn-blue float-right">Salvar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CriarLocal',
  props: {
    msg: String
  }
}
</script>

<style scoped>
</style>
