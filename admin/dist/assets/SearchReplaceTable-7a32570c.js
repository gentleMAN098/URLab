import{r as w,R as t,L as k}from"../main.js";import{u as F,a as M,b as $,S as z,M as L,c as P,T as B}from"./useTableUpdater-9aec7406.js";import{C as H,I as u,S as U}from"./datepicker-e55fd098.js";import"./useMutation-cf66945e.js";function A({slug:r}){var f;const n="id",{table:g,setTable:_,filters:m,setFilters:E,sortingColumn:d,sortBy:x}=F({slug:r}),h=w.useMemo(()=>`${m}${d}`,[m,d]),{__:s,columnHelper:l,data:o,status:C,isSuccess:R,isFetchingNextPage:T,hasNextPage:b,ref:S}=M({key:r,url:h,pageId:n}),{row:p,selectRow:y,deleteRow:I,updateRow:i}=$({data:o,url:h,slug:r,pageId:n}),N={T:s("Plain Text"),R:s("Regular Expr.")},c={str_search:s("Search string"),str_replace:s("Replace string"),search_type:s("Search Type"),url_filter:"URL Filter"},V=[l.accessor("check",{className:"nolimit checkbox",cell:e=>t.createElement(H,{checked:e.row.getIsSelected(),onChange:a=>{y(a,e)}}),header:null}),l.accessor("str_search",{className:"nolimit",cell:e=>t.createElement(u,{type:"text",defaultValue:e.getValue(),onChange:a=>i({newVal:a,cell:e})}),header:c.str_search,size:300}),l.accessor("str_replace",{className:"nolimit",cell:e=>t.createElement(u,{type:"text",defaultValue:e.getValue(),onChange:a=>i({newVal:a,cell:e})}),header:c.str_replace,size:300}),l.accessor("search_type",{className:"nolimit",cell:e=>t.createElement(U,{items:N,name:e.column.id,checkedId:e.getValue(),onChange:a=>i({newVal:a,cell:e})}),header:c.search_type,size:100}),l.accessor("url_filter",{className:"nolimit",cell:e=>t.createElement(u,{type:"text",defaultValue:e.getValue(),onChange:a=>i({newVal:a,cell:e})}),header:c.url_filter,size:100}),l.accessor("delete",{className:"deleteRow",cell:e=>t.createElement(z,{onClick:()=>I({cell:e})}),header:()=>null})];return C==="loading"?t.createElement(k,null):t.createElement(t.Fragment,null,t.createElement(L,{slug:r,header:c,table:g,onSort:e=>x(e),onFilter:e=>E(e),exportOptions:{url:r,filters:m,fromId:`from_${n}`,pageId:n,deleteCSVCols:[n,"dest_url_id"]}}),t.createElement(P,{className:"fadeInto",slug:r,returnTable:e=>_(e),columns:V,data:R&&((f=o==null?void 0:o.pages)==null?void 0:f.flatMap(e=>e??[]))},p?t.createElement(B,{center:!0},`${c.str_search} “${p.str_search}”`," ",s("has been deleted.")):null,t.createElement("button",{ref:S},T?"Loading more...":b)))}export{A as default};