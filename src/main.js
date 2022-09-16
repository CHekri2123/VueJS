import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import SearchComponent from './components/SearchComponent.vue'
Vue.config.productionTip = false
Vue.component('SearchComponent', SearchComponent)

Vue.directive('addCommas', {
  componentUpdated(el, binding,vnode) {
    console.log(binding.value)
    binding.value = binding.value.replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    console.log(binding.value)
    vnode.context.salary = binding.value
  }
}),
  new Vue({
    vuetify,
    render: h => h(App),

  }).$mount('#app')
