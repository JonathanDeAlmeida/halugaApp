<template>
    <div class="pagination-center">
        <nav v-if="source.total > 0">
            <ul class="pagination">
                <li class="page-item" v-if="source.current_page !== 1">
                    <a style="padding: 8px 10px 8px 14px" @click.prevent="nextPrev(source.current_page - 1)" class="page-link" href="">
                        <span style="font-size: 15px; font-weight: 900" class="material-icons">arrow_back_ios</span>
                    </a>
                </li>
                <li v-for="page in source.last_page" :key="page" :class="source.current_page === page ? 'active' : ''" class="page-item">
                    <a v-if="page > source.current_page - 2 && page < source.current_page + 2" @click.prevent="navigate(page)" class="page-link" href="">{{page}}</a>
                </li>
                <li class="page-item" v-if="source.current_page !== source.last_page">
                    <a @click.prevent="nextPrev(source.current_page + 1)" class="page-link" href="">
                        <span style="font-size: 15px; font-weight: 900" class="material-icons">arrow_forward_ios</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import 'material-icons/iconfont/material-icons.css'
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
