<template>
    <div class="container">

        <div v-if="alert.status" :class="'alert-general ' + alert.type">
            <div :class="'border-alert ' + alert.type">
                <span>{{alert.title}}</span>
            </div>
            <div>
                <span>{{alert.message}}</span>
            </div>
        </div>

        <div class="row">
            <!-- <template v-if="form.id">
                <div class="col-md-4 mb-25">
                    <img :src="'http://localhost:8000' + form.imagePath" width="350" height="350">
                </div>
            </template>
            -->
            <!-- <div class="col-md-8">
                <div class="row">
                    <div class="col-md-6 mb-25">
                        <input v-model="form.name" class="form-control" placeholder="Nome">    
                    </div>
                    <div class="col-md-6 mb-25">
                        <input v-model="form.phone" class="form-control" placeholder="Telefone">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-25">
                        <input v-model="form.cep" class="form-control" placeholder="Cep">    
                    </div>
                    <div class="col-md-6 mb-25">
                        <input v-model="form.street" class="form-control" placeholder="Rua">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-25">
                        <input v-model="form.district" class="form-control" placeholder="Bairro">    
                    </div>
                    <div class="col-md-4 mb-25">
                        <input v-model="form.city" class="form-control" placeholder="Cidade">    
                    </div>
                    <div class="col-md-2 mb-25">
                        <input v-model="form.state" class="form-control" placeholder="UF">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 mb-25">
                        <input v-model="form.number" class="form-control" placeholder="N">    
                    </div>
                    <div class="col-md-9 mb-25">
                        <input v-model="form.complement" class="form-control" placeholder="Complemento">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 mb-25">
                        <textarea v-model="form.description" class="form-control" placeholder="Descrição"></textarea>
                    </div>
                </div>
                <button @click.prevent="formSubmit()" class="btn-general blue float-right">Salvar</button>
            </div> -->

            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-4 mb-25">
                        <select class="form-control" placeholder="Tipo" v-model="form.condition">
                            <option value="residencial">Residencial</option>
                            <option value="comercial">Comercial</option>
                        </select>
                    </div>
                    <div class="col-md-4 mb-25">
                        <select class="form-control" placeholder="Tipo" v-model="form.type">
                            <option v-for="(type, index) of $store.state.types" :key="index">
                                {{type.value}}
                            </option>
                        </select>
                    </div>
                    <div class="col-md-4 mb-25">
                        <input v-model="form.phone" class="form-control" placeholder="Contato">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-25">
                        <input v-model="form.cep" class="form-control" placeholder="Cep" @keyup="searchCep()">    
                    </div>
                    <div class="col-md-6 mb-25">
                        <input v-model="form.street" class="form-control" placeholder="Rua" disabled>    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-25">
                        <input v-model="form.district" class="form-control" placeholder="Bairro" disabled>    
                    </div>
                    <div class="col-md-4 mb-25">
                        <input v-model="form.city" class="form-control" placeholder="Cidade" disabled>    
                    </div>
                    <div class="col-md-2 mb-25">
                        <input v-model="form.state" class="form-control" placeholder="UF" disabled>    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 mb-25">
                        <input v-model="form.number" class="form-control" placeholder="N">    
                    </div>
                    <div class="col-md-9 mb-25">
                        <input v-model="form.complement" class="form-control" placeholder="Complemento">    
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-4 mb-25">
                        <input v-model="form.area" class="form-control" placeholder="Área útil (m²)">    
                    </div>
                    <div class="col-md-4 mb-25">
                        <input v-model="form.rooms" class="form-control" placeholder="Quartos">    
                    </div>
                    <div class="col-md-4 mb-25">
                        <input v-model="form.bathrooms" class="form-control" placeholder="Banheiros">    
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4 mb-25">
                        <input v-model="form.suites" class="form-control" placeholder="Suítes (Opcional)">    
                    </div>
                    <div class="col-md-4 mb-25">
                        <input v-model="form.vacancies" class="form-control" placeholder="Vagas (Opcional)">    
                    </div>
                    <div class="col-md-4 mb-25">
                        <input v-model="form.walk" class="form-control" placeholder="Andar (Opcional)">    
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4 mb-25">
                        <input v-model="form.rentValue" class="form-control" placeholder="Valor do Aluguel">    
                    </div>
                    <div class="col-md-4 mb-25">
                        <input v-model="form.condominium" class="form-control" placeholder="Condomínio (Opcional)">    
                    </div>
                    <div class="col-md-4 mb-25">
                        <input v-model="form.iptu" class="form-control" placeholder="IPTU (Opcional)">    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 mb-25">
                        <textarea v-model="form.description" class="form-control" placeholder="Descrição"></textarea>
                    </div>
                </div>
                
                <!-- <button @click.prevent="formSubmit()" class="btn-general blue float-right">Salvar</button> -->

                <div>
                    <vuedropzone
                        v-on:vdropzone-success="addedDropZoneProfileFile"
                        v-on:vdropzone-removed-file="removedDropZoneProfileFile"
                        :destroyDropzone="false"
                        ref="myVueDropzone"
                        id="myVueDropzone"
                        :options="dropzoneOptions">
                    </vuedropzone>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
    name: 'CriarLocal',
    components: {
        'vuedropzone': vue2Dropzone
    },
    data: () => ({
        dropzoneOptions: {
            maxFiles: 10,
            url: 'http://localhost:8000/api/upload-file',
            clickable: true,
            params: {
                place_id: null
            },
            addRemoveLinks: true,
            methods: 'post',
            acceptedFiles: '.png, .jpg',
            autoProcessQueue: true,
            dictDefaultMessage: 'Clique aqui ou Arraste a Imagem',
            dictRemoveFile: 'Remover',
            dictMaxFilesExceeded: 'Máximo de 10 imagens'
        },
        modalShow: false,
        alert: {
            status: false,
            title: "",
            type: "",
            message: ""
        },
        form: {
            id: null,
            userId: null,
            imagePath: null,
            condition: 'residencial',
            type: 'Apartamento',
            phone: null,
            cep: null,
            street: null,
            district: null,
            city: null,
            state: null,
            number: null,
            complement: null,
            area: null,
            rooms: null,
            bathrooms: null,
            suites: null,
            vacancies: null,
            walk: null,
            rentValue: null,
            condominium: null,
            iptu: null,
            description: null
        },
        apiDomain: 'http://localhost:8000',
        // form: {
        //     id: null,
        //     userId: null,
        //     name: null,
        //     phone: null,
        //     cep: null,
        //     street: null,
        //     district: null,
        //     city: null,
        //     state: null,
        //     number: null,
        //     complement: null,
        //     description: null,
        //     imagePath: null,
        //     condition: 'residencial',
        //     type: 'Apartamento'
        // },
    }),
    methods: {
        formSubmit () {
            this.form.userId = window.localStorage.getItem('user')
            let data = new FormData()
            // data.append('file', this.image)
            data.append('form', JSON.stringify(this.form))
            this.$http.post('http://localhost:8000/api/place-create', data).then(() => {
                this.getPlace()
                this.setAlert('success', 'Sucesso', 'Local Cadastrado com Sucesso')
                // this.$router.push('gerenciar')
            })
        },
        getPlace () {
            if (this.$route.params.id) {
                this.$http.post('http://localhost:8000/api/get-place', {place_id: this.$route.params.id}).then(response => {                
                    this.form = response.body
                })
            }
            
        },
        setAlert (type, title, message) {
            this.alert.type = type
            this.alert.title = title
            this.alert.message = message
            this.alert.status = true
            setTimeout(() => {
                this.alert.status = false
                this.alert.type = ""
                this.alert.title = ""
                this.alert.message = ""
            }, 5000)
        },
        addedDropZoneProfileFile: function (file, response) {
            file.id = response.id
        },
        removedDropZoneProfileFile: function (file) {
            this.$http.post('http://localhost:8000/api/remove-file', {file_id: file.id})
        },
        addStorageFile: function (files) {
            for (let file of files) {
                if (file) {
                    this.mockFiles = null
                    this.mockFiles = { name: file.name, size: 12345, id: file.id }
                    if (this.$refs.myVueDropzone) {
                        this.$refs.myVueDropzone.manuallyAddFile(this.mockFiles, this.apiDomain + file.path)
                    }
                }
            }
        },
        searchCep () {
            if (this.form.cep.length === 8) {
                this.$http.get('https://viacep.com.br/ws/' + this.form.cep + '/json/').then(response => {
                    if (response.body.erro === true) {
                    this.form.cep = ''
                    this.form.street = ''
                    this.form.district = ''
                    this.form.city = ''
                    this.form.state = ''
                    } else {
                        let address = response.data
                        this.form.street = address.logradouro
                        this.form.district = address.bairro
                        this.form.city = address.localidade
                        this.form.state = address.uf
                    }
                })
            } else {
                this.form.street = ''
                this.form.district = ''
                this.form.city = ''
                this.form.state = ''
            }
        },
    },
    created () {
        if (this.$route.params.id) {
            this.dropzoneOptions.params.place_id = this.$route.params.id
            this.$http.post('http://localhost:8000/api/get-place-images', {place_id: this.$route.params.id}).then(response => {
                this.addStorageFile(response.body)
            })
        }
        let userId = window.localStorage.getItem('user')
        if (userId) {
            this.$http.post('http://localhost:8000/api/get-user', {user_id: userId}).then(response => {
                this.$store.dispatch('getUser', response.body.id)
            })
        }
        this.getPlace()
    }
}
</script>

<style scoped>
</style>
