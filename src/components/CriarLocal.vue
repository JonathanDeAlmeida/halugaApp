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

        <div class="row" v-if="load">
            <!-- <template v-if="form.id">
                <div class="col-md-4 mb-25">
                    <img :src="'http://localhost:8000' + form.imagePath" width="350" height="350">
                </div>
            </template>
            <template v-else>
                <div class="col-md-4 mb-25">
                    <VuePictureInput
                    ref="pictureInput"
                    @change="onChanged"
                    @remove="onRemoved"
                    :width="500"
                    :removable="true"
                    removeButtonClass="ui red button"
                    :height="500"
                    accept="image/jpeg, image/png, image/gif"
                    buttonClass="ui button primary"
                    :customStrings="{drag: 'Clique ou Arraste a Imagem Aqui', tap: 'Clique ou Arraste a Imagem Aqui'}">
                    </VuePictureInput>
                </div>
            </template> -->
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
                {{form}}
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
                <button @click.prevent="formSubmit()" class="btn-general blue float-right">Salvar</button>
            </div>
        </div>
    </div>
</template>

<script>
// import VuePictureInput from 'vue-picture-input'
export default {
    name: 'CriarLocal',
    components: {
        // VuePictureInput
    },
    data: () => ({
        modalShow: false,
        load: false,
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
            } else {
                console.log("Old browser. No support for Filereader API")
            }
        },
        onRemoved() {
            this.image = ''
        },
        getPlace () {
            let userId = window.localStorage.getItem('user')
            this.$http.post('http://localhost:8000/api/get-place', {user_id: userId}).then(response => {
                if (response.body.success) {
                    let place = response.body.place
                    if (!place) {
                        this.form = {
                            id: place.place_id,
                            name: place.name,
                            phone: place.phone,
                            cep: place.cep,
                            street: place.street,
                            district: place.district,
                            city: place.city,
                            state: place.state,
                            number: place.number,
                            complement: place.complement,
                            description: place.description,
                            imagePath: place.image_path
                        }
                    }
                }
                this.load = true
            })
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
        }
        // attemptUpload() {
        //     console.log(this.image)
        //     if (this.image) {
        //     // FormDataPost('http://localhost:8001/user/picture', this.image)
        //     //     .then(response=>{
        //     //     if (response.data.success){
        //     //         this.image = '';
        //     //         console.log("Image uploaded successfully ✨");
        //     //     }
        //     //     })
        //     //     .catch(err=>{
        //     //     console.error(err);
        //     //     });
        //     // }
        //     }
        // }
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
