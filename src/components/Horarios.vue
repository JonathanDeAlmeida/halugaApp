<template>
    <section>
        <b-modal v-model="modalShow" hide-header hide-footer> 
            <template v-if="placeInfo">
                <div class="col-md-12 modal-border">
                    <h4>{{placeInfo.name}}</h4>
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

        <div class="container">
            <div class="row">
                <div class="col-lg-5 col-md-12 mb-5">
                    <div class="place-border-schedules" v-if="place">
                        <div class="row">
                            <div class="col-md-6">
                                <img :src="'http://localhost:8000' + place.image_path">
                            </div>
                            <div class="col-md-6 text-center">
                                <div class="place-infos">
                                    <h5>{{place.name}}</h5>
                                    <p class="place-info"><strong>Rua:</strong> {{place.street}} </p>
                                    <p class="place-info"><strong>Número:</strong> {{place.number}} </p>
                                    <p class="place-info"><strong>Bairro:</strong> {{place.district}} </p>
                                    <p class="place-info"><strong>Cidade:</strong> {{place.city}} </p>
                                    <div class="place-buttons">
                                        <button @click="getPlaceInfo(place)" class="btn-general blue">Informações</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-on:click="getPlaceTimes()">
                        <v-date-picker class="w-100 h-calendar" v-model="date"/>
                    </div>
                </div>
                <div class="col-lg-7 col-md-12">
                    <div class="row mb-4">
                        <div class="col-md-12 mb-3">
                            <h4 class="d-inline">{{moment(date).format('DD')}} de {{moment(date).format('MMMM')}} de {{moment(date).format('YYYY')}}</h4>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="thead-dark">
                                <tr class="text-center">
                                    <th>Horários Indisponíveis</th>
                                </tr>
                            </thead>
                            <tbody v-if="times.length > 0">
                                <tr v-for="(time, index) of  times" :key="index">
                                    <td class="text-center" style="font-size: 25px">{{time.start}} ás {{time.finish}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Horarios',
    data: () => ({
        selectedDate: null,
        modalShow: false,
        date: new Date(),
        placeInfo: null,
        place: null,
        times: []
    }),
    methods: {
        getPlaceTimes () {
            let form = {
                place_id: this.$route.params.id,
                selectedDate: this.moment(this.date).format('YYYY-MM-DD')
            }
            this.$http.post('http://localhost:8000/api/get-place-times', form).then(response => {
                this.times = response.body
            })
        },
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
    },
    created () {
        window.localStorage.removeItem('user')
        this.$store.dispatch('getUser', null)
        if (this.$route.params.id) {
            this.$http.post('http://localhost:8000/api/get-place', {place_id: this.$route.params.id}).then(response => {
                this.place = response.body.place
                this.getPlaceTimes()
            })
        }
    }
}
</script>

<style scoped>
</style>
