<template>
    <div class="box">
        <img v-for="img in imageList" v-lazy="img" />
    </div>
</template>

<script setup>
const {imageList} = defineProps(['imageList'])
</script>

<style lang="scss" scoped>
.box {
    margin-top: 84px;
    margin-bottom: 50px;
    img{
        width: 100%;
    }
}
</style>