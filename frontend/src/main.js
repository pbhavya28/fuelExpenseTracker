// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';

axios.defaults.withCredentials = true;




createApp(App).use(router).mount('#app')

