var P=Object.defineProperty,f=Object.defineProperties;var u=Object.getOwnPropertyDescriptors;var c=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable;var g=(a,s,e)=>s in a?P(a,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[s]=e,t=(a,s)=>{for(var e in s||(s={}))N.call(s,e)&&g(a,e,s[e]);if(c)for(var e of c(s))d.call(s,e)&&g(a,e,s[e]);return a},p=(a,s)=>f(a,u(s));var o=(a,s)=>{var e={};for(var i in a)N.call(a,i)&&s.indexOf(i)<0&&(e[i]=a[i]);if(a!=null&&c)for(var i of c(a))s.indexOf(i)<0&&d.call(a,i)&&(e[i]=a[i]);return e};import{j as n,k as l,r as j,l as h,m as y,n as v}from"./index-BEnNszjz.js";import{C as w}from"./chevron-left-IzAagY22.js";const C=e=>{var i=e,{className:a}=i,s=o(i,["className"]);return n.jsx("nav",t({role:"navigation","aria-label":"pagination",className:l("mx-auto flex w-full justify-center",a)},s))};C.displayName="Pagination";const E=j.forwardRef((i,e)=>{var r=i,{className:a}=r,s=o(r,["className"]);return n.jsx("ul",t({ref:e,className:l("flex flex-row items-center gap-1",a)},s))});E.displayName="PaginationContent";const b=j.forwardRef((i,e)=>{var r=i,{className:a}=r,s=o(r,["className"]);return n.jsx("li",t({ref:e,className:l("",a)},s))});b.displayName="PaginationItem";const m=r=>{var x=r,{className:a,isActive:s,size:e="icon"}=x,i=o(x,["className","isActive","size"]);return n.jsx("a",t({"aria-current":s?"page":void 0,className:l(h({variant:s?"outline":"ghost",size:e}),a)},i))};m.displayName="PaginationLink";const R=e=>{var i=e,{className:a}=i,s=o(i,["className"]);return n.jsxs(m,p(t({"aria-label":"Go to previous page",size:"default",className:l("gap-1 pl-2.5",a)},s),{children:[n.jsx(w,{className:"h-4 w-4"}),n.jsx("span",{children:"Previous"})]}))};R.displayName="PaginationPrevious";const k=e=>{var i=e,{className:a}=i,s=o(i,["className"]);return n.jsxs(m,p(t({"aria-label":"Go to next page",size:"default",className:l("gap-1 pr-2.5",a)},s),{children:[n.jsx("span",{children:"Next"}),n.jsx(y,{className:"h-4 w-4"})]}))};k.displayName="PaginationNext";const L=e=>{var i=e,{className:a}=i,s=o(i,["className"]);return n.jsxs("span",p(t({"aria-hidden":!0,className:l("flex h-9 w-9 items-center justify-center",a)},s),{children:[n.jsx(v,{className:"h-4 w-4"}),n.jsx("span",{className:"sr-only",children:"More pages"})]}))};L.displayName="PaginationEllipsis";export{C as Pagination,E as PaginationContent,L as PaginationEllipsis,b as PaginationItem,m as PaginationLink,k as PaginationNext,R as PaginationPrevious};
