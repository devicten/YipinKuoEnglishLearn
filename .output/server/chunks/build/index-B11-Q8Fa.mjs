import { _ as _export_sfc, c as useNuxtApp, d as useAuthStore } from './server.mjs';
import { useSSRContext, defineComponent } from 'vue';
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
    const { $bootstrap } = useNuxtApp();
    const authStore = useAuthStore();
    const __returned__ = { $bootstrap, authStore };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><div class="box-1" data-v-02281a80><div id="RespToast" class="toast align-items-center text-bg-danger border-0 mb-4" role="alert" aria-live="assertive" aria-atomic="true" data-v-02281a80><div class="d-flex" data-v-02281a80><div class="toast-body" data-v-02281a80></div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" data-v-02281a80></button></div></div><div class="text-title text-center" data-v-02281a80>\u65B0\u55AE\u5B57 - 1 - 0 </div><div class="quest" id="questRefId" data-v-02281a80><input type="text" class="w-input" data-v-02281a80></div><div class="text-desc text-first" data-v-02281a80>${ssrInterpolate(_ctx.state.info0)}</div></div><div class="box-1" data-v-02281a80><div class="text-title2 text-first" data-v-02281a80> aaaa </div><div class="text-desc text-first" data-v-02281a80> bbbb </div></div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-02281a80"], ["__file", "/home/runner/YipinKuoEnglishLearn/pages/index.vue"]]);

export { index as default };
//# sourceMappingURL=index-B11-Q8Fa.mjs.map
