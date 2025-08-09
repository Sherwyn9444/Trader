<script setup>
import { ref } from 'vue';

const chance = 100;

const resources = defineModel("resources");
const coins = defineModel("coins");
const queue = defineModel("queue");
const level = defineModel("level");
const place = defineModel("place");
const region = defineModel("region");
const value = ref(0);
const trade = ref(0);

const emits = defineEmits(['50','play']);
const activate = () => {
    resources.value[trade.value].quantity += value.value;
    emits('play');
}
const start = (place = null)=>{
    value.value = 1 + Math.floor(Math.random() * 6);
    trade.value = Math.floor(Math.random() * resources.value.length);
}

defineExpose({start});
</script>
<template>
    <v-card @click="activate" class="max-h-[400px] max-w-[300px] mx-1" style="height: 50vh; width: 25vw; background-color: aliceblue;">
        <v-card-title>Traveling</v-card-title>
        <v-card-subtitle>Action</v-card-subtitle>
        
        <v-card-text class="text-center items-center flex h-full flex-col gap-5">
            <b class="text-2xl">Windfall</b>
            <p class="text-lg">

                <span class="flex items-center mx-2 gap-1">
                    Gain
                    <img :src="resources[trade].source" class="w-[50px] h-[50px]" />
                    {{ value }}
                </span>
            </p>
        </v-card-text>
    </v-card>
</template>