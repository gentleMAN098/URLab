import{r as L,R as t,L as M}from"../main-3mjjh4fls8.js";import{u as $,a as v,b as P,T as i,S as U,M as B,c as D}from"./useTableUpdater-3mjjh4fls8.js";import{C as A,I as d,S as _}from"./datepicker-3mjjh4fls8.js";import"./useMutation-3mjjh4fls8.js";function G({slug:n}){var E;const c="url_id",{table:V,setTable:b,filters:m,setFilters:f,sortingColumn:p,sortBy:y}=$({slug:n}),h=L.useMemo(()=>`${m}${p||"&sort_column=url_name&sort_direction=ASC"}`,[m,p]),{__:a,columnHelper:r,data:u,status:C,isSuccess:S,isFetchingNextPage:I,hasNextPage:T,ref:N}=v({key:n,url:h,pageId:c}),{row:g,selectRow:k,deleteRow:w,updateRow:o}=P({data:u,url:h,slug:n,pageId:c}),R={"-2":a("Processing"),"-1":a("Waiting"),200:a("Valid"),400:a("Client Error"),404:a("Not Found"),500:a("Server Error"),503:a("Server Error")},x={V:a("Visible"),H:a("Hidden")},z={I:a("Internal"),E:a("External")},s={url_name:a("URL"),url_title:a("Title"),url_meta_description:a("Description"),url_summary:a("Summary"),http_status:a("Status"),visibility:a("Visibility"),url_type:a("URL Type"),update_http_date:a("Status Updated")},F=[r.accessor("check",{className:"checkbox",cell:e=>t.createElement(A,{checked:e.row.getIsSelected(),onChange:l=>{k(l,e)}}),header:null}),r.accessor("url_name",{tooltip:e=>t.createElement(i,null,e.getValue()),cell:e=>t.createElement("a",{href:e.getValue(),title:e.getValue(),target:"_blank",rel:"noreferrer"},e.getValue()),header:s.url_name,size:200}),r.accessor("url_title",{className:"nolimit",tooltip:e=>t.createElement(i,null,e.getValue()),cell:e=>t.createElement(d,{defaultValue:e.getValue(),onChange:l=>o({newVal:l,cell:e})}),header:s.url_title,size:150}),r==null?void 0:r.accessor("url_meta_description",{className:"nolimit",tooltip:e=>t.createElement(i,null,e.getValue()),cell:e=>t.createElement(d,{defaultValue:e.getValue(),onChange:l=>o({newVal:l,cell:e})}),header:s.url_meta_description,size:100}),r.accessor("url_summary",{className:"nolimit",tooltip:e=>t.createElement(i,null,e.getValue()),cell:e=>t.createElement(d,{defaultValue:e.getValue(),onChange:l=>o({newVal:l,cell:e})}),header:s.url_summary,size:150}),r==null?void 0:r.accessor("http_status",{className:"nolimit",cell:e=>t.createElement(_,{items:R,name:e.column.id,checkedId:e.getValue(),onChange:l=>o({newVal:l,cell:e})}),header:s.http_status,size:100}),r.accessor("visibility",{className:"nolimit",cell:e=>t.createElement(_,{items:x,name:e.column.id,checkedId:e.getValue(),onChange:l=>o({newVal:l,cell:e})}),header:s.visibility,size:100}),r.accessor("url_type",{className:"nolimit",cell:e=>t.createElement(_,{items:z,name:e.column.id,checkedId:e.getValue(),onChange:l=>o({newVal:l,cell:e})}),header:s.url_type,size:100}),r.accessor("update_http_date",{cell:e=>new Date(e==null?void 0:e.getValue()).toLocaleString(window.navigator.language),header:()=>s.update_http_date,size:140}),r.accessor("delete",{className:"deleteRow",cell:e=>t.createElement(U,{onClick:()=>w({cell:e})}),header:null})];return C==="loading"?t.createElement(M,null):t.createElement(t.Fragment,null,t.createElement(B,{slug:n,header:s,table:V,onSort:e=>y(e),onFilter:e=>f(e),noImport:!0,exportOptions:{url:n,filters:m,fromId:`from_${c}`,pageId:c,deleteCSVCols:["urlslab_url_id","url_id","urlslab_domain_id"],perPage:1e3}}),t.createElement(D,{className:"fadeInto",slug:n,returnTable:e=>b(e),columns:F,data:S&&((E=u==null?void 0:u.pages)==null?void 0:E.flatMap(e=>e??[]))},g?t.createElement(i,{center:!0},`${s.url_name} “${g.url_name}”`," has been deleted."):null,t.createElement("button",{ref:N},I?"Loading more...":T)))}export{G as default};