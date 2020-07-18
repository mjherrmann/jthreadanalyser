var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function s(t){return"function"==typeof t}function o(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(e,n,r){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const r=e.subscribe(...n);return r.unsubscribe?()=>r.unsubscribe():r}(n,r))}function c(t,e,n,r){return t[1]&&r?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](r(e))):n.ctx}function l(t,e,n,r,s,o,i){const l=function(t,e,n,r){if(t[2]&&r){const s=t[2](r(n));if(void 0===e.dirty)return s;if("object"==typeof s){const t=[],n=Math.max(e.dirty.length,s.length);for(let r=0;r<n;r+=1)t[r]=e.dirty[r]|s[r];return t}return e.dirty|s}return e.dirty}(e,r,s,o);if(l){const s=c(e,n,r,i);t.p(s,l)}}function a(t){return null==t?"":t}function d(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function h(t){t.parentNode.removeChild(t)}function f(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function p(t){return document.createElement(t)}function m(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function g(t){return document.createTextNode(t)}function v(){return g(" ")}function $(){return g("")}function b(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function w(t){return function(e){return e.preventDefault(),t.call(this,e)}}function y(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function T(t,e){e=""+e,t.data!==e&&(t.data=e)}function x(t,e,n,r){t.style.setProperty(e,n,r?"important":"")}let E;function A(t){E=t}function O(){if(!E)throw new Error("Function called outside component initialization");return E}function k(){const t=O();return(e,n)=>{const r=t.$$.callbacks[e];if(r){const s=function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(e,n);r.slice().forEach(e=>{e.call(t,s)})}}}const S=[],D=[],L=[],N=[],C=Promise.resolve();let K=!1;function R(t){L.push(t)}let M=!1;const I=new Set;function j(){if(!M){M=!0;do{for(let t=0;t<S.length;t+=1){const e=S[t];A(e),_(e.$$)}for(S.length=0;D.length;)D.pop()();for(let t=0;t<L.length;t+=1){const e=L[t];I.has(e)||(I.add(e),e())}L.length=0}while(S.length);for(;N.length;)N.pop()();K=!1,M=!1,I.clear()}}function _(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(R)}}const F=new Set;let P;function B(){P={r:0,c:[],p:P}}function H(){P.r||r(P.c),P=P.p}function q(t,e){t&&t.i&&(F.delete(t),t.i(e))}function J(t,e,n,r){if(t&&t.o){if(F.has(t))return;F.add(t),P.c.push(()=>{F.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}}function W(t){t&&t.c()}function X(t,n,o){const{fragment:i,on_mount:c,on_destroy:l,after_update:a}=t.$$;i&&i.m(n,o),R(()=>{const n=c.map(e).filter(s);l?l.push(...n):r(n),t.$$.on_mount=[]}),a.forEach(R)}function U(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Q(t,e){-1===t.$$.dirty[0]&&(S.push(t),K||(K=!0,C.then(j)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function V(e,s,o,i,c,l,a=[-1]){const d=E;A(e);const u=s.props||{},f=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:c,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:[]),callbacks:n(),dirty:a};let p=!1;if(f.ctx=o?o(e,u,(t,n,...r)=>{const s=r.length?r[0]:n;return f.ctx&&c(f.ctx[t],f.ctx[t]=s)&&(f.bound[t]&&f.bound[t](s),p&&Q(e,t)),n}):[],f.update(),p=!0,r(f.before_update),f.fragment=!!i&&i(f.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);f.fragment&&f.fragment.l(t),t.forEach(h)}else f.fragment&&f.fragment.c();s.intro&&q(e.$$.fragment),X(e,s.target,s.anchor),j()}A(d)}class z{$destroy(){U(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}const G=[];function Y(e,n=t){let r;const s=[];function i(t){if(o(e,t)&&(e=t,r)){const t=!G.length;for(let t=0;t<s.length;t+=1){const n=s[t];n[1](),G.push(n,e)}if(t){for(let t=0;t<G.length;t+=2)G[t][0](G[t+1]);G.length=0}}}return{set:i,update:function(t){i(t(e))},subscribe:function(o,c=t){const l=[o,c];return s.push(l),1===s.length&&(r=n(i)||t),o(e),()=>{const t=s.indexOf(l);-1!==t&&s.splice(t,1),0===s.length&&(r(),r=null)}}}}const Z=new class{constructor(){const{subscribe:t,set:e,update:n}=Y({});this.subscribe=t,this.set=e,this.update=n}setProcessed(t){this.update(e=>{let n=t.reduce((t,n)=>{let r=e[n.name],s=Object.assign(r,{processed:!0});return t[n.name]=s,t},{});return Object.assign({},e,n)})}addFiles(t){this.update(e=>{let n=t.reduce((t,e)=>(t[e.name]||(t[e.name]=e),t),{});return Object.assign({},n,e)})}remove(t){this.update(e=>Object.entries(e).filter(([e,n])=>e!=t).reduce((t,[e,n])=>(t[e]=n,t),{}))}};function tt(e){let n,s,o,i,c;return{c(){n=p("div"),s=p("span"),s.textContent="Drop javacore files",y(s,"class","svelte-1v2e4wg"),y(n,"class",o=(e[0]?"highlight":"")+" dropzone svelte-1v2e4wg")},m(t,r){u(t,n,r),d(n,s),i||(c=[b(n,"dragenter",w(e[2])),b(n,"dragleave",w(e[3])),b(n,"dragover",w(e[1])),b(n,"drop",w(e[4]))],i=!0)},p(t,[e]){1&e&&o!==(o=(t[0]?"highlight":"")+" dropzone svelte-1v2e4wg")&&y(n,"class",o)},i:t,o:t,d(t){t&&h(n),i=!1,r(c)}}}async function et(t){let e=[],n=await async function(t){return new Promise((e,n)=>{t.createReader().readEntries(t=>{e(t)},t=>{n(t)})})}(t);for(let t of n)if(t.isDirectory){let n=await et(t);e=e.concat(n)}else e=e.concat([t]);return e}function nt(t,e,n){let r=!1;return[r,function(t){n(0,r=!0)},function(t){n(0,r=!0)},function(t){n(0,r=!1)},async function(t){n(0,r=!1);let e=[];for(let n of t.dataTransfer.items){let t=n.webkitGetAsEntry();if(t)if(t.isDirectory){let n=await et(t);e=e.concat(n)}else e=e.concat([t]);else console.log("error: not dropped",n,t)}Z.addFiles(e)}]}class rt extends z{constructor(t){super(),V(this,t,nt,tt,o,{})}}function st(e){let n,r,s,o,i,c,l,a,f,m,g,$,b;return{c(){n=p("div"),r=p("div"),r.textContent="Running",s=v(),o=p("div"),o.textContent="Waiting",i=v(),c=p("div"),c.textContent="Blocked",l=v(),a=p("div"),a.textContent="Suspended",f=v(),m=p("div"),m.textContent="Parked",g=v(),$=p("div"),$.textContent="Zombie",y(r,"class","R svelte-17qv8gc"),y(o,"class","CW svelte-17qv8gc"),y(c,"class","B svelte-17qv8gc"),y(a,"class","S svelte-17qv8gc"),y(m,"class","P svelte-17qv8gc"),y($,"class","Z svelte-17qv8gc"),y(n,"class",b="state "+(e[0]?"loaded":"")+" svelte-17qv8gc")},m(t,e){u(t,n,e),d(n,r),d(n,s),d(n,o),d(n,i),d(n,c),d(n,l),d(n,a),d(n,f),d(n,m),d(n,g),d(n,$)},p(t,[e]){1&e&&b!==(b="state "+(t[0]?"loaded":"")+" svelte-17qv8gc")&&y(n,"class",b)},i:t,o:t,d(t){t&&h(n)}}}function ot(t,e,n){let{loaded:r=!1}=e;return t.$set=t=>{"loaded"in t&&n(0,r=t.loaded)},[r]}class it extends z{constructor(t){super(),V(this,t,ot,st,o,{loaded:0})}}function ct(t){let e,n,r,s,o;return n=new it({props:{loaded:t[0]&&Object.keys(t[0]).length>0}}),s=new rt({}),{c(){e=p("div"),W(n.$$.fragment),r=v(),W(s.$$.fragment),y(e,"class","sidebar")},m(t,i){u(t,e,i),X(n,e,null),d(e,r),X(s,e,null),o=!0},p(t,[e]){const r={};1&e&&(r.loaded=t[0]&&Object.keys(t[0]).length>0),n.$set(r)},i(t){o||(q(n.$$.fragment,t),q(s.$$.fragment,t),o=!0)},o(t){J(n.$$.fragment,t),J(s.$$.fragment,t),o=!1},d(t){t&&h(e),U(n),U(s)}}}function lt(t,e,n){let{fileStore:r}=e;return t.$set=t=>{"fileStore"in t&&n(0,r=t.fileStore)},[r]}class at extends z{constructor(t){super(),V(this,t,lt,ct,o,{fileStore:0})}}const dt=new class{constructor(){const{subscribe:t,set:e,update:n}=Y({});this.subscribe=t,this.set=e,this.update=n}addThread(t,e){this.update(n=>{let r={},s={},o={};return o[e.name]=e,s[t.name]=Object.assign({},n[t.name],o),r=(n[t.name],Object.assign({},n,s)),r})}remove(t){this.update(e=>Object.entries(e).filter(([e,n])=>e!=t).reduce((t,[e,n])=>(t[e]=n,t),{}))}},ut=t=>({}),ht=t=>({});function ft(t){let e,n,r,o,i,a,f,g,$,w;const T=t[4].content,E=function(t,e,n,r){if(t){const s=c(t,e,n,r);return t[0](s)}}(T,t,t[3],ht);return{c(){e=p("div"),n=p("div"),E&&E.c(),r=v(),o=m("svg"),i=m("g"),a=m("circle"),f=m("path"),y(n,"class","contentcontainer svelte-e51wig"),y(a,"stroke-miterlimit","10"),y(a,"stroke-width","8"),y(a,"stroke",mt),y(a,"fill","white"),y(a,"r","40"),y(a,"cy","50"),y(a,"cx","50"),y(f,"d","M60.6 29.5L50 40.1 39.4 29.5c-2.7-2.7-7.1-2.7-9.9 0-2.7 2.7-2.7 7.1 0\n        9.9L40.1 50 29.5 60.6c-2.7 2.7-2.7 7.1 0 9.9s7.1 2.7 9.9 0L50 59.9l10.6\n        10.6c2.7 2.7 7.1 2.7 9.9 0 2.7-2.7 2.7-7.1 0-9.9L59.9\n        50l10.6-10.6c2.7-2.7 2.7-7.1 0-9.9s-7.2-2.7-9.9 0z"),x(f,"fill",gt),x(i,"transform-origin","50% 50%"),x(i,"transform","rotate(0deg) scale(0.8, 0.8)"),y(o,"id",""),y(o,"viewBox","0 0 100 100"),y(o,"y","0"),y(o,"x","0"),y(o,"xmlns","http://www.w3.org/2000/svg"),y(o,"xml:space","preserve"),y(o,"version","1.1"),y(o,"width",pt),y(o,"height",pt),x(o,"top","0"),x(o,"right","-"+pt/2+"px"),y(o,"xmlns:xlink","http://www.w3.org/1999/xlink"),y(o,"class","svelte-e51wig"),y(e,"class","closable svelte-e51wig")},m(c,l){u(c,e,l),d(e,n),E&&E.m(n,null),d(e,r),d(e,o),d(o,i),d(i,a),d(i,f),g=!0,$||(w=b(o,"click",(function(){s(t[2](t[1],t[0]))&&t[2](t[1],t[0]).apply(this,arguments)})),$=!0)},p(e,[n]){t=e,E&&E.p&&8&n&&l(E,T,t,t[3],n,ut,ht)},i(t){g||(q(E,t),g=!0)},o(t){J(E,t),g=!1},d(t){t&&h(e),E&&E.d(t),$=!1,w()}}}let pt=20,mt="#000000",gt="#FF0000";function vt(t,e,n){const r=k();let{identifier:s}=e,{eventName:o}=e,{$$slots:i={},$$scope:c}=e;return t.$set=t=>{"identifier"in t&&n(0,s=t.identifier),"eventName"in t&&n(1,o=t.eventName),"$$scope"in t&&n(3,c=t.$$scope)},[s,o,r,c,i]}class $t extends z{constructor(t){super(),V(this,t,vt,ft,o,{identifier:0,eventName:1})}}function bt(e){let n;return{c(){n=p("div"),y(n,"class","flex-child")},m(t,e){u(t,n,e)},p:t,d(t){t&&h(n)}}}function wt(t){let e,n,r,s=(t[0].stack[0]||t[0].nativeStack[0])+"";return{c(){e=p("div"),n=g(s),y(e,"class",r="flex-child "+t[0].state+" file-thread"),x(e,"overflow","hidden")},m(t,r){u(t,e,r),d(e,n)},p(t,o){1&o&&s!==(s=(t[0].stack[0]||t[0].nativeStack[0])+"")&&T(n,s),1&o&&r!==(r="flex-child "+t[0].state+" file-thread")&&y(e,"class",r)},d(t){t&&h(e)}}}function yt(e){let n;function r(t,e){return t[0]?wt:bt}let s=r(e),o=s(e);return{c(){o.c(),n=$()},m(t,e){o.m(t,e),u(t,n,e)},p(t,[e]){s===(s=r(t))&&o?o.p(t,e):(o.d(1),o=s(t),o&&(o.c(),o.m(n.parentNode,n)))},i:t,o:t,d(t){o.d(t),t&&h(n)}}}function Tt(t,e,n){let{thread:r}=e;return t.$set=t=>{"thread"in t&&n(0,r=t.thread)},[r]}class xt extends z{constructor(t){super(),V(this,t,Tt,yt,o,{thread:0})}}function Et(e){let n;return{c(){n=p("div"),y(n,"class","wrapper")},m(t,e){u(t,n,e)},p:t,d(t){t&&h(n)}}}function At(t){let e,n,r,s,o,i,c,l,a,f,m=t[0].stack.join("\n")+"",$=t[0].nativeStack.join("\n")+"";return{c(){e=p("div"),n=p("div"),n.textContent="Java Stack",r=v(),s=p("div"),o=g(m),i=v(),c=p("div"),c.textContent="Native Stack",l=v(),a=p("div"),f=g($),y(n,"class","head svelte-mp5dpr"),y(s,"class","stack svelte-mp5dpr"),y(c,"class","head svelte-mp5dpr"),y(a,"class","stack svelte-mp5dpr"),y(e,"class","wrapper")},m(t,h){u(t,e,h),d(e,n),d(e,r),d(e,s),d(s,o),d(e,i),d(e,c),d(e,l),d(e,a),d(a,f)},p(t,e){1&e&&m!==(m=t[0].stack.join("\n")+"")&&T(o,m),1&e&&$!==($=t[0].nativeStack.join("\n")+"")&&T(f,$)},d(t){t&&h(e)}}}function Ot(e){let n;function r(t,e){return t[0]?At:Et}let s=r(e),o=s(e);return{c(){o.c(),n=$()},m(t,e){o.m(t,e),u(t,n,e)},p(t,[e]){s===(s=r(t))&&o?o.p(t,e):(o.d(1),o=s(t),o&&(o.c(),o.m(n.parentNode,n)))},i:t,o:t,d(t){o.d(t),t&&h(n)}}}function kt(t,e,n){let{thread:r}=e;return t.$set=t=>{"thread"in t&&n(0,r=t.thread)},[r]}class St extends z{constructor(t){super(),V(this,t,kt,Ot,o,{thread:0})}}function Dt(t,e,n){const r=t.slice();return r[5]=e[n],r[7]=n,r}function Lt(t,e,n){const r=t.slice();return r[5]=e[n],r[7]=n,r}function Nt(t){let e,n;return e=new xt({props:{thread:t[5]}}),{c(){W(e.$$.fragment)},m(t,r){X(e,t,r),n=!0},p(t,n){const r={};1&n&&(r.thread=t[5]),e.$set(r)},i(t){n||(q(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function Ct(t){let e,n,r,s,o,i,c=t[0],l=[];for(let e=0;e<c.length;e+=1)l[e]=Kt(Dt(t,c,e));const a=t=>J(l[t],1,1,()=>{l[t]=null});return{c(){e=p("div"),n=p("div"),r=v();for(let t=0;t<l.length;t+=1)l[t].c();x(n,"overflow","hidden"),y(n,"class","svelte-morb7v"),y(e,"class","row-wrapper threadDetails svelte-morb7v")},m(c,a){u(c,e,a),d(e,n),d(e,r);for(let t=0;t<l.length;t+=1)l[t].m(e,null);s=!0,o||(i=b(e,"click",t[4]),o=!0)},p(t,n){if(1&n){let r;for(c=t[0],r=0;r<c.length;r+=1){const s=Dt(t,c,r);l[r]?(l[r].p(s,n),q(l[r],1)):(l[r]=Kt(s),l[r].c(),q(l[r],1),l[r].m(e,null))}for(B(),r=c.length;r<l.length;r+=1)a(r);H()}},i(t){if(!s){for(let t=0;t<c.length;t+=1)q(l[t]);s=!0}},o(t){l=l.filter(Boolean);for(let t=0;t<l.length;t+=1)J(l[t]);s=!1},d(t){t&&h(e),f(l,t),o=!1,i()}}}function Kt(t){let e,n;return e=new St({props:{thread:t[5]}}),{c(){W(e.$$.fragment)},m(t,r){X(e,t,r),n=!0},p(t,n){const r={};1&n&&(r.thread=t[5]),e.$set(r)},i(t){n||(q(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function Rt(t){let e,n,r,s,o,i,c,l,a,m=t[0],w=[];for(let e=0;e<m.length;e+=1)w[e]=Nt(Lt(t,m,e));const E=t=>J(w[t],1,1,()=>{w[t]=null});let A=t[2]&&Ct(t);return{c(){e=p("div"),n=p("div"),r=g(t[1]),s=v();for(let t=0;t<w.length;t+=1)w[t].c();o=v(),A&&A.c(),i=$(),x(n,"overflow","hidden"),y(n,"class","svelte-morb7v"),y(e,"class","row-wrapper svelte-morb7v")},m(h,f){u(h,e,f),d(e,n),d(n,r),d(e,s);for(let t=0;t<w.length;t+=1)w[t].m(e,null);u(h,o,f),A&&A.m(h,f),u(h,i,f),c=!0,l||(a=b(e,"click",t[3]),l=!0)},p(t,[n]){if((!c||2&n)&&T(r,t[1]),1&n){let r;for(m=t[0],r=0;r<m.length;r+=1){const s=Lt(t,m,r);w[r]?(w[r].p(s,n),q(w[r],1)):(w[r]=Nt(s),w[r].c(),q(w[r],1),w[r].m(e,null))}for(B(),r=m.length;r<w.length;r+=1)E(r);H()}t[2]?A?(A.p(t,n),4&n&&q(A,1)):(A=Ct(t),A.c(),q(A,1),A.m(i.parentNode,i)):A&&(B(),J(A,1,1,()=>{A=null}),H())},i(t){if(!c){for(let t=0;t<m.length;t+=1)q(w[t]);q(A),c=!0}},o(t){w=w.filter(Boolean);for(let t=0;t<w.length;t+=1)J(w[t]);J(A),c=!1},d(t){t&&h(e),f(w,t),t&&h(o),A&&A.d(t),t&&h(i),l=!1,a()}}}function Mt(t,e,n){let{threads:r}=e,{threadName:s}=e,o=!1;return t.$set=t=>{"threads"in t&&n(0,r=t.threads),"threadName"in t&&n(1,s=t.threadName)},[r,s,o,()=>{n(2,o=!o)},()=>{n(2,o=!o)}]}class It extends z{constructor(t){super(),V(this,t,Mt,Rt,o,{threads:0,threadName:1})}}function jt(t,e,n){const r=t.slice();return r[12]=e[n],r}function _t(t,e,n){const r=t.slice();return r[15]=e[n],r[17]=n,r}function Ft(t){let e,n,r=t[15]+"";return{c(){e=p("span"),n=g(r),y(e,"slot","content")},m(t,r){u(t,e,r),d(e,n)},p(t,e){2&e&&r!==(r=t[15]+"")&&T(n,r)},d(t){t&&h(e)}}}function Pt(t){let e,n;return e=new $t({props:{eventName:"closeTab",identifier:t[15],$$slots:{content:[Ft]},$$scope:{ctx:t}}}),e.$on("closeTab",t[5]),{c(){W(e.$$.fragment)},m(t,r){X(e,t,r),n=!0},p(t,n){const r={};2&n&&(r.identifier=t[15]),262146&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r)},i(t){n||(q(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function Bt(t){let e,n;return e=new It({props:{threadName:t[12],threads:t[4](t[12])}}),{c(){W(e.$$.fragment)},m(t,r){X(e,t,r),n=!0},p(t,n){const r={};4&n&&(r.threadName=t[12]),4&n&&(r.threads=t[4](t[12])),e.$set(r)},i(t){n||(q(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function Ht(t){let e,n,r,s,o,i,c=t[1],l=[];for(let e=0;e<c.length;e+=1)l[e]=Pt(_t(t,c,e));const a=t=>J(l[t],1,1,()=>{l[t]=null});let m=t[2],g=[];for(let e=0;e<m.length;e+=1)g[e]=Bt(jt(t,m,e));const $=t=>J(g[t],1,1,()=>{g[t]=null});return{c(){e=p("div"),n=p("div"),r=p("div"),s=v();for(let t=0;t<l.length;t+=1)l[t].c();o=v();for(let t=0;t<g.length;t+=1)g[t].c();y(n,"class","grid svelte-1mbmcfw"),x(n,"grid-template-columns","200px repeat("+t[1].length+", "+t[3]+")"),y(e,"class","main")},m(c,a){u(c,e,a),d(e,n),d(n,r),d(n,s);for(let t=0;t<l.length;t+=1)l[t].m(n,null);d(n,o);for(let t=0;t<g.length;t+=1)g[t].m(n,null);t[6](e),i=!0},p(t,[e]){if(34&e){let r;for(c=t[1],r=0;r<c.length;r+=1){const s=_t(t,c,r);l[r]?(l[r].p(s,e),q(l[r],1)):(l[r]=Pt(s),l[r].c(),q(l[r],1),l[r].m(n,o))}for(B(),r=c.length;r<l.length;r+=1)a(r);H()}if(20&e){let r;for(m=t[2],r=0;r<m.length;r+=1){const s=jt(t,m,r);g[r]?(g[r].p(s,e),q(g[r],1)):(g[r]=Bt(s),g[r].c(),q(g[r],1),g[r].m(n,null))}for(B(),r=m.length;r<g.length;r+=1)$(r);H()}(!i||10&e)&&x(n,"grid-template-columns","200px repeat("+t[1].length+", "+t[3]+")")},i(t){if(!i){for(let t=0;t<c.length;t+=1)q(l[t]);for(let t=0;t<m.length;t+=1)q(g[t]);i=!0}},o(t){l=l.filter(Boolean);for(let t=0;t<l.length;t+=1)J(l[t]);g=g.filter(Boolean);for(let t=0;t<g.length;t+=1)J(g[t]);i=!1},d(n){n&&h(e),f(l,n),f(g,n),t[6](null)}}}function qt(t,e,n){let r;i(t,dt,t=>n(8,r=t));let s,o=t=>{let{groups:e}=/(?<name>.*?)(?<num>[\d]*)$/.exec(t);return e},c=(t,e)=>{let n=o(t),r=o(e);if(n.name){let t=n.name.localeCompare(r.name);if(0==t){let t=parseInt(n.num),e=parseInt(r.num);return NaN===t&&NaN===e?0:NaN===t?-1:NaN===e?1:t-e}return t}},l=()=>{n(7,a=s.getBoundingClientRect().width)},a=100;var d;let u,h,f;return d=l,O().$$.on_mount.push(d),function(t){O().$$.after_update.push(t)}(l),window.onresize=l,t.$$.update=()=>{256&t.$$.dirty&&n(1,u=r?Object.keys(r).sort():[]),256&t.$$.dirty&&n(2,h=r?Object.keys(Object.entries(r).reduce((t,[e,n])=>Object.assign({},t,n),{})).sort(c):[]),130&t.$$.dirty&&n(3,f=Math.floor(a/(u.length+1))-1+"px")},[s,u,h,f,t=>{let e=u.map(e=>r[e]&&r[e][t]);return console.log(e),e},({detail:t})=>{console.log("closeTab",t),Z.remove(t),dt.remove(t)},function(t){D[t?"unshift":"push"](()=>{s=t,n(0,s)})}]}class Jt extends z{constructor(t){super(),V(this,t,qt,Ht,o,{})}}function Wt(t){let e,n,r,s,o,i;return n=new at({props:{fileStore:t[0]}}),s=new Jt({}),{c(){e=p("main"),W(n.$$.fragment),r=v(),W(s.$$.fragment),y(e,"class",o=a(t[0]&&Object.keys(t[0]).length>0?"loaded":"")+" svelte-1m7kc60")},m(t,o){u(t,e,o),X(n,e,null),d(e,r),X(s,e,null),i=!0},p(t,[r]){const s={};1&r&&(s.fileStore=t[0]),n.$set(s),(!i||1&r&&o!==(o=a(t[0]&&Object.keys(t[0]).length>0?"loaded":"")+" svelte-1m7kc60"))&&y(e,"class",o)},i(t){i||(q(n.$$.fragment,t),q(s.$$.fragment,t),i=!0)},o(t){J(n.$$.fragment,t),J(s.$$.fragment,t),i=!1},d(t){t&&h(e),U(n),U(s)}}}function Xt(t,e,n){let r;return i(t,Z,t=>n(0,r=t)),[r]}class Ut{constructor(t){this.name=t,this.subscribers=[]}process(){try{this.notify(...arguments)}catch(t){throw console.error(t),t}}notify(){this.subscribers.forEach(t=>t.process(...arguments))}subscribe(){this.subscribers=[...this.subscribers,...arguments]}}class Qt extends Ut{constructor(){super("LineProcessor"),this.textDecoder=new TextDecoder("utf-8"),this.dataArr=[]}process(t,e){this.dataArr=this.dataArr.concat(Array.from(e));let n=this.newLineIndex();for(;-1!=n;){let e=this.dataArr.splice(0,n+1);var r=this.textDecoder.decode(Uint8Array.from(e));this.notify(t,r),n=this.newLineIndex()}}newLineIndex(){return this.dataArr.findIndex(t=>10===t||13===t)}}const Vt=["START_DEADLOCK","2LKDEADLOCKTHR","3LKDEADLOCKWTR","4LKDEADLOCKMON","4LKDEADLOCKOBJ","3LKDEADLOCKOWN","1LKDEADLOCK","1LKDEADLOCK"];class zt extends Ut{constructor(){super("LockBuilder"),this.thread={},this.deadlockStarted=!1}process(t,{type:e,content:n}){"1LKDEADLOCK"===e&&(this.deadlockStarted=!0,console.log(this.name+" - DeadLock Start")),"1LKDEADLOCK"===e&&this.deadlockStarted&&(this.deadlockStarted=!1,console.log(this.name+" - DeadLock End"))}}const Gt=["1LKDEADLOCK","0SECTION"],Yt=["2LKMONINUSE","3LKMONOBJECT","3LKNOTIFYQ","3LKWAITNOTIFY","3LKWAITERQ","3LKWAITER","1LKREGMONDUMP","2LKREGMON","1LKMONPOOLDUMP","1LKREGMONDUMP",...Gt];class Zt extends Ut{constructor(){super("LockMonitorBuilder"),this.thread={},this.lkMonitorsStarted=!1,this.regMonitorsStarted=!1}process(t,{type:e,content:n}){try{"1LKMONPOOLDUMP"===e&&(this.lkMonitorsStarted=!0,this.regMonitorsStarted=!1,console.log(this.name+" - Lock Monitors Start")),"1LKREGMONDUMP"===e&&(this.lkMonitorsStarted=!1,this.regMonitorsStarted=!0,console.log(this.name+" - Lock Monitors End"),console.log(this.name+" - Reg Monitors Start")),-1!==Gt.indexOf(e)&&this.regMonitorsStarted&&(this.lkMonitorsStarted=!1,this.regMonitorsStarted=!1,console.log(this.name+" - Reg Monitors End"))}catch(t){console.error(t),this.close()}}close(){let t=super.close();return console.timeEnd("global"),t}}class te{constructor({name:t,j9vmthread:e,j9thread:n,id:r,state:s,prio:o}){this.name=t,this.state=s,this.prio=o,this.j9vmthread=e,this.j9thread=n,this.id=r,this.stack=[],this.nativeStack=[]}addToStack(t){this.stack.push(t)}addToNativeStack(t){this.nativeStack.push(t)}addJavalThread(t){this.javalThreadIfo=t}addThreadInfo1(t){this.nativeInfo=t}}const ee=/\"(?<name>.*?)\"[\s,]*(?<j9vmthread>.*?),[\s,]*(?<j9thread>.*?),[\s,]*(?<id>.*?),[\s,]*state:(?<state>.*),[\s,]*prio=(?<prio>[\d]*)/,ne=/.*?ID:(?<threadId>.*?),.*?priority:(?<priority>.*?),.*?policy:(?<policy>.*?),.*?vmstate:(?<vmstate>.*?),.*?flags:(?<flags>.*?)\)/,re=/\(.*getId:(?<getId>.*?),.*?isDaemon:(?<isDaemon>.*?)\)/,se={THREADINFO:"3XMTHREADINFO",JAVALTHREAD:"3XMJAVALTHREAD",THREADINFO1:"3XMTHREADINFO1",STACKTRACE4:"4XESTACKTRACE",STACKTRACE5:"5XESTACKTRACE",NATIVESTACK:"4XENATIVESTACK",THREADBLOCK:"3XMTHREADBLOCK",START_THREADS:"1XMTHDINFO",END_THREADS:"0SECTION"},oe=Object.values(se);class ie extends Ut{constructor(){super("ThreadBuilder"),this.thread=void 0,this.started=!1}process(t,{type:e,content:n}){this.started&&this.buildThread(t,e,n),se.START_THREADS===e&&(this.started=!0,console.log(this.name+" - Build Threads Start")),se.END_THREADS===e&&this.started&&(this.started=!1,console.log(this.name+" - Build Threads End"))}buildThread(t,e,n){let r=void 0;switch(e){case se.THREADINFO:if(r=ee.exec(n),r){let{groups:e}=r;e&&e.name&&(this.thread=new te(e),dt.addThread(t,this.thread))}else this.thread=new te({name:n}),dt.addThread(t,this.thread);break;case se.THREADINFO1:if(r=ne.exec(n),r){let{groups:t}=r;this.thread.addThreadInfo1(t)}break;case se.JAVALTHREAD:if(r=re.exec(n),r){let{groups:t}=r;this.thread.addJavalThread(t)}break;case se.STACKTRACE4:case se.STACKTRACE5:this.thread.addToStack(n);break;case se.NATIVESTACK:this.thread.addToNativeStack(n)}}}const ce=/^(?<type>.*?)\s[\s]*(?<content>.*)/,le=[...oe,...Yt,...Vt];class ae extends Ut{constructor(){super("LineFilter")}process(t,e){try{let{groups:{type:n,content:r}}=ce.exec(e);-1!==le.indexOf(n)&&this.notify(t,{type:n,content:r})}catch(t){console.error(t)}}}class de{list=[];listeners=[];addDeferred(t){this.list.push(t),this.notify()}addListener(t){this.listeners.push(t),this.notify()}notify(){if(this.listeners.length>0&&this.list.length>0){let t=this.list.shift();this.listeners.shift().execute(t),this.notify()}}}class ue{constructor(t){this.file=t,this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}class he{constructor(t){this.queue=t,this.reader=new FileReader}async execute(t){this.reader.onload=e=>{t.resolve(e.target.result),this.queue.addListener(this)},this.reader.readAsArrayBuffer(t.file)}}class fe{constructor(t){this.fileQueue=new de;for(let e=0;e<t;e++)this.fileQueue.addListener(new he(this.fileQueue))}async read(t){let e=new ue(t);return this.fileQueue.addDeferred(e),e.promise}}fe.getInstance=()=>(fe.instance||(fe.instance=new fe(6)),fe.instance);return new class extends z{constructor(t){super(),V(this,t,Xt,Wt,o,{})}}({target:document.body,props:{services:{JCoreProcessor:new class{constructor(){Z.subscribe(t=>{this.process(Object.values(t))})}async process(t){if(t&&t.length>0){let e=t.filter(({processed:t})=>!t);if(e.length>0){let t=e.map(async t=>await new Promise((e,n)=>t.file(e,n)));console.log("processing",e),Promise.all(t).then(t=>Promise.all(t.map(t=>this.processFile(t)))).then(()=>console.timeEnd("global")),Z.setProcessed(e)}}}async processFile(t){let e=new Qt,n=new ae,r=new ie,s=new zt,o=new Zt;e.subscribe(n),n.subscribe(r,s,o);let i=t.stream();await i.pipeTo(new WritableStream({write:n=>{try{e.process(t,n)}catch(t){console.error(t)}},close:()=>{console.log("File stream closed")},Abort:()=>{}}))}},FileReadService:fe.getInstance(6)}}})}();
//# sourceMappingURL=bundle.js.map