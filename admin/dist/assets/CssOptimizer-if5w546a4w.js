import { R as React, u as useI18n, r as reactExports, _ as __vitePreload } from "../main-if5w546a4w.js";
import { M as ModuleViewHeader, O as Overview } from "./ModuleViewHeader-if5w546a4w.js";
/* empty css                              */function CssOptimizerOverview() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "The use of inline CSS instead of external CSS files is a great way to improve page performance and reduce content-blocker requests. Inline CSS is a way to add styling directly to an HTML element, eliminating the need to make additional requests to external CSS files, thus improving page speed."), /* @__PURE__ */ React.createElement("p", null, "The content-blockers are requests that block other requests for some time during page load, and they are rapidly slowing down page performance and the grade in Core Web Vitals."));
}
function CssOptimizer({ moduleId }) {
  const { __ } = useI18n();
  const [activeSection, setActiveSection] = reactExports.useState("overview");
  const tableMenu = /* @__PURE__ */ new Map([
    ["css-cache", __("Cached CSS Files")]
  ]);
  const CSSCacheTable = reactExports.lazy(() => __vitePreload(() => import("./CSSCacheTable-if5w546a4w.js"), true ? ["./CSSCacheTable-if5w546a4w.js","../main-if5w546a4w.js","./main-if5w546a4w.css","./useTableUpdater-if5w546a4w.js","./_ColumnsMenu-if5w546a4w.js","./_ColumnsMenu-if5w546a4w.css","./InputField-if5w546a4w.js","./datepicker-if5w546a4w.css","./useMutation-if5w546a4w.js","./Tooltip_SortingFiltering-if5w546a4w.js"] : void 0, import.meta.url));
  const SettingsModule = reactExports.lazy(() => __vitePreload(() => import("./Settings-if5w546a4w.js"), true ? ["./Settings-if5w546a4w.js","../main-if5w546a4w.js","./main-if5w546a4w.css","./InputField-if5w546a4w.js","./datepicker-if5w546a4w.css","./Switch-if5w546a4w.js","./Switch-if5w546a4w.css","./useMutation-if5w546a4w.js","./Settings-if5w546a4w.css"] : void 0, import.meta.url));
  return /* @__PURE__ */ React.createElement("div", { className: "urlslab-tableView" }, /* @__PURE__ */ React.createElement(ModuleViewHeader, { moduleMenu: tableMenu, activeMenu: (activemenu) => setActiveSection(activemenu) }), activeSection === "overview" && /* @__PURE__ */ React.createElement(Overview, { moduleId }, /* @__PURE__ */ React.createElement(CssOptimizerOverview, null)), /* @__PURE__ */ React.createElement(reactExports.Suspense, null, activeSection === "css-cache" && /* @__PURE__ */ React.createElement(CSSCacheTable, { slug: "css-cache" })), activeSection === "settings" && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(SettingsModule, { className: "fadeInto", settingId: moduleId })));
}
export {
  CssOptimizer as default
};