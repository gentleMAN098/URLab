import { R as React, u as useI18n, r as reactExports, _ as __vitePreload } from "../main-a9krkhis5r.js";
import { M as ModuleViewHeader, O as Overview } from "./ModuleViewHeader-a9krkhis5r.js";
import "./api-exclamation-a9krkhis5r.js";
/* empty css                              */function MediaOffloaderOverview() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "The Media Manager module can be a great tool for improving the performance of any website. With its automatic image enhancement, it can make images smaller while also offloading them to the cloud or a database. This will help reduce the load time when a user accesses a website. In addition to this, it can also generate modern image formats such as WebP and Avif, which are more efficient and provide better compression ratios."), /* @__PURE__ */ React.createElement("p", null, "Moreover, it can also help with SEO by automatically removing broken images from the content, thus improving the overall experience for the users. It can be a great way to ensure your website is optimized and running at its best."));
}
function MediaOffloader({ moduleId }) {
  const { __ } = useI18n();
  const [activeSection, setActiveSection] = reactExports.useState("overview");
  const slug = "file";
  const tableMenu = /* @__PURE__ */ new Map([
    [slug, __("Media Files")]
  ]);
  const SettingsModule = reactExports.lazy(() => __vitePreload(() => import("./Settings-a9krkhis5r.js"), true ? ["./Settings-a9krkhis5r.js","../main-a9krkhis5r.js","./main.css","./Tooltip-a9krkhis5r.js","./Tooltip-a9krkhis5r.css","./Switch-a9krkhis5r.js","./Switch-a9krkhis5r.css","./useMutation-a9krkhis5r.js","./Settings-a9krkhis5r.css"] : void 0, import.meta.url));
  const MediaFilesTable = reactExports.lazy(() => __vitePreload(() => import("./MediaFilesTable-a9krkhis5r.js"), true ? ["./MediaFilesTable-a9krkhis5r.js","../main-a9krkhis5r.js","./main.css","./useTableUpdater-a9krkhis5r.js","./Tooltip-a9krkhis5r.js","./Tooltip-a9krkhis5r.css","./useMutation-a9krkhis5r.js","./useTableUpdater-a9krkhis5r.css","./icon-link-a9krkhis5r.js"] : void 0, import.meta.url));
  return /* @__PURE__ */ React.createElement("div", { className: "urlslab-tableView" }, /* @__PURE__ */ React.createElement(ModuleViewHeader, { moduleMenu: tableMenu, activeMenu: (activemenu) => setActiveSection(activemenu) }), activeSection === "overview" && /* @__PURE__ */ React.createElement(Overview, { moduleId }, /* @__PURE__ */ React.createElement(MediaOffloaderOverview, null)), activeSection === slug && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(MediaFilesTable, { slug })), activeSection === "settings" && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(SettingsModule, { className: "fadeInto", settingId: moduleId })));
}
export {
  MediaOffloader as default
};