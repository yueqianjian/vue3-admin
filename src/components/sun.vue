<template>
  <div>
    <p>sun</p>
    <p>{{name}}</p>
    <p>user{{user}}</p>
    <p>user2{{user2}}</p>
  </div>
</template>

<script>
export default {
  inject: ["name","user","user2"]
}
</script>
