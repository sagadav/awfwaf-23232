import { _ as __nuxt_component_0$1 } from './nuxt-link-WXRHnaGW.mjs';
import { defineComponent, mergeProps, ref, withCtx, createTextVNode, unref, createBlock, openBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { u as useHead } from './server.mjs';
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

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const isMobileMenuOpen = ref(false);
    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex-shrink-0 flex items-center gap-2 cursor-pointer"><div class="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">✈️</div><span class="font-bold text-xl tracking-tight text-gray-900">Offer Jet</span></div><nav class="hidden md:flex gap-8"><a href="#how-it-works" class="text-gray-600 hover:text-brand-primary font-medium transition-colors">Как это работает</a><a href="#advantages" class="text-gray-600 hover:text-brand-primary font-medium transition-colors">Преимущества</a><a href="#pricing" class="text-gray-600 hover:text-brand-primary font-medium transition-colors">Тарифы</a><a href="#faq" class="text-gray-600 hover:text-brand-primary font-medium transition-colors">FAQ</a></nav><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/signin",
        class: "hidden sm:inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` В кабинет `);
          } else {
            return [
              createTextVNode(" В кабинет ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary"><span class="sr-only">Open menu</span>`);
      if (!unref(isMobileMenuOpen)) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`);
      }
      _push(`</button></div></div></div><div class="md:hidden border-t border-gray-100 bg-white shadow-lg absolute w-full left-0" style="${ssrRenderStyle(unref(isMobileMenuOpen) ? null : { display: "none" })}"><nav class="flex flex-col p-4 space-y-4"><a href="#how-it-works" class="text-gray-600 hover:text-brand-primary font-medium transition-colors px-2 py-1 block">Как это работает</a><a href="#advantages" class="text-gray-600 hover:text-brand-primary font-medium transition-colors px-2 py-1 block">Преимущества</a><a href="#pricing" class="text-gray-600 hover:text-brand-primary font-medium transition-colors px-2 py-1 block">Тарифы</a><a href="#faq" class="text-gray-600 hover:text-brand-primary font-medium transition-colors px-2 py-1 block">FAQ</a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/signin",
        onClick: closeMobileMenu,
        class: "sm:hidden text-brand-primary font-bold px-2 py-1 block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`В кабинет`);
          } else {
            return [
              createTextVNode("В кабинет")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></div></header>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/Header.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$8, { __name: "LandingHeader" });
const _sfc_main$7 = {};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative bg-white pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-semibold mb-8"><span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span></span> Работает с HeadHunter </div><h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight"> Каждый работотадель должен увидеть ваше <span class="text-brand-primary">резюме</span></h1><p class="mt-4 text-xl text-gray-600 max-w-2xl mx-auto mb-10"> Отправляйте до 200 отликов в день. 6000 в месяц! </p><div class="flex flex-col sm:flex-row gap-4 justify-center items-center">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/signin",
    class: "w-full sm:w-auto px-8 py-4 bg-brand-primary text-white font-bold text-lg rounded-xl shadow-lg hover:bg-brand-primary/90 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"${_scopeId}></path></svg> Попробовать бесплатно `);
      } else {
        return [
          (openBlock(), createBlock("svg", {
            class: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24"
          }, [
            createVNode("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M13 10V3L4 14h7v7l9-11h-7z"
            })
          ])),
          createTextVNode(" Попробовать бесплатно ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<a href="#how-it-works" class="w-full sm:w-auto px-8 py-4 bg-gray-100 text-gray-900 font-bold text-lg rounded-xl hover:bg-gray-200 transition-all duration-300"> Как это работает </a></div></div></section>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/Hero.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$6]]), { __name: "LandingHero" });
const _sfc_main$6 = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    class: "py-16 bg-gray-50",
    id: "comparison"
  }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-12"><h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">В чем разница?</h2><p class="mt-4 text-lg text-gray-600">Сравните самостоятельный поиск и работу с Offer Jet</p></div><div class="overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white"><div class="grid grid-cols-1 md:grid-cols-3"><div class="hidden md:block col-span-1 bg-white p-8"><div class="h-20 flex items-center"></div><div class="space-y-8 mt-8"><div class="h-16 flex items-center text-gray-600 font-medium">Откликов в день</div><div class="h-16 flex items-center text-gray-600 font-medium">Время на поиск</div><div class="h-16 flex items-center text-gray-600 font-medium">Эффективность</div></div></div><div class="col-span-1 bg-gray-50/50 p-8 border-r border-gray-100 md:border-l relative"><div class="h-20 flex flex-col justify-center items-center text-center"><span class="text-xl font-bold text-gray-900">Вы сами</span><span class="text-sm text-gray-500">Ручной поиск</span></div><div class="space-y-8 mt-8"><div class="h-16 flex flex-col justify-center items-center md:items-start text-center md:text-left"><span class="md:hidden text-xs text-gray-400 uppercase tracking-wider mb-1">Откликов в день</span><span class="text-lg text-gray-900">10-20</span></div><div class="h-16 flex flex-col justify-center items-center md:items-start text-center md:text-left"><span class="md:hidden text-xs text-gray-400 uppercase tracking-wider mb-1">Время на поиск</span><span class="text-lg text-gray-900">2-3 часа</span></div><div class="h-16 flex flex-col justify-center items-center md:items-start text-center md:text-left"><span class="md:hidden text-xs text-gray-400 uppercase tracking-wider mb-1">Эффективность</span><span class="text-lg text-red-500 font-medium">Низкая</span></div></div></div><div class="col-span-1 bg-white p-8 relative overflow-hidden"><div class="absolute top-0 right-0 bg-brand-lime text-black text-xs font-bold px-3 py-1 rounded-bl-lg">РЕКОМЕНДУЕМ</div><div class="h-20 flex flex-col justify-center items-center text-center"><span class="text-xl font-bold text-brand-primary">Offer Jet</span><span class="text-sm text-brand-primary">Автоматизация</span></div><div class="space-y-8 mt-8"><div class="h-16 flex flex-col justify-center items-center md:items-start text-center md:text-left"><span class="md:hidden text-xs text-gray-400 uppercase tracking-wider mb-1">Откликов в день</span><span class="text-2xl font-bold text-gray-900">200</span></div><div class="h-16 flex flex-col justify-center items-center md:items-start text-center md:text-left"><span class="md:hidden text-xs text-gray-400 uppercase tracking-wider mb-1">Время на поиск</span><span class="text-2xl font-bold text-brand-lime bg-black px-2 py-1 rounded">0 минут</span></div><div class="h-16 flex flex-col justify-center items-center md:items-start text-center md:text-left"><span class="md:hidden text-xs text-gray-400 uppercase tracking-wider mb-1">Эффективность</span><span class="text-lg text-brand-primary font-bold">Высокая</span></div></div></div></div></div></div></section>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/Comparison.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$5]]), { __name: "LandingComparison" });
