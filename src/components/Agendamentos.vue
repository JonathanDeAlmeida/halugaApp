<template>
    <section class="mt-65">
        <div class="container">
            <div class="row">
                <div class="col-md-12 px-0">
                    <div class="col-md-6 mb-25 float-right"> 
                        <router-link class="btn-general green float-right" to="/criar-local">
                            Novo Local
                        </router-link>
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
                                        <div class="row">
                                            <div class="col-lg-7 col-md-12">
                                                <p class="place-rent-value">R$ {{ formatValue(place.rent_value) }} 
                                                    <span class="fs-15">/ mês</span>
                                                </p>
                                            </div>
                                            <div class="col-lg-5 col-md-12">
                                                <div class="btn-place-actions">
                                                    <button @click="excluir(place.place_id)" class="btn btn-danger mr-2">Excluir</button>
                                                    <router-link class="btn btn-primary" :to="/editar-local/ + place.place_id">
                                                        Editar
                                                    </router-link>
                                                </div>
                                            </div>
                                        </div>

                                        <p class="d-inline place-secondary-value">Condomínio R$ {{ formatValue(place.condominium_value) }}</p>
                                        - 
                                        <p class="d-inline place-secondary-value">IPTU R$ {{ formatValue(place.iptu) }}</p>
                                        
                                        <p class="place-description-search">{{place.description}}</p>
                                        
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
                                                <span class="place-space">Quartos</span>
                                            </div>
                                            <div class="width-place-space">
                                                <span class="place-number">{{place.suites}}</span>
                                                <span class="place-space">Suítes</span>
                                            </div>
                                            <div class="width-place-space">
                                                <span class="place-number">{{place.bathrooms}}</span>
                                                <span class="place-space">Banh.</span>
                                            </div>
                                            <div class="width-place-space">
                                                <span class="place-number">{{place.vacancies}}</span>
                                                <span class="place-space">Vagas</span>
                                            </div>
                                            <div class="width-place-button">
                                                <div>
                                                    <router-link class="btn btn-info mt-3" :to="/horarios/ + place.place_id" target="_blank">
                                                        Ver Detalhes
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
    name: 'Agendamentos',
    data: () => ({
        places: []
    }),
    methods: {
        excluir (id) {
            this.$http.post('http://localhost:8000/api/delete-place', {place_id: id}).then(() => {
                this.getPlaces()
            })
        },
        formatValue (value) {
            return value.toLocaleString('pt-br', {minimumFractionDigits: 2})
        },
        getPlaces () {
            let userId = window.localStorage.getItem('user')
            this.$http.post('http://localhost:8000/api/get-places', {user_id: userId}).then(response => {
                this.places = response.body
            })
        }
    },
    created () {
        let userId = window.localStorage.getItem('user')
        if (userId) {
            this.$http.post('http://localhost:8000/api/get-user', {user_id: userId}).then(response => {
                this.$store.dispatch('getUser', response.body)
            })
        }
        this.getPlaces()
    }
}
</script>

<style scoped>
</style>
