<script setup>
import StartGame from '@/Cards/StartGame.vue';
import { Market } from '@/Resources/Market';
import { places } from '@/Resources/Places';
import { resources } from '@/Resources/Resource';
import { Head, Link } from '@inertiajs/vue3';
import { nextTick, onMounted, ref } from 'vue';
import * as cards from '@/Resources/Cards';
import * as actions from '@/Resources/Actions';
import roguelike from '@/Resources/Generate';
import { SetValue } from '@/Helpers/ChangeValue';

let max_crop = 99;

const resource = ref(resources(max_crop));
const coins = ref(0);
const level = ref(0);
const components = ref([]);
const map = ref({...places});
const region = ref("");
const place = ref("");
const rogue = ref(roguelike(max_crop));
const travel = ref(false);

const choices = ref([0,0,0]);
const action_choice = ref(0);
const idle = ref(null);

const action_1 = ref(null);
const component_1 = ref(null);
const component_2 = ref(null);
const component_3 = ref(null);
const component_4 = ref(null);
const component_idle = ref(null);
const queue = ref([]);
const turns = ref(0);

onMounted(()=>{
    region.value = rogue.value[0].region;   
    place.value = rogue.value[0].place;
    resource.value = SetValue(resource.value, rogue.value[0]);
});

const end_turn = async ()=>{
    if(turns.value == 0){
        cards.default.shift();
        idle.value = cards.default.shift();
    }
    
    turns.value += 1;

    await nextTick()

    let card_chances = [];
    cards.default.forEach((a, ind)=>{
        card_chances.push({chance: Number(a.emits[0]), region: a.emits[1], index: ind});
    });
    let available = card_chances.filter((cc) => (cc.region == region.value || cc.region == "All"));
    console.log(available);

    choices.value[0] = available[Math.floor(Math.random() * available.length)].index;
    choices.value[1] = available[Math.floor(Math.random() * available.length)].index;
    choices.value[2] = available[Math.floor(Math.random() * available.length)].index;
    choices.value[3] = available[Math.floor(Math.random() * available.length)].index;

    let action_chances = [];
    actions.default.forEach((a, ind)=>{
        action_chances.push({chance: Number(a.emits[0]), index: ind});
    });

    const totalChance = action_chances.reduce((sum, item) => sum + item.chance, 0);
    const action_rand = weightedRandom(action_chances, totalChance).index;
    
    action_choice.value = action_rand;
    // action_choice.value = Math.floor(Math.random() * actions.default.length);
    
    queue.value.forEach((q, ind)=>{
        q.turn += 1;
        let end = q.ex(q.turn);
        if(!end.result){
            switch(end.type){
                case "changeplace":
                    place.value = end.place;
                    region.value = end.region;
                    travel.value = end.travel;
                    break;
            }
            queue.value.splice(ind, 1);
        }else{

        }
    });

    
    await nextTick()
    if(travel.value){
        action_1.value.start(rogue.value);
    }else{
        component_1.value.start(rogue.value);
        component_2.value.start(rogue.value);
        component_3.value.start(rogue.value);
        component_4.value.start(rogue.value);
    }
}

function weightedRandom(items, totalChance) {
  const random = Math.random() * totalChance;
  
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    sum += items[i].chance;
    if (random < sum) {
      return items[i];
    }
  }
}
</script>

<template>
    <Head title="The Trader" />
    <div>
        <v-card>
            <v-card-text class="flex justify-between flex-wrap">
                <div v-for="res in resource" class="flex items-center gap-1">
                    <img class="w-[30px] h-[30px]" :src="res.source"></img>
                    <div>{{ res.quantity }}</div>
                </div>
            </v-card-text>
        </v-card>
        <div class="flex items-center gap-1">
            <img class="w-[50px] h-[50px]" src="/Images/coins.png"></img>
            <div>{{ coins }}</div>
        </div>
        <div class="flex w-full justify-center gap-2 text-lg pb-3">
            <b>{{ region }}</b> {{ place }}
        </div>
    </div>
    <div class="flex justify-center gap-5" v-if="!travel">
        <component :is="cards.default[choices[0]]" v-model:travel="travel" v-model:resources="resource" v-model:coins="coins" v-model:level="level" v-model:region="region" v-model:place="place" v-model:queue="queue" @play="end_turn" ref="component_1"/>
        <component :is="cards.default[choices[1]]" v-model:travel="travel" v-model:resources="resource" v-model:coins="coins" v-model:level="level" v-model:region="region" v-model:place="place" v-model:queue="queue" @play="end_turn" ref="component_2"/>
        <component :is="cards.default[choices[2]]" v-model:travel="travel" v-model:resources="resource" v-model:coins="coins" v-model:level="level" v-model:region="region" v-model:place="place" v-model:queue="queue" @play="end_turn" ref="component_3"/>
        <component :is="cards.default[choices[3]]" v-model:travel="travel" v-model:resources="resource" v-model:coins="coins" v-model:level="level" v-model:region="region" v-model:place="place" v-model:queue="queue" @play="end_turn" ref="component_4"/>
        <component :is="idle" v-model:travel="travel" v-model:resources="resource" v-model:coins="coins" v-model:level="level" v-model:region="region" v-model:place="place" v-model:queue="queue" @play="end_turn" ref="component_idle"/>
    </div>

    <div class="flex justify-center gap-5" v-else>
        <component :is="actions.default[action_choice]" v-model:travel="travel" v-model:resources="resource" v-model:coins="coins" v-model:level="level" v-model:region="region" v-model:place="place" v-model:queue="queue" @play="end_turn" ref="action_1"/>
    </div>

    <div style="position: absolute; left: 0; bottom: 0" class="w-[250px] h-[250px] m-1">
        <div class="text-lg pe-2 text-center pb-2"><b>Value Table </b></div>
        <div class="flex gap-1 flex-wrap">    
            <div v-for="res in resource">
                <img class="w-[25px] h-[25px]" :src="res.source"></img>
                <div>{{ res.value }}</div>
            </div>
        </div>
        
    </div>

    
</template>
