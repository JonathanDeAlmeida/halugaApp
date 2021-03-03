<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 mb-25">
                <div style="background-color: black; width: 100%; height: 400px"></div>
            </div>
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-6 mb-25">
                        <input v-model="form.name" class="form-control" placeholder="Nome">    
                    </div>
                    <div class="col-md-6 mb-25">
                        <input v-model="form.phone" class="form-control" placeholder="Telefone">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-25">
                        <input v-model="form.cep" class="form-control" placeholder="Cep">    
                    </div>
                    <div class="col-md-6 mb-25">
                        <input v-model="form.street" class="form-control" placeholder="Rua">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-25">
                        <input v-model="form.district" class="form-control" placeholder="Bairro">    
                    </div>
                    <div class="col-md-4 mb-25">
                        <input v-model="form.city" class="form-control" placeholder="Cidade">    
                    </div>
                    <div class="col-md-2 mb-25">
                        <input v-model="form.state" class="form-control" placeholder="UF">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 mb-25">
                        <input v-model="form.number" class="form-control" placeholder="N">    
                    </div>
                    <div class="col-md-9 mb-25">
                        <input v-model="form.complement" class="form-control" placeholder="Complemento">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 mb-25">
                        <textarea v-model="form.description" class="form-control" placeholder="Descrição"></textarea>
                    </div>
                </div>
                <button @click.prevent="formSubmit()" class="btn-blue float-right">Salvar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CriarLocal',
    props: {
        msg: String
    },
    data: () => ({
        modalShow: false,
        form: {
            userId: null,
            name: null,
            phone: null,
            cep: null,
            street: null,
            district: null,
            city: null,
            state: null,
            number: null,
            complement: null,
            description: null
        }
    }),
    methods: {
        formSubmit () {      
            this.form.userId = window.localStorage.getItem('user')  
            this.$http.post('http://localhost:8000/api/place-create', this.form).then(response => {
                console.log(response.body)
            })
        }
    },
}
</script>

<style scoped>
</style>
