import { _ as _export_sfc, c as useAuthStore, d as useNuxtApp } from './server.mjs';
import { useSSRContext, defineComponent, ref, reactive, watch } from 'vue';
import $ from 'jquery';
import { ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props, { expose: __expose }) {
    __expose();
    const authStore = useAuthStore();
    const { $bootstrap } = useNuxtApp();
    const toastRef = ref(null);
    const questRef = ref(null);
    const inputRef = ref(null);
    let toastRR, questRR, inputRR;
    const state = reactive({
      quest: "",
      questdesc: "",
      info: "",
      infodesc: "",
      answer: "",
      word: "",
      score: 100,
      message: ""
    });
    function _uuid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
        return v.toString(16);
      });
    }
    async function Quest() {
      var isError2 = false;
      try {
        const response = await fetch("/api/quest", {
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
          body: "{}"
          // body data type must match "Content-Type" header
        });
        const result = await response.json();
        if (result.code !== 200) {
          isError2 = true;
          state.message = result.message;
          toastRR.show();
          return;
        }
        authStore.setQuest(result.result);
        var d0 = result.result.answer.filter((obj) => obj.status === 0);
        var q0 = d0.reduce((previous, current) => {
          return current.idx < previous.idx ? current : previous;
        });
        authStore.vIdx = q0.idx;
        if (authStore.vIdx2 !== -1)
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
        var questRefId = (void 0).getElementById("questRefId");
        for (var k = 0; k < arrw.length; k++) {
          if (arrw[k].tagName === "DIV")
            questRefId.removeChild(arrw[k]);
        }
        var html = "";
        var arrQuest = state.quest.split(" ");
        for (var i = 0; i < arrQuest.length; i++) {
          if (arrQuest[i] === state.word) {
            if (authStore.vIdx2 === -1) {
              var wb = (void 0).createElement("div");
              wb.textContent = "";
              wb.setAttribute("class", "w w-back");
              wb.setAttribute("id", "wbackref");
              questRR.appendChild(wb);
              var wbackref = (void 0).getElementById("wbackref");
              inputRR.style = `left: ${wbackref.offsetLeft}px;top: ${wbackref.offsetTop}px;`;
            } else {
              var w = (void 0).createElement("div");
              w.textContent = state.word;
              w.setAttribute("class", "w");
              questRR.appendChild(w);
            }
          } else {
            var w = (void 0).createElement("div");
            w.textContent = arrQuest[i];
            w.setAttribute("class", "w");
            questRR.appendChild(w);
          }
        }
      } catch (e) {
        state.message = e.message;
        toastRR.show();
      }
    }
    async function onkeyup(e) {
      inputRR.value = "";
      var wbackref = (void 0).getElementById("wbackref");
      if (e.key === "Backspace") {
        if (wbackref.innerText.length === 0)
          return;
        wbackref.removeChild(wbackref.lastChild);
        state.answer = wbackref.innerText;
        inputRR.style = `left: ${wbackref.offsetLeft + 0 + wbackref.innerText.length * 25}px;top: ${wbackref.offsetTop}px;`;
        return;
      }
      if (e.key === "Enter") {
        var len = 0;
        for (var i = 0; i < state.answer.length; i++) {
          if (state.word.length > state.answer.length)
            wbackref.children[i].classList.add("w-b");
          if (state.answer.length > state.word.length)
            wbackref.children[i].classList.add("w-a");
          if (state.word[i] != ToCDB(state.answer[i])) {
            wbackref.children[i].classList.add("w-b");
          } else {
            wbackref.children[i].classList.add("w-a");
            len++;
          }
          wbackref.children[i].innerText = state.word[i];
        }
        if (state.score === 100) {
          state.score = Math.ceil(len / state.answer.length * 100);
          setTimeout(function() {
            for (var i2 = 0; i2 < state.answer.length; i2++) {
              wbackref.children[i2].classList.remove("w-a");
              wbackref.children[i2].classList.remove("w-b");
              wbackref.children[i2].innerText = state.answer[i2];
            }
          }, 3e3);
        }
        if (len !== state.answer.length)
          return;
        if (authStore.vRemainQuest <= 0)
          state.score -= 20;
        if (authStore.vRemainQuest / authStore.vTimesQuest >= 0.5)
          state.score += 20;
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
            score: state.score
          })
          // body data type must match "Content-Type" header
        });
        const result = await response.json();
        if (result.code !== 200) {
          isError = true;
          state.message = result.message;
          toastRR.show();
          return;
        }
        (void 0).reload();
        return;
      }
      if (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 96 && e.keyCode <= 105) {
        var wb0 = (void 0).createElement("div");
        wb0.textContent = ToDBC(e.key);
        wb0.setAttribute("class", "w0");
        wbackref.appendChild(wb0);
        state.answer = wbackref.innerText;
        inputRR.style = `left: ${wbackref.offsetLeft + 0 + wbackref.innerText.length * 25}px;top: ${wbackref.offsetTop}px;`;
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
      for (var i = 0; i < txtstring.length; i++) {
        if (txtstring.charCodeAt(i) == 32) {
          tmp = tmp + String.fromCharCode(12288);
        }
        if (txtstring.charCodeAt(i) < 127) {
          tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248);
        }
      }
      return tmp;
    }
    function ToCDB(str) {
      var tmp = "";
      for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) == 12288) {
          tmp += String.fromCharCode(str.charCodeAt(i) - 12256);
          continue;
        }
        if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) {
          tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
        } else {
          tmp += String.fromCharCode(str.charCodeAt(i));
        }
      }
      return tmp;
    }
    const __returned__ = { authStore, $bootstrap, toastRef, questRef, inputRef, get toastRR() {
      return toastRR;
    }, set toastRR(v) {
      toastRR = v;
    }, get questRR() {
      return questRR;
    }, set questRR(v) {
      questRR = v;
    }, get inputRR() {
      return inputRR;
    }, set inputRR(v) {
      inputRR = v;
    }, state, _uuid, Quest, onkeyup, ToDBC, ToCDB };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><div class="box-1" data-v-02281a80><div id="RespToast" class="toast align-items-center text-bg-danger border-0 mb-4" role="alert" aria-live="assertive" aria-atomic="true" data-v-02281a80><div class="d-flex" data-v-02281a80><div class="toast-body" data-v-02281a80>${ssrInterpolate($setup.state.message)}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" data-v-02281a80></button></div></div><div class="text-title text-center" data-v-02281a80>\u65B0\u55AE\u5B57 - ${ssrInterpolate($setup.authStore.vIdx)} - ${ssrInterpolate($setup.state.score)}</div><div class="quest" id="questRefId" data-v-02281a80><input type="text" class="w-input" data-v-02281a80></div><div class="text-desc text-first" data-v-02281a80>${ssrInterpolate($setup.state.info0)}</div></div><div class="box-1" data-v-02281a80><div class="text-title2 text-first" data-v-02281a80>${ssrInterpolate($setup.state.info1)}</div><div class="text-desc text-first" data-v-02281a80>${ssrInterpolate($setup.state.info2)}</div></div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-02281a80"], ["__file", "/home/runner/YipinKuoEnglishLearn/pages/index.vue"]]);

export { index as default };
//# sourceMappingURL=index-DEDu_9GW.mjs.map
