<template>
    <div>
        <svg class="icon" :style="{ fill: color }" @click="clickHandle">
            <use :href="`#${icon}`"></use>
        </svg>
    </div>
</template>

<script setup>
    defineProps({
        icon:{
            type:String,
            default:"icon-dianying"
        },
        color:{
            type:String,
            default:"#ff5f16"
        }
    })
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
}
</style>