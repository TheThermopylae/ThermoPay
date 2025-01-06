import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router.js'

import { plugin as VueTippy } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'
import { setDefaultProps } from 'vue-tippy'

setDefaultProps({
  placement: 'top',
  arrow: false,
  animation: 'scale'
})

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import 'animate.css'

const app = createApp(App)
app.use(router)
app.use(VueTippy)
app.use(VueSweetalert2)
app.mount('#app')