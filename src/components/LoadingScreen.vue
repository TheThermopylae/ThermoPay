<template>
  <div class="fixed h-full w-full bg-white flex justify-center items-center z-20">
    <LoadingDots class="w-20 h-20 text-green-500"></LoadingDots>
  </div>
</template>

<script>
import LoadingDots from "./LoadingDots.vue"

export default{
    components:{
        LoadingDots
    }
}
</script>