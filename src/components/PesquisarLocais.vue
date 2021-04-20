<template>
    <section>
        <b-modal v-model="modalShow" hide-header hide-footer> 
            <div class="col-md-12 modal-border">
                <h4>Barbearia</h4>
            </div>
            <div class="col-md-12">
                <p class="place-info"><strong>Telefone:</strong> Barbeariasss</p>
                <p class="place-info"><strong>UF:</strong> Barbearia</p>
                <p class="place-info"><strong>Complemento:</strong> Barbearia</p>
                <p class="place-info"><strong>CEP:</strong> Barbearia</p>
                <p class="place-info"><strong>Descrição:</strong> Barbearia</p>
            </div>
            <hr>
            <div class="col-md-12">
                <div class="float-right">
                    <button class="btn-general blue" @click="modalShow = false"> Fechar </button>
                </div>
            </div>
        </b-modal>

        <b-modal v-model="modalFilterShow" hide-header hide-footer> 
            <div class="col-md-12 modal-border">
                <h4>Filter</h4>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-6 mb-25">
                        <input v-model="form.name" class="form-control" placeholder="Nome">    
                    </div>
                    <div class="col-md-6 mb-25">
                        <input v-model="form.phone" class="form-control" placeholder="Telefone">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 mb-25">
                        <input v-model="form.street" class="form-control" placeholder="Rua">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-7 mb-25">
                        <input v-model="form.district" class="form-control" placeholder="Bairro">    
                    </div>
                    <div class="col-md-5 mb-25">
                        <input v-model="form.city" class="form-control" placeholder="Cidade">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 mb-25">
                        <input v-model="form.number" class="form-control" placeholder="N">    
                    </div>
                    <div class="col-md-6 mb-25">
                        <input v-model="form.cep" class="form-control" placeholder="Cep">    
                    </div>
                    <div class="col-md-3 mb-25">
                        <input v-model="form.state" class="form-control" placeholder="UF">    
                    </div>
                </div>
            </div>
            <hr>
            <div class="col-md-12">
                <div class="float-right">
                    <button @click="getPlace()" class="btn-general blue float-right">Salvar</button>
                </div>
            </div>
        </b-modal>

        <div class="container">
            <div class="row">
                <div class="col-md-12 px-0">
                    <div class="col-md-6 mb-25 float-right"> 
                        <button @click="modalFilterShow = true" class="btn-general blue float-right">Buscar</button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 col-md-12">
                    <div class="place-border">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="https://conteudo.imguol.com.br/c/esporte/83/2018/10/10/alex-bruno-e-dono-da-a4-barbearia-1539214396138_300x300.jpg">
                            </div>
                            <div class="col-md-6 text-center">
                                <div class="place-infos search">
                                    <h5>Barbearia</h5>
                                    <p class="place-info"><strong>Rua:</strong> Lorem Ipsum é simplesmente um texto fictício</p>
                                    <p class="place-info"><strong>Número:</strong> 10523</p>
                                    <p class="place-info"><strong>Bairro:</strong> Lorem Ipsum é simplesmente um texto fictício</p>
                                    <p class="place-info"><strong>Cidade:</strong> Itajaí</p>
                                    <div class="place-buttons">
                                        <button @click="modalShow = true" class="btn-general blue">Informações</button>
                                        <router-link class="btn-general blue" to="/horarios">Horários</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12">
                    <div class="place-border">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="https://www.portaldasmissoes.com.br/uploads/empreendimentos/0001741_zoom_barbearia-santo-angelo-barbeiro-santo-angelo-barbearia-san-gabriel-barbeiro-san-gabriel-(0ba).jpg">
                            </div>
                            <div class="col-md-6 text-center">
                                <div class="place-infos search">
                                    <h5>Barbearia</h5>
                                    <p class="place-info"><strong>Rua:</strong> Lorem Ipsum é simplesmente um texto fictício </p>
                                    <p class="place-info"><strong>Número:</strong> 10523</p>
                                    <p class="place-info"><strong>Bairro:</strong> Lorem Ipsum é simplesmente um texto fictício</p>
                                    <p class="place-info"><strong>Cidade:</strong> Itajaí</p>
                                    <div class="place-buttons">
                                        <button @click="modalShow = true" class="btn-general blue">Informações</button>
                                        <router-link class="btn-general blue" to="/horarios">Horários</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: 'PesquisarLocais',
    data: () => ({
        modalShow: false,
        modalFilterShow: false,
        date: new Date(),
        form: {
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
        },
    }),
    methods: {
        hey () {
            console.log('ola')
        },
        getPlace () {
            this.$http.post('http://localhost:8000/api/get-place', this.form).then(response => {
                console.log(response)
            })
        }
    },
  props: {
    msg: String
  }
}
</script>

<style scoped>
</style>
