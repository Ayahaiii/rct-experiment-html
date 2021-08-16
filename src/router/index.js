import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import index from '@/components/index'
import experimentList from '@/components/experimentList/experimentList'

//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: '',
    routes: [{
            path: '/rct/login',
            name: 'login',
            component: login
        },
        {
            path: '/rct/register',
            name: 'register',
            component: register
        },
        {
            path: '/',
            redirect: '/rct/login'
        },
        {
            path: '/rct',
            redirect: '/rct/login'
        },
        {
            path: '/rct/index',
            component: index
        },
        {
            path: '/rct/expersteps',
            name: 'expersteps',
            component: () =>
                import ( /* webpackChunkName: Interview */ '@/components/index/index'),
                redirect: '/rct/expersteps/intro',
                children: [
                    {
                        path: '/rct/expersteps/intro/:id',
                        name: 'experstepsIntro',
                        component: () =>
                            import ( /* webpackChunkName: ProjectInfo */ '@/components/experimentIntro/rctDetail'),
                    }, 
                    {
                        path: '/rct/expersteps/tools/:id',
                        name: 'experstepsTools',
                        component: () =>
                            import ( /* webpackChunkName: ProjectInfo */ '@/components/experimentPrepare/purposeTools'),
                    },
                    {
                        path: '/rct/expersteps/register/:id',
                        name: 'experstepsRegister',
                        component: () =>
                            import ( /* webpackChunkName: ProjectInfo */ '@/components/experimentPrepare/experimentRegister'),
                    },
                    {
                        path: '/rct/expersteps/select/:id',
                        name: 'experstepsSelect',
                        component: () =>
                            import ( /* webpackChunkName: ProjectInfo */ '@/components/samplesPrimary/sampleSelect'),
                    },
                    {
                        path: '/rct/expersteps/agree/:id',
                        name: 'experstepsAgree',
                        component: () =>
                            import ( /* webpackChunkName: ProjectInfo */ '@/components/samplesPrimary/agreeLine'),
                    },
                    {
                        path: '/rct/expersteps/randomgroup/:id',
                        name: 'experstepsRandomgroup',
                        component: () =>
                            import ( /* webpackChunkName: ProjectInfo */ '@/components/sampleGroup/randomGroup'),
                    },
                    {
                        path: '/rct/expersteps/groupresult/:id',
                        name: 'experstepsGroupresult',
                        component: () =>
                            import ( /* webpackChunkName: ProjectInfo */ '@/components/sampleGroup/groupResult'),
                    },
                    {
                        path: '/rct/expersteps/firstfollow/:id',
                        name: 'experstepsFirstfolloW',
                        component: () =>
                            import ( /* webpackChunkName: ProjectInfo */ '@/components/followUp/firstUp'),
                    },
                    {
                        path: '/rct/expersteps/secondfollow/:id',
                        name: 'experstepsSecondfollow',
                        component: () =>
                            import ( /* webpackChunkName: ProjectInfo */ '@/components/followUp/second'),
                    },
                    {
                        path: '/rct/expersteps/flowcharts/:id',
                        name: 'experstepsCharts',
                        component: () =>
                            import ( /* webpackChunkName: ProjectInfo */ '@/components/results/flowcharts'),
                    },
                    {
                        path: '/rct/expersteps/analysis/:id',
                        name: 'experstepsAnalysis',
                        component: () =>
                            import ( /* webpackChunkName: ProjectInfo */ '@/components/results/dataAnalysis'),
                    }, 
                    {
                        path: '/rct/expersteps/conclusion/:id',
                        name: 'experstepsConclusion',
                        component: () =>
                            import ( /* webpackChunkName: ProjectInfo */ '@/components/results/conclusion'),
                    },
                    {
                        path: '/rct/expersteps/progeny/:id',
                        name: 'experstepsProgeny',
                        component: () =>
                            import ( /* webpackChunkName: ProjectInfo */ '@/components/results/progeny'),
                    } 
                ]
        },
        
        {
            path: '/rct/experlist',
            name: 'experList',
            component: experimentList
        },
    ]
})