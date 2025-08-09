<script setup>
import { SetValue } from '@/Helpers/ChangeValue';
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
const new_place = ref(null);
const distance = ref(0);

const emits = defineEmits(['play']);
const activate = () => {
    resources.value = SetValue(resources.value, new_place.value);
    travel.value = true;
    const extend = (turn)=>{
        if(turn >= distance.value + 1){
            return {
                result: false,
                type: "changeplace",
                place: new_place.value.place,
                region: new_place.value.region,
                travel: false,
            };
        }else{
            return {
                result: true,
            };
        }
    }

    queue.value.push({ex: extend, turn: 0});
    
    emits('play');
}
const start = (rogue_place = null)=>{
    let rand = Math.floor(Math.random() * rogue_place.length);
    new_place.value = rogue_place[rand];
    distance.value = new_place.value.distance[place.value];
    
}

defineExpose({start});
</script>
<template>
    <v-card @click="activate" class="max-h-[400px] max-w-[300px] mx-1" style="height: 50vh; width: 25vw; background-color: snow; border: 1px solid skyblue">
        <v-card-title>{{new_place?.region}}</v-card-title>
        <v-card-subtitle>{{ new_place?.place }}</v-card-subtitle>
        <v-card-text class="text-center items-center flex h-full flex-col gap-5">
            <b class="text-2xl">{{ distance }} Turns</b>
            <div class="text-lg flex items-center flex-wrap justify-center">
                <div class="flex gap-1 flex-wrap" v-if="new_place">
                    <div v-for="def_place in Object.entries(new_place?.values)">
                        <img class="w-[25px] h-[25px]" :src="resources.find(e => e.name == def_place[0]).source"></img>
                        <div>{{ def_place[1] }}</div>
                    </div>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>