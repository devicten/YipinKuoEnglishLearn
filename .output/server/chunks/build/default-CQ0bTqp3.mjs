import { _ as _export_sfc, c as useNuxtApp, d as useAuthStore } from './server.mjs';
import { useSSRContext, defineComponent, ref, reactive, watch, mergeProps, resolveComponent, resolveDirective } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderSlot, ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrGetDirectiveProps, ssrGetDynamicModelProps, ssrLooseEqual } from 'vue/server-renderer';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'mongodb';
import 'console-log-colors';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/free-regular-svg-icons';
import '@fortawesome/free-brands-svg-icons';
import 'maska';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "comNav",
  setup(__props, { expose: __expose }) {
    __expose();
    const { $bootstrap } = useNuxtApp();
    const authStore = useAuthStore();
    const collapseRef = ref(null);
    let collapseRR;
    async function btnSignin_OnClick() {
      collapseRR.hide();
      authStore.showslot = false;
      authStore.showlogin = true;
      return false;
    }
    async function btnSignout_OnClick() {
      var isError = false;
      try {
        const response = await fetch("/api/logout", {
          method: "POST",
          // *GET, POST, PUT, DELETE, etc.
          mode: "cors",
          // no-cors, *cors, same-origin
          cache: "no-cache",
          // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin",
          // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow",
          // manual, *follow, error
          referrerPolicy: "no-referrer",
          // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify({})
          // body data type must match "Content-Type" header
        });
        const result = await response.json();
        if (result.code !== 200) {
          isError = true;
        } else {
          (void 0).reload();
        }
      } catch (e) {
        isError = true;
      }
      return false;
    }
    const __returned__ = { $bootstrap, authStore, collapseRef, get collapseRR() {
      return collapseRR;
    }, set collapseRR(v) {
      collapseRR = v;
    }, btnSignin_OnClick, btnSignout_OnClick };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<nav${ssrRenderAttrs(mergeProps({ class: "navbar navbar-expand-lg navbar-light bg-primary" }, _attrs))} data-v-b4860d07><div class="container" data-v-b4860d07><a class="navbar-brand" href="/" data-v-b4860d07><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16" data-v-b4860d07><path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" data-v-b4860d07></path></svg></a><div class="progress" data-v-b4860d07><div class="progress-content" data-v-b4860d07>${ssrInterpolate($setup.authStore.vCurrentQuest)} / ${ssrInterpolate($setup.authStore.vTotalQuest)}</div><div class="progress-bar bg-info" role="progressbar" style="${ssrRenderStyle(`
        width: ${Math.ceil($setup.authStore.vCurrentQuest / $setup.authStore.vTotalQuest * 100)}%`)}" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" data-v-b4860d07></div></div><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" data-v-b4860d07><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16" data-v-b4860d07><path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z" data-v-b4860d07></path></svg></button><div class="collapse navbar-collapse" id="navbarSupportedContent" data-v-b4860d07><ul class="navbar-nav me-auto mb-2 mb-lg-0" data-v-b4860d07><li class="nav-item" style="${ssrRenderStyle($setup.authStore.IsLogin ? null : { display: "none" })}" data-v-b4860d07><a class="nav-link" href="#" data-v-b4860d07> Profile </a></li><li class="nav-item" style="${ssrRenderStyle(!$setup.authStore.IsLogin ? null : { display: "none" })}" data-v-b4860d07><a class="nav-link" data-v-b4860d07> Sign in </a></li><li class="nav-item" style="${ssrRenderStyle($setup.authStore.IsLogin ? null : { display: "none" })}" data-v-b4860d07><a class="nav-link" data-v-b4860d07>Sign out</a></li></ul></div></div></nav>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/comNav.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-b4860d07"], ["__file", "/home/runner/YipinKuoEnglishLearn/components/comNav.vue"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "comLogin",
  setup(__props, { expose: __expose }) {
    __expose();
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
    async function SignIn() {
      var isError = false;
      var msg = "account or password error.";
      if (/[a-zA-Z0-9]{3,10}$/.test(state.account) == false) {
        isError = true;
      } else if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*-_]{8,}$/.test(state.password) == false) {
        isError = true;
      } else {
        try {
          const response = await fetch("/api/login", {
            method: "POST",
            // *GET, POST, PUT, DELETE, etc.
            mode: "cors",
            // no-cors, *cors, same-origin
            cache: "no-cache",
            // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin",
            // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json"
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow",
            // manual, *follow, error
            referrerPolicy: "no-referrer",
            // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(state)
            // body data type must match "Content-Type" header
          });
          const result = await response.json();
          if (result.code !== 200) {
            isError = true;
            msg = result.message;
          } else {
            (void 0).reload();
          }
        } catch (e) {
          isError = true;
        }
      }
      if (isError === true) {
        state.message = msg;
        toastRR.show();
        return;
      }
    }
    async function ForgetPassword() {
      authStore.showlogin = false;
      authStore.showforgetpassword = true;
      return false;
    }
    async function Register() {
      authStore.showlogin = false;
      authStore.showregister = true;
      return false;
    }
    const __returned__ = { authStore, $bootstrap, toastRef, get toastRR() {
      return toastRR;
    }, set toastRR(v) {
      toastRR = v;
    }, state, SignIn, ForgetPassword, Register };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "box" }, _attrs))} data-v-1fffa470><div id="RespToast" class="toast align-items-center text-bg-danger border-0 mb-4" role="alert" aria-live="assertive" aria-atomic="true" data-v-1fffa470><div class="d-flex" data-v-1fffa470><div class="toast-body" data-v-1fffa470>${ssrInterpolate($setup.state.message)}</div><button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" data-v-1fffa470></button></div></div><div class="form-outline mb-4 s-form-title" data-v-1fffa470><h2 data-v-1fffa470>Kinglish</h2><a class="btn-close m-auto" href="/" data-v-1fffa470></a></div><div class="form-outline mb-4" data-v-1fffa470><label class="form-label" for="txtAccount" data-v-1fffa470>Account</label><input type="text" id="txtAccount" class="form-control"${ssrRenderAttr("value", $setup.state.account)} data-v-1fffa470></div><div class="form-outline mb-4" data-v-1fffa470><label class="form-label" for="txtPassword" data-v-1fffa470>Password</label><input type="password" id="txtPassword" class="form-control"${ssrRenderAttr("value", $setup.state.password)} data-v-1fffa470></div><div class="row mb-4" data-v-1fffa470><div class="col d-flex justify-content-center" data-v-1fffa470><!-- Checkbox --><div class="form-check" data-v-1fffa470><input type="checkbox" id="ckbAutoLogin" class="form-check-input"${ssrIncludeBooleanAttr(Array.isArray($setup.state.autologin) ? ssrLooseContain($setup.state.autologin, null) : $setup.state.autologin) ? " checked" : ""} data-v-1fffa470><label class="form-check-label" for="ckbAutoLogin" data-v-1fffa470> Remember me </label></div></div><!-- div class="col">
      <div class="btn btn-link" @click="ForgetPassword">Forgot password?</div>
    </div --></div><!-- Submit button --><div class="btn btn-info mb-4 text-white" id="btnSignIn" data-v-1fffa470> Sign in </div><!-- Register buttons --><div class="text-center" data-v-1fffa470><p data-v-1fffa470>Not a member? <div class="btn btn-link" data-v-1fffa470>Register</div></p><p data-v-1fffa470>or sign up with:</p><button type="button" class="btn btn-link btn-floating mx-1" data-v-1fffa470>`);
  _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fab", "facebook"] }, null, _parent));
  _push(`</button><button type="button" class="btn btn-link btn-floating mx-1" data-v-1fffa470>`);
  _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fab", "google"] }, null, _parent));
  _push(`</button><button type="button" class="btn btn-link btn-floating mx-1" data-v-1fffa470>`);
  _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fab", "x-twitter"] }, null, _parent));
  _push(`</button><button type="button" class="btn btn-link btn-floating mx-1" data-v-1fffa470>`);
  _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fab", "github"] }, null, _parent));
  _push(`</button></div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/comLogin.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-1fffa470"], ["__file", "/home/runner/YipinKuoEnglishLearn/components/comLogin.vue"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "comForgetpassword",
  setup(__props, { expose: __expose }) {
    __expose();
    const authStore = useAuthStore();
    const { $bootstrap } = useNuxtApp();
    const toastRef = ref(null);
    let toastRR;
    const state = reactive({
      mail: "",
      message: ""
    });
    async function Send() {
    }
    const __returned__ = { authStore, $bootstrap, toastRef, get toastRR() {
      return toastRR;
    }, set toastRR(v) {
      toastRR = v;
    }, state, Send };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "box" }, _attrs))} data-v-9b9d67e9><div id="RespToast" class="toast align-items-center text-bg-danger border-0 mb-4" role="alert" aria-live="assertive" aria-atomic="true" data-v-9b9d67e9><div class="d-flex" data-v-9b9d67e9><div class="toast-body" data-v-9b9d67e9>${ssrInterpolate($setup.state.message)}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" data-v-9b9d67e9></button></div></div><div class="form-outline mb-4 s-form-title" data-v-9b9d67e9><h2 data-v-9b9d67e9>Forgotten Password</h2><a class="btn-close m-auto" href="/" data-v-9b9d67e9></a></div><div class="form-outline mb-4" data-v-9b9d67e9><label class="form-label" for="txtMail" data-v-9b9d67e9>Mail</label><input type="text" id="txtMail" class="form-control"${ssrRenderAttr("value", $setup.state.mail)} data-v-9b9d67e9></div><!-- Submit button --><div class="btn btn-primary mb-4 text-white" id="btnSend" data-v-9b9d67e9> Send </div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/comForgetpassword.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-9b9d67e9"], ["__file", "/home/runner/YipinKuoEnglishLearn/components/comForgetpassword.vue"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "comRegister",
  setup(__props, { expose: __expose }) {
    __expose();
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
    async function Send() {
    }
    const validateEmail = (email) => {
      return String(email).toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };
    const options = {
      mask: "A",
      tokens: {
        A: { pattern: /[A-Za-z0-9]@[A-Za-z0-9.]/ }
      },
      onMaska: (detail) => {
        detail.completed = validateEmail(detail.unmasked);
      }
    };
    const __returned__ = { authStore, $bootstrap, toastRef, get toastRR() {
      return toastRR;
    }, set toastRR(v) {
      toastRR = v;
    }, state, Send, validateEmail, options };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _directive_maska = resolveDirective("maska");
  let _temp0, _temp1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "box" }, _attrs))} data-v-0a1021b0><div id="RespToast" class="toast align-items-center text-bg-danger border-0 mb-4" role="alert" aria-live="assertive" aria-atomic="true" data-v-0a1021b0><div class="d-flex" data-v-0a1021b0><div class="toast-body" data-v-0a1021b0>${ssrInterpolate($setup.state.message)}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" data-v-0a1021b0></button></div></div><div class="form-outline mb-4 s-form-title" data-v-0a1021b0><h2 data-v-0a1021b0>New Account</h2><a class="btn-close m-auto" href="/" data-v-0a1021b0></a></div><div class="form-outline mb-4" data-v-0a1021b0><label class="form-label" for="txtAccount" data-v-0a1021b0>Account</label><input type="text" id="txtAccount" class="form-control"${ssrRenderAttr("value", $setup.state.account)} data-v-0a1021b0></div><div class="form-outline mb-4" data-v-0a1021b0><label class="form-label" for="txtPassword" data-v-0a1021b0>Password</label><input type="password" id="txtPassword" class="form-control"${ssrRenderAttr("value", $setup.state.password)} data-v-0a1021b0></div><div class="form-outline mb-4" data-v-0a1021b0><label class="form-label" for="txtPassword2" data-v-0a1021b0>Confirm Password</label><input type="password" id="txtPassword2" class="form-control"${ssrRenderAttr("value", $setup.state.password2)} data-v-0a1021b0></div><div class="form-outline mb-4" data-v-0a1021b0><label class="form-label" for="txtMail" data-v-0a1021b0>Mail</label><input${ssrRenderAttrs((_temp0 = mergeProps({
    type: "text",
    id: "txtMail",
    class: "form-control",
    value: $setup.state.mail
  }, ssrGetDirectiveProps(_ctx, _directive_maska, void 0, $setup.options)), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, $setup.state.mail))))} data-v-0a1021b0></div><div class="form-outline mb-4" data-v-0a1021b0><label class="form-label" for="txtName" data-v-0a1021b0>Name</label><input type="text" id="txtName" class="form-control"${ssrRenderAttr("value", $setup.state.name)} data-v-0a1021b0></div><div class="form-outline mb-4" data-v-0a1021b0><label class="form-label" for="txtPhone" data-v-0a1021b0>Phone</label><input${ssrRenderAttrs((_temp1 = mergeProps({
    type: "text",
    id: "txtPhone",
    class: "form-control",
    "data-maska": "####-###-###",
    value: $setup.state.phone
  }, ssrGetDirectiveProps(_ctx, _directive_maska)), mergeProps(_temp1, ssrGetDynamicModelProps(_temp1, $setup.state.phone))))} data-v-0a1021b0></div><div class="form-outline mb-4" data-v-0a1021b0><label class="form-label mr-15" for="ckbSex" data-v-0a1021b0>Sex</label><div class="form-check form-check-inline" data-v-0a1021b0><input class="form-check-input" type="radio" name="ckbSex" id="ckbSex0" value="0"${ssrIncludeBooleanAttr(ssrLooseEqual($setup.state.sex, "0")) ? " checked" : ""} data-v-0a1021b0><label class="form-check-label" for="ckbSex" data-v-0a1021b0>Male</label></div><div class="form-check form-check-inline" data-v-0a1021b0><input class="form-check-input" type="radio" name="ckbSex" id="ckbSex1" value="1"${ssrIncludeBooleanAttr(ssrLooseEqual($setup.state.sex, "1")) ? " checked" : ""} data-v-0a1021b0><label class="form-check-label" for="ckbSex" data-v-0a1021b0>Female</label></div></div><!-- Submit button --><div class="btn btn-primary mb-4 text-white" id="btnSend" data-v-0a1021b0> Send </div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/comRegister.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-0a1021b0"], ["__file", "/home/runner/YipinKuoEnglishLearn/components/comRegister.vue"]]);
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "comBottom",
  setup(__props, { expose: __expose }) {
    __expose();
    const { $bootstrap } = useNuxtApp();
    const authStore = useAuthStore();
    const state = reactive({
      message: ""
    });
    var times = authStore.vTimesQuest * 1e3;
    const counterRef = ref(null);
    let counterRR;
    watch(
      () => authStore.vTimesQuest,
      (newValue, oldValue) => {
        if (newValue > 0 && oldValue == 0) {
          times = authStore.vTimesQuest * 1e3;
          if (times > 60 * 1e3)
            counterRR.innerHTML = new Date(times).toISOString().slice(11, 19);
          else
            counterRR.innerHTML = new Date(times).toISOString().slice(14, 19);
          setInterval();
        }
      },
      { deep: true }
    );
    async function pass() {
      console.log("pass");
      try {
        const response = await fetch("/api/quest", {
          method: "PUT",
          // *GET, POST, PUT, DELETE, etc.
          mode: "cors",
          // no-cors, *cors, same-origin
          cache: "no-cache",
          // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin",
          // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow",
          // manual, *follow, error
          referrerPolicy: "no-referrer",
          // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify({
            idx: authStore.vIdx,
            score: 0
          })
          // body data type must match "Content-Type" header
        });
        (void 0).reload();
        return;
      } catch (e) {
        console.log(e);
      }
    }
    async function prev() {
      for (var i = 0; i < authStore.vArrQuest.length; i++) {
        if (authStore.vArrQuest[i].id === (authStore.vIdx2 === -1 ? authStore.vIdx : authStore.vIdx2)) {
          if (i === 0)
            return;
          authStore.vIdx2 = authStore.vArrQuest[i - 1].id;
        }
      }
    }
    async function next() {
      for (var i = 0; i < authStore.vArrQuest.length; i++) {
        if (authStore.vArrQuest[i].id === (authStore.vIdx2 === -1 ? authStore.vIdx : authStore.vIdx2)) {
          if (i === authStore.vArrQuest.length - 1)
            return;
          authStore.vIdx2 = authStore.vArrQuest[i + 1].id === authStore.vIdx ? authStore.vArrQuest[i + 1].id : -1;
        }
      }
    }
    const __returned__ = { $bootstrap, authStore, state, get times() {
      return times;
    }, set times(v) {
      times = v;
    }, counterRef, get counterRR() {
      return counterRR;
    }, set counterRR(v) {
      counterRR = v;
    }, pass, prev, next };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<nav${ssrRenderAttrs(mergeProps({ class: "navbar fixed-bottom navbar-light bg-primary" }, _attrs))} data-v-bae10c37><div class="container-fluid" data-v-bae10c37><a class="inline-block text-start" data-v-bae10c37><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hourglass" viewBox="0 0 16 16" data-v-bae10c37><path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5m2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702c0 .7-.478 1.235-1.011 1.491A3.5 3.5 0 0 0 4.5 13v1h7v-1a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351v-.702c0-.7.478-1.235 1.011-1.491A3.5 3.5 0 0 0 11.5 3V2z" data-v-bae10c37></path></svg><p class="inline-block fs-5" data-v-bae10c37></p></a><div class="position-absolute end-15 btn btn-info" style="${ssrRenderStyle($setup.authStore.showprevbtn ? null : { display: "none" })}" data-v-bae10c37>\u4E0A\u4E00\u984C</div><div class="position-absolute end-10 btn btn-info" style="${ssrRenderStyle($setup.authStore.shownextbtn ? null : { display: "none" })}" data-v-bae10c37>\u4E0B\u4E00\u984C</div><div class="position-absolute end-5 btn btn-info" style="${ssrRenderStyle(!$setup.authStore.shownextbtn ? null : { display: "none" })}" data-v-bae10c37>\u770B\u7B54\u6848</div></div></nav>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/comBottom.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-bae10c37"], ["__file", "/home/runner/YipinKuoEnglishLearn/components/comBottom.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  setup(__props, { expose: __expose }) {
    __expose();
    const authStore = useAuthStore();
    const __returned__ = { authStore };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_comNav = __nuxt_component_0;
  const _component_comLogin = __nuxt_component_1;
  const _component_comForgetpassword = __nuxt_component_2;
  const _component_comRegister = __nuxt_component_3;
  const _component_comBottom = __nuxt_component_4;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_comNav, null, null, _parent));
  _push(`<div class="container"><div style="${ssrRenderStyle($setup.authStore.showslot ? null : { display: "none" })}">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
  _push(ssrRenderComponent(_component_comLogin, {
    style: $setup.authStore.showlogin ? null : { display: "none" }
  }, null, _parent));
  _push(ssrRenderComponent(_component_comForgetpassword, {
    style: $setup.authStore.showforgetpassword ? null : { display: "none" }
  }, null, _parent));
  _push(ssrRenderComponent(_component_comRegister, {
    style: $setup.authStore.showregister ? null : { display: "none" }
  }, null, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_comBottom, {
    style: $setup.authStore.showslot ? null : { display: "none" }
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "/home/runner/YipinKuoEnglishLearn/layouts/default.vue"]]);

export { _default as default };
//# sourceMappingURL=default-CQ0bTqp3.mjs.map
