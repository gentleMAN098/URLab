import{a as v,l as $,R as t,r as O,L as Q}from"../main-1zcr21yo78.js";import{u as q,a as D,b as P,T as _,S as j,M as B,c as H}from"./useTableUpdater-1zcr21yo78.js";import{S as C,I as g,C as K}from"./datepicker-1zcr21yo78.js";import"./useMutation-1zcr21yo78.js";function L({noAll:o,isFilter:u,children:f,onChange:p,checkedId:n,autoClose:s}){const c=v(),d=c.getQueryData(["languages"]),w=a=>Object.fromEntries(Object.entries(a).sort(([,l],[,m])=>l.localeCompare(m)));o&&delete d.all,d[n]||(d[n]=$(n),c.setQueryData(["languages"],w(d)),c.invalidateQueries(["languages"]));const h=w(d),k=a=>{p&&p(a)};return h?t.createElement(C,{autoClose:s,items:h,isFilter:u,name:"languages",checkedId:n,onChange:a=>k(a)},f):t.createElement(g,{defaultValue:n,onChange:a=>k(a)})}function W({slug:o}){var T;const u="kw_id",{table:f,setTable:p,rowToInsert:n,setInsertRow:s,filters:c,setFilters:d,sortingColumn:w,sortBy:h}=q({slug:o}),k=O.useMemo(()=>`${c}${w}`,[c,w]),{__:a,columnHelper:l,data:m,status:V,isSuccess:F,isFetchingNextPage:I,hasNextPage:R,ref:z}=D({key:o,url:k,pageId:u}),{row:E,rowsSelected:N,selectRow:S,deleteRow:M,updateRow:y}=P({data:m,url:k,slug:o,pageId:u}),b={M:a("Manual"),I:a("Imported"),X:a("None")},r={keyword:a("Keyword"),kwType:a("Type"),kw_length:a("Length"),kw_priority:a("Priority"),kw_usage_count:a("Usage"),lang:a("Language"),link_usage_count:a("Link Usage"),urlFilter:a("URL Filter"),urlLink:a("Link")},x={keyword:t.createElement(g,{liveUpdate:!0,defaultValue:"",label:r.keyword,onChange:e=>s({...n,keyword:e}),required:!0}),kwType:t.createElement(C,{autoClose:!0,items:b,name:"kwType",checkedId:"M",onChange:e=>s({...n,kwType:e})},r.kwType),kw_priority:t.createElement(g,{liveUpdate:!0,type:"number",defaultValue:"0",min:"0",max:"255",label:r.kw_priority,onChange:e=>s({...n,kw_priority:e})}),lang:t.createElement(L,{autoClose:!0,checkedId:"all",onChange:e=>s({...n,lang:e})},a("Language")),urlFilter:t.createElement(g,{liveUpdate:!0,defaultValue:"",label:r.urlFilter,onChange:e=>s({...n,urlFilter:e})}),urlLink:t.createElement(g,{liveUpdate:!0,type:"url",defaultValue:"",label:r.urlLink,onChange:e=>s({...n,urlLink:e}),required:!0})},U=[l.accessor("check",{className:"checkbox",cell:e=>t.createElement(K,{checked:e.row.getIsSelected(),onChange:i=>{S(i,e)}}),header:null,enableResizing:!1}),l.accessor("keyword",{tooltip:e=>t.createElement(_,null,e.getValue()),header:r.keyword,minSize:150}),l.accessor("kwType",{className:"nolimit",cell:e=>t.createElement(C,{items:b,name:e.column.id,checkedId:e.getValue(),onChange:i=>y({newVal:i,cell:e})}),header:r.kwType,size:100}),l.accessor("kw_length",{header:r.kw_length,size:80}),l.accessor("kw_priority",{className:"nolimit",cell:e=>t.createElement(g,{type:"number",defaultValue:e.getValue(),onChange:i=>y({newVal:i,cell:e})}),header:r.kw_priority,size:80}),l.accessor("lang",{className:"nolimit",cell:e=>t.createElement(L,{checkedId:e==null?void 0:e.getValue(),onChange:i=>y({newVal:i,cell:e})}),header:r.lang,size:165}),l.accessor("kw_usage_count",{header:r.kw_usage_count,size:70}),l.accessor("link_usage_count",{header:r.link_usage_count,size:100}),l.accessor("urlFilter",{className:"nolimit",cell:e=>t.createElement(g,{defaultValue:e.renderValue(),onChange:i=>y({newVal:i,cell:e})}),header:r.urlFilter,size:100}),l.accessor("urlLink",{tooltip:e=>t.createElement(_,null,e.getValue()),cell:e=>t.createElement("a",{href:e.getValue(),target:"_blank",rel:"noreferrer"},e.getValue()),header:r.urlLink,enableResizing:!1,size:350}),l.accessor("delete",{className:"deleteRow",cell:e=>t.createElement(j,{onClick:()=>M({cell:e})}),header:null})];return V==="loading"?t.createElement(Q,null):t.createElement(t.Fragment,null,t.createElement(B,{slug:o,header:r,table:f,rowsSelected:N,onSort:e=>h(e),onFilter:e=>d(e),onClearRow:e=>e&&s(),insertOptions:{inserterCells:x,title:"Add keyword",data:m,slug:o,url:k,pageId:u,rowToInsert:n},exportOptions:{url:o,filters:c,fromId:`from_${u}`,pageId:u,deleteCSVCols:[u,"dest_url_id"]}}),t.createElement(H,{className:"fadeInto",slug:o,returnTable:e=>p(e),columns:U,data:F&&((T=m==null?void 0:m.pages)==null?void 0:T.flatMap(e=>e??[]))},E?t.createElement(_,{center:!0},`${r.keyword} “${E.keyword}”`," ",a("has been deleted.")):null,t.createElement("button",{ref:z},I?"Loading more...":R)))}export{W as default};