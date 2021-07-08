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
                            <option v-for="(type, index) of types" :key="index">
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

                <!-- <template>
                    <div class="row">
                        <div v-for="(limi, index) of limit" :key="index" class="col-md-3 mb-25" style="height: 10px">
                            <VuePictureInput
                            ref="pictureInput"
                            :hideChangeButton="true"
                            @change="onChanged(index)"
                            @remove="onRemoved(index)"
                            :width="100"
                            :removable="true"
                            removeButtonClass="btn-general danger"
                            :height="100"
                            accept="image/jpeg, image/png, image/gif"
                            buttonClass="btn-general blue"
                            :customStrings="{drag: 'Clique ou Arraste a Imagem Aqui', tap: 'Clique ou Arraste a Imagem Aqui'}">
                            </VuePictureInput>
                        </div>
                    </div>
                </template> -->

                
                <button @click.prevent="formSubmit()" class="btn-general blue float-right">Salvar</button>


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
</template>

<script>
// import VuePictureInput from 'vue-picture-input'
// import UploadImage from 'vue-upload-image';
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
    name: 'CriarLocal',
    components: {
        // VuePictureInput
        // UploadImage
        'vuedropzone': vue2Dropzone
    },
    data: () => ({
        dropzoneOptions: {
            maxFiles: 2,
            url: 'http://localhost:8000/upload-file',
            maxFilesize: 7,
            clickable: true,
            // headers: getHeaderFile(),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            addRemoveLinks: true,
            methods: 'post',
            acceptedFiles: '.png, .jpg',
            autoProcessQueue: true,
            dictDefaultMessage: 'Jogar a imagem (.PNG) aqui ou clique aqui',
            dictRemoveFile: 'REMOVER IMAGEM'
        },
        modalShow: false,
        limit: 4,
        alert: {
            status: false,
            title: "",
            type: "",
            message: ""
        },
        types: [
            {value: 'Apartamento'},
            {value: 'Casa'},
            {value: 'Casa de condomínio'},
            {value: 'Casa de Vila'},
            {value: 'Cobertura'},
            {value: 'Fazenda/Sítio/Chácara'},
            {value: 'Flat'},
            {value: 'Lote/Terreno'},
            {value: 'Sobrado'},
            {value: 'Consultório'},
            {value: 'Galpão/Depósito/Armazém'},
            {value: 'Garagem'},
            {value: 'Hotel/Motel/Pousada'},
            {value: 'Ponto comercial/Loja/Box'},
            {value: 'Prédio/Edifício inteiro'},
            {value: 'Sala/Conjunto'},
        ],
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
        images: []
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
            this.$http.post('http://localhost:8000/api/place-create', data).then(response => {
                console.log(response.body)
                this.getPlace()
                this.setAlert('success', 'Sucesso', 'Local Cadastrado com Sucesso')
                // this.$router.push('gerenciar')
            })
        },
        onChanged() {
            if (this.$refs.pictureInput.file) {
                this.image = this.$refs.pictureInput.file
                this.images.push(this.$refs.pictureInput.file)
            }
        },
        onRemoved() {
            this.image = ''
        },
        getPlace () {
            // let userId = window.localStorage.getItem('user')
            if (this.$route.params.id) {
                console.log(this.$route.params.id)
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
        addedDropZoneProfileFile: function (file) {
            let params = { fileId: JSON.parse(file.xhr.response).id }
            this.$store.dispatch('setUserProfileFileId', params).then(() => {
                this.updateProfile(this.user.user_profile)
            })
        },
        removedDropZoneProfileFile: function (file) {
            this.$parent.spinnerShow = true
            let fileId = file.id ? file.id : JSON.parse(file.xhr.response).id
            this.$store.dispatch('removeFileUserProfile', { fileId: fileId }).then(() => {
                this.updateProfile(this.user.user_profile)
            })
        },
        updateProfile (userProfile) {
            this.$parent.spinnerShow = true
            this.$store.dispatch('updateUserProfile', userProfile).then(() => {
                this.$store.dispatch('getUserForm', this.$route.params.id).then(() => {
                this.$store.dispatch('getUser', this.$route.params.id).then(() => {
                    this.$parent.spinnerShow = false
                })
                    this.$parent.spinnerShow = false
                })
            })
        },
        addStorageFile: function (file) {
            if (file) {
                this.mockFiles = null
                this.mockFiles = { name: file.name, size: 12345, id: file.id }
                if (this.$refs.myVueDropzone) {
                    this.$refs.myVueDropzone.manuallyAddFile(this.mockFiles, this.apiDomain + file.url)
                }
            }
        },
        searchCep () {
            // let cep = null
            // cep = this.formAddress[key].cep.replace(/[^0-9]/gi, '')
            // this.readonly = 'readonly'
            if (this.form.cep.length === 8) {
                this.$http.get('https://viacep.com.br/ws/' + this.form.cep + '/json/').then(response => {
                    if (response.body.erro === true) {
                    // this.setFormAddress(null, true, key, {cep: '', address: '', neighbourhood: '', uf: '', city: ''})
                    this.form.cep = ''
                    this.form.street = ''
                    this.form.district = ''
                    this.form.city = ''
                    this.form.state = ''
                    // this.$store.dispatch('setAlert', {
                    //     icon: 'fa-warning',
                    //     message: 'Endereço não encontrado',
                    //     show: true,
                    //     title: 'Atenção!',
                    //     type: 'warning'
                    // })
                    } else {
                        // this.setFormAddress(response.data, false, key, null)
                        let address = response.data
                        this.form.street = address.logradouro
                        this.form.district = address.bairro
                        this.form.city = address.localidade
                        this.form.state = address.uf
                        // document.getElementById('number').focus()
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
