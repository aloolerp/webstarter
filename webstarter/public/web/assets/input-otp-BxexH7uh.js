var We=Object.defineProperty,Ae=Object.defineProperties;var Be=Object.getOwnPropertyDescriptors;var Y=Object.getOwnPropertySymbols;var he=Object.prototype.hasOwnProperty,be=Object.prototype.propertyIsEnumerable;var ge=(e,t,n)=>t in e?We(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,V=(e,t)=>{for(var n in t||(t={}))he.call(t,n)&&ge(e,n,t[n]);if(Y)for(var n of Y(t))be.call(t,n)&&ge(e,n,t[n]);return e},ie=(e,t)=>Ae(e,Be(t));var q=(e,t)=>{var n={};for(var o in e)he.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&Y)for(var o of Y(e))t.indexOf(o)<0&&be.call(e,o)&&(n[o]=e[o]);return n};import{r,j as I,k as Z}from"./index-BEnNszjz.js";import{D as Ne}from"./dot-GwpYBI7M.js";var _e=Object.defineProperty,Fe=Object.defineProperties,He=Object.getOwnPropertyDescriptors,ee=Object.getOwnPropertySymbols,Se=Object.prototype.hasOwnProperty,Ee=Object.prototype.propertyIsEnumerable,we=(e,t,n)=>t in e?_e(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Le=(e,t)=>{for(var n in t||(t={}))Se.call(t,n)&&we(e,n,t[n]);if(ee)for(var n of ee(t))Ee.call(t,n)&&we(e,n,t[n]);return e},$e=(e,t)=>Fe(e,He(t)),Ge=(e,t)=>{var n={};for(var o in e)Se.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&ee)for(var o of ee(e))t.indexOf(o)<0&&Ee.call(e,o)&&(n[o]=e[o]);return n},ze="^\\d+$";function Ve(e){let t=setTimeout(e,0),n=setTimeout(e,10),o=setTimeout(e,50);return[t,n,o]}function qe(e){let t=r.useRef();return r.useEffect(()=>{t.current=e}),t.current}var Ue=18,xe=40,Je=`${xe}px`,Ke=["[data-lastpass-icon-root]","com-1password-button","[data-dashlanecreated]",'[style$="2147483647 !important;"]'].join(",");function Qe({containerRef:e,inputRef:t,pushPasswordManagerStrategy:n,isFocused:o}){let g=r.useRef({done:!1,refocused:!1}),[u,W]=r.useState(!1),[b,A]=r.useState(!1),[x,J]=r.useState(!1),te=r.useMemo(()=>n==="none"?!1:(n==="increase-width"||n==="experimental-no-flickering")&&u&&b,[u,b,n]),M=r.useCallback(()=>{let f=e.current,d=t.current;if(!f||!d||x||n==="none")return;let i=f,S=i.getBoundingClientRect().left+i.offsetWidth,B=i.getBoundingClientRect().top+i.offsetHeight/2,K=S-Ue,Q=B;if(!(document.querySelectorAll(Ke).length===0&&document.elementFromPoint(K,Q)===f)&&(W(!0),J(!0),!g.current.refocused&&document.activeElement===d)){let H=[d.selectionStart,d.selectionEnd];d.blur(),d.focus(),d.setSelectionRange(H[0],H[1]),g.current.refocused=!0}},[e,t,x,n]);return r.useEffect(()=>{let f=e.current;if(!f||n==="none")return;function d(){let S=window.innerWidth-f.getBoundingClientRect().right;A(S>=xe)}d();let i=setInterval(d,1e3);return()=>{clearInterval(i)}},[e,n]),r.useEffect(()=>{let f=o||document.activeElement===t.current;if(n==="none"||!f)return;let d=setTimeout(M,0),i=setTimeout(M,2e3),S=setTimeout(M,5e3),B=setTimeout(()=>{J(!0)},6e3);return()=>{clearTimeout(d),clearTimeout(i),clearTimeout(S),clearTimeout(B)}},[t,o,n,M]),{hasPWMBadge:u,willPushPWMBadge:te,PWM_BADGE_SPACE_WIDTH:Je}}var ye=r.createContext({}),Pe=r.forwardRef((e,t)=>{var n=e,{value:o,onChange:g,maxLength:u,textAlign:W="left",pattern:b=ze,inputMode:A="numeric",onComplete:x,pushPasswordManagerStrategy:J="increase-width",containerClassName:te,noScriptCSSFallback:M=Xe,render:f,children:d}=n,i=Ge(n,["value","onChange","maxLength","textAlign","pattern","inputMode","onComplete","pushPasswordManagerStrategy","containerClassName","noScriptCSSFallback","render","children"]),S,B,K,Q,H;let[Ce,Me]=r.useState(typeof i.defaultValue=="string"?i.defaultValue:""),p=o!=null?o:Ce,k=qe(p),L=r.useCallback(a=>{g==null||g(a),Me(a)},[g]),w=r.useMemo(()=>b?typeof b=="string"?new RegExp(b):b:null,[b]),c=r.useRef(null),ne=r.useRef(null),re=r.useRef({value:p,onChange:L,isIOS:typeof window!="undefined"&&((B=(S=window==null?void 0:window.CSS)==null?void 0:S.supports)==null?void 0:B.call(S,"-webkit-touch-callout","none"))}),X=r.useRef({prev:[(K=c.current)==null?void 0:K.selectionStart,(Q=c.current)==null?void 0:Q.selectionEnd,(H=c.current)==null?void 0:H.selectionDirection]});r.useImperativeHandle(t,()=>c.current,[]),r.useEffect(()=>{let a=c.current,l=ne.current;if(!a||!l)return;re.current.value!==a.value&&re.current.onChange(a.value),X.current.prev=[a.selectionStart,a.selectionEnd,a.selectionDirection];function m(){if(document.activeElement!==a){G(null),z(null);return}let s=a.selectionStart,h=a.selectionEnd,y=a.selectionDirection,O=a.maxLength,R=a.value,F=X.current.prev,P=-1,C=-1,T;if(R.length!==0&&s!==null&&h!==null){let Te=s===h,De=s===R.length&&R.length<O;if(Te&&!De){let D=s;if(D===0)P=0,C=1,T="forward";else if(D===O)P=D-1,C=D,T="backward";else if(O>1&&R.length>1){let oe=0;if(F[0]!==null&&F[1]!==null){T=D<F[1]?"backward":"forward";let Ie=F[0]===F[1]&&F[0]<O;T==="backward"&&!Ie&&(oe=-1)}P=oe+D,C=oe+D+1}}P!==-1&&C!==-1&&P!==C&&c.current.setSelectionRange(P,C,T)}let fe=P!==-1?P:s,ve=C!==-1?C:h,Re=T!=null?T:y;G(fe),z(ve),X.current.prev=[fe,ve,Re]}if(document.addEventListener("selectionchange",m,{capture:!0}),m(),document.activeElement===a&&ae(!0),!document.getElementById("input-otp-style")){let s=document.createElement("style");if(s.id="input-otp-style",document.head.appendChild(s),s.sheet){let h="background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;";U(s.sheet,"[data-input-otp]::selection { background: transparent !important; color: transparent !important; }"),U(s.sheet,`[data-input-otp]:autofill { ${h} }`),U(s.sheet,`[data-input-otp]:-webkit-autofill { ${h} }`),U(s.sheet,"@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }"),U(s.sheet,"[data-input-otp] + * { pointer-events: all !important; }")}}let v=()=>{l&&l.style.setProperty("--root-height",`${a.clientHeight}px`)};v();let E=new ResizeObserver(v);return E.observe(a),()=>{document.removeEventListener("selectionchange",m,{capture:!0}),E.disconnect()}},[]);let[ue,se]=r.useState(!1),[$,ae]=r.useState(!1),[j,G]=r.useState(null),[N,z]=r.useState(null);r.useEffect(()=>{Ve(()=>{var a,l,m,v;(a=c.current)==null||a.dispatchEvent(new Event("input"));let E=(l=c.current)==null?void 0:l.selectionStart,s=(m=c.current)==null?void 0:m.selectionEnd,h=(v=c.current)==null?void 0:v.selectionDirection;E!==null&&s!==null&&(G(E),z(s),X.current.prev=[E,s,h])})},[p,$]),r.useEffect(()=>{k!==void 0&&p!==k&&k.length<u&&p.length===u&&(x==null||x(p))},[u,x,k,p]);let _=Qe({containerRef:ne,inputRef:c,pushPasswordManagerStrategy:J,isFocused:$}),ce=r.useCallback(a=>{let l=a.currentTarget.value.slice(0,u);if(l.length>0&&w&&!w.test(l)){a.preventDefault();return}typeof k=="string"&&l.length<k.length&&document.dispatchEvent(new Event("selectionchange")),L(l)},[u,L,k,w]),pe=r.useCallback(()=>{var a;if(c.current){let l=Math.min(c.current.value.length,u-1),m=c.current.value.length;(a=c.current)==null||a.setSelectionRange(l,m),G(l),z(m)}ae(!0)},[u]),de=r.useCallback(a=>{var l,m;let v=c.current;if(!re.current.isIOS||!a.clipboardData||!v)return;let E=a.clipboardData.getData("text/plain");a.preventDefault();let s=(l=c.current)==null?void 0:l.selectionStart,h=(m=c.current)==null?void 0:m.selectionEnd,y=(s!==h?p.slice(0,s)+E+p.slice(h):p.slice(0,s)+E+p.slice(s)).slice(0,u);if(y.length>0&&w&&!w.test(y))return;v.value=y,L(y);let O=Math.min(y.length,u-1),R=y.length;v.setSelectionRange(O,R),G(O),z(R)},[u,L,w,p]),ke=r.useMemo(()=>({position:"relative",cursor:i.disabled?"default":"text",userSelect:"none",WebkitUserSelect:"none",pointerEvents:"none"}),[i.disabled]),me=r.useMemo(()=>({position:"absolute",inset:0,width:_.willPushPWMBadge?`calc(100% + ${_.PWM_BADGE_SPACE_WIDTH})`:"100%",clipPath:_.willPushPWMBadge?`inset(0 ${_.PWM_BADGE_SPACE_WIDTH} 0 0)`:void 0,height:"100%",display:"flex",textAlign:W,opacity:"1",color:"transparent",pointerEvents:"all",background:"transparent",caretColor:"transparent",border:"0 solid transparent",outline:"0 solid transparent",boxShadow:"none",lineHeight:"1",letterSpacing:"-.5em",fontSize:"var(--root-height)",fontFamily:"monospace",fontVariantNumeric:"tabular-nums"}),[_.PWM_BADGE_SPACE_WIDTH,_.willPushPWMBadge,W]),je=r.useMemo(()=>r.createElement("input",$e(Le({autoComplete:i.autoComplete||"one-time-code"},i),{"data-input-otp":!0,"data-input-otp-mss":j,"data-input-otp-mse":N,inputMode:A,pattern:w==null?void 0:w.source,style:me,maxLength:u,value:p,ref:c,onPaste:a=>{var l;de(a),(l=i.onPaste)==null||l.call(i,a)},onChange:ce,onMouseOver:a=>{var l;se(!0),(l=i.onMouseOver)==null||l.call(i,a)},onMouseLeave:a=>{var l;se(!1),(l=i.onMouseLeave)==null||l.call(i,a)},onFocus:a=>{var l;pe(),(l=i.onFocus)==null||l.call(i,a)},onBlur:a=>{var l;ae(!1),(l=i.onBlur)==null||l.call(i,a)}})),[ce,pe,de,A,me,u,N,j,i,w==null?void 0:w.source,p]),le=r.useMemo(()=>({slots:Array.from({length:u}).map((a,l)=>{let m=$&&j!==null&&N!==null&&(j===N&&l===j||l>=j&&l<N),v=p[l]!==void 0?p[l]:null;return{char:v,isActive:m,hasFakeCaret:m&&v===null}}),isFocused:$,isHovering:!i.disabled&&ue}),[$,ue,u,N,j,i.disabled,p]),Oe=r.useMemo(()=>f?f(le):r.createElement(ye.Provider,{value:le},d),[d,le,f]);return r.createElement(r.Fragment,null,M!==null&&r.createElement("noscript",null,r.createElement("style",null,M)),r.createElement("div",{ref:ne,"data-input-otp-container":!0,style:ke,className:te},Oe,r.createElement("div",{style:{position:"absolute",inset:0,pointerEvents:"none"}},je)))});Pe.displayName="Input";function U(e,t){try{e.insertRule(t)}catch(n){console.error("input-otp could not insert CSS rule:",t)}}var Xe=`
[data-input-otp] {
  --nojs-bg: white !important;
  --nojs-fg: black !important;

  background-color: var(--nojs-bg) !important;
  color: var(--nojs-fg) !important;
  caret-color: var(--nojs-fg) !important;
  letter-spacing: .25em !important;
  text-align: center !important;
  border: 1px solid var(--nojs-fg) !important;
  border-radius: 4px !important;
  width: 100% !important;
}
@media (prefers-color-scheme: dark) {
  [data-input-otp] {
    --nojs-bg: black !important;
    --nojs-fg: white !important;
  }
}`;const Ye=r.forwardRef((g,o)=>{var u=g,{className:e,containerClassName:t}=u,n=q(u,["className","containerClassName"]);return I.jsx(Pe,V({ref:o,containerClassName:Z("flex items-center gap-2 has-[:disabled]:opacity-50",t),className:Z("disabled:cursor-not-allowed",e)},n))});Ye.displayName="InputOTP";const Ze=r.forwardRef((o,n)=>{var g=o,{className:e}=g,t=q(g,["className"]);return I.jsx("div",V({ref:n,className:Z("flex items-center",e)},t))});Ze.displayName="InputOTPGroup";const et=r.forwardRef((g,o)=>{var u=g,{index:e,className:t}=u,n=q(u,["index","className"]);const W=r.useContext(ye),{char:b,hasFakeCaret:A,isActive:x}=W.slots[e];return I.jsxs("div",ie(V({ref:o,className:Z("relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",x&&"z-10 ring-2 ring-ring ring-offset-background",t)},n),{children:[b,A&&I.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center",children:I.jsx("div",{className:"h-4 w-px animate-caret-blink bg-foreground duration-1000"})})]}))});et.displayName="InputOTPSlot";const tt=r.forwardRef((n,t)=>{var e=q(n,[]);return I.jsx("div",ie(V({ref:t,role:"separator"},e),{children:I.jsx(Ne,{})}))});tt.displayName="InputOTPSeparator";export{Ye as InputOTP,Ze as InputOTPGroup,tt as InputOTPSeparator,et as InputOTPSlot};
