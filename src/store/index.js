import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userInfo: {}
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo;
        }
    },
    mutations: {
        SET_USER_INFO(state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        setUserInfo({commit}, userInfo) {
            commit('SET_USER_INFO', userInfo);
        }
    }
});

export default store;