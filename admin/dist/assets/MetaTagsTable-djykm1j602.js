import { R as React, T as Tooltip, L as Loader } from "../main-djykm1j602.js";
import { u as useTableUpdater, a as useInfiniteFetch, b as useChangeRow, S as SortBy, c as SvgIconTrash, M as ModuleViewHeaderBottom, T as Table, d as TooltipSortingFiltering, P as ProgressBar } from "./useTableUpdater-djykm1j602.js";
import { D as DateTimeFormat } from "./DateTimeFormat-djykm1j602.js";
import { C as Checkbox, I as InputField } from "./datepicker-djykm1j602.js";
import "./useMutation-djykm1j602.js";
function LinkManagerTable({ slug }) {
  var _a;
  const paginationId = "url_id";
  const { table, setTable, filters, setFilters, sorting, sortBy } = useTableUpdater({ slug });
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
  const httpStatusTypes = {
    "-2": __("Processing"),
    "-1": __("Waiting"),
    200: __("Valid"),
    400: __("Client Error"),
    404: __("Not Found"),
    500: __("Server Error"),
    503: __("Server Error")
  };
  const relScheduleTypes = {
    N: "New",
    M: "Manual",
    S: "Scheduled",
    E: "Error"
  };
  const header = {
    url_name: __("URL"),
    url_title: __("Title"),
    url_meta_description: __("Description"),
    url_summary: __("Summary"),
    http_status: __("Status"),
    rel_schedule: __("Schedule"),
    update_http_date: __("Last change")
  };
  const columns = [
    columnHelper.accessor("check", {
      className: "checkbox",
      cell: (cell) => /* @__PURE__ */ React.createElement(Checkbox, { checked: cell.row.getIsSelected(), onChange: (val) => {
        selectRow(val, cell);
      } }),
      header: null
    }),
    columnHelper == null ? void 0 : columnHelper.accessor("screenshot_url", {
      className: "thumbnail",
      cell: (image) => (image == null ? void 0 : image.getValue()) ? /* @__PURE__ */ React.createElement("a", { href: image == null ? void 0 : image.getValue(), target: "_blank", rel: "noreferrer" }, /* @__PURE__ */ React.createElement("img", { src: image == null ? void 0 : image.getValue(), alt: image.row.original.url_name })) : /* @__PURE__ */ React.createElement("div", { className: "img" }),
      header: __("Thumbnail"),
      size: 80
    }),
    columnHelper.accessor("url_name", {
      tooltip: (cell) => /* @__PURE__ */ React.createElement(Tooltip, null, cell.getValue()),
      cell: (cell) => /* @__PURE__ */ React.createElement("a", { href: cell.getValue(), title: cell.getValue(), target: "_blank", rel: "noreferrer" }, cell.getValue()),
      header: (th) => /* @__PURE__ */ React.createElement(SortBy, { props: { header, sorting, th, onClick: () => sortBy(th) } }, header.url_name),
      size: 200
    }),
    columnHelper.accessor("url_title", {
      className: "nolimit",
      tooltip: (cell) => /* @__PURE__ */ React.createElement(Tooltip, { className: "xxl" }, cell.getValue()),
      cell: (cell) => /* @__PURE__ */ React.createElement(
        InputField,
        {
          defaultValue: cell.getValue(),
          onChange: (newVal) => updateRow({ newVal, cell })
        }
      ),
      header: (th) => /* @__PURE__ */ React.createElement(SortBy, { props: { header, sorting, th, onClick: () => sortBy(th) } }, header.url_title),
      size: 200
    }),
    columnHelper == null ? void 0 : columnHelper.accessor("url_meta_description", {
      className: "nolimit",
      tooltip: (cell) => /* @__PURE__ */ React.createElement(Tooltip, { className: "xxl" }, cell.getValue()),
      cell: (cell) => /* @__PURE__ */ React.createElement(
        InputField,
        {
          defaultValue: cell.getValue(),
          onChange: (newVal) => updateRow({ newVal, cell })
        }
      ),
      header: (th) => /* @__PURE__ */ React.createElement(SortBy, { props: { header, sorting, th, onClick: () => sortBy(th) } }, header.url_meta_description),
      size: 200
    }),
    columnHelper.accessor("url_summary", {
      className: "nolimit",
      tooltip: (cell) => /* @__PURE__ */ React.createElement(Tooltip, { className: "xxl" }, cell.getValue()),
      cell: (cell) => /* @__PURE__ */ React.createElement(
        InputField,
        {
          defaultValue: cell.getValue(),
          onChange: (newVal) => updateRow({ newVal, cell })
        }
      ),
      header: (th) => /* @__PURE__ */ React.createElement(SortBy, { props: { header, sorting, th, onClick: () => sortBy(th) } }, header.url_summary),
      size: 150
    }),
    columnHelper == null ? void 0 : columnHelper.accessor("http_status", {
      filterValMenu: httpStatusTypes,
      cell: (cell) => httpStatusTypes[cell.getValue()],
      header: (th) => /* @__PURE__ */ React.createElement(SortBy, { props: { header, sorting, th, onClick: () => sortBy(th) } }, header.http_status),
      size: 80
    }),
    columnHelper.accessor("rel_schedule", {
      filterValMenu: relScheduleTypes,
      cell: (cell) => relScheduleTypes[cell.getValue()],
      header: (th) => /* @__PURE__ */ React.createElement(SortBy, { props: { header, sorting, th, onClick: () => sortBy(th) } }, header.rel_schedule),
      size: 80
    }),
    columnHelper.accessor("update_http_date", {
      cell: (val) => /* @__PURE__ */ React.createElement(DateTimeFormat, { datetime: val.getValue() }),
      header: (th) => /* @__PURE__ */ React.createElement(SortBy, { props: { header, sorting, th, onClick: () => sortBy(th) } }, header.update_http_date),
      size: 140
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
      selectedRows,
      onDeleteSelected: deleteSelectedRows,
      onFilter: (filter) => setFilters(filter),
      noImport: true,
      exportOptions: {
        slug,
        url,
        paginationId,
        deleteCSVCols: ["urlslab_url_id", "url_id", "urlslab_domain_id"],
        perPage: 1e3
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
    row ? /* @__PURE__ */ React.createElement(Tooltip, { center: true }, `${header.url_name} “${row.url_name}”`, " has been deleted.") : null,
    /* @__PURE__ */ React.createElement(TooltipSortingFiltering, { props: { isFetching, filters, sorting } }),
    /* @__PURE__ */ React.createElement("div", { ref }, isFetchingNextPage ? "" : hasNextPage, /* @__PURE__ */ React.createElement(ProgressBar, { className: "infiniteScroll", value: !isFetchingNextPage ? 0 : 100 }))
  ));
}
export {
  LinkManagerTable as default
};
