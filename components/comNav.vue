<script lang="ts" setup>
import { reactive } from "vue";
import { useAuthStore } from '~/stores/auth';
const { $bootstrap } = useNuxtApp();
const authStore = useAuthStore();

const collapseRef = ref(null);
let collapseRR;
onMounted(() => {
  collapseRR = $bootstrap.toast(collapseRef.value);
});

onBeforeUnmount(() => {
  collapseRR.dispose();
});

async function btnSignin_OnClick()
{
  collapseRR.hide();
  authStore.showslot = false;
  authStore.showlogin = true;
  return false;
}
async function btnSignout_OnClick()
{
  var isError = false;
  try
  {
    const response = await fetch('/api/logout', {
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
      body: JSON.stringify({}), // body data type must match "Content-Type" header
    });
    const result = await response.json();
    if(result.code !== 200)
    {
      isError = true;
    }
    else
    {
      location.reload();
    }
  }
  catch(e)
  {
    isError = true;
  }
  return false;
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <div class="container">
      <a class="navbar-brand" href="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
        </svg>
      </a>
      
      <div class="progress">
        <div class="progress-content"> {{ authStore.vCurrentQuest }} / {{ authStore.vTotalQuest }} </div>
        <div class="progress-bar bg-info" role="progressbar" :style="`
        width: ${(Math.ceil(authStore.vCurrentQuest/authStore.vTotalQuest*100))}%`" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"/>
        </svg>
      </button>
      <div class="collapse navbar-collapse" ref="collapseRef"  id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-show="authStore.IsLogin">
            <a class="nav-link" href="#"> Profile </a>
          </li>
          <li class="nav-item" v-show="!authStore.IsLogin">
            <a class="nav-link" @click="btnSignin_OnClick"> Sign in </a>
          </li>
          <li class="nav-item" v-show="authStore.IsLogin">                
            <a class="nav-link" @click="btnSignout_OnClick">Sign out</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
  svg 
  {
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
  .nav-item 
  {
    cursor: pointer;
  }
  .s-username 
  {
    width: 150px;
  }
  .progress
  {
    width: 235px;
    margin-right: 7px;
    margin-bottom: 0;
    margin-top: 3px;
    position: relative;
    margin-left: 7px;
  }
  .progress-content
  {
    position: absolute;
    display: block;
    text-align: center;
    width: 100%;
    top: -1px;
  }
  .navbar-toggler
  {
    margin: 0;
    padding: 0 9px;
    border: 0;
  }
  .navbar-brand {
    padding: 0 9px;
  }
</style>
