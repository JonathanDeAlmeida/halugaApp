<template>
    <section class="mt-container mb-container">
        
        <b-modal v-model="showModalPlaceDetails" hide-header hide-footer size="lg"> 
            <template v-if="placeDetails">
                <div class="col-md-12 modal-border">
                    <h4>Detalhes</h4>
                </div>
                <div class="col-md-12 text-justify">
                    <p><strong>Anunciante: </strong> {{placeDetails.responsible_name}}</p>
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

        <b-modal v-model="showModalPlaceDelete" hide-header hide-footer> 
            <template>
                <div class="col-md-12 modal-border">
                    <h4>Excluir</h4>
                </div>
                <div class="col-md-12 text-justify">
                    Tem certeza que deseja excluir permanentemente ?
                </div>
                <hr>
                <div class="col-md-12">
                    <div class="float-right">
                        <button class="btn-general blue-light mr-2" @click="showModalPlaceDelete = false"> Fechar </button>
                        <button @click="excluir(placeDeleteId)" class="btn-general blue">Confirmar</button>
                    </div>
                </div>
            </template>
        </b-modal>

        <div class="container" v-if="load">

            <div class="row">
                <template v-if="places.length > 0">
                    <div class="col-lg-10 mx-auto" v-for="(place, index) of places" :key="index">
                        <div class="place-border">
                            <div class="row">
                                <template v-if="place.images.length > 0">
                                    <div class="col-lg-5 col-md-12 col-sm-12">
                                        <b-carousel :interval="0" controls>
                                            <b-carousel-slide v-for="(image, index) of place.images" :img-src="domain + image.path" :key="index">
                                            </b-carousel-slide>
                                        </b-carousel>                                
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="col-lg-5 col-md-12 col-sm-12">
                                        <div class="text-center place-border no-image">
                                            <p class="mt-5"> Sem Imagem</p>
                                        </div>
                                    </div>
                                </template>
                                <div class="col-lg-7 col-md-12 col-sm-12">
                                    <div class="place-details">
                                        <div style="padding-left: 5px">
                                            <div class="row">
                                                <div class="col-lg-7 col-md-12">
                                                <template v-if="place.intent === 'rent'">
                                                    <p class="place-rent-value mt-mobile">R$ {{ formatValue(place.rent_value) }} 
                                                    <span class="fs-15">/ mês</span>
                                                    </p>
                                                </template>
                                                <template v-else>
                                                    <p class="place-rent-value mt-mobile">R$ {{ formatValue(place.sale_value) }} </p>
                                                </template>
                                                </div>
                                                <div class="col-lg-5 col-md-12 mt-mobile" style="padding-left: 0">
                                                    <div class="btn-place-actions">
                                                        <button @click.prevent="openModalPlaceDelete(place.place_id)" class="btn-general blue-light mr-2">Excluir</button>
                                                        <button class="btn-general blue" @click.prevent="goTo('/editar-imovel/' + place.place_id)">
                                                            Editar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <p v-if="place.condominium_value > 0" class="d-inline place-secondary-value">Condomínio R$ {{ formatValue(place.condominium_value) }}</p> 

                                            <span v-if="place.condominium_value > 0 && place.iptu > 0"> - </span> 

                                            <p v-if="place.iptu > 0" class="d-inline place-secondary-value">IPTU R$ {{ formatValue(place.iptu) }}</p>
                                            
                                            <br>
                                            <template v-if="place.description">
                                                <p class="place-description-search" v-html="limitText(place.description, 42)"></p>...
                                                <a class="link-blue-light d-inline" href="" @click.prevent="showPlaceDetails(place)">Ver Mais</a>
                                            </template>
                                            
                                            <p v-html="textAddress(place, 50)" class="place-address-responsible" :class="place.description ? '' : 'mt-5'"></p>
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
                                                    <div v-if="place.active">
                                                        <button class="btn-general main mt-3" @click.prevent="goTo('/detalhes-imovel/' + place.place_id)">
                                                            Ver Detalhes
                                                        </button>
                                                    </div>
                                                    <!-- <div v-else>
                                                        <button disabled class="btn-general gray mt-3 cursor-pointer" title="Ver detalhes só estará disponível, quando o anúncio estiver ativo, quando tiver no mínimo 5 fotos">
                                                            Ver Detalhes
                                                        </button>
                                                    </div> -->
                                                </div>  
                                                <div class="col-md-12 mt-2" style="padding: 0">
                                                    <div class="float-left">
                                                        <span v-if="place.active" style="color: white; cursor: pointer" class="badge bg-success">Anúncio Ativo</span>
                                                        <span v-else style="color: white; cursor: pointer" class="badge bg-danger" title="Para o anúncio estar ativo, deve ter no mínimo 5 fotos">
                                                            Anúncio Inativo
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <pagination :source="pagination" @navigate="navigate"></pagination>
                </template>
                <template v-else>
                    <div class="col-lg-10 mx-auto">
                        <div class="text-center">
                            <h3>Nenhum imóvel cadastrado</h3>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>

