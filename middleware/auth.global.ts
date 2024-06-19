import { useAuthStore } from '~/stores/auth';
export default defineNuxtRouteMiddleware((to, from) => {
  const userddata = useCookie('s1').value;
  //const userddata = useCookie('s1').value;
  if(userddata != undefined)
  {
    const authStore = useAuthStore();
    authStore.setAuthentication(
      userddata.token,
      true,
      false,
      [],
      userddata.name
    );
  }
});