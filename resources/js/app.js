
import {createApp} from 'vue';

require('./bootstrap');


import App from './App.vue';
// import A11yDialog from 'vue-a11y-dialog'
import Toaster from "@meforma/vue-toaster";
import Vue3TagsInput from 'vue3-tags-input';
import Vue from 'vue';
// import VuejsDialog from 'vuejs-dialog';
// import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js';
// import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import axios from 'axios';

import router from './router';

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(router);
app.use(Vue3TagsInput);
app.use(Toaster);
// app.use(VuejsDialog);
// app.use(A11yDialog);
app.mount('#app');
