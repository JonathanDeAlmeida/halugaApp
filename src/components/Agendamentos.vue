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
                    <button class="btn-blue" @click="modalShow = false"> Fechar </button>
                </div>
            </div>
        </b-modal>
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-12">
                    <div class="place-border">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="https://conteudo.imguol.com.br/c/esporte/83/2018/10/10/alex-bruno-e-dono-da-a4-barbearia-1539214396138_300x300.jpg">
                            </div>
                            <div class="col-md-6 text-center">
                                <div class="place-infos">
                                    <h5>Barbearia</h5>
                                    <p class="place-info"><strong>Rua:</strong> Coronel Silveira da Silva Coronel Silveira da Silva</p>
                                    <p class="place-info"><strong>Número:</strong> 10523</p>
                                    <p class="place-info"><strong>Bairro:</strong> Costa Cavalcanti da Silva Costa Cavalcanti da Silva</p>
                                    <p class="place-info"><strong>Cidade:</strong> Itajaí</p>
                                    <!--
                                    <p class="place-info"><strong>Telefone:</strong> Barbearia</p>
                                    <p class="place-info"><strong>UF:</strong> Barbearia</p>
                                    <p class="place-info"><strong>Complemento:</strong> Barbearia</p>
                                    <p class="place-info"><strong>CEP:</strong> Barbearia</p>
                                    <p class="place-info"><strong>Descrição:</strong> Barbearia</p>
                                    -->
                                    <div class="place-buttons">
                                        <button @click="modalShow = true" class="btn-blue">Informações</button>
                                    </div>
                                    <div class="scheduling-date-time">
                                        <p class="place-info">7 de outubro de 2020</p>
                                        <p class="place-info">08:00 ás 12:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12">
                    <div class="place-border">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="https://conteudo.imguol.com.br/c/esporte/83/2018/10/10/alex-bruno-e-dono-da-a4-barbearia-1539214396138_300x300.jpg">
                            </div>
                            <div class="col-md-6 text-center">
                                <div class="place-infos">
                                    <h5>Barbearia</h5>
                                    <p class="place-info"><strong>Rua:</strong> Coronel Silveira da Silva Coronel Silveira da Silva</p>
                                    <p class="place-info"><strong>Número:</strong> 10523</p>
                                    <p class="place-info"><strong>Bairro:</strong> Costa Cavalcanti da Silva Costa Cavalcanti da Silva</p>
                                    <p class="place-info"><strong>Cidade:</strong> Itajaí</p>
                                    <!--
                                    <p class="place-info"><strong>Telefone:</strong> Barbearia</p>
                                    <p class="place-info"><strong>UF:</strong> Barbearia</p>
                                    <p class="place-info"><strong>Complemento:</strong> Barbearia</p>
                                    <p class="place-info"><strong>CEP:</strong> Barbearia</p>
                                    <p class="place-info"><strong>Descrição:</strong> Barbearia</p>
                                    -->
                                    <div class="place-buttons">
                                        <button @click="modalShow = true" class="btn-blue">Informações</button>
                                    </div>
                                    <div class="scheduling-date-time">
                                        <p class="place-info">7 de outubro de 2020</p>
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
    props: {
        msg: String
    },
    data: () => ({
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
