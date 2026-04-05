import { defineComponent, ref, computed, mergeProps, unref, reactive, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { c as useRuntimeConfig, n as navigateTo } from './server.mjs';
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

const useDistributions = () => {
  const distributions = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const user = ref(null);
  const config = useRuntimeConfig();
  const API_BASE = config.public.apiBase || "/api";
  const fetchDistributions = async () => {
    loading.value = true;
    error.value = null;
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(`${API_BASE}/distributions`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      if (!response.ok) {
        if (response.status === 401) {
          navigateTo("/signin");
          return;
        }
        throw new Error("Failed to fetch distributions");
      }
      const data = await response.json();
      distributions.value = data.data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(`${API_BASE}/user`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      if (response.ok) {
        user.value = await response.json();
      }
    } catch (err) {
      console.error("Failed to fetch user profile", err);
    }
  };
  const createDistribution = async (data) => {
    loading.value = true;
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(`${API_BASE}/distributions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error("Failed to create distribution");
      await fetchDistributions();
      return true;
    } catch (err) {
      error.value = err.message;
      return false;
    } finally {
      loading.value = false;
    }
  };
  const updateDistribution = async (id, data) => {
    loading.value = true;
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(`${API_BASE}/distributions/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error("Failed to update distribution");
      await fetchDistributions();
      return true;
    } catch (err) {
      error.value = err.message;
      return false;
    } finally {
      loading.value = false;
    }
  };
  const deleteDistribution = async (id) => {
    loading.value = true;
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(`${API_BASE}/distributions/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      if (!response.ok) throw new Error("Failed to delete distribution");
      distributions.value = distributions.value.filter((d) => d.id !== id);
      return true;
    } catch (err) {
      error.value = err.message;
      return false;
    } finally {
      loading.value = false;
    }
  };
  return {
    distributions,
    loading,
    error,
    user,
    fetchDistributions,
    fetchUserProfile,
    createDistribution,
    updateDistribution,
    deleteDistribution
  };
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "StatsCard",
  __ssrInlineRender: true,
  props: {
    label: {},
    value: {},
    iconBg: {},
    iconColor: {},
    svgPath: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 transition-all hover:border-brand-primary/20" }, _attrs))}><div class="flex items-center justify-between"><div><p class="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1 uppercase tracking-wider font-semibold">${ssrInterpolate(__props.label)}</p><p class="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">${ssrInterpolate(__props.value)}</p></div><div class="${ssrRenderClass(["w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-transform hover:scale-110", __props.iconBg])}"><svg class="${ssrRenderClass(["w-5 h-5 sm:w-6 sm:h-6", __props.iconColor])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${ssrRenderAttr("d", __props.svgPath)}></path></svg></div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Dashboard/StatsCard.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const StatsCard = Object.assign(_sfc_main$4, { __name: "DashboardStatsCard" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DistributionCard",
  __ssrInlineRender: true,
  props: {
    distribution: {}
  },
  emits: ["edit", "delete", "toggle-status"],
  setup(__props) {
    const props = __props;
    const progress = computed(() => {
      if (props.distribution.target_applications === 0) return 0;
      return Math.min(100, props.distribution.applications_sent / props.distribution.target_applications * 100);
    });
    const statusText = computed(() => {
      const map = {
        active: "Активна",
        paused: "Пауза",
        completed: "Завершена",
        failed: "Ошибка"
      };
      return map[props.distribution.status] || props.distribution.status;
    });
    const statusClasses = computed(() => {
      const map = {
        active: "bg-green-100 text-green-700",
        paused: "bg-yellow-100 text-yellow-700",
        completed: "bg-gray-100 text-gray-700",
        failed: "bg-red-100 text-red-700"
      };
      return map[props.distribution.status] || "bg-gray-100 text-gray-700";
    });
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow" }, _attrs))}><div class="flex items-start justify-between mb-4"><div class="flex-1 min-w-0"><div class="flex flex-wrap items-center gap-2 mb-2"><span class="${ssrRenderClass([statusClasses.value, "px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap"])}">${ssrInterpolate(statusText.value)}</span><span class="text-[11px] sm:text-sm text-gray-400">${ssrInterpolate(formatDate(props.distribution.created_at))}</span></div><div class="text-xs sm:text-sm text-gray-600 truncate pr-2"><span class="font-medium">Резюме:</span><a${ssrRenderAttr("href", props.distribution.resume_link)} target="_blank" class="text-brand-primary hover:underline ml-1">${ssrInterpolate(props.distribution.resume_link)}</a></div>`);
      if (props.distribution.search_filters?.query) {
        _push(`<div class="text-xs sm:text-sm text-gray-500 mt-1 truncate pr-2"><span class="font-medium text-gray-600">Поиск:</span> ${ssrInterpolate(props.distribution.search_filters.query)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (props.distribution.cover_letter) {
        _push(`<div class="text-[11px] sm:text-sm text-gray-500 mt-1.5 flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> Письмо прикреплено </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative group"><button class="text-gray-400 hover:text-gray-600 p-1"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg></button><div class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 hidden group-focus-within:block z-10"><button class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"> Изменить </button><button class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">${ssrInterpolate(props.distribution.status === "active" ? "Пауза" : "Запустить")}</button><div class="border-t border-gray-100 my-1"></div><button class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"> Удалить </button></div></div></div><div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4"><div class="bg-gray-50/50 p-2.5 rounded-xl"><p class="text-[10px] sm:text-xs text-gray-400 mb-0.5 uppercase tracking-wider font-bold">Цель</p><p class="text-base sm:text-lg font-bold text-gray-900 leading-none">${ssrInterpolate(props.distribution.target_applications)}</p></div></div><div class="w-full bg-gray-200 rounded-full h-1.5 sm:h-2"><div class="bg-brand-primary h-1.5 sm:h-2 rounded-full transition-all" style="${ssrRenderStyle({ width: `${progress.value}%` })}"></div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Distribution/DistributionCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const DistributionCard = Object.assign(_sfc_main$3, { __name: "DistributionCard" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DistributionForm",
  __ssrInlineRender: true,
  props: {
    distribution: {},
    user: {},
    isOpen: { type: Boolean },
    loading: { type: Boolean },
    error: {}
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const form = reactive({
      resume_link: "",
      query: "",
      target_applications: 40,
      daily_limit: 10,
      status: "active",
      cover_letter: ""
    });
    const maxApplications = computed(() => {
      return props.user?.tier === "pro" ? 200 : 40;
    });
    watch(() => props.distribution, (newVal) => {
      if (newVal) {
        form.resume_link = newVal.resume_link;
        form.query = newVal.search_filters?.query || "";
        form.target_applications = newVal.target_applications;
        form.daily_limit = newVal.daily_limit || 10;
        form.status = newVal.status;
        form.cover_letter = newVal.cover_letter || "";
      } else {
        form.resume_link = "";
        form.query = "";
        form.target_applications = 40;
        form.daily_limit = 10;
        form.status = "active";
        form.cover_letter = "";
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      if (props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50 overflow-y-auto transition-all" }, _attrs))}><div class="bg-white rounded-t-3xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative animate-in slide-in-from-bottom duration-300 sm:animate-in sm:zoom-in-95 sm:duration-200"><div class="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden"></div><h2 class="text-xl sm:text-2xl font-bold mb-6 text-gray-900">${ssrInterpolate(props.distribution ? "Редактировать" : "Новая рассылка")}</h2><form class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Ссылка на резюме (HH.ru)</label><input${ssrRenderAttr("value", form.resume_link)} type="url" required placeholder="https://hh.ru/resume/..." class="w-full px-4 py-2 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Поисковый запрос</label><input${ssrRenderAttr("value", form.query)} type="text" required placeholder="например, Frontend Developer" class="w-full px-4 py-2 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all"></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Количество откликов (цель) <span class="text-xs font-normal text-gray-500 ml-1">(макс. ${ssrInterpolate(maxApplications.value)})</span></label><input${ssrRenderAttr("value", form.target_applications)} type="number" min="1"${ssrRenderAttr("max", maxApplications.value)} required class="w-full px-4 py-2 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all"></div><div class="grid grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Дневной лимит</label><input${ssrRenderAttr("value", form.daily_limit)} type="number" min="1"${ssrRenderAttr("max", maxApplications.value)} class="w-full px-4 py-2 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Статус</label><select class="w-full px-4 py-2 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all"><option value="active"${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "active") : ssrLooseEqual(form.status, "active")) ? " selected" : ""}>Активна</option><option value="paused"${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "paused") : ssrLooseEqual(form.status, "paused")) ? " selected" : ""}>Пауза</option></select></div></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Сопроводительное письмо</label><textarea rows="4" placeholder="Ваше сопроводительное письмо..." class="w-full px-4 py-2 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all resize-none">${ssrInterpolate(form.cover_letter)}</textarea></div>`);
        if (props.error) {
          _push(`<div class="text-sm text-red-600 bg-red-50 p-3 rounded-xl">${ssrInterpolate(props.error)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex gap-3 pt-4"><button type="button" class="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"> Отмена </button><button type="submit"${ssrIncludeBooleanAttr(props.loading) ? " disabled" : ""} class="flex-1 py-3 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-green-100 disabled:opacity-50">${ssrInterpolate(props.loading ? "Сохранение..." : props.distribution ? "Обновить" : "Создать")}</button></div></form><button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 sm:p-0"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Distribution/DistributionForm.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const DistributionForm = Object.assign(_sfc_main$2, { __name: "DistributionForm" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DeleteConfirmModal",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean },
    loading: { type: Boolean }
  },
  emits: ["close", "confirm"],
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      if (props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50 transition-all" }, _attrs))}><div class="bg-white rounded-t-3xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-sm shadow-2xl animate-in slide-in-from-bottom duration-300 sm:animate-in sm:zoom-in-95 sm:duration-200"><div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></div><h3 class="text-xl font-bold text-gray-900 text-center mb-2">Удалить рассылку</h3><p class="text-gray-600 text-center mb-6">Вы уверены, что хотите удалить эту рассылку? Это действие нельзя будет отменить.</p><div class="flex gap-3"><button class="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"> Отмена </button><button${ssrIncludeBooleanAttr(props.loading) ? " disabled" : ""} class="flex-1 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all disabled:opacity-50">${ssrInterpolate(props.loading ? "Удаление..." : "Удалить")}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Distribution/DeleteConfirmModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const DeleteConfirmModal = Object.assign(_sfc_main$1, { __name: "DistributionDeleteConfirmModal" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      distributions,
      loading,
      error,
      deleteDistribution,
      createDistribution,
      updateDistribution,
      user
    } = useDistributions();
    const showFormModal = ref(false);
    const showDeleteModal = ref(false);
    const editingDistribution = ref(null);
    const distributionToDeleteId = ref(null);
    const activeCount = computed(
      () => distributions.value.filter((d) => d.status === "active").length
    );
    computed(
      () => distributions.value.reduce((sum, d) => sum + d.applications_sent, 0)
    );
    computed(
      () => distributions.value.reduce((sum, d) => sum + d.responses_count, 0)
    );
    const openEditModal = (dist) => {
      editingDistribution.value = dist;
      showFormModal.value = true;
    };
    const confirmDelete = (id) => {
      distributionToDeleteId.value = id;
      showDeleteModal.value = true;
    };
    const handleSave = async (data) => {
      let success = false;
      if (editingDistribution.value) {
        success = await updateDistribution(editingDistribution.value.id, data);
      } else {
        success = await createDistribution(data);
      }
      if (success) {
        showFormModal.value = false;
      }
    };
    const handleDelete = async () => {
      if (distributionToDeleteId.value) {
        const success = await deleteDistribution(distributionToDeleteId.value);
        if (success) {
          showDeleteModal.value = false;
          distributionToDeleteId.value = null;
        }
      }
    };
    const handleToggleStatus = async (dist) => {
      const newStatus = dist.status === "active" ? "paused" : "active";
      await updateDistribution(dist.id, { status: newStatus });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><header class="bg-white border-b border-gray-200 sticky top-0 z-40"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4"><div class="flex justify-between items-center"><div class="flex items-center gap-2 sm:gap-3"><div class="w-8 h-8 sm:w-10 sm:h-10 bg-brand-primary rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-sm shadow-green-100"> ✈️ </div><h1 class="text-xl sm:text-2xl font-bold text-gray-900 truncate">Панель</h1></div><button class="text-xs sm:text-sm text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl transition-colors"> Выйти </button></div></div></header><main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">`);
      _push(ssrRenderComponent(StatsCard, {
        label: "Активные рассылки",
        value: activeCount.value,
        "icon-bg": "bg-green-100",
        "icon-color": "text-green-600",
        "svg-path": "M13 10V3L4 14h7v7l9-11h-7z"
      }, null, _parent));
      _push(`</div><div class="mb-6"><button class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-green-200 active:scale-95 text-base sm:text-sm"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> Создать рассылку </button></div>`);
      if (unref(error)) {
        _push(`<div class="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 flex items-center gap-3"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(loading) && !unref(distributions).length) {
        _push(`<div class="text-center py-12"><div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-brand-primary"></div></div>`);
      } else if (unref(distributions).length === 0) {
        _push(`<div class="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100"><div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg></div><h3 class="text-lg font-semibold text-gray-900 mb-2">Активных рассылок нет</h3><p class="text-gray-600 mb-6">Создайте свою первую рассылку, чтобы запустить автоматическую отправку откликов</p><button class="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-primary/90 transition-all"> Создать рассылку </button></div>`);
      } else {
        _push(`<div class="grid gap-4"><!--[-->`);
        ssrRenderList(unref(distributions), (dist) => {
          _push(ssrRenderComponent(DistributionCard, {
            key: dist.id,
            distribution: dist,
            onEdit: openEditModal,
            onDelete: confirmDelete,
            onToggleStatus: handleToggleStatus
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</main>`);
      _push(ssrRenderComponent(DistributionForm, {
        "is-open": showFormModal.value,
        distribution: editingDistribution.value,
        user: unref(user),
        loading: unref(loading),
        error: unref(error),
        onClose: ($event) => showFormModal.value = false,
        onSave: handleSave
      }, null, _parent));
      _push(ssrRenderComponent(DeleteConfirmModal, {
        "is-open": showDeleteModal.value,
        loading: unref(loading),
        onClose: ($event) => showDeleteModal.value = false,
        onConfirm: handleDelete
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-J3yP0f6R.mjs.map
