import { r as reactExports, R as React, u as useI18n, _ as __vitePreload } from "../main-yqr1c0iv4jl.js";
import { O as Overview, M as ModuleViewHeader } from "./OverviewTemplate-yqr1c0iv4jl.js";
/* empty css                               */import "./Checkbox-yqr1c0iv4jl.js";
function SearchAndReplaceOverview({ moduleId }) {
  const [section, setSection] = reactExports.useState("about");
  return /* @__PURE__ */ React.createElement(Overview, { moduleId, section: (val) => setSection(val), noIntegrate: true }, section === "about" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "About the module"), /* @__PURE__ */ React.createElement("p", null, "The Search and Replace module is a potent and convenient tool that can save you time and frustration by automatically mass-replacing URLs and content on the fly. This is a great way to resolve any issues with the content quickly. Even better, all the changes that are made are completely reversible. No need to worry about making any permanent changes to the database or anything else; all the alterations can be undone with a single click."), /* @__PURE__ */ React.createElement("p", null, "Overall, the module is also incredibly versatile and can be used for various purposes. From replacing incorrect URLs in the content to correcting typos and other mistakes, the module can do it all. With such a wide range of capabilities, the Search and Replace module is an invaluable tool for anyone who needs to quickly and effectively make changes in the content.")), section === "faq" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "FAQ"), /* @__PURE__ */ React.createElement("p", null, "Available soon.")));
}
function SearchAndReplace({ moduleId }) {
  const { __ } = useI18n();
  const [activeSection, setActiveSection] = reactExports.useState("overview");
  const slug = "search-replace";
  const tableMenu = /* @__PURE__ */ new Map([
    [slug, __("Replacements")]
  ]);
  const SearchReplaceTable = reactExports.lazy(() => __vitePreload(() => import("./SearchReplaceTable-yqr1c0iv4jl.js"), true ? ["./SearchReplaceTable-yqr1c0iv4jl.js","../main-yqr1c0iv4jl.js","./main-yqr1c0iv4jl.css","./ModuleViewHeaderBottom-yqr1c0iv4jl.js","./datepicker-yqr1c0iv4jl.js","./MultiSelectMenu-yqr1c0iv4jl.js","./Checkbox-yqr1c0iv4jl.js","./Checkbox-yqr1c0iv4jl.css","./MultiSelectMenu-yqr1c0iv4jl.css","./datepicker-yqr1c0iv4jl.css","./ModuleViewHeaderBottom-yqr1c0iv4jl.css","./TagsMenu-yqr1c0iv4jl.js","./Tooltip_SortingFiltering-yqr1c0iv4jl.js","./icon-edit-yqr1c0iv4jl.js","./transform-yqr1c0iv4jl.js"] : void 0, import.meta.url));
  return /* @__PURE__ */ React.createElement("div", { className: "urlslab-tableView" }, /* @__PURE__ */ React.createElement(
    ModuleViewHeader,
    {
      noSettings: true,
      moduleMenu: tableMenu,
      activeMenu: (activemenu) => setActiveSection(activemenu)
    }
  ), activeSection === "overview" && /* @__PURE__ */ React.createElement(SearchAndReplaceOverview, { moduleId }), activeSection === slug && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(SearchReplaceTable, { slug })));
}
export {
  SearchAndReplace as default
};