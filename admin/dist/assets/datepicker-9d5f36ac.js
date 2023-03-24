import{r as c,R as e}from"../main.js";function S({defaultValue:f,placeholder:o,message:r,className:u,type:s,disabled:b,label:i,labelInline:h,onChange:t,children:d,style:k}){const[l,m]=c.useState(f||"");c.useState(!1);const _=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,p=a=>{t&&t(a.target.value)},v=()=>l?s==="email"&&_.test(l)?"has-value success":s!=="email"?"has-value":"has-value error":"";return e.createElement("label",{className:`urlslab-inputField-wrap ${u||""} ${h?"inline":""} ${v()}`,style:k},i?e.createElement("span",{className:"urlslab-inputField-label"},i):null,e.createElement("div",{className:`urlslab-inputField ${d?"has-svg":""}`},d,e.createElement("input",{className:"urlslab-input input__text",type:s||"text",defaultValue:l,onChange:a=>m(a.target.value),onBlur:a=>p(a),onKeyDown:a=>{(a.key==="Enter"||a.keyCode===9)&&a.target.blur()},placeholder:o,disabled:b?"disabled":""})),r!=null&&r.length&&v().length?e.createElement("div",{className:"urlslab-inputField-message"},r):null)}function N({checked:f,readOnly:o,radial:r,name:u,className:s,onChange:b,textBefore:i,children:h}){const[t,d]=c.useState(!!f),k=l=>{b&&!o&&b(l.target.checked),o||d(l.target.checked)};return e.createElement("label",{className:`urlslab-checkbox ${s||""} ${i?"textBefore":""} ${r?"radial":""}`},e.createElement("input",{className:`urlslab-checkbox-input ${f?"checked":""}`,type:u?"radio":"checkbox",name:u||"",defaultChecked:t,onChange:l=>k(l)}),e.createElement("div",{className:"urlslab-checkbox-box"}),e.createElement("span",{className:"urlslab-checkbox-text",dangerouslySetInnerHTML:{__html:h}}))}function C({className:f,name:o,style:r,children:u,items:s,checkedId:b,isFilter:i,onChange:h}){const[t,d]=c.useState(!1),[k,l]=c.useState(!1),[m,_]=c.useState(b),p=c.useRef(!1),v=c.useRef(o);c.useEffect(()=>{const n=E=>{var $;!(($=v.current)!=null&&$.contains(E.target))&&t&&(d(!1),l(!1))};h&&p.current&&!t&&m!==b&&h(m),p.current=!0,document.addEventListener("click",n,!0)},[m,t]);const a=n=>{_(n)},x=()=>{d(!t),setTimeout(()=>{l(!k)},100)};return e.createElement("div",{className:`urlslab-FilterMenu urlslab-SortMenu ${f||""} ${t?"active":""}`,style:r,ref:v},!i&&u?e.createElement("div",{className:"urlslab-inputField-label",dangerouslySetInnerHTML:{__html:u}}):null,e.createElement("div",{className:`urlslab-FilterMenu__title ${i?"isFilter":""} ${t?"active":""}`,onClick:x,onKeyUp:n=>x(),role:"button",tabIndex:0,dangerouslySetInnerHTML:{__html:i?u:s[m]}}),e.createElement("div",{className:`urlslab-FilterMenu__items ${t?"active":""} ${k?"visible":""}`},e.createElement("div",{className:`urlslab-FilterMenu__items--inn ${Object.values(s).length>8?"has-scrollbar":""}`},Object.entries(s).map(([n,E])=>e.createElement(N,{className:"urlslab-FilterMenu__item",key:n,id:n,onChange:()=>a(n),name:o,checked:n===m,radial:!0},E)))))}export{N as C,S as I,C as S};