import { createApp } from 'vue'
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

const app = createApp(App)
//element-plus
app.use(ElementPlus)
//路由
app.use(router)
// pinia
app.use(createPinia())
// svg图标
app.component(SvgIcon)


app.mount('#app')
