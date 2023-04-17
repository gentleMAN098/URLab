import { R as React, l as langName, L as Loader } from "../main-ef3h0h2i95.js";
import { u as useTableUpdater, a as useInfiniteFetch, b as useChangeRow, S as SvgIconTrash, M as ModuleViewHeaderBottom, T as Table, c as TooltipSortingFiltering, P as ProgressBar } from "./useTableUpdater-ef3h0h2i95.js";
import { C as Checkbox, T as Tooltip, I as InputField } from "./datepicker-ef3h0h2i95.js";
import "./useMutation-ef3h0h2i95.js";
function GeneratorTable({ slug }) {
  var _a;
  const pageId = "generator_id";
  const { table, setTable, filters, setFilters, currentFilters, sortingColumn, sortBy } = useTableUpdater({ slug });
  const url = `${"undefined" === typeof filters ? "" : filters}${"undefined" === typeof sortingColumn ? "" : sortingColumn}`;
  const {
    __,
    columnHelper,
    data,
    status,
    isSuccess,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    ref
  } = useInfiniteFetch({ key: slug, url, pageId, currentFilters, sortingColumn });
  const { row, selectRow, deleteRow, updateRow } = useChangeRow({ data, url, slug, pageId });
  const header = {
    command: __("Command"),
    semantic_context: __("Context"),
    url_filter: __("URL filter"),
    lang: __("Language code"),
    status: __("Status"),
    status_changed: __("Last change"),
    result: __("Result")
  };
  const columns = [
    columnHelper.accessor("check", {
      className: "checkbox",
      cell: (cell) => /* @__PURE__ */ React.createElement(Checkbox, { checked: cell.row.getIsSelected(), onChange: (val) => {
        selectRow(val, cell);
      } }),
      header: null
    }),
    columnHelper.accessor("command", {
      tooltip: (cell) => /* @__PURE__ */ React.createElement(Tooltip, null, cell.getValue()),
      header: header.command,
      size: 200
    }),
    columnHelper.accessor("semantic_context", {
      tooltip: (cell) => /* @__PURE__ */ React.createElement(Tooltip, null, cell.getValue()),
      header: header.semantic_context,
      size: 200
    }),
    columnHelper.accessor("url_filter", {
      tooltip: (cell) => /* @__PURE__ */ React.createElement(Tooltip, null, cell.getValue()),
      header: header.url_filter,
      size: 200
    }),
    columnHelper.accessor("lang", {
      tooltip: (cell) => /* @__PURE__ */ React.createElement(Tooltip, null, cell.getValue()),
      cell: (cell) => langName(cell == null ? void 0 : cell.getValue()),
      header: header.lang,
      size: 165
    }),
    columnHelper.accessor("result", {
      className: "nolimit",
      tooltip: (cell) => /* @__PURE__ */ React.createElement(Tooltip, null, cell.getValue()),
      cell: (cell) => /* @__PURE__ */ React.createElement(InputField, { defaultValue: cell.getValue(), onChange: (newVal) => updateRow({ newVal, cell }) }),
      header: header.result,
      size: 200
    }),
    columnHelper.accessor("status", {
      className: "status",
      tooltip: (cell) => /* @__PURE__ */ React.createElement(Tooltip, null, cell.getValue()),
      header: header.status,
      size: 100
    }),
    columnHelper.accessor("status_changed", {
      cell: (val) => new Date(val == null ? void 0 : val.getValue()).toLocaleString(window.navigator.language),
      header: header.status_changed,
      size: 100
    }),
    columnHelper.accessor("delete", {
      className: "deleteRow",
      cell: (cell) => /* @__PURE__ */ React.createElement(SvgIconTrash, { onClick: () => deleteRow({ cell }) }),
      header: null
    })
  ];
  if (status === "loading") {
    return /* @__PURE__ */ React.createElement(Loader, null);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    ModuleViewHeaderBottom,
    {
      slug,
      header,
      table,
      noImport: true,
      onSort: (val) => sortBy(val),
      onFilter: (filter) => setFilters(filter),
      exportOptions: {
        url: slug,
        filters,
        fromId: `from_${pageId}`,
        pageId,
        deleteCSVCols: [pageId, "generator_id"]
      }
    }
  ), /* @__PURE__ */ React.createElement(
    Table,
    {
      className: "fadeInto",
      slug,
      columns,
      returnTable: (returnTable) => setTable(returnTable),
      data: isSuccess && ((_a = data == null ? void 0 : data.pages) == null ? void 0 : _a.flatMap((page) => page ?? []))
    },
    row ? /* @__PURE__ */ React.createElement(Tooltip, { center: true }, __("Item has been deleted.")) : null,
    /* @__PURE__ */ React.createElement(TooltipSortingFiltering, { props: { isFetching, filters, sortingColumn } }),
    /* @__PURE__ */ React.createElement("div", { ref }, isFetchingNextPage ? "" : hasNextPage, /* @__PURE__ */ React.createElement(ProgressBar, { className: "infiniteScroll", value: !isFetchingNextPage ? 0 : 100 }))
  ));
}
export {
  GeneratorTable as default
};