const _sfc_main$5 = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "how-it-works",
    class: "py-20 bg-white"
  }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">Как это работает?</h2><p class="mt-4 text-xl text-gray-600">Всего 3 простых шага к вашей новой работе</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-12 relative"><div class="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10"></div><div class="relative flex flex-col items-center text-center"><div class="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm"><span class="text-brand-primary font-bold text-2xl">1</span></div><h3 class="text-xl font-bold text-gray-900 mb-2">Мы отбираем вакансии</h3><p class="text-gray-600 leading-relaxed"> Наш умный алгоритм анализирует тысячи вакансий и выбирает те, которые идеально подходят под ваш опыт и навыки. </p></div><div class="relative flex flex-col items-center text-center"><div class="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm"><span class="text-brand-primary font-bold text-2xl">2</span></div><h3 class="text-xl font-bold text-gray-900 mb-2">Рассылаем отклики</h3><p class="text-gray-600 leading-relaxed"> Отправляем до 200 откликов в сутки. К каждому отклику прикладываем уникальное сопроводительное письмо. </p></div><div class="relative flex flex-col items-center text-center"><div class="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm"><span class="text-brand-primary font-bold text-2xl">3</span></div><h3 class="text-xl font-bold text-gray-900 mb-2">Вы получаете приглашения</h3><p class="text-gray-600 leading-relaxed"> Вам остается только отвечать на звонки и сообщения от рекрутеров и выбирать лучшие предложения. </p></div></div></div></section>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/HowItWorks.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$4]]), { __name: "LandingHowItWorks" });
