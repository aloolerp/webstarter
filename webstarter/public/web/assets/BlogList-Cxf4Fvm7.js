import{r as c,u as W,$ as X,M as Y,j as e,S as a,H as Z,a as B,f as F,B as ee}from"./index-BEnNszjz.js";import{Badge as se}from"./badge-CpvcxaUW.js";import{Pagination as le,PaginationContent as ae,PaginationItem as f,PaginationPrevious as te,PaginationLink as ce,PaginationNext as ne}from"./pagination-C15YeIcT.js";import{Select as P,SelectTrigger as _,SelectValue as D,SelectContent as $,SelectGroup as k,SelectLabel as A,SelectSeparator as M,SelectItem as r}from"./select-Cns8l1Ii.js";import"./chevron-left-IzAagY22.js";import"./index-BdQq_4o_.js";import"./chevron-up-D99TzAZj.js";const ge=()=>{const[o,O]=c.useState([]),[x,d]=c.useState(1),[u,L]=c.useState(1),[m,T]=c.useState("all"),[N,E]=c.useState("desc"),h=2,I=W(),[R,v]=c.useState(!1),[H,b]=c.useState(!1),{data:g,error:w,isLoading:V}=X("Blog Post",{fields:["*"],filters:[["published","=",1]],orderBy:{field:"published_on",order:"desc"}}),{data:t,isLoading:z}=Y("Blog Settings","Blog Settings",{fields:["*"]});c.useEffect(()=>{if(g){const s=[...g].sort((p,U)=>{const C=new Date(p.published_on).getTime(),S=new Date(U.published_on).getTime();return N==="asc"?C-S:S-C}),l=m==="all"?s:s.filter(p=>p.blog_category===m);O(l),L(Math.ceil(l.length/h))}},[g,m,N]);const q=s=>{T(s),v(!1)},G=s=>{E(s),b(!1)},n=({isFeatured:s=!1})=>e.jsxs("div",{className:`relative ${s?"lg:col-span-2":""}`,children:[e.jsx(a,{className:`w-full ${s?"h-96":"h-48"}`}),e.jsxs("div",{className:"p-4",children:[e.jsxs("div",{className:"flex items-center space-x-2 text-sm mt-2",children:[e.jsx(a,{className:"w-20 h-4"}),e.jsx(a,{className:"w-4 h-4"}),e.jsx(a,{className:"w-24 h-4"}),e.jsx(a,{className:"w-16 h-6"})]}),e.jsx(a,{className:`w-3/4 h-6 mt-2 ${s?"text-2xl":"text-lg"}`}),s&&e.jsx(a,{className:"w-full h-4 mt-2"}),e.jsx(a,{className:"w-24 h-8 mt-4"})]})]});if(V||z)return e.jsxs("section",{className:"container mx-auto px-4",children:[e.jsx(a,{className:"w-full h-50 mb-8"}),e.jsxs("div",{className:"flex flex-col sm:flex-row justify-end gap-4 mb-8",children:[e.jsx(a,{className:"w-[180px] h-10"}),e.jsx(a,{className:"w-[130px] h-10"})]}),e.jsx(a,{className:"w-1/2 h-8 mb-2"}),e.jsx(a,{className:"w-full h-1 mb-8"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",children:[e.jsx(n,{isFeatured:!0}),e.jsxs("div",{className:"lg:col-span-1 flex flex-col space-y-8",children:[e.jsx(n,{}),e.jsx(n,{})]})]}),e.jsx(a,{className:"w-1/2 h-8 mt-12 mb-4"}),e.jsx(a,{className:"w-full h-1 mb-8"}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",children:[...Array(6)].map((s,l)=>e.jsx(n,{},l))}),e.jsx("div",{className:"flex justify-center mt-8",children:e.jsx(a,{className:"w-[300px] h-10"})})]});if(w)return e.jsxs("div",{children:["Error loading blogs: ",JSON.stringify(w)]});const j=o.slice(0,4),y=j.find(s=>s.featured==="1"),J=j.filter(s=>s.featured!=="1"),K=o.slice((x-1)*h,x*h),Q=[...new Set(o.map(s=>s.blog_category))],i=({blog:s,isFeatured:l=!1})=>e.jsxs("div",{className:`relative ${l?"lg:col-span-2":""}`,children:[e.jsx("img",{src:s.meta_image,alt:s.title,className:`w-full object-cover ${l?"h-96":"h-48"}`}),e.jsxs("div",{className:"p-4",children:[e.jsxs("div",{className:"flex items-center space-x-2 text-sm mt-2",children:[e.jsx("span",{children:s.blogger}),e.jsx("span",{children:"•"}),e.jsx("span",{children:F(new Date(s.published_on),"MMM dd, yyyy")}),e.jsx(se,{variant:"secondary",className:"text-primary capitalize",children:s.blog_category})]}),e.jsx("h3",{className:`font-bold mt-2 hover:text-primary ${l?"text-2xl":"text-lg"}`,children:s.title}),l&&e.jsx("p",{className:"mt-2",children:s.blog_intro}),e.jsx(ee,{variant:"link",onClick:()=>I(`/blog/${s.blog_category}/${s.name}`),className:"flex items-center mt-4",children:"Read more →"})]})]});return e.jsxs("section",{className:"container mx-auto px-4",children:[e.jsxs(Z,{children:[e.jsx("title",{children:"Blog - Alool Technologies"}),e.jsx("meta",{name:"description",content:"Read the latest blogs and updates from Alool Technologies."})]}),e.jsxs("div",{className:"relative h-50 mb-8",children:[t!=null&&t.preview_image?e.jsx("img",{src:t.preview_image,alt:"Blog Header Image",className:"absolute inset-0 w-full h-full object-cover"}):e.jsx(a,{className:"w-full h-full"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black opacity-70"}),e.jsxs("div",{className:"relative z-10 text-center py-16 text-white",children:[e.jsx("h1",{className:"text-4xl font-bold",children:(t==null?void 0:t.blog_title)||"Blogs"}),e.jsx("p",{className:"mt-2",children:(t==null?void 0:t.blog_introduction)||""})]})]}),e.jsxs("div",{className:"flex flex-col sm:flex-row justify-end gap-4 mb-8",children:[e.jsxs(P,{open:R,onOpenChange:v,onValueChange:q,children:[e.jsx(_,{className:"w-full sm:w-[180px]",children:e.jsx(D,{placeholder:"Select a category"})}),e.jsx($,{children:e.jsxs(k,{children:[e.jsx(A,{children:"Blog Categories"}),e.jsx(M,{}),e.jsx(r,{value:"all",children:"All"}),Q.map((s,l)=>e.jsx(r,{value:s,children:s},l))]})})]}),e.jsxs(P,{open:H,onOpenChange:b,onValueChange:G,children:[e.jsx(_,{className:"w-full sm:w-[130px]",children:e.jsx(D,{placeholder:"Sort By Date"})}),e.jsx($,{children:e.jsxs(k,{children:[e.jsx(A,{children:"Sort by Date"}),e.jsx(M,{}),e.jsx(r,{value:"asc",children:"Ascending"}),e.jsx(r,{value:"desc",children:"Descending"})]})})]})]}),e.jsxs("section",{className:"mb-12",children:[e.jsx("h2",{className:"text-3xl font-bold mb-2",children:"Recent blog posts"}),e.jsx(B,{className:"mb-8"}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",children:y?e.jsxs(e.Fragment,{children:[e.jsx(i,{blog:y,isFeatured:!0}),e.jsx("div",{className:"lg:col-span-1 flex flex-col space-y-8",children:J.slice(0,2).map((s,l)=>e.jsx(i,{blog:s},l))})]}):j.map((s,l)=>e.jsx(i,{blog:s},l))})]}),e.jsxs("section",{className:"py-4",children:[e.jsx("h2",{className:"text-3xl font-bold mb-4",children:"All blog posts"}),e.jsx(B,{className:"mb-8"}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",children:K.map((s,l)=>e.jsx(i,{blog:s},l))}),e.jsx(le,{className:"mt-8",children:e.jsxs(ae,{children:[e.jsx(f,{children:e.jsx(te,{href:"#",onClick:()=>d(s=>Math.max(1,s-1))})}),Array.from({length:u},(s,l)=>l+1).map(s=>e.jsx(f,{children:e.jsx(ce,{href:"#",isActive:x===s,onClick:()=>d(s),children:s})},s)),e.jsx(f,{children:e.jsx(ne,{href:"#",onClick:()=>d(s=>Math.min(u,s+1))})})]})})]})]})};export{ge as default};
