<template>
    <section class="mb-container">

        <b-modal v-model="showModalAllPhotos" hide-header hide-footer size="lg"> 
            <template v-if="place">
                <div class="col-md-12 modal-border">
                    <h4>Fotos</h4>
                </div>
                <div class="col-md-12" style="overflow:auto; height: 400px">
                    <div v-for="(image, index) of place.images" :key="index">
                       <img class="mb-5" width="100%" height="auto" :src="apiDomain + image.path">
                    </div>
                </div>
                <hr>
                <div class="col-md-12">
                    <div class="float-right">
                        <button class="btn-general blue" @click="showModalAllPhotos = false"> Fechar </button>
                    </div>
                </div>
            </template>
        </b-modal>

        <template v-if="place">
            <div class="w-100 mb-4">
                <div class="place-image-details-desktop">
                    <div class="place-images-one">
                        <template v-for="(image, index) of place.images">
                            <img v-if="index < 4" class="place-image-item-one" :src="apiDomain + image.path" :key="index">
                        </template>
                    </div>
                    <div style="clear:both"></div>
                        <div class="place-images-two">
                            <template v-for="(image, index) of place.images">
                                <img v-if="index < 3" class="place-image-item-two" :src="apiDomain + image.path" :key="index">
                            </template>
                        </div>
                    <div style="clear:both"></div>
                    <div class="place-images-three">
                        <template v-for="(image, index) of place.images">
                            <img v-if="index < 2" class="place-image-item-three" :src="apiDomain + image.path" :key="index">
                        </template>
                    </div>
                    <div style="clear:both"></div>
                    <div class="place-images-four">
                        <template v-for="(image, index) of place.images">
                            <img v-if="index < 1" class="place-image-item-four" :src="apiDomain + image.path" :key="index">
                        </template>
                    </div>
                </div>
                <div class="place-image-details-mobile">
                    <div class="row">
                        <div class="col-lg-5 col-md-12 col-sm-12 place-details-carousel-mobile">
                            <b-carousel :interval="0" controls>
                                <b-carousel-slide v-for="(image, index) of place.images" :img-src="apiDomain + image.path" :key="index">
                                </b-carousel-slide>
                            </b-carousel>                                
                        </div>
                    </div>
                </div>
            </div>
        </template>
        
        <div class="container">
            <div class="row" v-if="place">
                <div class="col-md-6">
                    <div class="btn-all-photos-mobile text-center mb-4">
                        <button class="btn-general blue" @click="showModalAllPhotos = true">Ver Todas As Fotos</button>
                    </div>
                    <template v-if="place.intent === 'rent'">
                        <p class="place-rent-value text-center-mobile">R$ {{ formatValue(place.rent_value) }} 
                        <span class="fs-15">/ mês</span>
                        </p>
                    </template>
                    <template v-else>
                        <p class="place-rent-value text-center-mobile">R$ {{ formatValue(place.sale_value) }} </p>
                    </template>

                    <template v-if="place.condominium_value > 0">
                        <p class="d-inline place-secondary-value">Condomínio R$ {{ formatValue(place.condominium_value) }}</p>
                        - 
                    </template>
                    <p v-if="place.iptu > 0" class="d-inline place-secondary-value">IPTU R$ {{ formatValue(place.iptu) }}</p>

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
                            <!-- <span class="material-icons-two-tone">airline_seat_individual_suite</span> -->
                        </div>
                    </div>
                    <p class="place-address mt-4 text-center-mobile">{{place.street}}, Bairro {{place.district}}, {{place.city}}
                        <span v-if="place.complement"> , {{place.complement}} </span>
                    </p>
                </div>
                <div class="col-md-4 mx-auto text-center">
                    <div class="btn-all-photos-desktop">
                        <button class="btn-general blue" @click="showModalAllPhotos = true">Ver Todas As Fotos</button>
                    </div>
                    <div class="responsible-place">
                        <span class="responsible-name"><strong>Anunciante</strong> {{place.responsible_name}}</span>
                        <span class="responsible-phone"><strong>Contato</strong>  {{place.phone}}</span>

                    </div>
                </div>
                <div class="col-md-12">
                    <p class="place-description text-justify mt-5">{{place.description}}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { logout, getHeader, apiDomain, apiUrl } from './config'
export default {
    name: 'Horarios',
    data: () => ({
        showModalAllPhotos: false,
        place: null,
        apiDomain: apiDomain
    }),
    methods: {
        formatValue (valueNumber) {
            let value = parseFloat(valueNumber)
            return value.toLocaleString('pt-br', {minimumFractionDigits: 2})
        },
        getUser () {
            let userId = window.localStorage.getItem('userId')
            if (userId) {
                this.$http.post(apiUrl + 'get-user', {user_id: userId}, {headers: getHeader()}).then(response => {
                    this.$store.dispatch('getUser', response.body)
                    this.getPlace()
                }, error => {
                    if (error.status === 401) {
                        this.$store.dispatch('getUser', null)
                        logout()
                    }
                })
            } else {
                this.getPlace()
            }
        },
        getPlace () {
            if (this.$route.params.id) {
                this.$http.post(apiUrl + 'get-place', {place_id: this.$route.params.id}).then(response => {
                    this.place = response.body
                    this.$store.dispatch('getSpinner', false)
                })
            } else {
                this.$router.push('/')
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
