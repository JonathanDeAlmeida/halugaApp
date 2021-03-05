<template>
    <section>
        <b-modal v-model="modalShow" hide-header hide-footer> 
            <div class="col-md-12 modal-border">
                <h4>Barbearia</h4>
            </div>
            <div class="col-md-12">
                <input class="w-100 mb-4" placeholder="Nome" v-model="form.name">
                <div class="row add-hours">
                    <div class="col-lg-6 col-md-12">
                        <div class="start">
                            Início ás:
                            <input type="time" class="form-control" v-model="form.start">
                            <!-- <datetime type="time" v-model="form.start"></datetime> -->
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <div class="finish">
                            Término ás:
                            <input type="time" class="form-control" v-model="form.finish">
                            <!-- <datetime type="time" v-model="form.finish"></datetime> -->
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="col-md-12">
                <div class="float-right">
                    <button class="btn-blue" @click="modalShow = false"> Fechar </button>
                    <button class="btn-blue" @click.prevent="formSubmit()"> Confirmar </button>
                </div>
            </div>
        </b-modal>

        <b-modal v-model="modalShowEdit" hide-header hide-footer> 
            <div class="col-md-12 modal-border">
                <h4>Barbearia</h4>
            </div>
            <div class="col-md-12">
                <input class="w-100 mb-4" placeholder="Nome">
                <div class="row add-hours">
                    <div class="col-lg-6 col-md-12">
                        <div class="start">
                            Início ás:
                            <input type="time" v-model="form.start">
                            <!-- <datetime type="time" v-model="time"></datetime> -->
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <div class="finish">
                            Término ás:
                            <input type="time" v-model="form.finish">
                            <!-- <datetime type="time" v-model="time"></datetime> -->
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="col-md-12">
                <div class="float-right">
                    <button class="btn-blue" @click="modalShowEdit = false"> Fechar </button>
                </div>
            </div>
        </b-modal>

        <b-modal v-model="modalShowRemove" hide-header hide-footer> 
            <div class="col-md-12 modal-border">
                <h4>Barbearia</h4>
            </div>
            <div class="col-md-12">
                <p>Tem certeza que deseja remover ?</p>
                <p>Nome: Alvo Percival Wulfrico Brian Dumbledore</p>
                <p>Início ás: 14:00</p>
                <p>Término ás: 15:00</p>
            </div>
            <hr>
            <div class="col-md-12">
                <div class="float-right">
                    <button class="btn btn-info" @click="modalShowRemove = false"> Cancelar </button>
                    <button class="btn btn-primary"> Confirmar </button>
                </div>
            </div>
        </b-modal>

        <div class="container">
            <div class="row">
                <div class="col-lg-5 col-md-12 mb-5">
                    <v-date-picker class="w-100 h-calendar" v-model="date"/>
                </div>
                <div class="col-lg-7 col-md-12">
                    <div class="row mb-4">
                        <div class="col-md-6 mb-3">
                            <h4 class="d-inline">{{moment(date).format('DD')}} de {{moment(date).format('MMMM')}} de {{moment(date).format('YYYY')}}</h4>
                        </div>
                        <div class="col-md-6">
                            <button @click="modalShow = true" class="btn btn-success float-right">Adicionar</button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="thead-dark">
                                <tr class="text-center">
                                    <th>Horário</th>
                                    <th>Nome</th>
                                    <th colspan="2">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>08:00 ás 12:00</td>
                                    <td>Alvo Percival Wulfrico Brian Dumbledore</td>
                                    <td>
                                        <button @click="modalShowEdit = true" class="btn btn-primary">Editar</button>
                                    </td>
                                    <td>
                                        <button @click="modalShowRemove = true" class="btn btn-danger">Excluir</button>
                                    </td>
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
    name: 'Gerenciar',
    data: () => ({
        modalShow: false,
        modalShowEdit: false,
        modalShowRemove: false,
        date: new Date(),
        time: null,
        form: {
            userId: null,
            name: null,
            start: null,
            finish: null,
            date: null
        }
    }),
    methods: {
        formSubmit () {      
            this.form.userId = window.localStorage.getItem('user')
            this.form.date = this.moment(this.date).format('YYYY-MM-DD')
            this.$http.post('http://localhost:8000/api/time-create', this.form).then(response => {
                console.log(response.body)
            })
        }
    },
}
</script>

<style scoped>
</style>
