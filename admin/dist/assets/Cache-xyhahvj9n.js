import { r as reactExports, R as React, u as useI18n, _ as __vitePreload } from "../main-xyhahvj9n.js";
import { O as Overview, M as ModuleViewHeader } from "./OverviewTemplate-xyhahvj9n.js";
/* empty css                             */function CacheOverview({ moduleId }) {
  const [section, setSection] = reactExports.useState("about");
  return /* @__PURE__ */ React.createElement(Overview, { moduleId, section: (val) => setSection(val), noIntegrate: true }, section === "about" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "About the module"), /* @__PURE__ */ React.createElement("p", null, "Our state-of-the-art caching module, meticulously engineered to dramatically boost your website's loading speed and overall performance. Our cutting-edge solution guarantees that your end-users will enjoy a seamless browsing experience, devoid of any delays. Harnessing sophisticated caching techniques, frequently accessed files, images, and pages on your website will be stored and instantly available, significantly reducing load times."), /* @__PURE__ */ React.createElement("p", null, "At the heart of our caching module lies an intelligent system that pinpoints the most commonly requested resources on your website and effectively stores them. This eradicates the need for redundant data retrieval from the server, ultimately decreasing server load and bandwidth usage."), /* @__PURE__ */ React.createElement("p", null, "Furthermore, our highly adaptable module empowers you to effortlessly configure and fine-tune caching rules in accordance with your website's unique needs. By allowing complete customization, our module ensures optimal performance while catering to individual requirements, making it an indispensable tool for enhancing your online presence.")), section === "faq" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "FAQ"), /* @__PURE__ */ React.createElement("p", null, "Available soon.")));
}
function Cache({ moduleId }) {
  const { __ } = useI18n();
  const [activeSection, setActiveSection] = reactExports.useState("overview");
  const tableMenu = /* @__PURE__ */ new Map([
    ["cache-rules", __("Cache Rules")]
  ]);
  const SettingsModule = reactExports.lazy(() => __vitePreload(() => import("./Settings-xyhahvj9n.js"), true ? ["./Settings-xyhahvj9n.js","../main-xyhahvj9n.js","./main-xyhahvj9n.css","./datepicker-xyhahvj9n.js","./MultiSelectMenu-xyhahvj9n.js","./MultiSelectMenu-xyhahvj9n.css","./datepicker-xyhahvj9n.css","./Textarea-xyhahvj9n.js","./Switch-xyhahvj9n.js","./Switch-xyhahvj9n.css","./Settings-xyhahvj9n.css"] : void 0, import.meta.url));
  const CacheRulesTable = reactExports.lazy(() => __vitePreload(() => import("./CacheRulesTable-xyhahvj9n.js"), true ? ["./CacheRulesTable-xyhahvj9n.js","../main-xyhahvj9n.js","./main-xyhahvj9n.css","./ModuleViewHeaderBottom-xyhahvj9n.js","./datepicker-xyhahvj9n.js","./MultiSelectMenu-xyhahvj9n.js","./MultiSelectMenu-xyhahvj9n.css","./datepicker-xyhahvj9n.css","./ModuleViewHeaderBottom-xyhahvj9n.css","./TagsMenu-xyhahvj9n.js","./Tooltip_SortingFiltering-xyhahvj9n.js","./icon-edit-xyhahvj9n.js"] : void 0, import.meta.url));
  return /* @__PURE__ */ React.createElement("div", { className: "urlslab-tableView" }, /* @__PURE__ */ React.createElement(
    ModuleViewHeader,
    {
      moduleId,
      moduleMenu: tableMenu,
      activeMenu: (activemenu) => setActiveSection(activemenu)
    }
  ), activeSection === "overview" && /* @__PURE__ */ React.createElement(CacheOverview, { moduleId }), activeSection === "cache-rules" && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(CacheRulesTable, { slug: "cache-rules" })), activeSection === "settings" && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(SettingsModule, { className: "fadeInto", settingId: moduleId })));
}
export {
  Cache as default
};