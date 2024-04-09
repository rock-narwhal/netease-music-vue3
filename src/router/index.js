import {createRouter,createWebHashHistory} from 'vue-router';
import routes from "@/router/routes.js";

export default createRouter({
    history: createWebHashHistory(),
    routes,
})