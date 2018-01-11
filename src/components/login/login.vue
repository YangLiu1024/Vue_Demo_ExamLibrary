<template>
    <div class="login">
        <header><home-header/></header>
        <main>
            <Row type="flex" align="middle" justify="center" class="content">
                <Col :span="6" :offset="12"><login-control/></Col>
            </Row>
        </main>
        <footer><home-footer/></footer>
    </div>
</template>

<style lang="" scoped>
    .login {
        height: 100vh;
        display: flex;
        flex-direction: column;
        background-image: url('./asserts/color.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .content {
        margin: 120px 0;
    }
    footer {
        background-color: #e9eaec;
    }
    main {
        flex: 1;
    }
</style>

<script>
    import homeHeader from '../home/home_header.vue'
    import homeFooter from '../home/home_footer.vue'
    import loginControl from './login_input_name_password.vue'
    export default {
        data() {
            return {
                
            }
        },
        components: {
            homeHeader,
            homeFooter,
            loginControl
        }
    }
</script>