<template>
    <section class="mt-65">

        <b-modal v-model="showModalDescription" hide-header hide-footer size="lg"> 
            <template>
                <div class="col-md-12 modal-border">
                    <h4>Descrição</h4>
                </div>
                <div class="col-md-12 text-justify">
                    {{description}}
                </div>
                <hr>
                <div class="col-md-12">
                    <div class="float-right">
                        <button class="btn-general blue" @click="showModalDescription = false"> Fechar </button>
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
                                    <option v-for="(type, index) of $store.state.types" :key="index">
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
                <div class="col-lg-10 mx-auto" v-for="(place, index) of places" :key="index">
                    <div class="place-border">
                        <div class="row">
                            <div class="col-lg-5 col-md-12 col-sm-12">
                                <b-carousel :interval="0" controls>
                                    <b-carousel-slide v-for="(image, index) of place.images" :img-src="'http://localhost:8000' + image.path" :key="index">
                                    </b-carousel-slide>
                                </b-carousel>                                
                            </div>
                            <div class="col-lg-7 col-md-12 col-sm-12">
                                <div class="place-details">
                                    <div style="padding-left: 5px">
                                        <p class="place-rent-value">R$ {{ formatValue(place.rent_value) }} 
                                            <span class="fs-15">/ mês</span>
                                        </p>
                                        <p class="d-inline place-secondary-value">Condomínio R$ {{ formatValue(place.condominium_value) }}</p>
                                        - 
                                        <p class="d-inline place-secondary-value">IPTU R$ {{ formatValue(place.iptu) }}</p>
                                        <br>
                                        <p class="place-description-search" v-html="limitText(place.description, 42)"></p>
                                        <a class="d-inline" href="" @click.prevent="showDescription(place.description)">Ver Mais</a>
                                        
                                        <p class="place-address">{{place.street}}, Bairro {{place.district}}, {{place.city}}</p>
                                    </div>
                                    <div class="container">
                                        <div class="row text-center">
                                            <div class="width-place-space">
                                                <span class="place-number">{{place.area}}</span>
                                                <span class="place-space">Área (m²)</span>
                                            </div>
                                            <div class="width-place-space">
                                                <span class="place-number">{{place.rooms}}</span>
                                                <span class="place-space">Quarto</span>
                                            </div>
                                            <div class="width-place-space">
                                                <span class="place-number">{{place.suites}}</span>
                                                <span class="place-space">Suíte</span>
                                            </div>
                                            <div class="width-place-space">
                                                <span class="place-number">{{place.bathrooms}}</span>
                                                <span class="place-space">Banh.</span>
                                            </div>
                                            <div class="width-place-space">
                                                <span class="place-number">{{place.vacancies}}</span>
                                                <span class="place-space">Vaga</span>
                                            </div>
                                            <div class="width-place-button">
                                                <div>
                                                    <router-link class="btn btn-primary mt-3" :to="/horarios/ + place.place_id" target="_blank">
                                                        Saber Mais
                                                    </router-link>
                                                </div>
                                            </div>
                                        </div>
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
        modalFilterShow: false,
        places: [],
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
        description: "",
        showModalDescription: false
    }),
    methods: {   
        limitText (value, limit) {
            if (value) {
                return (value.length > limit ? value.substr(0, limit) + '... ' : value)
            }
        },
        showDescription (description) {
            this.description = description
            this.showModalDescription = true
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
        formatValue (value) {
            return value.toLocaleString('pt-br', {minimumFractionDigits: 2})
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
