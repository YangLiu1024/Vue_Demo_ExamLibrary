<template>
    <div>
        <div class="logo-container">
            <img src="./asserts/text_logo.png" alt="">
        </div>
        <div class="button-group-container"> 
            <Row type="flex" align="middle" justify="center" :gutter="10">
                <Col :span="4"><Button type="primary" shape="circle" icon="ios-cloud-upload" long>Upload Exam</Button></Col>
                <Col :span="4"><Button type="primary" shape="circle" icon="edit" long @click.native="handleDoExam">Do Exam</Button></Col>
                <Col :span="4"><Button type="primary" shape="circle" icon="help" long>Ask Question</Button></Col>
            </Row>
        </div>
    </div>
</template>

<style lang="" scoped>
    .logo-container {
        margin-top: 100px;
    }
    .button-group-container {
        margin: 20px 0;
    }
</style>

<script>
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            handleDoExam() {
                this.$router.push('/exam');
            }
        }
    }
</script>