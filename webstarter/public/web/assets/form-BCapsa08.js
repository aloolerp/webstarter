var N=Object.defineProperty,b=Object.defineProperties;var w=Object.getOwnPropertyDescriptors;var l=Object.getOwnPropertySymbols;var p=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var u=(e,t,r)=>t in e?N(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,i=(e,t)=>{for(var r in t||(t={}))p.call(t,r)&&u(e,r,t[r]);if(l)for(var r of l(t))I.call(t,r)&&u(e,r,t[r]);return e},C=(e,t)=>b(e,w(t));var c=(e,t)=>{var r={};for(var o in e)p.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&l)for(var o of l(e))t.indexOf(o)<0&&I.call(e,o)&&(r[o]=e[o]);return r};import{a6 as y,r as a,j as d,a7 as h,a8 as R,k as f,b as $,a9 as D}from"./index-BEnNszjz.js";const z=y,g=a.createContext({}),A=t=>{var e=c(t,[]);return d.jsx(g.Provider,{value:{name:e.name},children:d.jsx(h,i({},e))})},x=()=>{const e=a.useContext(g),t=a.useContext(j),{getFieldState:r,formState:o}=R(),m=r(e.name,o);if(!e)throw new Error("useFormField should be used within <FormField>");const{id:s}=t;return i({id:s,name:e.name,formItemId:`${s}-form-item`,formDescriptionId:`${s}-form-item-description`,formMessageId:`${s}-form-item-message`},m)},j=a.createContext({}),M=a.forwardRef((o,r)=>{var m=o,{className:e}=m,t=c(m,["className"]);const s=a.useId();return d.jsx(j.Provider,{value:{id:s},children:d.jsx("div",i({ref:r,className:f("space-y-2",e)},t))})});M.displayName="FormItem";const S=a.forwardRef((o,r)=>{var m=o,{className:e}=m,t=c(m,["className"]);const{error:s,formItemId:n}=x();return d.jsx($,i({ref:r,className:f(s&&"text-destructive",e),htmlFor:n},t))});S.displayName="FormLabel";const E=a.forwardRef((r,t)=>{var e=c(r,[]);const{error:o,formItemId:m,formDescriptionId:s,formMessageId:n}=x();return d.jsx(D,i({ref:t,id:m,"aria-describedby":o?`${s} ${n}`:`${s}`,"aria-invalid":!!o},e))});E.displayName="FormControl";const L=a.forwardRef((o,r)=>{var m=o,{className:e}=m,t=c(m,["className"]);const{formDescriptionId:s}=x();return d.jsx("p",i({ref:r,id:s,className:f("text-sm text-muted-foreground",e)},t))});L.displayName="FormDescription";const P=a.forwardRef((m,o)=>{var s=m,{className:e,children:t}=s,r=c(s,["className","children"]);const{error:n,formMessageId:v}=x(),F=n?String(n==null?void 0:n.message):t;return F?d.jsx("p",C(i({ref:o,id:v,className:f("text-sm font-medium text-destructive",e)},r),{children:F})):null});P.displayName="FormMessage";export{z as Form,E as FormControl,L as FormDescription,A as FormField,M as FormItem,S as FormLabel,P as FormMessage,x as useFormField};
