import{r as u,u as p,a as _,R as e,s as b}from"../main-im73xvvpd7.js";import{S as v}from"./Switch-im73xvvpd7.js";import{S as h}from"./api-exclamation-im73xvvpd7.js";import{u as f}from"./useMutation-im73xvvpd7.js";const w=""+new URL("optimize-im73xvvpd7.png",import.meta.url).href,L=""+new URL("urlslab-css-optimizer-im73xvvpd7.png",import.meta.url).href,x=""+new URL("urlslab-image-alt-attribute-im73xvvpd7.png",import.meta.url).href,E=""+new URL("urlslab-keywords-links-im73xvvpd7.png",import.meta.url).href,R=""+new URL("urlslab-lazy-loading-im73xvvpd7.png",import.meta.url).href,y=""+new URL("urlslab-link-enhancer-im73xvvpd7.png",import.meta.url).href,U=""+new URL("urlslab-media-offloader-im73xvvpd7.png",import.meta.url).href,k=""+new URL("urlslab-meta-tag-im73xvvpd7.png",import.meta.url).href,N=""+new URL("urlslab-related-resources-im73xvvpd7.png",import.meta.url).href,z=""+new URL("urlslab-screenshot-im73xvvpd7.png",import.meta.url).href,M=""+new URL("urlslab-search-and-replace-im73xvvpd7.png",import.meta.url).href,S=""+new URL("yt_lazy_loading-im73xvvpd7.png",import.meta.url).href,D=a=>u.createElement("svg",{width:15,height:13,viewBox:"0 0 15 13",xmlns:"http://www.w3.org/2000/svg",...a},u.createElement("path",{d:"M8.51351 0L7.37027 1.14562L11.8946 5.6875H0V7.3125H11.8946L7.37027 11.8544L8.51351 13L15 6.5L8.51351 0Z"}));function C({moduleId:a,title:r,children:t,isActive:l,hasApi:c,activePage:i}){const{__:s}=p(),o=_(),n=f({mutationFn:()=>b(a,{active:!l}),onSuccess:()=>{o.setQueryData(["modules",a.active],!l),o.invalidateQueries(["modules"])}}),d=g=>{i&&i(g)},m=new URL(Object.assign({"../assets/images/modules/optimize.png":w,"../assets/images/modules/urlslab-css-optimizer.png":L,"../assets/images/modules/urlslab-image-alt-attribute.png":x,"../assets/images/modules/urlslab-keywords-links.png":E,"../assets/images/modules/urlslab-lazy-loading.png":R,"../assets/images/modules/urlslab-link-enhancer.png":y,"../assets/images/modules/urlslab-media-offloader.png":U,"../assets/images/modules/urlslab-meta-tag.png":k,"../assets/images/modules/urlslab-related-resources.png":N,"../assets/images/modules/urlslab-screenshot.png":z,"../assets/images/modules/urlslab-search-and-replace.png":M,"../assets/images/modules/yt_lazy_loading.png":S})[`../assets/images/modules/${a}.png`],self.location).pathname;return e.createElement("div",{className:`urlslab-dashboardmodule ${n.isLoading?"activating":""} ${l?"active":""}`},c?e.createElement("div",{className:"urlslab-dashboardmodule-api"},e.createElement(h,null),s("URLsLab API Key Required")):"",n.isLoading?e.createElement("div",{className:"urlslab-dashboardmodule-activating"},s(l?"Deactivating…":"Activating…")):"",e.createElement(v,{secondary:!0,onChange:()=>n.mutate(),className:"urlslab-dashboardmodule-switch",label:s("Activate module"),labelOff:s("Deactivate module"),checked:l}),e.createElement("div",{className:"urlslab-dashboardmodule-main flex-tablet flex-align-center"},m?e.createElement("img",{className:"urlslab-dashboardmodule-image fadeInto",src:m,alt:r}):null,e.createElement("h3",{className:"urlslab-dashboardmodule-title"},r),e.createElement("div",{className:"urlslab-dashboardmodule-content"},e.createElement("p",null,t),l?e.createElement("button",{className:"urlslab-learnMore",onClick:()=>d(a)},s("Manage module")," ",e.createElement(D,null)):null)))}function F({modules:a,activePage:r}){if(a.length)return e.createElement(e.Fragment,null,e.createElement("div",{className:"urlslab-modules flex-tablet-landscape flex-wrap"},a.map(t=>t.id!=="general"?e.createElement(C,{key:t.id,moduleId:t.id,hasApi:t.apikey,isActive:t.active,title:t.title,activePage:l=>r(l)},t.description):null)))}export{F as default};
