import{r as l,u as x,$ as u,j as e,B as g}from"./index-BEnNszjz.js";import{A as p}from"./arrow-up-right--PLGhhLg.js";import{A as f}from"./arrow-left-HmZofO2s.js";import{A as b}from"./arrow-right-CsyS5JiY.js";const y=()=>{const[s,o]=l.useState([]),[n,i]=l.useState(0),c=x(),{data:r,error:d}=u("Front Service",{fields:["header","subtitle","category","image","name"],filters:[["published","=",1]]});l.useEffect(()=>{r&&r.length>0&&o(r)},[r]),l.useEffect(()=>{const t=setInterval(()=>{i(a=>a===s.length-1?0:a+1)},5e3);return()=>clearInterval(t)},[s.length]);const h=()=>{i(t=>t===0?s.length-1:t-1)},m=()=>{i(t=>t===s.length-1?0:t+1)};return d?e.jsx("p",{children:"Error loading services data."}):e.jsxs("div",{className:"relative w-full h-[700px] mx-auto",children:[e.jsx("div",{className:"relative h-full",children:s.length>0&&e.jsx(e.Fragment,{children:s.map((t,a)=>e.jsxs("div",{className:`absolute inset-0 transition-opacity duration-1000 ${a===n?"opacity-100 z-10":"opacity-0 z-0"}`,children:[e.jsx("img",{src:t.image,alt:t.header,className:"w-full h-full object-cover"}),e.jsx("div",{className:"absolute  inset-0 bg-gradient-to-t from-black to-transparent flex items-end",children:e.jsxs("div",{className:" md:p-32 text-white  space-y-4",children:[e.jsx("h2",{className:"text-3xl  sm:text-4xl font-bold",children:t.header}),e.jsx("p",{className:"text-lg  sm:text-xl",children:t.subtitle}),e.jsxs(g,{variant:"link",onClick:()=>c(`/web/service/${t.name}`),className:"bg-primary text-white px-6 py-2 rounded-md shadow hover:bg-primary",children:["View",e.jsx(p,{className:"w-4"})]})]})})]},a))})}),s.length>1&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"absolute bottom-4 right-4 flex items-center space-x-2 z-20",children:[e.jsx("button",{onClick:h,className:"bg-white bg-opacity-75 hover:bg-opacity-100 text-primary p-2 m-4 rounded-full shadow",children:e.jsx(f,{className:"w-6 h-6"})}),e.jsx("button",{onClick:m,className:"bg-white bg-opacity-75 hover:bg-opacity-100 text-primary p-2 rounded-full shadow",children:e.jsx(b,{className:"w-6 h-6"})})]}),e.jsx("div",{className:"absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20",children:s.map((t,a)=>e.jsx("div",{className:`h-2 w-2  rounded-full transition-all duration-400 ${a===n?"bg-primary w-6":"bg-white bg-opacity-50"}`},a))})]})]})};export{y as default};
