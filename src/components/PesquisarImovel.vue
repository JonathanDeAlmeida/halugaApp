<template>
    <section class="mt-container-search mb-container">

        <b-modal v-model="showModalPlaceDetails" hide-header hide-footer size="lg"> 
            <template v-if="placeDetails">
                <div class="col-md-12 modal-border">
                    <h4>Detalhes</h4>
                </div>
                <div class="col-md-12 text-justify">
                    <template v-if="placeDetails.broker">
                        <p><strong>Anunciante: </strong> {{placeDetails.broker}}</p>
                    </template>
                    <template v-else>
                        <p><strong>Anunciante: </strong> {{placeDetails.responsible_name}}</p>
                    </template>
                    <p><strong>Contato: </strong> {{maskPhone(placeDetails.phone)}}</p>
                    <p><strong>Endereço: </strong> <span v-html="textAddress(placeDetails, 1000)"></span></p>
                    <p><strong>Descrição: </strong> {{placeDetails.description}}</p>
                </div>
                <hr>
                <div class="col-md-12">
                    <div class="float-right">
                        <button class="btn-general blue" @click="showModalPlaceDetails = false"> Fechar </button>
                    </div>
                </div>
            </template>
        </b-modal>

        <b-modal v-model="$store.state.modalFilterShow" hide-header hide-footer size="lg"> 
            <div class="col-md-12 modal-border">
                <h4>Filtros</h4>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-12 col-lg-3 mb-25 mt-2">
                                <label class="label-line">Cidade</label>
                                <input v-model="$store.state.city" class="input-line">   
                            </div>
                            <div class="col-md-12 col-lg-3 mb-25 mt-2">
                                <label class="label-line">Bairro</label>
                                <input v-model="$store.state.district" class="input-line">   
                            </div>
                            <div class="col-md-12 col-lg-4 mb-25 mt-2">
                                <label class="label-line">Rua</label>
                                <input v-model="$store.state.street" class="input-line">   
                            </div>
                            <div class="col-md-12 col-lg-2 mb-25">
                                <label class="label-line">Condição</label>
                                <select class="select-line" v-model="form.condition">
                                    <option value=""></option>
                                    <option value="residencial">Residencial</option>
                                    <option value="comercial">Comercial</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-lg-4 mb-25">
                                <label class="label-line">Tipo</label>
                                <select class="select-line" v-model="form.type">
                                    <option v-for="(type, index) of $store.state.types" :key="index">
                                        {{type.value}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-12 col-lg-2 mb-25">
                                <label class="label-line">Banheiros</label>
                                <select class="select-line" v-model="form.bathrooms">
                                    <option v-for="(number, index) of quantities" :key="index" :value="number.value">
                                        {{number.text}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-12 col-lg-2 mb-25">
                                <label class="label-line">Quartos</label>
                                <select class="select-line" v-model="form.rooms">
                                    <option v-for="(number, index) of quantities" :key="index" :value="number.value">
                                        {{number.text}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-12 col-lg-2 mb-25">
                                <label class="label-line">Suítes</label>
                                <select class="select-line" v-model="form.suites">
                                    <option v-for="(number, index) of quantities" :key="index" :value="number.value">
                                        {{number.text}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-12 col-lg-2 mb-25">
                                <label class="label-line">Vagas</label>
                                <select class="select-line" v-model="form.vacancies">
                                    <option v-for="(number, index) of quantities" :key="index" :value="number.value">
                                        {{number.text}}
                                    </option>
                                </select>   
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-12 col-lg-3 mb-25">
                                <label class="label-line">Área útil (Mínima)</label>
                                <input v-model="form.areaMin" class="input-line">   
                            </div>
                            <div class="col-md-12 col-lg-3 mb-25">
                                <label class="label-line">Área útil (Máxima)</label>
                                <input v-model="form.areaMax" class="input-line">  
                            </div>
                            <div class="col-md-12 col-lg-3 mb-25">
                                <label class="label-line">Faixa de Preço (Mínimo)</label>
                                <money id="valueMin" name="valueMin" v-model="form.valueMin" class="input-line" maxlength="14" v-bind="money"></money>
                            </div>
                            <div class="col-md-12 col-lg-3 mb-25">
                                <label class="label-line">Faixa de Preço (Máximo)</label>
                                <money id="valueMax" name="valueMax" v-model="form.valueMax" class="input-line" maxlength="14" v-bind="money"></money>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <hr>
            <div class="col-md-12">
                <div class="float-right">
                    <button v-if="clearFilter" @click="clearFormFilter()" class="btn-general blue-light mr-2">Limpar Filtro</button>
                    <button v-if="!clearFilter" @click="$store.state.modalFilterShow = false" class="btn-general blue-light mr-2">Fechar</button>
                    <button @click="navigate()" class="btn-general blue float-right">Buscar</button>
                </div>
            </div>
        </b-modal>
        
        <div v-if="$store.state.user">
            <div class="container search-menu-user">
                <div class="row">
                    <div class="col-lg-10 mx-auto mb-4">
                        <div class="row" style="padding: 0 15px">
                            <div style="width: 65%">
                                <ul class="ul-search-mobile">
                                    <b-dropdown :text="addressTypeText">
                                        <b-dropdown-item @click="changeAddressType('city', 'Cidade')">Cidade</b-dropdown-item>
                                        <b-dropdown-item @click="changeAddressType('district', 'Bairro')">Bairro</b-dropdown-item>
                                        <b-dropdown-item @click="changeAddressType('street', 'Rua')">Rua</b-dropdown-item>
                                    </b-dropdown>
                                    
                                    <input v-if="$store.state.addressType === 'city'" v-model="$store.state.city" class="input-search-place" :placeholder="'Adicionar ' + addressTypeText + '...'">
                                    <input v-else-if="$store.state.addressType === 'district'" v-model="$store.state.district" class="input-search-place" :placeholder="'Adicionar ' + addressTypeText + '...'">
                                    <input v-else v-model="$store.state.street" class="input-search-place" :placeholder="'Adicionar ' + addressTypeText + '...'">

                                    <span class="material-icons cursor-pointer icon-search-place" @click="searchAddress()">search</span>
                                </ul>
                            </div>
                            <div style="width: 35%" class="mt-1">
                                <button class="btn-general blue float-right" @click.prevent="setFilter()">
                                    Mais Filtros
                                </button>
                                <b-dropdown :text="intentText" class="float-right pr-2">
                                    <b-dropdown-item @click="changeIntent('rent', 'Alugar')">Alugar</b-dropdown-item>
                                    <b-dropdown-item @click="changeIntent('sell', 'Comprar')">Comprar</b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="search-mobile">
            <div class="container">
                <div class="row">
                    <div class="col-lg-10 mx-auto mt-3 mb-5">                          
                        <ul class="ul-search-mobile">
                            <b-dropdown :text="addressTypeText">
                                <b-dropdown-item @click="changeAddressType('city', 'Cidade')">Cidade</b-dropdown-item>
                                <b-dropdown-item @click="changeAddressType('district', 'Bairro')">Bairro</b-dropdown-item>
                                <b-dropdown-item @click="changeAddressType('street', 'Rua')">Rua</b-dropdown-item>
                            </b-dropdown>
                            
                            <input v-if="$store.state.addressType === 'city'" v-model="$store.state.city" class="input-search-place" :placeholder="'Adicionar ' + addressTypeText + '...'">
                            <input v-else-if="$store.state.addressType === 'district'" v-model="$store.state.district" class="input-search-place" :placeholder="'Adicionar ' + addressTypeText + '...'">
                            <input v-else v-model="$store.state.street" class="input-search-place" :placeholder="'Adicionar ' + addressTypeText + '...'">
                            
                            <span class="material-icons cursor-pointer icon-search-place" @click="searchAddress()">search</span>
                        </ul>
                        
                        <b-dropdown :text="intentText">
                            <b-dropdown-item @click="changeIntent('rent', 'Alugar')">Alugar</b-dropdown-item>
                            <b-dropdown-item @click="changeIntent('sell', 'Comprar')">Comprar</b-dropdown-item>
                        </b-dropdown>
                        <button style="padding: 8px 15px" class="btn-general blue float-right" @click.prevent="setFilter()">
                            Mais Filtros
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <template v-if="places.length > 0">
                    <div class="col-lg-10 mx-auto" v-for="(place, index) of places" :key="index">
                        <div class="place-border">
                            <div class="row">
                                <div class="col-lg-5 col-md-12 col-sm-12 carousel-search">
                                    <b-carousel :interval="0" controls>
                                        <b-carousel-slide v-for="(image, index) of place.images" :img-src="apiDomain + image.path" :key="index">
                                        </b-carousel-slide>
                                    </b-carousel>                                
                                </div>
                                <div class="col-lg-7 col-md-12 col-sm-12">
                                    <div class="place-details">
                                        <div style="padding-left: 5px">
                                            <template v-if="place.intent === 'rent'">
                                                <p class="place-rent-value mt-mobile">R$ {{ formatValue(place.rent_value) }} 
                                                    <span class="fs-15">/ mês</span>
                                                </p>
                                            </template>
                                            <template v-else>
                                                <p class="place-rent-value mt-mobile">R$ {{ formatValue(place.sale_value) }} </p>
                                            </template>

                                            <p v-if="place.condominium_value > 0" class="d-inline place-secondary-value">Condomínio R$ {{ formatValue(place.condominium_value) }}</p>
                                            
                                            <span v-if="place.condominium_value > 0 && place.iptu > 0"> - </span> 
                                             
                                            <p v-if="place.iptu > 0" class="d-inline place-secondary-value">IPTU R$ {{ formatValue(place.iptu) }}</p>
                                            
                                            <br>
                                            <template v-if="place.description">
                                                <p class="place-description-search" v-html="limitText(place.description, 42)"></p>...
                                                <a class="link-blue-light d-inline" href="" @click.prevent="showPlaceDetails(place)">Ver Mais</a>
                                            </template>
                                            
                                            <p class="place-address" v-html="textAddress(place, 50)" :class="place.description ? '' : 'mt-5'"></p>
                                        </div>
                                        <div class="container">
                                            <div class="row text-center">
                                                <div class="width-place-space" v-if="place.area">
                                                    <span class="place-number">{{place.area}}</span>
                                                    <span class="place-space">Área (m²)</span>
                                                </div>
                                                <div class="width-place-space" v-if="place.rooms">
                                                    <span class="place-number">{{place.rooms}}</span>
                                                    <span class="place-space">Quarto</span>
                                                </div>
                                                <div class="width-place-space" v-if="place.suites">
                                                    <span class="place-number">{{place.suites}}</span>
                                                    <span class="place-space">Suíte</span>
                                                </div>
                                                <div class="width-place-space" v-if="place.bathrooms">
                                                    <span class="place-number">{{place.bathrooms}}</span>
                                                    <span class="place-space">Banh.</span>
                                                </div>
                                                <div class="width-place-space" v-if="place.vacancies">
                                                    <span class="place-number">{{place.vacancies}}</span>
                                                    <span class="place-space">Vaga</span>
                                                </div>
                                                <div class="width-place-button">
                                                    <div>
                                                        <router-link class="btn-general main mt-3 mb-3" :to="/detalhes-imovel/ + place.place_id" target="_blank" style="display: inline-block">
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
                </template>
                <template v-else>
                    <div class="col-lg-10 mx-auto">
                        <div class="text-center">
                            <h3>Nenhum imóvel encontrado</h3>
                        </div>
                    </div>
                </template>       
                <pagination :source="pagination" @navigate="navigate"></pagination>
            </div>
        </div>
    </section>
</template>

<script>
import Pagination from './Pagination'
import { logout, getHeader, apiDomain, apiUrl, maskPhone } from './config'
import {Money} from 'v-money'

export default {
  name: 'PesquisarLocais',
    components: {
        Pagination,
        money: Money
    },
    data: () => ({
        places: [],
        clearFilter: false,
        apiDomain: apiDomain,
        maskPhone: maskPhone,
        quantities: [
            {'value': "", 'text': ''},
            {'value': 1, 'text': '1+'},
            {'value': 2, 'text': '2+'},
            {'value': 3, 'text': '3+'},
            {'value': 4, 'text': '4+'}
        ],
        form: {
            condition: "",
            type: "",
            areaMin: "",
            areaMax: "",
            valueMin: 0,
            valueMax: 0,
            rooms: "",
            bathrooms: "",
            vacancies: "",
            suites: ""
        },
        money: {
          decimal: ',',
          thousands: '.',
          prefix: '',
          suffix: '',
          precision: 2,
          masked: false
        },
        placeDetails: null,
        showModalPlaceDetails: false,
        pagination: {},
        intentText: 'Alugar',
        addressTypeText: 'Cidade'
    }),
    methods: {
        openModalFilterShow () {
            this.$store.dispatch('getModalFilterShow', true)
        },
        navigate (page = 1) {
            this.$store.dispatch('getSpinner', true)
            this.$store.dispatch('getModalFilterShow', false)
            let params = {}
            let formKeys = Object.keys(this.form)
            for (let key of formKeys) {
                params[key] = this.form[key]
            }
            params.page = page
            // params.address = this.$store.state.address
            params.intent = this.$store.state.intent
            // params.addressType = this.$store.state.addressType
            params.city = this.$store.state.city
            params.district = this.$store.state.district
            params.street = this.$store.state.street
            this.$http.get(apiUrl + 'get-filter-place', {params}).then(response => {
                    for (let key of formKeys) {
                        if (this.form[key] !== "" && this.form[key] !== 0) {
                            this.clearFilter = true
                        }
                    }
                    this.places = response.body.data
                    this.pagination = response.body
                    window.scrollTo(0, 0)
                    this.$store.dispatch('getSpinner', false)
            })
        },
        limitText (value, limit) {
            if (value) {
                return (value.length > limit ? value.substr(0, limit) : value)
            }
        },
        textAddress (place, limit) {
            let address = ''
            if (place.street) {
                address = place.street + ', ' + 'Bairro ' + place.district + ', ' + place.city
            } else {
                address = 'Bairro ' + place.district + ', ' + place.city
            }
            return (address.length > limit ? address.substr(0, limit) + '...' : address)
        },
        goTo (path) {
            this.$router.push(path)
        },
        changeIntent (intent, intentText) {
            this.$store.state.intent = intent
            this.intentText = intentText
            this.$store.dispatch('getSearch', !this.$store.state.search)
        },
        changeAddressType (addressType, addressTypeText) {
            this.$store.state.addressType = addressType
            this.addressTypeText = addressTypeText
        },
        searchAddress () {
            if (this.$store.state.addressType === 'city') {
                this.$store.state.district = ''
                this.$store.state.street = ''
            } else if (this.$store.state.addressType === 'district') {
                this.$store.state.city = ''
                this.$store.state.street = ''
            } else {
                this.$store.state.city = ''
                this.$store.state.district = ''
            }
            this.$store.dispatch('getSearch', !this.$store.state.search)
        },
        showPlaceDetails (place) {
            this.placeDetails = place
            this.showModalPlaceDetails = true
        },
        clearFormFilter () {
            let formKeys = Object.keys(this.form)
            for (let key of formKeys) {
                this.form[key] = ""
            }
            this.clearFilter = false
            this.navigate()
        },
        formatValue (valueNumber) {
            let value = parseFloat(valueNumber)
            return value.toLocaleString('pt-br', {minimumFractionDigits: 2})
        },
        setFilter () {
            this.$store.dispatch('getModalFilterShow', true)
        },
        getUser () {
            let userId = window.localStorage.getItem('userId')
            if (userId) {
                this.$http.post(apiUrl + 'get-user', {user_id: userId}, {headers: getHeader()}).then(response => {
                    this.$store.dispatch('getUser', response.body)
                }, error => {
                    if (error.status === 401) {
                        this.$store.dispatch('getUser', null)
                        logout()
                    }
                })
            }
        }
    },
    computed: {
        search () {
            return this.$store.state.search
        }
    },
    watch: {
        search () {
           this.navigate()
        }
    },
    created () {
        this.$store.dispatch('getSpinner', true)
        this.getUser()
        this.navigate()
    }
}
</script>

<style scoped>
</style>
