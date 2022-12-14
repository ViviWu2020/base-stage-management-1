import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'

Vue.use(Vuex)
 
export default new Vuex.Store({
    modules: {
        tab
      },

    state: {
      count: 0
    },
    mutations: {
      increment (state) {
        state.count++
      }
    }
  })
