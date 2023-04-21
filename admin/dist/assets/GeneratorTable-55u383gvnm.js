import { R as React, l as langName, L as Loader } from "../main-55u383gvnm.js";
import { u as useTableUpdater, a as useInfiniteFetch, b as useChangeRow, S as SvgIconTrash, M as ModuleViewHeaderBottom, T as Table, c as TooltipSortingFiltering, P as ProgressBar } from "./useTableUpdater-55u383gvnm.js";
import { D as DateTimeFormat } from "./DateTimeFormat-55u383gvnm.js";
import { C as Checkbox, T as Tooltip, I as InputField, S as SortMenu } from "./Tooltip-55u383gvnm.js";
import "./useMutation-55u383gvnm.js";
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
  const { row, selectedRows, selectRow, deleteRow, deleteSelectedRows, updateRow } = useChangeRow({ data, url, slug, pageId });
  const statusTypes = {
    A: "Active",
    N: "New",
    P: "Pending",
    W: "Waiting approval",
    D: "Disabled"
  };
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
      filterValMenu: statusTypes,
      className: "nolimit",
      cell: (cell) => /* @__PURE__ */ React.createElement(SortMenu, { items: statusTypes, name: cell.column.id, checkedId: cell.getValue(), onChange: (newVal) => updateRow({ newVal, cell }) }),
      header: header.status,
      size: 100
    }),
    columnHelper.accessor("status_changed", {
      cell: (val) => /* @__PURE__ */ React.createElement(DateTimeFormat, { datetime: val.getValue() }),
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
      selectedRows,
      onSort: (val) => sortBy(val),
      onDeleteSelected: deleteSelectedRows,
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