(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{120:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return b})),n.d(t,"default",(function(){return p}));var a=n(1),r=n(6),c=(n(0),n(171)),i={id:"sideMenu-layout",title:"Side Menu",sidebar_label:"Side Menu"},o={id:"sideMenu-layout",title:"Side Menu",description:"This layout allows implementing sidemenus, which can be opened by swiping from one side towards the other side.",source:"@site/docs/sideMenu-layout.mdx",permalink:"/react-native-navigation/docs/sideMenu-layout",editUrl:"https://github.com/wix/react-native-navigation/edit/master/website/docs/docs/sideMenu-layout.mdx",sidebar_label:"Side Menu",sidebar:"api",previous:{title:"Bottom Tabs",permalink:"/react-native-navigation/docs/bottomTabs-layout"},next:{title:"SplitView",permalink:"/react-native-navigation/docs/splitView"}},b=[{value:"<code>center</code>",id:"center",children:[]},{value:"<code>left</code>",id:"left",children:[]},{value:"<code>right</code>",id:"right",children:[]}],l={rightToc:b};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"This layout allows implementing sidemenus, which can be opened by swiping from one side towards the other side."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"{\n  left: {\n    component: {}\n  },\n  center: {\n    stack: {\n      options: {},\n      children: [{\n        component: {}\n      }]\n    }\n  },\n  right: {\n    component: {}\n  }\n}\n")),Object(c.b)("h2",{id:"center"},Object(c.b)("inlineCode",{parentName:"h2"},"center")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Type"),Object(c.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Required"),Object(c.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Description"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(c.b)("a",Object(a.a)({parentName:"td"},{href:"/react-native-navigation/docs/layout"}),"Layout")),Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Yes"),Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Center component, contains the main application.")))),Object(c.b)("h2",{id:"left"},Object(c.b)("inlineCode",{parentName:"h2"},"left")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Type"),Object(c.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Required"),Object(c.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Description"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(c.b)("a",Object(a.a)({parentName:"td"},{href:"/react-native-navigation/docs/layout"}),"Layout")),Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"No"),Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Contains the left component layout.")))),Object(c.b)("h2",{id:"right"},Object(c.b)("inlineCode",{parentName:"h2"},"right")),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Type"),Object(c.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Required"),Object(c.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Description"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(c.b)("a",Object(a.a)({parentName:"td"},{href:"/react-native-navigation/docs/layout"}),"Layout")),Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"No"),Object(c.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Contains the right component layout.")))))}p.isMDXComponent=!0},171:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),p=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o({},t,{},e)),n},u=function(e){var t=p(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},O=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,c=e.originalType,i=e.parentName,l=b(e,["components","mdxType","originalType","parentName"]),u=p(n),O=a,m=u["".concat(i,".").concat(O)]||u[O]||d[O]||c;return n?r.a.createElement(m,o({ref:t},l,{components:n})):r.a.createElement(m,o({ref:t},l))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var c=n.length,i=new Array(c);i[0]=O;var o={};for(var b in t)hasOwnProperty.call(t,b)&&(o[b]=t[b]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var l=2;l<c;l++)i[l]=n[l];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}O.displayName="MDXCreateElement"}}]);