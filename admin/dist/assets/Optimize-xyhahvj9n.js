import { r as reactExports, R as React, _ as __vitePreload } from "../main-xyhahvj9n.js";
import { O as Overview, M as ModuleViewHeader } from "./OverviewTemplate-xyhahvj9n.js";
/* empty css                             */function OptimizeOverview({ moduleId }) {
  const [section, setSection] = reactExports.useState("about");
  return /* @__PURE__ */ React.createElement(Overview, { moduleId, noCheckbox: true, section: (val) => setSection(val), noIntegrate: true }, section === "about" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "About the module"), /* @__PURE__ */ React.createElement("p", null, "The Database Optimiser module is a great tool that helps you to get the most out of your website's performance. By automating the optimisation process in the background, you can easily ensure that your website is running at its peak."), /* @__PURE__ */ React.createElement("p", null, "The module automatically deletes post revisions, auto-draft posts and posts in the trash, thus freeing up space and resources. In addition, expired transient options and orphaned data in the database can also be cleared, allowing the system to run much more efficiently. This can significantly improve the speed and performance of your website.")), section === "faq" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "FAQ"), /* @__PURE__ */ React.createElement("p", null, "Available soon.")));
}
function Optimize({ moduleId }) {
  const [activeSection, setActiveSection] = reactExports.useState("overview");
  const SettingsModule = reactExports.lazy(() => __vitePreload(() => import("./Settings-xyhahvj9n.js"), true ? ["./Settings-xyhahvj9n.js","../main-xyhahvj9n.js","./main-xyhahvj9n.css","./datepicker-xyhahvj9n.js","./MultiSelectMenu-xyhahvj9n.js","./MultiSelectMenu-xyhahvj9n.css","./datepicker-xyhahvj9n.css","./Textarea-xyhahvj9n.js","./Switch-xyhahvj9n.js","./Switch-xyhahvj9n.css","./Settings-xyhahvj9n.css"] : void 0, import.meta.url));
  return /* @__PURE__ */ React.createElement("div", { className: "urlslab-tableView" }, /* @__PURE__ */ React.createElement(
    ModuleViewHeader,
    {
      moduleId,
      activeMenu: (activemenu) => setActiveSection(activemenu)
    }
  ), activeSection === "overview" && /* @__PURE__ */ React.createElement(OptimizeOverview, { moduleId }), activeSection === "settings" && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(SettingsModule, { className: "fadeInto", settingId: moduleId })));
}
export {
  Optimize as default
};