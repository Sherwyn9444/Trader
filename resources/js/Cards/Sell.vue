<script setup>
import { ref } from 'vue';

const resources = defineModel("resources");
const coins = defineModel("coins");
const level = defineModel("level");
const queue = defineModel("queue");
const place = defineModel("place");
const region = defineModel("region");
const travel = defineModel("travel");
const value = ref(0);
const cost = ref(0);
const res = ref(0);
const emits = defineEmits(['100','All','play']);
const activate = () => {
    if(resources.value[res.value].quantity >= value.value){
        resources.value[res.value].quantity -= value.value;
        coins.value += cost.value;
    }

    emits('play');
}
const start = (place = null)=>{
    value.value = 1 + Math.floor(Math.random() * (10 * level.value));
    res.value = Math.floor(Math.random() * resources.value.length);
    cost.value = value.value * resources.value[res.value].value;
}

defineExpose({start});
</script>
<template>
    <v-card @click="activate" class="max-h-[400px] max-w-[300px] mx-1" style="height: 50vh; width: 25vw; background-color: aliceblue;" 
        :style="(resources[res].quantity < value) ? 'border: 1px solid red' : 'border: 1px solid green'"
        :disabled="(resources[res].quantity < value)"
    >
        <v-card-title>{{ region }}</v-card-title>
        <v-card-subtitle>{{ place }}</v-card-subtitle>
        <v-card-text class="text-center items-center flex h-full flex-col gap-5">
            <b class="text-2xl">Sell</b>
            <p class="text-lg flex items-center flex-wrap justify-center">
                Exchange
                
                <span class="flex items-center mx-2 gap-1">
                    <img :src="resources[res].source" class="w-[50px] h-[50px]" />
                    {{ value }}
                </span>

                 to 

                <span class="flex items-center mx-2 gap-1">
                    <img src="/Images/coins.png" class="w-[50px] h-[50px]" />
                    {{ cost }}
                </span>
            </p>
        </v-card-text>
    </v-card>
</template>