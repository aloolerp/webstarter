import{aa as g,u as f,r as o,$ as p,j as s,S as l,H as N,ab as u,ac as b,ad as i,ae as c,af as n,a as y,f as v,B}from"./index-BEnNszjz.js";import{Badge as _}from"./badge-CpvcxaUW.js";import{Toast as w}from"./toast-DyPLgdd5.js";const k=()=>{const{category:a}=g(),d=f(),[x,h]=o.useState([]),{data:r,error:m,isLoading:j}=p("Blog Post",{fields:["name","title","blog_intro","published_on","blog_category","meta_image","blogger"],filters:[["blog_category","=",a!=null?a:""],["published","=",1]],orderBy:{field:"published_on",order:"desc"}});return o.useEffect(()=>{r&&h(r)},[r]),j?s.jsx("div",{className:"container mx-auto py-8",children:s.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",children:[...Array(6)].map((e,t)=>s.jsxs("div",{className:"relative",children:[s.jsx(l,{className:"w-full h-48"})," ",s.jsxs("div",{className:"p-6",children:[s.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[s.jsx(l,{className:"w-24 h-4"})," ",s.jsx(l,{className:"w-24 h-4"})," ",s.jsx(l,{className:"w-16 h-6"})," "]}),s.jsx(l,{className:"w-full h-6 mt-2"})," ",s.jsx(l,{className:"w-full h-4 mt-1"})," ",s.jsx(l,{className:"w-24 h-8 mt-4"})," "]})]},t))})}):m?s.jsxs(w,{children:["Error loading blogs: ",JSON.stringify(m)]}):s.jsxs("section",{className:"container mx-auto py-8",children:[s.jsxs(N,{children:[s.jsx("title",{children:`${a} Blogs - Alool Technologies`}),s.jsx("meta",{name:"description",content:`Read the latest ${a} blogs from Alool Technologies.`})]}),s.jsx("div",{className:"mt-4 flex items-center justify-start8",children:s.jsx(u,{children:s.jsxs(b,{children:[s.jsx(i,{children:s.jsx(c,{href:"/home",children:"Home"})}),s.jsx(n,{className:"mx-2"}),s.jsx(i,{children:s.jsx(c,{href:"/blog",children:"Blogs"})}),s.jsx(n,{className:"mx-2"}),s.jsx(i,{children:s.jsxs(c,{href:`/blog/category/${a}`,children:[a," Blogs"]})})]})})}),s.jsx("div",{className:"flex items-center justify-start space-y-4 mt-4",children:s.jsxs("h1",{className:"text-4xl font-bold mb-3",children:[a," Blogs"]})}),s.jsx(y,{className:"mb-8"}),s.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",children:x.map((e,t)=>s.jsxs("div",{className:"relative",children:[s.jsx("img",{src:e.meta_image,alt:e.title,className:"w-full h-50 object-cover"}),s.jsxs("div",{className:"p-6",children:[s.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[s.jsx("span",{children:e.blogger}),s.jsx("span",{children:"•"}),s.jsx("span",{children:v(new Date(e.published_on),"MMM dd, yyyy")}),s.jsx(_,{variant:"secondary",className:"text-primary capitalize mt-2",children:e.blog_category})]}),s.jsx("h3",{className:"text-lg font-bold mt-2 hover:text-primary",children:e.title}),s.jsx("p",{className:"text-sm text-gray-500 mt-1",children:e.blog_intro}),s.jsx(B,{variant:"link",onClick:()=>d(`/blog/${e.blog_category}/${e.name}`),className:"mt-4 text-primary flex items-center",children:"Read more →"})]})]},t))})]})};export{k as default};
