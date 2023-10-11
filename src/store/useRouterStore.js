import { defineStore } from "pinia";
import { ref } from "vue";
export const useRouterStore = defineStore("router", () => {
  // 开始值是false
  const isGetterRouter = ref(false)
  // 后面改变什么值就是什么值
  function changeRouter(value) {
    isGetterRouter.value = value
  }
  return {
    isGetterRouter,
    changeRouter
  }
})