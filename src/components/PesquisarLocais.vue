<template>
    <section>
        <b-modal v-model="modalShow" hide-header hide-footer> 
            <template v-if="placeInfo">
                <div class="col-md-12 modal-border">
                    <h4> {{placeInfo.name}} </h4>
                </div>
                <div class="col-md-12">
                    <p class="place-info"><strong>Responsável:</strong> {{placeInfo.responsibleName}} </p>
                    <p class="place-info"><strong>Telefone:</strong> {{placeInfo.phone}} </p>
                    <p class="place-info"><strong>UF:</strong> {{placeInfo.state}} </p>
                    <p class="place-info"><strong>Complemento:</strong> {{placeInfo.complement}} </p>
                    <p class="place-info"><strong>CEP:</strong> {{placeInfo.cep}} </p>
                    <p class="place-info"><strong>Descrição:</strong> {{placeInfo.description}} </p>
                </div>
                <hr>
                <div class="col-md-12">
                    <div class="float-right">
                        <button class="btn-general blue" @click="modalShow = false"> Fechar </button>
                    </div>
                </div>
            </template>
        </b-modal>

        <b-modal v-model="modalFilterShow" hide-header hide-footer> 
            <div class="col-md-12 modal-border">
                <h4>Filtro</h4>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12 mb-25">
                        <input v-model="form.name" class="form-control" placeholder="Nome">    
                    </div>
                    <div class="col-md-12 mb-25">
                        <input v-model="form.responsibleName" class="form-control" placeholder="Responsável">    
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
                    <button @click="getFilterPlace()" class="btn-general blue float-right">Buscar</button>
                </div>
            </div>
        </b-modal>

        <div class="container">
            <div class="row">
                <div class="col-md-12 px-0">
                    <div class="col-md-6 mb-25 float-right"> 
                        <button @click="modalFilterShow = true" class="btn-general blue float-right">Filtrar</button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 col-md-12" v-for="(place, index) of places" :key="index">
                    <div class="place-border">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="https://www.portaldasmissoes.com.br/uploads/empreendimentos/0001741_zoom_barbearia-santo-angelo-barbeiro-santo-angelo-barbearia-san-gabriel-barbeiro-san-gabriel-(0ba).jpg">
                            </div>
                            <div class="col-md-6 text-center">
                                <div class="place-infos search">
                                    <h5>{{place.name}}</h5>
                                    <p class="place-info"><strong>Rua:</strong> {{place.street}} </p>
                                    <p class="place-info"><strong>Número:</strong> {{place.number}} </p>
                                    <p class="place-info"><strong>Bairro:</strong> {{place.district}} </p>
                                    <p class="place-info"><strong>Cidade:</strong> {{place.city}} </p>
                                    <div class="place-buttons">
                                        <button @click="getPlaceInfo(place)" class="btn-general blue">
                                            Informações
                                        </button>
                                        <router-link class="btn-general blue" :to="/horarios/ + place.place_id">
                                            Horários
                                        </router-link>
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
        places: [],
        placeInfo: null,
        form: {
            name: "",
            responsibleName: "",
            cep: "",
            street: "",
            district: "",
            city: "",
            state: "",
            number: ""
        },
    }),
    methods: {
        getPlaceInfo (place) {
            let info = {
                name: place.name,
                responsibleName: place.responsible_name,
                phone: place.phone,
                state: place.state,
                complement: place.complement,
                cep: place.cep,
                description: place.description
            }
            this.placeInfo = info
            this.modalShow = true
        },
        getFilterPlace () {
            this.modalFilterShow = false
            this.$http.post('http://localhost:8000/api/get-filter-place', this.form).then(response => {
                this.places = response.body
            })
        }
    },
    created () {
        this.getFilterPlace()
    }
}
</script>

<style scoped>
</style>
