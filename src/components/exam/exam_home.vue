<template>
    <div>
        <category @changeexamcategory="changeExamCategory"></category>
        <exam-filter></exam-filter>
        <exam-list :loading="loading" :examList="examList"></exam-list>
    </div>
</template>

<style lang="" scoped>
    
</style>

<script>
    import category from './exam_category.vue'
    import examFilter from './exam_filter.vue'
    import examList from './exam_list.vue'

    export default {
        data() {
            return {
                loading: false,
                examList: []
            }
        },
        components: {
            category,
            examFilter,
            examList
        },
        methods: {
            changeExamCategory(category) {
                console.log('change exam category' + category);
            },
            loadExamList() {
                console.log('start to load exam list');
                this.loading = true;
                this.axios.get('http://localhost:3000/exam')
                    .then(res => {
                        console.log('load data successfully');
                        console.log('show loading for extra two seconds')
                        setTimeout(() => {
                            this.loading = false;
                            this.examList = res.data.examlist;
                        }, 2000)
                    }).catch(err => {
                        console.log(err)
                    })
            }
        },
        mounted() {
            this.loadExamList();
        }
    }
</script>