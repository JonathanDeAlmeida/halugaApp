<template>
    <div class="container">
        <div class="row float-left">
            <div class="col-lg-6 col-md-12">
                <v-date-picker v-model="date"/>
            </div>
            <div class="col-lg-6 col-md-12">
                <h4>{{moment(date).format('DD')}} de {{moment(date).format('MMMM')}} de {{moment(date).format('YYYY')}}</h4>
                <!--
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Primeiro</th>
                        <th scope="col">Último</th>
                        <th scope="col">Nickname</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
                -->
            </div>
        </div>
        <!--<button v-on:click="hey">ssssssss</button>-->
    </div>
</template>

<script>
export default {
    name: 'Gerenciar',
    data: () => ({
        selectedDate: null,
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
