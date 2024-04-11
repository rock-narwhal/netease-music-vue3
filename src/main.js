import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/css/global.css'
import '@/assets/less/lessDefine.less'
import 'virtual:svg-icons-register'
import SvgIcon from "@/components/svg/SvgIcon.vue";
import router from "@/router/index.js";
import {createPinia} from 'pinia'
import '@/assets/iconfont/iconfont.css'
import '@/assets/less/element.less'
import '@/assets/less/commons.less'
import LazyLoad from 'vue3-lazyload'
import loadingGif from '@/assets/img/loading.gif'
import errorGif from '@/assets/img/error.jpg'

const app = createApp(App)
//element-plus
app.use(ElementPlus)
//路由
app.use(router)
// pinia
app.use(createPinia())
//懒加载
app.use(LazyLoad, {
    loading: loadingGif,
    error: errorGif
})
// svg图标
app.component(SvgIcon)


app.mount('#app')
