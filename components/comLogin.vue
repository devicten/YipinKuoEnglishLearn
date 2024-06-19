<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth';
import { reactive } from "vue";
const authStore = useAuthStore();
const { $bootstrap } = useNuxtApp();
const toastRef = ref(null);
let toastRR;

const state = reactive({
  account: "kevin",
  password: "1qaz@WSX3edc",
  autologin: false,
  message: ""
});

onMounted(() => {
  toastRR = $bootstrap.toast(toastRef.value);
});

onBeforeUnmount(() => {
  toastRR.dispose();
});

async function SignIn()
{
  var isError = false;
  var msg = 'account or password error.';
  if(/[a-zA-Z0-9]{3,10}$/.test(state.account) == false)
  {
    isError = true;
  }
  
  else if(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*-_]{8,}$/.test(state.password) == false)
  {
    isError = true;
  }
  else 
  {
    try
    {
      const response = await fetch('/api/login', {
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
        body: JSON.stringify(state), // body data type must match "Content-Type" header
      });
      const result = await response.json();
      if(result.code !== 200)
      {
        isError = true;
        msg = result.message;
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
  }
  
  if(isError === true)
  {
    state.message = msg;
    toastRR.show();
    return;
  }
}

async function ForgetPassword()
{
  authStore.showlogin = false;
  authStore.showforgetpassword = true;
  return false;
}

async function Register()
{
  authStore.showlogin = false;
  authStore.showregister = true;
  return false;
}
</script>
<template>
<div class="box">
  <div id="RespToast" ref="toastRef" class="toast align-items-center text-bg-danger border-0 mb-4" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body"> {{ state.message }} </div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
  <div class="form-outline mb-4 s-form-title">
    <h2>Kinglish</h2>
    <a class="btn-close m-auto" href="/"></a>
  </div>
  <div class="form-outline mb-4">
    <label class="form-label" for="txtAccount">Account</label>
    <input 
      type="text" 
      id="txtAccount" 
      class="form-control"
      v-model="state.account" />
  </div>

  <div class="form-outline mb-4">
    <label class="form-label" for="txtPassword">Password</label>
    <input 
      type="password" 
      id="txtPassword" 
      class="form-control"
      v-model="state.password"  />
  </div>

  <div class="row mb-4">
    <div class="col d-flex justify-content-center">
      <!-- Checkbox -->
      <div class="form-check">
        <input 
        type="checkbox" 
        id="ckbAutoLogin" 
        class="form-check-input" 
        v-model="state.autologin" />
        <label class="form-check-label" for="ckbAutoLogin"> Remember me </label>
      </div>
    </div>

    <!-- div class="col">
      <div class="btn btn-link" @click="ForgetPassword">Forgot password?</div>
    </div -->
  </div>

  <!-- Submit button -->
  <div class="btn btn-info mb-4 text-white" id="btnSignIn" @click="SignIn"> Sign in </div>


  <!-- Register buttons -->
  <div class="text-center">
    <p>Not a member? <div class="btn btn-link" @click="Register">Register</div></p>
    <p>or sign up with:</p>
    <button type="button" class="btn btn-link btn-floating mx-1">
      <font-awesome-icon :icon="['fab', 'facebook']" />
    </button>

    <button type="button" class="btn btn-link btn-floating mx-1">
      <font-awesome-icon :icon="['fab', 'google']" />
    </button>

    <button type="button" class="btn btn-link btn-floating mx-1">
      <font-awesome-icon :icon="['fab', 'x-twitter']" />
    </button>

    <button type="button" class="btn btn-link btn-floating mx-1">
      <font-awesome-icon :icon="['fab', 'github']" />
    </button>
  </div>
</div>
</template>
<style scoped>
  #btnSignIn
  {
    width: 100%;
  }
  .btn-link, label
  {
    padding: 0;
    margin-top: -6px;
  }
  .btn-close
  {
    color: #FFF;
  }
  .RespToast
  {
    position: absolute;
    top: 30px;
  }
    .s-form-title > .btn-close 
    {
      float: right;
      margin-top: -45px !important;
      cursor: pointer;
    }
</style>
