import { r as reactExports, R as React, u as useI18n, _ as __vitePreload } from "../main-0iyx9wg0m.js";
import { O as Overview, M as ModuleViewHeader } from "./OverviewTemplate-0iyx9wg0m.js";
/* empty css                             */function LazyLoadingOverview({ moduleId }) {
  const [section, setSection] = reactExports.useState("about");
  return /* @__PURE__ */ React.createElement(Overview, { moduleId, section: (val) => setSection(val) }, section === "about" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "About the module"), /* @__PURE__ */ React.createElement("p", null, "Lazy loading is an essential technique for optimising page performance and reducing page load time. By deferring loading of images, videos, iframes, and large content chunks, you can drastically improve the speed at which pages load. This is especially important for those with slower internet connections, who are more likely to be affected by page loading times."), /* @__PURE__ */ React.createElement("p", null, "The main idea behind lazy loading is to delay loading assets until they are actually needed. This means that instead of loading all assets simultaneously, the browser will only load them when they are visible on the user’s screen. It decreases the amount of data that needs to be transferred and therefore increases page loading speed. It also reduces server load, as the server does not have to process every asset simultaneously.")), section === "integrate" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "Video data shortcode"), /* @__PURE__ */ React.createElement("code", null, '[urlslab-video videoid="YT-video-ID" attribute="atr_name"]'), /* @__PURE__ */ React.createElement("p", null, "Supported video attribute names: title, description, thumbnail_url, published_at, duration, captions, captions_text, channel_title")), section === "faq" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "FAQ"), /* @__PURE__ */ React.createElement("p", null, "Available soon.")));
}
function LazyLoading({ moduleId }) {
  const { __ } = useI18n();
  const [activeSection, setActiveSection] = reactExports.useState("overview");
  const tableMenu = /* @__PURE__ */ new Map(
    [
      ["youtube-cache", __("YouTube Videos")],
      ["content-cache", __("Content Lazy Loading")]
    ]
  );
  const SettingsModule = reactExports.lazy(() => __vitePreload(() => import("./Settings-0iyx9wg0m.js"), true ? ["./Settings-0iyx9wg0m.js","../main-0iyx9wg0m.js","./main-0iyx9wg0m.css","./datepicker-0iyx9wg0m.js","./MultiSelectMenu-0iyx9wg0m.js","./MultiSelectMenu-0iyx9wg0m.css","./datepicker-0iyx9wg0m.css","./Textarea-0iyx9wg0m.js","./Switch-0iyx9wg0m.js","./Switch-0iyx9wg0m.css","./Settings-0iyx9wg0m.css"] : void 0, import.meta.url));
  const YouTubeCacheTable = reactExports.lazy(() => __vitePreload(() => import("./YouTubeCacheTable-0iyx9wg0m.js"), true ? ["./YouTubeCacheTable-0iyx9wg0m.js","../main-0iyx9wg0m.js","./main-0iyx9wg0m.css","./ModuleViewHeaderBottom-0iyx9wg0m.js","./datepicker-0iyx9wg0m.js","./MultiSelectMenu-0iyx9wg0m.js","./MultiSelectMenu-0iyx9wg0m.css","./datepicker-0iyx9wg0m.css","./ModuleViewHeaderBottom-0iyx9wg0m.css","./Tooltip_SortingFiltering-0iyx9wg0m.js","./icon-link-0iyx9wg0m.js","./icon-disable-0iyx9wg0m.js"] : void 0, import.meta.url));
  const ContentCacheTable = reactExports.lazy(() => __vitePreload(() => import("./ContentCacheTable-0iyx9wg0m.js"), true ? ["./ContentCacheTable-0iyx9wg0m.js","../main-0iyx9wg0m.js","./main-0iyx9wg0m.css","./ModuleViewHeaderBottom-0iyx9wg0m.js","./datepicker-0iyx9wg0m.js","./MultiSelectMenu-0iyx9wg0m.js","./MultiSelectMenu-0iyx9wg0m.css","./datepicker-0iyx9wg0m.css","./ModuleViewHeaderBottom-0iyx9wg0m.css","./Tooltip_SortingFiltering-0iyx9wg0m.js"] : void 0, import.meta.url));
  return /* @__PURE__ */ React.createElement("div", { className: "urlslab-tableView" }, /* @__PURE__ */ React.createElement(
    ModuleViewHeader,
    {
      moduleId,
      moduleMenu: tableMenu,
      activeMenu: (activemenu) => setActiveSection(activemenu)
    }
  ), activeSection === "overview" && /* @__PURE__ */ React.createElement(LazyLoadingOverview, { moduleId }), /* @__PURE__ */ React.createElement(reactExports.Suspense, null, activeSection === "youtube-cache" && /* @__PURE__ */ React.createElement(YouTubeCacheTable, { slug: "youtube-cache" }), activeSection === "content-cache" && /* @__PURE__ */ React.createElement(ContentCacheTable, { slug: "content-cache" })), activeSection === "settings" && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(SettingsModule, { className: "fadeInto", settingId: moduleId })));
}
export {
  LazyLoading as default
};