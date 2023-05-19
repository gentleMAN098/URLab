import { r as reactExports, R as React, u as useI18n, _ as __vitePreload } from "../main-06urfgcy5u.js";
import { O as Overview, M as ModuleViewHeader } from "./ModuleViewHeader-06urfgcy5u.js";
import { e as editIcon } from "./icon-edit-06urfgcy5u.js";
import "./Checkbox-06urfgcy5u.js";
/* empty css                              */const image1 = "" + new URL("liveagent_screenshot-06urfgcy5u.jpeg", import.meta.url).href;
function ScreenShotOverview({ moduleId }) {
  const [section, setSection] = reactExports.useState("about");
  const sections = [
    { id: "section1", title: "My Section", icon: editIcon }
  ];
  return (
    // has also property title for custom title like <Overview moduleId=xxx title="my title"
    // noCheckbox property hides "disable overview" checkbox on modules without tables (just overview and setttings in menu)
    /* @__PURE__ */ React.createElement(Overview, { moduleId, customSections: sections, section: (val) => setSection(val) }, section === "about" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur accusamus minima animi labore atque exercitationem nobis. Doloribus praesentium rem nobis."), /* @__PURE__ */ React.createElement("li", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur accusamus minima animi labore atque exercitationem nobis. Doloribus praesentium rem nobis.")), /* @__PURE__ */ React.createElement("p", null, "Screenshots are a great way to grab an audience's attention and make your content more appealing. With this module, you can easily add automatically generated screenshots via a shortcode into the content. It will not only save you time but will also give your content a professional look."), /* @__PURE__ */ React.createElement("p", null, "Using the Screenshots module can be especially useful for websites with many pages, where manually taking screenshots for each one can be time-consuming. With the module, you can quickly generate screenshots for each page."), /* @__PURE__ */ React.createElement("p", null, "Overall, the module makes screenshots easy to use with zero effort. It is a great way to save time and make your content stand out.")), section === "integrate" && /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h4", null, "How to use the feature?"), /* @__PURE__ */ React.createElement("p", null, "It's almost effortless and will only take a maximum of five minutes. All you have to do is add a shortcode to your theme template, and the module will take care of the rest for you."), /* @__PURE__ */ React.createElement("h4", null, "Shortcode"), /* @__PURE__ */ React.createElement("code", null, '[urlslab-screenshot screenshot-type="carousel" url="https://www.liveagent.com" alt="Home" width="100%" height="100%" default-image="https://www.yourdomain.com/default_image.jpg"]'), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Shortcode Attributes")), /* @__PURE__ */ React.createElement("table", { border: "1" }, /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Attribute"), /* @__PURE__ */ React.createElement("th", null, "Required"), /* @__PURE__ */ React.createElement("th", null, "Description"), /* @__PURE__ */ React.createElement("th", null, "Default Value"), /* @__PURE__ */ React.createElement("th", null, "Possible Values")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "screenshot-type"), /* @__PURE__ */ React.createElement("td", null, "optional"), /* @__PURE__ */ React.createElement("td", null, " "), /* @__PURE__ */ React.createElement("td", null, "carousel"), /* @__PURE__ */ React.createElement("td", null, "carousel, full-page, carousel-thumbnail, full-page-thumbnail")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "url"), /* @__PURE__ */ React.createElement("td", null, "mandatory"), /* @__PURE__ */ React.createElement("td", null, "Link to the page from which a screenshot should be taken."), /* @__PURE__ */ React.createElement("td", null, " "), /* @__PURE__ */ React.createElement("td", null, " ")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "alt"), /* @__PURE__ */ React.createElement("td", null, "optional"), /* @__PURE__ */ React.createElement("td", null, "Value of the image alt text."), /* @__PURE__ */ React.createElement("td", null, "A summary of the destination URL"), /* @__PURE__ */ React.createElement("td", null, " ")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "width"), /* @__PURE__ */ React.createElement("td", null, "optional"), /* @__PURE__ */ React.createElement("td", null, "The width of the image."), /* @__PURE__ */ React.createElement("td", null, "100%"), /* @__PURE__ */ React.createElement("td", null, " ")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "height"), /* @__PURE__ */ React.createElement("td", null, "optional"), /* @__PURE__ */ React.createElement("td", null, "The height of the image."), /* @__PURE__ */ React.createElement("td", null, "100%"), /* @__PURE__ */ React.createElement("td", null, " ")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, "default-image"), /* @__PURE__ */ React.createElement("td", null, "optional"), /* @__PURE__ */ React.createElement("td", null, "The URL of the default image in case we don't yet have the screenshot."), /* @__PURE__ */ React.createElement("td", null, "-"), /* @__PURE__ */ React.createElement("td", null, " ")))), /* @__PURE__ */ React.createElement("h4", null, "Example"), /* @__PURE__ */ React.createElement("p", null, "Example of shortcode to include a screenshot of www.liveagent.com to your website content: ", /* @__PURE__ */ React.createElement("code", null, '[urlslab-screenshot url="https://www.liveagent.com"]')), /* @__PURE__ */ React.createElement("img", { src: image1, alt: "Example of the screenshot for the URL www.liveagent.com" })))
  );
}
function Screenshot({ moduleId }) {
  const { __ } = useI18n();
  const [activeSection, setActiveSection] = reactExports.useState("overview");
  const tableMenu = /* @__PURE__ */ new Map([
    ["screenshot", __("Screenshots")]
  ]);
  const SettingsModule = reactExports.lazy(() => __vitePreload(() => import("./Settings-06urfgcy5u.js"), true ? ["./Settings-06urfgcy5u.js","../main-06urfgcy5u.js","./main-06urfgcy5u.css","./datepicker-06urfgcy5u.js","./MultiSelectMenu-06urfgcy5u.js","./Checkbox-06urfgcy5u.js","./Checkbox-06urfgcy5u.css","./MultiSelectMenu-06urfgcy5u.css","./datepicker-06urfgcy5u.css","./Switch-06urfgcy5u.js","./Switch-06urfgcy5u.css","./Settings-06urfgcy5u.css"] : void 0, import.meta.url));
  const ScreenshotTable = reactExports.lazy(() => __vitePreload(() => import("./ScreenshotTable-06urfgcy5u.js"), true ? ["./ScreenshotTable-06urfgcy5u.js","../main-06urfgcy5u.js","./main-06urfgcy5u.css","./ModuleViewHeaderBottom-06urfgcy5u.js","./datepicker-06urfgcy5u.js","./MultiSelectMenu-06urfgcy5u.js","./Checkbox-06urfgcy5u.js","./Checkbox-06urfgcy5u.css","./MultiSelectMenu-06urfgcy5u.css","./datepicker-06urfgcy5u.css","./ModuleViewHeaderBottom-06urfgcy5u.css","./TagsMenu-06urfgcy5u.js","./Tooltip_SortingFiltering-06urfgcy5u.js","./icon-link-06urfgcy5u.js","./ScreenshotTable-06urfgcy5u.css"] : void 0, import.meta.url));
  return /* @__PURE__ */ React.createElement("div", { className: "urlslab-tableView" }, /* @__PURE__ */ React.createElement(
    ModuleViewHeader,
    {
      moduleId,
      moduleMenu: tableMenu,
      activeMenu: (activemenu) => setActiveSection(activemenu)
    }
  ), activeSection === "overview" && /* @__PURE__ */ React.createElement(ScreenShotOverview, { moduleId }), activeSection === "screenshot" && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(ScreenshotTable, { slug: "screenshot" })), activeSection === "settings" && /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(SettingsModule, { className: "fadeInto", settingId: moduleId })));
}
export {
  Screenshot as default
};
