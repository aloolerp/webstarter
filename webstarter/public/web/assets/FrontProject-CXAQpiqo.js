import{r as a,u as w,$ as C,j as e,B as g}from"./index-BEnNszjz.js";const _=()=>{const[i,u]=a.useState([]),[d,l]=a.useState([]),[r,n]=a.useState(1),[j,p]=a.useState("All"),o=6,f=w(),{data:c,error:b}=C("Front Project",{fields:["name","header","subtitle","published_on","category","route","image","designer","featured"],filters:[["published","=",1]]});a.useEffect(()=>{if(c){const t=[...c].sort((s,h)=>h.featured-s.featured||new Date(h.published_on).getTime()-new Date(s.published_on).getTime());u(t),l(t)}},[c]);const v=t=>{p(t),l(t==="All"?i:i.filter(s=>s.category===t)),n(1)},x=r*o,N=x-o,P=d.slice(N,x),m=Math.ceil(d.length/o);if(b)return e.jsx("p",{children:"Error fetching Projects"});const y=["All",...new Set(i.map(t=>t.category))];return e.jsx("section",{children:e.jsxs("div",{className:"container mx-auto",children:[e.jsxs("div",{className:"text-center mb-20 p-10 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]",children:[e.jsx("h1",{className:"text-5xl font-bold text-gray-800",children:"Our Recent Projects"}),e.jsx("p",{className:"text-gray-600 text-lg mt-2",children:"Discover some of our most recent and innovative projects."})]}),e.jsx("div",{className:"mb-14 border-b border-gray-200",children:e.jsx("nav",{className:"flex space-x-4 overflow-x-auto",children:y.map((t,s)=>e.jsx("button",{onClick:()=>v(t),className:`px-3 py-2 text-sm font-medium ${j===t?"text-primary border-b-2 border-primary":"text-gray-500"}`,children:t},s))})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",children:P.map((t,s)=>e.jsxs("article",{className:"relative overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105",children:[t.image&&e.jsx("img",{src:t.image,alt:t.header,className:"absolute inset-0 h-full w-full object-cover"}),e.jsx("div",{className:"relative bg-gradient-to-t from-gray-900/60 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64",children:e.jsxs("div",{className:"p-4 sm:p-6",children:[e.jsx("time",{className:"block text-xs text-white/90",children:new Date(t.published_on).toLocaleDateString()}),e.jsx("a",{href:"#",onClick:()=>f(`/web/projects/${t.name}`),children:e.jsx("h3",{className:"mt-0.5 font-semibold text-lg text-white hover:text-primary",children:t.header})}),e.jsx("p",{className:"mt-2 line-clamp-3 text-sm/relaxed text-white/95",children:t.subtitle}),e.jsx("span",{className:"p-4 text-xs bg-white/50 text-black px-2 py-1 rounded-full",children:t.category})]})})]},s))}),e.jsxs("div",{className:"mt-28 mb-20 flex justify-center items-center",children:[e.jsx(g,{variant:"outline",onClick:()=>n(r-1),disabled:r===1,children:"Previous"}),e.jsxs("span",{className:"mx-4 text-lg text-gray-800",children:[r," of ",m]}),e.jsx(g,{variant:"outline",onClick:()=>n(r+1),disabled:r===m,children:"Next"})]})]})})};export{_ as default};
