/**
 * Created by Administrator on 2020/5/28 0028.
 */
import vue from  'vue'
import vuex from 'vuex'

const state={
    Uname:""
}

const getter={
    Uname(state){
        return state.Uname
    }
}

const actions={
    add(commit){
        commit('increment')
    }
}

const mutations={
    increment(state){

    }
}
vue.use(vue)

export default  new Vuex.Store({
    state,
    getters:{

    },
    actions:{

    },
    muataions:{

    }
})