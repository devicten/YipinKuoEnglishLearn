<script lang="ts" setup>
import { reactive } from "vue";
  
import $ from 'jquery'
const { $bootstrap, $common, $qtls } = useNuxtApp();
  
import { useAuthStore } from '~/stores/auth';

  // a store info keep from server session.
const store = useAuthStore();

  // for ui text change.
const state = reactive({
  quest: "",
  questdesc: "",
  info: "",
  infodesc: "",
  answer: "",
  word: "",
  score: 0,
  message: ""
});
  
const toastRef = ref(null);
const questRef = ref(null);
const inputRef = ref(null);
  
let toastRR, questRR, inputRR;

onMounted(() => {
  toastRR = $bootstrap.toast(toastRef.value);
  questRR = questRef.value;
  inputRR = inputRef.value;
  setTimeout(Quest, 1500);
});
  
onBeforeUnmount(() => {
  toastRR.dispose();
});

async function Quest()
{
  var isError = false;
  try
  {
    var resp = await $common.apiAsync<any>('POST', {},'/api/quest');
    if(typeof(resp.result) === 'undefined')
    {
      resp = await $common.apiAsync<any>('POST', {},'/api/quest');
    }
    // 將題目更新上 Session
    await $common.doRetryAsync(() => { store.setQuest(resp.result); } , 5, 1000);
    // 取得尚未回答最新一題
    var q0 = $qtls.getFirstUnanswerQuest(resp.result.answer);
    // 如果有紀錄依據紀錄為準
    store.vIdx = (store.vIdx2 == -1) ? q0.idx : store.vIdx2;

    store.vArrQuest = resp.result.quest;
    store.showprevbtn = store.vIdx > 1;
    store.shownextbtn = store.vIdx2 != -1 && store.vIdx < resp.result.answer.length - 1;

    const currentQuest = resp.result.quest.find((obj) => obj.id === store.vIdx);
    const currentAnswer = resp.result.answer.find((obj) => obj.idx === store.vIdx);
    if (currentQuest && currentAnswer) {
      const { answer, sentence, info0, info1, info2, info3, info4, info5 } = currentQuest;
      Object.assign(state, {
        word: answer,
        quest: sentence,
        info0,
        info1,
        info2,
        info3,
        info4,
        info5,
        score: currentAnswer.score
      });
    }
    
    $qtls.clearUIQuest();
        
    $qtls.genUIQuest(
      state.quest,
      state.word,
      (store.vIdx2 === -1),
      state.score,
      questRR,
      inputRR
    );
  }
  catch(e)
  {
    console.log(e);
    state.message = e.message;
    toastRR.show();
  }
}

async function onkeyup(e)
{
  inputRR.value = '';
  var wbackref = document.getElementById('wbackref');

  if ($qtls.backspaceUIInput(e, inputRR, (newText) => {
    state.answer = newText;
  })) return;
    
  if ($qtls.enterUIInput(
    e, 
    inputRR, 
    state.word,
    state.answer,
    (newScroe) => {
      if (newScroe < 100) return;
      if(store.vRemainQuest <= 0)
        newScroe -= 20;
      if((store.vRemainQuest / store.vTimesQuest) >= 0.5)
        newScroe += 20;
      state.score = newScroe;
      store.evtOnCorrect = true;
    }
  )) return;

  $qtls.typingUIInput(e, inputRR, (newText) => {
    state.answer = newText;
  });
  return;
}

watch(
  () => store.vIdx2,
  (newValue, oldValue) => {
    Quest();
  },
  { deep: true }
);

watch(
  () => store.evtOnCorrect,
  (newValue, oldValue) => {
    if(store.evtOnCorrect == true)
    {
       $common.apiAsync<any>(
         'PUT', 
         {
           idx: store.vIdx,
           score: state.score
         },
         '/api/quest');

      $qtls.endUIQuest(0, inputRR);
    }
  },
  { deep: true }
);
  

watch(
  () => store.evtOnPass,
  (newValue, oldValue) => {
    if(store.evtOnPass == true)
    {
       $common.apiAsync<any>(
         'PUT', 
         {
           idx: store.vIdx,
           score: 0
         },
         '/api/quest');

      $qtls.endUIQuest(0, inputRR);
    }
  },
  { deep: true }
);
watch(
  () => store.vTimesQuest,
  (newValue, oldValue) => {
    console.log(newValue, oldValue);
    if(store.vTimesQuest == 0)
    {
       /*
       時間到暫時沒有推送0分紀錄
       const response = await $common.apiAsync<any>(
         'PUT', 
         {
           idx: store.vIdx,
           score: 0
         },
         '/api/quest');
      */
      $qtls.endUIQuest(0, inputRR);
    }
  },
  { deep: true }
);


</script>

<template>
  
<div class="box-1">
  <div id="RespToast" ref="toastRef" class="toast align-items-center text-bg-danger border-0 mb-4" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body"> {{ state.message }} </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
  <div class="text-title text-center">新單字 - {{ store.vIdx }} - {{ state.score }} </div>
  <div class="quest" id="questRefId" ref="questRef"><input ref="inputRef" type="text" class="w-input" @keyup="onkeyup" /></div>
  <div class="text-desc text-first"> {{ state.info0 }} </div>
</div>
<div class="box-1">
  <div class="text-title2 text-first"> {{ state.info1 }} </div>
  <div class="text-desc text-first"> {{ state.info2 }} </div>
</div>

</template>

<style scoped>
  .text-title
  {
    color: #D49B5E;
    font-size: 12px;
  }
  .text-title2
  {
    font-size: 18px;
  }
  .text-desc
  {
    margin: 5px 0;
    font-size: 14px;
  }
  .quest
  {
    font-size: 24px;
  }
  .inline
  {
    display: inline;
    font-size: 10px;
  }
  .w-correct {
    color: #75b798 !important;
  }
  .w-wrong {
    color: #ea868f !important;
  }
</style>
