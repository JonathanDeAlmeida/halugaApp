<template>
    <section>
        
        <b-modal v-model="modalShow" hide-header hide-footer size="xl"> 
            <template v-if="placeInfo">
                <div class="row">
                    {{placeInfo}}
                    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        
                        <b-carousel id="carousel-1" :interval="0" controls background="#ababab" img-width="1024" img-height="480"
                        style="text-shadow: 1px 1px 2px #333;">
                        
                            <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=52"></b-carousel-slide>

                            <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
                                <h1>Hello world!</h1>
                            </b-carousel-slide>

                        </b-carousel>

                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <h4> {{placeInfo.name}} </h4>
                        <p class="place-info"><strong>Responsável:</strong> {{placeInfo.responsibleName}} </p>
                        <p class="place-info"><strong>Telefone:</strong> {{placeInfo.phone}} </p>
                        <p class="place-info"><strong>UF:</strong> {{placeInfo.state}} </p>
                        <p class="place-info"><strong>Complemento:</strong> {{placeInfo.complement}} </p>
                        <p class="place-info"><strong>CEP:</strong> {{placeInfo.cep}} </p>
                        <p class="place-info"><strong>Descrição:</strong> {{placeInfo.description}} </p>
                    </div>
                </div>
                <hr>
                <div class="col-md-12">
                    <div class="float-right">
                        <button class="btn-general blue" @click="modalShow = false"> Fechar </button>
                    </div>
                </div>
            </template>
        </b-modal>

        <b-modal v-model="modalFilterShow" hide-header hide-footer size="lg"> 
            <div class="col-md-12 modal-border">
                <h4>Filtro</h4>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-12 mb-25">
                                <label class="label-line">Rua</label>
                                <input v-model="form.street" class="input-line">    
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-7 mb-25">
                                <label class="label-line">Bairro</label>
                                <input v-model="form.district" class="input-line">    
                            </div>
                            <div class="col-md-5 mb-25">
                                <label class="label-line">Cidade</label>
                                <input v-model="form.city" class="input-line">    
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 mb-25">
                                <label class="label-line">Número</label>
                                <input v-model="form.number" class="input-line">    
                            </div>
                            <div class="col-md-6 mb-25">
                                <label class="label-line">Cep</label>
                                <input v-model="form.cep" class="input-line">    
                            </div>
                            <div class="col-md-3 mb-25">
                                <label class="label-line">UF</label>
                                <input v-model="form.state" class="input-line">    
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4 mb-25">
                                <select class="select-line" v-model="form.condition">
                                    <option value="residencial">Residencial</option>
                                    <option value="comercial">Comercial</option>
                                </select>
                            </div>
                            <div class="col-md-4 mb-25">
                                <select class="select-line" v-model="form.type">
                                    <option v-for="(type, index) of types" :key="index">
                                        {{type.value}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-4 mb-25">
                                <label class="label-line">Quartos</label>
                                <input v-model="form.rooms" class="input-line">    
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-4 mb-25">
                                <label class="label-line">Área útil (Mínima)</label>
                                <input v-model="form.areaMin" class="input-line">   
                            </div>
                            <div class="col-md-4 mb-25">
                                <label class="label-line">Área útil (Máxima)</label>
                                <input v-model="form.areaMax" class="input-line">  
                            </div>
                            <div class="col-md-4 mb-25">
                                <label class="label-line">Banheiros</label>
                                <input v-model="form.bathrooms" class="input-line">    
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4 mb-25">
                                <label class="label-line">Valor Aluguel (Mínimo)</label>
                                <input v-model="form.rentValueMin" class="input-line">
                            </div>
                            <div class="col-md-4 mb-25">
                                <label class="label-line">Valor Aluguel (Máximo)</label>
                                <input v-model="form.rentValueMax" class="input-line"> 
                            </div>
                            <div class="col-md-4 mb-25">
                                <label class="label-line">Vagas</label>
                                <input v-model="form.vacancies" class="input-line">    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="col-md-12">
                <div class="float-right">
                    <button v-if="clearFilter" @click="clearFormFilter()" class="btn-general danger mr-2">Limpar Filtro</button>
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
                <div class="col-lg-12 col-md-12" v-for="(place, index) of places" :key="index">
                    <div class="place-border">
                        <div class="row">
                            <div class="col-md-6">
                                <template>
                                    <div>
                                        
                                        <b-carousel id="carousel-1" :interval="0" controls background="#ababab" img-width="1024"
                                        img-height="480"
                                        style="text-shadow: 1px 1px 2px #333;">
                                        
                                            <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=52"></b-carousel-slide>
                                            
                                            <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
                                                <h1>Hello world!</h1>
                                            </b-carousel-slide>

                                        </b-carousel>

                                    </div>
                                </template>
                                
                            </div>
                            <div class="col-md-6 text-center">
                                <div class="place-infos search">
                                    <!-- <h5>{{place.name}}</h5> -->
                                    <p class="place-info"><strong>Condição:</strong> {{place.condition}} </p>
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
        places: [],
        placeInfo: null,
        clearFilter: false,
        form: {
            cep: "",
            street: "",
            district: "",
            city: "",
            state: "",
            number: "",
            condition: "",
            type: "",
            areaMin: "",
            areaMax: "",
            rentValueMin: "",
            rentValueMax: "",
            rooms: "",
            bathrooms: "",
            vacancies: "",
            walk: ""
        },
        types: [
            {value: 'Apartamento'},
            {value: 'Casa'},
            {value: 'Casa de condomínio'},
            {value: 'Casa de Vila'},
            {value: 'Cobertura'},
            {value: 'Fazenda/Sítio/Chácara'},
            {value: 'Flat'},
            {value: 'Lote/Terreno'},
            {value: 'Sobrado'},
            {value: 'Consultório'},
            {value: 'Galpão/Depósito/Armazém'},
            {value: 'Garagem'},
            {value: 'Hotel/Motel/Pousada'},
            {value: 'Ponto comercial/Loja/Box'},
            {value: 'Prédio/Edifício inteiro'},
            {value: 'Sala/Conjunto'},
        ],
    }),
    methods: {
        getPlaceInfo (place) {
            // let info = {
            //     name: place.name,
            //     responsibleName: place.responsible_name,
            //     phone: place.phone,
            //     state: place.state,
            //     complement: place.complement,
            //     cep: place.cep,
            //     description: place.description
            // }
            this.placeInfo = place
            this.modalShow = true
        },
        clearFormFilter () {
            this.form = {
                name: "",
                responsibleName: "",
                cep: "",
                street: "",
                district: "",
                city: "",
                state: "",
                number: "",
                condition: "",
                type: "",
                areaMin: "",
                areaMax: "",
                rentValueMin: "",
                rentValueMax: "",
                rooms: "",
                bathrooms: "",
                vacancies: "",
                walk: ""
            },
            this.clearFilter = false
            this.getFilterPlace()
        },
        getFilterPlace () {
            this.modalFilterShow = false
            // let param = page ? page : this.form
            // let resource = this.$resource('http://localhost:8000/api/get-filter-place{/form}');
            this.$http.post('http://localhost:8000/api/get-filter-place', this.form).then(response => {
                let formKeys = Object.keys(this.form)
                for (let key of formKeys) {
                    if (this.form[key] !== "") {
                        this.clearFilter = true
                    }
                }
                this.places = response.body
                console.log(this.places)
            })
        }
    },
    created () {
        this.getFilterPlace()
        window.localStorage.removeItem('user')
        this.$store.dispatch('getUser', null)
    }
}
</script>

<style scoped>
</style>
