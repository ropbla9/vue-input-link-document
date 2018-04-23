import index from './index.vue'

const install = (Vue) => {
  Vue.mixin({
    components: {
      inputLinkDocument: index
    }
  })
}

export default { install }