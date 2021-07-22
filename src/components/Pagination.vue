<template>
    <nav v-if="source.total > 0">
        <ul class="pagination">
            <li class="page-item">
                <a @click.prevent="nextPrev(source.current_page - 1)" class="page-link" href="">Voltar</a>
            </li>
            <li v-for="page in pages" :key="page" :class="source.current_page === page ? 'active' : ''" class="page-item">
                <a @click.prevent="navigate(page)" class="page-link" href="">{{page}}</a>
            </li>
            <li class="page-item">
                <a @click.prevent="nextPrev(source.current_page + 1)" class="page-link" href="">Avançar</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Pagination',
    props: ['source'],
    data: () => ({
        pages: []
    }),
    methods: {
        navigate (page) {      
            this.$emit('navigate', page)
        },
        nextPrev (page) {   
            if (page === 0 || page === this.source.last_page + 1) {
                return false
            } 
            this.navigate(page)
        }
    },
    watch: {
        source () {
            this.pages = []
            for (let count = 1; count <= this.source.last_page; count++) {
                this.pages.push(count)
            }
        }
    }
}

</script>

<style scoped>
</style>
