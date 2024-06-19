<script lang="ts" setup>
import { reactive } from "vue";
  
import $ from 'jquery'
const { $bootstrap } = useNuxtApp();
  
import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();

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
  setTimeout(Quest, 500);
});
  
onBeforeUnmount(() => {
  toastRR.dispose();
});

async function Quest()
{
  var isError = false;
  try
  {
    const response = await fetch('/api/quest', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: '{}', // body data type must match "Content-Type" header
    });
    const result = await response.json();
    if(result.code !== 200)
    {
      isError = true;
      state.message = result.message;
      toastRR.show();
      return;
    }
    
    try {
      authStore.setQuest(result.result);
    } catch (error) {
      setTimeout(() => {
        try { authStore.setQuest(result.result); } catch { }
      }, 500);
    }
    
    var d0 = result.result.answer.filter((obj) => obj.status === 0); 
    var q0 = d0.reduce((previous, current) => {
      return current.idx < previous.idx ? current : previous;
    });
    authStore.vIdx = q0.idx;
    if(authStore.vIdx2 !== -1)
      authStore.vIdx = authStore.vIdx2;
    
    authStore.showprevbtn = authStore.vIdx > 1;
    authStore.shownextbtn = authStore.vIdx2 !== -1 && authStore.vIdx < result.result.answer.length;
    
    authStore.vArrQuest = result.result.quest;
    var qq0 = result.result.quest.filter((obj) => obj.id === authStore.vIdx)[0];
    var qa0 = result.result.answer.filter((obj) => obj.idx === authStore.vIdx)[0];
    state.word = qq0.answer;
    state.quest = qq0.quest;
    state.info0 = qq0.info0;
    state.info1 = qq0.info1;
    state.info2 = qq0.info2;
    state.info3 = qq0.info3;
    state.info4 = qq0.info4;
    state.info5 = qq0.info5;
    state.score = qa0.score;
    
    var arrw = $(".w");
    var questRefId = document.getElementById('questRefId');
    for(var k = 0; k < arrw.length; k++)
    {
      if(arrw[k].tagName === 'DIV')
        questRefId.removeChild(arrw[k]);
    }
    
        
    var html = '';
    var arrQuest = state.quest.split(' ');
    for(var i=0;i<arrQuest.length;i++)
    {
      if(arrQuest[i] === state.word)
      {
        if(authStore.vIdx2 === -1)
        {
          var wb = document.createElement('div');
          wb.textContent = "";
          wb.setAttribute('class','w w-back');
          wb.setAttribute('id','wbackref');
          questRR.appendChild(wb);
          var wbackref = document.getElementById('wbackref');
          inputRR.style = `left: ${wbackref.offsetLeft}px;top: ${wbackref.offsetTop}px;`;
        }
        else
        {
          var w = document.createElement('div');
          w.textContent = state.word;
          w.setAttribute('class','w');
          questRR.appendChild(w);
        }
      }
      else
      {
        var w = document.createElement('div');
        w.textContent = arrQuest[i];
        w.setAttribute('class','w');
        questRR.appendChild(w);
      }
    }
  }
  catch(e)
  {
    console.log(e);
    state.message = e.message;
    toastRR.show();
  }
}

  /*
async function onkeyup(e)
{
  inputRR.value = '';
  var wbackref = document.getElementById('wbackref');
  if(e.key === 'Backspace')
  {
    if(wbackref.innerText.length === 0)
      return;
    //wbackref.innerText += wbackref.innerText.substr(0,wbackref.innerText.length - 1);
    wbackref.removeChild(wbackref.lastChild);
    state.answer = wbackref.innerText;
    inputRR.style = `left: ${wbackref.offsetLeft + 0 + (wbackref.innerText.length * 25)}px;top: ${wbackref.offsetTop}px;`;
    return;
  }
  if(e.key === 'Enter')
  {
    var len = 0;
    for(var i=0;i < state.answer.length;i++)
    {
      if(state.word.length > state.answer.length)
        wbackref.children[i].classList.add("w-b");
      if(state.answer.length > state.word.length)
        wbackref.children[i].classList.add("w-a");
        
      if(state.word[i] != ToCDB(state.answer[i]))
      {
        wbackref.children[i].classList.add("w-b");
      }
      else
      {
        wbackref.children[i].classList.add("w-a");
        len++;
      }
      wbackref.children[i].innerText = state.word[i];
    }
    
    if(state.score === 100)
    {
      state.score = Math.ceil(len / state.answer.length * 100);
      setTimeout(function(){
        for(var i=0;i < state.answer.length;i++)
        {
          wbackref.children[i].classList.remove("w-a");
          wbackref.children[i].classList.remove("w-b");
          wbackref.children[i].innerText = state.answer[i];
        }
      }, 3000);
    }
    if(len !== state.answer.length)
      return;
    
    if(authStore.vRemainQuest <= 0)
      state.score -= 20;
    if((authStore.vRemainQuest / authStore.vTimesQuest) >= 0.5)
      state.score += 20;
    
     const response = await fetch('/api/quest', {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        idx: authStore.vIdx,
        score: state.score
      }), // body data type must match "Content-Type" header
    });
    const result = await response.json();
    if(result.code !== 200)
    {
      isError = true;
      state.message = result.message;
      toastRR.show();
      return;
    }
    location.reload();
    return;
  }
  if(  (e.keyCode >= 48 && e.keyCode <=  57) 
    || (e.keyCode >= 65 && e.keyCode <=  90) 
    || (e.keyCode >= 96 && e.keyCode <= 105) )
  {
    var wb0 = document.createElement('div');
    wb0.textContent = ToDBC(e.key);
    wb0.setAttribute('class','w0');
    wbackref.appendChild(wb0);
    state.answer = wbackref.innerText;
    inputRR.style = `left: ${wbackref.offsetLeft + 0 + (wbackref.innerText.length * 25)}px;top: ${wbackref.offsetTop}px;`;
    return;
  }
  return;
}

watch(
  () => authStore.vIdx2,
  (newValue, oldValue) => {
    
    Quest();
  },
  { deep: true }
);

function ToDBC(txtstring) { 
    var tmp = ""; 
    for(var i=0;i<txtstring.length;i++){ 
        if(txtstring.charCodeAt(i)==32){ 
            tmp= tmp+ String.fromCharCode(12288); 
        } 
        if(txtstring.charCodeAt(i)<127){ 
            tmp=tmp+String.fromCharCode(txtstring.charCodeAt(i)+65248); 
        } 
    } 
    return tmp; 
}

function ToCDB(str) { 
    var tmp = ""; 
    for(var i=0;i<str.length;i++){ 
        if (str.charCodeAt(i) == 12288){
            tmp += String.fromCharCode(str.charCodeAt(i)-12256);
            continue;
        }
        if(str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375){ 
            tmp += String.fromCharCode(str.charCodeAt(i)-65248); 
        } 
        else{ 
            tmp += String.fromCharCode(str.charCodeAt(i)); 
        } 
    } 
    return tmp 
} 

*/
</script>

<template>
  
<div class="box-1">
  <div id="RespToast" ref="toastRef" class="toast align-items-center text-bg-danger border-0 mb-4" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body"> {{ state.message }} </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
  <div class="text-title text-center">新單字 - {{ authStore.vIdx }} - {{ state.score }} </div>
  <div class="quest" id="questRefId" ref="questRef"><input ref="inputRef" type="text" class="w-input" /></div>
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
</style>
