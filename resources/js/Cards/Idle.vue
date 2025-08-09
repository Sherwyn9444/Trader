<script setup>

const resources = defineModel("resources");
const coins = defineModel("coins");
const queue = defineModel("queue");
const level = defineModel("level");
const place = defineModel("place");
const region = defineModel("region");
const travel = defineModel("travel");
const emits = defineEmits(['play']);
const activate = () => {
    coins.value -= (1 + level.value);
    
    emits('play');
}
const start = (place = null)=>{
    
}

defineExpose({start});
</script>
<template>
    <v-card @click="activate" class="max-h-[400px] max-w-[300px] mx-1" style="height: 50vh; width: 25vw; background-color: aliceblue;">
        <v-card-title>Game</v-card-title>
        <v-card-subtitle>Transaction</v-card-subtitle>
        
        <v-card-text class="text-center items-center flex h-full flex-col gap-5">
            <b class="text-2xl">Idle</b>
            <p class="text-lg">Lose {{1 + level}} coin</p>
        </v-card-text>
    </v-card>
</template>