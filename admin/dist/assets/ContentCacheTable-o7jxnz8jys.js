import { R as React, i as Tooltip, L as Loader } from "../main-o7jxnz8jys.js";
import { a as useTableUpdater, b as useInfiniteFetch, d as SortBy, D as DateTimeFormat, M as ModuleViewHeaderBottom, T as Table, P as ProgressBar } from "./ModuleViewHeaderBottom-o7jxnz8jys.js";
import { T as TooltipSortingFiltering } from "./Tooltip_SortingFiltering-o7jxnz8jys.js";
import "./MultiSelectMenu-o7jxnz8jys.js";
import "./Checkbox-o7jxnz8jys.js";
import "./datepicker-o7jxnz8jys.js";
function ContentCacheTable({ slug }) {
  var _a;
  const paginationId = "cache_crc32";
  const { table, setTable, filters, setFilters, sorting, sortBy } = useTableUpdater({ slug });
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
  const header = {
    date_changed: __("Last change"),
    cache_len: __("Cache size"),
    cache_content: __("Cache content")
  };
  const columns = [
    columnHelper.accessor("cache_content", {
      tooltip: (cell) => /* @__PURE__ */ React.createElement(Tooltip, null, cell.getValue()),
      header: (th) => /* @__PURE__ */ React.createElement(SortBy, { props: { header, sorting, th, onClick: () => sortBy(th) } }, header.cache_content),
      size: 300
    }),
    columnHelper.accessor("cache_len", {
      cell: (cell) => `${Math.round(cell.getValue() / 1024, 0)} kB`,
      header: (th) => /* @__PURE__ */ React.createElement(SortBy, { props: { header, sorting, th, onClick: () => sortBy(th) } }, header.cache_len),
      size: 80
    }),
    columnHelper.accessor("date_changed", {
      cell: (val) => /* @__PURE__ */ React.createElement(DateTimeFormat, { datetime: val.getValue() }),
      header: (th) => /* @__PURE__ */ React.createElement(SortBy, { props: { header, sorting, th, onClick: () => sortBy(th) } }, header.date_changed),
      size: 115
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
      hideActions: true,
      onFilter: (filter) => setFilters(filter)
    }
  ), /* @__PURE__ */ React.createElement(
    Table,
    {
      className: "fadeInto",
      columns,
      slug,
      returnTable: (returnTable) => setTable(returnTable),
      data: isSuccess && ((_a = data == null ? void 0 : data.pages) == null ? void 0 : _a.flatMap((page) => page ?? []))
    },
    /* @__PURE__ */ React.createElement(TooltipSortingFiltering, { props: { isFetching, filters, sorting } }),
    /* @__PURE__ */ React.createElement("div", { ref }, isFetchingNextPage ? "" : hasNextPage, /* @__PURE__ */ React.createElement(ProgressBar, { className: "infiniteScroll", value: !isFetchingNextPage ? 0 : 100 }))
  ));
}
export {
  ContentCacheTable as default
};