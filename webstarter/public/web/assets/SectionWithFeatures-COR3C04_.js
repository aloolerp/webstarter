import{j as s}from"./index-BEnNszjz.js";const a=({title:c,subtitle:e,columns:i,features:n})=>{const t=`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${parseInt(i,10)||3} gap-6`;return s.jsx("section",{className:"p-6",children:s.jsxs("div",{className:"container",children:[s.jsx("h2",{className:"text-3xl font-bold mb-4",children:c}),s.jsx("p",{className:"text-lg text-gray-500 mb-6",children:e}),s.jsx("div",{className:t,children:n.map(l=>s.jsxs("div",{className:"p-4 rounded-lg shadow-md bg-white",children:[l.icon&&s.jsx("div",{className:"mb-4",children:s.jsx("img",{src:l.icon,alt:l.title,className:"w-12 h-12 object-cover rounded-full"})}),l.url?s.jsx("a",{href:l.url,className:"text-xl font-semibold mb-2 hover:underline",children:l.title}):s.jsx("h3",{className:"text-xl font-semibold mb-2",children:l.title}),s.jsx("p",{className:"text-gray-600",children:l.content})]},l.idx))})]})})};export{a as default};
