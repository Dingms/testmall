<template>
    <RouterView v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </RouterView>
</template>

<script setup>
import './components/filmIcon/iconfont'

</script>

<style lang="scss" scoped></style>