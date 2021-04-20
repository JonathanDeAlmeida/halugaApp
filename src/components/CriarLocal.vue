<template>
    <div class="container">
        <div class="row">
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
            <div class="col-md-8">
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
            </div>
        </div>
    </div>
</template>

<script>
import VuePictureInput from 'vue-picture-input'
export default {
    name: 'CriarLocal',
    props: {
        msg: String
    },
    components: {
        VuePictureInput
    },
    data: () => ({
        modalShow: false,
        form: {
            userId: null,
            name: null,
            phone: null,
            cep: null,
            street: null,
            district: null,
            city: null,
            state: null,
            number: null,
            complement: null,
            description: null
        },
        image: null
    }),
    methods: {
        formSubmit () {      
            // if (this.image) {
            // console.log(this.image)
            // let data = new FormData()
            // data.append('file', this.image)
            // }

            this.form.userId = window.localStorage.getItem('user')
            // this.form.image = this.image
            this.$http.post('http://localhost:8000/api/place-create', this.form).then(response => {
                console.log(response.body)
                this.$router.push('gerenciar')
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
                let place = response.body
                this.form = {
                    name: place.name,
                    phone: place.phone.phone,
                    cep: place.address.cep,
                    street: place.address.street,
                    district: place.address.district,
                    city: place.address.city,
                    state: place.address.state,
                    number: place.address.number,
                    complement: place.address.complement,
                    description: place.description
                }
                console.log(this.form)
            })
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
        this.getPlace()
    }
}
</script>

<style scoped>
</style>
