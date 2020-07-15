var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function s(t){t.forEach(e)}function r(t){return"function"==typeof t}function o(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(e,n,s){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const s=e.subscribe(...n);return s.unsubscribe?()=>s.unsubscribe():s}(n,s))}function c(t,e,n,s){return t[1]&&s?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](s(e))):n.ctx}function a(t,e,n,s,r,o,i){const a=function(t,e,n,s){if(t[2]&&s){const r=t[2](s(n));if(void 0===e.dirty)return r;if("object"==typeof r){const t=[],n=Math.max(e.dirty.length,r.length);for(let s=0;s<n;s+=1)t[s]=e.dirty[s]|r[s];return t}return e.dirty|r}return e.dirty}(e,s,r,o);if(a){const r=c(e,n,s,i);t.p(r,a)}}function l(t){return null==t?"":t}function d(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode.removeChild(t)}function h(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function p(t){return document.createElement(t)}function g(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function m(t){return document.createTextNode(t)}function v(){return m(" ")}function $(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function T(t){return function(e){return e.preventDefault(),t.call(this,e)}}function b(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function y(t,e){e=""+e,t.data!==e&&(t.data=e)}function w(t,e,n,s){t.style.setProperty(e,n,s?"important":"")}let E;function A(t){E=t}function x(){if(!E)throw new Error("Function called outside component initialization");return E}function L(){const t=x();return(e,n)=>{const s=t.$$.callbacks[e];if(s){const r=function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(e,n);s.slice().forEach(e=>{e.call(t,r)})}}}const D=[],O=[],S=[],N=[],C=Promise.resolve();let k=!1;function K(t){S.push(t)}let R=!1;const M=new Set;function I(){if(!R){R=!0;do{for(let t=0;t<D.length;t+=1){const e=D[t];A(e),_(e.$$)}for(D.length=0;O.length;)O.pop()();for(let t=0;t<S.length;t+=1){const e=S[t];M.has(e)||(M.add(e),e())}S.length=0}while(D.length);for(;N.length;)N.pop()();k=!1,R=!1,M.clear()}}function _(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(K)}}const F=new Set;let B;function P(){B={r:0,c:[],p:B}}function j(){B.r||s(B.c),B=B.p}function H(t,e){t&&t.i&&(F.delete(t),t.i(e))}function J(t,e,n,s){if(t&&t.o){if(F.has(t))return;F.add(t),B.c.push(()=>{F.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}}function W(t){t&&t.c()}function X(t,n,o){const{fragment:i,on_mount:c,on_destroy:a,after_update:l}=t.$$;i&&i.m(n,o),K(()=>{const n=c.map(e).filter(r);a?a.push(...n):s(n),t.$$.on_mount=[]}),l.forEach(K)}function U(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Q(t,e){-1===t.$$.dirty[0]&&(D.push(t),k||(k=!0,C.then(I)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function V(e,r,o,i,c,a,l=[-1]){const d=E;A(e);const u=r.props||{},h=e.$$={fragment:null,ctx:null,props:a,update:t,not_equal:c,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:[]),callbacks:n(),dirty:l};let p=!1;if(h.ctx=o?o(e,u,(t,n,...s)=>{const r=s.length?s[0]:n;return h.ctx&&c(h.ctx[t],h.ctx[t]=r)&&(h.bound[t]&&h.bound[t](r),p&&Q(e,t)),n}):[],h.update(),p=!0,s(h.before_update),h.fragment=!!i&&i(h.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);h.fragment&&h.fragment.l(t),t.forEach(f)}else h.fragment&&h.fragment.c();r.intro&&H(e.$$.fragment),X(e,r.target,r.anchor),I()}A(d)}class z{$destroy(){U(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}const G=[];function q(e,n=t){let s;const r=[];function i(t){if(o(e,t)&&(e=t,s)){const t=!G.length;for(let t=0;t<r.length;t+=1){const n=r[t];n[1](),G.push(n,e)}if(t){for(let t=0;t<G.length;t+=2)G[t][0](G[t+1]);G.length=0}}}return{set:i,update:function(t){i(t(e))},subscribe:function(o,c=t){const a=[o,c];return r.push(a),1===r.length&&(s=n(i)||t),o(e),()=>{const t=r.indexOf(a);-1!==t&&r.splice(t,1),0===r.length&&(s(),s=null)}}}}const Y=new class{constructor(){const{subscribe:t,set:e,update:n}=q([]);this.subscribe=t,this.set=e,this.update=n}addFiles(t){this.update(e=>[...e,...t])}remove(t){this.update(e=>{console.log("update files",e);let n=e.findIndex(e=>(console.log(e.name,t,e.name==t,e.name===t),e.name==t)),s=e.splice(n,1);return console.log(e,s,n),[...e]})}};function Z(e){let n,r,o,i,c;return{c(){n=p("div"),r=m("Drop area"),b(n,"class",o=(e[0]?"highlight":"")+" dropzone svelte-1sa4s83")},m(t,s){u(t,n,s),d(n,r),i||(c=[$(n,"dragenter",T(e[2])),$(n,"dragleave",T(e[3])),$(n,"dragover",T(e[1])),$(n,"drop",T(e[4]))],i=!0)},p(t,[e]){1&e&&o!==(o=(t[0]?"highlight":"")+" dropzone svelte-1sa4s83")&&b(n,"class",o)},i:t,o:t,d(t){t&&f(n),i=!1,s(c)}}}async function tt(t){let e=[],n=await async function(t){return new Promise((e,n)=>{t.createReader().readEntries(t=>{e(t)},t=>{n(t)})})}(t);for(let t of n)if(t.isDirectory){let n=await tt(t);e=e.concat(n)}else e=e.concat([t]);return e}function et(t,e,n){let s=!1;return[s,function(t){n(0,s=!0)},function(t){n(0,s=!0)},function(t){n(0,s=!1)},async function(t){n(0,s=!1);let e=[];for(let n of t.dataTransfer.items){let t=n.webkitGetAsEntry();if(t)if(t.isDirectory){let n=await tt(t);e=e.concat(n)}else e=e.concat([t]);else console.log("error: not dropped",n,t)}Y.addFiles(e)}]}class nt extends z{constructor(t){super(),V(this,t,et,Z,o,{})}}const st=t=>({}),rt=t=>({});function ot(t){let e,n,s,o,i,l,h,m,T,y;const E=t[4].content,A=function(t,e,n,s){if(t){const r=c(t,e,n,s);return t[0](r)}}(E,t,t[3],rt);return{c(){e=p("div"),n=p("div"),A&&A.c(),s=v(),o=g("svg"),i=g("g"),l=g("circle"),h=g("path"),b(n,"class","contentcontainer svelte-e51wig"),b(l,"stroke-miterlimit","10"),b(l,"stroke-width","8"),b(l,"stroke",ct),b(l,"fill","white"),b(l,"r","40"),b(l,"cy","50"),b(l,"cx","50"),b(h,"d","M60.6 29.5L50 40.1 39.4 29.5c-2.7-2.7-7.1-2.7-9.9 0-2.7 2.7-2.7 7.1 0\n        9.9L40.1 50 29.5 60.6c-2.7 2.7-2.7 7.1 0 9.9s7.1 2.7 9.9 0L50 59.9l10.6\n        10.6c2.7 2.7 7.1 2.7 9.9 0 2.7-2.7 2.7-7.1 0-9.9L59.9\n        50l10.6-10.6c2.7-2.7 2.7-7.1 0-9.9s-7.2-2.7-9.9 0z"),w(h,"fill",at),w(i,"transform-origin","50% 50%"),w(i,"transform","rotate(0deg) scale(0.8, 0.8)"),b(o,"id",""),b(o,"viewBox","0 0 100 100"),b(o,"y","0"),b(o,"x","0"),b(o,"xmlns","http://www.w3.org/2000/svg"),b(o,"xml:space","preserve"),b(o,"version","1.1"),b(o,"width",it),b(o,"height",it),w(o,"top","0"),w(o,"right","-"+it/2+"px"),b(o,"xmlns:xlink","http://www.w3.org/1999/xlink"),b(o,"class","svelte-e51wig"),b(e,"class","closable svelte-e51wig")},m(c,a){u(c,e,a),d(e,n),A&&A.m(n,null),d(e,s),d(e,o),d(o,i),d(i,l),d(i,h),m=!0,T||(y=$(o,"click",(function(){r(t[2](t[1],t[0]))&&t[2](t[1],t[0]).apply(this,arguments)})),T=!0)},p(e,[n]){t=e,A&&A.p&&8&n&&a(A,E,t,t[3],n,st,rt)},i(t){m||(H(A,t),m=!0)},o(t){J(A,t),m=!1},d(t){t&&f(e),A&&A.d(t),T=!1,y()}}}let it=20,ct="#000000",at="#FF0000";function lt(t,e,n){const s=L();let{identifier:r}=e,{eventName:o}=e,{$$slots:i={},$$scope:c}=e;return t.$set=t=>{"identifier"in t&&n(0,r=t.identifier),"eventName"in t&&n(1,o=t.eventName),"$$scope"in t&&n(3,c=t.$$scope)},[r,o,s,c,i]}class dt extends z{constructor(t){super(),V(this,t,lt,ot,o,{identifier:0,eventName:1})}}function ut(e){let n;return{c(){n=p("div"),b(n,"class","flex-child")},m(t,e){u(t,n,e)},p:t,d(t){t&&f(n)}}}function ft(t){let e,n,s,r=(t[0].stack[0]||t[0].nativeStack[0])+"";return{c(){e=p("div"),n=m(r),b(e,"class",s="flex-child "+t[0].state+" file-thread"),w(e,"overflow","hidden")},m(t,s){u(t,e,s),d(e,n)},p(t,o){1&o&&r!==(r=(t[0].stack[0]||t[0].nativeStack[0])+"")&&y(n,r),1&o&&s!==(s="flex-child "+t[0].state+" file-thread")&&b(e,"class",s)},d(t){t&&f(e)}}}function ht(e){let n;function s(t,e){return t[0]?ft:ut}let r=s(e),o=r(e);return{c(){o.c(),n=m("")},m(t,e){o.m(t,e),u(t,n,e)},p(t,[e]){r===(r=s(t))&&o?o.p(t,e):(o.d(1),o=r(t),o&&(o.c(),o.m(n.parentNode,n)))},i:t,o:t,d(t){o.d(t),t&&f(n)}}}function pt(t,e,n){let{thread:s}=e;return t.$set=t=>{"thread"in t&&n(0,s=t.thread)},[s]}class gt extends z{constructor(t){super(),V(this,t,pt,ht,o,{thread:0})}}const mt=new class{constructor(){const{subscribe:t,set:e,update:n}=q({});this.subscribe=t,this.set=e,this.update=n}addThread(t,e){this.update(n=>{let s={},r={},o={};return o[e.name]=e,r[t.name]=Object.assign({},n[t.name],o),s=(n[t.name],Object.assign({},n,r)),s})}};function vt(t,e,n){const s=t.slice();return s[20]=e[n],s[22]=n,s}function $t(t,e,n){const s=t.slice();return s[17]=e[n],s}function Tt(t,e,n){const s=t.slice();return s[20]=e[n],s[22]=n,s}function bt(t){let e,n,s=t[20]+"";return{c(){e=p("span"),n=m(s),b(e,"slot","content")},m(t,s){u(t,e,s),d(e,n)},p(t,e){2&e&&s!==(s=t[20]+"")&&y(n,s)},d(t){t&&f(e)}}}function yt(t){let e,n;return e=new dt({props:{eventName:"closeTab",identifier:t[20],$$slots:{content:[bt]},$$scope:{ctx:t}}}),e.$on("closeTab",t[6]),{c(){W(e.$$.fragment)},m(t,s){X(e,t,s),n=!0},p(t,n){const s={};2&n&&(s.identifier=t[20]),16777218&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(H(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function wt(t){let e,n;return e=new gt({props:{thread:t[5](t[20],t[17])}}),{c(){W(e.$$.fragment)},m(t,s){X(e,t,s),n=!0},p(t,n){const s={};10&n&&(s.thread=t[5](t[20],t[17])),e.$set(s)},i(t){n||(H(e.$$.fragment,t),n=!0)},o(t){J(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function Et(t){let e,n,s,r,o,i,c=t[17]+"",a=t[1],l=[];for(let e=0;e<a.length;e+=1)l[e]=wt(vt(t,a,e));const g=t=>J(l[t],1,1,()=>{l[t]=null});return{c(){e=p("div"),n=p("div"),s=m(c),r=v();for(let t=0;t<l.length;t+=1)l[t].c();o=v(),w(n,"overflow","hidden"),b(n,"class","svelte-tccnaf"),b(e,"class","row-wrapper svelte-tccnaf")},m(t,c){u(t,e,c),d(e,n),d(n,s),d(e,r);for(let t=0;t<l.length;t+=1)l[t].m(e,null);d(e,o),i=!0},p(t,n){if((!i||8&n)&&c!==(c=t[17]+"")&&y(s,c),42&n){let s;for(a=t[1],s=0;s<a.length;s+=1){const r=vt(t,a,s);l[s]?(l[s].p(r,n),H(l[s],1)):(l[s]=wt(r),l[s].c(),H(l[s],1),l[s].m(e,o))}for(P(),s=a.length;s<l.length;s+=1)g(s);j()}},i(t){if(!i){for(let t=0;t<a.length;t+=1)H(l[t]);i=!0}},o(t){l=l.filter(Boolean);for(let t=0;t<l.length;t+=1)J(l[t]);i=!1},d(t){t&&f(e),h(l,t)}}}function At(t){let e,n,s,r,o,i,c,a,g,m,$,T,y,E,A,x,L,D,O,S,N,C,k,K,R,M;D=new nt({});let I=t[1],_=[];for(let e=0;e<I.length;e+=1)_[e]=yt(Tt(t,I,e));const F=t=>J(_[t],1,1,()=>{_[t]=null});let B=t[3],Q=[];for(let e=0;e<B.length;e+=1)Q[e]=Et($t(t,B,e));const V=t=>J(Q[t],1,1,()=>{Q[t]=null});return{c(){e=p("main"),n=p("div"),s=p("div"),r=p("div"),o=p("div"),o.textContent="Running",i=v(),c=p("div"),c.textContent="Waiting",a=v(),g=p("div"),g.textContent="Blocked",m=v(),$=p("div"),$.textContent="Suspended",T=v(),y=p("div"),y.textContent="Parked",E=v(),A=p("div"),A.textContent="Zombie",L=v(),W(D.$$.fragment),O=v(),S=p("div"),N=p("div"),C=p("div"),k=v();for(let t=0;t<_.length;t+=1)_[t].c();K=v();for(let t=0;t<Q.length;t+=1)Q[t].c();b(o,"class","R svelte-tccnaf"),b(c,"class","CW svelte-tccnaf"),b(g,"class","B svelte-tccnaf"),b($,"class","S svelte-tccnaf"),b(y,"class","P svelte-tccnaf"),b(A,"class","Z svelte-tccnaf"),b(r,"class",x="state "+(t[2]?"":"flex-row")+" svelte-tccnaf"),b(s,"class","sidebar svelte-tccnaf"),b(C,"class","svelte-tccnaf"),b(N,"class","grid svelte-tccnaf"),w(N,"grid-template-columns","200px repeat("+t[1].length+", "+t[4]+")"),b(S,"class","main svelte-tccnaf"),b(n,"class",R=l(t[2]?"filesloaded flex-row":"")+" svelte-tccnaf")},m(l,f){u(l,e,f),d(e,n),d(n,s),d(s,r),d(r,o),d(r,i),d(r,c),d(r,a),d(r,g),d(r,m),d(r,$),d(r,T),d(r,y),d(r,E),d(r,A),d(s,L),X(D,s,null),d(n,O),d(n,S),d(S,N),d(N,C),d(N,k);for(let t=0;t<_.length;t+=1)_[t].m(N,null);d(N,K);for(let t=0;t<Q.length;t+=1)Q[t].m(N,null);t[8](S),M=!0},p(t,[e]){if((!M||4&e&&x!==(x="state "+(t[2]?"":"flex-row")+" svelte-tccnaf"))&&b(r,"class",x),66&e){let n;for(I=t[1],n=0;n<I.length;n+=1){const s=Tt(t,I,n);_[n]?(_[n].p(s,e),H(_[n],1)):(_[n]=yt(s),_[n].c(),H(_[n],1),_[n].m(N,K))}for(P(),n=I.length;n<_.length;n+=1)F(n);j()}if(42&e){let n;for(B=t[3],n=0;n<B.length;n+=1){const s=$t(t,B,n);Q[n]?(Q[n].p(s,e),H(Q[n],1)):(Q[n]=Et(s),Q[n].c(),H(Q[n],1),Q[n].m(N,null))}for(P(),n=B.length;n<Q.length;n+=1)V(n);j()}(!M||18&e)&&w(N,"grid-template-columns","200px repeat("+t[1].length+", "+t[4]+")"),(!M||4&e&&R!==(R=l(t[2]?"filesloaded flex-row":"")+" svelte-tccnaf"))&&b(n,"class",R)},i(t){if(!M){H(D.$$.fragment,t);for(let t=0;t<I.length;t+=1)H(_[t]);for(let t=0;t<B.length;t+=1)H(Q[t]);M=!0}},o(t){J(D.$$.fragment,t),_=_.filter(Boolean);for(let t=0;t<_.length;t+=1)J(_[t]);Q=Q.filter(Boolean);for(let t=0;t<Q.length;t+=1)J(Q[t]);M=!1},d(n){n&&f(e),U(D),h(_,n),h(Q,n),t[8](null)}}}function xt(t,e,n){let s,r;i(t,Y,t=>n(10,s=t)),i(t,mt,t=>n(11,r=t));let{services:o}=e;var c,a;c="services",a=o,x().$$.context.set(c,a);let l,d=t=>{let{groups:e}=/(?<name>.*?)(?<num>[\d]*)$/.exec(t);return e},u=(t,e)=>{let n=d(t),s=d(e);if(n.name){let t=n.name.localeCompare(s.name);if(0==t){let t=parseInt(n.num),e=parseInt(s.num);return NaN===t&&NaN===e?0:NaN===t?-1:NaN===e?1:t-e}return t}},f=100,h=()=>{n(9,f=l.getBoundingClientRect().width)};var p;let g,m,v,$,T;return p=h,x().$$.on_mount.push(p),function(t){x().$$.after_update.push(t)}(h),window.onresize=h,t.$set=t=>{"services"in t&&n(7,o=t.services)},t.$$.update=()=>{1024&t.$$.dirty&&n(1,g=s.map(t=>t.name).sort()),2&t.$$.dirty&&n(2,m=g&&g.length>0),2048&t.$$.dirty&&n(3,v=Object.keys(Object.entries(r).reduce((t,[e,n])=>Object.assign({},t,n),{})).sort(u)),2048&t.$$.dirty&&n(12,$=r),514&t.$$.dirty&&n(4,T=Math.floor(f/(g.length+1))-1+"px")},[l,g,m,v,T,(t,e)=>$[t]&&$[t][e]?$[t][e]:void 0,({detail:t})=>{console.log("closeTab",t),Y.remove(t)},o,function(t){O[t?"unshift":"push"](()=>{l=t,n(0,l)})}]}class Lt{constructor(t){this.name=t,this.subscribers=[]}process(){try{this.notify(...arguments)}catch(t){throw console.error(t),t}}notify(){this.subscribers.forEach(t=>t.process(...arguments))}subscribe(){this.subscribers=[...this.subscribers,...arguments]}}class Dt extends Lt{constructor(){super("LineProcessor"),this.textDecoder=new TextDecoder("utf-8"),this.dataArr=[]}process(t,e){this.dataArr=this.dataArr.concat(Array.from(e));let n=this.newLineIndex();for(;-1!=n;){let e=this.dataArr.splice(0,n+1);var s=this.textDecoder.decode(Uint8Array.from(e));this.notify(t,s),n=this.newLineIndex()}}newLineIndex(){return this.dataArr.findIndex(t=>10===t||13===t)}}const Ot=["START_DEADLOCK","2LKDEADLOCKTHR","3LKDEADLOCKWTR","4LKDEADLOCKMON","4LKDEADLOCKOBJ","3LKDEADLOCKOWN","1LKDEADLOCK","1LKDEADLOCK"];class St extends Lt{constructor(){super("LockBuilder"),this.thread={},this.deadlockStarted=!1}process(t,{type:e,content:n}){"1LKDEADLOCK"===e&&(this.deadlockStarted=!0,console.log(this.name+" - DeadLock Start")),"1LKDEADLOCK"===e&&this.deadlockStarted&&(this.deadlockStarted=!1,console.log(this.name+" - DeadLock End"))}}const Nt=["1LKDEADLOCK","0SECTION"],Ct=["2LKMONINUSE","3LKMONOBJECT","3LKNOTIFYQ","3LKWAITNOTIFY","3LKWAITERQ","3LKWAITER","1LKREGMONDUMP","2LKREGMON","1LKMONPOOLDUMP","1LKREGMONDUMP",...Nt];class kt extends Lt{constructor(){super("LockMonitorBuilder"),this.thread={},this.lkMonitorsStarted=!1,this.regMonitorsStarted=!1}process(t,{type:e,content:n}){try{"1LKMONPOOLDUMP"===e&&(this.lkMonitorsStarted=!0,this.regMonitorsStarted=!1,console.log(this.name+" - Lock Monitors Start")),"1LKREGMONDUMP"===e&&(this.lkMonitorsStarted=!1,this.regMonitorsStarted=!0,console.log(this.name+" - Lock Monitors End"),console.log(this.name+" - Reg Monitors Start")),-1!==Nt.indexOf(e)&&this.regMonitorsStarted&&(this.lkMonitorsStarted=!1,this.regMonitorsStarted=!1,console.log(this.name+" - Reg Monitors End"))}catch(t){console.error(t),this.close()}}close(){let t=super.close();return console.timeEnd("global"),t}}class Kt{constructor({name:t,j9vmthread:e,j9thread:n,id:s,state:r,prio:o}){this.name=t,this.state=r,this.prio=o,this.j9vmthread=e,this.j9thread=n,this.id=s,this.stack=[],this.nativeStack=[]}addToStack(t){this.stack.push(t)}addToNativeStack(t){this.nativeStack.push(t)}addJavalThread(t){this.javalThreadIfo=t}addThreadInfo1(t){this.nativeInfo=t}}const Rt=/\"(?<name>.*?)\"[\s,]*(?<j9vmthread>.*?),[\s,]*(?<j9thread>.*?),[\s,]*(?<id>.*?),[\s,]*state:(?<state>.*),[\s,]*prio=(?<prio>[\d]*)/,Mt=/.*?ID:(?<threadId>.*?),.*?priority:(?<priority>.*?),.*?policy:(?<policy>.*?),.*?vmstate:(?<vmstate>.*?),.*?flags:(?<flags>.*?)\)/,It=/\(.*getId:(?<getId>.*?),.*?isDaemon:(?<isDaemon>.*?)\)/,_t={THREADINFO:"3XMTHREADINFO",JAVALTHREAD:"3XMJAVALTHREAD",THREADINFO1:"3XMTHREADINFO1",STACKTRACE4:"4XESTACKTRACE",STACKTRACE5:"5XESTACKTRACE",NATIVESTACK:"4XENATIVESTACK",THREADBLOCK:"3XMTHREADBLOCK",START_THREADS:"1XMTHDINFO",END_THREADS:"0SECTION"},Ft=Object.values(_t);class Bt extends Lt{constructor(){super("ThreadBuilder"),this.thread=void 0,this.started=!1}process(t,{type:e,content:n}){this.started&&this.buildThread(t,e,n),_t.START_THREADS===e&&(this.started=!0,console.log(this.name+" - Build Threads Start")),_t.END_THREADS===e&&this.started&&(this.started=!1,console.log(this.name+" - Build Threads End"))}buildThread(t,e,n){let s=void 0;switch(e){case _t.THREADINFO:if(s=Rt.exec(n),s){let{groups:e}=s;e&&e.name&&(this.thread=new Kt(e),mt.addThread(t,this.thread))}else this.thread=new Kt({name:n}),mt.addThread(t,this.thread);break;case _t.THREADINFO1:if(s=Mt.exec(n),s){let{groups:t}=s;this.thread.addThreadInfo1(t)}break;case _t.JAVALTHREAD:if(s=It.exec(n),s){let{groups:t}=s;this.thread.addJavalThread(t)}break;case _t.STACKTRACE4:case _t.STACKTRACE5:this.thread.addToStack(n);break;case _t.NATIVESTACK:this.thread.addToNativeStack(n)}}}const Pt=/^(?<type>.*?)\s[\s]*(?<content>.*)/,jt=[...Ft,...Ct,...Ot];class Ht extends Lt{constructor(){super("LineFilter")}process(t,e){try{let{groups:{type:n,content:s}}=Pt.exec(e);-1!==jt.indexOf(n)&&this.notify(t,{type:n,content:s})}catch(t){console.error(t)}}}class Jt{list=[];listeners=[];addDeferred(t){this.list.push(t),this.notify()}addListener(t){this.listeners.push(t),this.notify()}notify(){if(this.listeners.length>0&&this.list.length>0){let t=this.list.shift();this.listeners.shift().execute(t),this.notify()}}}class Wt{constructor(t){this.file=t,this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}class Xt{constructor(t){this.queue=t,this.reader=new FileReader}async execute(t){this.reader.onload=e=>{t.resolve(e.target.result),this.queue.addListener(this)},this.reader.readAsArrayBuffer(t.file)}}class Ut{constructor(t){this.fileQueue=new Jt;for(let e=0;e<t;e++)this.fileQueue.addListener(new Xt(this.fileQueue))}async read(t){let e=new Wt(t);return this.fileQueue.addDeferred(e),e.promise}}Ut.getInstance=()=>(Ut.instance||(Ut.instance=new Ut(6)),Ut.instance);return new class extends z{constructor(t){super(),V(this,t,xt,At,o,{services:7})}}({target:document.body,props:{services:{JCoreProcessor:new class{constructor(){Y.subscribe(t=>{this.process(t)})}async process(t){if(t&&t.length>0){this.processing&&console.log("cancel previous"),this.processing=!0;let e=t.map(async t=>await new Promise((e,n)=>t.file(e,n)));console.time("global"),Promise.all(e).then(t=>Promise.all(t.map(t=>this.processFile(t)))).then(()=>console.timeEnd("global"))}}async processFile(t){let e=new Dt,n=new Ht,s=new Bt,r=new St,o=new kt;e.subscribe(n),n.subscribe(s,r,o);let i=t.stream();await i.pipeTo(new WritableStream({write:n=>{try{e.process(t,n)}catch(t){console.error(t)}},close:()=>{console.log("File stream closed")},Abort:()=>{}}))}},FileReadService:Ut.getInstance(6)}}})}();
//# sourceMappingURL=bundle.js.map
