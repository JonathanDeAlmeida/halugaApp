<template>
    <section>

        <b-modal v-model="showModalAllPhotos" hide-header hide-footer> 
            <template v-if="place">
                <div class="col-md-12 modal-border">
                    <h4>Fotos</h4>
                </div>
                <div class="col-md-12" style="overflow:auto; height: 400px">
                    <div v-for="(image, index) of place.images" :key="index">
                       <img width="100%" height="auto" :src="'http://localhost:8000' + image.path">
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
            <div class="w-100 mb-5">
                <div class="place-images-desktop">
                    <template v-for="(image, index) of place.images">
                        <img v-if="index < 4" class="place-image-item-desktop" :src="'http://localhost:8000' + image.path" :key="index">
                    </template>

                    <!-- <div style="width: 25%; height: 320px; float:left" :key="index" v-if="index < 4">
                        <img class="place-image-item-desktop" :src="'http://localhost:8000' + image.path" :key="index">
                    </div> -->
                </div>
                <div style="clear:both"></div>
                <div class="place-images-mobile">
                    <template v-for="(image, index) of place.images">
                        <img v-if="index < 3" class="place-image-item-mobile" :src="'http://localhost:8000' + image.path" :key="index">
                    </template>
                </div>
            </div>
        </template>
        
        <div class="container">
            <div class="row" v-if="place">
                <div class="col-md-6">
                    <div class="btn-all-photos-mobile text-center mb-4">
                        <button class="btn btn-info" @click="showModalAllPhotos = true">Ver Todas As Fotos</button>
                    </div>
                    <template v-if="place.rent_value">
                        <p class="place-rent-value">R$ {{ formatValue(place.rent_value) }} 
                        <span class="fs-15">/ mês</span>
                        </p>
                    </template>
                    <template v-else>
                        <p class="place-rent-value">R$ {{ formatValue(place.sale_value) }} </p>
                    </template>

                    <template v-if="place.condominium_value">
                        <p class="d-inline place-secondary-value">Condomínio R$ {{ formatValue(place.condominium_value) }}</p>
                        - 
                    </template>
                    <p v-if="place.iptu" class="d-inline place-secondary-value">IPTU R$ {{ formatValue(place.iptu) }}</p>

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
                    <p class="place-address mt-4">{{place.street}}, Bairro {{place.district}}, {{place.city}}, {{place.complement}}</p>
                </div>
                <div class="col-md-4 mx-auto text-center">
                    <div class="btn-all-photos-desktop">
                        <button class="btn btn-info" @click="showModalAllPhotos = true">Ver Todas As Fotos</button>
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

export default {
    name: 'Horarios',
    data: () => ({
        showModalAllPhotos: false,
        place: null
    }),
    methods: {
        formatValue (value) {
            return value.toLocaleString('pt-br', {minimumFractionDigits: 2})
        }
    },
    created () {
        window.localStorage.removeItem('user')
        this.$store.dispatch('getUser', null)
        if (this.$route.params.id) {
            this.$http.post('http://localhost:8000/api/get-place', {place_id: this.$route.params.id}).then(response => {
                this.place = response.body
            })
        }
    }
}
</script>

<style scoped>
</style>
