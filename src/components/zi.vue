<template>
  <div>
    <p>zi</p>
    <p>name {{name}}</p>
    <sun />
  </div>
</template>

<script>
import sun from "./sun.vue"
export default {
  components: {
    sun
  },
  inject: ["name"]

}
</script>