<script>
import Pagination from './Pagination'
import { getHeader, logout, apiUrl, apiDomain, maskPhone } from './config'
// import spinner from 'vue-strap/src/Spinner'

export default {
    name: 'MeusImoveis',
    components: {
        Pagination,
        // spinner
    },
    data: () => ({
        domain: apiDomain,
        pagination: {},
        places: [],
        placeDetails: null,
        showModalPlaceDetails: false,
        showModalPlaceDelete: false,
        placeDeleteId: null,
        maskPhone: maskPhone,
        load: false
    }),
    methods: {
        openModalPlaceDelete (placeId) {
            this.placeDeleteId = placeId
            this.showModalPlaceDelete = true
        },
        limitText (value, limit) {
            if (value) {
                return (value.length > limit ? value.substr(0, limit) : value)
            }
        },
        textAddress (place, limit) {
            let address = place.street + ', ' + 'Bairro ' + place.district + ', ' + place.city
            return (address.length > limit ? address.substr(0, limit) + '...' : address)
        },
        showPlaceDetails (place) {
            this.placeDetails = place
            this.showModalPlaceDetails = true
        },
        formatValue (valueNumber) {
            let value = parseFloat(valueNumber)
            return value.toLocaleString('pt-br', {minimumFractionDigits: 2})
        },
        goTo (path) {
            this.$store.dispatch('getSpinner', true)
            this.$router.push(path)
            setTimeout(() => {
                this.$store.dispatch('getSpinner', false)
            }, 1000)
        },
        excluir (id) {
            this.$store.dispatch('getSpinner', true)
            this.$http.post(apiUrl + 'delete-place', {place_id: id}, {headers: getHeader()}).then(() => {
                this.placeDeleteId = null
                this.showModalPlaceDelete = false
                this.navigate()
            }, error => {
                if (error.status === 401) {
                    this.$store.dispatch('getUser', null)
                    logout()
                }
            })
        },
        navigate (page = 1) {
            let userId = window.localStorage.getItem('userId')
            let params = {
                user_id: userId,
                page: page
            }
            this.$http.get(apiUrl + 'get-places', {params, headers: getHeader()}).then(response => {
                this.places = response.body.data
                this.pagination = response.body
                window.scrollTo(0, 0)
                this.load = true
                this.$store.dispatch('getSpinner', false)
            }, error => {
                if (error.status === 401) {
                    this.$store.dispatch('getUser', null)
                    logout()
                }
                this.load = true
            })
        },
        getUser () {
            let userId = window.localStorage.getItem('userId')
            if (userId) {
                this.$http.post(apiUrl + 'get-user', {user_id: userId}, {headers: getHeader()}).then(response => {
                    this.$store.dispatch('getUser', response.body)
                    this.navigate()
                }, error => {
                    if (error.status === 401) {
                        this.$store.dispatch('getUser', null)
                        logout()
                    }
                })
            } else {
                this.$store.dispatch('getUser', null)
                logout()
            }
        }
    },
    created () {
        this.$store.dispatch('getSpinner', true)
        this.getUser()
    }
}
</script>

<style scoped>
</style>
