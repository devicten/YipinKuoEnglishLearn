<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth';
import { reactive } from "vue";
const authStore = useAuthStore();
const { $bootstrap } = useNuxtApp();
const toastRef = ref(null);
let toastRR;
const state = reactive({
  account: "",
  password: "",
  password2: "",
  mail: "",
  name: "",
  phone: "",
  sex: 0,
  age: 18,
  region: "",
  message: ""
});

onMounted(() => {
  toastRR = $bootstrap.toast(toastRef.value);
});

onBeforeUnmount(() => {
  toastRR.dispose();
});
async function Send()
{
  var isError = false;
  var msg = 'account or password error.';
}
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const options = {
  mask: "A",
  tokens: {
    A: { pattern: /[A-Za-z0-9]@[A-Za-z0-9.]/ }
  },
  onMaska: (detail: MaskaDetail) => {
    detail.completed = validateEmail(detail.unmasked);
  }
}

</script>

<template>
<div class="box">
  <div id="RespToast" ref="toastRef" class="toast align-items-center text-bg-danger border-0 mb-4" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body"> {{ state.message }} </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
  <div class="form-outline mb-4 s-form-title">
    <h2>New Account</h2>
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
      v-model="state.password" />
  </div>
  <div class="form-outline mb-4">
    <label class="form-label" for="txtPassword2">Confirm Password</label>
    <input 
      type="password" 
      id="txtPassword2" 
      class="form-control"
      v-model="state.password2" />
  </div>
  <div class="form-outline mb-4">
    <label class="form-label" for="txtMail">Mail</label>
    <input 
      type="text" 
      id="txtMail" 
      class="form-control"
      v-maska:[options]
      v-model="state.mail"  />
  </div>
  <div class="form-outline mb-4">
    <label class="form-label" for="txtName">Name</label>
    <input 
      type="text" 
      id="txtName" 
      class="form-control"
      v-model="state.name"  />
  </div>
  <div class="form-outline mb-4">
    <label class="form-label" for="txtPhone">Phone</label>
    <input 
      type="text" 
      id="txtPhone" 
      class="form-control"
      v-maska data-maska="####-###-###"
      v-model="state.phone"  />
  </div>
  <div class="form-outline mb-4">
    <label class="form-label mr-15" for="ckbSex">Sex</label>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="ckbSex" id="ckbSex0" value="0" v-model="state.sex">
        <label class="form-check-label" for="ckbSex">Male</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="ckbSex" id="ckbSex1" value="1" v-model="state.sex">
        <label class="form-check-label" for="ckbSex">Female</label>
      </div>
  </div>
  
  <!-- Submit button -->
  <div class="btn btn-primary mb-4 text-white" id="btnSend" @click="Send"> Send </div>
</div>
</template>

<style scoped>
  .mr-15
  {
    margin-right: 15px;
  }
  #btnSend
  {
    width: 100%;
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
