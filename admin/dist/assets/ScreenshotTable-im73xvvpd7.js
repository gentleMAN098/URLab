import{r as x,R as t,L as z}from"../main-im73xvvpd7.js";import{u as F,a as L,b as M,T as u,S as P,M as U,c as $}from"./useTableUpdater-im73xvvpd7.js";import{C as y,I as A,S as D}from"./datepicker-im73xvvpd7.js";import"./useMutation-im73xvvpd7.js";function q({slug:l}){var f;const o="url_id",{table:b,setTable:E,filters:i,setFilters:p,sortingColumn:d,sortBy:V}=F({slug:l}),_=x.useMemo(()=>`${i}${d||"&sort_column=url_name&sort_direction=ASC"}`,[i,d]),{__:r,columnHelper:a,data:c,status:S,isSuccess:w,isFetchingNextPage:C,hasNextPage:T,ref:k}=L({key:l,url:_,pageId:o}),{row:h,selectRow:I,deleteRow:N,updateRow:m}=M({data:c,url:_,slug:l,pageId:o}),g={N:r("Waiting"),A:r("Awailable"),P:r("Pending"),E:r("Disabled")},s={screenshot_url:r("Screenshot URL"),url_name:r("Destination URL"),url_title:r("Title"),scr_status:r("Status"),screenshot_usage_count:r("Usage"),update_scr_date:r("Updated at")},R=[a.accessor("check",{className:"checkbox",cell:e=>t.createElement(y,{checked:e.row.getIsSelected(),onChange:n=>{I(n,e)}}),header:null}),a==null?void 0:a.accessor("screenshot_url",{className:"thumbnail",cell:e=>e!=null&&e.getValue()?t.createElement("a",{href:e==null?void 0:e.getValue(),target:"_blank",rel:"noreferrer"},t.createElement("img",{src:e==null?void 0:e.getValue(),alt:e.row.original.url_name})):t.createElement("div",{className:"img"}),header:r("Thumbnail"),size:90}),a.accessor("url_name",{tooltip:e=>t.createElement(u,null,e.getValue()),cell:e=>t.createElement("a",{href:e.getValue(),title:e.getValue(),target:"_blank",rel:"noreferrer"},e.getValue()),header:s.url_name,size:250}),a.accessor("url_title",{className:"nolimit",tooltip:e=>t.createElement(u,null,e.getValue()),cell:e=>t.createElement(A,{defaultValue:e.getValue(),onChange:n=>m({newVal:n,cell:e})}),header:s.url_title,size:200}),a==null?void 0:a.accessor("scr_status",{filterValMenu:g,className:"nolimit",cell:e=>t.createElement(D,{items:g,name:e.column.id,checkedId:e.getValue(),onChange:n=>m({newVal:n,cell:e})}),header:s.scr_status,size:100}),a==null?void 0:a.accessor("screenshot_url",{tooltip:e=>t.createElement(u,null,e.getValue()),cell:e=>t.createElement("a",{href:e.getValue(),target:"_blank",rel:"noreferrer"},e.getValue()),header:s.screenshot_url,size:250}),a==null?void 0:a.accessor("screenshot_usage_count",{header:s.screenshot_usage_count,size:100}),a.accessor("update_scr_date",{cell:e=>new Date(e==null?void 0:e.getValue()).toLocaleString(window.navigator.language),header:s.update_scr_date,size:140}),a.accessor("delete",{className:"deleteRow",cell:e=>t.createElement(P,{onClick:()=>N({cell:e})}),header:null})];return S==="loading"?t.createElement(z,null):t.createElement(t.Fragment,null,t.createElement(U,{slug:l,header:s,table:b,onSort:e=>V(e),onFilter:e=>p(e),noImport:!0,exportOptions:{url:l,filters:i,fromId:`from_${o}`,pageId:o,deleteCSVCols:["urlslab_url_id","url_id","urlslab_domain_id"],perPage:1e3}}),t.createElement($,{className:"fadeInto",slug:l,returnTable:e=>E(e),columns:R,data:w&&((f=c==null?void 0:c.pages)==null?void 0:f.flatMap(e=>e??[]))},h?t.createElement(u,{center:!0},`${s.url_name} “${h.url_name}”`," has been deleted."):null,t.createElement("button",{ref:k},C?"Loading more...":T)))}export{q as default};
