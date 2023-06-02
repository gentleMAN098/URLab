import { r as reactExports, R as React, u as useI18n, _ as __vitePreload } from "../main-sxzakuekjr.js";
import { O as Overview, M as ModuleViewHeader } from "./OverviewTemplate-sxzakuekjr.js";
/* empty css                              */function MediaOffloaderOverview({ moduleId }) {
  const [section, setSection] = reactExports.useState("about");
  return /* @__PURE__ */ React.createElement(Overview, { moduleId, section: (val) => setSection(val), noIntegrate: true }, section === "about" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "About the module"), /* @__PURE__ */ React.createElement("p", null, "The Media Manager module can be a great tool for improving the performance of any website. With its automatic image enhancement, it can make images smaller while also offloading them to the cloud or a database. This will help reduce the load time when a user accesses a website. In addition to this, it can also generate modern image formats such as WebP and Avif, which are more efficient and provide better compression ratios."), /* @__PURE__ */ React.createElement("p", null, "Moreover, it can also help with SEO by automatically removing broken images from the content, thus improving the overall experience for the users. It can be a great way to ensure your website is optimised and running at its best.")), section === "faq" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "FAQ"), /* @__PURE__ */ React.createElement("p", null, "Available soon.")));
}
function MediaOffloader({ moduleId }) {
  const { __ } = useI18n();
  const [activeSection, setActiveSection] = reactExports.useState("overview");
  const slug = "file";
  const tableMenu = /* @__PURE__ */ new Map([
    [slug, __("Media Files")]
  ]);
  const SettingsModule = reactExports.lazy(() => __vitePreload(() => import("./Settings-sxzakuekjr.js"), true ? ["./Settings-sxzakuekjr.js","../main-sxzakuekjr.js","./main-sxzakuekjr.css","./datepicker-sxzakuekjr.js","./MultiSelectMenu-sxzakuekjr.js","./MultiSelectMenu-sxzakuekjr.css","./datepicker-sxzakuekjr.css","./Textarea-sxzakuekjr.js","./Switch-sxzakuekjr.js","./Switch-sxzakuekjr.css","./Settings-sxzakuekjr.css"] : void 0, import.meta.url));
  const MediaFilesTable = reactExports.lazy(() => __vitePreload(() => import("./MediaFilesTable-sxzakuekjr.js"), true ? ["./MediaFilesTable-sxzakuekjr.js","../main-sxzakuekjr.js","./main-sxzakuekjr.css","./ModuleViewHeaderBottom-sxzakuekjr.js","./datepicker-sxzakuekjr.js","./MultiSelectMenu-sxzakuekjr.js","./MultiSelectMenu-sxzakuekjr.css","./datepicker-sxzakuekjr.css","./ModuleViewHeaderBottom-sxzakuekjr.css","./TagsMenu-sxzakuekjr.js","./Tooltip_SortingFiltering-sxzakuekjr.js","./icon-link-sxzakuekjr.js"] : void 0, import.meta.url));
  return /* @__PURE__ */ React.createElement("div", { className: "urlslab-tableView" }, /* @__PURE__ */ React.createElement(
    ModuleViewHeader,
    {
      moduleId,
      moduleMenu: tableMenu,
      activeMenu: (activemenu) => setActiveSection(activemenu)
    }
  ), activeSection === "overview" && /* @__PURE__ */ React.createElement(MediaOffloaderOverview, { moduleId }), activeSection === slug && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(MediaFilesTable, { slug })), activeSection === "settings" && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(SettingsModule, { className: "fadeInto", settingId: moduleId })));
}
export {
  MediaOffloader as default
};