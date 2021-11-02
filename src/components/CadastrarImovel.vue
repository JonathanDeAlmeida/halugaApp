<template>
    <div class="container mt-container mb-container" :class="$route.params.id ? 'mt-65' : 'mt-5'">

        <div class="row">
            <div class="col-md-12">
                
                <template v-if="$route.params.id">
                    <div style="margin-bottom: 70px">
                        <vuedropzone
                            v-on:vdropzone-success="addedDropZoneProfileFile"
                            v-on:vdropzone-removed-file="removedDropZoneProfileFile"
                            :destroyDropzone="false"
                            ref="myVueDropzone"
                            id="myVueDropzone"
                            :options="dropzoneOptions">
                        </vuedropzone>
                        <div class="row" v-if="!form.active">
                            <div class="col-md-6">
                                <div class="mt-2">
                                    <div class="alert alert-success" role="alert">
                                        <!-- <span class="material-icons">arrow_back_ios</span> -->
                                        Para ativar o anúncio devem ser inseridas no mínimo cinco imagens
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>       

                <div class="row mb-4">
                    <div class="col-md-12">
                        <h3>Dados do Imóvel</h3>
                    </div>
                </div>

                <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(formSubmit)">
                        
                        <div class="row">
                            <div class="col-lg-2 mb-25">
                                <label class="label-line">Intenção</label>
                                <select class="select-line" v-model="form.intent" @change="changeIntent">
                                    <option value="rent">Alugar</option>
                                    <option value="sell">Vender</option>
                                </select>
                            </div>
                            <div class="col-lg-2 mb-25">
                                <label class="label-line">Condição</label>
                                <select class="select-line" v-model="form.condition">
                                    <option value="residencial">Residencial</option>
                                    <option value="comercial">Comercial</option>
                                </select>
                            </div>
                            <div class="col-lg-2 mb-25">
                                <label class="label-line">Tipo</label>
                                <select class="select-line" v-model="form.type">
                                    <option v-for="(type, index) of $store.state.types" :key="index">
                                        {{type.value}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-lg-2 mb-25 mt-2">
                                <label class="label-line">Contato (Obrigatório)</label>
                                <masked-input v-model="form.phone" mask="(11) 11111-1111" class="input-line" />                                
                            </div>
                            <div class="col-lg-2 mb-25 mt-2">         
                                <label class="label-line">Área útil (m²) (Obrigatório)</label>                               
                                <ValidationProvider rules="required|integer" v-slot="{ errors }">
                                    <input v-model="form.area" class="input-line">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                            <div class="col-lg-2 mb-25 mt-2">
                                <template v-if="form.intent === 'rent'">
                                    <label class="label-line">Valor do Aluguel (Obrigatório)</label>
                                </template>
                                <template v-else>
                                    <label class="label-line">Valor de Venda (Obrigatório)</label>
                                </template>
                                <money id="value" name="value" v-model="form.value" class="input-line" maxlength="14" v-bind="money"></money>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-2 mb-25">
                                <label class="label-line">Valor do Condomínio</label>
                                <money id="condominium_value" name="condominium_value" v-model="form.condominium_value" class="input-line" maxlength="14" v-bind="money"></money>
                            </div>
                            <div class="col-lg-2 mb-25">
                                <label class="label-line">IPTU</label>
                                <money id="iptu" name="iptu" v-model="form.iptu" class="input-line" maxlength="14" v-bind="money"></money>
                            </div>
                            <div class="col-lg-1 mb-25">
                                <label class="label-line">Banheiros</label>
                                <ValidationProvider rules="integer" v-slot="{ errors }">
                                    <input v-model="form.bathrooms" class="input-line">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                            <template>
                                <div class="col-lg-1 mb-25">
                                    <label class="label-line">Quartos</label>
                                    <ValidationProvider rules="integer" v-slot="{ errors }">
                                        <input v-model="form.rooms" class="input-line">
                                        <span class="form-error">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                <div class="col-lg-1 mb-25">
                                    <label class="label-line">Suítes</label>
                                    <ValidationProvider rules="integer" v-slot="{ errors }">
                                        <input v-model="form.suites" class="input-line">
                                        <span class="form-error">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                <div class="col-lg-1 mb-25">
                                    <label class="label-line">Vagas</label>
                                    <ValidationProvider rules="integer" v-slot="{ errors }">
                                        <input v-model="form.vacancies" class="input-line">
                                        <span class="form-error">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                <div class="col-lg-4 mb-25">
                                    <label class="label-line">Corretor/Corretora</label>
                                    <input v-model="form.broker" class="input-line">
                                </div>
                            </template>
                        </div>
                            
                        <div class="row">
                            <!-- <div class="col-lg-2 mb-25">
                                <label class="label-line">Número</label>
                                <ValidationProvider rules="required|integer" v-slot="{ errors }">
                                    <input v-model="form.number" class="input-line">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div> -->
                            <div class="col-lg-2 mb-25">
                                <label class="label-line">Cep</label>
                                <ValidationProvider rules="integer" v-slot="{ errors }">
                                    <input v-model="form.cep" class="input-line" @keyup="searchCep()">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                            <div class="col-lg-2 mb-25 cep-link">
                                <a class="float-left" href="http://www.buscacep.correios.com.br/sistemas/buscacep/" target="_blank">
                                    <u>Não sei meu CEP</u>
                                </a>
                            </div>
                            <div class="col-lg-5 mb-25">
                                <label class="label-line">Rua</label>
                                <input v-model="form.street" class="input-line">
                            </div>
                            <div class="col-lg-3 mb-25">
                                <label class="label-line">Cidade (Obrigatório)</label>
                                <ValidationProvider rules="required" v-slot="{ errors }">
                                    <input v-model="form.city" class="input-line">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-4 mb-25">
                                <label class="label-line">Bairro (Obrigatório)</label>
                                <ValidationProvider rules="required" v-slot="{ errors }">
                                    <input v-model="form.district" class="input-line">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider> 
                            </div>
                            <div class="col-lg-2 mb-25">
                                <label class="label-line">UF (Obrigatório)</label>
                                <ValidationProvider rules="required" v-slot="{ errors }">
                                    <input v-model="form.state" class="input-line">
                                    <span class="form-error">{{ errors[0] }}</span>
                                </ValidationProvider>  
                            </div>
                            <div class="col-lg-6 mb-25">
                                <label class="label-line">Complemento</label>
                                <input v-model="form.complement" class="input-line">    
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12 mb-25">
                                <label class="label-line">Descrição</label>
                                <textarea rows="10" style="border: 1px solid #9e9e9e" v-model="form.description" class="form-control"></textarea>
                            </div>
                        </div>

                        <br>
                        <button type="submit" class="btn-general blue float-left">Salvar</button>
                        <br>
                        <br>
                        
                    </form>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { getHeaderFile, logout, getHeader, apiDomain, apiUrl } from './config'
import {Money} from 'v-money'
import MaskedInput from 'vue-masked-input'

export default {
    name: 'CadastrarImovel',
    components: {
        MaskedInput,
        'vuedropzone': vue2Dropzone,
        ValidationObserver,
        ValidationProvider,
        money: Money
    },
    data: () => ({
        dropzoneOptions: {
            maxFiles: 10,
            url: apiUrl + 'upload-file',
            clickable: true,
            params: {
                place_id: null
            },
            headers: getHeaderFile(),
            addRemoveLinks: true,
            methods: 'post',
            acceptedFiles: '.png, .jpg',
            autoProcessQueue: true,
            dictDefaultMessage: 'Clique aqui ou Arraste para Adicionar as Imagens',
            dictRemoveFile: 'Remover',
            dictMaxFilesExceeded: 'Máximo de 10 imagens'
        },
        money: {
          decimal: ',',
          thousands: '.',
          prefix: '',
          suffix: '',
          precision: 2,
          masked: false
        },
        form: {
            id: null,
            userId: null,
            imagePath: null,
            active: null,
            intent: 'rent',
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
            value: 0,
            rent_value: 0,
            sale_value: 0,
            condominium_value: 0,
            iptu: 0,
            broker: null,
            description: null
        }
    }),
    methods: {
        addStorageFile: function (files) {
            for (let file of files) {
                if (file) {
                    this.mockFiles = null
                    this.mockFiles = { name: file.name, size: 12345, id: file.id }
                    if (this.$refs.myVueDropzone) {
                        this.$refs.myVueDropzone.manuallyAddFile(this.mockFiles, apiDomain + file.path)
                    }
                }
            }
        },
        searchCep () {
            if (this.form.cep && this.form.cep.length === 8) {
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
        changeIntent () {
            this.form.value = this.form.intent === 'rent' ? this.form.rent_value : this.form.sale_value
        },
        addedDropZoneProfileFile: function (file, response) {
            file.id = response.id
            this.getPlace(response.place_id)
        },
        validateForm () {
            if (this.form.value === 0) {
                let message = this.form.intent === 'rent' ? 'Deve ser inserido o valor do aluguel' : 'Deve ser inserido o valor de venda'
                this.$store.dispatch('getAlertDanger', message)
                return false
            }
            if (this.form.intent === 'rent') {
                this.form.rent_value = this.form.value
            } else {
                this.form.sale_value = this.form.value
            }
            this.form.phone = this.form.phone ? this.form.phone.replace(/[^\d]+/g,'') : null
            if (!this.form.phone || this.form.phone.length < 10) {
                this.$store.dispatch('getAlertDanger', 'Deve ser inserido um contato válido')
                return false
            }
            return true
        },
        formSubmit () {
            if (!this.validateForm()) {
                return false
            }
            this.form.userId = window.localStorage.getItem('userId')
            let action = this.$route.params.id ? 'place-edit' : 'place-create'
            this.form.id = this.$route.params.id ? this.$route.params.id : null
            this.$store.dispatch('getSpinner', true)
            this.$http.post(apiUrl + action, this.form, {headers: getHeader()}).then(response => {
                if (!this.$route.params.id) {
                    this.dropzoneOptions.params.place_id = response.body.id
                    this.$router.push('editar-imovel/' + response.body.id)
                    this.$store.dispatch('getAlertSuccess', 'Local Cadastrado com Sucesso')
                    window.scrollTo(0, 0)
                    this.getPlace(response.body.id)
                } else {
                    this.$store.dispatch('getAlertSuccess', 'Local Editado com Sucesso')
                    this.getPlace(response.body.id)
                }
            }, error => {
                if (error.status === 401) {
                    this.$store.dispatch('getUser', null)
                    logout()
                }
            })
        },
        getPlace (placeId) {
            this.$http.post(apiUrl + 'get-place', {place_id: placeId}).then(response => {                
                this.form = response.body
                this.form.id = response.body.place_id
                this.form.value = response.body.intent === 'rent' ? response.body.rent_value : response.body.sale_value
                this.$store.dispatch('getSpinner', false)
            })
        },
        removedDropZoneProfileFile: function (file) {
            this.$http.post(apiUrl + 'remove-file', {file_id: file.id}, {headers: getHeaderFile()}).then(response => {
                this.getPlace(response.body.id)
            })
        },
        getUser () {
            let userId = window.localStorage.getItem('userId')
            if (userId) {
                this.$http.post(apiUrl + 'get-user', {user_id: userId}, {headers: getHeader()}).then(response => {
                    this.$store.dispatch('getUser', response.body)
                    if (this.$route.params.id) {
                        this.getPlaceId()
                    } else {
                        this.$store.dispatch('getSpinner', false)
                    }
                }, error => {
                    if (error.status === 401) {
                        this.$store.dispatch('getUser', null)
                        logout()
                    }
                })
            } else {
                this.$store.dispatch('getUser', null)
                logout()
            }
        },
        getPlaceId () {
            this.dropzoneOptions.params.place_id = this.$route.params.id
            this.$http.post(apiUrl + 'get-place-images', {place_id: this.$route.params.id}, {headers: getHeader()})
            .then(response => {
                this.addStorageFile(response.body)
                this.getPlace(this.$route.params.id)
            }, error => {
                if (error.status === 401) {
                    this.$store.dispatch('getUser', null)
                    logout()
                }
            })
        }
    },
    created () {
        this.$store.dispatch('getSpinner', true)
        this.getUser()
    }
}


import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, integer} from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'Preenchimento obrigatório'
});

extend('integer', {
    ...integer,
    message: 'Deve ser um número'
});


</script>

<style scoped>
</style>
