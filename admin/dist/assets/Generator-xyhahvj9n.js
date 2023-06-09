import { r as reactExports, R as React, u as useI18n, _ as __vitePreload } from "../main-xyhahvj9n.js";
import { O as Overview, M as ModuleViewHeader } from "./OverviewTemplate-xyhahvj9n.js";
/* empty css                             */function GeneratorOverview({ moduleId }) {
  const [section, setSection] = reactExports.useState("about");
  return /* @__PURE__ */ React.createElement(Overview, { moduleId, section: (val) => setSection(val) }, section === "about" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "About the module"), /* @__PURE__ */ React.createElement("p", null, "Discover the ultimate solution to elevating your website's content with our state-of-the-art AI-powered module. Designed to simplify and streamline content creation, our module generates unique and engaging text tailored to your specific needs. With the intuitive shortcode or Gutenberg block integration, crafting captivating content has never been easier."), /* @__PURE__ */ React.createElement("p", null, "Harnessing the power of the advanced GPT model version 4 or older 3.5, our plugin ensures top-notch quality and seamless adaptability for your site. Say goodbye to time-consuming content generation and writer's block, as our AI module takes care of all your content needs with ease."), /* @__PURE__ */ React.createElement("p", null, "Upgrade your website today with our AI-driven module and experience the unparalleled benefits of dynamic, high-quality content that not only captivates your audience but also enhances your site's SEO performance. Don't settle for subpar content – step into the future of web copywriting with our groundbreaking module.")), section === "integrate" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "Shortcode"), /* @__PURE__ */ React.createElement("code", null, '[urlslab-generator id="1"]'), "Supported variables:", /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "id - The ID of the generator to use. Required in shortcode."), /* @__PURE__ */ React.createElement("li", null, "template - Name of HTML tamplate to use to visualize generated value. Leave empty of the value should be returned as simple text"), /* @__PURE__ */ React.createElement("li", null, "value - Value variable is used in the template as: ", "{{", "value", "}}"), /* @__PURE__ */ React.createElement("li", null, "page_url - ", "{{", "page_url", "}}", " variable can be used in prompt, url filter or template"), /* @__PURE__ */ React.createElement("li", null, "page_title - ", "{{", "page_title", "}}", " variable can be used in prompt, url filter or template"), /* @__PURE__ */ React.createElement("li", null, "domain - ", "{{", "domain", "}}", " variable can be used in prompt, url filter or template"), /* @__PURE__ */ React.createElement("li", null, "language_code - ", "{{", "language_code", "}}", " variable can be used in prompt, url filter or template"), /* @__PURE__ */ React.createElement("li", null, "language - ", "{{", "language", "}}", " variable can be used in prompt, url filter or template"), /* @__PURE__ */ React.createElement("li", null, "video_captions - ", "{{", "video_captions", "}}", " Video captions with time stamps, variable can be used if variable videoid is set in attributes of shortcode"), /* @__PURE__ */ React.createElement("li", null, "video_captions_text - ", "{{", "video_captions", "}}", " variable can be used if variable videoid is set in attributes of shortcode"), /* @__PURE__ */ React.createElement("li", null, "video_title - ", "{{", "video_title", "}}", " variable can be used if variable videoid is set in attributes of shortcode"), /* @__PURE__ */ React.createElement("li", null, "video_description - ", "{{", "video_description", "}}", " variable can be used if variable videoid is set in attributes of shortcode"), /* @__PURE__ */ React.createElement("li", null, "video_published_at - ", "{{", "video_published_at", "}}", " variable can be used if variable videoid is set in attributes of shortcode"), /* @__PURE__ */ React.createElement("li", null, "video_duration - ", "{{", "video_duration", "}}", " variable can be used if variable videoid is set in attributes of shortcode"), /* @__PURE__ */ React.createElement("li", null, "video_channel_title - ", "{{", "video_channel_title", "}}", " variable can be used if variable videoid is set in attributes of shortcode"), /* @__PURE__ */ React.createElement("li", null, "video_tags - ", "{{", "video_tags", "}}", " variable can be used if variable videoid is set in attributes of shortcode"), "if you want to use any other variable in the HTML template or prompt, you can use it as ", "{{", "variable_name", "}}", " and add this as attribute to shortcode")), section === "faq" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "FAQ"), /* @__PURE__ */ React.createElement("p", null, "Available soon.")));
}
function Generator({ moduleId }) {
  const [activeSection, setActiveSection] = reactExports.useState("overview");
  const { __ } = useI18n();
  const SettingsModule = reactExports.lazy(() => __vitePreload(() => import("./Settings-xyhahvj9n.js"), true ? ["./Settings-xyhahvj9n.js","../main-xyhahvj9n.js","./main-xyhahvj9n.css","./datepicker-xyhahvj9n.js","./MultiSelectMenu-xyhahvj9n.js","./MultiSelectMenu-xyhahvj9n.css","./datepicker-xyhahvj9n.css","./Textarea-xyhahvj9n.js","./Switch-xyhahvj9n.js","./Switch-xyhahvj9n.css","./Settings-xyhahvj9n.css"] : void 0, import.meta.url));
  const GeneratorResultTable = reactExports.lazy(() => __vitePreload(() => import("./GeneratorResultTable-xyhahvj9n.js"), true ? ["./GeneratorResultTable-xyhahvj9n.js","../main-xyhahvj9n.js","./main-xyhahvj9n.css","./ModuleViewHeaderBottom-xyhahvj9n.js","./datepicker-xyhahvj9n.js","./MultiSelectMenu-xyhahvj9n.js","./MultiSelectMenu-xyhahvj9n.css","./datepicker-xyhahvj9n.css","./ModuleViewHeaderBottom-xyhahvj9n.css","./TagsMenu-xyhahvj9n.js","./Tooltip_SortingFiltering-xyhahvj9n.js","./icon-link-xyhahvj9n.js","./icon-disable-xyhahvj9n.js"] : void 0, import.meta.url));
  const GeneratorShortcodeTable = reactExports.lazy(() => __vitePreload(() => import("./GeneratorShortcodeTable-xyhahvj9n.js"), true ? ["./GeneratorShortcodeTable-xyhahvj9n.js","../main-xyhahvj9n.js","./main-xyhahvj9n.css","./ModuleViewHeaderBottom-xyhahvj9n.js","./datepicker-xyhahvj9n.js","./MultiSelectMenu-xyhahvj9n.js","./MultiSelectMenu-xyhahvj9n.css","./datepicker-xyhahvj9n.css","./ModuleViewHeaderBottom-xyhahvj9n.css","./Tooltip_SortingFiltering-xyhahvj9n.js","./Textarea-xyhahvj9n.js","./icon-edit-xyhahvj9n.js","./icon-disable-xyhahvj9n.js"] : void 0, import.meta.url));
  const tableMenu = /* @__PURE__ */ new Map([
    ["shortcode", __("Shortcodes")],
    ["result", __("Results")]
  ]);
  return /* @__PURE__ */ React.createElement("div", { className: "urlslab-tableView" }, /* @__PURE__ */ React.createElement(
    ModuleViewHeader,
    {
      moduleId,
      moduleMenu: tableMenu,
      activeMenu: (activemenu) => setActiveSection(activemenu)
    }
  ), activeSection === "overview" && /* @__PURE__ */ React.createElement(GeneratorOverview, { moduleId }), activeSection === "shortcode" && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(GeneratorShortcodeTable, { slug: "generator/shortcode" })), activeSection === "result" && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(GeneratorResultTable, { slug: "generator/result" })), activeSection === "settings" && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(SettingsModule, { className: "fadeInto", settingId: moduleId })));
}
export {
  Generator as default
};