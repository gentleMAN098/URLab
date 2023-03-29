import{R as e,u,r as t,_ as r}from"../main-8fxsj3hh07g.js";import{M as d,O as p}from"./ModuleViewHeader-8fxsj3hh07g.js";import"./api-exclamation-8fxsj3hh07g.js";/* empty css                             */function S(){return e.createElement(e.Fragment,null,e.createElement("p",null,"The use of inline CSS instead of external CSS files is a great way to improve page performance and reduce content-blocker requests. Inline CSS is a way to add styling directly to an HTML element, eliminating the need to make additional requests to external CSS files, thus improving page speed."),e.createElement("p",null,"The content-blockers are requests that block other requests for some time during page load, and they are rapidly slowing down page performance and the grade in Core Web Vitals."))}function f({moduleId:n}){const{__:s}=u(),[a,l]=t.useState("overview"),i=new Map([["css-cache",s("Cached CSS Files")]]),o=t.lazy(()=>r(()=>import("./CSSCacheTable-8fxsj3hh07g.js"),["./CSSCacheTable-8fxsj3hh07g.js","../main-8fxsj3hh07g.js","./main.css","./useTableUpdater-8fxsj3hh07g.js","./datepicker-8fxsj3hh07g.js","./datepicker-8fxsj3hh07g.css","./useMutation-8fxsj3hh07g.js","./useTableUpdater-8fxsj3hh07g.css"],import.meta.url)),c=t.lazy(()=>r(()=>import("./Settings-8fxsj3hh07g.js"),["./Settings-8fxsj3hh07g.js","../main-8fxsj3hh07g.js","./main.css","./datepicker-8fxsj3hh07g.js","./datepicker-8fxsj3hh07g.css","./Switch-8fxsj3hh07g.js","./Switch-8fxsj3hh07g.css","./useMutation-8fxsj3hh07g.js","./Settings-8fxsj3hh07g.css"],import.meta.url));return e.createElement("div",{className:"urlslab-tableView"},e.createElement(d,{moduleMenu:i,activeMenu:m=>l(m)}),a==="overview"&&e.createElement(p,{moduleId:n},e.createElement(S,null)),e.createElement(t.Suspense,null,a==="css-cache"&&e.createElement(o,{slug:"css-cache"})),a==="settings"&&e.createElement(t.Suspense,null,e.createElement(c,{className:"fadeInto",settingId:n})))}export{f as default};