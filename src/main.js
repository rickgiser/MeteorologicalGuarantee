import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import iView from 'iview'
import mapboxgl from 'mapbox-gl'
import 'iview/dist/styles/iview.css';
import loadMap from '../src/assets/js/common'
import echarts from 'echarts';

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.use(iView)
Vue.use(loadMap)
Vue.use(echarts);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
