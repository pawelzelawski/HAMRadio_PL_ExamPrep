// Polish: Baza Pytań Egzaminacyjnych
import { createRouter, createWebHistory } from 'vue-router'

// Lazy-load pages
const Home = () => import('./pages/Home.vue')
const BazaPytan = () => import('./pages/BazaPytan.vue')
const Fiszki = () => import('./pages/Fiszki.vue')
const Test = () => import('./pages/Test.vue')
const Nauka = () => import('./pages/Nauka.vue')

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/baza-pytan', name: 'BazaPytan', component: BazaPytan },
    { path: '/fiszki', name: 'Fiszki', component: Fiszki },
    { path: '/test', name: 'Test', component: Test },
    {
        path: '/nauka',
        component: Nauka
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
