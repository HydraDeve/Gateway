var Oi=Object.defineProperty,Ki=Object.defineProperties;var Vi=Object.getOwnPropertyDescriptors;var Yn=Object.getOwnPropertySymbols;var Lr=Object.prototype.hasOwnProperty,Pr=Object.prototype.propertyIsEnumerable;var Ar=(n,i,a)=>i in n?Oi(n,i,{enumerable:!0,configurable:!0,writable:!0,value:a}):n[i]=a,g=(n,i)=>{for(var a in i||(i={}))Lr.call(i,a)&&Ar(n,a,i[a]);if(Yn)for(var a of Yn(i))Pr.call(i,a)&&Ar(n,a,i[a]);return n},k=(n,i)=>Ki(n,Vi(i));var Dr=(n,i)=>{var a={};for(var t in n)Lr.call(n,t)&&i.indexOf(t)<0&&(a[t]=n[t]);if(n!=null&&Yn)for(var t of Yn(n))i.indexOf(t)<0&&Pr.call(n,t)&&(a[t]=n[t]);return a};import{j as e,R as Kt,a as r,F as qi,r as d,t as Nr,b as ji,c as $i,s,B as Yi,L as Zn,u as be,w as zr,M as Zi,d as Xi,e as Xn,f as Qi,g as Ji,h as ea,i as na,k as ta,l as F,N as ra,m as V,n as Fr,G as Mr,o as Wr,p as Br,q as Ur,v as Er,V as Tr,I as Gr,x as Rr,y as Me,z as We,A as q,S as M,P as Bn,C as He,D as ia,E as Hr,H as _n,J as Vt,K as qt,_ as Be,O as aa,Q as jt,T as oa,U as Or,W as la,X as Kr,Y as $t,Z as sa,$ as Yt,a0 as ca,a1 as Qn,a2 as da,a3 as je,a4 as Jn,a5 as Zt,a6 as Xt,a7 as Vr,a8 as dn,a9 as et,aa as Qt,ab as ha,ac as pa,ad as ua,ae as xa,af as ma,ag as ga,ah as fa,ai as ba,aj as va,ak as wa,al as ya,am as _a,an as ka,ao as Ca}from"./vendor.ed0246b8.js";const Ia=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))t(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const A of c.addedNodes)A.tagName==="LINK"&&A.rel==="modulepreload"&&t(A)}).observe(document,{childList:!0,subtree:!0});function a(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerpolicy&&(c.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?c.credentials="include":l.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function t(l){if(l.ep)return;l.ep=!0;const c=a(l);fetch(l.href,c)}};Ia();function Oe(n){return e(Kt.Fragment,{children:r(qi,{children:[e("title",{children:n.title}),e("meta",{charset:"UTF-8"}),e("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),e("meta",{name:"description",content:"GateWay makes it easy to license almost any application! Unique features, fair price point and fast support makes us an easy choice! Secure your application now!"}),e("meta",{name:"keywords",content:"license, security, easy, powerful, software, application, plugin, protection"}),e("meta",{name:"author",content:"GateWay | Development Team"})]})})}const Ue=Kt.createContext(),Sa=({children:n})=>{const[i,a]=d.exports.useState(!1);return e(Ue.Provider,{value:[i,a],children:n})},f=n=>{Nr.error(r("div",{style:{display:"flex",alignItems:"center",gap:"5px"},children:[e($i,{style:{fontSize:"28px"}}),e("p",{style:{fontSize:".875rem",fontWeight:"400"},children:n})]}),{icon:!1,position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!1,pauseOnFocusLoss:!1,draggable:!0,progress:void 0})},ne=n=>{Nr.success(r("div",{style:{display:"flex",alignItems:"center",gap:"5px"},children:[e(ji,{style:{fontSize:"28px"}}),e("p",{style:{fontSize:".875rem",fontWeight:"400"},children:n})]}),{icon:!1,position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!1,pauseOnFocusLoss:!1,draggable:!0,progress:void 0})};function L(n){const i={background:n.color?n.color:"primary"},a={color:n.txtcolor?n.txtcolor:""};return e(Yi,{component:"div",children:e(La,{style:g(g({},a),i),name:n.name,value:n.value,onClick:t=>n.onClick(t),disabled:n.disabled,children:n.text})})}const La=s.button`
	background-color: #556ee6;
	outline: none;
	display: inline-block;
	font-weight: 400;
	line-height: 1.5;
	color: #a6b0cf;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	user-select: none;
	border: 1px solid transparent;
	padding: 0.47rem 0.75rem;
	font-size: 0.9125rem;
	border-radius: 0.25rem;
	@media screen and (max-width: 996px) {
		width: 100%;
	}
`;function $e(){return e(Pa,{children:r(Aa,{children:[e(Da,{children:"GateWay \xA9 2023"}),e(Na,{to:{pathname:"https://discord.gg/license"},target:"_blank",children:"Support Discord"})]})})}const Pa=s.div`
	bottom: 0;
	padding: 20px 12px;
	position: absolute;
	right: 0;
	width: 100%;
	height: 60px;
	background-color: var(--ul-third);
	@media screen and (max-width: 992px) {
		left: 0;
	}
`,Aa=s.div`
	display: flex;
	justify-content: space-between;
`,Da=s.p`
	color: var(--ul-purple);
	font-size: 13px;
`,Na=s(Zn)`
	color: var(--ul-purple);
	font-size: 13px;
`;function Ye({sendNavStatus:n,NavStatus:i}){const[a,t]=d.exports.useContext(Ue);let l=document.documentElement;const c=be(v=>v.auth),{user:A}=c,[R,u]=Kt.useState(null),B=v=>{u(v.currentTarget)},J=()=>{u(null)},o=zr({paper:{border:"1px solid var(--ul-main)",backgroundColor:"var(--ul-second)",color:"#a6b0cf"}})(v=>e(Zi,g({elevation:0,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"}},v))),b=zr(v=>({root:{fontSize:"0.9125rem",color:"#a6b0cf"}}))(Xi),w=async()=>{try{await F.get("/api/users/logout"),localStorage.removeItem("firstLogin"),window.location.href="/"}catch{window.location.href="/"}};function m(){l.requestFullscreen?l.requestFullscreen():l.webkitRequestFullscreen?l.webkitRequestFullscreen():l.msRequestFullscreen&&l.msRequestFullscreen()}function z(){document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen()}function K(){document.fullScreenElement!==void 0&&document.fullScreenElement===null||document.msFullscreenElement!==void 0&&document.msFullscreenElement===null||document.mozFullScreen!==void 0&&!document.mozFullScreen||document.webkitIsFullScreen!==void 0&&!document.webkitIsFullScreen?m():z()}return e(za,{children:r(Fa,{children:[r(qr,{children:[a?e(jr,{style:{width:"70px"},children:e(Xn,{})}):r(jr,{children:[e(Xn,{}),e(Ma,{children:"GateWay"})]}),e(Un,{onClick:()=>{t(!i)},children:e(Qi,{})})]}),r(qr,{children:[e(Un,{onClick:K,children:e(Ji,{})}),e(Un,{children:e(ea,{})}),r(Un,{onClick:B,children:[e(Ba,{src:A.image?`/images/${A.image}`:"/images/default.png"}),e(Wa,{children:A.name}),e(na,{})]}),r(o,{id:"simple-menu",anchorEl:R,keepMounted:!0,open:Boolean(R),onClose:J,children:[e(Zn,{to:"settings",children:e(b,{children:"Settings"})}),e(b,{onClick:w,children:"Logout"})]}),e(Un,{children:e(Zn,{to:"settings",style:{display:"flex",alignItems:"center",TextDecoration:"none",color:"var(--ul-purple)"},children:e(ta,{})})})]})]})})}const za=s.div`
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 1002;
	background-color: #262b3c;
	box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
`,Fa=s.div`
	display: flex;
	justify-content: space-between;
	background-color: var(--ul-third);
	height: 70px;
`,qr=s.div`
	display: flex;
`,jr=s.div`
	background-color: var(--ul-second);
	width: 250px;
	display: flex;
	gap: 3px;
	justify-content: center;
	align-items: center;
	svg {
		font-size: 20px;
		color: var(--ul-highlight-main);
	}
	@media screen and (max-width: 992px) {
		width: 70px;
	}
`,Ma=s.h1`
	color: #fff;
	font-size: 20px;
	@media screen and (max-width: 992px) {
		display: none;
	}
`,Un=s.button`
	font-size: 20px;
	background-color: transparent;
	outline: none;
	border: none;
	color: var(--ul-purple);
	cursor: pointer;
	padding: 0 16px;

	display: flex;
	align-items: center;
	/* Hiden focus button for mobile */
	@media screen and (max-width: 992px) {
		:nth-child(1) {
			display: none;
		}
	}
`,Wa=s.span`
	font-size: 0.8125rem;
	margin-left: 0.25rem;
`,Ba=s.img`
	border-radius: 50%;
	padding: 3px;
	background-color: #32394e;
	height: 36px;
`;function Ze(){const[n,i]=d.exports.useContext(Ue),a=async()=>{try{await F.get("/api/users/logout"),localStorage.removeItem("firstLogin"),window.location.href="/"}catch{window.location.href="/"}},t=async()=>{try{window.innerWidth<1200&&i(!n)}catch{}};return e(V,{children:n?e($r,{style:{width:"70px"},children:r(Yr,{children:[e(ae,{children:e(we,{exact:!0,to:"/dashboard",activeStyle:{},onClick:t,children:e(Fr,{})})}),e(ae,{children:e(we,{exact:!0,to:"/licenses",activeStyle:{},onClick:t,children:e(Mr,{})})}),e(ae,{children:e(we,{exact:!0,to:"/add-new",activeStyle:{},onClick:t,children:e(Wr,{})})}),e(ae,{children:e(we,{exact:!0,to:"/blacklist",activeStyle:{},onClick:t,children:e(Br,{})})}),e(ae,{children:e(we,{exact:!0,to:"/users",activeStyle:{},onClick:t,children:e(Ur,{})})}),e(ae,{children:e(we,{exact:!0,to:"/products",activeStyle:{},onClick:t,children:e(Er,{})})}),e(ae,{children:e(we,{exact:!0,to:"/console",activeStyle:{},onClick:t,children:e(Tr,{})})}),e(ae,{children:e(we,{exact:!0,to:"/settings",activeStyle:{},onClick:t,children:e(Gr,{})})}),e(ae,{onClick:a,children:e(we,{exact:!0,to:"/",children:e(Rr,{})})})]})}):e(Ua,{children:e($r,{className:"vertical-big",children:r(Yr,{children:[e(ae,{children:e(nt,{children:"Home"})}),e(ae,{children:r(we,{exact:!0,to:"/dashboard",activeStyle:{},children:[e(Fr,{}),e(Ke,{children:"Dashboard"})]})}),e(ae,{children:e(nt,{children:"Management"})}),e(ae,{children:r(we,{exact:!0,to:"/licenses",activeStyle:{},children:[e(Mr,{}),e(Ke,{children:"Licenses"})]})}),e(ae,{children:r(we,{exact:!0,to:"/add-new",activeStyle:{},children:[e(Wr,{}),e(Ke,{children:"Add new"})]})}),e(ae,{children:r(we,{exact:!0,to:"/blacklist",activeStyle:{},children:[e(Br,{}),e(Ke,{children:"Blacklist"})]})}),e(ae,{children:r(we,{exact:!0,to:"/users",activeStyle:{},children:[e(Ur,{}),e(Ke,{children:"Users"})]})}),e(ae,{children:e(nt,{children:"Team"})}),e(ae,{children:r(we,{exact:!0,to:"/products",activeStyle:{},children:[e(Er,{}),e(Ke,{children:"Products"})]})}),e(ae,{children:r(we,{exact:!0,to:"/console",activeStyle:{},children:[e(Tr,{}),e(Ke,{children:"Console"})]})}),e(ae,{children:e(nt,{children:"Profile"})}),e(ae,{children:r(we,{exact:!0,to:"/settings",activeStyle:{},children:[e(Gr,{}),e(Ke,{children:"Settings"})]})}),e(ae,{children:r(we,{onClick:a,exact:!0,to:"/",children:[e(Rr,{}),e(Ke,{children:"Logout"})]})})]})})})})}const $r=s.div`
	width: 250px;
	z-index: 1420;
	bottom: 0;
	margin-top: 0;
	position: fixed;
	top: 70px;
	box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
	background-color: var(--ul-second);
	padding: 10px 0 30px;
	@media screen and (max-width: 992px) {
		height: 100%;
	}
`,Ua=s.div`
	@media screen and (max-width: 992px) {
		display: none;
	}
`,nt=s.p`
	padding: 12px 20px;
	letter-spacing: 0.05em;
	pointer-events: none;
	cursor: default;
	font-size: 11px;
	text-transform: uppercase;
	color: #6a7187;
	font-weight: 600;
`,Yr=s.ul``,ae=s.li`
	display: block;
	width: 100%;
	:hover {
		svg,
		span {
			color: #f6f6f6;
		}
	}
`,we=s(ra)`
	display: flex;
	align-items: center;
	padding: 0.625rem 1.45rem;
	color: #a6b0cf;
	position: relative;
	font-size: 13px;
	transition: all 0.4s;
	svg {
		display: inline-block;
		min-width: 1.5rem;
		font-size: 1.5rem;
		line-height: 1.40625rem;
		vertical-align: middle;
		text-align: center;
		color: #6a7187;
		transition: all 0.4s;
		margin-right: 8px;
	}
	&.active {
		span,
		svg {
			color: #f6f6f6;
		}
	}
	@media screen and (max-width: 992px) {
		padding: 0.925rem 1.45rem;
	}
`,Ke=s.span`
	color: var(--ul-purple);
	font-size: 13px;
	font-weight: 400;
	transition: all 0.4s;
`,Xe=s.div`
	margin-left: 250px;
	padding: 94px 12px 60px;
	position: relative;
	min-height: 100vh;

	// Material UI
	.MuiTypography-body1 {
		color: #a6b0cf;
		font-weight: 400;
		font-size: 0.8125rem;
		font-family: 'Poppins', sans-serif;
	}
	.MuiSwitch-track {
		background-color: #15161a;
	}

	.MuiPaginationItem-root {
		color: #a6b0cf;
	}

	.MuiSkeleton-root {
		background-color: #32394e;
	}

	@media screen and (max-width: 992px) {
		margin-left: 0px !important;
	}

	// Disabled inputs
	input:disabled,
	select:disabled,
	textarea:disabled {
		background-color: #2d3245;
		color: #8f96af;
		&:hover {
			cursor: not-allowed;
		}
	}
	button:disabled {
		cursor: not-allowed;
	}
`,Qe=s.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-left: 12px;
	margin-right: 12px;
	padding-bottom: 12px;
`,Je=s.h4`
	text-transform: uppercase;
	font-weight: 600;
	font-size: 16px;
	color: #fff;
`,en=s.p`
	color: #f6f6f6;
	font-size: 0.8125rem;
	font-weight: 400;
`,nn=s.span`
	color: gray;
	font-size: 0.6125rem;
	font-weight: 400;
`,oe=s.h4`
	font-size: 15px;
	margin: 0 0 7px;
	font-weight: 600;
	color: #f6f6f6;
`,Pe=s.p`
	color: #a6b0cf;
	margin-bottom: 24px;
	font-size: 0.8125rem;
	font-weight: 400;
`,xe=s.select`
	display: block;
	width: 100%;
	padding: 0.47rem 1.75rem 0.47rem 0.75rem;
	font-size: 0.8125rem;
	font-weight: 400;
	line-height: 1.5;
	color: #bfc8e2;
	background-color: #2e3446;
	background-image: url('https://cdn.discordapp.com/attachments/729088611986702508/827255111528087573/nigga.svg');
	background-repeat: no-repeat;
	outline: none;
	background-position: right 0.75rem center;
	background-size: 16px 12px;
	border: 1px solid #32394e;
	border-radius: 0.25rem;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;

	&:disabled {
		cursor: not-allowed;
	}
`,G=s.input`
	display: block;
	width: 100%;
	outline: none;
	padding: 0.47rem 0.75rem;
	font-size: 0.8125rem;
	font-weight: 400;
	line-height: 1.5;
	color: #bfc8e2;
	background-color: #2e3446;
	background-clip: padding-box;
	border: 1px solid #32394e;
	appearance: none;
	border-radius: 0.25rem;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`,P=s.label`
	color: #a6b0cf;
	font-weight: 500;
	font-size: 0.8125rem;
	margin-top: 10px;
	width: 200px;
	@media screen and (max-width: 1200px) {
		width: auto;
	}
`,ke=s.span`
	color: #8c909b;
	font-weight: 500;
	font-size: 0.6125rem;
	font-style: italic;
`,Zr=s.button`
	background-color: #556ee6;
	outline: none;
	display: inline-block;
	font-weight: 400;
	line-height: 1.5;
	color: #a6b0cf;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	user-select: none;
	border: 1px solid transparent;
	padding: 0.47rem 0.75rem;
	font-size: 0.9125rem;
	border-radius: 0.25rem;
	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
		border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`,Jt=s.div`
	position: absolute;
	right: 16px;
	bottom: 16px;
	@media screen and (max-width: 450px) {
		right: 0;
		bottom: 0;
		position: relative;
		display: flex;
		justify-content: center;
	}
`,Xr=s.input`
	border: none;
	height: 38px;
	width: 100%;
	padding-left: 40px;
	padding-right: 20px;
	box-shadow: none;
	border-radius: 30px;
	background-color: #2e3446;
	outline: none;
	font-size: 0.8125rem;
	font-weight: 400;
	line-height: 1.5;
	color: #bfc8e2;
`,Qr=s.textarea`
	display: block;
	width: 100%;
	padding: 0.47rem 0.75rem;
	font-size: 0.8125rem;
	font-weight: 400;
	line-height: 1.5;
	color: #bfc8e2;
	max-height: 150px;
	background-color: #2e3446;
	background-clip: padding-box;
	border: 1px solid #32394e;
	resize: vertical;
	-webkit-appearance: none;
	appearance: none;
	border-radius: 0.25rem;
	outline: none;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`,Jr={blacklisted:"",type:"ip"};function Ea(){const[n]=d.exports.useContext(Ue),[i,a]=d.exports.useState(!1),t=be(U=>U.token),l=be(U=>U.auth),[c,A]=d.exports.useState(!0),R=5,{user:u}=l,[B,J]=d.exports.useState([]),[o,b]=d.exports.useState(Jr),{blacklisted:w,type:m}=o,[z,K]=d.exports.useState(1),[v,ee]=d.exports.useState(12),[D,T]=d.exports.useState(),he=Me({config:g({},We.stiff),from:{opacity:0},to:{opacity:c?0:1}}),ce=Me({config:g({},We.stiff),from:{opacity:0},to:{opacity:c?1:0}});d.exports.useEffect(()=>{let U=!1;return U||(async()=>{let Q=await F.get(`/api/users/getblacklist?page=${z}&limit=${v}`,{headers:{Authorization:t}});U||(T(Q.data.total),J(Q.data.blacklist.results),setTimeout(()=>U?null:A(!1),250))})(),()=>{U=!0}},[i]);const $=async U=>{if(U.preventDefault(),w.length<7)return f("Invalid IP/HWID");try{const O=await F.post("/api/users/addblacklist",{blacklisted:w,type:m,created_by:u.name},{headers:{Authorization:t}});a(!i),b(Jr),ne(O.data.msg)}catch(O){O.response.data.msg&&f(O.response.data.msg)}},Ie=async U=>{try{const O=await F.post("/api/users/deleteblacklist",{blacklisted:U},{headers:{Authorization:t}});return a(!i),ne(O.data.msg)}catch(O){O.response.data.msg&&f(O.response.data.msg)}},pe=async(U,O)=>{U.preventDefault(),K(O),a(!i)},re=U=>{const{name:O,value:Q}=U.target;b(k(g({},o),{[O]:Q}))},Z=()=>B?B.length===0?e("p",{style:{color:"#a6b0cf",padding:"12px"},children:"No results..."}):B.map(U=>r(er,{style:{minWidth:"1160px"},children:[e(Fe,{style:{minWidth:"250px"},children:U.blacklisted}),e(Fe,{style:{minWidth:"250px"},children:U.region||"None"}),e(Fe,{style:{minWidth:"250px"},children:U.type.toUpperCase()||"None"}),e(Fe,{style:{minWidth:"250px"},children:U.blocked_connections}),e(Ha,{style:{width:"10%",minWidth:"80px"},children:e(He,{onClick:()=>Ie(U._id)})})]},U._id)):null;return r(V,{children:[e(Oe,{title:"Blacklist - GateWay"}),e(Ye,{NavStatus:n}),e(Ze,{NavStatus:n}),r(Xe,{style:n?{marginLeft:"70px"}:{marginLeft:"250px"},children:[r(Qe,{children:[e(Je,{children:"Blacklist"}),r(en,{children:["Management ",e(nn,{children:"/"})," Blacklist"]})]}),r(Ta,{children:[r(ei,{className:"col1",children:[e(oe,{children:"Add new"}),e(Pe,{children:"Here you can add HWIDs/IPs to blacklist and block their usage!"}),r(Ga,{children:[e(G,{placeholder:"IP/HWID",onChange:re,name:"blacklisted",value:w}),r(xe,{onChange:re,name:"type",value:m,children:[e("option",{value:"ip",children:"IP"}),e("option",{value:"hwid",children:"HWID"})]}),e(L,{onClick:$,text:"Submit"})]})]}),r(ei,{className:"col2",style:{position:"relative"},children:[e(oe,{children:"Blacklist"}),e(Pe,{children:"Here are your current Blacklisted IPs/HWIDs!"}),r(Ra,{style:{overflowX:"auto"},children:[r(er,{style:{minWidth:"1160px",backgroundColor:"#32394e",fontWeight:"600"},children:[e(Fe,{style:{minWidth:"250px"},children:"IP/HWID"}),e(Fe,{style:{minWidth:"250px"},children:"Location"}),e(Fe,{style:{minWidth:"250px"},children:"Type"}),e(Fe,{style:{minWidth:"250px"},children:"Blocked connections"}),e(Fe,{style:{width:"10%",minWidth:"80px"},children:"Manage"})]}),c?e(V,{children:e(q.div,{style:ce,children:[...Array(R)].map((U,O)=>r(er,{children:[r(Fe,{children:[" ",e(M,{animation:"wave",width:"90%",height:"20px"})]}),r(Fe,{children:[" ",e(M,{animation:"wave",width:"90%",height:"20px"})]}),r(Fe,{children:[" ",e(M,{animation:"wave",width:"90%",height:"20px"})]}),r(Fe,{style:{width:"10%"},children:[" ",e(M,{animation:"wave",width:"90%",height:"20px"})]})]},O))})}):e(q.div,{style:he,children:Z()})]}),e(Jt,{children:B?e(Bn,{size:window.innerWidth<450?"small":"medium",count:Math.ceil(10/30),onChange:pe,page:1,color:"primary"}):null})]})]}),e($e,{})]})]})}const Ta=s.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	padding: 12px 12px 24px 12px;
	grid-gap: 24px;
	grid-auto-rows: minmax(120px, auto);

	.col1 {
		grid-row: 1/2;
	}

	.col2 {
		min-height: calc(100vh - 400px);
		max-width: 100%;
	}
`,ei=s.div`
	background-color: var(--ul-second);
	border-radius: 0.25rem;
	box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
	grid-column: 1/6;
	padding: 16px;
`,Ga=s.div`
	display: flex;
	width: 100%;
	max-width: 1000px;
	gap: 20px;
	@media screen and (max-width: 1200px) {
		flex-direction: column;
	}
`,Ra=s.div`
	display: flex;
	flex-direction: column;
	font-size: 0.8125rem;
	font-weight: 400;
	margin-bottom: 50px;
	min-height: 350px;
	@media screen and (max-width: 450px) {
		margin-bottom: 25px;
	}
`,er=s.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 12px;
	border-bottom: 1px solid #32394e;
	@media screen and (max-width: 996px) {
		justify-content: space-between;
	}
`,Fe=s.p`
	color: #a6b0cf;
	width: 30%;
	overflow-wrap: break-word;
`,Ha=s.div`
	display: flex;
	gap: 10px;
	color: #f46a6a;
	font-size: 16px;
	cursor: pointer;
`,ni=s.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	margin-left: 20px;
	margin-right: 20px;
`,tt=s.div``,ti=s.p`
	color: var(--ul-purple);
	margin-bottom: 10px;
	font-size: 0.8125rem;
	font-weight: 500;
`,ri=s.h4`
	color: #f6f6f6;
	font-weight: 500;
	font-size: 1.21875rem;
`,ii=s.span`
	align-items: center;
	background-color: var(--ul-highlight-main);
	color: #fff;
	display: flex;
	font-weight: 500;
	height: 48px;
	width: 48px;
	justify-content: center;
	border-radius: 50%;
	font-size: 20px;
`;function Oa(){const[n]=d.exports.useContext(Ue),[i,a]=d.exports.useState(!1),t=be(p=>p.token);d.exports.useState();const l=be(p=>p.auth),{user:c}=l,[A,R]=d.exports.useState([]),[u,B]=d.exports.useState(!0),J=8,[o,b]=d.exports.useState(!0),[w,m]=d.exports.useState(!0),[z,K]=d.exports.useState(!0),[v,ee]=d.exports.useState(1),[D,T]=d.exports.useState(12),[he,ce]=d.exports.useState(),[$,Ie]=d.exports.useState(""),[pe,re]=d.exports.useState(!0),[Z,U]=d.exports.useState(!0),[O,Q]=d.exports.useState(!0),W=Me({config:g({},We.stiff),from:{opacity:0},to:{opacity:u?0:1}}),N=Me({config:g({},We.stiff),from:{opacity:0},to:{opacity:u?1:0}});d.exports.useEffect(()=>{let p=!1;return p||(B(!0),(async()=>{let I=await F.get(`/api/users/getlogs?page=${v}&limit=${D}&query=${$}&requests=${pe}&dashboard=${Z}&discord=${O}`,{headers:{Authorization:t}});p||(ce(I.data.total),R(I.data.logs.results),setTimeout(()=>p?null:B(!1),250))})()),()=>{p=!0}},[i]),d.exports.useEffect(()=>{let p=!1;return p||(async()=>{let I=await F.get("/api/users/getswitchstate",{headers:{Authorization:t}});p||(b(I.data.dashboard),m(I.data.requests),K(I.data.discord))})(),()=>{p=!0}},[]);const te=async()=>{try{const p=await F.post("/api/users/updatesavepreference",{dashboard:o,requests:w,discord:z},{headers:{Authorization:t}});ne(p.data.msg)}catch(p){p.response.data.msg&&f(p.response.data.msg)}},H=async(p,ue)=>{p.preventDefault(),ee(ue),a(!i)},h=p=>{p.target.name==="dashboard_logs"?b(!o):p.target.name==="discord_logs"?K(!z):m(!w)},_=p=>{const{name:ue,value:I}=p.target;ue==="query"&&(B(!0),Ie(I),ee(1),setTimeout(()=>{a(!i)},1e3))},C=()=>{if(!!A)return A.length===0?e("p",{style:{color:"#a6b0cf",padding:"12px"},children:"No results..."}):A.map(p=>r(nr,{style:{minWidth:"1000px"},children:[e(Ee,{children:p.user}),e(Ee,{children:p.activity}),e(Ee,{children:p.details||"None"}),e(Ee,{children:e(Be,{date:Date.parse(p.createdAt),locale:"en-US"})})]},p._id))};return r(V,{children:[e(Oe,{title:"Console - GateWay"}),e(Ye,{NavStatus:n}),e(Ze,{NavStatus:n}),r(Xe,{style:n?{marginLeft:"70px"}:{marginLeft:"250px"},children:[r(Qe,{children:[e(Je,{children:"Console"}),r(en,{children:["Management ",e(nn,{children:"/"})," Console"]})]}),r(qa,{children:[e(rt,{className:"col1",children:r(ni,{children:[r(tt,{children:[e(ti,{children:"Total activity records"}),e(ri,{children:u?e(q.div,{style:N,children:e(M,{animation:"wave",width:"100%",height:"40px"})}):e(q.div,{style:W,children:he})})]}),e(tt,{children:e(ii,{children:e(ia,{})})})]})}),r(rt,{className:"col2",children:[e(oe,{children:"Display"}),e(Pe,{children:"Change display settings!"}),r(Ka,{children:[e(Va,{children:e(Hr,{})}),e(Xr,{placeholder:"Search",name:"query",onChange:_})]}),e(_n,{control:e(Vt,{checked:pe,onChange:()=>{re(!pe),a(!i)},name:"checkedB",color:"primary"}),label:"Show requests"}),e(_n,{control:e(Vt,{checked:Z,onChange:()=>{U(!Z),a(!i)},name:"checkedB",color:"primary"}),label:"Show dashboard events"}),e(_n,{control:e(Vt,{checked:O,onChange:()=>{Q(!O),a(!i)},name:"checkedB",color:"primary"}),label:"Show Discord events"})]}),r(rt,{className:"col3",style:{position:"relative"},children:[e(oe,{children:"Settings"}),e(Pe,{children:"At default logs are deleted after 30days."}),r(ja,{children:[e(_n,{control:e(qt,{disabled:c.role!==0,checked:o,onChange:h,name:"dashboard_logs",color:"primary"}),label:"Save dashboard logs"}),e(_n,{control:e(qt,{disabled:c.role!==0,checked:w,onChange:h,name:"request_logs",color:"primary"}),label:"Save request logs"}),e(_n,{control:e(qt,{disabled:c.role!==0,checked:z,onChange:h,name:"discord_logs",color:"primary"}),label:"Save Discord logs"})]}),e("div",{className:"bottom-container",style:{position:"absolute",bottom:"16px",left:"16px",display:"flex",gap:"10px"},children:e(Zr,{disabled:c.role!==0,onClick:te,children:"Submit changes"})})]}),r(rt,{className:"col4",style:{position:"relative"},children:[e(oe,{children:"Console"}),e(Pe,{children:"Here latest activity is being logged!"}),r($a,{className:"Console-desktop",children:[r(nr,{style:{minWidth:"1000px",backgroundColor:"#32394e",fontWeight:"600"},children:[e(Ee,{children:"User"}),e(Ee,{children:"Activity"}),e(Ee,{children:"Details"}),e(Ee,{children:"Timestamp"})]}),u?e(V,{children:e(q.div,{style:N,children:[...Array(J)].map((p,ue)=>r(nr,{style:{minWidth:"1000px"},children:[r(Ee,{children:[" ",e(M,{animation:"wave",width:"90%",height:"20px"})]}),e(Ee,{children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(Ee,{children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(Ee,{children:e(M,{animation:"wave",width:"90%",height:"20px"})})]},ue))})}):e(q.div,{style:W,children:C()})]}),e(Jt,{children:A?e(Bn,{size:window.innerWidth<450?"small":"medium",count:Math.ceil(he/D),onChange:H,page:v,color:"primary"}):null})]})]}),e($e,{})]})]})}const Ka=s.div`
	position: relative;
	width: 100%;
`,Va=s.span`
	position: absolute;
	z-index: 10;
	font-size: 16px;
	line-height: 43px;
	left: 13px;
	top: 0;
	color: #c3cbe4;
`;s.input`
	border: none;
	height: 38px;
	width: 100%;
	padding-left: 40px;
	padding-right: 20px;
	box-shadow: none;
	border-radius: 30px;
	background-color: #2e3446;
	outline: none;
	font-size: 0.8125rem;
	font-weight: 400;
	line-height: 1.5;
	color: #bfc8e2;
`;const qa=s.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	padding: 12px 12px 24px 12px;
	grid-gap: 24px;
	grid-auto-rows: minmax(130px, auto);
	min-height: calc(100vh - 200px);

	.col1 {
		grid-column: 1/2;
		grid-row: 1;
	}
	.col2 {
		grid-column: 1/2;
		grid-row: 2/4;
	}
	.col3 {
		grid-column: 1/2;
		grid-row: 4/6;
	}
	.col4 {
		grid-column: 2/6;
		grid-row: 1/6;
		max-width: 100%;
	}

	@media screen and (max-width: 1200px) {
		.col1 {
			grid-column: 1/6;
			grid-row: 1;
		}
		.col2 {
			grid-column: 1/6;
			grid-row: 2;
		}
		.col3 {
			grid-column: 1/6;
			grid-row: 3;
		}
		.col4 {
			grid-column: 1/6;
			grid-row: 4/6;
		}
	}
`,rt=s.div`
	background-color: var(--ul-second);
	border-radius: 0.25rem;
	box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
	padding: 16px;
`,ja=s.div`
	@media screen and (max-width: 1200px) {
		margin-bottom: 50px;
	}
`,$a=s.div`
	display: flex;
	flex-direction: column;
	font-size: 0.8125rem;
	font-weight: 400;
	margin-bottom: 50px;
	min-height: 350px;
	overflow-x: auto;
	@media screen and (max-width: 450px) {
		margin-bottom: 25px;
	}
`,nr=s.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 12px;
	border-bottom: 1px solid #32394e;
	@media screen and (max-width: 996px) {
		justify-content: space-between;
	}
`,Ee=s.p`
	color: #a6b0cf;
	width: 25%;
	min-width: 250px;
`;function Ya(n,i){return Math.floor(Math.random()*(i-n+1))+n}const Za=async(n,i)=>{for(var a="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",t=n,l=i,c="",A=0;A<l;A++){for(var R="",u=0;u<t;u++){var B=Ya(0,35);R+=a[B]}c+=R,A<l-1&&(c+="-")}return c};function ai(){return r(V,{children:[e("option",{value:"AF",children:"Afghanistan"}),e("option",{value:"AX",children:"\xC5land Islands"}),e("option",{value:"AL",children:"Albania"}),e("option",{value:"DZ",children:"Algeria"}),e("option",{value:"AS",children:"American Samoa"}),e("option",{value:"AD",children:"Andorra"}),e("option",{value:"AO",children:"Angola"}),e("option",{value:"AI",children:"Anguilla"}),e("option",{value:"AQ",children:"Antarctica"}),e("option",{value:"AG",children:"Antigua and Barbuda"}),e("option",{value:"AR",children:"Argentina"}),e("option",{value:"AM",children:"Armenia"}),e("option",{value:"AW",children:"Aruba"}),e("option",{value:"AU",children:"Australia"}),e("option",{value:"AT",children:"Austria"}),e("option",{value:"AZ",children:"Azerbaijan"}),e("option",{value:"BS",children:"Bahamas (the)"}),e("option",{value:"BH",children:"Bahrain"}),e("option",{value:"BD",children:"Bangladesh"}),e("option",{value:"BB",children:"Barbados"}),e("option",{value:"BY",children:"Belarus"}),e("option",{value:"BE",children:"Belgium"}),e("option",{value:"BZ",children:"Belize"}),e("option",{value:"BJ",children:"Benin"}),e("option",{value:"BM",children:"Bermuda"}),e("option",{value:"BT",children:"Bhutan"}),e("option",{value:"BO",children:"Bolivia (Plurinational State of)"}),e("option",{value:"BQ",children:"Bonaire, Sint Eustatius and Saba"}),e("option",{value:"BA",children:"Bosnia and Herzegovina"}),e("option",{value:"BW",children:"Botswana"}),e("option",{value:"BV",children:"Bouvet Island"}),e("option",{value:"BR",children:"Brazil"}),e("option",{value:"IO",children:"British Indian Ocean Territory (the)"}),e("option",{value:"BN",children:"Brunei Darussalam"}),e("option",{value:"BG",children:"Bulgaria"}),e("option",{value:"BF",children:"Burkina Faso"}),e("option",{value:"BI",children:"Burundi"}),e("option",{value:"CV",children:"Cabo Verde"}),e("option",{value:"KH",children:"Cambodia"}),e("option",{value:"CM",children:"Cameroon"}),e("option",{value:"CA",children:"Canada"}),e("option",{value:"KY",children:"Cayman Islands (the)"}),e("option",{value:"CF",children:"Central African Republic (the)"}),e("option",{value:"TD",children:"Chad"}),e("option",{value:"CL",children:"Chile"}),e("option",{value:"CN",children:"China"}),e("option",{value:"CX",children:"Christmas Island"}),e("option",{value:"CC",children:"Cocos (Keeling) Islands (the)"}),e("option",{value:"CO",children:"Colombia"}),e("option",{value:"KM",children:"Comoros (the)"}),e("option",{value:"CD",children:"Congo (the Democratic Republic of the)"}),e("option",{value:"CG",children:"Congo (the)"}),e("option",{value:"CK",children:"Cook Islands (the)"}),e("option",{value:"CR",children:"Costa Rica"}),e("option",{value:"HR",children:"Croatia"}),e("option",{value:"CU",children:"Cuba"}),e("option",{value:"CW",children:"Cura\xE7ao"}),e("option",{value:"CY",children:"Cyprus"}),e("option",{value:"CZ",children:"Czechia"}),e("option",{value:"CI",children:"C\xF4te d'Ivoire"}),e("option",{value:"DK",children:"Denmark"}),e("option",{value:"DJ",children:"Djibouti"}),e("option",{value:"DM",children:"Dominica"}),e("option",{value:"DO",children:"Dominican Republic (the)"}),e("option",{value:"EC",children:"Ecuador"}),e("option",{value:"EG",children:"Egypt"}),e("option",{value:"SV",children:"El Salvador"}),e("option",{value:"GQ",children:"Equatorial Guinea"}),e("option",{value:"ER",children:"Eritrea"}),e("option",{value:"EE",children:"Estonia"}),e("option",{value:"SZ",children:"Eswatini"}),e("option",{value:"ET",children:"Ethiopia"}),e("option",{value:"FK",children:"Falkland Islands (the) [Malvinas]"}),e("option",{value:"FO",children:"Faroe Islands (the)"}),e("option",{value:"FJ",children:"Fiji"}),e("option",{value:"FI",children:"Finland"}),e("option",{value:"FR",children:"France"}),e("option",{value:"GF",children:"French Guiana"}),e("option",{value:"PF",children:"French Polynesia"}),e("option",{value:"TF",children:"French Southern Territories (the)"}),e("option",{value:"GA",children:"Gabon"}),e("option",{value:"GM",children:"Gambia (the)"}),e("option",{value:"GE",children:"Georgia"}),e("option",{value:"DE",children:"Germany"}),e("option",{value:"GH",children:"Ghana"}),e("option",{value:"GI",children:"Gibraltar"}),e("option",{value:"GR",children:"Greece"}),e("option",{value:"GL",children:"Greenland"}),e("option",{value:"GD",children:"Grenada"}),e("option",{value:"GP",children:"Guadeloupe"}),e("option",{value:"GU",children:"Guam"}),e("option",{value:"GT",children:"Guatemala"}),e("option",{value:"GG",children:"Guernsey"}),e("option",{value:"GN",children:"Guinea"}),e("option",{value:"GW",children:"Guinea-Bissau"}),e("option",{value:"GY",children:"Guyana"}),e("option",{value:"HT",children:"Haiti"}),e("option",{value:"HM",children:"Heard Island and McDonald Islands"}),e("option",{value:"VA",children:"Holy See (the)"}),e("option",{value:"HN",children:"Honduras"}),e("option",{value:"HK",children:"Hong Kong"}),e("option",{value:"HU",children:"Hungary"}),e("option",{value:"IS",children:"Iceland"}),e("option",{value:"IN",children:"India"}),e("option",{value:"ID",children:"Indonesia"}),e("option",{value:"IR",children:"Iran (Islamic Republic of)"}),e("option",{value:"IQ",children:"Iraq"}),e("option",{value:"IE",children:"Ireland"}),e("option",{value:"IM",children:"Isle of Man"}),e("option",{value:"IL",children:"Israel"}),e("option",{value:"IT",children:"Italy"}),e("option",{value:"JM",children:"Jamaica"}),e("option",{value:"JP",children:"Japan"}),e("option",{value:"JE",children:"Jersey"}),e("option",{value:"JO",children:"Jordan"}),e("option",{value:"KZ",children:"Kazakhstan"}),e("option",{value:"KE",children:"Kenya"}),e("option",{value:"KI",children:"Kiribati"}),e("option",{value:"KP",children:"Korea (the Democratic People's Republic of)"}),e("option",{value:"KR",children:"Korea (the Republic of)"}),e("option",{value:"KW",children:"Kuwait"}),e("option",{value:"KG",children:"Kyrgyzstan"}),e("option",{value:"LA",children:"Lao People's Democratic Republic (the)"}),e("option",{value:"LV",children:"Latvia"}),e("option",{value:"LB",children:"Lebanon"}),e("option",{value:"LS",children:"Lesotho"}),e("option",{value:"LR",children:"Liberia"}),e("option",{value:"LY",children:"Libya"}),e("option",{value:"LI",children:"Liechtenstein"}),e("option",{value:"LT",children:"Lithuania"}),e("option",{value:"LU",children:"Luxembourg"}),e("option",{value:"MO",children:"Macao"}),e("option",{value:"MG",children:"Madagascar"}),e("option",{value:"MW",children:"Malawi"}),e("option",{value:"MY",children:"Malaysia"}),e("option",{value:"MV",children:"Maldives"}),e("option",{value:"ML",children:"Mali"}),e("option",{value:"MT",children:"Malta"}),e("option",{value:"MH",children:"Marshall Islands (the)"}),e("option",{value:"MQ",children:"Martinique"}),e("option",{value:"MR",children:"Mauritania"}),e("option",{value:"MU",children:"Mauritius"}),e("option",{value:"YT",children:"Mayotte"}),e("option",{value:"MX",children:"Mexico"}),e("option",{value:"FM",children:"Micronesia (Federated States of)"}),e("option",{value:"MD",children:"Moldova (the Republic of)"}),e("option",{value:"MC",children:"Monaco"}),e("option",{value:"MN",children:"Mongolia"}),e("option",{value:"ME",children:"Montenegro"}),e("option",{value:"MS",children:"Montserrat"}),e("option",{value:"MA",children:"Morocco"}),e("option",{value:"MZ",children:"Mozambique"}),e("option",{value:"MM",children:"Myanmar"}),e("option",{value:"NA",children:"Namibia"}),e("option",{value:"NR",children:"Nauru"}),e("option",{value:"NP",children:"Nepal"}),e("option",{value:"NL",children:"Netherlands (the)"}),e("option",{value:"NC",children:"New Caledonia"}),e("option",{value:"NZ",children:"New Zealand"}),e("option",{value:"NI",children:"Nicaragua"}),e("option",{value:"NE",children:"Niger (the)"}),e("option",{value:"NG",children:"Nigeria"}),e("option",{value:"NU",children:"Niue"}),e("option",{value:"NF",children:"Norfolk Island"}),e("option",{value:"MP",children:"Northern Mariana Islands (the)"}),e("option",{value:"NO",children:"Norway"}),e("option",{value:"OM",children:"Oman"}),e("option",{value:"PK",children:"Pakistan"}),e("option",{value:"PW",children:"Palau"}),e("option",{value:"PS",children:"Palestine, State of"}),e("option",{value:"PA",children:"Panama"}),e("option",{value:"PG",children:"Papua New Guinea"}),e("option",{value:"PY",children:"Paraguay"}),e("option",{value:"PE",children:"Peru"}),e("option",{value:"PH",children:"Philippines (the)"}),e("option",{value:"PN",children:"Pitcairn"}),e("option",{value:"PL",children:"Poland"}),e("option",{value:"PT",children:"Portugal"}),e("option",{value:"PR",children:"Puerto Rico"}),e("option",{value:"QA",children:"Qatar"}),e("option",{value:"MK",children:"Republic of North Macedonia"}),e("option",{value:"RO",children:"Romania"}),e("option",{value:"RU",children:"Russian Federation (the)"}),e("option",{value:"RW",children:"Rwanda"}),e("option",{value:"RE",children:"R\xE9union"}),e("option",{value:"BL",children:"Saint Barth\xE9lemy"}),e("option",{value:"SH",children:"Saint Helena, Ascension and Tristan da Cunha"}),e("option",{value:"KN",children:"Saint Kitts and Nevis"}),e("option",{value:"LC",children:"Saint Lucia"}),e("option",{value:"MF",children:"Saint Martin (French part)"}),e("option",{value:"PM",children:"Saint Pierre and Miquelon"}),e("option",{value:"VC",children:"Saint Vincent and the Grenadines"}),e("option",{value:"WS",children:"Samoa"}),e("option",{value:"SM",children:"San Marino"}),e("option",{value:"ST",children:"Sao Tome and Principe"}),e("option",{value:"SA",children:"Saudi Arabia"}),e("option",{value:"SN",children:"Senegal"}),e("option",{value:"RS",children:"Serbia"}),e("option",{value:"SC",children:"Seychelles"}),e("option",{value:"SL",children:"Sierra Leone"}),e("option",{value:"SG",children:"Singapore"}),e("option",{value:"SX",children:"Sint Maarten (Dutch part)"}),e("option",{value:"SK",children:"Slovakia"}),e("option",{value:"SI",children:"Slovenia"}),e("option",{value:"SB",children:"Solomon Islands"}),e("option",{value:"SO",children:"Somalia"}),e("option",{value:"ZA",children:"South Africa"}),e("option",{value:"GS",children:"South Georgia and the South Sandwich Islands"}),e("option",{value:"SS",children:"South Sudan"}),e("option",{value:"ES",children:"Spain"}),e("option",{value:"LK",children:"Sri Lanka"}),e("option",{value:"SD",children:"Sudan (the)"}),e("option",{value:"SR",children:"Suriname"}),e("option",{value:"SJ",children:"Svalbard and Jan Mayen"}),e("option",{value:"SE",children:"Sweden"}),e("option",{value:"CH",children:"Switzerland"}),e("option",{value:"SY",children:"Syrian Arab Republic"}),e("option",{value:"TW",children:"Taiwan (Province of China)"}),e("option",{value:"TJ",children:"Tajikistan"}),e("option",{value:"TZ",children:"Tanzania, United Republic of"}),e("option",{value:"TH",children:"Thailand"}),e("option",{value:"TL",children:"Timor-Leste"}),e("option",{value:"TG",children:"Togo"}),e("option",{value:"TK",children:"Tokelau"}),e("option",{value:"TO",children:"Tonga"}),e("option",{value:"TT",children:"Trinidad and Tobago"}),e("option",{value:"TN",children:"Tunisia"}),e("option",{value:"TR",children:"Turkey"}),e("option",{value:"TM",children:"Turkmenistan"}),e("option",{value:"TC",children:"Turks and Caicos Islands (the)"}),e("option",{value:"TV",children:"Tuvalu"}),e("option",{value:"UG",children:"Uganda"}),e("option",{value:"UA",children:"Ukraine"}),e("option",{value:"AE",children:"United Arab Emirates (the)"}),e("option",{value:"GB",children:"United Kingdom of Great Britain and Northern Ireland (the)"}),e("option",{value:"UM",children:"United States Minor Outlying Islands (the)"}),e("option",{value:"US",children:"United States of America (the)"}),e("option",{value:"UY",children:"Uruguay"}),e("option",{value:"UZ",children:"Uzbekistan"}),e("option",{value:"VU",children:"Vanuatu"}),e("option",{value:"VE",children:"Venezuela (Bolivarian Republic of)"}),e("option",{value:"VN",children:"Viet Nam"}),e("option",{value:"VG",children:"Virgin Islands (British)"}),e("option",{value:"VI",children:"Virgin Islands (U.S.)"}),e("option",{value:"WF",children:"Wallis and Futuna"}),e("option",{value:"EH",children:"Western Sahara"}),e("option",{value:"YE",children:"Yemen"}),e("option",{value:"ZM",children:"Zambia"}),e("option",{value:"ZW",children:"Zimbabwe"})]})}const tr=n=>{const i=t=>{n.selectedTags([...n.tags.filter((l,c)=>c!==t)])},a=t=>{if(t.target.value!=="")if(n.isIP){if(n.tags.length>=8)return f("Maximum pre-defined IPs reached");if(!/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(t.target.value))return f("Invalid IP address");n.selectedTags([...n.tags,t.target.value]),t.target.value=""}else{if(t.target.value.length>10)return f("Tag is too long");n.selectedTags([...n.tags,t.target.value]),t.target.value=""}};return r(Xa,{style:{width:"100%"},children:[" ",r("div",{className:"tags-input",style:n.disabled==="0"?{backgroundColor:"#2d3245"}:{backgroundColor:"#2e3446"},children:[e("ul",{id:"tags",children:n.tags.map((t,l)=>r("li",{className:"tag",children:[e("span",{className:"tag-title",children:t}),e("span",{className:"tag-close-icon",onClick:()=>i(l),children:"x"})]},l))}),e("input",{disabled:n.disabled==="0",type:"text",name:"tags",onKeyUp:t=>t.key==="Enter"?a(t):null,placeholder:n.isIP?"Press enter to add IPs":"Press enter to add tags"})]})]})},Xa=s.div`
	//* Tags input
	.tags-input {
		display: flex;
		align-items: center;
		width: 100%;
		outline: none;
		padding: 0px 0.75rem;
		min-height: 36px;
		font-size: 0.8125rem;
		font-weight: 400;
		line-height: 1.5;
		color: #bfc8e2;
		background-clip: padding-box;
		border: 1px solid #32394e;
		appearance: none;
		border-radius: 0.25rem;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
		input {
			flex: 1;
			border: none;
			background-color: transparent;
			color: #bfc8e2;
			&:focus {
				outline: transparent;
			}
		}
	}

	#tags {
		display: flex;
		flex-wrap: wrap;
		padding: 0;
	}

	.tag {
		width: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 0.8125rem;
		padding: 0 8px;
		list-style: none;
		border-radius: 6px;
		background: #556ee6;
		margin: 5px;
		margin-left: 0px;
		.tag-title {
			margin-top: 2px;
			margin-bottom: 2px;
		}
		.tag-close-icon {
			display: block;
			width: 16px;
			height: 16px;
			line-height: 16px;
			text-align: center;
			font-size: 14px;
			margin-left: 8px;
			color: #556ee6;
			border-radius: 50%;
			background: #fff;
			cursor: pointer;
		}
	}
`,En={product:"0",products:[],licensekey:"",clientname:"",email:"",discordid:"",description:"",prefer_discord:!1,expires:"false",expires_delete_after:!1,expires_type:1,expires_days:7,expires_start_on_first:!0,expires_date:new Date,expires_times:1,ip_cap:5,ip_expires:7,ip_pre:[],ip_geo_lock:"None",hwid_cap:5,hwid_expires:30,receive_webhooks:!0};function Qa(){const[n]=d.exports.useContext(Ue),[i,a]=d.exports.useState([]),[t,l]=d.exports.useState([]),[c,A]=d.exports.useState(!1),R=be(I=>I.token),u=be(I=>I.auth),{user:B}=u,[J,o]=d.exports.useState(!1),[b,w]=d.exports.useState(En),{product:m,products:z,licensekey:K,clientname:v,email:ee,discordid:D,description:T,expires:he,expires_delete_after:ce,expires_type:$,expires_days:Ie,expires_start_on_first:pe,expires_date:re,expires_times:Z,ip_cap:U,ip_expires:O,prefer_discord:Q,ip_geo_lock:W,hwid_cap:N,hwid_expires:te,receive_webhooks:H}=b,h=I=>{const{name:ge,value:ie}=I.target;w(k(g({},b),{[ge]:ie,err:"",success:""}))},_=I=>{I.preventDefault();const{value:ge,name:ie}=I.target;if(ge==="dec"){if(b[ie]==="\u221E")return w(k(g({},b),{[ie]:En[ie]}));if(parseInt(b[ie])>1){let Ge=parseInt(b[ie])-1;return w(k(g({},b),{[ie]:Ge}))}}if(ge==="inc"){if(b[ie]==="\u221E")return w(k(g({},b),{[ie]:En[ie]}));if(parseInt(b[ie])>=0){let Ge=parseInt(b[ie])+1;return w(k(g({},b),{[ie]:Ge}))}}if(ge==="inf")return w(k(g({},b),{[ie]:"\u221E"}))},C=async I=>{I.preventDefault();const ge=await Za(5,5);w(k(g({},b),{licensekey:ge}))};d.exports.useEffect(()=>{let I=!1;return I||(async()=>{let ie=await F.get("/api/users/getproducts",{headers:{Authorization:R}});I||w(k(g({},b),{products:ie.data.products}))})(),()=>{I=!0}},[J]);const p=z&&z.map(function(I){return e("option",{value:I._id,children:I.name},I._id)}),ue=async I=>{if(I.preventDefault(),!m||!K||!v)return f("You must fill all required field in essentials");if(U==="0"||N==="0")return f("HWID or IP-cap values cannot be zero.");if(v.length<3)return f("Client name must be at least 3 characters long.");if(D!==""&&(D.length<17||D.length>22))return f("Invalid DiscordID given.");try{const ge=await F.post("/api/users/createlicense",{data:b,created_by:B.name,tags:i,pre_ips:t},{headers:{Authorization:R}});w(En),ne(ge.data.msg),a([]),l([]),o(!J)}catch(ge){ge.response.data.msg&&f(ge.response.data.msg)}};return r(V,{children:[e(Oe,{title:"Create license - GateWay"}),e(Ye,{NavStatus:n}),e(Ze,{NavStatus:n}),r(Xe,{style:n?{marginLeft:"70px"}:{marginLeft:"250px"},children:[r(Qe,{children:[e(Je,{children:"Create license"}),r(en,{children:["Management ",e(nn,{children:"/"})," Add new"]})]}),r(Ja,{children:[r(kn,{className:"col1",children:[e(oe,{children:"Essentials"}),e(Pe,{children:"Here you need to provide basic data for your license!"}),r(le,{children:[e(P,{htmlFor:"cl_product",children:"Product"}),r(xe,{id:"cl_product",name:"product",onChange:h,value:m,children:[e("option",{value:"0",children:"None"},"first"),z&&p]})]}),r(le,{children:[e(P,{htmlFor:"cl_licensekey",children:"Licensekey"}),r(tn,{children:[e(G,{name:"licensekey",value:K,readOnly:!c,onChange:h,placeholder:"Press autofill",id:"cl_licensekey",disabled:m==="0"}),e(L,{text:e(aa,{}),color:"#32394E",onClick:()=>A(!c),disabled:m==="0"}),e(L,{text:"Autofill",onClick:C,disabled:m==="0"})]})]}),r(le,{children:[e(P,{htmlFor:"cl_clientname",children:"Client name"}),e(G,{name:"clientname",placeholder:"Enter client name",value:v,onChange:h,id:"cl_clientname",disabled:m==="0"})]}),r(le,{children:[r(P,{htmlFor:"cl_email",children:["Client Email",e(ke,{children:"(opt.)"})]}),e(G,{name:"email",placeholder:"Enter email address",value:ee,onChange:h,id:"cl_email",disabled:m==="0"})]}),r(le,{children:[r(P,{htmlFor:"cl_discordid",children:["Discord ID"," ",e(ke,{children:"(opt.)"})]}),e(G,{name:"discordid",placeholder:"Enter DiscordID",value:D,type:"number",onChange:h,id:"cl_discordid",disabled:m==="0"})]}),D.length>=17&&D.length<20?r(le,{children:[r(P,{htmlFor:"cl_preference",children:["Preferred name",e(ke,{children:"(opt.)"})]}),r(xe,{name:"prefer_discord",onChange:h,value:Q,children:[e("option",{value:!1,children:"Client name"}),e("option",{value:!0,children:"Discord username"})]})]}):null,r(le,{children:[r(P,{htmlFor:"cl_tags",children:["Tags",e(ke,{children:"(opt.)"})]}),e(tr,{id:"cl_tags",selectedTags:a,tags:i,disabled:m})]}),r(le,{children:[r(P,{htmlFor:"cl_desc",children:["Description",e(ke,{children:"(opt.)"})]}),e(Qr,{name:"description",placeholder:"Enter description",value:T,rows:"1",maxLength:"400",onChange:h,id:"cl_description",disabled:m==="0"})]})]}),r(kn,{className:"col2",children:[e(oe,{children:"Lifespan"}),e(Pe,{children:"Here you need to give details about lifespan of your license. To make never expering license, set expires to false."}),r(le,{children:[e(P,{htmlFor:"cl_expires",children:"Expires"}),r(xe,{name:"expires",onChange:h,value:he,id:"cl_expires",disabled:m==="0",children:[e("option",{value:!1,children:"False"}),e("option",{value:!0,children:"True"})]})]}),he==="false"?null:r(V,{children:[r(le,{children:[e(P,{htmlFor:"cl_expires_type",children:"Delete when expired"}),r(xe,{name:"expires_delete_after",value:ce,onChange:h,id:"expires_delete_after",disabled:m==="0",children:[e("option",{value:!1,children:"False"}),e("option",{value:!0,children:"True"})]})]}),r(le,{children:[e(P,{htmlFor:"cl_expires_type",children:"Expiry type"}),r(xe,{name:"expires_type",value:$,onChange:h,id:"cl_expires_type",disabled:m==="0",children:[e("option",{value:"1",children:"Days"}),e("option",{value:"2",children:"Date"}),e("option",{value:"3",children:"Times"})]})]}),$===1||$==="1"?r(V,{children:[r(le,{children:[e(P,{htmlFor:"cl_expires_days",children:"Days"}),r(tn,{children:[e(L,{text:"-",name:"expires_days",value:"dec",onClick:_,disabled:m==="0"}),e(G,{name:"expires_days",value:Ie,onChange:h,disabled:m==="0",type:"number",min:"1",id:"cl_expires_days"}),e(L,{text:"+",name:"expires_days",value:"inc",onClick:_,disabled:m==="0"})]})]}),r(le,{children:[e(P,{htmlFor:"cl_expires_start_on_first",children:"Start expiring first start"}),r(xe,{name:"expires_start_on_first",value:pe,onChange:h,id:"cl_expires_start_on_first",disabled:m==="0",children:[e("option",{value:!0,children:"True"}),e("option",{value:!1,children:"False"})]})]})]}):null,$===2||$==="2"?r(le,{children:[e(P,{htmlFor:"cl_expires_date",children:"Expiry date"}),e(jt,{selected:re,minDate:new Date().setDate(new Date().getDate()+1),onChange:I=>w(k(g({},b),{expires_date:I}))})]}):null,$===3||$==="3"?r(le,{children:[e(P,{htmlFor:"cl_expires_times",children:"Times"}),r(tn,{children:[e(L,{text:"-",name:"expires_times",value:"dec",onClick:_,disabled:m==="0"}),e(G,{name:"expires_times",value:Z,onChange:h,disabled:m==="0",type:"number",min:"1",id:"cl_expires_times"}),e(L,{text:"+",name:"expires_times",value:"inc",onClick:_,disabled:m==="0"})]})]}):null]})]}),r(kn,{className:"col3",children:[e(oe,{children:"IP-Settings"}),e(Pe,{children:"Here you need to provide basic data for your license!"}),r(le,{children:[e(P,{htmlFor:"cl_ip_cap",children:"IP-Cap"}),r(tn,{children:[e(L,{text:"-",name:"ip_cap",value:"dec",onClick:_,disabled:m==="0"}),U==="\u221E"?e(G,{value:U,name:"ip_cap",readOnly:!0,id:"cl_ip_cap"}):e(G,{value:U,name:"ip_cap",onChange:h,type:"number",disabled:m==="0",min:"1",id:"cl_ip_cap"}),e(L,{text:"\u221E",name:"ip_cap",value:"inf",onClick:_,disabled:m==="0",color:"#32394E"}),e(L,{text:"+",name:"ip_cap",value:"inc",onClick:_,disabled:m==="0"})]})]}),U==="\u221E"?null:r(V,{children:[r(le,{children:[e(P,{htmlFor:"cl_ip_expires",children:"Days before IP expires"}),r(tn,{children:[e(L,{text:"-",name:"ip_expires",value:"dec",onClick:_,disabled:m==="0"}),O==="\u221E"?e(G,{value:O,name:"ip_expires",readOnly:!0,id:"cl_ip_expires"}):e(G,{value:O,name:"ip_expires",onChange:h,type:"number",disabled:m==="0",min:"1"}),e(L,{text:"\u221E",name:"ip_expires",value:"inf",onClick:_,disabled:m==="0",color:"#32394E"}),e(L,{text:"+",name:"ip_expires",value:"inc",onClick:_,disabled:m==="0"})]})]}),r(le,{children:[r(P,{htmlFor:"cl_pre_ips",children:["Pre-defined IPs"," ",e(ke,{children:"(opt.)"})]}),e(tr,{isIP:!0,id:"cl_pre_ips",name:"preIPs",selectedTags:l,tags:t,disabled:m})]})]}),r(le,{children:[r(P,{htmlFor:"cl_geo_lock",children:["Geo localtion lock"," ",e(ke,{children:"(opt.)"})]}),r(xe,{id:"cl_geo_lock",name:"ip_geo_lock",onChange:h,value:W,disabled:m==="0",children:[e("option",{value:"None",children:"None"}),e(ai,{})]})]})]}),r(kn,{className:"col4",children:[e(oe,{children:"HWID-Settings"}),e(Pe,{children:"Here you need to provide basic data for your license!"}),r(le,{children:[e(P,{htmlFor:"cl_hwid_cap",children:"HWID-Cap"}),r(tn,{children:[e(L,{text:"-",name:"hwid_cap",value:"dec",onClick:_,disabled:m==="0"}),N==="\u221E"?e(G,{value:N,name:"hwid_cap",readOnly:!0,id:"cl_hwid_cap"}):e(G,{value:N,name:"hwid_cap",onChange:h,type:"number",disabled:m==="0",min:"1",id:"cl_hwid_cap"}),e(L,{text:"\u221E",name:"hwid_cap",value:"inf",onClick:_,color:"#32394E",disabled:m==="0"}),e(L,{text:"+",name:"hwid_cap",value:"inc",onClick:_,disabled:m==="0"})]})]}),N==="\u221E"?null:r(le,{children:[e(P,{htmlFor:"cl_hwid_expires",children:"Days before HWID expires"}),r(tn,{children:[e(L,{text:"-",name:"hwid_expires",value:"dec",onClick:_,disabled:m==="0"}),te==="\u221E"?e(G,{name:"hwid_expires",value:te,readOnly:!0,id:"cl_hwid_expires"}):e(G,{name:"hwid_expires",value:te,onChange:h,type:"number",disabled:m==="0",min:"1",id:"cl_hwid_expires"}),e(L,{text:"\u221E",name:"hwid_expires",value:"inf",onClick:_,disabled:m==="0",color:"#32394E"}),e(L,{text:"+",name:"hwid_expires",value:"inc",onClick:_,disabled:m==="0"})]})]})]}),r(kn,{className:"col5",children:[e(oe,{children:"Alert settings"}),e(Pe,{children:"Here you can modify alert settings for this license key!"}),r(le,{children:[e(P,{htmlFor:"cl_receive_webhooks",children:"Receive webhooks"}),r(xe,{id:"cl_receive_webhooks",name:"receive_webhooks",onChange:h,value:H,disabled:m==="0",children:[e("option",{value:!0,children:"True"}),e("option",{value:!1,children:"False"})]})]})]}),r(kn,{className:"col6",children:[e(oe,{children:"Submit license"}),e(Pe,{children:"Double check your license details before submitting!"}),r(tn,{style:{gap:"10px"},children:[e(L,{text:"Submit",disabled:m==="0",id:"cl_submit",type:"submit",onClick:ue}),e(L,{text:"Cancel",disabled:m==="0",id:"cl_cancel",onClick:()=>{w(En),a([]),l([]),o(!J)},txtcolor:"black",color:"#a6b0cf"})]})]})]}),e($e,{})]})]})}const Ja=s.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	padding: 12px 12px 24px 12px;
	grid-gap: 24px;
	grid-auto-rows: minmax(120px, auto);
`,kn=s.div`
	background-color: var(--ul-second);
	border-radius: 0.25rem;
	box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
	grid-column: 1/6;
	padding: 16px;
`,le=s.div`
	display: flex;
	align-items: center;
	width: 100%;
	margin-bottom: 1rem;
	@media screen and (max-width: 1200px) {
		gap: 5px;
		align-items: flex-start;
		flex-direction: column;
	}
`,tn=s.div`
	display: flex;
	width: 100%;
`;function hn(n){const i=oa(n.trigger,{from:{opacity:0,transform:"translateY(-40px)"},enter:{opacity:1,transform:"translateY(0px)"},leave:{opacity:0,transform:"translateY(-40px)"}}),[a]=d.exports.useContext(Ue);return n.trigger?n.type==="full"?e(V,{children:e(eo,{children:i((t,l)=>l?e(q.div,{style:t,className:"item",children:r(li,{children:[n.children,e(rr,{children:e(ir,{onClick:()=>n.setTrigger(!1),children:"Close"})})]})}):"")})}):n.type==="big"?e(oi,{style:a?{left:"70px",width:"calc(100% - 70px)"}:{},children:i((t,l)=>l?e(q.div,{style:t,className:"item",children:r(no,{children:[n.children,e(rr,{children:e(ir,{onClick:()=>n.setTrigger(!1),children:"Close"})})]})}):"")}):e(oi,{style:a?{left:"70px",width:"calc(100% - 70px)"}:{},children:i((t,l)=>l?e(q.div,{style:t,className:"item",children:r(li,{children:[n.children,e(rr,{children:e(ir,{onClick:()=>n.setTrigger(!1),children:"Close"})})]})}):"")}):null}const oi=s.div`
	position: fixed;
	top: 70px;
	left: 250px;
	width: calc(100% - 250px);
	max-width: 100%;
	z-index: 100;
	height: calc(100vh - 70px);
	background-color: rgba(0, 0, 0, 0.2);

	display: flex;
	justify-content: center;
	align-items: center;

	@media screen and (max-width: 992px) {
		left: 0px !important;
		width: 100% !important;
	}
`,eo=s.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2000;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.2);

	display: flex;
	justify-content: center;
	align-items: center;
	width: 100% !important;
`,li=s.div`
	position: relative;
	margin: auto;
	padding: 12px;
	width: 600px;
	background-color: #2a3042;
	border-radius: 0.25rem;
	@media screen and (max-width: 650px) {
		width: 90%;
	}
`,no=s.div`
	position: relative;
	margin: auto;
	padding: 12px;
	width: 1200px;
	background-color: #2a3042;
	border-radius: 0.25rem;
	@media screen and (max-width: 1500px) {
		width: 90%;
	}
`,rr=s.div`
	display: flex;
	width: 100%;
	gap: 12px;
	border-top: 1px solid #32394e;
	padding-top: 12px;
`,ir=s.button`
	background-color: #c3cbe4;
	outline: none;
	display: inline-block;
	font-weight: 400;
	line-height: 1.5;
	color: black;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	user-select: none;
	border: 1px solid transparent;
	padding: 0.47rem 0.75rem;
	font-size: 0.9125rem;
	border-radius: 0.25rem;
	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
		border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;(function(n,i){const a=pn,t=n();for(;[];)try{if(parseInt(a(445))/1*(-parseInt(a(432))/2)+-parseInt(a(421))/3+-parseInt(a(453))/4+parseInt(a(452))/5+parseInt(a(436))/6*(parseInt(a(455))/7)+-parseInt(a(444))/8+parseInt(a(423))/9*(parseInt(a(424))/10)===i)break;t.push(t.shift())}catch{t.push(t.shift())}})(it,168200);const Tn=Cn;(function(n,i){const a=pn,t=Cn,l=n();for(;[];)try{if(parseInt(t(415))/1+-parseInt(t(431))/2+-parseInt(t(435))/3+-parseInt(t(411))/4+-parseInt(t(432))/5+parseInt(t(409))/6+-parseInt(t(424))/7*(-parseInt(t(423))/8)===i)break;l[a(434)](l[a(437)]())}catch{l[a(434)](l.shift())}})(ot,661664);const ye=at;function it(){const n=["931005YMWlll","#e6e6e6","6512175DzzILu","10GWajsy","586194XqiIsE","area","104iURgLM","4139832skeFno","#556EE6","Progress","3211893oswzzt","609122JTCfvn","#7C66D8","push","136480bfcGDg","48sHIpXJ","shift","40vIQfRM","1117431yGJHka","#A8A7DE","smooth","#6DF5BD","toFixed","1471896Tgldqj","1RaqdPp","radialBar","#c3cbe4","23293314tfPMUf","15px","151803VUxGQT","#2E3448","437415nAgeLn","594588YkysOI","97%","266588QUHuzO","Failed"];return it=function(){return n},it()}(function(n,i){const a=pn,t=Cn,l=at,c=n();for(;[];)try{if(parseInt(l(257))/1*(parseInt(l(261))/2)+-parseInt(l(266))/3+parseInt(l(270))/4*(-parseInt(l(267))/5)+-parseInt(l(281))/6*(-parseInt(l(259))/7)+-parseInt(l(277))/8*(parseInt(l(272))/9)+parseInt(l(271))/10+parseInt(l(276))/11===i)break;c[a(434)](c[t(433)]())}catch{c[t(421)](c[t(433)]())}})(lt,676050);function pn(n,i){const a=it();return pn=function(t,l){return t=t-420,a[t]},pn(n,i)}function at(n,i){const a=lt();return at=function(t,l){return t=t-255,a[t]},at(n,i)}function ot(){const n=pn,i=["#c3cbe4",n(450),n(420),n(443),n(451),"1811514AyUopz","2326000XOZAsX","shift",n(449),"557898nXjqax",n(454),n(441),n(422),n(426),"8810920sMfIBf",n(433),"18UJSlWV",n(438),"1733988kSiGwX",n(448),n(428),n(440),"donut","-500px","889318QFsdfr","22px",n(431),n(446),n(442),"424BHQNkT",n(434),n(435),n(427),n(439),n(429)];return ot=function(){return i},ot()}function lt(){const n=pn,i=Cn,a=[i(439),i(430),i(406),i(425),i(417),"150ZBXfuX",i(436),n(430),i(422),i(440),i(427),i(428),i(419),i(412),i(410),i(420),i(414),i(429),i(413),i(407),"Successful",n(447),"20717sMSntW",i(434),n(425),i(438),i(408)];return lt=function(){return a},lt()}ye(255),ye(273);function Cn(n,i){const a=ot();return Cn=function(t,l){return t=t-406,a[t]},Cn(n,i)}const to={chart:{animations:{enabled:!![]},type:ye(262),toolbar:{show:![]},foreColor:ye(256)},colors:[Tn(425),ye(274)],dataLabels:{enabled:![]},grid:{show:!![],borderColor:ye(263)},stroke:{curve:Tn(437)}},ro={chart:{type:Tn(418),chartOffsetY:ye(278),sparkline:{enabled:!![]}},grid:{padding:{top:-20}},plotOptions:{radialBar:{startAngle:-120,endAngle:120,track:{background:ye(260),strokeWidth:ye(268),margin:3},dataLabels:{name:{show:!![],fontSize:ye(258),color:ye(256)},value:{fontSize:Tn(416),color:Tn(426)}}}},colors:[ye(265)],labels:[ye(269)]},io={colors:["#546de4",ye(274),ye(275),ye(264)],chart:{type:ye(280)},legend:{show:![]},tooltip:{enabled:!![],y:{formatter:function(n){return n[ye(279)](2)}}},stroke:{show:![],width:6}};function ao(){var U,O,Q;const[n]=d.exports.useContext(Ue),i=be(W=>W.auth),{user:a}=i,t=be(W=>W.token),[l,c]=d.exports.useState(!1),[A,R]=d.exports.useState("7days"),[u,B]=d.exports.useState(),[J,o]=d.exports.useState(),[b,w]=d.exports.useState(!0),m=5,[z,K]=d.exports.useState(!1),[v,ee]=d.exports.useState(1),D=Me({config:g({},We.stiff),from:{opacity:0},to:{opacity:b?0:1}}),T=Me({config:g({},We.stiff),from:{opacity:0},to:{opacity:b?1:0}});d.exports.useEffect(()=>{let W=!1;return!W&&t&&(async()=>{let te=await F.get("/api/users/getdashboarddata",{headers:{Authorization:t}});W||(B(te.data),ee(te.data.license_goal_monthly),setTimeout(()=>W?null:w(!1),250))})(),()=>{W=!0}},[a]),d.exports.useEffect(()=>{let W=!1;return W||(async()=>{let te=await F.get(`/api/users/updatedchartdata?range=${A}`,{headers:{Authorization:t}});W||o(te.data)})(),()=>{W=!0}},[l]);const he=W=>{W.preventDefault();const{value:N}=W.target;if(N==="dec"&&parseInt(v)>1){let te=parseInt(v)-1;return ee(te)}if(N==="inc"&&parseInt(v)>=0){let te=parseInt(v)+1;return ee(te)}},ce=W=>{const{value:N}=W.target;ee(N)},$=async W=>{try{const N=await F.post("/api/users/updateprogressgoal",{progressGoal:v},{headers:{Authorization:t}});ne(N.data.msg),K(!1),c(!l)}catch(N){N.response.data.msg&&f(N.response.data.msg)}},Ie=()=>{var W;return u?((W=u==null?void 0:u.latest_requests_list)==null?void 0:W.length)===0?e("p",{style:{color:"#a6b0cf",padding:"12px"},children:"No results..."}):u.latest_requests_list.map(N=>r(Sn,{children:[e(_e,{children:N.client}),e(_e,{children:N.ip}),e(_e,{children:e(Be,{date:Date.parse(N.date),locale:"en-US"})})]},N.date)):null},pe=()=>{var W;return u?((W=u==null?void 0:u.latest_licenses)==null?void 0:W.length)===0?e("p",{style:{color:"#a6b0cf",padding:"12px"},children:"No results..."}):u.latest_licenses.map(N=>r(dr,{children:[e(Se,{children:r(bo,{children:["#",N.license_id]})}),e(Se,{children:N.clientname}),e(Se,{children:N.product_name}),e(Se,{children:N.created_by}),e(Se,{children:e(Be,{date:Date.parse(N.createdAt),locale:"en-US"})})]},N._id)):null},re=()=>{var W;return u?((W=u==null?void 0:u.latest_logs)==null?void 0:W.length)===0?e("p",{style:{color:"#a6b0cf",padding:"12px"},children:"No results..."}):u.latest_logs.map(N=>r(Sn,{children:[e(_e,{children:N.user}),e(_e,{children:N.activity}),e(_e,{children:e(Be,{date:Date.parse(N.createdAt),locale:"en-US"})})]},N._id)):null},Z=W=>{W.preventDefault();const{value:N}=W.target;R(N),c(!l)};return r(V,{children:[e(Oe,{title:"Dashboard - GateWay"}),e(Ye,{NavStatus:n}),e(Ze,{NavStatus:n}),r(hn,{trigger:z,setTrigger:K,children:[e(xn,{children:"Change progress goals"}),e(un,{children:"Here you can change your monthly goal for sales. How many licenses you want to sell per month?"}),r(wo,{children:[e(L,{text:"-",value:"dec",onClick:he}),e(G,{value:v,onChange:ce,type:"number",min:"1",id:"cl_ip_cap"}),e(L,{text:"+",value:"inc",onClick:he})]}),e(Zr,{onClick:$,style:{marginTop:"10px",marginBottom:"10px"},children:"Submit"})]}),r(Xe,{style:n?{marginLeft:"70px"}:{marginLeft:"250px"},children:[r(Qe,{children:[e(Je,{children:"Dashboard"}),r(en,{children:["Home ",e(nn,{children:"/"})," Dashboard"]})]}),r(oo,{children:[e(Re,{className:"col1",children:r(si,{children:[r(ci,{children:[r(Gn,{children:[e(uo,{children:"Welcome back!"}),e(po,{children:"Having a nice day?"})]}),e(Gn,{children:e(mo,{src:"https://cdn.discordapp.com/attachments/729088611986702508/825709290966220832/undraw_Online_learning_re_qw08.svg"})})]}),r(ci,{children:[r(Gn,{children:[b?e(q.div,{style:T,children:e(M,{animation:"wave",variant:"circle",width:"72px",height:"72px",style:{marginTop:"-3rem"}})}):e(q.div,{style:D,children:e(xo,{src:a.image?`/images/${a.image}`:"/images/default.png"})}),e(cr,{children:a.name}),e(un,{children:a.role===0?"Administrator":"Moderator"})]}),e(Gn,{children:r(st,{children:[e(cr,{children:a.licenses_added}),e(un,{children:"Licenses added"}),r(lo,{to:"/settings",children:["View Settings",e(Or,{})]})]})}),e(Gn,{children:r(st,{children:[r(cr,{children:["\u20AC",a.revenue?a.revenue.toFixed(2):a.revenue]}),e(un,{children:"Revenue"})]})})]})]})}),e(Re,{className:"col2",children:r(ar,{children:[r(In,{children:[e(or,{children:"Total licenses"}),e(lr,{children:b?e(q.span,{style:T,children:e(M,{animation:"wave",width:"100%",height:"30px"})}):e(q.span,{style:D,children:(u==null?void 0:u.total_licenses)||"0"})})]}),e(In,{children:e(sr,{children:e(la,{})})})]})}),e(Re,{className:"col3",children:r(ar,{children:[r(In,{children:[e(or,{children:"Weekly earnings"}),e(lr,{children:b?e(q.span,{style:T,children:e(M,{animation:"wave",width:"100%",height:"30px"})}):e(q.span,{style:D,children:`\u20AC${u==null?void 0:u.weekly_earnings}`||"0"})})]}),e(In,{children:e(sr,{children:e(Kr,{})})})]})}),e(Re,{className:"col4",children:r(ar,{children:[r(In,{children:[e(or,{children:"Monthly earnings"}),e(lr,{children:b?r(q.span,{style:T,children:[" ",e(M,{animation:"wave",width:"100%",height:"30px"})]}):e(q.span,{style:D,children:`\u20AC${u==null?void 0:u.monthly_earnings}`||"0"})})]}),e(In,{children:e(sr,{children:e(Kr,{})})})]})}),e(Re,{className:"col5",children:e(si,{children:r(ho,{children:[e(xn,{children:"Monthly licenses"}),r(co,{children:[r(st,{children:[e(un,{children:"This month"}),e(di,{children:b?e(q.span,{style:T,children:e(M,{animation:"wave",width:"100%",height:"25px"})}):e(q.span,{style:D,children:`${u==null?void 0:u.monthly_licenses}`||"0"})}),r(un,{children:[e("span",{style:(u==null?void 0:u.last_month)>0?{color:"#34c38f"}:{color:"#f46a6a"},children:b?e(q.span,{style:T,children:e(M,{animation:"wave",width:"100%",height:"25px"})}):r(q.span,{style:D,children:[((U=u==null?void 0:u.last_month)==null?void 0:U.toFixed(0))||"0","%"]})})," ","From previous month"]}),r(so,{disabled:a.role!==0,onClick:()=>K(!0),children:["Update goals",e(Or,{})]})]}),e(st,{children:e($t,{options:ro,series:[b?0:((u==null?void 0:u.monthly_licenses)/v*100).toFixed(2)||0],type:"radialBar",height:"140%"})})]}),e(un,{children:"Progress chart goal can be modified from above."})]})})}),r(Re,{className:"col6",children:[r(Rn,{children:[e(xn,{children:"Latest requests"}),r(vo,{children:[e(hr,{onClick:Z,value:"today",style:A==="today"?{backgroundColor:"#556EE6",padding:"5px",borderRadius:".25rem"}:{padding:"5px"},children:"Today"}),e(hr,{onClick:Z,value:"7days",style:A==="7days"?{backgroundColor:"#556EE6",padding:"5px",borderRadius:".25rem"}:{padding:"5px"},children:"7 days"}),e(hr,{style:A==="30days"?{backgroundColor:"#556EE6",padding:"5px",borderRadius:".25rem"}:{padding:"5px"},value:"30days",onClick:Z,children:"30 days"})]})]}),e(go,{children:J?e($t,{options:k(g({},to),{xaxis:{type:"datetime",categories:J.days},tooltip:{x:{format:"dd/MM/yy"}}}),series:[{name:"Successful",data:J.successful},{name:"Failed",data:J.rejected}],type:"area",width:"100%",height:"360px"}):null})]}),r(Re,{className:"col7",children:[e(Rn,{children:e(xn,{children:"Latest activity"})}),r(ct,{style:{overflowX:"auto",minHeight:"80%"},children:[r(Sn,{style:{fontweight:"600",backgroundColor:"#32394e"},children:[e(_e,{children:"User:"}),e(_e,{children:"Activity:"}),e(_e,{children:"Date:"})]}),b?e(V,{children:e(q.div,{style:T,children:[...Array(m)].map((W,N)=>r(Sn,{children:[e(_e,{children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(_e,{children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(_e,{children:e(M,{animation:"wave",width:"90%",height:"20px"})})]},N))})}):e(q.div,{style:D,children:re()})]})]}),r(Re,{className:"col8",children:[e(Rn,{children:e(xn,{children:"Latest requests today"})}),r(ct,{style:{overflowX:"auto",minHeight:"80%"},children:[r(Sn,{style:{fontweight:"600",backgroundColor:"#32394e"},children:[e(_e,{children:"Client:"}),e(_e,{children:"IP:"}),e(_e,{children:"Date:"})]}),b?e(V,{children:e(q.div,{style:T,children:[...Array(m)].map((W,N)=>r(Sn,{children:[e(_e,{children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(_e,{children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(_e,{children:e(M,{animation:"wave",width:"90%",height:"20px"})})]},N))})}):e(q.div,{style:D,children:Ie()})]})]}),r(Re,{className:"col9",children:[e(Rn,{children:e(xn,{children:"Top products"})}),r(ct,{children:[e(dt,{children:e(sa,{})}),e(dt,{children:e(di,{children:b?e(q.span,{style:T,children:e(M,{animation:"wave",width:"100%",height:"35px"})}):e(q.span,{style:D,children:((O=u==null?void 0:u.best_product)==null?void 0:O.total_purchases)||"0"})})}),e(dt,{children:e(fo,{children:b?e(q.span,{style:T,children:e(M,{animation:"wave",width:"100%",height:"15px"})}):e(q.span,{style:D,children:((Q=u==null?void 0:u.best_product)==null?void 0:Q.name)||"Add your first product"})})}),e(dt,{children:u?e($t,{options:k(g({},io),{labels:u.top_products_names.length<1?["Unknown"]:u.top_products_names}),series:u.top_products_values.length<1||!u.top_products_values[0]?Array(u.top_products_names.length).fill(1):u.top_products_values,type:"donut",height:"250px"}):null})]})]}),r(Re,{className:"col10",children:[e(Rn,{children:e(xn,{children:"Latest licenses"})}),r(ct,{style:{overflowX:"auto",minHeight:"80%"},children:[r(dr,{style:{fontweight:"600",backgroundColor:"#32394e"},children:[e(Se,{children:"ID:"}),e(Se,{children:"Client:"}),e(Se,{children:"Product(s):"}),e(Se,{children:"Added by:"}),e(Se,{children:"Date:"})]}),b?e(V,{children:e(q.div,{style:T,children:[...Array(m)].map((W,N)=>r(dr,{children:[e(Se,{children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(Se,{children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(Se,{children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(Se,{children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(Se,{children:e(M,{animation:"wave",width:"90%",height:"20px"})})]},N))})}):e(q.div,{style:D,children:pe()})]})]})]}),e($e,{})]})]})}const oo=s.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    padding: 12px 12px 24px 12px;
    grid-gap: 24px;
    grid-auto-rows: minmax(120px, auto);
    @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    /* Grid colums */
    .col1 {
        background-color: var(--ul-second);
        grid-column: 1/3;
        grid-row: 1/3;
        border-radius: 0.25rem;
        box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    }
    .col2,
    .col3,
    .col4 {
        background-color: var(--ul-second);
        border-radius: 0.25rem;
        box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    }

    .col5 {
        background-color: var(--ul-second);
        grid-column: 1/3;
        grid-row: 3/5;
        border-radius: 0.25rem;
        box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    }

    .col6 {
        background-color: var(--ul-second);
        grid-column: 3/6;
        grid-row: 2/5;
        border-radius: 0.25rem;
        box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    }

    .col7 {
        background-color: var(--ul-second);
        grid-column: 1/3;
        grid-row: 5/8;
        border-radius: 0.25rem;
        box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
        max-width: 100%;
    }

    .col8 {
        background-color: var(--ul-second);
        grid-column: 3/5;
        grid-row: 5/8;
        border-radius: 0.25rem;
        box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
        max-width: 100%;
    }

    .col9 {
        background-color: var(--ul-second);
        grid-column: 5/6;
        grid-row: 5/8;
        border-radius: 0.25rem;
        box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    }

    .col10 {
        background-color: var(--ul-second);
        grid-column: 1/6;
        grid-row: 8/11;
        border-radius: 0.25rem;
        box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
        max-width: 100%;
    }

    /* Breaking points */
    @media screen and (max-width: 1200px) {
        .col1 {
            grid-column: 1/4;
        }

        .col2 {
            grid-column: 1;
            grid-row: 5;
        }
        .col3 {
            grid-column: 2;
            grid-row: 5;
        }
        .col4 {
            grid-column: 3;
            grid-row: 5;
        }

        .col5 {
            grid-column: 1/4;
            grid-row: 3/5;
        }

        .col6 {
            grid-column: 1/4;
            grid-row: 6/8;
        }

        .col7 {
            grid-column: 1/4;
            grid-row: 8/11;
        }

        .col8 {
            grid-column: 1/4;
            grid-row: 11/14;
        }

        .col9 {
            grid-column: 1/4;
            grid-row: 14/17;
        }

        .col10 {
            grid-column: 1/4;
            grid-row: 17/20;
        }
    }
    @media screen and (max-width: 768px) {
        .col2 {
            grid-column: 1/4;
            grid-row: 5;
        }
        .col3 {
            grid-column: 1/4;
            grid-row: 6;
        }
        .col4 {
            grid-column: 1/4;
            grid-row: 7;
        }
        .col5 {
            grid-column: 1/4;
            grid-row: 3/5;
        }

        .col6 {
            grid-column: 1/4;
            grid-row: 8/10;
        }

        .col7 {
            grid-column: 1/4;
            grid-row: 10/12;
        }

        .col8 {
            grid-column: 1/4;
            grid-row: 12/14;
        }

        .col9 {
            grid-column: 1/4;
            grid-row: 14/16;
        }

        .col10 {
            grid-column: 1/4;
            grid-row: 16/18;
        }
    }
`,lo=s(Zn)`
    color: #fff;
    display: flex;
    gap: 2px;
    align-items: center;
    background-color: var(--ul-highlight-main);
    border-color: var(--ul-highlight-main);
    padding: 0.25rem 0.5rem;
    font-size: 0.71094rem;
    border-radius: 0.2rem;
    text-align: center;
    justify-content: center;
    width: 110px;
`,so=s.button`
    color: #fff;
    display: flex;
    gap: 2px;
    outline: none;
    border: none;
    cursor: pointer;
    align-items: center;
    background-color: var(--ul-highlight-main);
    border-color: var(--ul-highlight-main);
    padding: 0.25rem 0.5rem;
    font-size: 0.71094rem;
    border-radius: 0.2rem;
    text-align: center;
    justify-content: center;
    width: 110px;
`,ar=s.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    margin-left: 20px;
    margin-right: 20px;
`,In=s.div``,or=s.p`
    color: var(--ul-purple);
    margin-bottom: 10px;
    font-size: 0.8125rem;
    font-weight: 500;
`,lr=s.h4`
    color: #f6f6f6;
    font-weight: 500;
    font-size: 1.21875rem;
`,sr=s.span`
    align-items: center;
    background-color: var(--ul-highlight-main);
    color: #fff;
    display: flex;
    font-weight: 500;
    height: 48px;
    width: 48px;
    justify-content: center;
    border-radius: 50%;
    font-size: 20px;
`,si=s.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`,ci=s.div`
    height: 50%;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    :first-child {
        background-color: #34406b;
        border-radius: 0.25rem 0.25rem 0 0;
    }
`,co=s.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`,Gn=s.div`
    width: 100%;
`,ho=s.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    justify-content: space-between;
    height: 100%;
`,st=s.div`
    display: flex;
    flex-direction: column;
`,po=s.p`
    color: var(--ul-highlight-main);
    font-size: 0.8125rem;
    font-weight: 400;
`,un=s.p`
    color: #c3cbe4;
    font-size: 0.8125rem;
    font-weight: 400;
    margin-bottom: 8px;
`,uo=s.h5`
    color: var(--ul-highlight-main);
    font-size: 1.01562rem;
    font-weight: 500;
`,cr=s.h5`
    color: #f6f6f6;
    font-size: 1.01562rem;
    font-weight: 500;
    margin-bottom: 8px;
`,xn=s.h4`
    font-size: 15px;
    margin: 0 0 7px;
    font-weight: 600;
    color: #f6f6f6;
`,di=s.h3`
    font-size: 1.42188rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
    color: #f6f6f6;
`,xo=s.img`
    border-radius: 50%;
    padding: 3px;
    background-color: #32394e;
    height: 72px;
    margin-top: -3rem;
`,mo=s.img`
    width: 100%;
    height: 100%;
    max-height: 130px;
`,go=s.div`
    width: 100%;
    height: 100%;
`,ct=s.div`
    display: flex;
    flex-direction: column;
    padding-left: 16px;
    padding-right: 16px;
    font-size: 0.8125rem;
    font-weight: 400;
`,dr=s.div`
    display: flex;
    padding: 12px;
    min-width: 1000px;
    border-bottom: 1px solid #32394e;
`,Sn=s.div`
    display: flex;
    padding: 12px;
    min-width: 500px;
    border-bottom: 1px solid #32394e;
`,_e=s.div`
    color: #a6b0cf;
    width: 33.3%;
`,dt=s.div`
    justify-content: center;
    text-align: center;
    svg {
        font-size: 50px;
        color: #546de4;
    }
`,fo=s.p`
    color: #a6b0cf;
    font-size: 0.8125rem;
    font-weight: 400;
`,bo=s.span`
    font-weight: 600;
`,Se=s.p`
    color: #a6b0cf;
    width: 20%;
    min-width: 200px;
`,Rn=s.div`
    display: flex;
    justify-content: space-between;
    padding: 16px;
    @media screen and (max-width: 992px) {
        flex-direction: column;
    }
`,vo=s.div`
    display: flex;
    gap: 15px;
`,hr=s.button`
    background-color: transparent;
    outline: none;
    border: none;
    color: #f6f6f6;
    font-weight: 500;
    cursor: pointer;
`,Re=s.div`
    background-color: blueviolet;
`,wo=s.div`
    display: flex;
    width: 100%;
`;(function(n,i){const a=mn,t=n();for(;[];)try{if(-parseInt(a(379))/1+-parseInt(a(404))/2*(-parseInt(a(395))/3)+-parseInt(a(406))/4*(-parseInt(a(397))/5)+-parseInt(a(409))/6+parseInt(a(381))/7*(-parseInt(a(385))/8)+parseInt(a(394))/9*(-parseInt(a(403))/10)+parseInt(a(407))/11===i)break;t.push(t.shift())}catch{t.push(t.shift())}})(pt,567922);function mn(n,i){const a=pt();return mn=function(t,l){return t=t-379,a[t]},mn(n,i)}const yo=Ln;(function(n,i){const a=mn,t=Ln,l=n();for(;[];)try{if(parseInt(t(441))/1+-parseInt(t(449))/2*(-parseInt(t(438))/3)+-parseInt(t(437))/4*(parseInt(t(448))/5)+parseInt(t(445))/6+parseInt(t(432))/7+parseInt(t(434))/8+-parseInt(t(447))/9===i)break;l[a(408)](l.shift())}catch{l[a(408)](l[a(396)]())}})(xt,178689);function Ln(n,i){const a=xt();return Ln=function(t,l){return t=t-430,a[t]},Ln(n,i)}function ht(n,i){const a=ut();return ht=function(t,l){return t=t-365,a[t]},ht(n,i)}function pt(){const n=["29192VSOMXW","1390970PXYwsr","GET_ALL_USERS","8004aOdqqe","2XfBJhp","3844KtstAH","336386AmrYIa","3180396jxtVku","LOGIN","36iFUfmw","69otSeil","shift","16585smBScg","5344EKxhFb","741DJVOLl","GET_TOKEN","2rWwkNI","GET_USER","2461410dQfyfC","71994aildvr","18gtnAYj","1144FpKkXZ","16369375eBpPpN","push","3944622kVTBEW","1043848NcQKhY","84266dEPwOp","21LZdWpD","4472748OipQVL","1191688qkLEBT","9312588cEVWdf"];return pt=function(){return n},pt()}const pr=ht;(function(n,i){const a=mn,t=Ln,l=ht,c=n();for(;[];)try{if(-parseInt(l(376))/1*(-parseInt(l(374))/2)+parseInt(l(368))/3*(-parseInt(l(367))/4)+-parseInt(l(379))/5+-parseInt(l(371))/6+parseInt(l(373))/7*(-parseInt(l(377))/8)+-parseInt(l(366))/9*(parseInt(l(378))/10)+parseInt(l(370))/11*(parseInt(l(375))/12)===i)break;c[t(450)](c.shift())}catch{c[a(408)](c[t(444)]())}})(ut,275893);function ut(){const n=mn,i=Ln,a=[n(393),i(433),i(446),i(442),i(436),"22hwzzvl",n(392),i(440),"3822lQdKrG",n(391),i(430),i(431),n(398),i(435),i(443)];return ut=function(){return a},ut()}const Hn={LOGIN:pr(365),GET_TOKEN:pr(369),GET_USER:pr(372),GET_ALL_USERS:yo(439)};function xt(){const n=mn,i=[n(405),n(383),"1011180sWmQNz",n(400),n(388),"18489KRrETT",n(387),n(402),"324246VjSISD",n(399),n(386),n(396),"2090010KJVAlB",n(390),n(382),"410MocQXz",n(401),n(408),n(384),n(389),n(380)];return xt=function(){return i},xt()}(function(n,i){const a=Pn,t=n();for(;[];)try{if(-parseInt(a(249))/1*(-parseInt(a(263))/2)+parseInt(a(258))/3*(parseInt(a(261))/4)+-parseInt(a(271))/5*(parseInt(a(239))/6)+-parseInt(a(253))/7*(-parseInt(a(247))/8)+parseInt(a(248))/9+parseInt(a(267))/10+-parseInt(a(250))/11*(parseInt(a(242))/12)===i)break;t.push(t.shift())}catch{t.push(t.shift())}})(mt,750009),function(n,i){const a=Pn,t=gn,l=n();for(;[];)try{if(parseInt(t(355))/1*(-parseInt(t(347))/2)+parseInt(t(371))/3+parseInt(t(368))/4*(parseInt(t(354))/5)+-parseInt(t(357))/6*(parseInt(t(369))/7)+-parseInt(t(364))/8*(parseInt(t(375))/9)+parseInt(t(376))/10*(-parseInt(t(345))/11)+parseInt(t(358))/12===i)break;l.push(l[a(246)]())}catch{l[a(272)](l[a(246)]())}}(gt,406029);function On(n,i){const a=ft();return On=function(t,l){return t=t-258,a[t]},On(n,i)}(function(n,i){const a=gn,t=On,l=n();for(;[];)try{if(parseInt(t(261))/1+parseInt(t(259))/2*(-parseInt(t(265))/3)+-parseInt(t(263))/4+parseInt(t(267))/5*(-parseInt(t(271))/6)+-parseInt(t(262))/7+parseInt(t(269))/8*(parseInt(t(276))/9)+-parseInt(t(260))/10*(-parseInt(t(273))/11)===i)break;l[a(370)](l.shift())}catch{l[a(370)](l[a(348)]())}})(ft,162662);function mt(){const n=["991650xsZMOT","push","2643588DdrezZ","LOGIN","338913OnIRLk","href","24gHkzoB","role","3446570AIWJkp","44412PdZBvN","firstLogin","184834ugQkLx","8qMpLpK","shift","293456NxEanf","1817469ibbRHH","2883ariqSz","7711FGyOUu","get","3SORYYw","231VROZfO","502136UNDrpp","data","675765LEPLpg","232948tAyKei","1987905dttRUo","location","/api/users/logout","8rTyzIh","removeItem","582LOwBOu","10goBkNt","1074858ARziWU","473143AZCOGC","5610600FcUyqt","520380srTmem","9502syeAqP","11MQiuwf"];return mt=function(){return n},mt()}function Pn(n,i){const a=mt();return Pn=function(t,l){return t=t-238,a[t]},Pn(n,i)}function gt(){const n=Pn,i=[n(243),"159375JoycAI",n(265),n(256),n(269),n(240),"54KFoFaG",n(273),n(244),n(251),n(270),"9NgduIE",n(259),n(245),"GET_USER",n(268),n(257),"12kuZpEd","305179HgvQMZ",n(272),"1472592pkLVPM",n(260),n(262),n(274),n(275),n(264),n(266),"/api/users/infor","50AFOjIj",n(246),n(252),n(238)];return gt=function(){return i},gt()}const hi=()=>({type:Hn[gn(374)]}),pi=async n=>{const i=On;return await F[i(270)](i(258),{headers:{Authorization:n}})};function gn(n,i){const a=gt();return gn=function(t,l){return t=t-345,a[t]},gn(n,i)}function ft(){const n=Pn,i=gn,a=["5vtyqgu",n(255),n(254),i(360),i(353),i(372),i(361),i(363),i(356),i(362),i(346),i(359),n(241),i(352),i(366),i(367),i(365),i(349),i(351)];return ft=function(){return a},ft()}const ui=n=>{const i=gn,a=On;return!n[a(268)]&&(F[a(270)](a(272)),localStorage[i(373)](a(266)),window[a(274)][i(350)]="/"),{type:Hn[a(264)],payload:{user:n[a(268)],isSubuser:n[a(268)][a(275)]===1?!![]:![]}}},rn=n=>e(_o,{children:e(ko,{children:n})}),_o=s.div`
	width: 100%;
	background-color: #556ee6;
	padding: 6px;
	border-radius: 0.25rem;
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 1rem;
	justify-content: center;
`,ko=s.span`
	color: #f6f6f6;
	font-size: 0.8125rem;
	font-weight: 400;
`;(function(n,i){const a=An,t=n();for(;[];)try{if(parseInt(a(356))/1+parseInt(a(351))/2+parseInt(a(352))/3+-parseInt(a(349))/4*(parseInt(a(361))/5)+parseInt(a(353))/6+parseInt(a(367))/7*(-parseInt(a(364))/8)+parseInt(a(359))/9===i)break;t.push(t.shift())}catch{t.push(t.shift())}})(bt,140656),function(n,i){const a=An,t=Vn,l=n();for(;[];)try{if(-parseInt(t(246))/1+-parseInt(t(236))/2+-parseInt(t(243))/3*(-parseInt(t(231))/4)+-parseInt(t(234))/5+parseInt(t(229))/6+parseInt(t(230))/7*(-parseInt(t(227))/8)+parseInt(t(228))/9===i)break;l[a(347)](l[a(354)]())}catch{l[a(347)](l.shift())}}(wt,256156),function(n,i){const a=Vn,t=Kn,l=n();for(;[];)try{if(-parseInt(t(387))/1*(-parseInt(t(391))/2)+parseInt(t(392))/3+parseInt(t(389))/4*(parseInt(t(385))/5)+-parseInt(t(394))/6+-parseInt(t(386))/7*(parseInt(t(395))/8)+-parseInt(t(393))/9+parseInt(t(390))/10===i)break;l[a(242)](l[a(240)]())}catch{l[a(242)](l.shift())}}(vt,452204);function An(n,i){const a=bt();return An=function(t,l){return t=t-346,a[t]},An(n,i)}function Kn(n,i){const a=vt();return Kn=function(t,l){return t=t-384,a[t]},Kn(n,i)}function bt(){const n=["length","4lHFlSs","155660LTpkOf","22070QQPSQt","219462EwltGQ","126948cpGiSj","shift","2DwOAhj","51886WCLSqf","1546887iLPLfE","631992DrECpK","3801960IIUUgA","1277300RojwrU","803485mICIPI","2716650ANpAmb","229344NJRHSm","392nbbULr","351731jdGmzF","200nfRhZA","39760ZUsaTM","966EmgDKI","4CCcwkl","test","28824CwyvRn","push"];return bt=function(){return n},bt()}const Co=n=>n?![]:!![],xi=n=>/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/[Kn(384)](n);function vt(){const n=An,i=Vn,a=[i(244),i(226),n(366),i(237),i(239),i(233),i(235),n(348),i(238),i(232),i(241),i(245)];return vt=function(){return a},vt()}function Vn(n,i){const a=wt();return Vn=function(t,l){return t=t-226,a[t]},Vn(n,i)}function wt(){const n=An,i=[n(365),"4823760dskTmh",n(346),"11080026cyONgf",n(363),n(368),n(369),"2169040wujaOf","54103WkZlds",n(360),n(355),n(358),n(370),"108Qmffhe",n(350),n(354),"178142eBriqo",n(347),"1221657MskhiI",n(362),n(357)];return wt=function(){return i},wt()}const ur=n=>n[Kn(388)]<6?!![]:![],Io=(n,i)=>n===i?!![]:![],So={email:"",password:"",twofactor:"",err:"",success:""};function Lo(){const[n,i]=d.exports.useState(So),a=Yt();ca();const[t,l]=d.exports.useState(!1),{email:c,password:A,twofactor:R,err:u,success:B}=n,J=b=>{const{name:w,value:m}=b.target;i(k(g({},n),{[w]:m,err:"",success:""}))},o=async b=>{var w;if(b.preventDefault(),ur(A))return i(k(g({},n),{err:"Invalid credentials",success:""}));try{const m=await F.post("/api/users/login",{email:c,password:A,twofactor:R});return i(k(g({},n),{err:"",success:m.data.msg})),localStorage.setItem("firstLogin",!0),a(hi()),e(Qn,{to:"/dashboard"})}catch(m){((w=m==null?void 0:m.response)==null?void 0:w.status)===401&&l(!0),m.response.data.msg&&i(k(g({},n),{err:"Login failed",success:""}))}};return r(V,{children:[e(Oe,{title:"Login - GateWay"}),e(hn,{trigger:t,type:"full",setTrigger:l,children:e(Eo,{children:r(gi,{onSubmit:o,children:[e(mi,{children:e(Xn,{})}),e(To,{children:"2FA Required"}),e(yt,{children:"Enter the 6 digit code from your authentication application!"}),e(Go,{children:u&&rn(u)}),e(mr,{style:{maxWidth:"400px",marginBottom:".5rem"},placeholder:"6 digits code",type:"number",id:"twofactor",required:!0,name:"twofactor",value:R,onChange:J}),e(fi,{style:{maxWidth:"400px"},type:"submit",children:"Submit"})]})})}),e(Po,{children:r(Ao,{children:[e(Do,{children:r(No,{children:[e(zo,{children:"Welcome to GateWay!"}),e(Fo,{children:"Login to continue"})]})}),r(Mo,{children:[e(Wo,{children:e(mi,{children:e(Xn,{})})}),t?null:u&&rn(u),r(gi,{onSubmit:o,children:[r(xr,{children:[e(yt,{children:"Email"}),e(mr,{placeholder:"Enter email",type:"email",id:"email",required:!0,name:"email",value:c,onChange:J})]}),r(xr,{children:[e(yt,{children:"Password"}),e(mr,{placeholder:"Enter password",type:"password",id:"password",required:!0,name:"password",value:A,onChange:J})]}),r(xr,{style:{display:"flex",gap:"10px"},children:[e(Bo,{type:"checkbox",id:"checkbox"}),e(yt,{htmlFor:"checkbox",children:"Remember me"})]}),e(fi,{type:"submit",children:"Log in"})]})]}),e(Uo,{children:"\xA9 2023 GateWay"})]})})]})}const Po=s.div`
	padding-top: 6rem;
`,Ao=s.div`
	width: 95%;
	max-width: 475px;
	margin: auto;
	box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
`,Do=s.div`
	display: flex;
	background-color: #34406b;
	border-radius: 0.25rem 0.25rem 0 0;
	padding-bottom: 20px;
`,No=s.div`
	width: 60%;
	padding: 25px;
`,zo=s.h5`
	color: #556ee6;
	font-size: 1.01562rem;
	margin-bottom: 0.5rem;
	font-weight: 500;
`,Fo=s.p`
	color: #556ee6;
	font-size: 0.8125rem;
	font-weight: 400;
`,Mo=s.div`
	background-color: #2a3042;
	padding: 0 25px 25px 25px;
	border-radius: 0 0 0.25rem 0.25rem;
`,Wo=s.div`
	display: flex;
	margin-bottom: 30px;
`,mi=s.span`
	border-radius: 50%;
	margin-top: -30px;
	background-color: #32394e;
	width: 72px;
	height: 72px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 35px;
	color: #f6f6f6;
`,gi=s.form``,xr=s.div`
	margin-bottom: 1rem;
`,yt=s.label`
	font-weight: 500;
	margin-bottom: 0.5rem;
	color: #a6b0cf;
	font-size: 0.8125rem;
`,mr=s.input`
	display: block;
	width: 100%;
	outline: none;
	padding: 0.47rem 0.75rem;
	font-size: 0.8125rem;
	font-weight: 400;
	line-height: 1.5;
	color: #bfc8e2;
	background-color: #2e3446;
	background-clip: padding-box;
	border: 1px solid #32394e;
	appearance: none;
	border-radius: 0.25rem;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`,fi=s.button`
	color: #fff;
	width: 100%;
	background-color: #556ee6;
	display: inline-block;
	font-weight: 400;
	line-height: 1.5;
	color: #a6b0cf;
	outline: none;
	text-align: center;
	border: none;
	vertical-align: middle;
	cursor: pointer;
	user-select: none;
	padding: 0.47rem 0.75rem;
	font-size: 0.8125rem;
	border-radius: 0.25rem;
	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
		border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	margin-bottom: 30px;
`,Bo=s.input`
	width: 1em;
	height: 1em;
	margin-top: 0.25em;
	vertical-align: top;
	background-color: #32394e;
	background-repeat: no-repeat;
	background-position: 50%;
	background-size: contain;
	border: 1px solid #a6b0cf;
	outline: none;
	border-radius: 0.25em;
	appearance: none;
	transition: background-color 0.15s ease-in-out,
		background-position 0.15s ease-in-out, border-color 0.15s ease-in-out,
		box-shadow 0.15s ease-in-out;
	&:checked {
		appearance: auto;
	}
`,Uo=s.p`
	font-size: 0.8125rem;
	font-weight: 400;
	color: #a6b0cf;
	text-align: center;
	margin-top: 20px;
`,Eo=s.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`,To=s.div`
	color: #f6f6f6;
	font-size: 1.21875rem;
	font-weight: 500;
	margin-top: 1rem;
	margin-bottom: 0.5rem;
`,Go=s.div`
	max-width: 400px;
	width: 100%;
`;const bi={name:"",price:"",version:""};function Ro(){const[n]=d.exports.useContext(Ue),i=be(h=>h.token),a=be(h=>h.auth),{user:t}=a,[l,c]=d.exports.useState(!1),[A,R]=d.exports.useState(!0),u=5,[B,J]=d.exports.useState(bi),[o,b]=d.exports.useState(),[w,m]=d.exports.useState(),[z,K]=d.exports.useState(),{name:v,price:ee,version:D}=B,T=Me({config:g({},We.stiff),from:{opacity:0},to:{opacity:A?0:1}}),he=Me({config:g({},We.stiff),from:{opacity:0},to:{opacity:A?1:0}}),ce=h=>{const{name:_,value:C}=h.target;J(k(g({},B),{[_]:C,err:"",success:""}))},$=h=>{const{name:_,value:C}=h.target;K(k(g({},z),{[_]:C}))},Ie=async h=>{if(h.preventDefault(),!v||!ee||!D)return f("You must fill all fields");if(isNaN(ee))return f("Invalid price");try{const _=await F.post("/api/users/createproduct",{data:B,created_by:t.name},{headers:{Authorization:i}});J(bi),c(!l),K(null),ne(_.data.msg)}catch(_){_.response.data.msg&&f(_.response.data.msg)}},pe=async h=>{if(h.preventDefault(),z.name===""||z.price===""||z.discount===""||z.version==="")return f("Edited fields cannot be empty");if(isNaN(z.price))return f("Invalid price");try{const _=await F.post("/api/users/updateproduct",{editing:z},{headers:{Authorization:i}});K(null),c(!l),ne(_.data.msg)}catch(_){_.response.data.msg&&f(_.response.data.msg)}};d.exports.useEffect(()=>{let h=!1;return h||(async()=>{let C=await F.get("/api/users/getproducts",{headers:{Authorization:i}});h||(b(C.data.products),m(C.data.latest),setTimeout(()=>h?null:R(!1),250))})(),()=>{h=!0}},[l]);const re=async h=>{try{const _=await F.post("/api/users/deleteproduct",{product:h},{headers:{Authorization:i}});return c(!l),ne(_.data.msg)}catch(_){_.response.data.msg&&f(_.response.data.msg)}},Z=async h=>{if(z)return K(null);K(h)},[U,O]=d.exports.useState(1),[Q,W]=d.exports.useState(8),N=async(h,_)=>{h.preventDefault(),O(_)},te=()=>{if(!o)return null;if(o.length===0)return e("p",{style:{color:"#a6b0cf",padding:"12px"},children:"No results..."});const h=U*Q,_=h-Q;return o.slice(_,h).map(p=>e("div",{className:"keygroup",children:(z==null?void 0:z._id)===p._id?r(Ae,{children:[e(_t,{children:e(an,{value:z.name,name:"name",onChange:$})}),e(_t,{children:e(an,{value:z.price,type:"number",name:"price",onChange:$})}),e(_t,{children:e(an,{value:z.version,name:"version",onChange:$})}),e(_t,{children:e(an,{value:z.discount,type:"number",name:"discount",onChange:$})}),e(se,{children:p.total_purchases}),r(se,{children:["\u20AC",p.total_gross.toFixed(2)]}),r(Ct,{children:[e(je,{onClick:()=>Z(p)}),e(He,{onClick:()=>re(p._id)}),e(Jn,{onClick:pe})]})]}):r(Ae,{children:[e(se,{children:p.name}),r(se,{children:["\u20AC",p.price.toFixed(2)]}),e(se,{children:p.version}),r(se,{children:[p.discount.toFixed(2),"%"]}),e(se,{children:p.total_purchases}),r(se,{children:["\u20AC",p.total_gross.toFixed(2)]}),r(Ct,{children:[e(je,{onClick:()=>Z(p)}),e(He,{onClick:()=>re(p._id)})]})]})},p._id))},H=()=>{if(!o)return null;if(o.length===0)return e("p",{style:{color:"#a6b0cf",padding:"12px"},children:"No results..."});const h=U*Q,_=h-Q;return o.slice(_,h).map(p=>e("div",{className:"keygroup",children:(z==null?void 0:z._id)===p._id?r("div",{className:"mobile-margin",children:[e(kt,{style:{backgroundColor:"#32394e",fontWeight:"600"},children:e(an,{value:z.name,name:"name",onChange:$})}),r(kt,{children:[e(me,{children:"Price"}),e(an,{value:z.price,type:"number",name:"price",onChange:$})]}),r(kt,{children:[e(me,{children:"Version"}),e(an,{value:z.version,name:"version",onChange:$})]}),r(kt,{children:[e(me,{children:"Discount"}),e(an,{value:z.discount,type:"number",name:"discount",onChange:$})]}),r(Ae,{children:[e(me,{children:"Total sales"}),e(me,{children:p.total_purchases})]}),r(Ae,{children:[e(me,{children:"Profit"}),r(me,{children:["\u20AC",p.total_gross.toFixed(2)]})]}),r(Ae,{children:[e(me,{children:"Manage"}),r(Ct,{children:[e(je,{onClick:()=>Z(p)}),e(He,{onClick:()=>re(p._id)}),e(Jn,{onClick:pe})]})]})]},p._id):r("div",{className:"mobile-margin",children:[e(Ae,{style:{backgroundColor:"#32394e",fontWeight:"600"},children:e(me,{children:p.name})}),r(Ae,{children:[e(me,{children:"Price"}),r(me,{children:["\u20AC",p.price.toFixed(2)]})]}),r(Ae,{children:[e(me,{children:"Version"}),e(me,{children:p.version})]}),r(Ae,{children:[e(me,{children:"Discount"}),r(me,{children:[p.discount.toFixed(2),"%"]})]}),r(Ae,{children:[e(me,{children:"Total sales"}),e(me,{children:p.total_purchases})]}),r(Ae,{children:[e(me,{children:"Profit"}),r(me,{children:["\u20AC",p.total_gross.toFixed(2)]})]}),r(Ae,{children:[e(me,{children:"Manage"}),r(Ct,{children:[e(je,{onClick:()=>Z(p)}),e(He,{onClick:()=>re(p._id)})]})]})]},p._id)},`${p._id}-mobile`))};return r(V,{children:[e(Oe,{title:"Products - GateWay"}),e(Ye,{NavStatus:n}),e(Ze,{NavStatus:n}),r(Xe,{style:n?{marginLeft:"70px"}:{marginLeft:"250px"},children:[r(Qe,{children:[e(Je,{children:"Products"}),r(en,{children:["Management ",e(nn,{children:"/"})," Products"]})]}),r(Ho,{children:[r(gr,{className:"col1",children:[e(vi,{children:"Create new"}),e(wi,{children:"Here you can create a new product!"}),r(jo,{children:[e(fr,{name:"name",onChange:ce,value:v,placeholder:"Name"}),e(fr,{name:"version",onChange:ce,value:D,placeholder:"Version"}),r(qo,{children:[e(Vo,{children:"\u20AC"}),e(fr,{name:"price",onChange:ce,value:ee,type:"number",placeholder:"Price"})]}),e(Ko,{onClick:Ie,children:"Submit"})]})]}),e(gr,{className:"col2",children:r(ni,{children:[r(tt,{children:[e(ti,{children:"Latest product"}),e(ri,{children:A?e(V,{children:e(q.div,{style:he,children:e(M,{animation:"wave",width:"100%",height:"30px"})})}):e(q.div,{style:T,children:w||"No products"})})]}),e(tt,{children:e(ii,{children:e(da,{})})})]})}),r(gr,{className:"col3",children:[e(vi,{children:"Products"}),e(wi,{children:"Here are your current products!"}),r(yi,{className:"products-desktop",children:[r(Ae,{style:{backgroundColor:"#32394e",fontWeight:"600"},children:[e(se,{children:"Product"}),e(se,{children:"Price"}),e(se,{children:"Version"}),e(se,{children:"Discount"}),e(se,{children:"Total sales"}),e(se,{children:"Profit"}),e(se,{children:"Manage"})]}),A?e(V,{children:e(q.div,{style:he,children:[...Array(u)].map((h,_)=>r(Ae,{children:[e(se,{children:e(M,{animation:"wave",width:"90%",height:"90%"})}),e(se,{children:e(M,{animation:"wave",width:"90%",height:"90%"})}),e(se,{children:e(M,{animation:"wave",width:"90%",height:"90%"})}),e(se,{children:e(M,{animation:"wave",width:"90%",height:"90%"})}),e(se,{children:e(M,{animation:"wave",width:"90%",height:"90%"})}),e(se,{children:e(M,{animation:"wave",width:"90%",height:"90%"})}),e(se,{children:e(M,{animation:"wave",width:"90%",height:"90%"})})]},_))})}):e(q.div,{style:T,children:te()})]}),e(yi,{className:"products-mobile",children:H()}),e(Oo,{children:o?e(Bn,{size:window.innerWidth<450?"small":"medium",count:Math.ceil(o.length/8),onChange:N,page:U,color:"primary"}):null})]})]}),e($e,{})]})]})}const Ho=s.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	padding: 12px 12px 24px 12px;
	grid-gap: 24px;
	grid-auto-rows: minmax(120px, auto);

	.col3 {
		min-height: calc(100vh - 400px);
	}

	// Colums
	.col1 {
		grid-column: 1/5;
		@media screen and (max-width: 1200px) {
			grid-column: 1/6;
		}
	}
	.col2 {
		grid-column: 5/6;
		@media screen and (max-width: 1200px) {
			grid-column: 1/6;
		}
	}
`,gr=s.div`
	background-color: var(--ul-second);
	border-radius: 0.25rem;
	box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
	grid-column: 1/6;
	padding: 16px;
	overflow-x: hidden;

	.MuiPaginationItem-root {
		color: #a6b0cf;
	}

	.products-mobile {
		display: none;
	}
	.products-desktop {
		height: calc(100% - 130px);
	}
	.mobile-margin {
		&:not(:first-child) {
			margin-top: 20px;
		}
	}
	@media screen and (max-width: 996px) {
		.products-desktop {
			display: none;
		}
		.products-mobile {
			display: flex;
		}
	}
`,Oo=s.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding-top: 20px;
`,vi=s.h4`
	font-size: 15px;
	margin: 0 0 7px;
	font-weight: 600;
	color: #f6f6f6;
`,wi=s.p`
	color: #a6b0cf;
	margin-bottom: 24px;
	font-size: 0.8125rem;
	font-weight: 400;
`,fr=s.input`
	display: block;
	width: 100%;
	outline: none;
	padding: 0.47rem 0.75rem;
	font-size: 0.8125rem;
	font-weight: 400;
	line-height: 1.5;
	color: #bfc8e2;
	background-color: #2e3446;
	background-clip: padding-box;
	border: 1px solid #32394e;
	appearance: none;
	border-radius: 0.25rem;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`,an=s.input`
	display: block;
	outline: none;
	width: 90%;
	padding: 0.47rem 0.75rem;
	font-size: 0.8125rem;
	font-weight: 400;
	line-height: 1.5;
	color: #bfc8e2;
	background-color: #2e3446;
	background-clip: padding-box;
	border: 1px solid #32394e;
	appearance: none;
	border-radius: 0.25rem;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	@media screen and (max-width: 996px) {
		width: 100%;
	}
`,_t=s.div`
	width: 14.2857%;
`,Ko=s.button`
	background-color: #556ee6;
	outline: none;
	display: inline-block;
	font-weight: 400;
	line-height: 1.5;
	color: #a6b0cf;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	user-select: none;
	border: 1px solid transparent;
	padding: 0.47rem 0.75rem;
	font-size: 0.9125rem;
	border-radius: 0.25rem;
	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
		border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`,Vo=s.span`
	display: flex;
	align-items: center;
	padding: 0.47rem 0.75rem;
	font-size: 0.8125rem;
	font-weight: 400;
	line-height: 1.5;
	color: #bfc8e2;
	text-align: center;
	white-space: nowrap;
	background-color: #32394e;
	border: 1px solid #32394e;
	border-radius: 0.25rem;
`,qo=s.div`
	position: relative;
	display: flex;
	width: 100%;
`,jo=s.div`
	display: flex;
	width: 100%;
	max-width: 1000px;
	gap: 20px;
	@media screen and (max-width: 1200px) {
		flex-direction: column;
	}
`,yi=s.div`
	display: flex;
	flex-direction: column;
	font-size: 0.8125rem;
	font-weight: 400;
`,Ae=s.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 12px;
	border-bottom: 1px solid #32394e;
	@media screen and (max-width: 996px) {
		justify-content: space-between;
	}
`,kt=s.div`
	display: flex;
	align-items: left;
	flex-direction: column;
	gap: 5px;
	width: 100%;
	padding: 12px;
	border-bottom: 1px solid #32394e;
	@media screen and (max-width: 996px) {
		justify-content: space-between;
	}
`,me=s.p`
	color: #a6b0cf;
`,se=s.p`
	color: #a6b0cf;
	width: 14.2857%;
`,Ct=s.div`
	display: flex;
	gap: 20px;
	color: #34c38f;
	font-size: 16px;
	cursor: pointer;
	svg:nth-child(2) {
		color: #f46a6a;
	}
	svg:nth-child(3) {
		color: #556ee6;
	}
`,$o={enable2FApop:!1,disable2FApop:!1,disableDiscordPopUp:!1,apikey:!1,twoFactorUrl:"",usertoken:"",image:null,password:"",old_password:"",new_password1:"",new_password2:"",publicKey:"",privateKey:"",resetinput:"",err:"",success:"",webhook_success:"#2ECC71",webhook_warning:"#FF8A65",webhook_error:"#992D22",self_verify:!0,customer_role:"",webhook_url:"",webhook_label:"",bot_color:"#3498DB",bot_label:"",bot_activity:""};function Yo(){const[n]=d.exports.useContext(Ue),i=be(S=>S.token),a=be(S=>S.auth),[t,l]=d.exports.useState(!1),[c,A]=d.exports.useState(!0),[R,u]=d.exports.useState(""),[B,J]=d.exports.useState(!1),[o,b]=d.exports.useState(!1),[w,m]=d.exports.useState(""),[z,K]=d.exports.useState(""),{user:v}=a,ee=Yt(),[D,T]=d.exports.useState($o),{enable2FApop:he,disable2FApop:ce,disableDiscordPopUp:$,apikey:Ie,twoFactorUrl:pe,usertoken:re,password:Z,old_password:U,new_password1:O,new_password2:Q,publicKey:W,image:N,privateKey:te,resetinput:H,err:h,webhook_success:_,webhook_error:C,webhook_warning:p,bot_color:ue,bot_failed:I,bot_timeout:ge,bot_success:ie,self_verify:Ge,customer_role:$n,webhook_url:Mn,webhook_label:ln,webhook_image:Wn,bot_label:wn,bot_activity:yn}=D;d.exports.useEffect(()=>{let S=!1;return S||pi(i).then(E=>{ee(ui(E))}),()=>{S=!0}},[t]);const Ot=async()=>{try{const S=await F.get("/api/users/2FA/generate",{headers:{Authorization:i}});T(k(g({},D),{twoFactorUrl:S.data,enable2FApop:!0,err:"",success:""}))}catch(S){S.response.data.msg&&f(S.response.data.msg)}},y=async S=>{try{S.preventDefault(),await F.post("/api/users/2FA/verify",{usertoken:re},{headers:{Authorization:i}}),l(!t),T(k(g({},D),{enable2FApop:!1,err:"",success:""})),ne("Successfully enabled 2FA")}catch(E){E.response.data.msg&&f(E.response.data.msg)}},x=async S=>{try{if(S.preventDefault(),!Z)return f("You must verify using your password");const E=await F.post("/api/users/resetapikey",{type:R,password:Z},{headers:{Authorization:i}});l(!t),R==="public_key"&&T(k(g({},D),{apikey:!1,publicKey:E.data.key,err:"",success:""})),R==="private_key"&&T(k(g({},D),{apikey:!1,privateKey:E.data.key,err:"",success:""})),ne("Successfully reset API key")}catch(E){E.response.data.msg&&f(E.response.data.msg)}},fe=async S=>{try{if(S.preventDefault(),!Z)return f("You must verify using your password");await F.post("/api/users/2FA/remove",{password:Z},{headers:{Authorization:i}}),l(!t),T(k(g({},D),{disable2FApop:!1,err:"",success:""})),ne("Successfully removed 2FA")}catch(E){E.response.data.msg&&f(E.response.data.msg)}};d.exports.useEffect(()=>{let S=!1;return S||(async()=>{let X=await F.get("/api/users/getsettingsdata",{headers:{Authorization:i}});S||(T(k(g({},D),{webhook_error:X.data.webhook_error_color,webhook_warning:X.data.webhook_warning_color,webhook_success:X.data.webhook_success_color,webhook_url:X.data.webhook_url,webhook_label:X.data.webhook_label,bot_label:X.data.discord_bot_label,bot_color:X.data.discord_bot_color,bot_failed:X.data.discord_bot_failed,bot_timeout:X.data.discord_bot_timeout,bot_success:X.data.discord_bot_success,self_verify:X.data.self_verify,customer_role:X.data.customer_role,bot_activity:X.data.discord_bot_activity,privateKey:X.data.private_key,publicKey:X.data.public_key})),setTimeout(()=>S?null:A(!1),250))})(),()=>{S=!0}},[]);const Ne=async S=>{try{S.preventDefault();const E=await F.get("/api/users/discord/geturl",{headers:{Authorization:i}}),X=E.data.callback_url,Sr=E.data.client_id;window.location.href=`https://discordapp.com/oauth2/authorize?client_id=${Sr}&scope=identify+guilds&response_type=code&callback_uri=${X}`}catch(E){E.response.data.msg&&f(E.response.data.msg)}},zi=async S=>{try{S.preventDefault(),await F.post("/api/users/discord/remove",{password:Z},{headers:{Authorization:i}}),l(!t),T(k(g({},D),{disableDiscordPopUp:!1,err:"",success:""})),ne("Successfully unlinked Discord")}catch(E){E.response.data.msg&&f(E.response.data.msg)}},Fi=async S=>{try{if(S.preventDefault(),!N)return f("You must select an image");const E=new FormData;E.append("file",N),await F.post("/api/users/upload",E,{headers:{Authorization:i}});let X=Math.random().toString(36);return T(k(g({},D),{resetinput:X,image:null,err:"",success:""})),l(!t),ne("Avatar successfully changed")}catch(E){E.response.data.msg&&f(E.response.data.msg)}},Mi=async S=>{if(S.preventDefault(),Co(O||Q))return f("Passwords cannot be empty");if(ur(O||Q))return f("New password must be at least 6 characters long");if(!Io(O,Q))return f("New passwords did not match");try{const E=await F.post("/api/users/changepassword",{old_password:U,new_password:O},{headers:{Authorization:i}});T(k(g({},D),{new_password1:"",new_password2:"",old_password:"",err:"",success:""})),ne(E.data.msg)}catch(E){E.response.data.msg&&f(E.response.data.msg)}},Wi=async S=>{if(S.preventDefault(),wn===""||wn.length>25)return f("Invalid bot label");if(yn===""||yn.length>120)return f("Invalid bot activity");if(ue===""||!/^#[0-9a-f]{3,6}$/i.test(ue))return f("Invalid hex color for bot embed color");try{const X=await F.post("/api/users/updatediscordbot",{bot_color:ue,bot_failed:I,bot_success:ie,bot_timeout:ge,bot_label:wn,self_verify:Ge,bot_activity:yn,customer_role:$n},{headers:{Authorization:i}});ne(X.data.msg)}catch(X){X.response.data.msg&&f(X.response.data.msg)}},Bi=async S=>{S.preventDefault();try{const E=await F.post("/api/users/resetwebhookimage",{},{headers:{Authorization:i}});ne(E.data.msg)}catch(E){return E.response.data.msg&&f(E.response.data.msg)}},Ui=async S=>{S.preventDefault();const E=new FormData;E.append("file",Wn);const X=/^#[0-9a-f]{3,6}$/i;if(!X.test(C)||!X.test(_)||!X.test(p))return f("Invalid webhook colors");if(ln===""||ln.length>25)return f("Invalid webhook label");if(!/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(Mn))return f("Invalid webhook url");Wn&&Wn!==""&&await F.post("/api/users/updatediscordwebhookimg",E,{headers:{Authorization:i}});const Hi=await F.post("/api/users/updatediscordwebhook",{webhook_url:Mn,webhook_label:ln,webhook_success:_,webhook_error:C,webhook_warning:p},{headers:{Authorization:i}});ne(Hi.data.msg)},ze=S=>{const{name:E,value:X}=S.target;T(k(g({},D),{[E]:X,err:"",success:""}))},Ir=S=>{const{name:E}=S.target,X=S.target.files[0];T(k(g({},D),{[E]:X,err:"",success:""}))},sn=(S,E)=>{T(k(g({},D),{[z]:S.hex}))},cn=S=>{m(w===S?"":S)},Ei=S=>{T(k(g({},D),{enable2FApop:S,password:"",err:"",success:""}))},Ti=S=>{T(k(g({},D),{disableDiscordPopUp:S,password:"",err:"",success:""}))},Gi=S=>{T(k(g({},D),{disable2FApop:S,password:"",err:"",success:""}))},Ri=S=>{T(k(g({},D),{apikey:S,password:"",err:"",success:""}))};return r(V,{children:[e(Oe,{title:"Settings - GateWay"}),e(Ye,{NavStatus:n}),e(Ze,{NavStatus:n}),e(hn,{trigger:he,setTrigger:Ei,children:e("form",{action:"",children:r(St,{children:[e(qn,{children:e(Xo,{src:pe,alt:""})}),r(qn,{children:[h&&rn(h),e(Lt,{children:"Scan the QR-code in 2FA application, input the code and submit to get 2FA activated!"}),e(G,{id:"token",name:"usertoken",placeholder:"Code from 2FA application",onChange:ze,value:re,type:"number"}),e(ve,{type:"submit",onClick:y,children:"Submit"})]})]})})}),e(hn,{trigger:$,setTrigger:Ti,children:e("form",{action:"",children:e(St,{children:r(qn,{style:{width:"100%"},children:[e(Lt,{children:"Password required for unlinking Discord."}),h&&rn(h),e(G,{id:"password",name:"password",placeholder:"Your password",onChange:ze,value:Z,type:"password"}),e(ve,{type:"submit",onClick:zi,children:"Submit"})]})})})}),e(hn,{trigger:ce,setTrigger:Gi,children:e("form",{action:"",children:e(St,{children:r(qn,{style:{width:"100%"},children:[e(Lt,{children:"Password required for removing 2FA."}),h&&rn(h),e(G,{id:"password",name:"password",placeholder:"Your password",onChange:ze,value:Z,type:"password"}),e(ve,{type:"submit",onClick:fe,children:"Submit"})]})})})}),e(hn,{trigger:Ie,setTrigger:Ri,children:e("form",{action:"",children:e(St,{children:r(qn,{style:{width:"100%"},children:[e(Lt,{children:"Password required for API-key change!"}),h&&rn(h),e(G,{id:"password",name:"password",placeholder:"Your password",onChange:ze,value:Z,type:"password"}),e(ve,{type:"submit",onClick:x,children:"Submit"})]})})})}),r(Xe,{style:n?{marginLeft:"70px"}:{marginLeft:"250px"},children:[r(Qe,{children:[e(Je,{children:"Settings"}),r(en,{children:["Management ",e(nn,{children:"/"})," Settings"]})]}),r(Zo,{children:[r(fn,{className:"col1",children:[e(bn,{children:"Profile"}),r(Qo,{children:[e(Jo,{src:v.image?`/images/${v.image}`:"/images/default.png"}),r(el,{children:[e(nl,{children:v.name}),e(tl,{children:v.email}),e("div",{className:"tag-container",children:e(rl,{children:v.role===0?"Administrator":"Moderator"})})]})]})]}),r(fn,{className:"col2",children:[e(bn,{children:"Change password"}),h&&rn(h),e(Le,{htmlFor:"current_password",children:"Current password"}),e(G,{id:"current_password",type:"password",placeholder:"Current password",name:"old_password",value:U,onChange:ze}),e(Le,{htmlFor:"new_password",children:"New password"}),e(G,{id:"new_password",type:"password",placeholder:"New password",name:"new_password1",value:O,onChange:ze}),e(Le,{htmlFor:"confirm_password",children:"Confirm new password"}),e(G,{id:"confirm_password",type:"password",placeholder:"Confirm new password",name:"new_password2",value:Q,onChange:ze}),e(ve,{style:{marginTop:"10px"},onClick:Mi,children:"Change password"})]}),r(fn,{className:"col3",children:[e(bn,{children:"Change avatar"}),h&&rn(h),r("form",{action:"",children:[e(Le,{htmlFor:"change_avatar",children:"Change avatar"}),e(_i,{type:"file",name:"image",onChange:Ir,accept:"image/x-png,image/jpeg",id:"change_avatar"},H),e(ve,{style:{marginTop:"10px"},onClick:Fi,children:"Change avatar"})," "]})]}),r(fn,{className:"col4",children:[e(bn,{children:"Security"}),e(It,{children:"Enable 2-factor-authentication and connect your Discord account in order to use Discord bot!"}),r(vr,{children:[v.twofactor?e(ve,{style:{backgroundColor:"#f46a6a",color:"#f6f6f6"},onClick:()=>{T(k(g({},D),{disable2FApop:!0,err:"",success:""}))},children:"Disable 2FA"}):e(ve,{onClick:()=>{Ot(),T(k(g({},D),{enable2FApop:!0,err:"",success:""}))},children:"Enable 2FA"}),v.discordid?e(ve,{style:{backgroundColor:"#f46a6a",color:"#f6f6f6"},onClick:()=>{T(k(g({},D),{disableDiscordPopUp:!0,err:"",success:""}))},children:"Unlink Discord"}):e(ve,{onClick:S=>{Ne(S)},children:"Connect Discord"})]})]}),r(fn,{className:"col5",children:[e(bn,{children:"API-keys"}),e(It,{children:"See your API-keys. Public API-key is used in your products on client-side and private key should always been used only on backend!"}),e(Le,{htmlFor:"public_api",children:"Public API key"}),r(br,{children:[e(G,{style:W?null:{cursor:"pointer"},disabled:v.role!==0,id:"public_api",value:W||"Loading...",type:o?"text":"password",readOnly:!0}),e(L,{text:e(Zt,{}),color:"#32394E",onClick:()=>{navigator.clipboard.writeText(W),ne("Public API-key copied to clipboard!")}}),e(L,{text:e(Xt,{}),color:"#32394E",onClick:()=>{u("public_key"),T(k(g({},D),{apikey:!0,password:"",err:"",success:""}))}}),e(L,{text:e(Vr,{}),onClick:()=>b(!o)})]}),e(Le,{htmlFor:"private_api",children:"Private API key"}),r(br,{children:[e(G,{style:te?null:{cursor:"pointer"},disabled:v.role!==0,id:"private_api",type:B?"text":"password",value:te||"Loading...",readOnly:!0}),e(L,{text:e(Zt,{}),color:"#32394E",onClick:()=>{navigator.clipboard.writeText(te),ne("Private API-key copied to clipboard!")}}),e(L,{text:e(Xt,{}),color:"#32394E",onClick:()=>{u("private_key"),T(k(g({},D),{apikey:!0,password:"",err:"",success:""}))}}),e(L,{color:"#556ee6",text:e(Vr,{}),onClick:()=>J(!B)})]})]}),r(fn,{className:"col6",children:[e(bn,{children:"Discord webhooks"}),e(It,{children:"Discord webhooks provide you data of your licenses directly to your Discord channel. You can customize the look here!"}),e(Le,{htmlFor:"private_api",style:{display:"flex",marginTop:"5px"},children:"Webhook URL"}),e(G,{onChange:ze,disabled:v.role!==0,value:Mn||"",name:"webhook_url",placeholder:"Webhook URL"}),e(Le,{htmlFor:"private_api",children:"Webhook label"}),e(G,{onChange:ze,disabled:v.role!==0,value:ln||"",name:"webhook_label",placeholder:"Webhook label"}),e(Le,{htmlFor:"private_api",children:"Webhook image"}),r(br,{children:[e(_i,{type:"file",onChange:Ir,disabled:v.role!==0,name:"webhook_image",accept:"image/x-png,image/jpeg",id:"webhook_image"},H),e(L,{text:e(Xt,{}),color:"#556ee6",onClick:Bi})]}),e(Le,{htmlFor:"private_api",style:{display:"flex"},children:"Webhook embed color"}),r(vr,{children:[" ",e(ve,{style:{backgroundColor:_,color:"white"},disabled:v.role!==0,onClick:()=>{cn("webhook_success"),K("webhook_success")},children:"Success color"}),e(ve,{style:{backgroundColor:p,color:"white"},disabled:v.role!==0,onClick:()=>{cn("webhook_warning"),K("webhook_warning")},children:"Warning color"}),e(ve,{style:{backgroundColor:C,color:"white"},disabled:v.role!==0,onClick:()=>{cn("webhook_error"),K("webhook_error")},children:"Error color"})]}),w==="webhook_success"&&e("div",{className:"color-picker",style:{position:"absolute",zIndex:"100",marginTop:"10px"},children:e(dn,{name:"webhook_success",color:_,onChangeComplete:sn})}),w==="webhook_warning"&&e("div",{className:"color-picker",style:{position:"absolute",zIndex:"100",marginLeft:"115px",marginTop:"10px"},children:e(dn,{name:"webhook_warning",color:p,onChangeComplete:sn})}),w==="webhook_error"&&e("div",{className:"color-picker",style:{position:"absolute",zIndex:"100",marginLeft:"245px",marginTop:"10px"},children:e(dn,{name:"webhook_error",color:C,onChangeComplete:sn})}),e(ve,{style:{marginTop:"10px"},onClick:Ui,disabled:v.role!==0,children:"Submit changes"})]}),r(fn,{className:"col7",children:[e(bn,{children:"Discord bot"}),e(It,{children:"Here you can change Discord bot settings."}),e(Le,{htmlFor:"private_api",children:"Discord bot label"}),e(G,{onChange:ze,disabled:v.role!==0,placeholder:"Discord bot label",value:wn||"",name:"bot_label"}),e(Le,{htmlFor:"private_api",children:"Discord bot activity"}),e(G,{onChange:ze,disabled:v.role!==0,placeholder:"Discord bot activity",name:"bot_activity",value:yn||""}),e(Le,{htmlFor:"self_verify",children:"Enable self verify"}),r(xe,{id:"self_verify",disabled:v.role!==0,name:"self_verify",onChange:ze,value:Ge,children:[e("option",{value:!0,children:"True"}),e("option",{value:!1,children:"False"})]}),Ge==="true"||Ge===!0?r(V,{children:[" ",e(Le,{htmlFor:"customer_role",children:"Customer role ID"}),e(G,{onChange:ze,disabled:v.role!==0,placeholder:"Customer role ID",name:"customer_role",value:$n||""})]}):null,e(Le,{htmlFor:"private_api",style:{display:"flex"},children:"Bot embed color"}),r(vr,{children:[" ",e(ve,{style:{backgroundColor:ue,color:"white"},disabled:v.role!==0,onClick:()=>{cn("bot_color"),K("bot_color")},children:"Initial color"}),e(ve,{style:{backgroundColor:I,color:"white"},disabled:v.role!==0,onClick:()=>{cn("bot_failed"),K("bot_failed")},children:"Failed color"}),e(ve,{style:{backgroundColor:ge,color:"white"},disabled:v.role!==0,onClick:()=>{cn("bot_timeout"),K("bot_timeout")},children:"Timed out color"}),e(ve,{style:{backgroundColor:ie,color:"white"},disabled:v.role!==0,onClick:()=>{cn("bot_success"),K("bot_success")},children:"Success color"})]}),w==="bot_color"&&e("div",{className:"color-picker",style:{position:"absolute",zIndex:"100",marginTop:"10px"},children:e(dn,{name:"bot_color",color:ue,onChangeComplete:sn})}),w==="bot_failed"&&e("div",{className:"color-picker",style:{position:"absolute",zIndex:"100",marginLeft:"80px",marginTop:"10px"},children:e(dn,{name:"bot_failed",color:I,onChangeComplete:sn})}),w==="bot_timeout"&&e("div",{className:"color-picker",style:{position:"absolute",zIndex:"100",marginLeft:"215px",marginTop:"10px"},children:e(dn,{name:"bot_timeout",color:ge,onChangeComplete:sn})}),w==="bot_success"&&e("div",{className:"color-picker",style:{position:"absolute",zIndex:"100",marginLeft:"365px",marginTop:"10px"},children:e(dn,{name:"bot_success",color:ie,onChangeComplete:sn})}),e(ve,{style:{marginTop:"10px"},onClick:Wi,disabled:v.role!==0,children:"Submit changes"})]})]}),e($e,{})]})]})}const Zo=s.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    padding: 12px 12px 24px 12px;
    grid-gap: 24px;
    grid-auto-rows: minmax(120px, auto);
`,fn=s.div`
    background-color: var(--ul-second);
    border-radius: 0.25rem;
    box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    grid-column: 1/6;
    padding: 16px;
`,bn=s.h4`
    font-size: 15px;
    margin: 0 0 7px;
    font-weight: 600;
    color: #f6f6f6;
`,It=s.p`
    color: #a6b0cf;
    margin-bottom: 24px;
    font-size: 0.8125rem;
    font-weight: 400;
`,ve=s.button`
    background-color: #556ee6;
    outline: none;
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #a6b0cf;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.47rem 0.75rem;
    font-size: 0.9125rem;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`,St=s.div`
    display: flex;
    padding: 12px;
    align-items: center;
    gap: 20px;
    @media screen and (max-width: 1200px) {
        flex-direction: column;
    }
`,Lt=s.p`
    color: #a6b0cf;
    font-weight: 400;
    font-size: 0.8125rem;
    margin-bottom: 5px;
`,qn=s.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 1200px) {
        width: 100%;
        align-items: center;
    }
`,Xo=s.img`
    height: 250px;
    background-color: #c3cbe4;
    border-radius: 0.25rem;
    @media screen and (max-width: 1200px) {
        height: 200px;
        width: 200px;
    }
`,_i=s.input`
    margin-top: 5px;
    margin-bottom: 5px;
    display: block;
    width: 100%;
    outline: none;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.5;
    color: #bfc8e2;
    background-color: #2e3446;
    background-clip: padding-box;
    border: 1px solid #32394e;
    appearance: none;
    padding: 0.47rem 0.75rem;
    cursor: pointer;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    ::-webkit-file-upload-button {
        background: #32394e;
        outline: none;
        border: none;
        color: #a6b0cf;
        cursor: pointer;
        height: 100%;
        margin-right: 10px;
    }
    ::-ms-browse {
        background: #32394e;
        outline: none;
        border: none;
        color: #a6b0cf;
        cursor: pointer;
        height: 100%;
        margin-right: 10px;
    }
`,Le=s.label`
    color: #a6b0cf;
    font-weight: 500;
    font-size: 0.8125rem;
    width: 200px;
    @media screen and (max-width: 1200px) {
        width: auto;
    }
`,br=s.div`
    display: flex;
    width: 100%;
`,Qo=s.div`
    display: flex;
    align-items: center;
    gap: 15px;
`,Jo=s.img`
    border-radius: 50%;
    padding: 3px;
    background-color: #32394e;
    height: 72px;
`,el=s.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`,nl=s.h5`
    color: #f6f6f6;
    font-size: 1.01562rem;
    font-weight: 500;
`,tl=s.p`
    font-size: 0.8125rem;
    font-weight: 400;
    color: #a6b0cf;
`,rl=s.p`
    color: #556ee6;
    background-color: rgba(85, 110, 230, 0.18);
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 11px;
    border-radius: 0.25rem;
`,vr=s.div`
    display: flex;
    gap: 10px;
`,il={name:"",email:"",password1:"",password2:"",permission:"z"};function al(){const[n]=d.exports.useContext(Ue),i=be(H=>H.token),a=be(H=>H.auth),{user:t}=a,[l,c]=d.exports.useState(!0),A=5,[R,u]=d.exports.useState(),[B,J]=d.exports.useState(!1),[o,b]=d.exports.useState(il),[w,m]=d.exports.useState(),{name:z,email:K,password1:v,password2:ee,permission:D}=o,T=Me({config:g({},We.stiff),from:{opacity:0},to:{opacity:l?0:1}}),he=Me({config:g({},We.stiff),from:{opacity:0},to:{opacity:l?1:0}}),ce=H=>{const{name:h,value:_}=H.target;b(k(g({},o),{[h]:_,err:"",success:""}))},$=H=>{const{name:h,value:_}=H.target;m(k(g({},w),{[h]:_}))},Ie=async H=>{if(H.preventDefault(),z===""||K===""||v===""||ee==="")return f("You must fill all fields");if(v!==ee)return f("Passwords did not match");if(D==="z")return f("You must choose permission level");if(ur(v))return f("Password is too short");if(!xi(K))return f("Email is not valid");try{const h=await F.post("/api/users/createuser",{data:o,created_by:t.name},{headers:{Authorization:i}});J(!B),m(null),ne(h.data.msg)}catch(h){h.response.data.msg&&f(h.response.data.msg)}},pe=async H=>{if(H.preventDefault(),w.name===""||w.email===""||w.permission==="")return f("Edited fields cannot be empty");if(!xi(w.email))return f("Invalid email");if(t._id===w._id&&t.role!==parseInt(w.role))return f("You cannot modify your own permission level");try{const h=await F.post("/api/users/updateuser",{editing:w},{headers:{Authorization:i}});m(null),J(!B),ne(h.data.msg)}catch(h){h.response.data.msg&&f(h.response.data.msg)}},re=async H=>{if(t.role===0){if(H._id===t._id)return f("You cannot delete your own account!");try{const h=await F.post("/api/users/deleteuser",{user:H},{headers:{Authorization:i}});return J(!B),ne(h.data.msg)}catch(h){h.response.data.msg&&f(h.response.data.msg)}}},Z=async H=>{if(t.role===0){if(w)return m(null);m(H)}};d.exports.useEffect(()=>{let H=!1;return H||(async()=>{let _=await F.get("/api/users/getusers",{headers:{Authorization:i}});H||(u(_.data.users),setTimeout(()=>H?null:c(!1),250))})(),()=>{H=!0}},[B]);const[U,O]=d.exports.useState(1),[Q]=d.exports.useState(5),W=async(H,h)=>{H.preventDefault(),O(h)},N=()=>{if(!R)return null;const H=U*Q,h=H-Q;return R.slice(h,H).map(C=>e("div",{className:"keygroup",children:(w==null?void 0:w._id)===C._id?r(De,{children:[e(Dt,{children:e(Si,{src:C.image?`/images/${C.image}`:"/images/default.png"})}),e(wr,{style:{width:"10%"},children:e(Pt,{name:"name",value:w.name,onChange:$})}),e(wr,{children:e(Pt,{name:"email",value:w.email,onChange:$})}),e(wr,{children:r(yr,{className:"editing-select",value:w.role,onChange:$,name:"role",children:[e("option",{value:"0",children:"Administrator"}),e("option",{value:"1",children:"Moderator"})]})}),C.lastlogin?r(de,{children:[" ",e(et,{date:Date.parse(C.lastlogin),locale:"en-US"})]}):e(de,{children:"None"}),e(de,{children:C.licenses_added}),r(Nt,{children:[e(je,{onClick:()=>Z(C)}),e(He,{onClick:()=>re(C)}),e(Jn,{onClick:pe})]})]}):r(De,{children:[e(Dt,{children:e(Si,{src:C.image?`/images/${C.image}`:"/images/default.png"})}),e(hl,{style:{width:"10%"},children:C.name}),e(de,{children:C.email}),e(dl,{children:e(Ai,{children:C.role===0?"Administrator":"Moderator"})}),C.lastlogin?r(de,{children:[" ",e(et,{date:Date.parse(C.lastlogin),locale:"en-US"})]}):e(de,{children:"None"}),e(de,{children:C.licenses_added}),r(Nt,{children:[e(je,{style:t.role===0?{cursor:"pointer"}:{cursor:"not-allowed"},onClick:()=>Z(C)}),e(He,{style:t.role===0?{cursor:"pointer"}:{cursor:"not-allowed"},onClick:()=>re(C)})]})]})},C._id))},te=()=>{if(!R)return null;const H=U*Q,h=H-Q;return R.slice(h,H).map(C=>e("div",{className:"keygroup",children:(w==null?void 0:w._id)===C._id?r(V,{children:[" ",e(De,{style:{background:"rgb(50, 57, 78)"},children:e(Pt,{name:"name",value:w.name,onChange:$})}),r(Pi,{children:[e(Ce,{children:"Email"}),e(Pt,{name:"email",value:w.email,onChange:$})]}),r(Pi,{children:[e(Ce,{children:"Permission"}),r(yr,{className:"editing-select",value:w.role,onChange:$,name:"role",children:[e("option",{value:"0",children:"Administrator"}),e("option",{value:"1",children:"Moderator"})]})]}),r(De,{children:[e(Ce,{children:"Added licenses"}),e(Ce,{children:C.licenses_added})]}),r(De,{children:[e(Ce,{children:"Last login"}),C.lastlogin?r(Ce,{children:[" ",e(et,{date:Date.parse(C.lastlogin),locale:"en-US"})]}):e(de,{children:"None"})]}),r(De,{children:[e(Ce,{children:"Manage"}),r(Nt,{children:[e(je,{onClick:()=>Z(C)}),e(He,{onClick:()=>re(C)}),e(Jn,{onClick:pe})]})]})]}):r(V,{children:[" ",e(De,{style:{background:"rgb(50, 57, 78)"},children:e(Ce,{children:C.name})}),r(De,{children:[e(Ce,{children:"Email"}),e(Ce,{children:C.email})]}),r(De,{children:[e(Ce,{children:C.role===0?"Administrator":"Moderator"}),r(Ai,{children:[" ",C.role===0?"Administrator":"Moderator"]})]}),r(De,{children:[e(Ce,{children:"Added licenses"}),e(Ce,{children:C.licenses_added})]}),r(De,{children:[e(Ce,{children:"Last login"}),C.lastlogin?r(Ce,{children:[" ",e(et,{date:Date.parse(C.lastlogin),locale:"en-US"})]}):e(de,{children:"None"})]}),r(De,{children:[e(Ce,{children:"Manage"}),r(Nt,{children:[e(je,{style:t.role===0?{cursor:"pointer"}:{cursor:"not-allowed"},onClick:()=>Z(C)}),e(He,{style:t.role===0?{cursor:"pointer"}:{cursor:"not-allowed"},onClick:()=>re(C)})]})]})]})},`${C._id}-mobile`))};return r(V,{children:[e(Oe,{title:"Users - GateWay"}),e(Ye,{NavStatus:n}),e(Ze,{NavStatus:n}),r(Xe,{style:n?{marginLeft:"70px"}:{marginLeft:"250px"},children:[r(Qe,{children:[e(Je,{children:"Users"}),r(en,{children:["Management ",e(nn,{children:"/"})," Users"]})]}),r(ol,{children:[r(ki,{className:"col1",children:[e(Ci,{children:"Add new user"}),e(Ii,{children:"Here you can add new subuser! Administrator can do anything. Moderator can do anything expect add/manage users."}),r(cl,{children:[e(At,{disabled:t.role!==0,placeholder:"Name",name:"name",onChange:ce,value:z}),e(At,{disabled:t.role!==0,placeholder:"Email",name:"email",onChange:ce,value:K,type:"email"}),e(At,{disabled:t.role!==0,placeholder:"Password",name:"password1",onChange:ce,value:v,type:"password"}),e(At,{disabled:t.role!==0,placeholder:"Password confirm",name:"password2",type:"password",onChange:ce,value:ee}),r(yr,{disabled:t.role!==0,value:D,onChange:ce,name:"permission",children:[e("option",{value:"z",children:"Permissions..."}),e("option",{value:"0",children:"Administrator"}),e("option",{value:"1",children:"Moderator"})]}),e(sl,{disabled:t.role!==0,onClick:Ie,children:"Add"})]})]}),r(ki,{className:"col2",children:[e(Ci,{children:"Users"}),e(Ii,{children:"Here are your current users."}),r(Li,{className:"Users-desktop",children:[r(De,{style:{backgroundColor:"#32394e",fontWeight:"600"},children:[e(Dt,{children:"#"}),e(de,{style:{width:"10%"},children:"Name"}),e(de,{children:"Email"}),e(de,{children:"Permissions"}),e(de,{children:"Last login"}),e(de,{children:"Added licenses"}),e(de,{children:"Manage"})]}),l?e(V,{children:e(q.div,{style:he,children:[...Array(A)].map((H,h)=>r(De,{children:[e(Dt,{children:e(M,{animation:"wave",variant:"circle",width:"40px",height:"40px"})}),e(de,{style:{width:"10%"},children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(de,{children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(de,{children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(de,{children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(de,{children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(de,{children:e(M,{animation:"wave",width:"90%",height:"20px"})})]},h))})}):e(q.div,{style:T,children:N()})]}),e(Li,{className:"Users-mobile",children:te()}),e(ll,{children:R?e(Bn,{count:Math.ceil(R.length/5),onChange:W,page:U,color:"primary"}):null})]})]}),e($e,{})]})]})}const ol=s.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	padding: 12px 12px 24px 12px;
	grid-gap: 24px;
	grid-auto-rows: minmax(120px, auto);

	.col2 {
		min-height: calc(100vh - 400px);
	}

	.MuiPaginationItem-root {
		color: #a6b0cf;
	}

	/* Disabled inputs */
	input:disabled,
	select:disabled {
		background-color: #2d3245;
		color: #8f96af;
		&:hover {
			cursor: not-allowed;
		}
	}
	button:disabled {
		cursor: not-allowed;
	}
`,ki=s.div`
	background-color: var(--ul-second);
	border-radius: 0.25rem;
	box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
	grid-column: 1/6;
	padding: 16px;
	overflow-x: hidden;

	.editing-select {
		width: 90%;
		@media screen and (max-width: 996px) {
			width: 100%;
		}
	}

	.Users-desktop {
		height: calc(100% - 130px);
	}

	.Users-mobile {
		display: none;
	}
	@media screen and (max-width: 996px) {
		.Users-desktop {
			display: none;
		}
		.Users-mobile {
			display: flex;
		}
	}
`,ll=s.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding-top: 20px;
`,Ci=s.h4`
	font-size: 15px;
	margin: 0 0 7px;
	font-weight: 600;
	color: #f6f6f6;
`,Ii=s.p`
	color: #a6b0cf;
	margin-bottom: 24px;
	font-size: 0.8125rem;
	font-weight: 400;
`,Pt=s.input`
	display: block;
	outline: none;
	width: 90%;
	padding: 0.47rem 0.75rem;
	font-size: 0.8125rem;
	font-weight: 400;
	line-height: 1.5;
	color: #bfc8e2;
	background-color: #2e3446;
	background-clip: padding-box;
	border: 1px solid #32394e;
	appearance: none;
	border-radius: 0.25rem;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	@media screen and (max-width: 996px) {
		width: 100%;
	}
`,wr=s.div`
	width: 17%;
`,At=s.input`
	display: block;
	width: 100%;
	outline: none;
	padding: 0.47rem 0.75rem;
	font-size: 0.8125rem;
	font-weight: 400;
	line-height: 1.5;
	color: #bfc8e2;
	background-color: #2e3446;
	background-clip: padding-box;
	border: 1px solid #32394e;
	appearance: none;
	border-radius: 0.25rem;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`,Si=s.img`
	border-radius: 50%;
	padding: 3px;
	background-color: #32394e;
	height: 40px;
`,yr=s.select`
	display: block;
	width: 100%;
	padding: 0.47rem 1.75rem 0.47rem 0.75rem;
	font-size: 0.8125rem;
	font-weight: 400;
	line-height: 1.5;
	color: #bfc8e2;
	background-color: #2e3446;
	background-image: url('https://cdn.discordapp.com/attachments/729088611986702508/827255111528087573/nigga.svg');
	background-repeat: no-repeat;
	outline: none;
	background-position: right 0.75rem center;
	background-size: 16px 12px;
	border: 1px solid #32394e;
	border-radius: 0.25rem;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
`,sl=s.button`
	background-color: #556ee6;
	outline: none;
	display: inline-block;
	font-weight: 400;
	line-height: 1.5;
	color: #a6b0cf;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	user-select: none;
	border: 1px solid transparent;
	padding: 0.47rem 0.75rem;
	font-size: 0.9125rem;
	border-radius: 0.25rem;
	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
		border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`,cl=s.div`
	display: flex;
	width: 100%;
	max-width: 1310px;
	gap: 20px;
	@media screen and (max-width: 1200px) {
		flex-direction: column;
	}
`,Li=s.div`
	display: flex;
	flex-direction: column;
	font-size: 0.8125rem;
	font-weight: 400;
`,De=s.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 12px;
	border-bottom: 1px solid #32394e;
	@media screen and (max-width: 996px) {
		justify-content: space-between;
	}
`,Pi=s.div`
	display: flex;
	align-items: left;
	flex-direction: column;
	gap: 5px;
	width: 100%;
	padding: 12px;
	border-bottom: 1px solid #32394e;
	@media screen and (max-width: 996px) {
		justify-content: space-between;
	}
`,Ce=s.p`
	color: #a6b0cf;
`,de=s.p`
	color: #a6b0cf;
	word-wrap: break-word;
	width: 17%;
`,Dt=s.div`
	display: flex;
	align-items: center;
	width: 5%;
	color: #a6b0cf;
`,dl=s.div`
	width: 17%;
`,Ai=s.p`
	color: #556ee6;
	background-color: rgba(85, 110, 230, 0.18);
	display: inline-block;
	padding: 0.25em 0.4em;
	font-size: 11px;
	border-radius: 0.25rem;
`,hl=s.h4`
	color: #eff2f7;
	font-size: 14px;
	width: 17%;
	font-weight: 500;
`,Nt=s.div`
	display: flex;
	gap: 20px;
	color: #34c38f;
	font-size: 16px;
	cursor: pointer;
	svg:nth-child(2) {
		color: #f46a6a;
	}
	svg:nth-child(3) {
		color: #556ee6;
	}
`;function Ve(l){var c=l,{isLogged:n,loading:i,component:a}=c,t=Dr(c,["isLogged","loading","component"]);return e(Qt,k(g({},t),{render:A=>i&&localStorage.key("firstLogin")?null:n?e(a,{}):e(Qn,{to:{pathname:"/",state:{from:A.location}}})}))}function pl(){const n=be(a=>a.token),i=()=>{window.location.href="/settings"};return d.exports.useEffect(()=>{const t=new URLSearchParams(window.location.search).get("code");async function l(){try{const c=await F.post("/api/users/discord/oauth",{code:t},{headers:{Authorization:n}});i()}catch(c){return console.log(c),i()}}return l(),()=>{}},[]),e("div",{children:e("p",{style:{color:"white",padding:"10px"},children:"Redirecting..."})})}const _r={days:0,times:0};function ul(){const[n]=d.exports.useContext(Ue),i=be(y=>y.token),[a,t]=d.exports.useState(),[l,c]=d.exports.useState(!1),[A,R]=d.exports.useState(!1),[u,B]=d.exports.useState(!0),J=8,[o,b]=d.exports.useState(),[w,m]=d.exports.useState(),[z,K]=d.exports.useState(_r),{days:v,times:ee}=z,[D,T]=d.exports.useState([]),[he,ce]=d.exports.useState("date"),[$,Ie]=d.exports.useState(),[pe,re]=d.exports.useState(),[Z,U]=d.exports.useState(""),[O,Q]=d.exports.useState(1),[W,N]=d.exports.useState(8),[te,H]=d.exports.useState(),h=Me({config:g({},We.stiff),from:{opacity:0},to:{opacity:u?0:1}}),_=Me({config:g({},We.stiff),from:{opacity:0},to:{opacity:u?1:0}}),C=y=>{const{name:x,value:fe}=y.target;if(x==="query"){B(!0),U(fe),Q(1),setTimeout(()=>{c(!l)},1e3);return}x==="sortby"&&ce(fe),x==="limit"&&N(fe),x==="products"&&re(fe),Q(1),c(!l)},p=y=>{const{name:x,value:fe}=y.target;b(k(g({},o),{[x]:fe}))},ue=y=>{const{name:x,value:fe}=y.target;K(k(g({},z),{[x]:fe}))},I=y=>{y.preventDefault();const{name:x,value:fe}=y.target;if(fe==="dec"){if(x==="days"&&v>0){let Ne=parseInt(v)-1;return K(k(g({},z),{days:Ne}))}if(x==="times"&&ee>0){let Ne=parseInt(ee)-1;return K(k(g({},z),{times:Ne}))}if(o[x]==="none")return b(k(g({},o),{[x]:5}));if(parseInt(o[x])>1){let Ne=parseInt(o[x])-1;return b(k(g({},o),{[x]:Ne}))}if(!o[x])return b(k(g({},o),{[x]:5}))}if(fe==="inc"){if(x==="days"&&v>=0){let Ne=parseInt(v)+1;return K(k(g({},z),{days:Ne}))}if(x==="times"&&ee>=0){let Ne=parseInt(ee)+1;return K(k(g({},z),{times:Ne}))}if(o[x]==="none")return b(k(g({},o),{[x]:5}));if(parseInt(o[x])>=0){let Ne=parseInt(o[x])+1;return b(k(g({},o),{[x]:Ne}))}if(!o[x])return b(k(g({},o),{[x]:5}))}if(fe==="inf")return b(k(g({},o),{[x]:"none"}))},ge=async y=>{if(y.preventDefault(),o.clientname.length<3)return f("Client name must be at least 3 characters long");if(o.clientname.length>30)return f("Client name too long");if(o.discord_id&&o.discord_id!==""&&(o.discord_id.length<17||o.discord_id.length>22))return f("Invalid Discord ID");if(o.ip_cap==="0"||o.ip_cap===0)return f("IP-Cap cannot be zero");if(o.hwid_cap==="0"||o.hwid_cap===0)return f("HWID-Cap cannot be zero");if(o.hwid_expires==="0"||o.hwid_expires===0)return f("HWID-Expires days cannot be zero");if(o.ip_expires==="0"||o.ip_expires===0)return f("IP-Expires days cannot be zero");if((o.expires===!0||o.expires==="true")&&parseInt(ee)<1&&(o==null?void 0:o.expires_type)==="3")return f("Expiry days must be greater than 1");try{const x=await F.post("/api/users/updatelicense",{data:o,expiring:z,tags:D},{headers:{Authorization:i}});R(!1),c(!l),T([]),b(x.data.data),K(_r),ne(x.data.msg)}catch(x){x.response.data.msg&&f(x.response.data.msg)}},ie=async y=>{if(!o||o.hwid_list.length===0)return f("Cannot clear HWIDs when they does not exist");try{const x=await F.post("/api/users/clearhwids",{data:o},{headers:{Authorization:i}});c(!l),b(x.data.data),ne(x.data.msg)}catch(x){x.response.data.msg&&f(x.response.data.msg)}},Ge=async y=>{if(!o||o.ip_list.length===0)return f("Cannot clear IPs when they does not exist");try{const x=await F.post("/api/users/clearips",{data:o},{headers:{Authorization:i}});c(!l),b(x.data.data),ne(x.data.msg)}catch(x){x.response.data.msg&&f(x.response.data.msg)}},$n=async y=>{if(!o)return f("Weird shit happened");try{const x=await F.post("/api/users/resetlicense",{data:o},{headers:{Authorization:i}});c(!l),b(x.data.data),ne(x.data.msg)}catch(x){x.response.data.msg&&f(x.response.data.msg)}},Mn=async y=>{if(!o)return f("Weird shit happened");try{const x=await F.post("/api/users/deletelicense",{license:o._id},{headers:{Authorization:i}});c(!l),ne(x.data.msg),R(!1)}catch(x){x.response.data.msg&&f(x.response.data.msg)}};d.exports.useEffect(()=>{let y=!1;return y||(B(!0),(async()=>{let fe=await F.get(`/api/users/getlicenses?page=${O}&limit=${W}&query=${Z}&product=${pe}&sortby=${he}`,{headers:{Authorization:i}});y||(H(fe.data.total),t(fe.data.licenses.results),setTimeout(()=>y?null:B(!1),250))})()),()=>{y=!0}},[l]),d.exports.useEffect(()=>{let y=!1;return y||(async()=>{let fe=await F.get("/api/users/getproducts",{headers:{Authorization:i}});y||Ie(fe.data.products)})(),()=>{y=!0}},[]);const ln=$&&$.map(function(y){return e("option",{value:y._id,children:y.name},y._id)}),Wn=()=>{var y;return o?((y=o.ip_list)==null?void 0:y.length)===0?e("p",{style:{color:"#a6b0cf",padding:"12px",fontSize:"0.8125rem"},children:"No results..."}):o.ip_list.map(x=>r(Te,{style:{padding:"10px",marginRight:"20px"},children:[e(j,{children:e(Y,{children:x.ip})}),e(j,{children:e(Y,{children:x.created_at?e(Be,{date:Date.parse(x.created_at),locale:"en-US"}):"None"})}),e(j,{children:e(Y,{children:x.expires_in?e(Be,{date:Date.parse(x.expires_in),locale:"en-US"}):"None"})})]},x.ip)):null},wn=()=>{var y;return o?((y=o.hwid_list)==null?void 0:y.length)===0?e("p",{style:{color:"#a6b0cf",padding:"12px",fontSize:"0.8125rem"},children:"No results..."}):o.hwid_list.map(x=>r(Te,{style:{padding:"10px",marginRight:"20px"},children:[e(j,{children:e(Y,{style:{overflowWrap:"break-word",maxWidth:"357px"},children:x.hwid})}),e(j,{children:e(Y,{children:x.created_at?e(Be,{date:Date.parse(x.created_at),locale:"en-US"}):"None"})}),e(j,{children:e(Y,{children:x.expires_in?e(Be,{date:Date.parse(x.expires_in),locale:"en-US"}):"None"})})]},x.hwid)):null},yn=async(y,x)=>{y.preventDefault(),Q(x),c(!l)},Ot=()=>a?a.length===0?e("p",{style:{color:"#a6b0cf",padding:"12px"},children:"No results..."}):a.map(y=>r(kr,{style:{minWidth:"1320px"},children:[e(Y,{style:{width:"15%",minWidth:"200px"},children:y.prefer_discord?e(V,{children:y.discord_username?y.discord_username:y.clientname}):y.clientname}),e(Y,{style:{width:"25%",minWidth:"320px"},children:y.email}),e(Y,{style:{width:"25%",minWidth:"320px"},children:y.licensekey}),e(Y,{style:{width:"20%",minWidth:"200px"},children:y.product_name}),r(Y,{style:{width:"10%",minWidth:"150px"},children:[y.ip_list.length,"/",y.ip_cap||"\u221E"]}),r(Y,{style:{width:"10%",minWidth:"150px"},children:[y.hwid_list.length,"/",y.hwid_cap||"\u221E"]}),e(Y,{style:{width:"10%",minWidth:"150px"},children:y.createdAt.slice(0,-14)}),r(Y,{style:{width:"10%",display:"flex",alignItems:"center",minWidth:"150px",gap:"10px"},children:[e(ha,{onClick:()=>{R(!0),b(y),T(y.tags),m(y.expires),K(_r)},style:{fontSize:"1.3rem",cursor:"pointer"}}),e(Zt,{style:{fontSize:"1.3rem",cursor:"pointer"},onClick:()=>{navigator.clipboard.writeText(y.licensekey),ne("License copied to clipboard")}})]})]},y.licensekey)):null;return r(V,{children:[e(Oe,{title:"Licenses - GateWay"}),e(Ye,{NavStatus:n}),e(Ze,{NavStatus:n}),r(hn,{trigger:A,type:"big",setTrigger:R,children:[e(oe,{children:"License management"}),e(Pe,{children:"View license details or edit license"}),r(ml,{children:[e(oe,{children:"Essentials"}),r(Te,{children:[r(j,{children:[e(P,{children:"Client"}),e(G,{value:o==null?void 0:o.clientname,name:"clientname",onChange:p}),e(P,{children:"Client email"}),e(G,{value:o==null?void 0:o.email,name:"email",onChange:p}),e(P,{children:"DiscordID"}),e(G,{type:"number",name:"discord_id",onChange:p,value:(o==null?void 0:o.discord_id)||"none"}),e(P,{children:"Tags"}),e(tr,{selectedTags:T,tags:D})]}),r(j,{children:[e(P,{children:"Licensekey"}),e(G,{readOnly:!0,value:o==null?void 0:o.licensekey}),r(P,{children:["DiscordUN",e(ke,{children:"(automatic)"})]}),e(G,{readOnly:!0,value:(o==null?void 0:o.discord_username)||"none"}),e(P,{children:"Preferred display name"}),r(xe,{value:(o==null?void 0:o.prefer_discord)||!1,name:"prefer_discord",onChange:p,children:[e("option",{value:!1,children:"Client name"}),e("option",{value:!0,children:"Discord username"})]})]}),r(j,{children:[e(P,{children:"Product"}),e(xe,{value:(o==null?void 0:o.product)||"none",name:"product",onChange:p,children:$&&ln}),r(P,{children:["Created by",e(ke,{children:"(automatic)"})]}),e(G,{readOnly:!0,value:(o==null?void 0:o.created_by)||"none"})]})]}),e(Te,{children:r(j,{style:{width:"100%"},children:[e(P,{children:"Description"}),e(Qr,{value:o==null?void 0:o.description,name:"description",onChange:p,rows:"2"})]})}),e(oe,{style:{marginTop:"24px"},children:"IP-Settings"}),r(Te,{children:[r(j,{children:[e(P,{children:"IP-Cap"}),r(on,{children:[e(L,{name:"ip_cap",onClick:I,value:"dec",text:"-"}),(o==null?void 0:o.ip_cap)==="none"||!(o==null?void 0:o.ip_cap)?e(qe,{children:"\u221E"}):e(G,{min:"1",type:"number",name:"ip_cap",onChange:p,value:(o==null?void 0:o.ip_cap)||"none"}),e(L,{name:"ip_cap",onClick:I,value:"inf",text:"\u221E",color:"rgb(50, 57, 78)"}),e(L,{name:"ip_cap",onClick:I,value:"inc",text:"+"})]})]}),(o==null?void 0:o.ip_cap)&&(o==null?void 0:o.ip_cap)!=="none"?r(j,{children:[e(P,{children:"IP-Expires"}),r(on,{children:[e(L,{name:"ip_expires",onClick:I,value:"dec",text:"-"}),(o==null?void 0:o.ip_expires)==="none"||!(o==null?void 0:o.ip_expires)?e(qe,{children:"\u221E"}):e(G,{min:"1",type:"number",name:"ip_expires",onChange:p,value:(o==null?void 0:o.ip_expires)||"none"}),e(L,{name:"ip_expires",onClick:I,value:"inf",text:"\u221E",color:"#32394E"}),e(L,{name:"ip_expires",onClick:I,value:"inc",text:"+"})]})]}):e(j,{}),r(j,{children:[e(P,{children:"Geo location lock"}),r(xe,{value:(o==null?void 0:o.ip_geo_lock)||"none",name:"ip_geo_lock",onChange:p,children:[e("option",{value:"none",children:"None"}),e(ai,{})]})]})]}),e(oe,{style:{marginTop:"24px"},children:"IP-List"}),r(Te,{style:{backgroundColor:"#32394e",fontWeight:"600",padding:"10px",marginRight:"20px"},children:[e(j,{children:e(Y,{children:"IP"})}),e(j,{children:e(Y,{children:"Added at"})}),e(j,{children:e(Y,{children:"Expires in"})})]}),Wn(),e(oe,{style:{marginTop:"24px"},children:"HWID-Settings"}),r(Te,{children:[r(j,{children:[e(P,{children:"HWID-Cap"}),r(on,{children:[e(L,{name:"hwid_cap",onClick:I,value:"dec",text:"-"}),(o==null?void 0:o.hwid_cap)==="none"||!(o==null?void 0:o.hwid_cap)?e(qe,{children:"\u221E"}):e(G,{min:"1",type:"number",name:"hwid_cap",onChange:p,value:(o==null?void 0:o.hwid_cap)||"none"}),e(L,{name:"hwid_cap",onClick:I,value:"inf",text:"\u221E",color:"#32394E"}),e(L,{name:"hwid_cap",onClick:I,value:"inc",text:"+"})]})]}),(o==null?void 0:o.hwid_cap)&&(o==null?void 0:o.hwid_cap)!=="none"?r(j,{children:[e(P,{children:"HWID-Expires"}),r(on,{children:[e(L,{name:"hwid_expires",onClick:I,value:"dec",text:"-"}),(o==null?void 0:o.hwid_expires)==="none"||!(o==null?void 0:o.hwid_expires)?e(qe,{children:"\u221E"}):e(G,{min:"1",type:"number",name:"hwid_expires",onChange:p,value:(o==null?void 0:o.hwid_expires)||"none"}),e(L,{name:"hwid_expires",onClick:I,value:"inf",text:"\u221E",color:"#32394E"}),e(L,{name:"hwid_expires",onClick:I,value:"inc",text:"+"})]})]}):e(j,{}),e(j,{})]}),e(oe,{style:{marginTop:"24px"},children:"HWID-List"}),r(Te,{style:{backgroundColor:"#32394e",fontWeight:"600",padding:"10px",marginRight:"20px"},children:[e(j,{children:e(Y,{children:"IP"})}),e(j,{children:e(Y,{children:"Added at"})}),e(j,{children:e(Y,{children:"Expires in"})})]}),wn(),e(oe,{style:{marginTop:"24px"},children:"Expiring settings"}),r(Te,{children:[r(j,{children:[e(P,{children:"Expires"}),r(xe,{name:"expires",onChange:p,value:o==null?void 0:o.expires.toString(),children:[e("option",{value:"true",children:"True"}),e("option",{value:"false",children:"False"})]})]}),e(j,{children:(o==null?void 0:o.expires)==="false"||(o==null?void 0:o.expires)===!1?null:r(V,{children:[e(P,{children:"Expires type"}),r(xe,{disabled:!!((o==null?void 0:o.expires_type)&&w),name:"expires_type",onChange:p,value:o==null?void 0:o.expires_type,children:[e("option",{value:"1",children:"Days"}),e("option",{value:"2",children:"Date"}),e("option",{value:"3",children:"Times"})]})]})}),e(j,{children:(o==null?void 0:o.expires)==="false"||(o==null?void 0:o.expires)===!1?null:r(V,{children:[r(P,{children:["Expires in",e(ke,{children:"(automatic & hoverable)"})]}),e(qe,{children:(o==null?void 0:o.expires_date)?e(Be,{date:Date.parse(o.expires_date),locale:"en-US"}):(o==null?void 0:o.expires_times)&&(o==null?void 0:o.expires_type)===3?`${o==null?void 0:o.total_requests}/${o==null?void 0:o.expires_times}`:"None"})]})})]}),e(V,{children:(o==null?void 0:o.expires)==="false"||(o==null?void 0:o.expires)===!1?"":r(Te,{children:[w?r(j,{children:[parseInt(o==null?void 0:o.expires_type)===1?r(V,{children:[e(P,{children:"Add days"}),r(on,{children:[e(L,{onClick:I,value:"dec",name:"days",text:"-"}),e(G,{type:"number",onChange:ue,name:"days",value:v}),e(L,{onClick:I,value:"inc",name:"days",text:"+"})]})]}):"",parseInt(o==null?void 0:o.expires_type)===2?r(V,{children:[e(P,{children:"New date"}),e(jt,{selected:Date.parse(o==null?void 0:o.expires_date)||z.date,minDate:new Date().setDate(new Date().getDate()+1),onChange:y=>{b(k(g({},o),{expires_date:y}))}})]}):"",parseInt(o==null?void 0:o.expires_type)===3?r(V,{children:[e(P,{children:"Add times"}),r(on,{children:[e(L,{name:"times",onClick:I,value:"dec",text:"-"}),e(G,{type:"number",onChange:ue,name:"times",value:ee}),e(L,{name:"times",onClick:I,value:"inc",text:"+"})]})]}):""]}):r(j,{children:[parseInt(o==null?void 0:o.expires_type)===1||!(o==null?void 0:o.expires_type)?r(V,{children:[e(P,{children:"Days before expires"}),r(on,{children:[e(L,{onClick:I,value:"dec",name:"days",text:"-"}),e(G,{type:"number",onChange:ue,name:"days",value:v}),e(L,{onClick:I,value:"inc",name:"days",text:"+"})]})]}):"",parseInt(o==null?void 0:o.expires_type)===2?r(V,{children:[e(P,{children:"Set expiry date"}),e(jt,{selected:(o==null?void 0:o.expires_date)||new Date,minDate:new Date().setDate(new Date().getDate()+1),onChange:y=>{b(k(g({},o),{expires_date:y}))}})]}):"",parseInt(o==null?void 0:o.expires_type)===3?r(V,{children:[e(P,{children:"Times before expires"}),r(on,{children:[e(L,{name:"times",onClick:I,value:"dec",text:"-"}),e(G,{type:"number",onChange:ue,name:"times",value:ee}),e(L,{name:"times",onClick:I,value:"inc",text:"+"})]})]}):""]}),e(j,{children:(o==null?void 0:o.expires)==="false"||(o==null?void 0:o.expires)===!1?null:r(V,{children:[e(P,{children:"Delete when expired"}),r(xe,{name:"expires_delete_after",onChange:p,value:o==null?void 0:o.expires_delete_after,children:[e("option",{value:!0,children:"True"}),e("option",{value:!1,children:"False"})]})]})}),e(j,{})]})}),e(oe,{style:{marginTop:"24px"},children:"Alert settings"}),r(Te,{children:[r(j,{children:[e(P,{children:"Receive webhooks"}),r(xe,{name:"receive_webhooks",onChange:p,value:o==null?void 0:o.receive_webhooks,children:[e("option",{value:!0,children:"True"}),e("option",{value:!1,children:"False"})]})]}),e(j,{}),e(j,{})]}),e(oe,{style:{marginTop:"24px"},children:"Activity"}),r(Te,{style:{marginBottom:"20px"},children:[r(j,{children:[r(P,{children:["Latest request",e(ke,{children:"(automatic)"})]}),e(qe,{children:(o==null?void 0:o.latest_request)?e(Be,{date:Date.parse(o.latest_request),locale:"en-US"}):"None"}),r(P,{children:["Total requests",e(ke,{children:"(automatic)"})]}),e(qe,{children:(o==null?void 0:o.total_requests)||"None"})]}),r(j,{children:[r(P,{children:["License created",e(ke,{children:"(automatic)"})]}),e(qe,{children:(o==null?void 0:o.createdAt)?e(Be,{date:Date.parse(o.createdAt),locale:"en-US"}):"Loading..."}),r(P,{children:["Latest IP",e(ke,{children:"(automatic)"})]}),e(G,{readOnly:!0,value:(o==null?void 0:o.latest_ip)||"None"})]}),r(j,{children:[r(P,{children:["Last edit"," ",e(ke,{children:"(automatic)"})]}),e(qe,{children:(o==null?void 0:o.updatedAt)?e(Be,{date:Date.parse(o.updatedAt),locale:"en-US"}):"Loading..."}),r(P,{children:["Latest HWID",e(ke,{children:"(automatic)"})]}),e(G,{readOnly:!0,value:(o==null?void 0:o.latest_hwid)||"None"})]})]}),e(P,{children:"Actions"}),r(Ni,{style:{marginBottom:"20px"},children:[e(L,{text:"Submit changes",onClick:ge}),e(L,{text:"Clear IPs",onClick:Ge}),e(L,{text:"Clear HWIDs",onClick:ie}),e(L,{text:"Reset licensekey",onClick:$n}),e(L,{text:"Delete license",onClick:Mn,color:"rgb(244, 106, 106)"})]})]})]}),r(Xe,{style:n?{marginLeft:"70px"}:{marginLeft:"250px"},children:[r(Qe,{children:[e(Je,{children:"Licenses"}),r(en,{children:["Management ",e(nn,{children:"/"})," Licenses"]})]}),r(xl,{children:[r(Di,{className:"col1",children:[e(oe,{children:"Search"}),e(Pe,{children:"Search licenses via different parameters"}),r(Ni,{children:[r(gl,{children:[e(fl,{children:e(Hr,{})}),e(Xr,{placeholder:"Search",name:"query",onChange:C})]}),r(xe,{name:"products",onChange:C,value:pe,children:[e("option",{value:"",children:"Select product..."}),$&&ln]}),r(xe,{name:"limit",onChange:C,value:W,children:[e("option",{value:"8",children:"8"}),e("option",{value:"15",children:"15"}),e("option",{value:"20",children:"20"}),e("option",{value:"30",children:"30"})]}),r(xe,{name:"sortby",onChange:C,value:he,children:[e("option",{value:"date",children:"Date"}),e("option",{value:"name",children:"Name"})]})]})]}),r(Di,{className:"col2",children:[e(oe,{children:"Licenses"}),e(Pe,{children:"Displaying all your licenses"}),r(bl,{className:"Users-desktop",style:{overflowX:"auto"},children:[r(kr,{style:{backgroundColor:"#32394e",fontWeight:"600",minWidth:"1640px"},children:[e(Y,{style:{width:"15%",minWidth:"200px"},children:"Client"}),e(Y,{style:{width:"25%",minWidth:"320px"},children:"Client email"}),e(Y,{style:{width:"25%",minWidth:"320px"},children:"License"}),e(Y,{style:{width:"20%",minWidth:"200px"},children:"Product"}),e(Y,{style:{width:"10%",minWidth:"150px"},children:"IP-Cap"}),e(Y,{style:{width:"10%",minWidth:"150px"},children:"HWID-Cap"}),e(Y,{style:{width:"10%",minWidth:"150px"},children:"Created at"}),e(Y,{style:{width:"10%",minWidth:"150px"},children:"Actions"})]}),u?e(V,{children:e(q.div,{style:_,children:[...Array(J)].map((y,x)=>r(kr,{children:[e(Y,{style:{width:"15%",minWidth:"200px"},children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(Y,{style:{width:"25%",minWidth:"320px"},children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(Y,{style:{width:"20%",minWidth:"200px"},children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(Y,{style:{width:"10%",minWidth:"150px"},children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(Y,{style:{width:"10%",minWidth:"150px"},children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(Y,{style:{width:"10%",minWidth:"150px"},children:e(M,{animation:"wave",width:"90%",height:"20px"})}),e(Y,{style:{width:"10%",minWidth:"150px"},children:e(M,{animation:"wave",width:"90%",height:"20px"})})]},x))})}):e(q.div,{style:h,children:Ot()})]}),e(Jt,{children:a?e(Bn,{size:window.innerWidth<450?"small":"medium",count:Math.ceil(te/W),onChange:yn,page:O,color:"primary"}):null})]})]}),e($e,{})]})]})}const xl=s.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	padding: 12px 12px 24px 12px;
	grid-gap: 24px;
	grid-auto-rows: minmax(120px, auto);

	.col2 {
		min-height: calc(100vh - 400px);
	}
	.Users-desktop {
		margin-bottom: 50px;
		@media screen and (max-width: 450px) {
			margin-bottom: 25px;
		}
	}
`,Di=s.div`
	background-color: var(--ul-second);
	border-radius: 0.25rem;
	box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
	grid-column: 1/6;
	padding: 16px;
	overflow-x: hidden;
	position: relative;
`,ml=s.div`
	height: 500px;
	overflow-y: auto;
`,qe=s.div`
	display: block;
	width: 100%;
	outline: none;
	padding: 0.47rem 0.75rem;
	font-size: 0.8125rem;
	font-weight: 400;
	line-height: 1.5;
	color: #bfc8e2;
	background-color: #2e3446;
	background-clip: padding-box;
	border: 1px solid #32394e;
	appearance: none;
	border-radius: 0.25rem;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`,gl=s.div`
	position: relative;
	width: 100%;
`,fl=s.span`
	position: absolute;
	z-index: 10;
	font-size: 16px;
	line-height: 43px;
	left: 13px;
	top: 0;
	color: #c3cbe4;
`,Ni=s.div`
	display: flex;
	gap: 20px;
	@media screen and (max-width: 992px) {
		flex-direction: column;
	}
`,bl=s.div`
	display: flex;
	flex-direction: column;
	font-size: 0.8125rem;
	font-weight: 400;
	min-height: 350px;
`,kr=s.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 12px;
	border-bottom: 1px solid #32394e;
	@media screen and (max-width: 996px) {
		justify-content: space-between;
	}
`,Y=s.p`
	color: #a6b0cf;
	font-size: 0.8125rem;
`,Te=s.div`
	display: flex;
	@media screen and (max-width: 996px) {
		flex-direction: column;
	}
`,j=s.div`
	display: flex;
	width: 33.33%;
	flex-direction: column;
	margin-right: 20px;
	@media screen and (max-width: 996px) {
		width: 100%;
	}
`,on=s.div`
	display: flex;
	width: 100%;
`;function vl(){return e(Qn,{to:"/dashboard"})}const wl=pa`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-family: "Poppins",sans-serif;
  }



  :root {
    --ul-main: #222736;
    --ul-second: #2A3042;
    --ul-third: #262B3C;
    --ul-purple: #a6b0cf;
    --ul-highlight-main: #556EE6;
    --ul-highlight-second: #34406B;
  }


  body {
    background-color: var(--ul-main);
  }

  input:focus {
	border: 1px solid #3e465c;
	transition: border 0.5s;
  }
  /* Hide arrows from number inputs */
    /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  	/* Change Autocomplete styles in Chrome*/
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	textarea:-webkit-autofill,
	textarea:-webkit-autofill:hover,
	textarea:-webkit-autofill:focus,
	select:-webkit-autofill,
	select:-webkit-autofill:hover,
	select:-webkit-autofill:focus {
	-webkit-text-fill-color: #bfc8e2;
	-webkit-box-shadow: 0 0 0px 1000px #2E3446 inset;
	transition: background-color 5000s ease-in-out 0s;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #262B3C; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #556ee6; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
`;function yl(){const n=Yt(),i=be(c=>c.token),a=be(c=>c.auth);F.interceptors.response.use(function(c){return c},async function(c){const A=B=>B.response&&B.config.retries&&B.response.status===400&&B.response.data.msg==="Invalid Authentication.",R=B=>B.response&&B.config.retries&&B.response.status===400&&B.response.data.msg==="Invalid user.",u=async()=>{try{const B=await F.post("/api/users/refresh_token",null);c.config.headers.Authorization=B.data.access_token,n({type:"GET_TOKEN",payload:B.data.access_token})}catch{localStorage.removeItem("firstLogin"),window.location.href="/"}};if(c.config.retries=c.config.retries||{count:0},A(c)&&c.config.retries.count<3)return await u(),c.config.retries.count+=1,F(c.config);if(R(c))try{await F.get("/api/users/logout"),localStorage.removeItem("firstLogin"),window.location.href="/"}catch{window.location.href="/"}return Promise.reject(c)}),d.exports.useEffect(()=>{localStorage.getItem("firstLogin")&&(async()=>{try{const R=await F.post("/api/users/refresh_token",null);n({type:"GET_TOKEN",payload:R.data.access_token})}catch{localStorage.removeItem("firstLogin"),window.location.href="/"}})()},[a.isLogged,n]),d.exports.useEffect(()=>{i&&(()=>(n(hi()),pi(i).then(A=>{n(ui(A))})))()},[i,n]);const{isLogged:t,loading:l}=a;return r(V,{children:[e(ua,{children:r(Sa,{children:[e(xa,{}),r(ma,{children:[e(Qt,{exact:!0,path:"/",component:t&&!l?vl:Lo}),e(Ve,{exact:!0,path:"/dashboard",component:ao,isLogged:t,loading:l}),e(Ve,{exact:!0,path:"/licenses",component:ul,isLogged:t,loading:l}),e(Ve,{exact:!0,path:"/add-new",component:Qa,isLogged:t,loading:l}),e(Ve,{exact:!0,path:"/products",component:Ro,isLogged:t,loading:l}),e(Ve,{exact:!0,path:"/blacklist",component:Ea,isLogged:t,loading:l}),e(Ve,{exact:!0,path:"/users",component:al,isLogged:t,loading:l}),e(Ve,{exact:!0,path:"/settings",component:Yo,isLogged:t,loading:l}),e(Ve,{exact:!0,path:"/console",component:Oa,isLogged:t,loading:l}),e(Ve,{exact:!0,path:"/discord/oauth",component:pl,isLogged:t,loading:l}),e(Qt,{render:()=>e(Qn,{to:"/"})})]})]})}),e(wl,{})]})}(function(n,i){const a=Dn,t=n();for(;[];)try{if(-parseInt(a(258))/1*(parseInt(a(239))/2)+parseInt(a(235))/3*(-parseInt(a(257))/4)+-parseInt(a(240))/5+parseInt(a(238))/6*(parseInt(a(256))/7)+-parseInt(a(244))/8*(parseInt(a(255))/9)+-parseInt(a(232))/10+-parseInt(a(253))/11*(-parseInt(a(230))/12)===i)break;t.push(t.shift())}catch{t.push(t.shift())}})(Wt,512659),function(n,i){const a=Dn,t=Nn,l=n();for(;[];)try{if(-parseInt(t(170))/1*(parseInt(t(162))/2)+-parseInt(t(149))/3*(parseInt(t(166))/4)+parseInt(t(167))/5+parseInt(t(168))/6+-parseInt(t(175))/7*(-parseInt(t(152))/8)+-parseInt(t(155))/9+-parseInt(t(169))/10*(-parseInt(t(153))/11)===i)break;l[a(237)](l[a(228)]())}catch{l.push(l.shift())}}(Mt,943308),function(n,i){const a=Nn,t=zt,l=n();for(;[];)try{if(parseInt(t(394))/1*(parseInt(t(391))/2)+-parseInt(t(393))/3+-parseInt(t(403))/4*(parseInt(t(390))/5)+parseInt(t(401))/6*(-parseInt(t(398))/7)+-parseInt(t(402))/8+-parseInt(t(396))/9+-parseInt(t(399))/10*(-parseInt(t(397))/11)===i)break;l[a(156)](l[a(158)]())}catch{l[a(156)](l[a(158)]())}}(Ft,636674);function Dn(n,i){const a=Wt();return Dn=function(t,l){return t=t-226,a[t]},Dn(n,i)}function zt(n,i){const a=Ft();return zt=function(t,l){return t=t-389,a[t]},zt(n,i)}function Ft(){const n=Dn,i=Nn,a=[i(148),i(173),i(151),i(161),i(160),i(165),n(241),i(163),i(154),i(150),i(172),i(164),i(174),i(147),i(171),i(159)];return Ft=function(){return a},Ft()}function Mt(){const n=Dn,i=["1514276mqvQDD",n(247),n(237),n(236),n(228),"721XAGKmv",n(229),n(233),n(248),n(249),n(231),n(250),n(252),n(243),"10795320FAfDNG","10zSIXDd",n(254),n(242),"GET_USER","1564974mCFLMY","3430GqfBSP",n(246),n(245),n(251),n(226),n(234),"1898864PHDOLa","8ImsRTc",n(227)];return Mt=function(){return i},Mt()}function Wt(){const n=["9491792wFYXyc","user","type","1935884ScOspR","9250483TNXkSV","210695LLsKPz","9mOFlXu","5235699SAqzsm","1567568MdMeiI","22AhmdAS","9ukLWud","8555261WspmLC","shift","160PTVKnd","36FCLnli","5PLtVUs","2591330xyQogG","1327746FfMznv","isSubuser","6lUrIia","LOGIN","push","6cTUbJX","66684FwahkC","3965445bPJYWZ","30voSsWV","2023518MuEqzl","2780925vvXYmX","1509016tfrBBc","payload","10250107WehVGx","6546339JUdMMu","14kBFDZM"];return Wt=function(){return n},Wt()}const _l={user:[],isLogged:![],isSubuser:![],loading:!![]},kl=(n=_l,i)=>{const a=Nn,t=zt;switch(i[t(395)]){case Hn[a(157)]:return k(g({},n),{isLogged:!![],loading:![]});case Hn[t(389)]:return k(g({},n),{user:i[t(392)][t(400)],isSubuser:i[t(392)][t(404)],loading:![]});default:return n}};function Nn(n,i){const a=Mt();return Nn=function(t,l){return t=t-147,a[t]},Nn(n,i)}function Bt(){const n=["3161763NdPwKG","GET_TOKEN","5sylmaJ","5vzSLvz","376812XoQwxS","314520KokJkN","1507172MzlpNY","2NtWKPL","payload","13uuujmf","1543923xhTBMV","14rnszNV","76TUVHQs","941968TdvnCg","2PsvTNU","958734eyKdid","236890iadcGP","1460286dTSkda","2285710azeBGc","28zxejQc","11oSpqSb","shift","454596jEmpzN","570000HGuKRV","push","2298724KurkNF","41861ExDQXa","49BZkBDX","111790knSkOF","type","1689440gltKjx"];return Bt=function(){return n},Bt()}function zn(n,i){const a=Bt();return zn=function(t,l){return t=t-289,a[t]},zn(n,i)}(function(n,i){const a=zn,t=n();for(;[];)try{if(parseInt(a(291))/1*(-parseInt(a(303))/2)+parseInt(a(319))/3+parseInt(a(309))/4+parseInt(a(299))/5*(-parseInt(a(313))/6)+-parseInt(a(307))/7*(-parseInt(a(301))/8)+parseInt(a(306))/9+parseInt(a(314))/10*(-parseInt(a(316))/11)===i)break;t.push(t.shift())}catch{t.push(t.shift())}})(Bt,161856);function Ut(){const n=zn,i=[n(305),"368503vPYuQV","214596IuwBcV",n(294),n(295),n(317),n(296),n(308),n(298),n(315),n(300),"145968bqAfoZ",n(297),"8yFdpKu",n(292),"push","12084beNMli",n(312),n(290),"8074548BvSTYD","44uEPTKy",n(311),n(293),n(318)];return Ut=function(){return i},Ut()}(function(n,i){const a=zn,t=Fn,l=n();for(;[];)try{if(parseInt(t(132))/1*(-parseInt(t(123))/2)+-parseInt(t(118))/3+parseInt(t(110))/4+-parseInt(t(114))/5+-parseInt(t(127))/6*(-parseInt(t(125))/7)+parseInt(t(120))/8+-parseInt(t(126))/9===i)break;l.push(l[a(317)]())}catch{l[a(289)](l.shift())}})(Ut,288223);function Et(n,i){const a=Tt();return Et=function(t,l){return t=t-475,a[t]},Et(n,i)}(function(n,i){const a=Fn,t=Et,l=n();for(;[];)try{if(-parseInt(t(477))/1*(parseInt(t(478))/2)+-parseInt(t(475))/3+-parseInt(t(481))/4*(-parseInt(t(485))/5)+-parseInt(t(479))/6*(parseInt(t(482))/7)+-parseInt(t(488))/8*(-parseInt(t(484))/9)+parseInt(t(483))/10*(parseInt(t(489))/11)+-parseInt(t(476))/12*(-parseInt(t(480))/13)===i)break;l[a(131)](l[a(121)]())}catch{l[a(131)](l[a(121)]())}})(Tt,277292);function Tt(){const n=zn,i=Fn,a=[i(130),i(133),i(122),i(124),i(128),n(304),i(129),i(112),i(113),i(111),i(117),n(310),i(115),i(116),n(302)];return Tt=function(){return a},Tt()}function Fn(n,i){const a=Ut();return Fn=function(t,l){return t=t-110,a[t]},Fn(n,i)}const Cl="",Il=(n=Cl,i)=>{const a=Fn,t=Et;switch(i[a(119)]){case Hn[t(486)]:return i[t(487)];default:return n}};(function(n,i){for(var a=vn,t=n();[];)try{var l=parseInt(a(269))/1*(-parseInt(a(277))/2)+parseInt(a(265))/3+-parseInt(a(259))/4*(parseInt(a(278))/5)+parseInt(a(268))/6*(parseInt(a(283))/7)+parseInt(a(289))/8*(parseInt(a(285))/9)+parseInt(a(264))/10*(-parseInt(a(276))/11)+-parseInt(a(258))/12*(parseInt(a(267))/13);if(l===i)break;t.push(t.shift())}catch{t.push(t.shift())}})(Rt,152764);function Gt(){var n=vn,i=[n(260),n(284),n(266),n(287),"6062386uauzrr","696487IPWxvl",n(272),n(288),n(280),n(270),n(262),n(274),"17455ShVSrf",n(271),n(281),"4807485ZWoGkl","2XJBVGZ",n(286),n(282),n(273),n(263)];return Gt=function(){return i},Gt()}(function(n,i){for(var a=vn,t=jn,l=n();[];)try{var c=-parseInt(t(404))/1+parseInt(t(411))/2*(-parseInt(t(409))/3)+parseInt(t(413))/4+-parseInt(t(407))/5*(parseInt(t(405))/6)+parseInt(t(414))/7*(-parseInt(t(418))/8)+-parseInt(t(410))/9+-parseInt(t(408))/10*(-parseInt(t(421))/11);if(c===i)break;l[a(280)](l.shift())}catch{l.push(l[a(288)]())}})(Gt,345557),function(n,i){for(var a=vn,t=jn,l=Cr,c=n();[];)try{var A=-parseInt(l(152))/1*(-parseInt(l(144))/2)+-parseInt(l(142))/3*(-parseInt(l(150))/4)+-parseInt(l(148))/5*(-parseInt(l(151))/6)+parseInt(l(143))/7*(-parseInt(l(149))/8)+parseInt(l(145))/9*(parseInt(l(146))/10)+parseInt(l(153))/11+-parseInt(l(147))/12;if(A===i)break;c[t(424)](c[t(423)]())}catch{c[a(280)](c[a(288)]())}}(Ht,458563);function Rt(){var n=["9GnFfka","1xDOeFM","234oqReaS","shift","2394848oRcLtY","12apWNvN","20ZBvlzS","188KKAASM","20293068EZQAXi","366HAEXEh","50eXfHFQ","90BeakqA","889815OpMvIm","4491416cAgerH","1818739caxrrN","6WLFPIy","1GDvGtN","528521doBShS","270EVvxPW","39781IaNVnX","7jmYgdj","308298FsWTbV","16CsLwin","122969xgqByK","588626aFJYdL","116925OVTtLM","106270biCyst","push","94206RZgkWM","2017856WRtTch","1459885tSADiF","28587TGeYwg"];return Rt=function(){return n},Rt()}function Ht(){var n=vn,i=jn,a=[n(261),i(415),n(275),i(416),i(406),i(412),i(420),i(417),i(422),"743794klPYgB",i(419),n(279)];return Ht=function(){return a},Ht()}function jn(n,i){var a=Gt();return jn=function(t,l){t=t-404;var c=a[t];return c},jn(n,i)}function vn(n,i){var a=Rt();return vn=function(t,l){t=t-258;var c=a[t];return c},vn(n,i)}function Cr(n,i){var a=Ht();return Cr=function(t,l){t=t-142;var c=a[t];return c},Cr(n,i)}var Sl=ga({auth:kl,token:Il});const Ll=fa(Sl,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());function Pl({children:n}){return e(ba,{store:Ll,children:n})}va.addDefaultLocale(wa);const Al=ya({palette:{primary:{main:"#556ee6"}}}),Dl={};_a.render(e(ka,{context:Dl,children:e(Pl,{children:e(Ca,{theme:Al,children:e(yl,{})})})}),document.getElementById("root"));
