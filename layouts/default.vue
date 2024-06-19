<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();
</script>

<template>
  <comNav />
  <div class="container">
    <div v-show="authStore.showslot"><slot /></div>
    <comLogin v-show="authStore.showlogin" />
    <comForgetpassword v-show="authStore.showforgetpassword" />
    <comRegister v-show="authStore.showregister" />
  </div>
  <comBottom v-show="authStore.showslot" />
</template>

<style scoped></style>