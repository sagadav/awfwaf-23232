import { defineComponent, useSSRContext, ref, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { c as useRuntimeConfig, u as useHead } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@primevue/core/base/style';
import '@primevue/core/basecomponent/style';
import '@primeuix/styles/autocomplete';
import '@primeuix/utils/object';
import '@primeuix/styles/cascadeselect';
import '@primeuix/styles/checkbox';
import '@primeuix/styles/checkboxgroup';
import '@primeuix/styles/colorpicker';
import '@primeuix/styles/datepicker';
import '@primeuix/styles/floatlabel';
import '@primeuix/styles/iconfield';
import '@primeuix/styles/iftalabel';
import '@primeuix/styles/inputchips';
import '@primeuix/styles/inputgroup';
import '@primeuix/styles/inputnumber';
import '@primeuix/styles/inputotp';
import '@primeuix/styles/inputtext';
import '@primeuix/styles/knob';
import '@primeuix/styles/listbox';
import '@primeuix/styles/multiselect';
import '@primeuix/styles/password';
import '@primeuix/styles/radiobutton';
import '@primeuix/styles/radiobuttongroup';
import '@primeuix/styles/rating';
import '@primeuix/styles/select';
import '@primeuix/styles/selectbutton';
import '@primeuix/styles/slider';
import '@primeuix/styles/textarea';
import '@primeuix/styles/togglebutton';
import '@primeuix/styles/toggleswitch';
import '@primeuix/styles/treeselect';
import '@primeuix/styles/button';
import '@primeuix/styles/buttongroup';
import '@primeuix/styles/speeddial';
import '@primeuix/styles/splitbutton';
import '@primeuix/styles/datatable';
import '@primeuix/styles/dataview';
import '@primeuix/styles/orderlist';
import '@primeuix/styles/organizationchart';
import '@primeuix/styles/paginator';
import '@primeuix/styles/picklist';
import '@primeuix/styles/tree';
import '@primeuix/styles/treetable';
import '@primeuix/styles/timeline';
import '@primeuix/styles/virtualscroller';
import '@primeuix/styles/accordion';
import '@primeuix/styles/card';
import '@primeuix/styles/divider';
import '@primeuix/styles/fieldset';
import '@primeuix/styles/panel';
import '@primeuix/styles/scrollpanel';
import '@primeuix/styles/splitter';
import '@primeuix/styles/stepper';
import '@primeuix/styles/tabview';
import '@primeuix/styles/tabs';
import '@primeuix/styles/toolbar';
import '@primeuix/styles/confirmdialog';
import '@primeuix/styles/confirmpopup';
import '@primeuix/styles/dialog';
import '@primeuix/styles/drawer';
import '@primeuix/styles/popover';
import '@primeuix/styles/fileupload';
import '@primeuix/styles/breadcrumb';
import '@primeuix/styles/contextmenu';
import '@primeuix/styles/dock';
import '@primeuix/styles/menu';
import '@primeuix/styles/menubar';
import '@primeuix/styles/megamenu';
import '@primeuix/styles/panelmenu';
import '@primeuix/styles/steps';
import '@primeuix/styles/tabmenu';
import '@primeuix/styles/tieredmenu';
import '@primeuix/styles/message';
import '@primeuix/styles/inlinemessage';
import '@primeuix/styles/toast';
import '@primeuix/styles/carousel';
import '@primeuix/styles/galleria';
import '@primeuix/styles/image';
import '@primeuix/styles/imagecompare';
import '@primeuix/styles/avatar';
import '@primeuix/styles/badge';
import '@primeuix/styles/blockui';
import '@primeuix/styles/chip';
import '@primeuix/styles/inplace';
import '@primeuix/styles/metergroup';
import '@primeuix/styles/overlaybadge';
import '@primeuix/styles/scrolltop';
import '@primeuix/styles/skeleton';
import '@primeuix/styles/progressbar';
import '@primeuix/styles/progressspinner';
import '@primeuix/styles/tag';
import '@primeuix/styles/terminal';
import '@primevue/forms/form/style';
import '@primevue/forms/formfield/style';
import '@primeuix/styles/tooltip';
import '@primeuix/styles/ripple';
import '@primeuix/styled';
import 'node:fs';
import 'node:url';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import '@primeuix/utils/eventbus';
import '@primeuix/utils';
import '@primeuix/styles/base';
import '@primeuix/utils/dom';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "signin",
  __ssrInlineRender: true,
  setup(__props) {
    const step = ref("identifier");
    const phone = ref("");
    const verificationCode = ref("");
    const loading = ref(false);
    const errorMessage = ref("");
    const showCaptchaModal = ref(false);
    const captchaUrl = ref("");
    const config = useRuntimeConfig();
    config.public.apiBase || "/api";
    useHead({
      title: "Offer Jet - Вход",
      meta: [
        { name: "description", content: "Найдем работу на hh.ru за вас. Автоматические отклики и сопроводительные письма." }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" }, _attrs))} data-v-50198710><div class="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" data-v-50198710></div><div class="absolute -bottom-24 -left-24 w-96 h-96 bg-lime-100 rounded-full blur-3xl opacity-50" data-v-50198710></div><div class="max-w-md w-full space-y-8 relative" data-v-50198710><div class="text-center" data-v-50198710><div class="flex justify-center mb-6" data-v-50198710><div class="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-green-100" data-v-50198710> ✈️ </div></div><h2 class="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight" data-v-50198710> Вход в личный кабинет </h2><div class="mt-2 flex items-center justify-center gap-2 text-sm text-gray-500" data-v-50198710><span data-v-50198710>С помощью вашего аккаунта HeadHunter</span><div class="group relative flex items-center" data-v-50198710><div class="cursor-help w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-50 hover:text-brand-primary transition-colors" data-v-50198710> ? </div><div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-20 text-center leading-relaxed" data-v-50198710> Мы не храним ваши персональные данные, вход напрямую в HH через официальные механизмы авторизации. <div class="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" data-v-50198710></div></div></div></div></div><div class="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 min-h-[400px] flex flex-col" data-v-50198710>`);
      if (unref(step) === "identifier") {
        _push(`<div class="flex-1 flex flex-col" data-v-50198710><form class="space-y-6 flex-1 flex flex-col" data-v-50198710>`);
        if (unref(errorMessage)) {
          _push(`<div class="p-4 bg-red-50 border border-red-200 rounded-xl" data-v-50198710><p class="text-sm text-red-600" data-v-50198710>${ssrInterpolate(unref(errorMessage))}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div data-v-50198710><label for="phone" class="block text-sm font-medium text-gray-700 mb-2" data-v-50198710>Номер телефона</label><input id="phone"${ssrRenderAttr("value", unref(phone))} name="phone" type="tel" required class="appearance-none block w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all" placeholder="+7 (999) 000-00-00" data-v-50198710></div><div class="mt-auto" data-v-50198710><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all active:scale-95 disabled:opacity-50" data-v-50198710>`);
        if (!unref(loading)) {
          _push(`<span data-v-50198710>Продолжить</span>`);
        } else {
          _push(`<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-50198710><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-50198710></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-50198710></path></svg>`);
        }
        _push(`</button></div></form><div class="mt-8 text-center pt-6 border-t border-gray-50" data-v-50198710><p class="text-sm text-gray-500" data-v-50198710> Нет аккаунта на HH? <a href="https://hh.ru/signup" target="_blank" class="font-semibold text-brand-primary hover:text-brand-primary/80" data-v-50198710>Зарегистрироваться</a></p></div></div>`);
      } else {
        _push(`<div class="flex-1 flex flex-col" data-v-50198710><button class="group mb-6 inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand-primary transition-colors" data-v-50198710><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-50198710><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-50198710></path></svg> Назад к вводу телефона </button><div class="text-center mb-8" data-v-50198710><h3 class="text-xl font-bold text-gray-900 mb-2" data-v-50198710> Введите код </h3><p class="text-sm text-gray-500" data-v-50198710> Мы отправили код подтверждения на <br data-v-50198710><span class="font-medium text-gray-900" data-v-50198710>${ssrInterpolate(unref(phone))}</span></p></div><form class="space-y-8 flex-1 flex flex-col" data-v-50198710>`);
        if (unref(errorMessage)) {
          _push(`<div class="p-4 bg-red-50 border border-red-200 rounded-xl" data-v-50198710><p class="text-sm text-red-600" data-v-50198710>${ssrInterpolate(unref(errorMessage))}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div data-v-50198710><label for="verification_code" class="block text-sm font-medium text-gray-700 mb-2" data-v-50198710>Код подтверждения</label><input id="verification_code"${ssrRenderAttr("value", unref(verificationCode))} name="verification_code" type="text" pattern="[0-9]*" inputmode="numeric" maxlength="4" required class="appearance-none block w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-center text-3xl font-bold tracking-[1em]" placeholder="0000" data-v-50198710></div><div class="mt-auto" data-v-50198710><button type="submit"${ssrIncludeBooleanAttr(unref(loading) || unref(verificationCode).length !== 4) ? " disabled" : ""} class="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all active:scale-95 disabled:opacity-50" data-v-50198710>`);
        if (!unref(loading)) {
          _push(`<span data-v-50198710>Войти в кабинет</span>`);
        } else {
          _push(`<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-50198710><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-50198710></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-50198710></path></svg>`);
        }
        _push(`</button></div></form><div class="mt-8 text-center" data-v-50198710><button class="text-sm font-semibold text-brand-primary hover:text-brand-primary/80" data-v-50198710> Отправить код повторно </button></div></div>`);
      }
      _push(`</div><p class="mt-8 text-center text-xs text-gray-400" data-v-50198710> Нажимая «Продолжить», вы соглашаетесь с условиями использования и политикой конфиденциальности. </p></div>`);
      if (unref(showCaptchaModal)) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4" data-v-50198710><div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" data-v-50198710></div><div class="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center overflow-hidden" data-v-50198710><div class="flex justify-center mb-6" data-v-50198710><div class="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-yellow-50" data-v-50198710> 🛡️ </div></div><h3 class="text-xl font-bold text-gray-900 mb-4" data-v-50198710> Требуется проверка </h3><p class="text-gray-600 mb-8 leading-relaxed" data-v-50198710> Пожалуйста перейдите на сайт hh.ru и решите капчу. Если ошибки не будет после отправки капчи (сообщения о успехе тоже), возвращайтесь на эту страницу и продолжите вход. </p><div class="space-y-3" data-v-50198710><a${ssrRenderAttr("href", unref(captchaUrl))} target="_blank" class="block w-full py-4 px-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/25" data-v-50198710> Перейти к решению капчи </a><button class="block w-full py-4 px-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all" data-v-50198710> Я всё решил, продолжить </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/signin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const signin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-50198710"]]);

export { signin as default };
//# sourceMappingURL=signin-CdsqNnJ0.mjs.map
