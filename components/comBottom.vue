<script lang="ts" setup>
import { reactive } from "vue";
import { useAuthStore } from '~/stores/auth';
  
const { $bootstrap, $common } = useNuxtApp();
const store = useAuthStore();

const state = reactive({
  message: ""
});
  
var times = store.vTimesQuest * 1000;
const counterRef = ref(null);
let counterRR;
onMounted(() => {
  counterRR = counterRef.value;
  counterRR.innerHTML = "";
});

var _t1: number;
watch(
  () => store.evtOnCorrect,
  (newValue, oldValue) => {
    
    if(store.evtOnCorrect == true)
    {
      store.vRemainQuest = 0;  
      store.vTimesQuest = 0;
      counterRR.innerHTML = '00:00';
      clearInterval(_t1);
    }
  },
  { deep: true }
);

watch(
  () => store.vTimesQuest,
  (newValue, oldValue) => {
    if(newValue > 0 && oldValue == 0)
    {
      times = store.vTimesQuest * 1000;
      if(times > 60 * 1000)
        counterRR.innerHTML = new Date(times).toISOString().slice(11, 19);
      else
        counterRR.innerHTML = new Date(times).toISOString().slice(14, 19);
      _t1 = setInterval(function() { 
        times = times-1000;
        if(times > 60 * 1000)
          counterRR.innerHTML = new Date(times).toISOString().slice(11, 19);
        else
          counterRR.innerHTML = new Date(times).toISOString().slice(14, 19);
          
        store.vRemainQuest = times / 1000;  
        if(times == 0)
        {
          store.vTimesQuest = 0;
          clearInterval(_t1);
        }
      }, 1200);
    }
  },
  { deep: true }
);


async function pass()
{
  console.log('pass');
  store.evtOnPass = true;
}

async function prev()
{
  for(var i = 0; i < store.vArrQuest.length; i++)
  {
    if(store.vArrQuest[i].id === (store.vIdx2 === -1 ? store.vIdx : store.vIdx2))
    {
      if(i === 0)
        return;
      store.vIdx2 = store.vArrQuest[i-1].id;
    }
  }
}

async function next()
{
  for(var i = 0; i < store.vArrQuest.length; i++)
  {
    if(store.vArrQuest[i].id === store.vIdx)
    {
      if(i === store.vArrQuest.length - 1)
        return;
      store.vIdx2 = (store.vArrQuest[i+1].id === store.vIdx) ? store.vArrQuest[i+1].id : -1;
      return;
    }
  }
}
</script>

<template>
  <nav class="navbar fixed-bottom navbar-light bg-primary">
    <div class="container-fluid">
      <a class="inline-block text-start">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hourglass" viewBox="0 0 16 16">
          <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5m2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702c0 .7-.478 1.235-1.011 1.491A3.5 3.5 0 0 0 4.5 13v1h7v-1a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351v-.702c0-.7.478-1.235 1.011-1.491A3.5 3.5 0 0 0 11.5 3V2z"/>
        </svg>
        <p class="inline-block fs-5" ref="counterRef"></p>
      </a>
      <div class="position-absolute end-15 btn btn-info" v-show="store.showprevbtn" @click="prev">上一題</div>
      <div class="position-absolute end-10 btn btn-info" v-show="store.shownextbtn" @click="next">下一題</div>
      <div class="position-absolute end-5 btn btn-info" v-show="!store.shownextbtn" @click="pass">看答案</div>
    </div>
  </nav>
</template>

<style scoped>
  svg 
   {
    width: 22px;
    height: 22px;
    margin-top: -6px;
  }
  .inline-block
  {
    display: inline-block;
    margin: 0;
  }
  .end-5
  {
    right: 5px;
    color: white;
  }
  .end-10
  {
    right: 72px;
    color: white;
  }
  .end-15
  {
    right: 142px;
    color: white;
  }
  .btn-info
  {
    padding: 3px 5px;
    font-size: 14px;
  }
</style>
