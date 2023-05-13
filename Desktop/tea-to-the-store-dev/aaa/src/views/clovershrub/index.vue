<template>
    <div>
        <teaCom :imageList="imageList"></teaCom>
    </div>
</template>

<script setup>
import {ref} from "vue"
const imageList=ref([
"https://imgcon.tea7.com/6363865086046441694910085.jpg",
"https://imgcon.tea7.com/6363865086055818163938269.jpg",
"https://imgcon.tea7.com/6363865086313631445626129.jpg",
"https://imgcon.tea7.com/6363865086073004739925710.jpg",
"https://imgcon.tea7.com/6363865086098004834468753.jpg",
"https://imgcon.tea7.com/6363865086108942809267692.jpg",
"https://imgcon.tea7.com/6363865086124566984782551.jpg"
])
</script>

<style lang="scss" scoped>

</style>