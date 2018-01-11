<template>
    <Row type="flex" align="middle" class-name="header">
        <Col :span="4">
        <img src="./asserts/exam_logo.png" alt="" height="40px">
        </Col>
        <Col :span="8" :offset="12">
        <Row type="flex" align="middle" justify="end">
            <Col :span="4">
                <a href=""><Button type="text" shape="circle" size="small" icon="ios-search">Contact us</Button></a>
            </Col>
            <Col :span="userLoginSpan">
                <template v-if="userInfo.username">
                    <Avatar  size="small" class="user">{{usernameAbbr}}</Avatar>
                </template>
                <template v-else>
                    <Button type="text" size="small" icon="log-in" @click="handleLogin">Login</Button>
                </template>
            </Col>
            <Col :span="4">
                <Select value="English" size="small" @on-change="onLanguageChange">
                    <Option value="SimpleChinese" label="简体中文">简体中文</Option>
                    <Option value="English" label="English">English</Option>
                </Select>
            </Col>
        </Row>
        </Col>
    </Row>
</template>

<style lang="" scoped>
.header {
    height: 60px;
}
.user {
    background-color: #87d068;
}
</style>

<script>
//import {mapState} from 'vuex'
import {getFirstCapitalizedLetter} from '../../utils/utils.js'
export default {
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        },
        userLoginSpan() {
            return this.userInfo.username ? 2 : 4;
        },
        usernameAbbr() {
            return getFirstCapitalizedLetter(this.userInfo.username)
        }
    },
    // //1. use Object as parameter for mapState
    // computed: mapState({
    //     //state is default parameter
    //     userInfo: state => state.userInfo,
    //     //or simpler, 'userInfo' represent the 'userInfo' prop in state, equal to this.$store.state.userInfo
    //     //userInfo: 'userInfo'
    // }),
    // //2. use Array as parameter for mapState
    // computed: mapState([
    //     //the pre-condition is that the name of computed property should be same with state property
    //     'userInfo'
    // ]),
    // computed: {
    //     //when there are computed which does not need map from state, could use ...mapState to split the computed property Array
    //     count() {
    //         return {...}
    //     },
    //     ...mapState({
    //         userInfo: 'userInfo'
    //     })
    // },
    methods: {
        onLanguageChange(currentLanguage) {
            console.log(currentLanguage)
            //this.$store.commit('changeLangugae', currentLanguage);
        },
        handleLogin() {
            this.$router.push('/login');
        }
    }
}
</script>