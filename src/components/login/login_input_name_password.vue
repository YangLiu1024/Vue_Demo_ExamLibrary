<template>
    <div class="container">
        <Tabs value="QRCode">
            <TabPane label="Scan QRCode" name="QRCode" style="text-align: center;">
                <div style="margin: 20px 0 10px 0;">
                    <img src="./asserts/qrcode.png" alt="" height="200px" width="200px">
                </div>
                <div style="margin: 10px 0;">
                    <span>Sign in with QR Code</span>
                </div>
            </TabPane>
            <TabPane label="Input Account" name="Account" style="margin-top: 10px;">
                <div class="input-box"><Input v-model="userInfo.username" placeholder="Email/QQ/Phone Number"><Icon type="person" slot="prepend" size="big"></Icon></Input></div>
                <div class="input-box"><Input v-model="userInfo.password" type="password" placeholder="Password"><Icon type="locked" slot="prepend" size="big"></Icon></Input></div>
                <div class="input-box" style="text-align: right;"><Button type="text">Forget Password?</Button></div>
                <div class="input-box"><Button type="success" @click.native="handleLogin" :disabled="prepared" long>Login</Button></div>
            </TabPane>
        </Tabs>
    </div>
</template>

<style lang="" scoped>
    .container {
        background-color: rgba(73, 80, 96, 0.5);
    }
    .input-box {
        display: box;
        padding: 10px 40px 5px 40px;
    }
</style>

<script>
export default {
    data() {
        return {
            userInfo: {
                username: '',
                password: ''
            }
        }
    },
    computed: {
        prepared() {
            let name = !this.userInfo.username;
            let pass = !this.userInfo.password;
            return (name || pass);
        }
    },
    methods: {
        handleLogin() {
            if (!this.userInfo.username || !this.userInfo.password) {
                this.$Message.error('please fill in your account')
                return;
            }
            console.log('connect server to auth')
            this.axios.post('http://localhost:3000/login', {
                username: this.userInfo.username,
                password: this.userInfo.password
            })
            .then(res => {
                console.log(res.status);
                if (res.status !== 200) {
                    this.$Message.error(res.data)
                    return;
                }
                console.log('login success')
                // save user info to window sessionStorage in case user refresh browser and vuex is cleaned
                window.window.sessionStorage.user = JSON.stringify(this.userInfo);
                this.$store.dispatch('setUserInfo', {username: this.userInfo.username, password: this.userInfo.password});
                //decodeURIComponent decode the encode uri
                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                this.$router.push({
                    path: redirect
                })
            })
            .catch(res => {
                console.log('login error')
                console.log(res)
                this.$Message.error(res.responseText)
            })

        }
    }
}
</script>