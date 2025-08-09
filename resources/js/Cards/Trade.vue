<script setup>
import { ref } from 'vue';

const resources = defineModel("resources");
const coins = defineModel("coins");
const level = defineModel("level");
const queue = defineModel("queue");
const place = defineModel("place");
const region = defineModel("region");
const travel = defineModel("travel");
const value_1 = ref(0);
const value_2 = ref(0);
const trade_1 = ref(0);
const trade_2 = ref(0);

const emits = defineEmits(['100','All','play']);
const activate = () => {
    if(resources.value[trade_1.value].quantity >= value_1.value){
        resources.value[trade_1.value].quantity -= value_1.value;
        resources.value[trade_2.value].quantity += value_2.value;
    }
    emits('play');
}
const start = (place = null)=>{
    let value = 1 + (Math.random() * (10 * level.value));
    
    trade_1.value = Math.floor(Math.random() * resources.value.length);
    trade_2.value = Math.floor(Math.random() * resources.value.length);
    
    value_1.value = 1 + Math.floor(value / resources.value[trade_1.value].value);
    value_2.value = 1 + Math.floor(value / resources.value[trade_2.value].value);

}

defineExpose({start});
</script>
<template>
    <v-card @click="activate" class="max-h-[400px] max-w-[300px] mx-1" style="height: 50vh; width: 25vw; background-color: aliceblue;"
        :style="(resources[trade_1].quantity < value_1) ? 'border: 1px solid red' : 'border: 1px solid green'"
        :disabled="(resources[trade_1].quantity < value_1)"
    >
        <v-card-title>{{ region }}</v-card-title>
        <v-card-subtitle>{{ place }}</v-card-subtitle>
        <v-card-text class="text-center items-center flex h-full flex-col gap-5">
            <b class="text-2xl">Trade</b>
            <p class="text-lg flex items-center flex-wrap justify-center">
                Exchange
                <span class="flex items-center mx-2 gap-1">
                    <img :src="resources[trade_1].source" class="w-[50px] h-[50px]" />
                    {{value_1}}
                </span>
                
                to 
                
                <span class="flex items-center mx-2 gap-1">
                    <img :src="resources[trade_2].source" class="w-[50px] h-[50px]" />
                    {{value_2}}
                </span>
            </p>
        </v-card-text>
    </v-card>
</template>