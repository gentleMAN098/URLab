import { r as reactExports, R as React, u as useI18n, _ as __vitePreload } from "../main-u7yqnhqprx.js";
import { O as Overview, M as ModuleViewHeader } from "./OverviewTemplate-u7yqnhqprx.js";
/* empty css                              */function RelatedResourcesOverview({ moduleId }) {
  const [section, setSection] = reactExports.useState("about");
  return /* @__PURE__ */ React.createElement(Overview, { moduleId, section: (val) => setSection(val) }, section === "about" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "About the module"), /* @__PURE__ */ React.createElement("p", null, "Internal link structure is a crucial SEO element of a successful website. It can increase website visibility, cater to visitors' needs, and boost your internal link-building. One of the best ways to create an effective internal link structure is by creating pairs of related pages, known as content clusters. This will provide additional interesting content to visitors and improve your rankings in the search engine results pages."), /* @__PURE__ */ React.createElement("p", null, "When creating related pages, it is essential to ensure they are interconnected in terms of topics and keywords. Fortunately, the AI-powered URLsLab service can help to compute the best pairs of pages with zero effort."), /* @__PURE__ */ React.createElement("p", null, "Ultimately, a properly planned internal link structure will enable search engines to crawl your website and increase its visibility easily. This will lead to more organic traffic and help your website achieve success. With the help of the URLsLab service, creating an effective internal link structure is extremely simple.")), section === "integrate" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "How to use the feature?"), /* @__PURE__ */ React.createElement("p", null, "It's almost effortless and will only take a maximum of five minutes to set up. All you have to do is add a simple shortcode to your theme template, and the module will do the rest of the work for you. Moreover, you can use a setting to conveniently append the shortcode at the end of the page or article."), /* @__PURE__ */ React.createElement("h4", null, "Shortcode"), /* @__PURE__ */ React.createElement("code", null, "[urlslab-related-resources]"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Shortcode Attributes")), /* @__PURE__ */ React.createElement("table", { border: "1" }, /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Attribute"), /* @__PURE__ */ React.createElement("th", null, "Required"), /* @__PURE__ */ React.createElement("th", null, "Description"), /* @__PURE__ */ React.createElement("th", null, "Default Value"), /* @__PURE__ */ React.createElement("th", null, "Possible Values")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "url"), /* @__PURE__ */ React.createElement("td", null, "optional"), /* @__PURE__ */ React.createElement("td", null, "URL of the page for which we are searching related articles"), /* @__PURE__ */ React.createElement("td", null, "The current URL"), /* @__PURE__ */ React.createElement("td", null, " ")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "related-count"), /* @__PURE__ */ React.createElement("td", null, "optional"), /* @__PURE__ */ React.createElement("td", null, "The number of items"), /* @__PURE__ */ React.createElement("td", null, "8"), /* @__PURE__ */ React.createElement("td", null, " ")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "show-image"), /* @__PURE__ */ React.createElement("td", null, "optional"), /* @__PURE__ */ React.createElement("td", null, "Show a screenshot of the destionation URL"), /* @__PURE__ */ React.createElement("td", null, "false"), /* @__PURE__ */ React.createElement("td", null, "true, false")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "image-size"), /* @__PURE__ */ React.createElement("td", null, "optional"), /* @__PURE__ */ React.createElement("td", null, "Define size of the screenshot image"), /* @__PURE__ */ React.createElement("td", null, "carousel-thumbnail"), /* @__PURE__ */ React.createElement("td", null, "carousel-thumbnail", /* @__PURE__ */ React.createElement("br", null), "full-page-thumbnail", /* @__PURE__ */ React.createElement("br", null), "carousel", /* @__PURE__ */ React.createElement("br", null), "full-page")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "show-summary"), /* @__PURE__ */ React.createElement("td", null, "optional"), /* @__PURE__ */ React.createElement("td", null, "Show a summary text"), /* @__PURE__ */ React.createElement("td", null, "false"), /* @__PURE__ */ React.createElement("td", null, "true, false")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "default-image"), /* @__PURE__ */ React.createElement("td", null, "optional"), /* @__PURE__ */ React.createElement("td", null, "URL of default image used until screenshot image is available"), /* @__PURE__ */ React.createElement("td", null, "-"), /* @__PURE__ */ React.createElement("td", null, " ")))), /* @__PURE__ */ React.createElement("h4", null, "Examples"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Simple Form")), /* @__PURE__ */ React.createElement("code", null, "[urlslab-related-resources]"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Complex Form")), /* @__PURE__ */ React.createElement("code", null, '[urlslab-related-resources url="https://www.liveagent.com" related-count="4" show-image="true" show-summary="true"]')), section === "faq" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "FAQ"), /* @__PURE__ */ React.createElement("p", null, "Available soon.")));
}
function RelatedResources({ moduleId }) {
  const { __ } = useI18n();
  const slug = "url-relation";
  const [activeSection, setActiveSection] = reactExports.useState("overview");
  const tableMenu = /* @__PURE__ */ new Map([
    ["url-relation", __("Related Articles")]
  ]);
  const SettingsModule = reactExports.lazy(() => __vitePreload(() => import("./Settings-u7yqnhqprx.js"), true ? ["./Settings-u7yqnhqprx.js","../main-u7yqnhqprx.js","./main-u7yqnhqprx.css","./datepicker-u7yqnhqprx.js","./MultiSelectMenu-u7yqnhqprx.js","./MultiSelectMenu-u7yqnhqprx.css","./datepicker-u7yqnhqprx.css","./Textarea-u7yqnhqprx.js","./Switch-u7yqnhqprx.js","./Switch-u7yqnhqprx.css","./Settings-u7yqnhqprx.css"] : void 0, import.meta.url));
  const URLRelationTable = reactExports.lazy(() => __vitePreload(() => import("./URLRelationTable-u7yqnhqprx.js"), true ? ["./URLRelationTable-u7yqnhqprx.js","../main-u7yqnhqprx.js","./main-u7yqnhqprx.css","./ModuleViewHeaderBottom-u7yqnhqprx.js","./datepicker-u7yqnhqprx.js","./MultiSelectMenu-u7yqnhqprx.js","./MultiSelectMenu-u7yqnhqprx.css","./datepicker-u7yqnhqprx.css","./ModuleViewHeaderBottom-u7yqnhqprx.css","./Tooltip_SortingFiltering-u7yqnhqprx.js"] : void 0, import.meta.url));
  return /* @__PURE__ */ React.createElement("div", { className: "urlslab-tableView" }, /* @__PURE__ */ React.createElement(
    ModuleViewHeader,
    {
      moduleId,
      moduleMenu: tableMenu,
      activeMenu: (activemenu) => setActiveSection(activemenu)
    }
  ), activeSection === "overview" && /* @__PURE__ */ React.createElement(RelatedResourcesOverview, { moduleId }), activeSection === "url-relation" && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(URLRelationTable, { slug })), activeSection === "settings" && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(SettingsModule, { className: "fadeInto", settingId: moduleId })));
}
export {
  RelatedResources as default
};