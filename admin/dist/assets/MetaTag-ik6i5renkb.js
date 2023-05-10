import { R as React, u as useI18n, r as reactExports, _ as __vitePreload } from "../main-ik6i5renkb.js";
import { M as ModuleViewHeader, O as Overview } from "./ModuleViewHeader-ik6i5renkb.js";
import "./api-exclamation-ik6i5renkb.js";
/* empty css                              */function MetaTagOverview() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "Open Graph and Twitter meta tags are essential for improving your content’s reach and shareability on social media. They enable your content to be displayed in an attractive and eye-catching way that will draw in readers and encourage them to share it with their networks. The Meta Tags Manager module allows you to specify the title, description, image, and other details displayed when someone shares your content on Facebook, Twitter, or other social media platforms."), /* @__PURE__ */ React.createElement("p", null, "In addition, the module can generate an enhanced page summary as a description. This is an excellent way to add more information about your page that can boost your SEO ranking. It can also be used to provide a brief overview of what the page is about, which can help to attract potential visitors."));
}
function MetaTag({ moduleId }) {
  const { __ } = useI18n();
  const [activeSection, setActiveSection] = reactExports.useState("overview");
  const slug = "metatag";
  const tableMenu = /* @__PURE__ */ new Map([
    [slug, __("Meta tags")]
  ]);
  const MetaTagsTable = reactExports.lazy(() => __vitePreload(() => import("./MetaTagsTable-ik6i5renkb.js"), true ? ["./MetaTagsTable-ik6i5renkb.js","../main-ik6i5renkb.js","./main.css","./useTableUpdater-ik6i5renkb.js","./_ColumnsMenu-ik6i5renkb.js","./_ColumnsMenu-ik6i5renkb.css","./InputField-ik6i5renkb.js","./datepicker-ik6i5renkb.css","./useMutation-ik6i5renkb.js","./DateTimeFormat-ik6i5renkb.js","./TagsMenu-ik6i5renkb.js","./Tooltip_SortingFiltering-ik6i5renkb.js"] : void 0, import.meta.url));
  const SettingsModule = reactExports.lazy(() => __vitePreload(() => import("./Settings-ik6i5renkb.js"), true ? ["./Settings-ik6i5renkb.js","../main-ik6i5renkb.js","./main.css","./InputField-ik6i5renkb.js","./datepicker-ik6i5renkb.css","./Switch-ik6i5renkb.js","./Switch-ik6i5renkb.css","./useMutation-ik6i5renkb.js","./Settings-ik6i5renkb.css"] : void 0, import.meta.url));
  return /* @__PURE__ */ React.createElement("div", { className: "urlslab-tableView" }, /* @__PURE__ */ React.createElement(ModuleViewHeader, { moduleMenu: tableMenu, activeMenu: (activemenu) => setActiveSection(activemenu) }), activeSection === "overview" && /* @__PURE__ */ React.createElement(Overview, { moduleId }, /* @__PURE__ */ React.createElement(MetaTagOverview, null)), activeSection === slug && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(MetaTagsTable, { slug })), activeSection === "settings" && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(SettingsModule, { className: "fadeInto", settingId: moduleId })));
}
export {
  MetaTag as default
};