const _sfc_main$4 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "advantages",
    class: "py-20 bg-gray-50"
  }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">Преимущества Offer Jet</h2></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"><div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div><h3 class="text-xl font-bold text-gray-900 mb-4">Максимальная скорость</h3><p class="text-gray-600"> Мы не тратим время на сон и отдых. Сервис работает 24/7, чтобы вы нашли работу как можно быстрее. </p></div><div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"><div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-6"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg></div><h3 class="text-xl font-bold text-gray-900 mb-4">Полная безопасность</h3><p class="text-gray-600"> Мы используем безопасные алгоритмы, которые имитируют действия реального человека. Ваш аккаунт в безопасности. </p></div><div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"><div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div><h3 class="text-xl font-bold text-gray-900 mb-4">Умный поиск</h3><p class="text-gray-600"> Настраивайте гибкие фильтры: зарплата, локация, график, ключевые слова. Мы найдем именно то, что вам нужно. </p></div></div></div></section>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/Advantages.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3]]), { __name: "LandingAdvantages" });
const _sfc_main$3 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "pricing",
    class: "py-20 bg-white"
  }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">Тарифы</h2><p class="mt-4 text-xl text-gray-600">Выберите подходящий план и начните получать приглашения</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"><div class="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow bg-white flex flex-col"><h3 class="text-2xl font-bold text-gray-900 mb-2">7 Дней</h3><p class="text-gray-500 mb-6">Для быстрого старта</p><div class="text-4xl font-bold text-gray-900 mb-6">1 000 ₽</div><ul class="space-y-4 mb-8 flex-1"><li class="flex items-center gap-3 text-gray-600"><svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> До 2100 откликов </li><li class="flex items-center gap-3 text-gray-600"><svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Умная фильтрация </li><li class="flex items-center gap-3 text-gray-600"><svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Сопроводительные письма </li></ul>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/signin",
    class: "block w-full py-4 text-center font-bold text-brand-primary bg-brand-primary/10 rounded-xl hover:bg-brand-primary/20 transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Выбрать `);
      } else {
        return [
          createTextVNode(" Выбрать ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="border-2 border-brand-primary rounded-2xl p-8 hover:shadow-lg transition-shadow bg-white relative flex flex-col transform md:-translate-y-4"><div class="absolute top-0 right-0 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">ВЫГОДНО</div><h3 class="text-2xl font-bold text-gray-900 mb-2">14 Дней</h3><p class="text-gray-500 mb-6">Максимальный охват</p><div class="text-4xl font-bold text-gray-900 mb-6">1 600 ₽</div><ul class="space-y-4 mb-8 flex-1"><li class="flex items-center gap-3 text-gray-600"><svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> До 4500 откликов </li><li class="flex items-center gap-3 text-gray-600"><svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Приоритетная поддержка </li><li class="flex items-center gap-3 text-gray-600"><svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Все функции включены </li></ul>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/signin",
    class: "block w-full py-4 text-center font-bold text-white bg-brand-primary rounded-xl hover:bg-brand-primary/90 transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Выбрать `);
      } else {
        return [
          createTextVNode(" Выбрать ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></section>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/Pricing.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]), { __name: "LandingPricing" });
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "faq",
    class: "py-20 bg-white"
  }, _attrs))}><div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">Частые вопросы</h2></div><div class="space-y-4"><details class="group bg-gray-50 rounded-xl overflow-hidden [&amp;_summary::-webkit-details-marker]:hidden"><summary class="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 font-medium hover:bg-gray-100 transition-colors"><h3 class="text-lg">Безопасно ли это для моего аккаунта hh.ru?</h3><svg class="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></summary><div class="px-6 pb-6 text-gray-600 leading-relaxed"> Да, наш сервис полностью безопасен. Мы эмулируем действия реального пользователя и соблюдаем лимиты hh.ru. </div></details><details class="group bg-gray-50 rounded-xl overflow-hidden [&amp;_summary::-webkit-details-marker]:hidden"><summary class="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 font-medium hover:bg-gray-100 transition-colors"><h3 class="text-lg">Как начать пользоваться?</h3><svg class="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></summary><div class="px-6 pb-6 text-gray-600 leading-relaxed"> Перейдите в личный кабинет hh.ru. Вы сможете настроить параметры поиска и запустить рассылку за пару минут. </div></details><details class="group bg-gray-50 rounded-xl overflow-hidden [&amp;_summary::-webkit-details-marker]:hidden"><summary class="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 font-medium hover:bg-gray-100 transition-colors"><h3 class="text-lg">Можно ли редактировать сопроводительное письмо?</h3><svg class="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></summary><div class="px-6 pb-6 text-gray-600 leading-relaxed"> Конечно. Вы можете использовать наш шаблон или написать свой собственный текст, который будет отправляться работодателям. </div></details></div></div></section>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/FAQ.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]), { __name: "LandingFAQ" });
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-gray-900 text-white py-12 border-t border-gray-800" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 md:grid-cols-4 gap-8"><div class="col-span-1 md:col-span-1"><div class="flex items-center gap-2 mb-4"><div class="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">Q</div><span class="font-bold text-xl tracking-tight">Offer Jet</span></div><p class="text-gray-400 text-sm"> Автоматизация поиска работы. Найдем вам работу мечты, пока вы отдыхаете. </p></div><div><h4 class="font-bold mb-4 text-lg">Сервис</h4><ul class="space-y-2 text-gray-400 text-sm"><li><a href="#how-it-works" class="hover:text-white transition-colors">Как это работает</a></li><li><a href="#advantages" class="hover:text-white transition-colors">Преимущества</a></li><li><a href="#pricing" class="hover:text-white transition-colors">Тарифы</a></li></ul></div><div><h4 class="font-bold mb-4 text-lg">Помощь</h4><ul class="space-y-2 text-gray-400 text-sm"><li><a href="#faq" class="hover:text-white transition-colors">Частые вопросы</a></li><li><a href="https://t.me/r67_90" class="hover:text-white transition-colors">Поддержка</a></li><li><a href="#" class="hover:text-white transition-colors">Политика конфиденциальности</a></li></ul></div><div><h4 class="font-bold mb-4 text-lg">Мы в соцсетях</h4><div class="flex gap-4"><a href="https://t.me/r67_90" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.19-3.048 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"></path></svg></a></div></div></div><div class="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm"> © 2026 Offer Jet. All rights reserved. </div></div></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]), { __name: "LandingFooter" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Offer Jet - Автоотклики на вакансии hh.ru",
      meta: [
        { name: "description", content: "Найдем работу на hh.ru за вас. Автоматические отклики и сопроводительные письма." }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LandingHeader = __nuxt_component_0;
      const _component_LandingHero = __nuxt_component_1;
      const _component_LandingComparison = __nuxt_component_2;
      const _component_LandingHowItWorks = __nuxt_component_3;
      const _component_LandingAdvantages = __nuxt_component_4;
      const _component_LandingPricing = __nuxt_component_5;
      const _component_LandingFAQ = __nuxt_component_6;
      const _component_LandingFooter = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen font-sans bg-white" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_LandingHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_LandingHero, null, null, _parent));
      _push(ssrRenderComponent(_component_LandingComparison, null, null, _parent));
      _push(ssrRenderComponent(_component_LandingHowItWorks, null, null, _parent));
      _push(ssrRenderComponent(_component_LandingAdvantages, null, null, _parent));
      _push(ssrRenderComponent(_component_LandingPricing, null, null, _parent));
      _push(ssrRenderComponent(_component_LandingFAQ, null, null, _parent));
      _push(ssrRenderComponent(_component_LandingFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BrAYWnfY.mjs.map
