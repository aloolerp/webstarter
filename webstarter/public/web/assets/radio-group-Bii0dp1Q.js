var W=Object.defineProperty,X=Object.defineProperties;var Y=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var G=(e,r,o)=>r in e?W(e,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[r]=o,d=(e,r)=>{for(var o in r||(r={}))I.call(r,o)&&G(e,o,r[o]);if(w)for(var o of w(r))N.call(r,o)&&G(e,o,r[o]);return e},l=(e,r)=>X(e,Y(r));var b=(e,r)=>{var o={};for(var a in e)I.call(e,a)&&r.indexOf(a)<0&&(o[a]=e[a]);if(e!=null&&w)for(var a of w(e))r.indexOf(a)<0&&N.call(e,a)&&(o[a]=e[a]);return o};import{p as S,r as u,ai as _,j as i,P as E,ak as C,aC as J,au as Q,aD as Z,b5 as A,aw as ee,ax as oe,b6 as re,b7 as ae,k as D,C as te}from"./index-BEnNszjz.js";var P="Radio",[se,M]=S(P),[ne,ie]=se(P),O=u.forwardRef((e,r)=>{const k=e,{__scopeRadio:o,name:a,checked:t=!1,required:s,disabled:n,value:R="on",onCheck:p,form:f}=k,x=b(k,["__scopeRadio","name","checked","required","disabled","value","onCheck","form"]),[m,v]=u.useState(null),h=_(r,g=>v(g)),c=u.useRef(!1),y=m?f||!!m.closest("form"):!0;return i.jsxs(ne,{scope:o,checked:t,disabled:n,children:[i.jsx(E.button,l(d({type:"button",role:"radio","aria-checked":t,"data-state":L(t),"data-disabled":n?"":void 0,disabled:n,value:R},x),{ref:h,onClick:C(e.onClick,g=>{t||p==null||p(),y&&(c.current=g.isPropagationStopped(),c.current||g.stopPropagation())})})),y&&i.jsx(ce,{control:m,bubbles:!c.current,name:a,value:R,checked:t,required:s,disabled:n,form:f,style:{transform:"translateX(-100%)"}})]})});O.displayName=P;var F="RadioIndicator",q=u.forwardRef((e,r)=>{const n=e,{__scopeRadio:o,forceMount:a}=n,t=b(n,["__scopeRadio","forceMount"]),s=ie(F,o);return i.jsx(J,{present:a||s.checked,children:i.jsx(E.span,l(d({"data-state":L(s.checked),"data-disabled":s.disabled?"":void 0},t),{ref:r}))})});q.displayName=F;var ce=e=>{const p=e,{control:r,checked:o,bubbles:a=!0}=p,t=b(p,["control","checked","bubbles"]),s=u.useRef(null),n=Q(o),R=Z(r);return u.useEffect(()=>{const f=s.current,x=window.HTMLInputElement.prototype,v=Object.getOwnPropertyDescriptor(x,"checked").set;if(n!==o&&v){const h=new Event("click",{bubbles:a});v.call(f,o),f.dispatchEvent(h)}},[n,o,a]),i.jsx("input",l(d({type:"radio","aria-hidden":!0,defaultChecked:o},t),{tabIndex:-1,ref:s,style:l(d(d({},e.style),R),{position:"absolute",pointerEvents:"none",opacity:0,margin:0})}))};function L(e){return e?"checked":"unchecked"}var de=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],j="RadioGroup",[ue,xe]=S(j,[A,M]),K=A(),V=M(),[le,pe]=ue(j),T=u.forwardRef((e,r)=>{const g=e,{__scopeRadioGroup:o,name:a,defaultValue:t,value:s,required:n=!1,disabled:R=!1,orientation:p,dir:f,loop:x=!0,onValueChange:m}=g,v=b(g,["__scopeRadioGroup","name","defaultValue","value","required","disabled","orientation","dir","loop","onValueChange"]),h=K(o),c=ee(f),[y,k]=oe({prop:s,defaultProp:t,onChange:m});return i.jsx(le,{scope:o,name:a,required:n,disabled:R,value:y,onValueChange:k,children:i.jsx(re,l(d({asChild:!0},h),{orientation:p,dir:c,loop:x,children:i.jsx(E.div,l(d({role:"radiogroup","aria-required":n,"aria-orientation":p,"data-disabled":R?"":void 0,dir:c},v),{ref:r}))}))})});T.displayName=j;var U="RadioGroupItem",z=u.forwardRef((e,r)=>{const h=e,{__scopeRadioGroup:o,disabled:a}=h,t=b(h,["__scopeRadioGroup","disabled"]),s=pe(U,o),n=s.disabled||a,R=K(o),p=V(o),f=u.useRef(null),x=_(r,f),m=s.value===t.value,v=u.useRef(!1);return u.useEffect(()=>{const c=k=>{de.includes(k.key)&&(v.current=!0)},y=()=>v.current=!1;return document.addEventListener("keydown",c),document.addEventListener("keyup",y),()=>{document.removeEventListener("keydown",c),document.removeEventListener("keyup",y)}},[]),i.jsx(ae,l(d({asChild:!0},R),{focusable:!n,active:m,children:i.jsx(O,l(d(d({disabled:n,required:s.required,checked:m},p),t),{name:s.name,ref:x,onCheck:()=>s.onValueChange(t.value),onKeyDown:C(c=>{c.key==="Enter"&&c.preventDefault()}),onFocus:C(t.onFocus,()=>{var c;v.current&&((c=f.current)==null||c.click())})}))}))});z.displayName=U;var fe="RadioGroupIndicator",B=u.forwardRef((e,r)=>{const s=e,{__scopeRadioGroup:o}=s,a=b(s,["__scopeRadioGroup"]),t=V(o);return i.jsx(q,l(d(d({},t),a),{ref:r}))});B.displayName=fe;var H=T,$=z,ve=B;const Re=u.forwardRef((a,o)=>{var t=a,{className:e}=t,r=b(t,["className"]);return i.jsx(H,l(d({className:D("grid gap-2",e)},r),{ref:o}))});Re.displayName=H.displayName;const me=u.forwardRef((a,o)=>{var t=a,{className:e}=t,r=b(t,["className"]);return i.jsx($,l(d({ref:o,className:D("aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",e)},r),{children:i.jsx(ve,{className:"flex items-center justify-center",children:i.jsx(te,{className:"h-2.5 w-2.5 fill-current text-current"})})}))});me.displayName=$.displayName;export{Re as RadioGroup,me as RadioGroupItem};
