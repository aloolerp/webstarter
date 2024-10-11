var V=Object.defineProperty,W=Object.defineProperties;var Z=Object.getOwnPropertyDescriptors;var A=Object.getOwnPropertySymbols;var b=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var E=(e,t,o)=>t in e?V(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,l=(e,t)=>{for(var o in t||(t={}))b.call(t,o)&&E(e,o,t[o]);if(A)for(var o of A(t))N.call(t,o)&&E(e,o,t[o]);return e},d=(e,t)=>W(e,Z(t));var v=(e,t)=>{var o={};for(var r in e)b.call(e,r)&&t.indexOf(r)<0&&(o[r]=e[r]);if(e!=null&&A)for(var r of A(e))t.indexOf(r)<0&&N.call(e,r)&&(o[r]=e[r]);return o};import{p as B,ah as y,r as p,j as c,aj as F,ai as S,P as k,ak as C,aC as D,am as J,ao as Q,a9 as X,an as Y,ap as ee,aq as oe,ar as te,at as re,ax as ne,ay as ae,as as se,az as ce,k as ie}from"./index-BEnNszjz.js";var _="Popover",[M,_e]=B(_,[y]),x=y(),[pe,P]=M(_),T=e=>{const{__scopePopover:t,children:o,open:r,defaultOpen:a,onOpenChange:n,modal:s=!1}=e,i=x(t),u=p.useRef(null),[f,m]=p.useState(!1),[R=!1,g]=ne({prop:r,defaultProp:a,onChange:n});return c.jsx(ae,d(l({},i),{children:c.jsx(pe,{scope:t,contentId:se(),triggerRef:u,open:R,onOpenChange:g,onOpenToggle:p.useCallback(()=>g(O=>!O),[g]),hasCustomAnchor:f,onCustomAnchorAdd:p.useCallback(()=>m(!0),[]),onCustomAnchorRemove:p.useCallback(()=>m(!1),[]),modal:s,children:o})}))};T.displayName=_;var I="PopoverAnchor",le=p.forwardRef((e,t)=>{const u=e,{__scopePopover:o}=u,r=v(u,["__scopePopover"]),a=P(I,o),n=x(o),{onCustomAnchorAdd:s,onCustomAnchorRemove:i}=a;return p.useEffect(()=>(s(),()=>i()),[s,i]),c.jsx(F,d(l(l({},n),r),{ref:t}))});le.displayName=I;var $="PopoverTrigger",z=p.forwardRef((e,t)=>{const u=e,{__scopePopover:o}=u,r=v(u,["__scopePopover"]),a=P($,o),n=x(o),s=S(t,a.triggerRef),i=c.jsx(k.button,d(l({type:"button","aria-haspopup":"dialog","aria-expanded":a.open,"aria-controls":a.contentId,"data-state":q(a.open)},r),{ref:s,onClick:C(e.onClick,a.onOpenToggle)}));return a.hasCustomAnchor?i:c.jsx(F,d(l({asChild:!0},n),{children:i}))});z.displayName=$;var w="PopoverPortal",[ue,de]=M(w,{forceMount:void 0}),L=e=>{const{__scopePopover:t,forceMount:o,children:r,container:a}=e,n=P(w,t);return c.jsx(ue,{scope:t,forceMount:o,children:c.jsx(D,{present:o||n.open,children:c.jsx(ce,{asChild:!0,container:a,children:r})})})};L.displayName=w;var h="PopoverContent",G=p.forwardRef((e,t)=>{const o=de(h,e.__scopePopover),s=e,{forceMount:r=o.forceMount}=s,a=v(s,["forceMount"]),n=P(h,e.__scopePopover);return c.jsx(D,{present:r||n.open,children:n.modal?c.jsx(fe,d(l({},a),{ref:t})):c.jsx(ve,d(l({},a),{ref:t}))})});G.displayName=h;var fe=p.forwardRef((e,t)=>{const o=P(h,e.__scopePopover),r=p.useRef(null),a=S(t,r),n=p.useRef(!1);return p.useEffect(()=>{const s=r.current;if(s)return J(s)},[]),c.jsx(Q,{as:X,allowPinchZoom:!0,children:c.jsx(H,d(l({},e),{ref:a,trapFocus:o.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:C(e.onCloseAutoFocus,s=>{var i;s.preventDefault(),n.current||(i=o.triggerRef.current)==null||i.focus()}),onPointerDownOutside:C(e.onPointerDownOutside,s=>{const i=s.detail.originalEvent,u=i.button===0&&i.ctrlKey===!0,f=i.button===2||u;n.current=f},{checkForDefaultPrevented:!1}),onFocusOutside:C(e.onFocusOutside,s=>s.preventDefault(),{checkForDefaultPrevented:!1})}))})}),ve=p.forwardRef((e,t)=>{const o=P(h,e.__scopePopover),r=p.useRef(!1),a=p.useRef(!1);return c.jsx(H,d(l({},e),{ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:n=>{var s,i;(s=e.onCloseAutoFocus)==null||s.call(e,n),n.defaultPrevented||(r.current||(i=o.triggerRef.current)==null||i.focus(),n.preventDefault()),r.current=!1,a.current=!1},onInteractOutside:n=>{var u,f;(u=e.onInteractOutside)==null||u.call(e,n),n.defaultPrevented||(r.current=!0,n.detail.originalEvent.type==="pointerdown"&&(a.current=!0));const s=n.target;((f=o.triggerRef.current)==null?void 0:f.contains(s))&&n.preventDefault(),n.detail.originalEvent.type==="focusin"&&a.current&&n.preventDefault()}}))}),H=p.forwardRef((e,t)=>{const j=e,{__scopePopover:o,trapFocus:r,onOpenAutoFocus:a,onCloseAutoFocus:n,disableOutsidePointerEvents:s,onEscapeKeyDown:i,onPointerDownOutside:u,onFocusOutside:f,onInteractOutside:m}=j,R=v(j,["__scopePopover","trapFocus","onOpenAutoFocus","onCloseAutoFocus","disableOutsidePointerEvents","onEscapeKeyDown","onPointerDownOutside","onFocusOutside","onInteractOutside"]),g=P(h,o),O=x(o);return Y(),c.jsx(ee,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:a,onUnmountAutoFocus:n,children:c.jsx(oe,{asChild:!0,disableOutsidePointerEvents:s,onInteractOutside:m,onEscapeKeyDown:i,onPointerDownOutside:u,onFocusOutside:f,onDismiss:()=>g.onOpenChange(!1),children:c.jsx(te,d(l(l({"data-state":q(g.open),role:"dialog",id:g.contentId},O),R),{ref:t,style:d(l({},R.style),{"--radix-popover-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-popover-content-available-width":"var(--radix-popper-available-width)","--radix-popover-content-available-height":"var(--radix-popper-available-height)","--radix-popover-trigger-width":"var(--radix-popper-anchor-width)","--radix-popover-trigger-height":"var(--radix-popper-anchor-height)"})}))})})}),K="PopoverClose",Pe=p.forwardRef((e,t)=>{const n=e,{__scopePopover:o}=n,r=v(n,["__scopePopover"]),a=P(K,o);return c.jsx(k.button,d(l({type:"button"},r),{ref:t,onClick:C(e.onClick,()=>a.onOpenChange(!1))}))});Pe.displayName=K;var ge="PopoverArrow",he=p.forwardRef((e,t)=>{const n=e,{__scopePopover:o}=n,r=v(n,["__scopePopover"]),a=x(o);return c.jsx(re,d(l(l({},a),r),{ref:t}))});he.displayName=ge;function q(e){return e?"open":"closed"}var Ce=T,xe=z,me=L,U=G;const we=Ce,je=xe,Re=p.forwardRef((n,a)=>{var s=n,{className:e,align:t="center",sideOffset:o=4}=s,r=v(s,["className","align","sideOffset"]);return c.jsx(me,{children:c.jsx(U,l({ref:a,align:t,sideOffset:o,className:ie("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e)},r))})});Re.displayName=U.displayName;export{we as Popover,Re as PopoverContent,je as PopoverTrigger};
