import{r as n,R as e,t as S}from"../main-1zcr21yo78.js";function F({defaultValue:h,placeholder:b,message:c,liveUpdate:u,className:m,type:l,disabled:v,label:i,labelInline:d,onChange:o,children:a,style:s}){const[k,p]=n.useState(h||"");n.useState(!1);const f=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,_=n.useCallback(t=>{o&&o(l==="number"?t.target.valueAsNumber:t.target.value)},[o,l]),x=t=>{u&&S(()=>_(t),800)()},E=()=>k?l==="email"&&f.test(k)?"has-value success":l!=="email"?"has-value":"has-value error":"";return e.createElement("label",{className:`urlslab-inputField-wrap ${m||""} ${d?"inline":""} ${E()}`,style:s},i?e.createElement("span",{className:"urlslab-inputField-label"},i):null,e.createElement("div",{className:`urlslab-inputField ${a?"has-svg":""}`},a,e.createElement("input",{className:"urlslab-input input__text",type:l||"text",defaultValue:k,onChange:t=>{p(t.target.value),x(t)},onBlur:t=>_(t),onKeyDown:t=>{(t.key==="Enter"||t.keyCode===9)&&t.target.blur()},placeholder:b,disabled:v?"disabled":""})),c!=null&&c.length&&E().length?e.createElement("div",{className:"urlslab-inputField-message"},c):null)}function C({checked:h,readOnly:b,radial:c,name:u,className:m,onChange:l,textBefore:v,children:i}){const[d,o]=n.useState(!!h),a=s=>{l&&!b&&l(s.target.checked),b||o(s.target.checked)};return e.createElement("label",{className:`urlslab-checkbox ${m||""} ${v?"textBefore":""} ${c?"radial":""}`},e.createElement("input",{className:`urlslab-checkbox-input ${h?"checked":""}`,type:u?"radio":"checkbox",name:u||"",defaultChecked:d,onChange:s=>a(s)}),e.createElement("div",{className:"urlslab-checkbox-box"}),e.createElement("span",{className:"urlslab-checkbox-text",dangerouslySetInnerHTML:{__html:i}}))}function y({className:h,name:b,style:c,children:u,items:m,checkedId:l,autoClose:v,disabled:i,isFilter:d,onChange:o}){const[a,s]=n.useState(!1),[k,p]=n.useState(!1),[f,_]=n.useState(l),x=n.useRef(!1),E=n.useRef(b);n.useEffect(()=>{const r=$=>{var M;!((M=E.current)!=null&&M.contains($.target))&&a&&(s(!1),p(!1))};o&&x.current&&!a&&f!==l&&o(f),x.current=!0,document.addEventListener("click",r,!0)},[f,a]);const t=r=>{_(r),v&&(s(!1),p(!1))},N=()=>{s(!a),setTimeout(()=>{p(!k)},100)};return e.createElement("div",{className:`urlslab-FilterMenu urlslab-SortMenu ${i&&"disabled"} ${h||""} ${a?"active":""}`,style:c,ref:E},!d&&u?e.createElement("div",{className:"urlslab-inputField-label",dangerouslySetInnerHTML:{__html:u}}):null,e.createElement("div",{className:`urlslab-FilterMenu__title ${d?"isFilter":""} ${a?"active":""}`,onClick:!i&&N,onKeyUp:r=>{i||N()},role:"button",tabIndex:0},e.createElement("span",{dangerouslySetInnerHTML:{__html:d?u:m[f]}})),e.createElement("div",{className:`urlslab-FilterMenu__items ${a?"active":""} ${k?"visible":""}`},e.createElement("div",{className:`urlslab-FilterMenu__items--inn ${Object.values(m).length>8?"has-scrollbar":""}`},Object.entries(m).map(([r,$])=>e.createElement(C,{className:"urlslab-FilterMenu__item",key:r,id:r,onChange:()=>t(r),name:b,checked:r===f,radial:!0},$)))))}export{C,F as I,y as S};