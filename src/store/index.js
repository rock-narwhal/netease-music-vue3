import {createPinia} from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";

const pinia  = createPinia()
// 持久化
pinia.use(piniaPluginPersist)

export default pinia
