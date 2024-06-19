<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth';
import { reactive } from "vue";
const authStore = useAuthStore();
const { $bootstrap } = useNuxtApp();
const toastRef = ref(null);
let toastRR;
const state = reactive({
  mail: "",
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
    <h2>Forgotten Password</h2>
    <a class="btn-close m-auto" href="/"></a>
  </div>
  <div class="form-outline mb-4">
    <label class="form-label" for="txtMail">Mail</label>
    <input 
      type="text" 
      id="txtMail" 
      class="form-control"
      v-model="state.mail"  />
  </div>
  <!-- Submit button -->
  <div class="btn btn-primary mb-4 text-white" id="btnSend" @click="Send"> Send </div>
</div>
</template>

<style scoped>
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
