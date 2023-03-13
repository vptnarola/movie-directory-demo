
import {createWebHistory, createRouter} from "vue-router";
import { createToaster } from "@meforma/vue-toaster";

// import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Movies from '../components/movies/Movies';
import EditMovie from '../components/movies/EditMovie';
import AddMovie from '../components/movies/AddMovie';

export const routes = [
    // {
    //     name: 'home',
    //     path: '/',
    //     component: Home
    // },
    {
        name: 'register',
        path: '/register',
        component: Register
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        component: Dashboard
    },
    {
        name: 'movies',
        path: '/movies',
        component: Movies
    },
    {
        name: 'addmovie',
        path: '/movies/store',
        component: AddMovie
    },
    {
        name: 'editmovie',
        path: '/movies/edit/:id',
        component: EditMovie
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});
const toaster = createToaster({ /* options */ });

export default router;
