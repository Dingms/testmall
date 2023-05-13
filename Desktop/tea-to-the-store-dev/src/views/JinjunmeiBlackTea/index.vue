<template>
    <div>
        <teaCom :imageList="imageList"></teaCom>
    </div>
</template>

<script setup>
import {ref} from "vue"
const imageList=ref([
"https://imgcon.tea7.com/6363865267776174518533530.jpg",
"https://imgcon.tea7.com/6363865267901177738248745.jpg",
"https://imgcon.tea7.com/6363865267810550722104757.jpg",
"https://img.tea7.com/0094413_0.jpeg",
"https://imgcon.tea7.com/6363865267860551279190844.jpg",
"https://imgcon.tea7.com/6363865267907426689033592.jpg",
"https://imgcon.tea7.com/6363865267887113255206469.jpg"
])
</script>

<style lang="scss" scoped>

</style>