import { R as React, r as reactExports, u as useI18n, _ as __vitePreload } from "../main-bnkd71mu9.js";
import { M as ModuleViewHeader, O as Overview } from "./ModuleViewHeader-bnkd71mu9.js";
import "./api-exclamation-bnkd71mu9.js";
/* empty css                             */function GeneratorOverview() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "Discover the ultimate solution to elevating your website's content with our state-of-the-art AI-powered module. Designed to simplify and streamline content creation, our module generates unique and engaging text tailored to your specific needs. With the intuitive shortcode or Gutenberg block integration, crafting captivating content has never been easier."), /* @__PURE__ */ React.createElement("p", null, "Harnessing the power of the advanced GPT model version 4 or older 3.5, our plugin ensures top-notch quality and seamless adaptability for your site. Say goodbye to time-consuming content generation and writer's block, as our AI module takes care of all your content needs with ease."), /* @__PURE__ */ React.createElement("p", null, "Upgrade your website today with our AI-driven module and experience the unparalleled benefits of dynamic, high-quality content that not only captivates your audience but also enhances your site's SEO performance. Don't settle for subpar content – step into the future of web copywriting with our groundbreaking module."), /* @__PURE__ */ React.createElement("h4", null, "Shortcode"), /* @__PURE__ */ React.createElement("code", null, '[urlslab-generator template="templates/summary.php" command="Summarize text and return output in language |$lang|" source-url="liveagent.com/blog/" semantic-context="Can live chat improve conversion?" default-value="This is my default summarization ..."]'));
}
function Generator({ moduleId }) {
  const [activeSection, setActiveSection] = reactExports.useState("overview");
  const { __ } = useI18n();
  const SettingsModule = reactExports.lazy(() => __vitePreload(() => import("./Settings-bnkd71mu9.js"), true ? ["./Settings-bnkd71mu9.js","../main-bnkd71mu9.js","./main.css","./Tooltip-bnkd71mu9.js","./Tooltip-bnkd71mu9.css","./Switch-bnkd71mu9.js","./Switch-bnkd71mu9.css","./useMutation-bnkd71mu9.js","./Settings-bnkd71mu9.css"] : void 0, import.meta.url));
  const GeneratorTable = reactExports.lazy(() => __vitePreload(() => import("./GeneratorTable-bnkd71mu9.js"), true ? ["./GeneratorTable-bnkd71mu9.js","../main-bnkd71mu9.js","./main.css","./useTableUpdater-bnkd71mu9.js","./Tooltip-bnkd71mu9.js","./Tooltip-bnkd71mu9.css","./useMutation-bnkd71mu9.js","./useTableUpdater-bnkd71mu9.css","./DateTimeFormat-bnkd71mu9.js"] : void 0, import.meta.url));
  const slug = "content-generator";
  const tableMenu = /* @__PURE__ */ new Map([
    [slug, __("Contents")]
  ]);
  return /* @__PURE__ */ React.createElement("div", { className: "urlslab-tableView" }, /* @__PURE__ */ React.createElement(ModuleViewHeader, { moduleMenu: tableMenu, activeMenu: (activemenu) => setActiveSection(activemenu) }), activeSection === "overview" && /* @__PURE__ */ React.createElement(Overview, { moduleId }, /* @__PURE__ */ React.createElement(GeneratorOverview, null)), activeSection === slug && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(GeneratorTable, { slug })), activeSection === "settings" && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(SettingsModule, { className: "fadeInto", settingId: moduleId })));
}
export {
  Generator as default
};