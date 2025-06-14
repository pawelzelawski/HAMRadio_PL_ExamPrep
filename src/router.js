import { createRouter, createWebHistory } from 'vue-router'

// Lazy-load pages
const Home = () => import('./pages/Home.vue')
const Knowledge = () => import('./pages/Knowledge.vue')
const Flashcards = () => import('./pages/Flashcards.vue')
const Quiz = () => import('./pages/Quiz.vue')
const Nauka = () => import('./pages/Nauka.vue')

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/knowledge', name: 'Knowledge', component: Knowledge },
    { path: '/flashcards', name: 'Flashcards', component: Flashcards },
    { path: '/quiz', name: 'Quiz', component: Quiz },
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
