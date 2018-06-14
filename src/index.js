/**
 * Created by Administrator on 2018/6/1.
 */
import timelinepick from "./components/Utils/vue-timelinepick.js"


function install (_Vue) {
  _Vue.component("timelinepick", timelinepick)
}


if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
