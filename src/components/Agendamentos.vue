<template>
    <section>
        <b-modal v-model="modalShow" hide-header hide-footer> 
            <div class="col-md-12 modal-border">
                <h4>Barbearia</h4>
            </div>
            <div class="col-md-12">
                <p class="place-info"><strong>Telefone:</strong> Barbearia</p>
                <p class="place-info"><strong>UF:</strong> Barbearia</p>
                <p class="place-info"><strong>Complemento:</strong> Barbearia</p>
                <p class="place-info"><strong>CEP:</strong> Barbearia</p>
                <p class="place-info"><strong>Descrição:</strong> Barbearia</p>
            </div>
            <hr>
            <div class="col-md-12">
                <div class="float-right">
                    <button class="btn-general blue" @click="modalShow = false"> Fechar </button>
                </div>
            </div>
        </b-modal>
        <div class="container">
            <div class="row float-right" style="margin-bottom: 20px">
                <router-link class="btn-general green" to="/criar-local">
                    Novo Local
                </router-link>
            </div>
            <div class="row">
                <div class="col-lg-12 col-md-12" v-for="(place, index) of places" :key="index">
                    <div class="place-border">
                        <div class="row">
                            <div class="col-md-6">
                                <img style="height: 200px" src="https://conteudo.imguol.com.br/c/esporte/83/2018/10/10/alex-bruno-e-dono-da-a4-barbearia-1539214396138_300x300.jpg">
                            </div>
                            <div class="col-md-6 text-center">
                                <div class="place-infos">
                                    <button @click="excluir(place.place_id)" class="btn-general danger">Excluir</button>
                                    <!-- <button @click="editar(place.place_id)" class="btn-general blue">Editar</button> -->

                                    <router-link class="btn-general blue" :to="/editar-local/ + place.place_id">
                                        Editar
                                    </router-link>

                                    <h5>{{place.condition}}</h5>
                                    <p class="place-info"><strong>Rua:</strong> Lorem Ipsum é simplesmente um texto fictício</p>
                                    <p class="place-info"><strong>Número:</strong> 10523</p>
                                    <p class="place-info"><strong>Bairro:</strong> Lorem Ipsum é simplesmente um texto fictício</p>
                                    <p class="place-info"><strong>Cidade:</strong> Itajaí</p>
                                    <!--
                                    <p class="place-info"><strong>Telefone:</strong> Barbearia</p>
                                    <p class="place-info"><strong>UF:</strong> Barbearia</p>
                                    <p class="place-info"><strong>Complemento:</strong> Barbearia</p>
                                    <p class="place-info"><strong>CEP:</strong> Barbearia</p>
                                    <p class="place-info"><strong>Descrição:</strong> Barbearia</p>
                                    -->
                                    <div class="place-buttons">
                                        <button @click="modalShow = true" class="btn-general blue">Informações</button>
                                    </div>
                                    <div class="scheduling-date-time">
                                        <p class="place-info">22 de março de 2021</p>
                                        <p class="place-info">08:00 ás 12:00</p>
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
        modalShow: false,
        date: new Date(),
        places: []
    }),
    methods: {
        excluir (id) {
            console.log(id)
            this.$http.post('http://localhost:8000/api/delete-place', {place_id: id}).then(response => {
                console.log(response.body)
                this.getPlaces()
            })
        },
        getPlaces () {
            let userId = window.localStorage.getItem('user')
            this.$http.post('http://localhost:8000/api/get-places', {user_id: userId}).then(response => {
                console.log(response.body)
                this.places = response.body
            })
        }
    },
    created () {
        let userId = window.localStorage.getItem('user')
        if (userId) {
            this.$http.post('http://localhost:8000/api/get-user', {user_id: userId}).then(response => {
            this.$store.dispatch('getUser', response.body.id)
            })
        }
        this.getPlaces()
    }
}
</script>

<style scoped>
</style>
