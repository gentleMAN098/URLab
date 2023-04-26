import { R as React, T as Tooltip, L as Loader } from "../main-djykm1j602.js";
import { u as useTableUpdater, a as useInfiniteFetch, b as useChangeRow, S as SortBy, c as SvgIconTrash, M as ModuleViewHeaderBottom, T as Table, d as TooltipSortingFiltering, P as ProgressBar } from "./useTableUpdater-djykm1j602.js";
import { C as Checkbox, I as InputField, S as SortMenu } from "./datepicker-djykm1j602.js";
import "./useMutation-djykm1j602.js";
function SearchReplaceTable({ slug }) {
  var _a;
  const paginationId = "id";
  const { table, setTable, rowToInsert, setInsertRow, filters, setFilters, sorting, sortBy } = useTableUpdater({ slug });
  const url = { filters, sorting };
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
  } = useInfiniteFetch({ key: slug, filters, sorting, paginationId });
  const { row, selectedRows, selectRow, deleteRow, deleteSelectedRows, updateRow } = useChangeRow({ data, url, slug, paginationId });
  const searchTypes = {
    T: __("Plain text"),
    R: __("Regular expression")
  };
  const header = {
    str_search: __("Search string (old)"),
    str_replace: __("Replace string (new)"),
    search_type: __("Search type"),
    url_filter: "URL filter"
  };
  const inserterCells = {
    str_search: /* @__PURE__ */ React.createElement(InputField, { liveUpdate: true, type: "url", defaultValue: "", label: header.str_search, onChange: (val) => setInsertRow({ ...rowToInsert, str_search: val }), required: true }),
    str_replace: /* @__PURE__ */ React.createElement(InputField, { liveUpdate: true, type: "url", defaultValue: "", label: header.str_replace, onChange: (val) => setInsertRow({ ...rowToInsert, str_replace: val }), required: true }),
    search_type: /* @__PURE__ */ React.createElement(SortMenu, { autoClose: true, items: searchTypes, name: "search_type", checkedId: "T", onChange: (val) => setInsertRow({ ...rowToInsert, search_type: val }) }, header.search_type),
    url_filter: /* @__PURE__ */ React.createElement(InputField, { liveUpdate: true, defaultValue: "", label: header.url_filter, onChange: (val) => setInsertRow({ ...rowToInsert, url_filter: val }) })
  };
  const columns = [
    columnHelper.accessor("check", {
      className: "nolimit checkbox",
      cell: (cell) => /* @__PURE__ */ React.createElement(Checkbox, { checked: cell.row.getIsSelected(), onChange: (val) => {
        selectRow(val, cell);
      } }),
      header: null
    }),
    columnHelper.accessor("str_search", {
      className: "nolimit",
      cell: (cell) => /* @__PURE__ */ React.createElement(InputField, { type: "text", defaultValue: cell.getValue(), onChange: (newVal) => updateRow({ newVal, cell }) }),
      header: (th) => /* @__PURE__ */ React.createElement(SortBy, { props: { header, sorting, th, onClick: () => sortBy(th) } }, header.str_search),
      size: 300
    }),
    columnHelper.accessor("str_replace", {
      className: "nolimit",
      cell: (cell) => /* @__PURE__ */ React.createElement(InputField, { type: "text", defaultValue: cell.getValue(), onChange: (newVal) => updateRow({ newVal, cell }) }),
      header: (th) => /* @__PURE__ */ React.createElement(SortBy, { props: { header, sorting, th, onClick: () => sortBy(th) } }, header.str_replace),
      size: 300
    }),
    columnHelper.accessor("search_type", {
      filterValMenu: searchTypes,
      className: "nolimit",
      cell: (cell) => /* @__PURE__ */ React.createElement(SortMenu, { items: searchTypes, name: cell.column.id, checkedId: cell.getValue(), onChange: (newVal) => updateRow({ newVal, cell }) }),
      header: (th) => /* @__PURE__ */ React.createElement(SortBy, { props: { header, sorting, th, onClick: () => sortBy(th) } }, header.search_type),
      size: 100
    }),
    columnHelper.accessor("url_filter", {
      className: "nolimit",
      cell: (cell) => /* @__PURE__ */ React.createElement(InputField, { type: "text", defaultValue: cell.getValue(), onChange: (newVal) => updateRow({ newVal, cell }) }),
      header: (th) => /* @__PURE__ */ React.createElement(SortBy, { props: { header, sorting, th, onClick: () => sortBy(th) } }, header.url_filter),
      size: 100
    }),
    columnHelper.accessor("delete", {
      className: "deleteRow",
      tooltip: () => /* @__PURE__ */ React.createElement(Tooltip, { className: "align-left xxxl" }, __("Delete item")),
      cell: (cell) => /* @__PURE__ */ React.createElement(SvgIconTrash, { onClick: () => deleteRow({ cell }) }),
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
      header,
      table,
      selectedRows,
      onDeleteSelected: deleteSelectedRows,
      onFilter: (filter) => setFilters(filter),
      onClearRow: (clear) => {
        setInsertRow();
        if (clear === "rowInserted") {
          setInsertRow(clear);
          setTimeout(() => {
            setInsertRow();
          }, 3e3);
        }
      },
      insertOptions: { inserterCells, title: "Add replacement", data, slug, url, paginationId, rowToInsert },
      exportOptions: {
        slug,
        url,
        paginationId,
        deleteCSVCols: [paginationId, "dest_url_id"]
      }
    }
  ), /* @__PURE__ */ React.createElement(
    Table,
    {
      className: "fadeInto",
      slug,
      returnTable: (returnTable) => setTable(returnTable),
      columns,
      data: isSuccess && ((_a = data == null ? void 0 : data.pages) == null ? void 0 : _a.flatMap((page) => page ?? []))
    },
    row ? /* @__PURE__ */ React.createElement(Tooltip, { center: true }, `${header.str_search} “${row.str_search}”`, " ", __("has been deleted.")) : null,
    rowToInsert === "rowInserted" ? /* @__PURE__ */ React.createElement(Tooltip, { center: true }, __("Search & Replace rule has been added.")) : null,
    /* @__PURE__ */ React.createElement(TooltipSortingFiltering, { props: { isFetching, filters, sorting } }),
    /* @__PURE__ */ React.createElement("div", { ref }, isFetchingNextPage ? "" : hasNextPage, /* @__PURE__ */ React.createElement(ProgressBar, { className: "infiniteScroll", value: !isFetchingNextPage ? 0 : 100 }))
  ));
}
export {
  SearchReplaceTable as default
};
