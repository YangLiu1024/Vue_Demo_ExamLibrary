import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home.vue'
import Login from '@/components/login/login.vue'
import ExamHome from '@/components/exam/exam_home.vue'
import ExamItem from '@/components/exam/exam_item.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '/exam',
      component: ExamHome,
      meta : {requireAuth: true}
    },
    {
      path: '/exam/:id', 
      component: ExamItem,
      name: 'exam-item',
      meta : {requireAuth: true}
    }
  ]
})
