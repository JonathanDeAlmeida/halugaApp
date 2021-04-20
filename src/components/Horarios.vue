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
            <div class="row">
                <div class="col-lg-5 col-md-12 mb-5">
                    <div class="place-border-schedules">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="https://conteudo.imguol.com.br/c/esporte/83/2018/10/10/alex-bruno-e-dono-da-a4-barbearia-1539214396138_300x300.jpg">
                            </div>
                            <div class="col-md-6 text-center">
                                <div class="place-infos">
                                    <h5>Barbearia</h5>
                                    <!-- <p class="place-info"><strong>Rua:</strong> Coronel Silveira da Silva Coronel Silveira da Silva</p>
                                    <p class="place-info"><strong>Número:</strong> 10523</p> -->
                                    <p class="place-info"><strong>Bairro:</strong> Lorem Ipsum é simplesmente um texto fictício</p>
                                    <p class="place-info"><strong>Cidade:</strong> Itajaí</p>
                                    <div class="place-buttons">
                                        <button @click="modalShow = true" class="btn-general blue">Informações</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <v-date-picker class="w-100 h-calendar" v-model="date"/>
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
                                    <th>Horário</th>
                                    <th>Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>08:00 ás 12:00</td>
                                    <td>Lorem Ipsum é simplesmente um texto fictício</td>
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
        date: new Date()
    }),
    methods: {
        hey () {
            console.log('ola')
        }
    },
}
</script>

<style scoped>
</style>
