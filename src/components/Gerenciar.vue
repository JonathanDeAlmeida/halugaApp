<template>
    <section>
        <b-modal v-model="modalShow" hide-header hide-footer> 
            <div class="col-md-12 modal-border">
                <h4>Barbearia</h4>
            </div>
            <div class="col-md-12">
                <input class="w-100 mb-4" placeholder="Nome" v-model="name">
                <input class="w-100 mb-4" placeholder="Detalhes" v-model="details">
                <div class="row add-hours">
                    <div class="col-lg-6 col-md-12">
                        <div class="start">
                            Início ás:
                            <!-- <input type="time" class="form-control" v-model="form.start"> -->
                            <datetime type="time" v-model="start" value-zone="America/Sao_Paulo"></datetime>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <div class="finish">
                            Término ás:
                            <!-- <input type="time" class="form-control" v-model="form.finish"> -->
                            <datetime type="time" v-model="finish" value-zone="America/Sao_Paulo"></datetime>
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
                <input class="w-100 mb-4" placeholder="Nome" v-model="time.name">
                <input class="w-100 mb-4" placeholder="Detalhes" v-model="time.details">
                <div class="row add-hours">
                    <div class="col-lg-6 col-md-12">
                        <div class="start">
                            Início ás:
                            <!-- <input type="time" class="form-control" v-model="form.start"> -->
                            <datetime type="time" v-model="time.start" value-zone="America/Sao_Paulo"></datetime>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <div class="finish">
                            Término ás:
                            <!-- <input type="time" class="form-control" v-model="form.finish"> -->
                            <datetime type="time" v-model="time.finish" value-zone="America/Sao_Paulo"></datetime>
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

        <b-modal v-model="modalShowExcluded" hide-header hide-footer> 
            <div class="col-md-12 modal-border">
                <h4>Barbearia</h4>
            </div>
            <div class="col-md-12" v-if="time">
                <p>Tem certeza que deseja remover ?</p>
                <p>{{time.name}}</p>
                <p>{{time.start}}</p>
                <p>{{time.finish}}</p>
            </div>
            <hr>
            <div class="col-md-12">
                <div class="float-right">
                    <button class="btn btn-info" @click="modalShowExcluded = false"> Cancelar </button>
                    <button class="btn btn-primary" @click="excludedTime()"> Confirmar </button>
                </div>
            </div>
        </b-modal>

        <div class="container">
            <div class="row">
                <div class="col-lg-5 col-md-12 mb-5">
                    <div v-on:click="getTimes()">
                        <v-date-picker class="w-100 h-calendar" v-model="date"/>
                    </div>
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
                            <tbody v-for="(time, index) of times" :key="index">
                                <tr>
                                    <td>{{time.start}} ás {{time.finish}}</td>
                                    <td>{{time.name}}</td>
                                    <td>
                                        <button @click="setTime(time, 'edit')" class="btn btn-primary">Editar</button>
                                    </td>
                                    <td>
                                        <button @click="setTime(time, 'excluded')" class="btn btn-danger">Excluir</button>
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
        modalShowExcluded: false,
        date: new Date(),
        details: null,
        time: null,
        name: null,
        start: '00:00',
        finish: '00:00',
        times: null
    }),
    methods: {
        formSubmit () {     
            let form = {
                name: this.name,
                details: this.details,
                userId: window.localStorage.getItem('user'),
                selectedDate: this.moment(this.date).format('YYYY-MM-DD'),
                start: this.moment(this.start).format('hh:mm'),
                finish: this.moment(this.finish).format('hh:mm')
            }
            this.$http.post('http://localhost:8000/api/time-create', form).then(response => {
                console.log(response.body)
                this.getTimes()
                this.modalShow =  false
            })
        },
        getTimes () {
            let form = {
                userId: window.localStorage.getItem('user'),
                selectedDate: this.moment(this.date).format('YYYY-MM-DD')
            }
            this.$http.post('http://localhost:8000/api/get-times', form).then(response => {
                this.times = response.body
            })
        },
        setTime (time, type) {
            this.time = time
            if (type === 'edit') {
                this.modalShowEdit = true
            } else {
                this.modalShowExcluded = true
            }
        },
        excludedTime () {
            this.$http.post('http://localhost:8000/api/time-excluded', {timeId: this.time.id}).then(() => {
                console.log('excluído com sucesso')
                this.getTimes()
                this.modalShowExcluded =  false
            })
        },
    },
    created () {
        this.getTimes()
    }
}
</script>

<style scoped>
</style>
