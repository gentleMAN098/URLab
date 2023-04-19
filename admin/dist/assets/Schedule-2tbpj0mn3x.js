import { u as useI18n, r as reactExports, _ as __vitePreload, R as React } from "../main-2tbpj0mn3x.js";
/* empty css                              */function Schedule({ moduleId }) {
  const { __ } = useI18n();
  const slug = "schedule";
  /* @__PURE__ */ new Map([
    [slug, __("Schedules")]
  ]);
  const SchedulesTable = reactExports.lazy(() => __vitePreload(() => import("./SchedulesTable-2tbpj0mn3x.js"), true ? ["./SchedulesTable-2tbpj0mn3x.js","../main-2tbpj0mn3x.js","./main.css","./useTableUpdater-2tbpj0mn3x.js","./Tooltip-2tbpj0mn3x.js","./Tooltip-2tbpj0mn3x.css","./useMutation-2tbpj0mn3x.js","./useTableUpdater-2tbpj0mn3x.css"] : void 0, import.meta.url));
  return /* @__PURE__ */ React.createElement("div", { className: "urlslab-tableView" }, /* @__PURE__ */ React.createElement(reactExports.Suspense, null, /* @__PURE__ */ React.createElement(SchedulesTable, { slug })));
}
export {
  Schedule as default
};