<template>
    <section class="mt-65">

        <!-- <spinner v-model="spinnerShow" size="lg"></spinner> -->
        
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
                        <button class="btn-general blue mr-2" @click="showModalPlaceDelete = false"> Fechar </button>
                        <button @click="excluir(placeDeleteId)" class="btn-general green">Confirmar</button>
                    </div>
                </div>
            </template>
        </b-modal>

        <div class="container">
            <div class="row">
                <div class="col-lg-10 mx-auto">
                    <div class="mb-25 float-right"> 
                        <router-link class="btn-general green float-right" to="/criar-local">
                            Cadastrar Imóvel
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="row">
                <template v-if="places.length > 0">
                    <div class="col-lg-10 mx-auto" v-for="(place, index) of places" :key="index">
                        <div class="place-border">
                            <div class="row">
                                <template v-if="place.images.length > 0">
                                    <div class="col-lg-5 col-md-12 col-sm-12">
                                        <b-carousel :interval="0" controls>
                                            <b-carousel-slide v-for="(image, index) of place.images" :img-src="'http://localhost:8000' + image.path" :key="index">
                                            </b-carousel-slide>
                                        </b-carousel>                                
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="col-lg-5 col-md-12 col-sm-12 mb-2">
                                        <div style="height: 255px; margin: 0" class="text-center place-border">
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
                                                    <p class="place-rent-value">R$ {{ formatValue(place.rent_value) }} 
                                                    <span class="fs-15">/ mês</span>
                                                    </p>
                                                </template>
                                                <template v-else>
                                                    <p class="place-rent-value">R$ {{ formatValue(place.sale_value) }} </p>
                                                </template>
                                                </div>
                                                <div class="col-lg-5 col-md-12">
                                                    <div class="btn-place-actions">
                                                        <button @click.prevent="openModalPlaceDelete(place.place_id)" class="btn btn-danger mr-2">Excluir</button>
                                                        <router-link class="btn btn-primary" :to="/editar-local/ + place.place_id">
                                                            Editar
                                                        </router-link>
                                                    </div>
                                                </div>
                                            </div>

                                            <template v-if="place.condominium_value">
                                                <p class="d-inline place-secondary-value">Condomínio R$ {{ formatValue(place.condominium_value) }}</p>
                                                - 
                                            </template> 
                                            <p v-if="place.iptu" class="d-inline place-secondary-value">IPTU R$ {{ formatValue(place.iptu) }}</p>
                                            
                                            <br>
                                            <template v-if="place.description">
                                                <p class="place-description-search" v-html="limitText(place.description, 42)"></p>...
                                                <a class="d-inline" href="" @click.prevent="showDescription(place.description)">Ver Mais</a>
                                            </template>
                                            
                                            <p class="place-address" :class="place.description ? '' : 'mt-5'">{{place.street}}, Bairro {{place.district}}, {{place.city}}</p>
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
                                                        <router-link class="btn btn-info mt-3" :to="/horarios/ + place.place_id" target="_blank">
                                                            Ver Detalhes
                                                        </router-link>
                                                    </div>
                                                    <div v-else>
                                                        <button disabled class="btn btn-secondary mt-3 cursor-pointer" title="Ver detalhes só estará disponível, quando o anúncio estiver ativo, quando tiver no mínimo 5 fotos">
                                                            Ver Detalhes
                                                        </button>
                                                    </div>
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
                    <div class="col-lg-3 mx-auto">
                        <pagination :source="pagination" @navigate="navigate"></pagination>
                    </div>
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
import { getHeader, logout } from './config'
// import spinner from 'vue-strap/src/Spinner'

export default {
    name: 'Agendamentos',
    components: {
        Pagination,
        // spinner
    },
    data: () => ({
        pagination: {},
        places: [],
        description: "",
        showModalDescription: false,
        showModalPlaceDelete: false,
        placeDeleteId: null,
        // spinnerShow: true
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
        showDescription (description) {
            this.description = description
            this.showModalDescription = true
        },
        formatValue (value) {
            return value.toLocaleString('pt-br', {minimumFractionDigits: 2})
        },
        excluir (id) {
            this.$http.post('http://localhost:8000/api/delete-place', {place_id: id}, {headers: getHeader()}).then(() => {
                this.placeDeleteId = null
                this.showModalPlaceDelete = false
                this.navigate()
            }, error => {
                console.log(error)
                this.$store.dispatch('getUser', null)
                logout()
            })
        },
        navigate (page = 1) {
            let userId = window.localStorage.getItem('userId')
            let params = {
                user_id: userId,
                page: page
            }
            this.$http.get('http://localhost:8000/api/get-places', {params, headers: getHeader()}).then(response => {
                this.places = response.body.data
                this.pagination = response.body
            }, error => {
                console.log(error)
                this.$store.dispatch('getUser', null)
                logout()
            })
        },
        getUser () {
            let userId = window.localStorage.getItem('userId')
            if (userId) {
                this.$http.post('http://localhost:8000/api/get-user', {user_id: userId}, {headers: getHeader()}).then(response => {
                    this.$store.dispatch('getUser', response.body)
                    this.navigate()
                }, error => {
                    console.log(error)
                    this.$store.dispatch('getUser', null)
                    logout()
                })
            } else {
                this.$store.dispatch('getUser', null)
                logout()
            }
        }
    },
    created () {
        this.getUser()
        this.navigate()
    }
}
</script>

<style scoped>
</style>
