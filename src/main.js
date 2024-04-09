import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/css/global.css'
import '@/assets/less/lessDefine.less'
import 'virtual:svg-icons-register'
import SvgIcon from "@/components/svg/SvgIcon.vue";

const app = createApp(App)
app.use(ElementPlus)
app.use(SvgIcon)

app.mount('#app')
