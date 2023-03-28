import{R as e,u as p,r as t,_ as r}from"../main.js";import{M as y,O as h}from"./ModuleViewHeader-a727309a.js";import"./api-exclamation-693036a2.js";/* empty css                          */function g(){return e.createElement(e.Fragment,null,e.createElement("p",null,"The Keywords Manager module is an incredibly valuable tool for boosting the website's SEO and internal link building. It is designed to help you monitor and manage internal keyword linking - a process that can significantly impact search engine rankings since they only see the meaning of ranking your website to the specific keyword once you also link to that keyword internally."),e.createElement("p",null,"The module can help you target relevant keywords and phrases in your content. It also allows you to track and monitor the usage of the keywords. This can help you ensure that your content is optimized for maximum visibility for search engines."),e.createElement("p",null,"In addition to helping improve search engine rankings, the module can also be used to strengthen the internal link structure of your website. It can help improve user experience by making it easier for visitors to find the content they are looking for. Internal linking also allows you to direct visitors to other parts of your website, helping to increase overall engagement."))}function k({moduleId:a}){const{__:i}=p(),o="keyword",[n,l]=t.useState("overview"),s=new Map([[o,i("Keywords")],["d3-chart",i("Word Cloud")]]),c=t.lazy(()=>r(()=>import("./KeywordsTable-cee58e78.js"),["./KeywordsTable-cee58e78.js","../main.js","./main.css","./useTableUpdater-9aec7406.js","./useMutation-cf66945e.js","./datepicker-e55fd098.js","./datepicker-10906.css","./useTableUpdater-10906.css"],import.meta.url)),u=t.lazy(()=>r(()=>import("./D3WordCloud-0113e06c.js"),["./D3WordCloud-0113e06c.js","../main.js","./main.css","./_ModuleViewHeader-10906.css"],import.meta.url)),m=t.lazy(()=>r(()=>import("./Settings-f5abae45.js"),["./Settings-f5abae45.js","../main.js","./main.css","./datepicker-e55fd098.js","./datepicker-10906.css","./Switch-6cc647ca.js","./Switch-10906.css","./useMutation-cf66945e.js","./Settings-10906.css"],import.meta.url));return e.createElement("div",{className:"urlslab-tableView"},e.createElement(y,{moduleMenu:s,activeMenu:d=>l(d)}),n==="overview"&&e.createElement(h,{moduleId:a},e.createElement(g,null)),n===o&&e.createElement(t.Suspense,null,e.createElement(c,{slug:o})),n==="d3-chart"&&e.createElement(t.Suspense,null,e.createElement(u,{slug:"d3-chart"})),n==="settings"&&e.createElement(t.Suspense,null,e.createElement(m,{className:"fadeInto",settingId:a})))}export{k as default};