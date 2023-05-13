<template>
    <div>
        <teaCom :imageList="imageList"></teaCom>
    </div>
</template>

<script setup>
import {ref} from "vue"
const imageList=ref([
"https://imgcon.tea7.com/6363866136034449224652872.jpg",
"https://imgcon.tea7.com/6363866136100076092051927.jpg",
"https://imgcon.tea7.com/6363866136071951343838307.jpg",
"https://imgcon.tea7.com/6363866136196952134123092.jpg",
"https://imgcon.tea7.com/6363866136126638711738129.jpg",
"https://imgcon.tea7.com/6363866136278203251709116.jpg",
"https://imgcon.tea7.com/6368746276028076534833473.jpg",
"https://imgcon.tea7.com/6370070814368166325045876.jpg"
])
</script>

<style lang="scss" scoped>

</style>