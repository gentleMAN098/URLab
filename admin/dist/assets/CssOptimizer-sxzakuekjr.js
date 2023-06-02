import { r as reactExports, R as React, u as useI18n, _ as __vitePreload } from "../main-sxzakuekjr.js";
import { O as Overview, M as ModuleViewHeader } from "./OverviewTemplate-sxzakuekjr.js";
/* empty css                              */function CssOptimizerOverview({ moduleId }) {
  const [section, setSection] = reactExports.useState("about");
  return /* @__PURE__ */ React.createElement(Overview, { moduleId, section: (val) => setSection(val), noIntegrate: true }, section === "about" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "About the module"), /* @__PURE__ */ React.createElement("p", null, "The use of inline CSS instead of external CSS files is a great way to improve page performance and reduce content-blocker requests. Inline CSS is a way to add styling directly to an HTML element, eliminating the need to make additional requests to external CSS files, thus improving page speed."), /* @__PURE__ */ React.createElement("p", null, "The content-blockers are requests that block other requests for some time during page load, and they are rapidly slowing down page performance and the grade in Core Web Vitals.")), section === "faq" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "FAQ"), /* @__PURE__ */ React.createElement("p", null, "Available soon.")));
}
function CssOptimizer({ moduleId }) {
  const { __ } = useI18n();
  const [activeSection, setActiveSection] = reactExports.useState("overview");
  const tableMenu = /* @__PURE__ */ new Map([
    ["css-cache", __("Cached CSS Files")]
  ]);
  const CSSCacheTable = reactExports.lazy(() => __vitePreload(() => import("./CSSCacheTable-sxzakuekjr.js"), true ? ["./CSSCacheTable-sxzakuekjr.js","../main-sxzakuekjr.js","./main-sxzakuekjr.css","./ModuleViewHeaderBottom-sxzakuekjr.js","./datepicker-sxzakuekjr.js","./MultiSelectMenu-sxzakuekjr.js","./MultiSelectMenu-sxzakuekjr.css","./datepicker-sxzakuekjr.css","./ModuleViewHeaderBottom-sxzakuekjr.css","./Tooltip_SortingFiltering-sxzakuekjr.js"] : void 0, import.meta.url));
  const SettingsModule = reactExports.lazy(() => __vitePreload(() => import("./Settings-sxzakuekjr.js"), true ? ["./Settings-sxzakuekjr.js","../main-sxzakuekjr.js","./main-sxzakuekjr.css","./datepicker-sxzakuekjr.js","./MultiSelectMenu-sxzakuekjr.js","./MultiSelectMenu-sxzakuekjr.css","./datepicker-sxzakuekjr.css","./Textarea-sxzakuekjr.js","./Switch-sxzakuekjr.js","./Switch-sxzakuekjr.css","./Settings-sxzakuekjr.css"] : void 0, import.meta.url));
  return /* @__PURE__ */ React.createElement("div", { className: "urlslab-tableView" }, /* @__PURE__ */ React.createElement(
    ModuleViewHeader,
    {
      moduleId,
      moduleMenu: tableMenu,
      activeMenu: (activemenu) => setActiveSection(activemenu)
    }
  ), activeSection === "overview" && /* @__PURE__ */ React.createElement(CssOptimizerOverview, { moduleId }), /* @__PURE__ */ React.createElement(reactExports.Suspense, null, activeSection === "css-cache" && /* @__PURE__ */ React.createElement(CSSCacheTable, { slug: "css-cache" })), activeSection === "settings" && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(SettingsModule, { className: "fadeInto", settingId: moduleId })));
}
export {
  CssOptimizer as default
};