import { r as reactExports, R as React, L as Loader } from "../settings.js";
import { u as useTableUpdater, a as useInfiniteFetch, h as handleSelected, S as SvgIconTrash, M as ModuleViewHeaderBottom, b as Table, T as Tooltip } from "./useTableUpdater-afa37684.js";
import { C as Checkbox, S as SortMenu } from "./datepicker-ff7dcd9b.js";
import { I as InputField } from "./InputField-36e1e240.js";
import { M as MenuInput } from "./MenuInput-fef364f8.js";
import "./useMutation-1e5291cb.js";
function SearchReplaceTable({ slug }) {
  var _a;
  const { filters, currentFilters, addFilter, removeFilters, sortingColumn, sortBy, row, rowToInsert, setInsertRow, deleteRow, updateRow } = useTableUpdater({ slug });
  const url = reactExports.useMemo(() => `${filters}${sortingColumn}`, [filters, sortingColumn]);
  const pageId = "id";
  const {
    __,
    columnHelper,
    data,
    status,
    isSuccess,
    isFetchingNextPage,
    hasNextPage,
    ref
  } = useInfiniteFetch({ key: slug, url, pageId, currentFilters, sortingColumn });
  const searchTypes = {
    T: __("Plain Text"),
    R: __("Regular Expr.")
  };
  const header = {
    str_search: __("Search string"),
    str_replace: __("Replace string"),
    search_type: __("Search Type"),
    url_filter: "URL Filter"
  };
  const inserterCells = {
    str_search: /* @__PURE__ */ React.createElement(InputField, { type: "url", defaultValue: "", onChange: (val) => setInsertRow({ ...rowToInsert, str_search: val }) }),
    str_replace: /* @__PURE__ */ React.createElement(InputField, { type: "url", defaultValue: "", onChange: (val) => setInsertRow({ ...rowToInsert, str_replace: val }) }),
    search_type: /* @__PURE__ */ React.createElement(SortMenu, { items: searchTypes, name: "search_type", checkedId: "T", onChange: (val) => setInsertRow({ ...rowToInsert, search_type: val }) }),
    url_filter: /* @__PURE__ */ React.createElement(InputField, { defaultValue: ".*", onChange: (val) => setInsertRow({ ...rowToInsert, url_filter: val }) })
  };
  const columns = [
    columnHelper.accessor("check", {
      className: "nolimit checkbox",
      cell: (cell) => /* @__PURE__ */ React.createElement(Checkbox, { checked: cell.row.getIsSelected(), onChange: (val) => {
        handleSelected(val, cell);
      } }),
      header: null
    }),
    columnHelper.accessor("str_search", {
      className: "nolimit",
      cell: (cell) => /* @__PURE__ */ React.createElement(InputField, { type: "text", defaultValue: cell.getValue(), onChange: (newVal) => updateRow({ data, newVal, url, slug, cell, rowSelector: pageId }) }),
      header: () => /* @__PURE__ */ React.createElement(MenuInput, { placeholder: "Enter search string", onChange: (val) => addFilter("str_search", val) }, header.str_search),
      size: 300
    }),
    columnHelper.accessor("str_replace", {
      className: "nolimit",
      cell: (cell) => /* @__PURE__ */ React.createElement(InputField, { type: "text", defaultValue: cell.getValue(), onChange: (newVal) => updateRow({ data, newVal, url, slug, cell, rowSelector: pageId }) }),
      header: () => /* @__PURE__ */ React.createElement(MenuInput, { isFilter: true, placeholder: "Enter replace string", onChange: (val) => addFilter("str_replace", val) }, header.str_replace),
      size: 300
    }),
    columnHelper.accessor("search_type", {
      className: "nolimit",
      cell: (cell) => /* @__PURE__ */ React.createElement(SortMenu, { items: searchTypes, name: cell.column.id, checkedId: cell.getValue(), onChange: (newVal) => updateRow({ data, newVal, url, slug, cell, rowSelector: pageId }) }),
      header: (cell) => /* @__PURE__ */ React.createElement(SortMenu, { isFilter: true, items: searchTypes, name: cell.column.id, checkedId: header.search_type, onChange: (val) => addFilter("search_type", val) }, header.search_type),
      size: 100
    }),
    columnHelper.accessor("url_filter", {
      className: "nolimit",
      cell: (cell) => /* @__PURE__ */ React.createElement(InputField, { type: "text", defaultValue: cell.getValue(), onChange: (newVal) => updateRow({ data, newVal, url, slug, cell, rowSelector: pageId }) }),
      header: () => /* @__PURE__ */ React.createElement(MenuInput, { isFilter: true, placeholder: "Enter filter", onChange: (val) => addFilter("url_filter", val) }, header.url_filter),
      size: 100
    }),
    columnHelper.accessor("delete", {
      className: "deleteRow",
      cell: (cell) => /* @__PURE__ */ React.createElement(SvgIconTrash, { onClick: () => deleteRow({ data, url, slug, cell, rowSelector: pageId }) }),
      header: () => null
    })
  ];
  if (status === "loading") {
    return /* @__PURE__ */ React.createElement(Loader, null);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    ModuleViewHeaderBottom,
    {
      slug,
      currentFilters,
      header,
      removeFilters: (key) => removeFilters(key),
      onSort: (val) => sortBy(val),
      exportOptions: {
        url: slug,
        filters,
        fromId: `from_${pageId}`,
        pageId,
        deleteCSVCols: [pageId, "dest_url_id"]
      }
    }
  ), /* @__PURE__ */ React.createElement(
    Table,
    {
      className: "fadeInto",
      slug,
      columns,
      data: isSuccess && ((_a = data == null ? void 0 : data.pages) == null ? void 0 : _a.flatMap((page) => page ?? [])),
      inserter: { inserterCells, data, slug, url, rowToInsert }
    },
    row ? /* @__PURE__ */ React.createElement(Tooltip, { center: true }, `${header.str_search} “${row.str_search}”`, " ", __("has been deleted.")) : null,
    /* @__PURE__ */ React.createElement("button", { ref }, isFetchingNextPage ? "Loading more..." : hasNextPage)
  ));
}
export {
  SearchReplaceTable as default
};