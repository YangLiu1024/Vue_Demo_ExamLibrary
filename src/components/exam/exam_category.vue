<template>
    <div>
        <div>
            <div style="margin: 10px 0 0 10px; text-align: left;">
                <Icon type="social-windows" size="20" color="#2b85e4"></Icon>
                <span style="margin-left: 5px;">Category -{{category}}</span>
            </div>
            <Row type="flex" align="middle" justify="start" style="margin: 10px 0 10px 10px;">
                <Col :span="3" v-for="item in categories" :key="item" style="margin-right: 10px;">
                    <a href="#"><Button @click="handleClick(item)" long>{{item}}</Button></a>
                </Col>
            </Row>
        </div>
    </div>
</template>

<style lang="" scoped>
    
</style>

<script>
    export default {
        data() {
            return {
                category: "All",
                categories: []
            }
        },
        methods: {
            handleClick(item) {
                this.category = item;
                this.$emit('changeexamcategory', item);
            }
        },
        mounted() {
            //load categories here
            console.log(this)
            this.axios.get('http://localhost:3000/exam/category')
                .then(res => {
                    console.log(res.data);
                    this.categories = res.data.categories;
                })
                .catch(err => {
                    console.log('error' + err)
                })
        }
    }
</script>