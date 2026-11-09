(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const du="173",Ip=0,Ku=1,Up=2,Pf=1,Fp=2,Pi=3,cr=0,Tn=1,Ii=2,ir=0,bs=1,ec=2,Zu=3,Ju=4,Np=5,Pr=100,Op=101,kp=102,zp=103,Bp=104,Hp=200,Gp=201,Vp=202,Wp=203,tc=204,nc=205,Xp=206,qp=207,$p=208,Yp=209,jp=210,Kp=211,Zp=212,Jp=213,Qp=214,ic=0,rc=1,sc=2,Ds=3,ac=4,oc=5,lc=6,cc=7,Df=0,em=1,tm=2,rr=0,nm=1,im=2,rm=3,sm=4,am=5,om=6,lm=7,Lf=300,Ls=301,Is=302,uc=303,dc=304,el=306,fc=1e3,Lr=1001,hc=1002,fi=1003,cm=1004,za=1005,_i=1006,cl=1007,Ir=1008,Bi=1009,If=1010,Uf=1011,ya=1012,fu=1013,Vr=1014,Fi=1015,La=1016,hu=1017,pu=1018,Us=1020,Ff=35902,Nf=1021,Of=1022,di=1023,kf=1024,zf=1025,Ss=1026,Fs=1027,Bf=1028,mu=1029,Hf=1030,gu=1031,_u=1033,Mo=33776,Eo=33777,To=33778,wo=33779,pc=35840,mc=35841,gc=35842,_c=35843,vc=36196,xc=37492,yc=37496,bc=37808,Sc=37809,Mc=37810,Ec=37811,Tc=37812,wc=37813,Ac=37814,Cc=37815,Rc=37816,Pc=37817,Dc=37818,Lc=37819,Ic=37820,Uc=37821,Ao=36492,Fc=36494,Nc=36495,Gf=36283,Oc=36284,kc=36285,zc=36286,um=3200,dm=3201,fm=0,hm=1,Zi="",Jn="srgb",Ns="srgb-linear",ko="linear",_t="srgb",Kr=7680,Qu=519,pm=512,mm=513,gm=514,Vf=515,_m=516,vm=517,xm=518,ym=519,ed=35044,td="300 es",Ni=2e3,zo=2001;class Ws{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ul=Math.PI/180,Bc=180/Math.PI;function Ia(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(nn[r&255]+nn[r>>8&255]+nn[r>>16&255]+nn[r>>24&255]+"-"+nn[e&255]+nn[e>>8&255]+"-"+nn[e>>16&15|64]+nn[e>>24&255]+"-"+nn[t&63|128]+nn[t>>8&255]+"-"+nn[t>>16&255]+nn[t>>24&255]+nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]).toLowerCase()}function st(r,e,t){return Math.max(e,Math.min(t,r))}function bm(r,e){return(r%e+e)%e}function dl(r,e,t){return(1-t)*r+t*e}function $s(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function bn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class St{constructor(e=0,t=0){St.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Je{constructor(e,t,n,i,s,a,o,l,c){Je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],h=n[5],_=n[8],g=i[0],p=i[3],m=i[6],T=i[1],E=i[4],x=i[7],A=i[2],R=i[5],w=i[8];return s[0]=a*g+o*T+l*A,s[3]=a*p+o*E+l*R,s[6]=a*m+o*x+l*w,s[1]=c*g+u*T+d*A,s[4]=c*p+u*E+d*R,s[7]=c*m+u*x+d*w,s[2]=f*g+h*T+_*A,s[5]=f*p+h*E+_*R,s[8]=f*m+h*x+_*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,f=o*l-u*s,h=c*s-a*l,_=t*d+n*f+i*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(i*c-u*n)*g,e[2]=(o*n-i*a)*g,e[3]=f*g,e[4]=(u*t-i*l)*g,e[5]=(i*s-o*t)*g,e[6]=h*g,e[7]=(n*l-c*t)*g,e[8]=(a*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(fl.makeScale(e,t)),this}rotate(e){return this.premultiply(fl.makeRotation(-e)),this}translate(e,t){return this.premultiply(fl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const fl=new Je;function Wf(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Bo(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Sm(){const r=Bo("canvas");return r.style.display="block",r}const nd={};function ps(r){r in nd||(nd[r]=!0,console.warn(r))}function Mm(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function Em(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Tm(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const id=new Je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),rd=new Je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wm(){const r={enabled:!0,workingColorSpace:Ns,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===_t&&(i.r=ki(i.r),i.g=ki(i.g),i.b=ki(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===_t&&(i.r=Ms(i.r),i.g=Ms(i.g),i.b=Ms(i.b))),i},fromWorkingColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},toWorkingColorSpace:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Zi?ko:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Ns]:{primaries:e,whitePoint:n,transfer:ko,toXYZ:id,fromXYZ:rd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Jn},outputColorSpaceConfig:{drawingBufferColorSpace:Jn}},[Jn]:{primaries:e,whitePoint:n,transfer:_t,toXYZ:id,fromXYZ:rd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Jn}}}),r}const dt=wm();function ki(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ms(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Zr;class Am{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Zr===void 0&&(Zr=Bo("canvas")),Zr.width=e.width,Zr.height=e.height;const n=Zr.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Zr}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Bo("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=ki(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ki(t[n]/255)*255):t[n]=ki(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Cm=0;class Xf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Cm++}),this.uuid=Ia(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(hl(i[a].image)):s.push(hl(i[a]))}else s=hl(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function hl(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Am.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Rm=0;class xn extends Ws{constructor(e=xn.DEFAULT_IMAGE,t=xn.DEFAULT_MAPPING,n=Lr,i=Lr,s=_i,a=Ir,o=di,l=Bi,c=xn.DEFAULT_ANISOTROPY,u=Zi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rm++}),this.uuid=Ia(),this.name="",this.source=new Xf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new St(0,0),this.repeat=new St(1,1),this.center=new St(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Lf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case fc:e.x=e.x-Math.floor(e.x);break;case Lr:e.x=e.x<0?0:1;break;case hc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case fc:e.y=e.y-Math.floor(e.y);break;case Lr:e.y=e.y<0?0:1;break;case hc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}xn.DEFAULT_IMAGE=null;xn.DEFAULT_MAPPING=Lf;xn.DEFAULT_ANISOTROPY=1;class Ft{constructor(e=0,t=0,n=0,i=1){Ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],_=l[9],g=l[2],p=l[6],m=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-g)<.01&&Math.abs(_-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+g)<.1&&Math.abs(_+p)<.1&&Math.abs(c+h+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,x=(h+1)/2,A=(m+1)/2,R=(u+f)/4,w=(d+g)/4,I=(_+p)/4;return E>x&&E>A?E<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(E),i=R/n,s=w/n):x>A?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=R/i,s=I/i):A<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(A),n=w/s,i=I/s),this.set(n,i,s,t),this}let T=Math.sqrt((p-_)*(p-_)+(d-g)*(d-g)+(f-u)*(f-u));return Math.abs(T)<.001&&(T=1),this.x=(p-_)/T,this.y=(d-g)/T,this.z=(f-u)/T,this.w=Math.acos((c+h+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Pm extends Ws{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ft(0,0,e,t),this.scissorTest=!1,this.viewport=new Ft(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_i,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new xn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const t=Object.assign({},e.texture.image);return this.texture.source=new Xf(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wr extends Pm{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class qf extends xn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=fi,this.minFilter=fi,this.wrapR=Lr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Dm extends xn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=fi,this.minFilter=fi,this.wrapR=Lr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ua{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3];const f=s[a+0],h=s[a+1],_=s[a+2],g=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=f,e[t+1]=h,e[t+2]=_,e[t+3]=g;return}if(d!==g||l!==f||c!==h||u!==_){let p=1-o;const m=l*f+c*h+u*_+d*g,T=m>=0?1:-1,E=1-m*m;if(E>Number.EPSILON){const A=Math.sqrt(E),R=Math.atan2(A,m*T);p=Math.sin(p*R)/A,o=Math.sin(o*R)/A}const x=o*T;if(l=l*p+f*x,c=c*p+h*x,u=u*p+_*x,d=d*p+g*x,p===1-o){const A=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=A,c*=A,u*=A,d*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[a],f=s[a+1],h=s[a+2],_=s[a+3];return e[t]=o*_+u*d+l*h-c*f,e[t+1]=l*_+u*f+c*d-o*h,e[t+2]=c*_+u*h+o*f-l*d,e[t+3]=u*_-o*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(i/2),d=o(s/2),f=l(n/2),h=l(i/2),_=l(s/2);switch(a){case"XYZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"YXZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"ZXY":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"ZYX":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"YZX":this._x=f*u*d+c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d-f*h*_;break;case"XZY":this._x=f*u*d-c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d+f*h*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+o+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(a-i)*h}else if(n>o&&n>d){const h=2*Math.sqrt(1+n-o-d);this._w=(u-l)/h,this._x=.25*h,this._y=(i+a)/h,this._z=(s+c)/h}else if(o>d){const h=2*Math.sqrt(1+o-n-d);this._w=(s-c)/h,this._x=(i+a)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-n-o);this._w=(a-i)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+i*c-s*l,this._y=i*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-i*o,this._w=a*u-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const h=1-t;return this._w=h*a+t*this._w,this._x=h*n+t*this._x,this._y=h*i+t*this._y,this._z=h*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=a*d+this._w*f,this._x=n*d+this._x*f,this._y=i*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class j{constructor(e=0,t=0,n=0){j.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(sd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(sd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),u=2*(o*t-s*i),d=2*(s*n-a*t);return this.x=t+l*c+a*d-o*u,this.y=n+l*u+o*c-s*d,this.z=i+l*d+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return pl.copy(this).projectOnVector(e),this.sub(pl)}reflect(e){return this.sub(pl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const pl=new j,sd=new Ua;class Fa{constructor(e=new j(1/0,1/0,1/0),t=new j(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ai.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ai.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=ai.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ai):ai.fromBufferAttribute(s,a),ai.applyMatrix4(e.matrixWorld),this.expandByPoint(ai);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ba.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ba.copy(n.boundingBox)),Ba.applyMatrix4(e.matrixWorld),this.union(Ba)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ai),ai.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ys),Ha.subVectors(this.max,Ys),Jr.subVectors(e.a,Ys),Qr.subVectors(e.b,Ys),es.subVectors(e.c,Ys),Wi.subVectors(Qr,Jr),Xi.subVectors(es,Qr),_r.subVectors(Jr,es);let t=[0,-Wi.z,Wi.y,0,-Xi.z,Xi.y,0,-_r.z,_r.y,Wi.z,0,-Wi.x,Xi.z,0,-Xi.x,_r.z,0,-_r.x,-Wi.y,Wi.x,0,-Xi.y,Xi.x,0,-_r.y,_r.x,0];return!ml(t,Jr,Qr,es,Ha)||(t=[1,0,0,0,1,0,0,0,1],!ml(t,Jr,Qr,es,Ha))?!1:(Ga.crossVectors(Wi,Xi),t=[Ga.x,Ga.y,Ga.z],ml(t,Jr,Qr,es,Ha))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ai).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ai).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ti=[new j,new j,new j,new j,new j,new j,new j,new j],ai=new j,Ba=new Fa,Jr=new j,Qr=new j,es=new j,Wi=new j,Xi=new j,_r=new j,Ys=new j,Ha=new j,Ga=new j,vr=new j;function ml(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){vr.fromArray(r,s);const o=i.x*Math.abs(vr.x)+i.y*Math.abs(vr.y)+i.z*Math.abs(vr.z),l=e.dot(vr),c=t.dot(vr),u=n.dot(vr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Lm=new Fa,js=new j,gl=new j;class tl{constructor(e=new j,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Lm.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;js.subVectors(e,this.center);const t=js.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(js,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(gl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(js.copy(e.center).add(gl)),this.expandByPoint(js.copy(e.center).sub(gl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const wi=new j,_l=new j,Va=new j,qi=new j,vl=new j,Wa=new j,xl=new j;class $f{constructor(e=new j,t=new j(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,wi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=wi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(wi.copy(this.origin).addScaledVector(this.direction,t),wi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){_l.copy(e).add(t).multiplyScalar(.5),Va.copy(t).sub(e).normalize(),qi.copy(this.origin).sub(_l);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Va),o=qi.dot(this.direction),l=-qi.dot(Va),c=qi.lengthSq(),u=Math.abs(1-a*a);let d,f,h,_;if(u>0)if(d=a*l-o,f=a*o-l,_=s*u,d>=0)if(f>=-_)if(f<=_){const g=1/u;d*=g,f*=g,h=d*(d+a*f+2*o)+f*(a*d+f+2*l)+c}else f=s,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*l)+c;else f<=-_?(d=Math.max(0,-(-a*s+o)),f=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c):f<=_?(d=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(d=Math.max(0,-(a*s+o)),f=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c);else f=a>0?-s:s,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(_l).addScaledVector(Va,f),h}intersectSphere(e,t){wi.subVectors(e.center,this.origin);const n=wi.dot(this.direction),i=wi.dot(wi)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),d>=0?(o=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,wi)!==null}intersectTriangle(e,t,n,i,s){vl.subVectors(t,e),Wa.subVectors(n,e),xl.crossVectors(vl,Wa);let a=this.direction.dot(xl),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;qi.subVectors(this.origin,e);const l=o*this.direction.dot(Wa.crossVectors(qi,Wa));if(l<0)return null;const c=o*this.direction.dot(vl.cross(qi));if(c<0||l+c>a)return null;const u=-o*qi.dot(xl);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ot{constructor(e,t,n,i,s,a,o,l,c,u,d,f,h,_,g,p){Ot.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,u,d,f,h,_,g,p)}set(e,t,n,i,s,a,o,l,c,u,d,f,h,_,g,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=d,m[14]=f,m[3]=h,m[7]=_,m[11]=g,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ot().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/ts.setFromMatrixColumn(e,0).length(),s=1/ts.setFromMatrixColumn(e,1).length(),a=1/ts.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=a*u,h=a*d,_=o*u,g=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+_*c,t[5]=f-g*c,t[9]=-o*l,t[2]=g-f*c,t[6]=_+h*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f+g*o,t[4]=_*o-h,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=h*o-_,t[6]=g+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f-g*o,t[4]=-a*d,t[8]=_+h*o,t[1]=h+_*o,t[5]=a*u,t[9]=g-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*u,h=a*d,_=o*u,g=o*d;t[0]=l*u,t[4]=_*c-h,t[8]=f*c+g,t[1]=l*d,t[5]=g*c+f,t[9]=h*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,h=a*c,_=o*l,g=o*c;t[0]=l*u,t[4]=g-f*d,t[8]=_*d+h,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=h*d+_,t[10]=f-g*d}else if(e.order==="XZY"){const f=a*l,h=a*c,_=o*l,g=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+g,t[5]=a*u,t[9]=h*d-_,t[2]=_*d-h,t[6]=o*u,t[10]=g*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Im,e,Um)}lookAt(e,t,n){const i=this.elements;return Un.subVectors(e,t),Un.lengthSq()===0&&(Un.z=1),Un.normalize(),$i.crossVectors(n,Un),$i.lengthSq()===0&&(Math.abs(n.z)===1?Un.x+=1e-4:Un.z+=1e-4,Un.normalize(),$i.crossVectors(n,Un)),$i.normalize(),Xa.crossVectors(Un,$i),i[0]=$i.x,i[4]=Xa.x,i[8]=Un.x,i[1]=$i.y,i[5]=Xa.y,i[9]=Un.y,i[2]=$i.z,i[6]=Xa.z,i[10]=Un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],h=n[13],_=n[2],g=n[6],p=n[10],m=n[14],T=n[3],E=n[7],x=n[11],A=n[15],R=i[0],w=i[4],I=i[8],b=i[12],v=i[1],L=i[5],N=i[9],B=i[13],q=i[2],K=i[6],$=i[10],X=i[14],H=i[3],ae=i[7],y=i[11],P=i[15];return s[0]=a*R+o*v+l*q+c*H,s[4]=a*w+o*L+l*K+c*ae,s[8]=a*I+o*N+l*$+c*y,s[12]=a*b+o*B+l*X+c*P,s[1]=u*R+d*v+f*q+h*H,s[5]=u*w+d*L+f*K+h*ae,s[9]=u*I+d*N+f*$+h*y,s[13]=u*b+d*B+f*X+h*P,s[2]=_*R+g*v+p*q+m*H,s[6]=_*w+g*L+p*K+m*ae,s[10]=_*I+g*N+p*$+m*y,s[14]=_*b+g*B+p*X+m*P,s[3]=T*R+E*v+x*q+A*H,s[7]=T*w+E*L+x*K+A*ae,s[11]=T*I+E*N+x*$+A*y,s[15]=T*b+E*B+x*X+A*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],_=e[3],g=e[7],p=e[11],m=e[15];return _*(+s*l*d-i*c*d-s*o*f+n*c*f+i*o*h-n*l*h)+g*(+t*l*h-t*c*f+s*a*f-i*a*h+i*c*u-s*l*u)+p*(+t*c*d-t*o*h-s*a*d+n*a*h+s*o*u-n*c*u)+m*(-i*o*u-t*l*d+t*o*f+i*a*d-n*a*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],_=e[12],g=e[13],p=e[14],m=e[15],T=d*p*c-g*f*c+g*l*h-o*p*h-d*l*m+o*f*m,E=_*f*c-u*p*c-_*l*h+a*p*h+u*l*m-a*f*m,x=u*g*c-_*d*c+_*o*h-a*g*h-u*o*m+a*d*m,A=_*d*l-u*g*l-_*o*f+a*g*f+u*o*p-a*d*p,R=t*T+n*E+i*x+s*A;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/R;return e[0]=T*w,e[1]=(g*f*s-d*p*s-g*i*h+n*p*h+d*i*m-n*f*m)*w,e[2]=(o*p*s-g*l*s+g*i*c-n*p*c-o*i*m+n*l*m)*w,e[3]=(d*l*s-o*f*s-d*i*c+n*f*c+o*i*h-n*l*h)*w,e[4]=E*w,e[5]=(u*p*s-_*f*s+_*i*h-t*p*h-u*i*m+t*f*m)*w,e[6]=(_*l*s-a*p*s-_*i*c+t*p*c+a*i*m-t*l*m)*w,e[7]=(a*f*s-u*l*s+u*i*c-t*f*c-a*i*h+t*l*h)*w,e[8]=x*w,e[9]=(_*d*s-u*g*s-_*n*h+t*g*h+u*n*m-t*d*m)*w,e[10]=(a*g*s-_*o*s+_*n*c-t*g*c-a*n*m+t*o*m)*w,e[11]=(u*o*s-a*d*s-u*n*c+t*d*c+a*n*h-t*o*h)*w,e[12]=A*w,e[13]=(u*g*i-_*d*i+_*n*f-t*g*f-u*n*p+t*d*p)*w,e[14]=(_*o*i-a*g*i-_*n*l+t*g*l+a*n*p-t*o*p)*w,e[15]=(a*d*i-u*o*i+u*n*l-t*d*l-a*n*f+t*o*f)*w,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+n,u*l-i*a,0,c*l-i*o,u*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,d=o+o,f=s*c,h=s*u,_=s*d,g=a*u,p=a*d,m=o*d,T=l*c,E=l*u,x=l*d,A=n.x,R=n.y,w=n.z;return i[0]=(1-(g+m))*A,i[1]=(h+x)*A,i[2]=(_-E)*A,i[3]=0,i[4]=(h-x)*R,i[5]=(1-(f+m))*R,i[6]=(p+T)*R,i[7]=0,i[8]=(_+E)*w,i[9]=(p-T)*w,i[10]=(1-(f+g))*w,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=ts.set(i[0],i[1],i[2]).length();const a=ts.set(i[4],i[5],i[6]).length(),o=ts.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],oi.copy(this);const c=1/s,u=1/a,d=1/o;return oi.elements[0]*=c,oi.elements[1]*=c,oi.elements[2]*=c,oi.elements[4]*=u,oi.elements[5]*=u,oi.elements[6]*=u,oi.elements[8]*=d,oi.elements[9]*=d,oi.elements[10]*=d,t.setFromRotationMatrix(oi),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=Ni){const l=this.elements,c=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let h,_;if(o===Ni)h=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===zo)h=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=Ni){const l=this.elements,c=1/(t-e),u=1/(n-i),d=1/(a-s),f=(t+e)*c,h=(n+i)*u;let _,g;if(o===Ni)_=(a+s)*d,g=-2*d;else if(o===zo)_=s*d,g=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ts=new j,oi=new Ot,Im=new j(0,0,0),Um=new j(1,1,1),$i=new j,Xa=new j,Un=new j,ad=new Ot,od=new Ua;class Hi{constructor(e=0,t=0,n=0,i=Hi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],u=i[9],d=i[2],f=i[6],h=i[10];switch(t){case"XYZ":this._y=Math.asin(st(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-st(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(st(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-st(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(st(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ad.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ad,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return od.setFromEuler(this),this.setFromQuaternion(od,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Hi.DEFAULT_ORDER="XYZ";class Yf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Fm=0;const ld=new j,ns=new Ua,Ai=new Ot,qa=new j,Ks=new j,Nm=new j,Om=new Ua,cd=new j(1,0,0),ud=new j(0,1,0),dd=new j(0,0,1),fd={type:"added"},km={type:"removed"},is={type:"childadded",child:null},yl={type:"childremoved",child:null};class wn extends Ws{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Fm++}),this.uuid=Ia(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wn.DEFAULT_UP.clone();const e=new j,t=new Hi,n=new Ua,i=new j(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ot},normalMatrix:{value:new Je}}),this.matrix=new Ot,this.matrixWorld=new Ot,this.matrixAutoUpdate=wn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ns.setFromAxisAngle(e,t),this.quaternion.multiply(ns),this}rotateOnWorldAxis(e,t){return ns.setFromAxisAngle(e,t),this.quaternion.premultiply(ns),this}rotateX(e){return this.rotateOnAxis(cd,e)}rotateY(e){return this.rotateOnAxis(ud,e)}rotateZ(e){return this.rotateOnAxis(dd,e)}translateOnAxis(e,t){return ld.copy(e).applyQuaternion(this.quaternion),this.position.add(ld.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(cd,e)}translateY(e){return this.translateOnAxis(ud,e)}translateZ(e){return this.translateOnAxis(dd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ai.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?qa.copy(e):qa.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ai.lookAt(Ks,qa,this.up):Ai.lookAt(qa,Ks,this.up),this.quaternion.setFromRotationMatrix(Ai),i&&(Ai.extractRotation(i.matrixWorld),ns.setFromRotationMatrix(Ai),this.quaternion.premultiply(ns.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(fd),is.child=e,this.dispatchEvent(is),is.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(km),yl.child=e,this.dispatchEvent(yl),yl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ai),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(fd),is.child=e,this.dispatchEvent(is),is.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,e,Nm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,Om,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),f=a(e.skeletons),h=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),_.length>0&&(n.nodes=_)}return n.object=i,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}wn.DEFAULT_UP=new j(0,1,0);wn.DEFAULT_MATRIX_AUTO_UPDATE=!0;wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const li=new j,Ci=new j,bl=new j,Ri=new j,rs=new j,ss=new j,hd=new j,Sl=new j,Ml=new j,El=new j,Tl=new Ft,wl=new Ft,Al=new Ft;class ui{constructor(e=new j,t=new j,n=new j){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),li.subVectors(e,t),i.cross(li);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){li.subVectors(i,t),Ci.subVectors(n,t),bl.subVectors(e,t);const a=li.dot(li),o=li.dot(Ci),l=li.dot(bl),c=Ci.dot(Ci),u=Ci.dot(bl),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const f=1/d,h=(c*l-o*u)*f,_=(a*u-o*l)*f;return s.set(1-h-_,_,h)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Ri)===null?!1:Ri.x>=0&&Ri.y>=0&&Ri.x+Ri.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,Ri)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ri.x),l.addScaledVector(a,Ri.y),l.addScaledVector(o,Ri.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return Tl.setScalar(0),wl.setScalar(0),Al.setScalar(0),Tl.fromBufferAttribute(e,t),wl.fromBufferAttribute(e,n),Al.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Tl,s.x),a.addScaledVector(wl,s.y),a.addScaledVector(Al,s.z),a}static isFrontFacing(e,t,n,i){return li.subVectors(n,t),Ci.subVectors(e,t),li.cross(Ci).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return li.subVectors(this.c,this.b),Ci.subVectors(this.a,this.b),li.cross(Ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ui.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ui.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return ui.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return ui.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ui.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;rs.subVectors(i,n),ss.subVectors(s,n),Sl.subVectors(e,n);const l=rs.dot(Sl),c=ss.dot(Sl);if(l<=0&&c<=0)return t.copy(n);Ml.subVectors(e,i);const u=rs.dot(Ml),d=ss.dot(Ml);if(u>=0&&d<=u)return t.copy(i);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(rs,a);El.subVectors(e,s);const h=rs.dot(El),_=ss.dot(El);if(_>=0&&h<=_)return t.copy(s);const g=h*c-l*_;if(g<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(n).addScaledVector(ss,o);const p=u*_-h*d;if(p<=0&&d-u>=0&&h-_>=0)return hd.subVectors(s,i),o=(d-u)/(d-u+(h-_)),t.copy(i).addScaledVector(hd,o);const m=1/(p+g+f);return a=g*m,o=f*m,t.copy(n).addScaledVector(rs,a).addScaledVector(ss,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const jf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yi={h:0,s:0,l:0},$a={h:0,s:0,l:0};function Cl(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class lt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Jn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,dt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=dt.workingColorSpace){if(e=bm(e,1),t=st(t,0,1),n=st(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Cl(a,s,e+1/3),this.g=Cl(a,s,e),this.b=Cl(a,s,e-1/3)}return dt.toWorkingColorSpace(this,i),this}setStyle(e,t=Jn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Jn){const n=jf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ki(e.r),this.g=ki(e.g),this.b=ki(e.b),this}copyLinearToSRGB(e){return this.r=Ms(e.r),this.g=Ms(e.g),this.b=Ms(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Jn){return dt.fromWorkingColorSpace(rn.copy(this),e),Math.round(st(rn.r*255,0,255))*65536+Math.round(st(rn.g*255,0,255))*256+Math.round(st(rn.b*255,0,255))}getHexString(e=Jn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.fromWorkingColorSpace(rn.copy(this),t);const n=rn.r,i=rn.g,s=rn.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=dt.workingColorSpace){return dt.fromWorkingColorSpace(rn.copy(this),t),e.r=rn.r,e.g=rn.g,e.b=rn.b,e}getStyle(e=Jn){dt.fromWorkingColorSpace(rn.copy(this),e);const t=rn.r,n=rn.g,i=rn.b;return e!==Jn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Yi),this.setHSL(Yi.h+e,Yi.s+t,Yi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Yi),e.getHSL($a);const n=dl(Yi.h,$a.h,t),i=dl(Yi.s,$a.s,t),s=dl(Yi.l,$a.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const rn=new lt;lt.NAMES=jf;let zm=0;class Na extends Ws{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zm++}),this.uuid=Ia(),this.name="",this.type="Material",this.blending=bs,this.side=cr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=tc,this.blendDst=nc,this.blendEquation=Pr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new lt(0,0,0),this.blendAlpha=0,this.depthFunc=Ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Kr,this.stencilZFail=Kr,this.stencilZPass=Kr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==bs&&(n.blending=this.blending),this.side!==cr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==tc&&(n.blendSrc=this.blendSrc),this.blendDst!==nc&&(n.blendDst=this.blendDst),this.blendEquation!==Pr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ds&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Kr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Kr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Kr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class vu extends Na{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hi,this.combine=Df,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const zt=new j,Ya=new St;let Bm=0;class Vn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Bm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ed,this.updateRanges=[],this.gpuType=Fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ya.fromBufferAttribute(this,t),Ya.applyMatrix3(e),this.setXY(t,Ya.x,Ya.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix3(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=$s(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=$s(t,this.array)),t}setX(e,t){return this.normalized&&(t=bn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=$s(t,this.array)),t}setY(e,t){return this.normalized&&(t=bn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=$s(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=$s(t,this.array)),t}setW(e,t){return this.normalized&&(t=bn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=bn(t,this.array),n=bn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=bn(t,this.array),n=bn(n,this.array),i=bn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=bn(t,this.array),n=bn(n,this.array),i=bn(i,this.array),s=bn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ed&&(e.usage=this.usage),e}}class Kf extends Vn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Zf extends Vn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class bi extends Vn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Hm=0;const Kn=new Ot,Rl=new wn,as=new j,Fn=new Fa,Zs=new Fa,jt=new j;class Ei extends Ws{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Hm++}),this.uuid=Ia(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wf(e)?Zf:Kf)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Je().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Kn.makeRotationFromQuaternion(e),this.applyMatrix4(Kn),this}rotateX(e){return Kn.makeRotationX(e),this.applyMatrix4(Kn),this}rotateY(e){return Kn.makeRotationY(e),this.applyMatrix4(Kn),this}rotateZ(e){return Kn.makeRotationZ(e),this.applyMatrix4(Kn),this}translate(e,t,n){return Kn.makeTranslation(e,t,n),this.applyMatrix4(Kn),this}scale(e,t,n){return Kn.makeScale(e,t,n),this.applyMatrix4(Kn),this}lookAt(e){return Rl.lookAt(e),Rl.updateMatrix(),this.applyMatrix4(Rl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(as).negate(),this.translate(as.x,as.y,as.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new bi(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new j(-1/0,-1/0,-1/0),new j(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Fn.setFromBufferAttribute(s),this.morphTargetsRelative?(jt.addVectors(this.boundingBox.min,Fn.min),this.boundingBox.expandByPoint(jt),jt.addVectors(this.boundingBox.max,Fn.max),this.boundingBox.expandByPoint(jt)):(this.boundingBox.expandByPoint(Fn.min),this.boundingBox.expandByPoint(Fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new tl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new j,1/0);return}if(e){const n=this.boundingSphere.center;if(Fn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Zs.setFromBufferAttribute(o),this.morphTargetsRelative?(jt.addVectors(Fn.min,Zs.min),Fn.expandByPoint(jt),jt.addVectors(Fn.max,Zs.max),Fn.expandByPoint(jt)):(Fn.expandByPoint(Zs.min),Fn.expandByPoint(Zs.max))}Fn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)jt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(jt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)jt.fromBufferAttribute(o,c),l&&(as.fromBufferAttribute(e,c),jt.add(as)),i=Math.max(i,n.distanceToSquared(jt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Vn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new j,l[I]=new j;const c=new j,u=new j,d=new j,f=new St,h=new St,_=new St,g=new j,p=new j;function m(I,b,v){c.fromBufferAttribute(n,I),u.fromBufferAttribute(n,b),d.fromBufferAttribute(n,v),f.fromBufferAttribute(s,I),h.fromBufferAttribute(s,b),_.fromBufferAttribute(s,v),u.sub(c),d.sub(c),h.sub(f),_.sub(f);const L=1/(h.x*_.y-_.x*h.y);isFinite(L)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-h.y).multiplyScalar(L),p.copy(d).multiplyScalar(h.x).addScaledVector(u,-_.x).multiplyScalar(L),o[I].add(g),o[b].add(g),o[v].add(g),l[I].add(p),l[b].add(p),l[v].add(p))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let I=0,b=T.length;I<b;++I){const v=T[I],L=v.start,N=v.count;for(let B=L,q=L+N;B<q;B+=3)m(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const E=new j,x=new j,A=new j,R=new j;function w(I){A.fromBufferAttribute(i,I),R.copy(A);const b=o[I];E.copy(b),E.sub(A.multiplyScalar(A.dot(b))).normalize(),x.crossVectors(R,b);const L=x.dot(l[I])<0?-1:1;a.setXYZW(I,E.x,E.y,E.z,L)}for(let I=0,b=T.length;I<b;++I){const v=T[I],L=v.start,N=v.count;for(let B=L,q=L+N;B<q;B+=3)w(e.getX(B+0)),w(e.getX(B+1)),w(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Vn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const i=new j,s=new j,a=new j,o=new j,l=new j,c=new j,u=new j,d=new j;if(e)for(let f=0,h=e.count;f<h;f+=3){const _=e.getX(f+0),g=e.getX(f+1),p=e.getX(f+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,p),u.subVectors(a,s),d.subVectors(i,s),u.cross(d),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,p),o.add(u),l.add(u),c.add(u),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,s),d.subVectors(i,s),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)jt.fromBufferAttribute(e,t),jt.normalize(),e.setXYZ(t,jt.x,jt.y,jt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,f=new c.constructor(l.length*u);let h=0,_=0;for(let g=0,p=l.length;g<p;g++){o.isInterleavedBufferAttribute?h=l[g]*o.data.stride+o.offset:h=l[g]*u;for(let m=0;m<u;m++)f[_++]=c[h++]}return new Vn(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ei,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,n);l.push(h)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const pd=new Ot,xr=new $f,ja=new tl,md=new j,Ka=new j,Za=new j,Ja=new j,Pl=new j,Qa=new j,gd=new j,eo=new j;class vi extends wn{constructor(e=new Ei,t=new vu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){Qa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],d=s[l];u!==0&&(Pl.fromBufferAttribute(d,e),a?Qa.addScaledVector(Pl,u):Qa.addScaledVector(Pl.sub(t),u))}t.add(Qa)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ja.copy(n.boundingSphere),ja.applyMatrix4(s),xr.copy(e.ray).recast(e.near),!(ja.containsPoint(xr.origin)===!1&&(xr.intersectSphere(ja,md)===null||xr.origin.distanceToSquared(md)>(e.far-e.near)**2))&&(pd.copy(s).invert(),xr.copy(e.ray).applyMatrix4(pd),!(n.boundingBox!==null&&xr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,xr)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=f.length;_<g;_++){const p=f[_],m=a[p.materialIndex],T=Math.max(p.start,h.start),E=Math.min(o.count,Math.min(p.start+p.count,h.start+h.count));for(let x=T,A=E;x<A;x+=3){const R=o.getX(x),w=o.getX(x+1),I=o.getX(x+2);i=to(this,m,e,n,c,u,d,R,w,I),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(o.count,h.start+h.count);for(let p=_,m=g;p<m;p+=3){const T=o.getX(p),E=o.getX(p+1),x=o.getX(p+2);i=to(this,a,e,n,c,u,d,T,E,x),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,g=f.length;_<g;_++){const p=f[_],m=a[p.materialIndex],T=Math.max(p.start,h.start),E=Math.min(l.count,Math.min(p.start+p.count,h.start+h.count));for(let x=T,A=E;x<A;x+=3){const R=x,w=x+1,I=x+2;i=to(this,m,e,n,c,u,d,R,w,I),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(l.count,h.start+h.count);for(let p=_,m=g;p<m;p+=3){const T=p,E=p+1,x=p+2;i=to(this,a,e,n,c,u,d,T,E,x),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function Gm(r,e,t,n,i,s,a,o){let l;if(e.side===Tn?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===cr,o),l===null)return null;eo.copy(o),eo.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(eo);return c<t.near||c>t.far?null:{distance:c,point:eo.clone(),object:r}}function to(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,Ka),r.getVertexPosition(l,Za),r.getVertexPosition(c,Ja);const u=Gm(r,e,t,n,Ka,Za,Ja,gd);if(u){const d=new j;ui.getBarycoord(gd,Ka,Za,Ja,d),i&&(u.uv=ui.getInterpolatedAttribute(i,o,l,c,d,new St)),s&&(u.uv1=ui.getInterpolatedAttribute(s,o,l,c,d,new St)),a&&(u.normal=ui.getInterpolatedAttribute(a,o,l,c,d,new j),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new j,materialIndex:0};ui.getNormal(Ka,Za,Ja,f.normal),u.face=f,u.barycoord=d}return u}class Oa extends Ei{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],d=[];let f=0,h=0;_("z","y","x",-1,-1,n,t,e,a,s,0),_("z","y","x",1,-1,n,t,-e,a,s,1),_("x","z","y",1,1,e,n,t,i,a,2),_("x","z","y",1,-1,e,n,-t,i,a,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new bi(c,3)),this.setAttribute("normal",new bi(u,3)),this.setAttribute("uv",new bi(d,2));function _(g,p,m,T,E,x,A,R,w,I,b){const v=x/w,L=A/I,N=x/2,B=A/2,q=R/2,K=w+1,$=I+1;let X=0,H=0;const ae=new j;for(let y=0;y<$;y++){const P=y*L-B;for(let re=0;re<K;re++){const de=re*v-N;ae[g]=de*T,ae[p]=P*E,ae[m]=q,c.push(ae.x,ae.y,ae.z),ae[g]=0,ae[p]=0,ae[m]=R>0?1:-1,u.push(ae.x,ae.y,ae.z),d.push(re/w),d.push(1-y/I),X+=1}}for(let y=0;y<I;y++)for(let P=0;P<w;P++){const re=f+P+K*y,de=f+P+K*(y+1),z=f+(P+1)+K*(y+1),J=f+(P+1)+K*y;l.push(re,de,J),l.push(de,z,J),H+=6}o.addGroup(h,H,b),h+=H,f+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oa(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Os(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function pn(r){const e={};for(let t=0;t<r.length;t++){const n=Os(r[t]);for(const i in n)e[i]=n[i]}return e}function Vm(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Jf(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:dt.workingColorSpace}const Wm={clone:Os,merge:pn};var Xm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ur extends Na{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Xm,this.fragmentShader=qm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Os(e.uniforms),this.uniformsGroups=Vm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Qf extends wn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ot,this.projectionMatrix=new Ot,this.projectionMatrixInverse=new Ot,this.coordinateSystem=Ni}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ji=new j,_d=new St,vd=new St;class Qn extends Qf{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Bc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ul*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bc*2*Math.atan(Math.tan(ul*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ji.x,ji.y).multiplyScalar(-e/ji.z),ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ji.x,ji.y).multiplyScalar(-e/ji.z)}getViewSize(e,t){return this.getViewBounds(e,_d,vd),t.subVectors(vd,_d)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ul*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const os=-90,ls=1;class $m extends wn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Qn(os,ls,e,t);i.layers=this.layers,this.add(i);const s=new Qn(os,ls,e,t);s.layers=this.layers,this.add(s);const a=new Qn(os,ls,e,t);a.layers=this.layers,this.add(a);const o=new Qn(os,ls,e,t);o.layers=this.layers,this.add(o);const l=new Qn(os,ls,e,t);l.layers=this.layers,this.add(l);const c=new Qn(os,ls,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Ni)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===zo)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class eh extends xn{constructor(e,t,n,i,s,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Ls,super(e,t,n,i,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ym extends Wr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new eh(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:_i}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Oa(5,5,5),s=new ur({name:"CubemapFromEquirect",uniforms:Os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Tn,blending:ir});s.uniforms.tEquirect.value=t;const a=new vi(i,s),o=t.minFilter;return t.minFilter===Ir&&(t.minFilter=_i),new $m(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}class no extends wn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const jm={type:"move"};class Dl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new no,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new no,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new j,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new j),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new no,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new j,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new j),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const g of e.hand.values()){const p=t.getJointPose(g,n),m=this._getHandJoint(c,g);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,_=.005;c.inputState.pinching&&f>h+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(jm)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new no;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Km extends wn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hi,this.environmentIntensity=1,this.environmentRotation=new Hi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Ll=new j,Zm=new j,Jm=new Je;class Tr{constructor(e=new j(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Ll.subVectors(n,t).cross(Zm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ll),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Jm.getNormalMatrix(e),i=this.coplanarPoint(Ll).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const yr=new tl,io=new j;class th{constructor(e=new Tr,t=new Tr,n=new Tr,i=new Tr,s=new Tr,a=new Tr){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ni){const n=this.planes,i=e.elements,s=i[0],a=i[1],o=i[2],l=i[3],c=i[4],u=i[5],d=i[6],f=i[7],h=i[8],_=i[9],g=i[10],p=i[11],m=i[12],T=i[13],E=i[14],x=i[15];if(n[0].setComponents(l-s,f-c,p-h,x-m).normalize(),n[1].setComponents(l+s,f+c,p+h,x+m).normalize(),n[2].setComponents(l+a,f+u,p+_,x+T).normalize(),n[3].setComponents(l-a,f-u,p-_,x-T).normalize(),n[4].setComponents(l-o,f-d,p-g,x-E).normalize(),t===Ni)n[5].setComponents(l+o,f+d,p+g,x+E).normalize();else if(t===zo)n[5].setComponents(o,d,g,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),yr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),yr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(yr)}intersectsSprite(e){return yr.center.set(0,0,0),yr.radius=.7071067811865476,yr.applyMatrix4(e.matrixWorld),this.intersectsSphere(yr)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(io.x=i.normal.x>0?e.max.x:e.min.x,io.y=i.normal.y>0?e.max.y:e.min.y,io.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(io)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class nh extends Na{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new lt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const xd=new Ot,Hc=new $f,ro=new tl,so=new j;class Qm extends wn{constructor(e=new Ei,t=new nh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ro.copy(n.boundingSphere),ro.applyMatrix4(i),ro.radius+=s,e.ray.intersectsSphere(ro)===!1)return;xd.copy(i).invert(),Hc.copy(e.ray).applyMatrix4(xd);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,a.start),h=Math.min(c.count,a.start+a.count);for(let _=f,g=h;_<g;_++){const p=c.getX(_);so.fromBufferAttribute(d,p),yd(so,p,l,i,e,t,this)}}else{const f=Math.max(0,a.start),h=Math.min(d.count,a.start+a.count);for(let _=f,g=h;_<g;_++)so.fromBufferAttribute(d,_),yd(so,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function yd(r,e,t,n,i,s,a){const o=Hc.distanceSqToPoint(r);if(o<t){const l=new j;Hc.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class eg extends xn{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ih extends xn{constructor(e,t,n,i,s,a,o,l,c,u=Ss){if(u!==Ss&&u!==Fs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Ss&&(n=Vr),n===void 0&&u===Fs&&(n=Us),super(null,i,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:fi,this.minFilter=l!==void 0?l:fi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class nl extends Ei{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,u=l+1,d=e/o,f=t/l,h=[],_=[],g=[],p=[];for(let m=0;m<u;m++){const T=m*f-a;for(let E=0;E<c;E++){const x=E*d-s;_.push(x,-T,0),g.push(0,0,1),p.push(E/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let T=0;T<o;T++){const E=T+c*m,x=T+c*(m+1),A=T+1+c*(m+1),R=T+1+c*m;h.push(E,x,R),h.push(x,A,R)}this.setIndex(h),this.setAttribute("position",new bi(_,3)),this.setAttribute("normal",new bi(g,3)),this.setAttribute("uv",new bi(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nl(e.width,e.height,e.widthSegments,e.heightSegments)}}class xu extends Ei{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],u=new j,d=new j,f=new j;for(let h=0;h<=n;h++)for(let _=0;_<=i;_++){const g=_/i*s,p=h/n*Math.PI*2;d.x=(e+t*Math.cos(p))*Math.cos(g),d.y=(e+t*Math.cos(p))*Math.sin(g),d.z=t*Math.sin(p),o.push(d.x,d.y,d.z),u.x=e*Math.cos(g),u.y=e*Math.sin(g),f.subVectors(d,u).normalize(),l.push(f.x,f.y,f.z),c.push(_/i),c.push(h/n)}for(let h=1;h<=n;h++)for(let _=1;_<=i;_++){const g=(i+1)*h+_-1,p=(i+1)*(h-1)+_-1,m=(i+1)*(h-1)+_,T=(i+1)*h+_;a.push(g,p,T),a.push(p,m,T)}this.setIndex(a),this.setAttribute("position",new bi(o,3)),this.setAttribute("normal",new bi(l,3)),this.setAttribute("uv",new bi(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xu(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class tg extends Na{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=um,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ng extends Na{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ig extends Qf{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class rg extends Qn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class sg{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=bd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=bd();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function bd(){return performance.now()}function Sd(r,e,t,n){const i=ag(n);switch(t){case Nf:return r*e;case kf:return r*e;case zf:return r*e*2;case Bf:return r*e/i.components*i.byteLength;case mu:return r*e/i.components*i.byteLength;case Hf:return r*e*2/i.components*i.byteLength;case gu:return r*e*2/i.components*i.byteLength;case Of:return r*e*3/i.components*i.byteLength;case di:return r*e*4/i.components*i.byteLength;case _u:return r*e*4/i.components*i.byteLength;case Mo:case Eo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case To:case wo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case mc:case _c:return Math.max(r,16)*Math.max(e,8)/4;case pc:case gc:return Math.max(r,8)*Math.max(e,8)/2;case vc:case xc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case yc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case bc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Sc:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Mc:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Ec:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Tc:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case wc:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Ac:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Cc:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Rc:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Pc:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Dc:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Lc:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Ic:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Uc:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Ao:case Fc:case Nc:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Gf:case Oc:return Math.ceil(r/4)*Math.ceil(e/4)*8;case kc:case zc:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ag(r){switch(r){case Bi:case If:return{byteLength:1,components:1};case ya:case Uf:case La:return{byteLength:2,components:1};case hu:case pu:return{byteLength:2,components:4};case Vr:case fu:case Fi:return{byteLength:4,components:1};case Ff:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:du}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=du);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function rh(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function og(r){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,u),o.onUploadCallback();let h;if(c instanceof Float32Array)h=r.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?h=r.HALF_FLOAT:h=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=r.SHORT;else if(c instanceof Uint32Array)h=r.UNSIGNED_INT;else if(c instanceof Int32Array)h=r.INT;else if(c instanceof Int8Array)h=r.BYTE;else if(c instanceof Uint8Array)h=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,o),d.length===0)r.bufferSubData(c,0,u);else{d.sort((h,_)=>h.start-_.start);let f=0;for(let h=1;h<d.length;h++){const _=d[f],g=d[h];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,d[f]=g)}d.length=f+1;for(let h=0,_=d.length;h<_;h++){const g=d[h];r.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var lg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ug=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,mg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,_g=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,vg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,bg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Sg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Mg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Eg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Tg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ag=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Cg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Rg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Pg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Dg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Lg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ig=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ug=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Fg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ng=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Og=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,kg="gl_FragColor = linearToOutputTexel( gl_FragColor );",zg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Bg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Hg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Vg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Xg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,qg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$g=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Kg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,e_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,t_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,n_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,i_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,r_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,s_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,a_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,o_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,l_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,c_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,u_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,d_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,f_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,h_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,p_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,m_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,g_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,__=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,v_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,x_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,y_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,b_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,S_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,M_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,E_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,T_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,w_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,A_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,C_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,R_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,P_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,D_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,L_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,I_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,U_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,F_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,N_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,O_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,k_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,z_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,B_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,H_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,G_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,V_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,W_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,X_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,q_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,$_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Y_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,j_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,K_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Z_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,J_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Q_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ev=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,tv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,nv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,iv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,av=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ov=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,uv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,pv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,mv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,gv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,_v=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Sv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ev=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,wv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Av=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Cv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Rv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Lv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Iv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Uv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Nv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ov=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,zv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qe={alphahash_fragment:lg,alphahash_pars_fragment:cg,alphamap_fragment:ug,alphamap_pars_fragment:dg,alphatest_fragment:fg,alphatest_pars_fragment:hg,aomap_fragment:pg,aomap_pars_fragment:mg,batching_pars_vertex:gg,batching_vertex:_g,begin_vertex:vg,beginnormal_vertex:xg,bsdfs:yg,iridescence_fragment:bg,bumpmap_pars_fragment:Sg,clipping_planes_fragment:Mg,clipping_planes_pars_fragment:Eg,clipping_planes_pars_vertex:Tg,clipping_planes_vertex:wg,color_fragment:Ag,color_pars_fragment:Cg,color_pars_vertex:Rg,color_vertex:Pg,common:Dg,cube_uv_reflection_fragment:Lg,defaultnormal_vertex:Ig,displacementmap_pars_vertex:Ug,displacementmap_vertex:Fg,emissivemap_fragment:Ng,emissivemap_pars_fragment:Og,colorspace_fragment:kg,colorspace_pars_fragment:zg,envmap_fragment:Bg,envmap_common_pars_fragment:Hg,envmap_pars_fragment:Gg,envmap_pars_vertex:Vg,envmap_physical_pars_fragment:e_,envmap_vertex:Wg,fog_vertex:Xg,fog_pars_vertex:qg,fog_fragment:$g,fog_pars_fragment:Yg,gradientmap_pars_fragment:jg,lightmap_pars_fragment:Kg,lights_lambert_fragment:Zg,lights_lambert_pars_fragment:Jg,lights_pars_begin:Qg,lights_toon_fragment:t_,lights_toon_pars_fragment:n_,lights_phong_fragment:i_,lights_phong_pars_fragment:r_,lights_physical_fragment:s_,lights_physical_pars_fragment:a_,lights_fragment_begin:o_,lights_fragment_maps:l_,lights_fragment_end:c_,logdepthbuf_fragment:u_,logdepthbuf_pars_fragment:d_,logdepthbuf_pars_vertex:f_,logdepthbuf_vertex:h_,map_fragment:p_,map_pars_fragment:m_,map_particle_fragment:g_,map_particle_pars_fragment:__,metalnessmap_fragment:v_,metalnessmap_pars_fragment:x_,morphinstance_vertex:y_,morphcolor_vertex:b_,morphnormal_vertex:S_,morphtarget_pars_vertex:M_,morphtarget_vertex:E_,normal_fragment_begin:T_,normal_fragment_maps:w_,normal_pars_fragment:A_,normal_pars_vertex:C_,normal_vertex:R_,normalmap_pars_fragment:P_,clearcoat_normal_fragment_begin:D_,clearcoat_normal_fragment_maps:L_,clearcoat_pars_fragment:I_,iridescence_pars_fragment:U_,opaque_fragment:F_,packing:N_,premultiplied_alpha_fragment:O_,project_vertex:k_,dithering_fragment:z_,dithering_pars_fragment:B_,roughnessmap_fragment:H_,roughnessmap_pars_fragment:G_,shadowmap_pars_fragment:V_,shadowmap_pars_vertex:W_,shadowmap_vertex:X_,shadowmask_pars_fragment:q_,skinbase_vertex:$_,skinning_pars_vertex:Y_,skinning_vertex:j_,skinnormal_vertex:K_,specularmap_fragment:Z_,specularmap_pars_fragment:J_,tonemapping_fragment:Q_,tonemapping_pars_fragment:ev,transmission_fragment:tv,transmission_pars_fragment:nv,uv_pars_fragment:iv,uv_pars_vertex:rv,uv_vertex:sv,worldpos_vertex:av,background_vert:ov,background_frag:lv,backgroundCube_vert:cv,backgroundCube_frag:uv,cube_vert:dv,cube_frag:fv,depth_vert:hv,depth_frag:pv,distanceRGBA_vert:mv,distanceRGBA_frag:gv,equirect_vert:_v,equirect_frag:vv,linedashed_vert:xv,linedashed_frag:yv,meshbasic_vert:bv,meshbasic_frag:Sv,meshlambert_vert:Mv,meshlambert_frag:Ev,meshmatcap_vert:Tv,meshmatcap_frag:wv,meshnormal_vert:Av,meshnormal_frag:Cv,meshphong_vert:Rv,meshphong_frag:Pv,meshphysical_vert:Dv,meshphysical_frag:Lv,meshtoon_vert:Iv,meshtoon_frag:Uv,points_vert:Fv,points_frag:Nv,shadow_vert:Ov,shadow_frag:kv,sprite_vert:zv,sprite_frag:Bv},Me={common:{diffuse:{value:new lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},envMapRotation:{value:new Je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new St(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new lt(16777215)},opacity:{value:1},center:{value:new St(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},mi={basic:{uniforms:pn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:pn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new lt(0)}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:pn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new lt(0)},specular:{value:new lt(1118481)},shininess:{value:30}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:pn([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:pn([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new lt(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:pn([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:pn([Me.points,Me.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:pn([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:pn([Me.common,Me.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:pn([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:pn([Me.sprite,Me.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Je}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distanceRGBA:{uniforms:pn([Me.common,Me.displacementmap,{referencePosition:{value:new j},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distanceRGBA_vert,fragmentShader:Qe.distanceRGBA_frag},shadow:{uniforms:pn([Me.lights,Me.fog,{color:{value:new lt(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};mi.physical={uniforms:pn([mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new St(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new St},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new lt(0)},specularColor:{value:new lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new St},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const ao={r:0,b:0,g:0},br=new Hi,Hv=new Ot;function Gv(r,e,t,n,i,s,a){const o=new lt(0);let l=s===!0?0:1,c,u,d=null,f=0,h=null;function _(E){let x=E.isScene===!0?E.background:null;return x&&x.isTexture&&(x=(E.backgroundBlurriness>0?t:e).get(x)),x}function g(E){let x=!1;const A=_(E);A===null?m(o,l):A&&A.isColor&&(m(A,1),x=!0);const R=r.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function p(E,x){const A=_(x);A&&(A.isCubeTexture||A.mapping===el)?(u===void 0&&(u=new vi(new Oa(1,1,1),new ur({name:"BackgroundCubeMaterial",uniforms:Os(mi.backgroundCube.uniforms),vertexShader:mi.backgroundCube.vertexShader,fragmentShader:mi.backgroundCube.fragmentShader,side:Tn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,w,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),br.copy(x.backgroundRotation),br.x*=-1,br.y*=-1,br.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(br.y*=-1,br.z*=-1),u.material.uniforms.envMap.value=A,u.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Hv.makeRotationFromEuler(br)),u.material.toneMapped=dt.getTransfer(A.colorSpace)!==_t,(d!==A||f!==A.version||h!==r.toneMapping)&&(u.material.needsUpdate=!0,d=A,f=A.version,h=r.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new vi(new nl(2,2),new ur({name:"BackgroundMaterial",uniforms:Os(mi.background.uniforms),vertexShader:mi.background.vertexShader,fragmentShader:mi.background.fragmentShader,side:cr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=dt.getTransfer(A.colorSpace)!==_t,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(d!==A||f!==A.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,d=A,f=A.version,h=r.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function m(E,x){E.getRGB(ao,Jf(r)),n.buffers.color.setClear(ao.r,ao.g,ao.b,x,a)}function T(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,x=1){o.set(E),l=x,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,m(o,l)},render:g,addToRenderList:p,dispose:T}}function Vv(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,a=!1;function o(v,L,N,B,q){let K=!1;const $=d(B,N,L);s!==$&&(s=$,c(s.object)),K=h(v,B,N,q),K&&_(v,B,N,q),q!==null&&e.update(q,r.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,x(v,L,N,B),q!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return r.createVertexArray()}function c(v){return r.bindVertexArray(v)}function u(v){return r.deleteVertexArray(v)}function d(v,L,N){const B=N.wireframe===!0;let q=n[v.id];q===void 0&&(q={},n[v.id]=q);let K=q[L.id];K===void 0&&(K={},q[L.id]=K);let $=K[B];return $===void 0&&($=f(l()),K[B]=$),$}function f(v){const L=[],N=[],B=[];for(let q=0;q<t;q++)L[q]=0,N[q]=0,B[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:N,attributeDivisors:B,object:v,attributes:{},index:null}}function h(v,L,N,B){const q=s.attributes,K=L.attributes;let $=0;const X=N.getAttributes();for(const H in X)if(X[H].location>=0){const y=q[H];let P=K[H];if(P===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(P=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(P=v.instanceColor)),y===void 0||y.attribute!==P||P&&y.data!==P.data)return!0;$++}return s.attributesNum!==$||s.index!==B}function _(v,L,N,B){const q={},K=L.attributes;let $=0;const X=N.getAttributes();for(const H in X)if(X[H].location>=0){let y=K[H];y===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(y=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(y=v.instanceColor));const P={};P.attribute=y,y&&y.data&&(P.data=y.data),q[H]=P,$++}s.attributes=q,s.attributesNum=$,s.index=B}function g(){const v=s.newAttributes;for(let L=0,N=v.length;L<N;L++)v[L]=0}function p(v){m(v,0)}function m(v,L){const N=s.newAttributes,B=s.enabledAttributes,q=s.attributeDivisors;N[v]=1,B[v]===0&&(r.enableVertexAttribArray(v),B[v]=1),q[v]!==L&&(r.vertexAttribDivisor(v,L),q[v]=L)}function T(){const v=s.newAttributes,L=s.enabledAttributes;for(let N=0,B=L.length;N<B;N++)L[N]!==v[N]&&(r.disableVertexAttribArray(N),L[N]=0)}function E(v,L,N,B,q,K,$){$===!0?r.vertexAttribIPointer(v,L,N,q,K):r.vertexAttribPointer(v,L,N,B,q,K)}function x(v,L,N,B){g();const q=B.attributes,K=N.getAttributes(),$=L.defaultAttributeValues;for(const X in K){const H=K[X];if(H.location>=0){let ae=q[X];if(ae===void 0&&(X==="instanceMatrix"&&v.instanceMatrix&&(ae=v.instanceMatrix),X==="instanceColor"&&v.instanceColor&&(ae=v.instanceColor)),ae!==void 0){const y=ae.normalized,P=ae.itemSize,re=e.get(ae);if(re===void 0)continue;const de=re.buffer,z=re.type,J=re.bytesPerElement,ie=z===r.INT||z===r.UNSIGNED_INT||ae.gpuType===fu;if(ae.isInterleavedBufferAttribute){const Y=ae.data,oe=Y.stride,Se=ae.offset;if(Y.isInstancedInterleavedBuffer){for(let _e=0;_e<H.locationSize;_e++)m(H.location+_e,Y.meshPerAttribute);v.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let _e=0;_e<H.locationSize;_e++)p(H.location+_e);r.bindBuffer(r.ARRAY_BUFFER,de);for(let _e=0;_e<H.locationSize;_e++)E(H.location+_e,P/H.locationSize,z,y,oe*J,(Se+P/H.locationSize*_e)*J,ie)}else{if(ae.isInstancedBufferAttribute){for(let Y=0;Y<H.locationSize;Y++)m(H.location+Y,ae.meshPerAttribute);v.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Y=0;Y<H.locationSize;Y++)p(H.location+Y);r.bindBuffer(r.ARRAY_BUFFER,de);for(let Y=0;Y<H.locationSize;Y++)E(H.location+Y,P/H.locationSize,z,y,P*J,P/H.locationSize*Y*J,ie)}}else if($!==void 0){const y=$[X];if(y!==void 0)switch(y.length){case 2:r.vertexAttrib2fv(H.location,y);break;case 3:r.vertexAttrib3fv(H.location,y);break;case 4:r.vertexAttrib4fv(H.location,y);break;default:r.vertexAttrib1fv(H.location,y)}}}}T()}function A(){I();for(const v in n){const L=n[v];for(const N in L){const B=L[N];for(const q in B)u(B[q].object),delete B[q];delete L[N]}delete n[v]}}function R(v){if(n[v.id]===void 0)return;const L=n[v.id];for(const N in L){const B=L[N];for(const q in B)u(B[q].object),delete B[q];delete L[N]}delete n[v.id]}function w(v){for(const L in n){const N=n[L];if(N[v.id]===void 0)continue;const B=N[v.id];for(const q in B)u(B[q].object),delete B[q];delete N[v.id]}}function I(){b(),a=!0,s!==i&&(s=i,c(s.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:I,resetDefaultState:b,dispose:A,releaseStatesOfGeometry:R,releaseStatesOfProgram:w,initAttributes:g,enableAttribute:p,disableUnusedAttributes:T}}function Wv(r,e,t){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,d){d!==0&&(r.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function o(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let h=0;for(let _=0;_<d;_++)h+=u[_];t.update(h,n,1)}function l(c,u,d,f){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let _=0;_<c.length;_++)a(c[_],u[_],f[_]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g]*f[g];t.update(_,n,1)}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Xv(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(w){return!(w!==di&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const I=w===La&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Bi&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Fi&&!I)}function l(w){if(w==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),p=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),T=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),E=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),A=_>0,R=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:h,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:T,maxVaryings:E,maxFragmentUniforms:x,vertexTextures:A,maxSamples:R}}function qv(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new Tr,o=new Je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||i;return i=f,n=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const _=d.clippingPlanes,g=d.clipIntersection,p=d.clipShadows,m=r.get(d);if(!i||_===null||_.length===0||s&&!p)s?u(null):c();else{const T=s?0:n,E=T*4;let x=m.clippingState||null;l.value=x,x=u(_,f,E,h);for(let A=0;A!==E;++A)x[A]=t[A];m.clippingState=x,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,_){const g=d!==null?d.length:0;let p=null;if(g!==0){if(p=l.value,_!==!0||p===null){const m=h+g*4,T=f.matrixWorldInverse;o.getNormalMatrix(T),(p===null||p.length<m)&&(p=new Float32Array(m));for(let E=0,x=h;E!==g;++E,x+=4)a.copy(d[E]).applyMatrix4(T,o),a.normal.toArray(p,x),p[x+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,p}}function $v(r){let e=new WeakMap;function t(a,o){return o===uc?a.mapping=Ls:o===dc&&(a.mapping=Is),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===uc||o===dc)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Ym(l.height);return c.fromEquirectangularTexture(r,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const _s=4,Md=[.125,.215,.35,.446,.526,.582],Dr=20,Il=new ig,Ed=new lt;let Ul=null,Fl=0,Nl=0,Ol=!1;const wr=(1+Math.sqrt(5))/2,cs=1/wr,Td=[new j(-wr,cs,0),new j(wr,cs,0),new j(-cs,0,wr),new j(cs,0,wr),new j(0,wr,-cs),new j(0,wr,cs),new j(-1,1,-1),new j(1,1,-1),new j(-1,1,1),new j(1,1,1)];class wd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Ul=this._renderer.getRenderTarget(),Fl=this._renderer.getActiveCubeFace(),Nl=this._renderer.getActiveMipmapLevel(),Ol=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ul,Fl,Nl),this._renderer.xr.enabled=Ol,e.scissorTest=!1,oo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ls||e.mapping===Is?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ul=this._renderer.getRenderTarget(),Fl=this._renderer.getActiveCubeFace(),Nl=this._renderer.getActiveMipmapLevel(),Ol=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:_i,minFilter:_i,generateMipmaps:!1,type:La,format:di,colorSpace:Ns,depthBuffer:!1},i=Ad(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ad(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Yv(s)),this._blurMaterial=jv(s,e,t)}return i}_compileMaterial(e){const t=new vi(this._lodPlanes[0],e);this._renderer.compile(t,Il)}_sceneToCubeUV(e,t,n,i){const o=new Qn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Ed),u.toneMapping=rr,u.autoClear=!1;const h=new vu({name:"PMREM.Background",side:Tn,depthWrite:!1,depthTest:!1}),_=new vi(new Oa,h);let g=!1;const p=e.background;p?p.isColor&&(h.color.copy(p),e.background=null,g=!0):(h.color.copy(Ed),g=!0);for(let m=0;m<6;m++){const T=m%3;T===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):T===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));const E=this._cubeSize;oo(i,T*E,m>2?E:0,E,E),u.setRenderTarget(i),g&&u.render(_,o),u.render(e,o)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Ls||e.mapping===Is;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cd());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new vi(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;oo(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Il)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Td[(i-s-1)%Td.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new vi(this._lodPlanes[i],c),f=c.uniforms,h=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*Dr-1),g=s/_,p=isFinite(s)?1+Math.floor(u*g):Dr;p>Dr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Dr}`);const m=[];let T=0;for(let w=0;w<Dr;++w){const I=w/g,b=Math.exp(-I*I/2);m.push(b),w===0?T+=b:w<p&&(T+=2*b)}for(let w=0;w<m.length;w++)m[w]=m[w]/T;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:E}=this;f.dTheta.value=_,f.mipInt.value=E-n;const x=this._sizeLods[i],A=3*x*(i>E-_s?i-E+_s:0),R=4*(this._cubeSize-x);oo(t,A,R,3*x,2*x),l.setRenderTarget(t),l.render(d,Il)}}function Yv(r){const e=[],t=[],n=[];let i=r;const s=r-_s+1+Md.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);t.push(o);let l=1/o;a>r-_s?l=Md[a-r+_s-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,_=6,g=3,p=2,m=1,T=new Float32Array(g*_*h),E=new Float32Array(p*_*h),x=new Float32Array(m*_*h);for(let R=0;R<h;R++){const w=R%3*2/3-1,I=R>2?0:-1,b=[w,I,0,w+2/3,I,0,w+2/3,I+1,0,w,I,0,w+2/3,I+1,0,w,I+1,0];T.set(b,g*_*R),E.set(f,p*_*R);const v=[R,R,R,R,R,R];x.set(v,m*_*R)}const A=new Ei;A.setAttribute("position",new Vn(T,g)),A.setAttribute("uv",new Vn(E,p)),A.setAttribute("faceIndex",new Vn(x,m)),e.push(A),i>_s&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ad(r,e,t){const n=new Wr(r,e,t);return n.texture.mapping=el,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function oo(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function jv(r,e,t){const n=new Float32Array(Dr),i=new j(0,1,0);return new ur({name:"SphericalGaussianBlur",defines:{n:Dr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:yu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ir,depthTest:!1,depthWrite:!1})}function Cd(){return new ur({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ir,depthTest:!1,depthWrite:!1})}function Rd(){return new ur({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ir,depthTest:!1,depthWrite:!1})}function yu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Kv(r){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===uc||l===dc,u=l===Ls||l===Is;if(c||u){let d=e.get(o);const f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new wd(r)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const h=o.image;return c&&h&&h.height>0||u&&h&&i(h)?(t===null&&(t=new wd(r)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function i(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Zv(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&ps("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Jv(r,e,t,n){const i={},s=new WeakMap;function a(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",a),delete i[f.id];const h=s.get(f);h&&(e.remove(h),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],r.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,_=d.attributes.position;let g=0;if(h!==null){const T=h.array;g=h.version;for(let E=0,x=T.length;E<x;E+=3){const A=T[E+0],R=T[E+1],w=T[E+2];f.push(A,R,R,w,w,A)}}else if(_!==void 0){const T=_.array;g=_.version;for(let E=0,x=T.length/3-1;E<x;E+=3){const A=E+0,R=E+1,w=E+2;f.push(A,R,R,w,w,A)}}else return;const p=new(Wf(f)?Zf:Kf)(f,1);p.version=g;const m=s.get(d);m&&e.remove(m),s.set(d,p)}function u(d){const f=s.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function Qv(r,e,t){let n;function i(f){n=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,h){r.drawElements(n,h,s,f*a),t.update(h,n,1)}function c(f,h,_){_!==0&&(r.drawElementsInstanced(n,h,s,f*a,_),t.update(h,n,_))}function u(f,h,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,f,0,_);let p=0;for(let m=0;m<_;m++)p+=h[m];t.update(p,n,1)}function d(f,h,_,g){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<f.length;m++)c(f[m]/a,h[m],g[m]);else{p.multiDrawElementsInstancedWEBGL(n,h,0,s,f,0,g,0,_);let m=0;for(let T=0;T<_;T++)m+=h[T]*g[T];t.update(m,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function e0(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function t0(r,e,t){const n=new WeakMap,i=new Ft;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(o);if(f===void 0||f.count!==d){let v=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",v)};var h=v;f!==void 0&&f.texture.dispose();const _=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],T=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let x=0;_===!0&&(x=1),g===!0&&(x=2),p===!0&&(x=3);let A=o.attributes.position.count*x,R=1;A>e.maxTextureSize&&(R=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const w=new Float32Array(A*R*4*d),I=new qf(w,A,R,d);I.type=Fi,I.needsUpdate=!0;const b=x*4;for(let L=0;L<d;L++){const N=m[L],B=T[L],q=E[L],K=A*R*4*L;for(let $=0;$<N.count;$++){const X=$*b;_===!0&&(i.fromBufferAttribute(N,$),w[K+X+0]=i.x,w[K+X+1]=i.y,w[K+X+2]=i.z,w[K+X+3]=0),g===!0&&(i.fromBufferAttribute(B,$),w[K+X+4]=i.x,w[K+X+5]=i.y,w[K+X+6]=i.z,w[K+X+7]=0),p===!0&&(i.fromBufferAttribute(q,$),w[K+X+8]=i.x,w[K+X+9]=i.y,w[K+X+10]=i.z,w[K+X+11]=q.itemSize===4?i.w:1)}}f={count:d,texture:I,size:new St(A,R)},n.set(o,f),o.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let _=0;for(let p=0;p<c.length;p++)_+=c[p];const g=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function n0(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return d}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}const sh=new xn,Pd=new ih(1,1),ah=new qf,oh=new Dm,lh=new eh,Dd=[],Ld=[],Id=new Float32Array(16),Ud=new Float32Array(9),Fd=new Float32Array(4);function Xs(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Dd[i];if(s===void 0&&(s=new Float32Array(i),Dd[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function $t(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Yt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function il(r,e){let t=Ld[e];t===void 0&&(t=new Int32Array(e),Ld[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function i0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function r0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;r.uniform2fv(this.addr,e),Yt(t,e)}}function s0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if($t(t,e))return;r.uniform3fv(this.addr,e),Yt(t,e)}}function a0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;r.uniform4fv(this.addr,e),Yt(t,e)}}function o0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if($t(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Yt(t,e)}else{if($t(t,n))return;Fd.set(n),r.uniformMatrix2fv(this.addr,!1,Fd),Yt(t,n)}}function l0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if($t(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Yt(t,e)}else{if($t(t,n))return;Ud.set(n),r.uniformMatrix3fv(this.addr,!1,Ud),Yt(t,n)}}function c0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if($t(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Yt(t,e)}else{if($t(t,n))return;Id.set(n),r.uniformMatrix4fv(this.addr,!1,Id),Yt(t,n)}}function u0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function d0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;r.uniform2iv(this.addr,e),Yt(t,e)}}function f0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if($t(t,e))return;r.uniform3iv(this.addr,e),Yt(t,e)}}function h0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;r.uniform4iv(this.addr,e),Yt(t,e)}}function p0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function m0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;r.uniform2uiv(this.addr,e),Yt(t,e)}}function g0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if($t(t,e))return;r.uniform3uiv(this.addr,e),Yt(t,e)}}function _0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;r.uniform4uiv(this.addr,e),Yt(t,e)}}function v0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Pd.compareFunction=Vf,s=Pd):s=sh,t.setTexture2D(e||s,i)}function x0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||oh,i)}function y0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||lh,i)}function b0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||ah,i)}function S0(r){switch(r){case 5126:return i0;case 35664:return r0;case 35665:return s0;case 35666:return a0;case 35674:return o0;case 35675:return l0;case 35676:return c0;case 5124:case 35670:return u0;case 35667:case 35671:return d0;case 35668:case 35672:return f0;case 35669:case 35673:return h0;case 5125:return p0;case 36294:return m0;case 36295:return g0;case 36296:return _0;case 35678:case 36198:case 36298:case 36306:case 35682:return v0;case 35679:case 36299:case 36307:return x0;case 35680:case 36300:case 36308:case 36293:return y0;case 36289:case 36303:case 36311:case 36292:return b0}}function M0(r,e){r.uniform1fv(this.addr,e)}function E0(r,e){const t=Xs(e,this.size,2);r.uniform2fv(this.addr,t)}function T0(r,e){const t=Xs(e,this.size,3);r.uniform3fv(this.addr,t)}function w0(r,e){const t=Xs(e,this.size,4);r.uniform4fv(this.addr,t)}function A0(r,e){const t=Xs(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function C0(r,e){const t=Xs(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function R0(r,e){const t=Xs(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function P0(r,e){r.uniform1iv(this.addr,e)}function D0(r,e){r.uniform2iv(this.addr,e)}function L0(r,e){r.uniform3iv(this.addr,e)}function I0(r,e){r.uniform4iv(this.addr,e)}function U0(r,e){r.uniform1uiv(this.addr,e)}function F0(r,e){r.uniform2uiv(this.addr,e)}function N0(r,e){r.uniform3uiv(this.addr,e)}function O0(r,e){r.uniform4uiv(this.addr,e)}function k0(r,e,t){const n=this.cache,i=e.length,s=il(t,i);$t(n,s)||(r.uniform1iv(this.addr,s),Yt(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||sh,s[a])}function z0(r,e,t){const n=this.cache,i=e.length,s=il(t,i);$t(n,s)||(r.uniform1iv(this.addr,s),Yt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||oh,s[a])}function B0(r,e,t){const n=this.cache,i=e.length,s=il(t,i);$t(n,s)||(r.uniform1iv(this.addr,s),Yt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||lh,s[a])}function H0(r,e,t){const n=this.cache,i=e.length,s=il(t,i);$t(n,s)||(r.uniform1iv(this.addr,s),Yt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||ah,s[a])}function G0(r){switch(r){case 5126:return M0;case 35664:return E0;case 35665:return T0;case 35666:return w0;case 35674:return A0;case 35675:return C0;case 35676:return R0;case 5124:case 35670:return P0;case 35667:case 35671:return D0;case 35668:case 35672:return L0;case 35669:case 35673:return I0;case 5125:return U0;case 36294:return F0;case 36295:return N0;case 36296:return O0;case 35678:case 36198:case 36298:case 36306:case 35682:return k0;case 35679:case 36299:case 36307:return z0;case 35680:case 36300:case 36308:case 36293:return B0;case 36289:case 36303:case 36311:case 36292:return H0}}class V0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=S0(t.type)}}class W0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=G0(t.type)}}class X0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const kl=/(\w+)(\])?(\[|\.)?/g;function Nd(r,e){r.seq.push(e),r.map[e.id]=e}function q0(r,e,t){const n=r.name,i=n.length;for(kl.lastIndex=0;;){const s=kl.exec(n),a=kl.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Nd(t,c===void 0?new V0(o,r,e):new W0(o,r,e));break}else{let d=t.map[o];d===void 0&&(d=new X0(o),Nd(t,d)),t=d}}}class Co{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),a=e.getUniformLocation(t,s.name);q0(s,a,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Od(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const $0=37297;let Y0=0;function j0(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const kd=new Je;function K0(r){dt._getMatrix(kd,dt.workingColorSpace,r);const e=`mat3( ${kd.elements.map(t=>t.toFixed(4))} )`;switch(dt.getTransfer(r)){case ko:return[e,"LinearTransferOETF"];case _t:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function zd(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+j0(r.getShaderSource(e),a)}else return i}function Z0(r,e){const t=K0(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function J0(r,e){let t;switch(e){case nm:t="Linear";break;case im:t="Reinhard";break;case rm:t="Cineon";break;case sm:t="ACESFilmic";break;case om:t="AgX";break;case lm:t="Neutral";break;case am:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const lo=new j;function Q0(){dt.getLuminanceCoefficients(lo);const r=lo.x.toFixed(4),e=lo.y.toFixed(4),t=lo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ex(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ta).join(`
`)}function tx(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function nx(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function ta(r){return r!==""}function Bd(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hd(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ix=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gc(r){return r.replace(ix,sx)}const rx=new Map;function sx(r,e){let t=Qe[e];if(t===void 0){const n=rx.get(e);if(n!==void 0)t=Qe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Gc(t)}const ax=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gd(r){return r.replace(ax,ox)}function ox(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Vd(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function lx(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Pf?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Fp?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Pi&&(e="SHADOWMAP_TYPE_VSM"),e}function cx(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Ls:case Is:e="ENVMAP_TYPE_CUBE";break;case el:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ux(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Is:e="ENVMAP_MODE_REFRACTION";break}return e}function dx(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Df:e="ENVMAP_BLENDING_MULTIPLY";break;case em:e="ENVMAP_BLENDING_MIX";break;case tm:e="ENVMAP_BLENDING_ADD";break}return e}function fx(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function hx(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=lx(t),c=cx(t),u=ux(t),d=dx(t),f=fx(t),h=ex(t),_=tx(s),g=i.createProgram();let p,m,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ta).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ta).join(`
`),m.length>0&&(m+=`
`)):(p=[Vd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ta).join(`
`),m=[Vd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==rr?"#define TONE_MAPPING":"",t.toneMapping!==rr?Qe.tonemapping_pars_fragment:"",t.toneMapping!==rr?J0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,Z0("linearToOutputTexel",t.outputColorSpace),Q0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ta).join(`
`)),a=Gc(a),a=Bd(a,t),a=Hd(a,t),o=Gc(o),o=Bd(o,t),o=Hd(o,t),a=Gd(a),o=Gd(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,p=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===td?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===td?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const E=T+p+a,x=T+m+o,A=Od(i,i.VERTEX_SHADER,E),R=Od(i,i.FRAGMENT_SHADER,x);i.attachShader(g,A),i.attachShader(g,R),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function w(L){if(r.debug.checkShaderErrors){const N=i.getProgramInfoLog(g).trim(),B=i.getShaderInfoLog(A).trim(),q=i.getShaderInfoLog(R).trim();let K=!0,$=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(K=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,A,R);else{const X=zd(i,A,"vertex"),H=zd(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+N+`
`+X+`
`+H)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(B===""||q==="")&&($=!1);$&&(L.diagnostics={runnable:K,programLog:N,vertexShader:{log:B,prefix:p},fragmentShader:{log:q,prefix:m}})}i.deleteShader(A),i.deleteShader(R),I=new Co(i,g),b=nx(i,g)}let I;this.getUniforms=function(){return I===void 0&&w(this),I};let b;this.getAttributes=function(){return b===void 0&&w(this),b};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=i.getProgramParameter(g,$0)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Y0++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=A,this.fragmentShader=R,this}let px=0;class mx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new gx(e),t.set(e,n)),n}}class gx{constructor(e){this.id=px++,this.code=e,this.usedTimes=0}}function _x(r,e,t,n,i,s,a){const o=new Yf,l=new mx,c=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures;let h=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(b){return c.add(b),b===0?"uv":`uv${b}`}function p(b,v,L,N,B){const q=N.fog,K=B.geometry,$=b.isMeshStandardMaterial?N.environment:null,X=(b.isMeshStandardMaterial?t:e).get(b.envMap||$),H=X&&X.mapping===el?X.image.height:null,ae=_[b.type];b.precision!==null&&(h=i.getMaxPrecision(b.precision),h!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",h,"instead."));const y=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,P=y!==void 0?y.length:0;let re=0;K.morphAttributes.position!==void 0&&(re=1),K.morphAttributes.normal!==void 0&&(re=2),K.morphAttributes.color!==void 0&&(re=3);let de,z,J,ie;if(ae){const Te=mi[ae];de=Te.vertexShader,z=Te.fragmentShader}else de=b.vertexShader,z=b.fragmentShader,l.update(b),J=l.getVertexShaderID(b),ie=l.getFragmentShaderID(b);const Y=r.getRenderTarget(),oe=r.state.buffers.depth.getReversed(),Se=B.isInstancedMesh===!0,_e=B.isBatchedMesh===!0,Pe=!!b.map,De=!!b.matcap,ce=!!X,D=!!b.aoMap,Ye=!!b.lightMap,Ie=!!b.bumpMap,k=!!b.normalMap,xe=!!b.displacementMap,$e=!!b.emissiveMap,Ee=!!b.metalnessMap,C=!!b.roughnessMap,S=b.anisotropy>0,G=b.clearcoat>0,ne=b.dispersion>0,ee=b.iridescence>0,Q=b.sheen>0,pe=b.transmission>0,fe=S&&!!b.anisotropyMap,me=G&&!!b.clearcoatMap,We=G&&!!b.clearcoatNormalMap,le=G&&!!b.clearcoatRoughnessMap,ue=ee&&!!b.iridescenceMap,Ne=ee&&!!b.iridescenceThicknessMap,ke=Q&&!!b.sheenColorMap,we=Q&&!!b.sheenRoughnessMap,Ke=!!b.specularMap,He=!!b.specularColorMap,ot=!!b.specularIntensityMap,U=pe&&!!b.transmissionMap,ge=pe&&!!b.thicknessMap,Z=!!b.gradientMap,te=!!b.alphaMap,he=b.alphaTest>0,ve=!!b.alphaHash,Ge=!!b.extensions;let ct=rr;b.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(ct=r.toneMapping);const Pt={shaderID:ae,shaderType:b.type,shaderName:b.name,vertexShader:de,fragmentShader:z,defines:b.defines,customVertexShaderID:J,customFragmentShaderID:ie,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:h,batching:_e,batchingColor:_e&&B._colorsTexture!==null,instancing:Se,instancingColor:Se&&B.instanceColor!==null,instancingMorph:Se&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Y===null?r.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:Ns,alphaToCoverage:!!b.alphaToCoverage,map:Pe,matcap:De,envMap:ce,envMapMode:ce&&X.mapping,envMapCubeUVHeight:H,aoMap:D,lightMap:Ye,bumpMap:Ie,normalMap:k,displacementMap:f&&xe,emissiveMap:$e,normalMapObjectSpace:k&&b.normalMapType===hm,normalMapTangentSpace:k&&b.normalMapType===fm,metalnessMap:Ee,roughnessMap:C,anisotropy:S,anisotropyMap:fe,clearcoat:G,clearcoatMap:me,clearcoatNormalMap:We,clearcoatRoughnessMap:le,dispersion:ne,iridescence:ee,iridescenceMap:ue,iridescenceThicknessMap:Ne,sheen:Q,sheenColorMap:ke,sheenRoughnessMap:we,specularMap:Ke,specularColorMap:He,specularIntensityMap:ot,transmission:pe,transmissionMap:U,thicknessMap:ge,gradientMap:Z,opaque:b.transparent===!1&&b.blending===bs&&b.alphaToCoverage===!1,alphaMap:te,alphaTest:he,alphaHash:ve,combine:b.combine,mapUv:Pe&&g(b.map.channel),aoMapUv:D&&g(b.aoMap.channel),lightMapUv:Ye&&g(b.lightMap.channel),bumpMapUv:Ie&&g(b.bumpMap.channel),normalMapUv:k&&g(b.normalMap.channel),displacementMapUv:xe&&g(b.displacementMap.channel),emissiveMapUv:$e&&g(b.emissiveMap.channel),metalnessMapUv:Ee&&g(b.metalnessMap.channel),roughnessMapUv:C&&g(b.roughnessMap.channel),anisotropyMapUv:fe&&g(b.anisotropyMap.channel),clearcoatMapUv:me&&g(b.clearcoatMap.channel),clearcoatNormalMapUv:We&&g(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&g(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&g(b.iridescenceMap.channel),iridescenceThicknessMapUv:Ne&&g(b.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&g(b.sheenColorMap.channel),sheenRoughnessMapUv:we&&g(b.sheenRoughnessMap.channel),specularMapUv:Ke&&g(b.specularMap.channel),specularColorMapUv:He&&g(b.specularColorMap.channel),specularIntensityMapUv:ot&&g(b.specularIntensityMap.channel),transmissionMapUv:U&&g(b.transmissionMap.channel),thicknessMapUv:ge&&g(b.thicknessMap.channel),alphaMapUv:te&&g(b.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(k||S),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!K.attributes.uv&&(Pe||te),fog:!!q,useFog:b.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:oe,skinning:B.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:P,morphTextureStride:re,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&L.length>0,shadowMapType:r.shadowMap.type,toneMapping:ct,decodeVideoTexture:Pe&&b.map.isVideoTexture===!0&&dt.getTransfer(b.map.colorSpace)===_t,decodeVideoTextureEmissive:$e&&b.emissiveMap.isVideoTexture===!0&&dt.getTransfer(b.emissiveMap.colorSpace)===_t,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ii,flipSided:b.side===Tn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ge&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ge&&b.extensions.multiDraw===!0||_e)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Pt.vertexUv1s=c.has(1),Pt.vertexUv2s=c.has(2),Pt.vertexUv3s=c.has(3),c.clear(),Pt}function m(b){const v=[];if(b.shaderID?v.push(b.shaderID):(v.push(b.customVertexShaderID),v.push(b.customFragmentShaderID)),b.defines!==void 0)for(const L in b.defines)v.push(L),v.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(T(v,b),E(v,b),v.push(r.outputColorSpace)),v.push(b.customProgramCacheKey),v.join()}function T(b,v){b.push(v.precision),b.push(v.outputColorSpace),b.push(v.envMapMode),b.push(v.envMapCubeUVHeight),b.push(v.mapUv),b.push(v.alphaMapUv),b.push(v.lightMapUv),b.push(v.aoMapUv),b.push(v.bumpMapUv),b.push(v.normalMapUv),b.push(v.displacementMapUv),b.push(v.emissiveMapUv),b.push(v.metalnessMapUv),b.push(v.roughnessMapUv),b.push(v.anisotropyMapUv),b.push(v.clearcoatMapUv),b.push(v.clearcoatNormalMapUv),b.push(v.clearcoatRoughnessMapUv),b.push(v.iridescenceMapUv),b.push(v.iridescenceThicknessMapUv),b.push(v.sheenColorMapUv),b.push(v.sheenRoughnessMapUv),b.push(v.specularMapUv),b.push(v.specularColorMapUv),b.push(v.specularIntensityMapUv),b.push(v.transmissionMapUv),b.push(v.thicknessMapUv),b.push(v.combine),b.push(v.fogExp2),b.push(v.sizeAttenuation),b.push(v.morphTargetsCount),b.push(v.morphAttributeCount),b.push(v.numDirLights),b.push(v.numPointLights),b.push(v.numSpotLights),b.push(v.numSpotLightMaps),b.push(v.numHemiLights),b.push(v.numRectAreaLights),b.push(v.numDirLightShadows),b.push(v.numPointLightShadows),b.push(v.numSpotLightShadows),b.push(v.numSpotLightShadowsWithMaps),b.push(v.numLightProbes),b.push(v.shadowMapType),b.push(v.toneMapping),b.push(v.numClippingPlanes),b.push(v.numClipIntersection),b.push(v.depthPacking)}function E(b,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reverseDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.decodeVideoTextureEmissive&&o.enable(20),v.alphaToCoverage&&o.enable(21),b.push(o.mask)}function x(b){const v=_[b.type];let L;if(v){const N=mi[v];L=Wm.clone(N.uniforms)}else L=b.uniforms;return L}function A(b,v){let L;for(let N=0,B=u.length;N<B;N++){const q=u[N];if(q.cacheKey===v){L=q,++L.usedTimes;break}}return L===void 0&&(L=new hx(r,v,b,s),u.push(L)),L}function R(b){if(--b.usedTimes===0){const v=u.indexOf(b);u[v]=u[u.length-1],u.pop(),b.destroy()}}function w(b){l.remove(b)}function I(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:x,acquireProgram:A,releaseProgram:R,releaseShaderCache:w,programs:u,dispose:I}}function vx(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function xx(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Wd(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Xd(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(d,f,h,_,g,p){let m=r[e];return m===void 0?(m={id:d.id,object:d,geometry:f,material:h,groupOrder:_,renderOrder:d.renderOrder,z:g,group:p},r[e]=m):(m.id=d.id,m.object=d,m.geometry=f,m.material=h,m.groupOrder=_,m.renderOrder=d.renderOrder,m.z=g,m.group=p),e++,m}function o(d,f,h,_,g,p){const m=a(d,f,h,_,g,p);h.transmission>0?n.push(m):h.transparent===!0?i.push(m):t.push(m)}function l(d,f,h,_,g,p){const m=a(d,f,h,_,g,p);h.transmission>0?n.unshift(m):h.transparent===!0?i.unshift(m):t.unshift(m)}function c(d,f){t.length>1&&t.sort(d||xx),n.length>1&&n.sort(f||Wd),i.length>1&&i.sort(f||Wd)}function u(){for(let d=e,f=r.length;d<f;d++){const h=r[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:u,sort:c}}function yx(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new Xd,r.set(n,[a])):i>=s.length?(a=new Xd,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function bx(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new j,color:new lt};break;case"SpotLight":t={position:new j,direction:new j,color:new lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new j,color:new lt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new j,skyColor:new lt,groundColor:new lt};break;case"RectAreaLight":t={color:new lt,position:new j,halfWidth:new j,halfHeight:new j};break}return r[e.id]=t,t}}}function Sx(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let Mx=0;function Ex(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Tx(r){const e=new bx,t=Sx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new j);const i=new j,s=new Ot,a=new Ot;function o(c){let u=0,d=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let h=0,_=0,g=0,p=0,m=0,T=0,E=0,x=0,A=0,R=0,w=0;c.sort(Ex);for(let b=0,v=c.length;b<v;b++){const L=c[b],N=L.color,B=L.intensity,q=L.distance,K=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=N.r*B,d+=N.g*B,f+=N.b*B;else if(L.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(L.sh.coefficients[$],B);w++}else if(L.isDirectionalLight){const $=e.get(L);if($.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const X=L.shadow,H=t.get(L);H.shadowIntensity=X.intensity,H.shadowBias=X.bias,H.shadowNormalBias=X.normalBias,H.shadowRadius=X.radius,H.shadowMapSize=X.mapSize,n.directionalShadow[h]=H,n.directionalShadowMap[h]=K,n.directionalShadowMatrix[h]=L.shadow.matrix,T++}n.directional[h]=$,h++}else if(L.isSpotLight){const $=e.get(L);$.position.setFromMatrixPosition(L.matrixWorld),$.color.copy(N).multiplyScalar(B),$.distance=q,$.coneCos=Math.cos(L.angle),$.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),$.decay=L.decay,n.spot[g]=$;const X=L.shadow;if(L.map&&(n.spotLightMap[A]=L.map,A++,X.updateMatrices(L),L.castShadow&&R++),n.spotLightMatrix[g]=X.matrix,L.castShadow){const H=t.get(L);H.shadowIntensity=X.intensity,H.shadowBias=X.bias,H.shadowNormalBias=X.normalBias,H.shadowRadius=X.radius,H.shadowMapSize=X.mapSize,n.spotShadow[g]=H,n.spotShadowMap[g]=K,x++}g++}else if(L.isRectAreaLight){const $=e.get(L);$.color.copy(N).multiplyScalar(B),$.halfWidth.set(L.width*.5,0,0),$.halfHeight.set(0,L.height*.5,0),n.rectArea[p]=$,p++}else if(L.isPointLight){const $=e.get(L);if($.color.copy(L.color).multiplyScalar(L.intensity),$.distance=L.distance,$.decay=L.decay,L.castShadow){const X=L.shadow,H=t.get(L);H.shadowIntensity=X.intensity,H.shadowBias=X.bias,H.shadowNormalBias=X.normalBias,H.shadowRadius=X.radius,H.shadowMapSize=X.mapSize,H.shadowCameraNear=X.camera.near,H.shadowCameraFar=X.camera.far,n.pointShadow[_]=H,n.pointShadowMap[_]=K,n.pointShadowMatrix[_]=L.shadow.matrix,E++}n.point[_]=$,_++}else if(L.isHemisphereLight){const $=e.get(L);$.skyColor.copy(L.color).multiplyScalar(B),$.groundColor.copy(L.groundColor).multiplyScalar(B),n.hemi[m]=$,m++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Me.LTC_FLOAT_1,n.rectAreaLTC2=Me.LTC_FLOAT_2):(n.rectAreaLTC1=Me.LTC_HALF_1,n.rectAreaLTC2=Me.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const I=n.hash;(I.directionalLength!==h||I.pointLength!==_||I.spotLength!==g||I.rectAreaLength!==p||I.hemiLength!==m||I.numDirectionalShadows!==T||I.numPointShadows!==E||I.numSpotShadows!==x||I.numSpotMaps!==A||I.numLightProbes!==w)&&(n.directional.length=h,n.spot.length=g,n.rectArea.length=p,n.point.length=_,n.hemi.length=m,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=x+A-R,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=w,I.directionalLength=h,I.pointLength=_,I.spotLength=g,I.rectAreaLength=p,I.hemiLength=m,I.numDirectionalShadows=T,I.numPointShadows=E,I.numSpotShadows=x,I.numSpotMaps=A,I.numLightProbes=w,n.version=Mx++)}function l(c,u){let d=0,f=0,h=0,_=0,g=0;const p=u.matrixWorldInverse;for(let m=0,T=c.length;m<T;m++){const E=c[m];if(E.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(p),d++}else if(E.isSpotLight){const x=n.spot[h];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(p),x.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(p),h++}else if(E.isRectAreaLight){const x=n.rectArea[_];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(p),a.identity(),s.copy(E.matrixWorld),s.premultiply(p),a.extractRotation(s),x.halfWidth.set(E.width*.5,0,0),x.halfHeight.set(0,E.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),_++}else if(E.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(p),f++}else if(E.isHemisphereLight){const x=n.hemi[g];x.direction.setFromMatrixPosition(E.matrixWorld),x.direction.transformDirection(p),g++}}}return{setup:o,setupView:l,state:n}}function qd(r){const e=new Tx(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function wx(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new qd(r),e.set(i,[o])):s>=a.length?(o=new qd(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Ax=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Cx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Rx(r,e,t){let n=new th;const i=new St,s=new St,a=new Ft,o=new tg({depthPacking:dm}),l=new ng,c={},u=t.maxTextureSize,d={[cr]:Tn,[Tn]:cr,[Ii]:Ii},f=new ur({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new St},radius:{value:4}},vertexShader:Ax,fragmentShader:Cx}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const _=new Ei;_.setAttribute("position",new Vn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new vi(_,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pf;let m=this.type;this.render=function(R,w,I){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||R.length===0)return;const b=r.getRenderTarget(),v=r.getActiveCubeFace(),L=r.getActiveMipmapLevel(),N=r.state;N.setBlending(ir),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const B=m!==Pi&&this.type===Pi,q=m===Pi&&this.type!==Pi;for(let K=0,$=R.length;K<$;K++){const X=R[K],H=X.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const ae=H.getFrameExtents();if(i.multiply(ae),s.copy(H.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/ae.x),i.x=s.x*ae.x,H.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/ae.y),i.y=s.y*ae.y,H.mapSize.y=s.y)),H.map===null||B===!0||q===!0){const P=this.type!==Pi?{minFilter:fi,magFilter:fi}:{};H.map!==null&&H.map.dispose(),H.map=new Wr(i.x,i.y,P),H.map.texture.name=X.name+".shadowMap",H.camera.updateProjectionMatrix()}r.setRenderTarget(H.map),r.clear();const y=H.getViewportCount();for(let P=0;P<y;P++){const re=H.getViewport(P);a.set(s.x*re.x,s.y*re.y,s.x*re.z,s.y*re.w),N.viewport(a),H.updateMatrices(X,P),n=H.getFrustum(),x(w,I,H.camera,X,this.type)}H.isPointLightShadow!==!0&&this.type===Pi&&T(H,I),H.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(b,v,L)};function T(R,w){const I=e.update(g);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,h.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Wr(i.x,i.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,r.setRenderTarget(R.mapPass),r.clear(),r.renderBufferDirect(w,null,I,f,g,null),h.uniforms.shadow_pass.value=R.mapPass.texture,h.uniforms.resolution.value=R.mapSize,h.uniforms.radius.value=R.radius,r.setRenderTarget(R.map),r.clear(),r.renderBufferDirect(w,null,I,h,g,null)}function E(R,w,I,b){let v=null;const L=I.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(L!==void 0)v=L;else if(v=I.isPointLight===!0?l:o,r.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const N=v.uuid,B=w.uuid;let q=c[N];q===void 0&&(q={},c[N]=q);let K=q[B];K===void 0&&(K=v.clone(),q[B]=K,w.addEventListener("dispose",A)),v=K}if(v.visible=w.visible,v.wireframe=w.wireframe,b===Pi?v.side=w.shadowSide!==null?w.shadowSide:w.side:v.side=w.shadowSide!==null?w.shadowSide:d[w.side],v.alphaMap=w.alphaMap,v.alphaTest=w.alphaTest,v.map=w.map,v.clipShadows=w.clipShadows,v.clippingPlanes=w.clippingPlanes,v.clipIntersection=w.clipIntersection,v.displacementMap=w.displacementMap,v.displacementScale=w.displacementScale,v.displacementBias=w.displacementBias,v.wireframeLinewidth=w.wireframeLinewidth,v.linewidth=w.linewidth,I.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const N=r.properties.get(v);N.light=I}return v}function x(R,w,I,b,v){if(R.visible===!1)return;if(R.layers.test(w.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&v===Pi)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,R.matrixWorld);const B=e.update(R),q=R.material;if(Array.isArray(q)){const K=B.groups;for(let $=0,X=K.length;$<X;$++){const H=K[$],ae=q[H.materialIndex];if(ae&&ae.visible){const y=E(R,ae,b,v);R.onBeforeShadow(r,R,w,I,B,y,H),r.renderBufferDirect(I,null,B,y,R,H),R.onAfterShadow(r,R,w,I,B,y,H)}}}else if(q.visible){const K=E(R,q,b,v);R.onBeforeShadow(r,R,w,I,B,K,null),r.renderBufferDirect(I,null,B,K,R,null),R.onAfterShadow(r,R,w,I,B,K,null)}}const N=R.children;for(let B=0,q=N.length;B<q;B++)x(N[B],w,I,b,v)}function A(R){R.target.removeEventListener("dispose",A);for(const I in c){const b=c[I],v=R.target.uuid;v in b&&(b[v].dispose(),delete b[v])}}}const Px={[ic]:rc,[sc]:lc,[ac]:cc,[Ds]:oc,[rc]:ic,[lc]:sc,[cc]:ac,[oc]:Ds};function Dx(r,e){function t(){let U=!1;const ge=new Ft;let Z=null;const te=new Ft(0,0,0,0);return{setMask:function(he){Z!==he&&!U&&(r.colorMask(he,he,he,he),Z=he)},setLocked:function(he){U=he},setClear:function(he,ve,Ge,ct,Pt){Pt===!0&&(he*=ct,ve*=ct,Ge*=ct),ge.set(he,ve,Ge,ct),te.equals(ge)===!1&&(r.clearColor(he,ve,Ge,ct),te.copy(ge))},reset:function(){U=!1,Z=null,te.set(-1,0,0,0)}}}function n(){let U=!1,ge=!1,Z=null,te=null,he=null;return{setReversed:function(ve){if(ge!==ve){const Ge=e.get("EXT_clip_control");ge?Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.ZERO_TO_ONE_EXT):Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.NEGATIVE_ONE_TO_ONE_EXT);const ct=he;he=null,this.setClear(ct)}ge=ve},getReversed:function(){return ge},setTest:function(ve){ve?Y(r.DEPTH_TEST):oe(r.DEPTH_TEST)},setMask:function(ve){Z!==ve&&!U&&(r.depthMask(ve),Z=ve)},setFunc:function(ve){if(ge&&(ve=Px[ve]),te!==ve){switch(ve){case ic:r.depthFunc(r.NEVER);break;case rc:r.depthFunc(r.ALWAYS);break;case sc:r.depthFunc(r.LESS);break;case Ds:r.depthFunc(r.LEQUAL);break;case ac:r.depthFunc(r.EQUAL);break;case oc:r.depthFunc(r.GEQUAL);break;case lc:r.depthFunc(r.GREATER);break;case cc:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}te=ve}},setLocked:function(ve){U=ve},setClear:function(ve){he!==ve&&(ge&&(ve=1-ve),r.clearDepth(ve),he=ve)},reset:function(){U=!1,Z=null,te=null,he=null,ge=!1}}}function i(){let U=!1,ge=null,Z=null,te=null,he=null,ve=null,Ge=null,ct=null,Pt=null;return{setTest:function(Te){U||(Te?Y(r.STENCIL_TEST):oe(r.STENCIL_TEST))},setMask:function(Te){ge!==Te&&!U&&(r.stencilMask(Te),ge=Te)},setFunc:function(Te,Le,Ze){(Z!==Te||te!==Le||he!==Ze)&&(r.stencilFunc(Te,Le,Ze),Z=Te,te=Le,he=Ze)},setOp:function(Te,Le,Ze){(ve!==Te||Ge!==Le||ct!==Ze)&&(r.stencilOp(Te,Le,Ze),ve=Te,Ge=Le,ct=Ze)},setLocked:function(Te){U=Te},setClear:function(Te){Pt!==Te&&(r.clearStencil(Te),Pt=Te)},reset:function(){U=!1,ge=null,Z=null,te=null,he=null,ve=null,Ge=null,ct=null,Pt=null}}}const s=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,h=[],_=null,g=!1,p=null,m=null,T=null,E=null,x=null,A=null,R=null,w=new lt(0,0,0),I=0,b=!1,v=null,L=null,N=null,B=null,q=null;const K=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,X=0;const H=r.getParameter(r.VERSION);H.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(H)[1]),$=X>=1):H.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),$=X>=2);let ae=null,y={};const P=r.getParameter(r.SCISSOR_BOX),re=r.getParameter(r.VIEWPORT),de=new Ft().fromArray(P),z=new Ft().fromArray(re);function J(U,ge,Z,te){const he=new Uint8Array(4),ve=r.createTexture();r.bindTexture(U,ve),r.texParameteri(U,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(U,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ge=0;Ge<Z;Ge++)U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY?r.texImage3D(ge,0,r.RGBA,1,1,te,0,r.RGBA,r.UNSIGNED_BYTE,he):r.texImage2D(ge+Ge,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,he);return ve}const ie={};ie[r.TEXTURE_2D]=J(r.TEXTURE_2D,r.TEXTURE_2D,1),ie[r.TEXTURE_CUBE_MAP]=J(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[r.TEXTURE_2D_ARRAY]=J(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ie[r.TEXTURE_3D]=J(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Y(r.DEPTH_TEST),a.setFunc(Ds),Ie(!1),k(Ku),Y(r.CULL_FACE),D(ir);function Y(U){u[U]!==!0&&(r.enable(U),u[U]=!0)}function oe(U){u[U]!==!1&&(r.disable(U),u[U]=!1)}function Se(U,ge){return d[U]!==ge?(r.bindFramebuffer(U,ge),d[U]=ge,U===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=ge),U===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=ge),!0):!1}function _e(U,ge){let Z=h,te=!1;if(U){Z=f.get(ge),Z===void 0&&(Z=[],f.set(ge,Z));const he=U.textures;if(Z.length!==he.length||Z[0]!==r.COLOR_ATTACHMENT0){for(let ve=0,Ge=he.length;ve<Ge;ve++)Z[ve]=r.COLOR_ATTACHMENT0+ve;Z.length=he.length,te=!0}}else Z[0]!==r.BACK&&(Z[0]=r.BACK,te=!0);te&&r.drawBuffers(Z)}function Pe(U){return _!==U?(r.useProgram(U),_=U,!0):!1}const De={[Pr]:r.FUNC_ADD,[Op]:r.FUNC_SUBTRACT,[kp]:r.FUNC_REVERSE_SUBTRACT};De[zp]=r.MIN,De[Bp]=r.MAX;const ce={[Hp]:r.ZERO,[Gp]:r.ONE,[Vp]:r.SRC_COLOR,[tc]:r.SRC_ALPHA,[jp]:r.SRC_ALPHA_SATURATE,[$p]:r.DST_COLOR,[Xp]:r.DST_ALPHA,[Wp]:r.ONE_MINUS_SRC_COLOR,[nc]:r.ONE_MINUS_SRC_ALPHA,[Yp]:r.ONE_MINUS_DST_COLOR,[qp]:r.ONE_MINUS_DST_ALPHA,[Kp]:r.CONSTANT_COLOR,[Zp]:r.ONE_MINUS_CONSTANT_COLOR,[Jp]:r.CONSTANT_ALPHA,[Qp]:r.ONE_MINUS_CONSTANT_ALPHA};function D(U,ge,Z,te,he,ve,Ge,ct,Pt,Te){if(U===ir){g===!0&&(oe(r.BLEND),g=!1);return}if(g===!1&&(Y(r.BLEND),g=!0),U!==Np){if(U!==p||Te!==b){if((m!==Pr||x!==Pr)&&(r.blendEquation(r.FUNC_ADD),m=Pr,x=Pr),Te)switch(U){case bs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ec:r.blendFunc(r.ONE,r.ONE);break;case Zu:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ju:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case bs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ec:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Zu:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ju:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}T=null,E=null,A=null,R=null,w.set(0,0,0),I=0,p=U,b=Te}return}he=he||ge,ve=ve||Z,Ge=Ge||te,(ge!==m||he!==x)&&(r.blendEquationSeparate(De[ge],De[he]),m=ge,x=he),(Z!==T||te!==E||ve!==A||Ge!==R)&&(r.blendFuncSeparate(ce[Z],ce[te],ce[ve],ce[Ge]),T=Z,E=te,A=ve,R=Ge),(ct.equals(w)===!1||Pt!==I)&&(r.blendColor(ct.r,ct.g,ct.b,Pt),w.copy(ct),I=Pt),p=U,b=!1}function Ye(U,ge){U.side===Ii?oe(r.CULL_FACE):Y(r.CULL_FACE);let Z=U.side===Tn;ge&&(Z=!Z),Ie(Z),U.blending===bs&&U.transparent===!1?D(ir):D(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),s.setMask(U.colorWrite);const te=U.stencilWrite;o.setTest(te),te&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),$e(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?Y(r.SAMPLE_ALPHA_TO_COVERAGE):oe(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ie(U){v!==U&&(U?r.frontFace(r.CW):r.frontFace(r.CCW),v=U)}function k(U){U!==Ip?(Y(r.CULL_FACE),U!==L&&(U===Ku?r.cullFace(r.BACK):U===Up?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):oe(r.CULL_FACE),L=U}function xe(U){U!==N&&($&&r.lineWidth(U),N=U)}function $e(U,ge,Z){U?(Y(r.POLYGON_OFFSET_FILL),(B!==ge||q!==Z)&&(r.polygonOffset(ge,Z),B=ge,q=Z)):oe(r.POLYGON_OFFSET_FILL)}function Ee(U){U?Y(r.SCISSOR_TEST):oe(r.SCISSOR_TEST)}function C(U){U===void 0&&(U=r.TEXTURE0+K-1),ae!==U&&(r.activeTexture(U),ae=U)}function S(U,ge,Z){Z===void 0&&(ae===null?Z=r.TEXTURE0+K-1:Z=ae);let te=y[Z];te===void 0&&(te={type:void 0,texture:void 0},y[Z]=te),(te.type!==U||te.texture!==ge)&&(ae!==Z&&(r.activeTexture(Z),ae=Z),r.bindTexture(U,ge||ie[U]),te.type=U,te.texture=ge)}function G(){const U=y[ae];U!==void 0&&U.type!==void 0&&(r.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function ne(){try{r.compressedTexImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{r.compressedTexImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{r.texSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pe(){try{r.texSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function fe(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function me(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function We(){try{r.texStorage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function le(){try{r.texStorage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ue(){try{r.texImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ne(){try{r.texImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ke(U){de.equals(U)===!1&&(r.scissor(U.x,U.y,U.z,U.w),de.copy(U))}function we(U){z.equals(U)===!1&&(r.viewport(U.x,U.y,U.z,U.w),z.copy(U))}function Ke(U,ge){let Z=c.get(ge);Z===void 0&&(Z=new WeakMap,c.set(ge,Z));let te=Z.get(U);te===void 0&&(te=r.getUniformBlockIndex(ge,U.name),Z.set(U,te))}function He(U,ge){const te=c.get(ge).get(U);l.get(ge)!==te&&(r.uniformBlockBinding(ge,te,U.__bindingPointIndex),l.set(ge,te))}function ot(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},ae=null,y={},d={},f=new WeakMap,h=[],_=null,g=!1,p=null,m=null,T=null,E=null,x=null,A=null,R=null,w=new lt(0,0,0),I=0,b=!1,v=null,L=null,N=null,B=null,q=null,de.set(0,0,r.canvas.width,r.canvas.height),z.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:Y,disable:oe,bindFramebuffer:Se,drawBuffers:_e,useProgram:Pe,setBlending:D,setMaterial:Ye,setFlipSided:Ie,setCullFace:k,setLineWidth:xe,setPolygonOffset:$e,setScissorTest:Ee,activeTexture:C,bindTexture:S,unbindTexture:G,compressedTexImage2D:ne,compressedTexImage3D:ee,texImage2D:ue,texImage3D:Ne,updateUBOMapping:Ke,uniformBlockBinding:He,texStorage2D:We,texStorage3D:le,texSubImage2D:Q,texSubImage3D:pe,compressedTexSubImage2D:fe,compressedTexSubImage3D:me,scissor:ke,viewport:we,reset:ot}}function Lx(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new St,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,S){return h?new OffscreenCanvas(C,S):Bo("canvas")}function g(C,S,G){let ne=1;const ee=Ee(C);if((ee.width>G||ee.height>G)&&(ne=G/Math.max(ee.width,ee.height)),ne<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Q=Math.floor(ne*ee.width),pe=Math.floor(ne*ee.height);d===void 0&&(d=_(Q,pe));const fe=S?_(Q,pe):d;return fe.width=Q,fe.height=pe,fe.getContext("2d").drawImage(C,0,0,Q,pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+Q+"x"+pe+")."),fe}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),C;return C}function p(C){return C.generateMipmaps}function m(C){r.generateMipmap(C)}function T(C){return C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?r.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function E(C,S,G,ne,ee=!1){if(C!==null){if(r[C]!==void 0)return r[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Q=S;if(S===r.RED&&(G===r.FLOAT&&(Q=r.R32F),G===r.HALF_FLOAT&&(Q=r.R16F),G===r.UNSIGNED_BYTE&&(Q=r.R8)),S===r.RED_INTEGER&&(G===r.UNSIGNED_BYTE&&(Q=r.R8UI),G===r.UNSIGNED_SHORT&&(Q=r.R16UI),G===r.UNSIGNED_INT&&(Q=r.R32UI),G===r.BYTE&&(Q=r.R8I),G===r.SHORT&&(Q=r.R16I),G===r.INT&&(Q=r.R32I)),S===r.RG&&(G===r.FLOAT&&(Q=r.RG32F),G===r.HALF_FLOAT&&(Q=r.RG16F),G===r.UNSIGNED_BYTE&&(Q=r.RG8)),S===r.RG_INTEGER&&(G===r.UNSIGNED_BYTE&&(Q=r.RG8UI),G===r.UNSIGNED_SHORT&&(Q=r.RG16UI),G===r.UNSIGNED_INT&&(Q=r.RG32UI),G===r.BYTE&&(Q=r.RG8I),G===r.SHORT&&(Q=r.RG16I),G===r.INT&&(Q=r.RG32I)),S===r.RGB_INTEGER&&(G===r.UNSIGNED_BYTE&&(Q=r.RGB8UI),G===r.UNSIGNED_SHORT&&(Q=r.RGB16UI),G===r.UNSIGNED_INT&&(Q=r.RGB32UI),G===r.BYTE&&(Q=r.RGB8I),G===r.SHORT&&(Q=r.RGB16I),G===r.INT&&(Q=r.RGB32I)),S===r.RGBA_INTEGER&&(G===r.UNSIGNED_BYTE&&(Q=r.RGBA8UI),G===r.UNSIGNED_SHORT&&(Q=r.RGBA16UI),G===r.UNSIGNED_INT&&(Q=r.RGBA32UI),G===r.BYTE&&(Q=r.RGBA8I),G===r.SHORT&&(Q=r.RGBA16I),G===r.INT&&(Q=r.RGBA32I)),S===r.RGB&&G===r.UNSIGNED_INT_5_9_9_9_REV&&(Q=r.RGB9_E5),S===r.RGBA){const pe=ee?ko:dt.getTransfer(ne);G===r.FLOAT&&(Q=r.RGBA32F),G===r.HALF_FLOAT&&(Q=r.RGBA16F),G===r.UNSIGNED_BYTE&&(Q=pe===_t?r.SRGB8_ALPHA8:r.RGBA8),G===r.UNSIGNED_SHORT_4_4_4_4&&(Q=r.RGBA4),G===r.UNSIGNED_SHORT_5_5_5_1&&(Q=r.RGB5_A1)}return(Q===r.R16F||Q===r.R32F||Q===r.RG16F||Q===r.RG32F||Q===r.RGBA16F||Q===r.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function x(C,S){let G;return C?S===null||S===Vr||S===Us?G=r.DEPTH24_STENCIL8:S===Fi?G=r.DEPTH32F_STENCIL8:S===ya&&(G=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Vr||S===Us?G=r.DEPTH_COMPONENT24:S===Fi?G=r.DEPTH_COMPONENT32F:S===ya&&(G=r.DEPTH_COMPONENT16),G}function A(C,S){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==fi&&C.minFilter!==_i?Math.log2(Math.max(S.width,S.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?S.mipmaps.length:1}function R(C){const S=C.target;S.removeEventListener("dispose",R),I(S),S.isVideoTexture&&u.delete(S)}function w(C){const S=C.target;S.removeEventListener("dispose",w),v(S)}function I(C){const S=n.get(C);if(S.__webglInit===void 0)return;const G=C.source,ne=f.get(G);if(ne){const ee=ne[S.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&b(C),Object.keys(ne).length===0&&f.delete(G)}n.remove(C)}function b(C){const S=n.get(C);r.deleteTexture(S.__webglTexture);const G=C.source,ne=f.get(G);delete ne[S.__cacheKey],a.memory.textures--}function v(C){const S=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(S.__webglFramebuffer[ne]))for(let ee=0;ee<S.__webglFramebuffer[ne].length;ee++)r.deleteFramebuffer(S.__webglFramebuffer[ne][ee]);else r.deleteFramebuffer(S.__webglFramebuffer[ne]);S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer[ne])}else{if(Array.isArray(S.__webglFramebuffer))for(let ne=0;ne<S.__webglFramebuffer.length;ne++)r.deleteFramebuffer(S.__webglFramebuffer[ne]);else r.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&r.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let ne=0;ne<S.__webglColorRenderbuffer.length;ne++)S.__webglColorRenderbuffer[ne]&&r.deleteRenderbuffer(S.__webglColorRenderbuffer[ne]);S.__webglDepthRenderbuffer&&r.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const G=C.textures;for(let ne=0,ee=G.length;ne<ee;ne++){const Q=n.get(G[ne]);Q.__webglTexture&&(r.deleteTexture(Q.__webglTexture),a.memory.textures--),n.remove(G[ne])}n.remove(C)}let L=0;function N(){L=0}function B(){const C=L;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),L+=1,C}function q(C){const S=[];return S.push(C.wrapS),S.push(C.wrapT),S.push(C.wrapR||0),S.push(C.magFilter),S.push(C.minFilter),S.push(C.anisotropy),S.push(C.internalFormat),S.push(C.format),S.push(C.type),S.push(C.generateMipmaps),S.push(C.premultiplyAlpha),S.push(C.flipY),S.push(C.unpackAlignment),S.push(C.colorSpace),S.join()}function K(C,S){const G=n.get(C);if(C.isVideoTexture&&xe(C),C.isRenderTargetTexture===!1&&C.version>0&&G.__version!==C.version){const ne=C.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{z(G,C,S);return}}t.bindTexture(r.TEXTURE_2D,G.__webglTexture,r.TEXTURE0+S)}function $(C,S){const G=n.get(C);if(C.version>0&&G.__version!==C.version){z(G,C,S);return}t.bindTexture(r.TEXTURE_2D_ARRAY,G.__webglTexture,r.TEXTURE0+S)}function X(C,S){const G=n.get(C);if(C.version>0&&G.__version!==C.version){z(G,C,S);return}t.bindTexture(r.TEXTURE_3D,G.__webglTexture,r.TEXTURE0+S)}function H(C,S){const G=n.get(C);if(C.version>0&&G.__version!==C.version){J(G,C,S);return}t.bindTexture(r.TEXTURE_CUBE_MAP,G.__webglTexture,r.TEXTURE0+S)}const ae={[fc]:r.REPEAT,[Lr]:r.CLAMP_TO_EDGE,[hc]:r.MIRRORED_REPEAT},y={[fi]:r.NEAREST,[cm]:r.NEAREST_MIPMAP_NEAREST,[za]:r.NEAREST_MIPMAP_LINEAR,[_i]:r.LINEAR,[cl]:r.LINEAR_MIPMAP_NEAREST,[Ir]:r.LINEAR_MIPMAP_LINEAR},P={[pm]:r.NEVER,[ym]:r.ALWAYS,[mm]:r.LESS,[Vf]:r.LEQUAL,[gm]:r.EQUAL,[xm]:r.GEQUAL,[_m]:r.GREATER,[vm]:r.NOTEQUAL};function re(C,S){if(S.type===Fi&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===_i||S.magFilter===cl||S.magFilter===za||S.magFilter===Ir||S.minFilter===_i||S.minFilter===cl||S.minFilter===za||S.minFilter===Ir)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(C,r.TEXTURE_WRAP_S,ae[S.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,ae[S.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,ae[S.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,y[S.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,y[S.minFilter]),S.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,P[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===fi||S.minFilter!==za&&S.minFilter!==Ir||S.type===Fi&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");r.texParameterf(C,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function de(C,S){let G=!1;C.__webglInit===void 0&&(C.__webglInit=!0,S.addEventListener("dispose",R));const ne=S.source;let ee=f.get(ne);ee===void 0&&(ee={},f.set(ne,ee));const Q=q(S);if(Q!==C.__cacheKey){ee[Q]===void 0&&(ee[Q]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,G=!0),ee[Q].usedTimes++;const pe=ee[C.__cacheKey];pe!==void 0&&(ee[C.__cacheKey].usedTimes--,pe.usedTimes===0&&b(S)),C.__cacheKey=Q,C.__webglTexture=ee[Q].texture}return G}function z(C,S,G){let ne=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(ne=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(ne=r.TEXTURE_3D);const ee=de(C,S),Q=S.source;t.bindTexture(ne,C.__webglTexture,r.TEXTURE0+G);const pe=n.get(Q);if(Q.version!==pe.__version||ee===!0){t.activeTexture(r.TEXTURE0+G);const fe=dt.getPrimaries(dt.workingColorSpace),me=S.colorSpace===Zi?null:dt.getPrimaries(S.colorSpace),We=S.colorSpace===Zi||fe===me?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,We);let le=g(S.image,!1,i.maxTextureSize);le=$e(S,le);const ue=s.convert(S.format,S.colorSpace),Ne=s.convert(S.type);let ke=E(S.internalFormat,ue,Ne,S.colorSpace,S.isVideoTexture);re(ne,S);let we;const Ke=S.mipmaps,He=S.isVideoTexture!==!0,ot=pe.__version===void 0||ee===!0,U=Q.dataReady,ge=A(S,le);if(S.isDepthTexture)ke=x(S.format===Fs,S.type),ot&&(He?t.texStorage2D(r.TEXTURE_2D,1,ke,le.width,le.height):t.texImage2D(r.TEXTURE_2D,0,ke,le.width,le.height,0,ue,Ne,null));else if(S.isDataTexture)if(Ke.length>0){He&&ot&&t.texStorage2D(r.TEXTURE_2D,ge,ke,Ke[0].width,Ke[0].height);for(let Z=0,te=Ke.length;Z<te;Z++)we=Ke[Z],He?U&&t.texSubImage2D(r.TEXTURE_2D,Z,0,0,we.width,we.height,ue,Ne,we.data):t.texImage2D(r.TEXTURE_2D,Z,ke,we.width,we.height,0,ue,Ne,we.data);S.generateMipmaps=!1}else He?(ot&&t.texStorage2D(r.TEXTURE_2D,ge,ke,le.width,le.height),U&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,le.width,le.height,ue,Ne,le.data)):t.texImage2D(r.TEXTURE_2D,0,ke,le.width,le.height,0,ue,Ne,le.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){He&&ot&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ge,ke,Ke[0].width,Ke[0].height,le.depth);for(let Z=0,te=Ke.length;Z<te;Z++)if(we=Ke[Z],S.format!==di)if(ue!==null)if(He){if(U)if(S.layerUpdates.size>0){const he=Sd(we.width,we.height,S.format,S.type);for(const ve of S.layerUpdates){const Ge=we.data.subarray(ve*he/we.data.BYTES_PER_ELEMENT,(ve+1)*he/we.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,ve,we.width,we.height,1,ue,Ge)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,0,we.width,we.height,le.depth,ue,we.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Z,ke,we.width,we.height,le.depth,0,we.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else He?U&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,0,we.width,we.height,le.depth,ue,Ne,we.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Z,ke,we.width,we.height,le.depth,0,ue,Ne,we.data)}else{He&&ot&&t.texStorage2D(r.TEXTURE_2D,ge,ke,Ke[0].width,Ke[0].height);for(let Z=0,te=Ke.length;Z<te;Z++)we=Ke[Z],S.format!==di?ue!==null?He?U&&t.compressedTexSubImage2D(r.TEXTURE_2D,Z,0,0,we.width,we.height,ue,we.data):t.compressedTexImage2D(r.TEXTURE_2D,Z,ke,we.width,we.height,0,we.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?U&&t.texSubImage2D(r.TEXTURE_2D,Z,0,0,we.width,we.height,ue,Ne,we.data):t.texImage2D(r.TEXTURE_2D,Z,ke,we.width,we.height,0,ue,Ne,we.data)}else if(S.isDataArrayTexture)if(He){if(ot&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ge,ke,le.width,le.height,le.depth),U)if(S.layerUpdates.size>0){const Z=Sd(le.width,le.height,S.format,S.type);for(const te of S.layerUpdates){const he=le.data.subarray(te*Z/le.data.BYTES_PER_ELEMENT,(te+1)*Z/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,te,le.width,le.height,1,ue,Ne,he)}S.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,ue,Ne,le.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,ke,le.width,le.height,le.depth,0,ue,Ne,le.data);else if(S.isData3DTexture)He?(ot&&t.texStorage3D(r.TEXTURE_3D,ge,ke,le.width,le.height,le.depth),U&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,ue,Ne,le.data)):t.texImage3D(r.TEXTURE_3D,0,ke,le.width,le.height,le.depth,0,ue,Ne,le.data);else if(S.isFramebufferTexture){if(ot)if(He)t.texStorage2D(r.TEXTURE_2D,ge,ke,le.width,le.height);else{let Z=le.width,te=le.height;for(let he=0;he<ge;he++)t.texImage2D(r.TEXTURE_2D,he,ke,Z,te,0,ue,Ne,null),Z>>=1,te>>=1}}else if(Ke.length>0){if(He&&ot){const Z=Ee(Ke[0]);t.texStorage2D(r.TEXTURE_2D,ge,ke,Z.width,Z.height)}for(let Z=0,te=Ke.length;Z<te;Z++)we=Ke[Z],He?U&&t.texSubImage2D(r.TEXTURE_2D,Z,0,0,ue,Ne,we):t.texImage2D(r.TEXTURE_2D,Z,ke,ue,Ne,we);S.generateMipmaps=!1}else if(He){if(ot){const Z=Ee(le);t.texStorage2D(r.TEXTURE_2D,ge,ke,Z.width,Z.height)}U&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ue,Ne,le)}else t.texImage2D(r.TEXTURE_2D,0,ke,ue,Ne,le);p(S)&&m(ne),pe.__version=Q.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function J(C,S,G){if(S.image.length!==6)return;const ne=de(C,S),ee=S.source;t.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+G);const Q=n.get(ee);if(ee.version!==Q.__version||ne===!0){t.activeTexture(r.TEXTURE0+G);const pe=dt.getPrimaries(dt.workingColorSpace),fe=S.colorSpace===Zi?null:dt.getPrimaries(S.colorSpace),me=S.colorSpace===Zi||pe===fe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const We=S.isCompressedTexture||S.image[0].isCompressedTexture,le=S.image[0]&&S.image[0].isDataTexture,ue=[];for(let te=0;te<6;te++)!We&&!le?ue[te]=g(S.image[te],!0,i.maxCubemapSize):ue[te]=le?S.image[te].image:S.image[te],ue[te]=$e(S,ue[te]);const Ne=ue[0],ke=s.convert(S.format,S.colorSpace),we=s.convert(S.type),Ke=E(S.internalFormat,ke,we,S.colorSpace),He=S.isVideoTexture!==!0,ot=Q.__version===void 0||ne===!0,U=ee.dataReady;let ge=A(S,Ne);re(r.TEXTURE_CUBE_MAP,S);let Z;if(We){He&&ot&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ge,Ke,Ne.width,Ne.height);for(let te=0;te<6;te++){Z=ue[te].mipmaps;for(let he=0;he<Z.length;he++){const ve=Z[he];S.format!==di?ke!==null?He?U&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,he,0,0,ve.width,ve.height,ke,ve.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,he,Ke,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,he,0,0,ve.width,ve.height,ke,we,ve.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,he,Ke,ve.width,ve.height,0,ke,we,ve.data)}}}else{if(Z=S.mipmaps,He&&ot){Z.length>0&&ge++;const te=Ee(ue[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,ge,Ke,te.width,te.height)}for(let te=0;te<6;te++)if(le){He?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,ue[te].width,ue[te].height,ke,we,ue[te].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ke,ue[te].width,ue[te].height,0,ke,we,ue[te].data);for(let he=0;he<Z.length;he++){const Ge=Z[he].image[te].image;He?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,he+1,0,0,Ge.width,Ge.height,ke,we,Ge.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,he+1,Ke,Ge.width,Ge.height,0,ke,we,Ge.data)}}else{He?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,ke,we,ue[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ke,ke,we,ue[te]);for(let he=0;he<Z.length;he++){const ve=Z[he];He?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,he+1,0,0,ke,we,ve.image[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,he+1,Ke,ke,we,ve.image[te])}}}p(S)&&m(r.TEXTURE_CUBE_MAP),Q.__version=ee.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function ie(C,S,G,ne,ee,Q){const pe=s.convert(G.format,G.colorSpace),fe=s.convert(G.type),me=E(G.internalFormat,pe,fe,G.colorSpace),We=n.get(S),le=n.get(G);if(le.__renderTarget=S,!We.__hasExternalTextures){const ue=Math.max(1,S.width>>Q),Ne=Math.max(1,S.height>>Q);ee===r.TEXTURE_3D||ee===r.TEXTURE_2D_ARRAY?t.texImage3D(ee,Q,me,ue,Ne,S.depth,0,pe,fe,null):t.texImage2D(ee,Q,me,ue,Ne,0,pe,fe,null)}t.bindFramebuffer(r.FRAMEBUFFER,C),k(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ne,ee,le.__webglTexture,0,Ie(S)):(ee===r.TEXTURE_2D||ee>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ne,ee,le.__webglTexture,Q),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Y(C,S,G){if(r.bindRenderbuffer(r.RENDERBUFFER,C),S.depthBuffer){const ne=S.depthTexture,ee=ne&&ne.isDepthTexture?ne.type:null,Q=x(S.stencilBuffer,ee),pe=S.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,fe=Ie(S);k(S)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,fe,Q,S.width,S.height):G?r.renderbufferStorageMultisample(r.RENDERBUFFER,fe,Q,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,Q,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,pe,r.RENDERBUFFER,C)}else{const ne=S.textures;for(let ee=0;ee<ne.length;ee++){const Q=ne[ee],pe=s.convert(Q.format,Q.colorSpace),fe=s.convert(Q.type),me=E(Q.internalFormat,pe,fe,Q.colorSpace),We=Ie(S);G&&k(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,We,me,S.width,S.height):k(S)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,We,me,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,me,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function oe(C,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,C),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ne=n.get(S.depthTexture);ne.__renderTarget=S,(!ne.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),K(S.depthTexture,0);const ee=ne.__webglTexture,Q=Ie(S);if(S.depthTexture.format===Ss)k(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ee,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ee,0);else if(S.depthTexture.format===Fs)k(S)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ee,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Se(C){const S=n.get(C),G=C.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==C.depthTexture){const ne=C.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),ne){const ee=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,ne.removeEventListener("dispose",ee)};ne.addEventListener("dispose",ee),S.__depthDisposeCallback=ee}S.__boundDepthTexture=ne}if(C.depthTexture&&!S.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");oe(S.__webglFramebuffer,C)}else if(G){S.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[ne]),S.__webglDepthbuffer[ne]===void 0)S.__webglDepthbuffer[ne]=r.createRenderbuffer(),Y(S.__webglDepthbuffer[ne],C,!1);else{const ee=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=S.__webglDepthbuffer[ne];r.bindRenderbuffer(r.RENDERBUFFER,Q),r.framebufferRenderbuffer(r.FRAMEBUFFER,ee,r.RENDERBUFFER,Q)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=r.createRenderbuffer(),Y(S.__webglDepthbuffer,C,!1);else{const ne=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ee=S.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ee),r.framebufferRenderbuffer(r.FRAMEBUFFER,ne,r.RENDERBUFFER,ee)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function _e(C,S,G){const ne=n.get(C);S!==void 0&&ie(ne.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),G!==void 0&&Se(C)}function Pe(C){const S=C.texture,G=n.get(C),ne=n.get(S);C.addEventListener("dispose",w);const ee=C.textures,Q=C.isWebGLCubeRenderTarget===!0,pe=ee.length>1;if(pe||(ne.__webglTexture===void 0&&(ne.__webglTexture=r.createTexture()),ne.__version=S.version,a.memory.textures++),Q){G.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(S.mipmaps&&S.mipmaps.length>0){G.__webglFramebuffer[fe]=[];for(let me=0;me<S.mipmaps.length;me++)G.__webglFramebuffer[fe][me]=r.createFramebuffer()}else G.__webglFramebuffer[fe]=r.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){G.__webglFramebuffer=[];for(let fe=0;fe<S.mipmaps.length;fe++)G.__webglFramebuffer[fe]=r.createFramebuffer()}else G.__webglFramebuffer=r.createFramebuffer();if(pe)for(let fe=0,me=ee.length;fe<me;fe++){const We=n.get(ee[fe]);We.__webglTexture===void 0&&(We.__webglTexture=r.createTexture(),a.memory.textures++)}if(C.samples>0&&k(C)===!1){G.__webglMultisampledFramebuffer=r.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let fe=0;fe<ee.length;fe++){const me=ee[fe];G.__webglColorRenderbuffer[fe]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,G.__webglColorRenderbuffer[fe]);const We=s.convert(me.format,me.colorSpace),le=s.convert(me.type),ue=E(me.internalFormat,We,le,me.colorSpace,C.isXRRenderTarget===!0),Ne=Ie(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ne,ue,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.RENDERBUFFER,G.__webglColorRenderbuffer[fe])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(G.__webglDepthRenderbuffer=r.createRenderbuffer(),Y(G.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Q){t.bindTexture(r.TEXTURE_CUBE_MAP,ne.__webglTexture),re(r.TEXTURE_CUBE_MAP,S);for(let fe=0;fe<6;fe++)if(S.mipmaps&&S.mipmaps.length>0)for(let me=0;me<S.mipmaps.length;me++)ie(G.__webglFramebuffer[fe][me],C,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+fe,me);else ie(G.__webglFramebuffer[fe],C,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);p(S)&&m(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(pe){for(let fe=0,me=ee.length;fe<me;fe++){const We=ee[fe],le=n.get(We);t.bindTexture(r.TEXTURE_2D,le.__webglTexture),re(r.TEXTURE_2D,We),ie(G.__webglFramebuffer,C,We,r.COLOR_ATTACHMENT0+fe,r.TEXTURE_2D,0),p(We)&&m(r.TEXTURE_2D)}t.unbindTexture()}else{let fe=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(fe=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(fe,ne.__webglTexture),re(fe,S),S.mipmaps&&S.mipmaps.length>0)for(let me=0;me<S.mipmaps.length;me++)ie(G.__webglFramebuffer[me],C,S,r.COLOR_ATTACHMENT0,fe,me);else ie(G.__webglFramebuffer,C,S,r.COLOR_ATTACHMENT0,fe,0);p(S)&&m(fe),t.unbindTexture()}C.depthBuffer&&Se(C)}function De(C){const S=C.textures;for(let G=0,ne=S.length;G<ne;G++){const ee=S[G];if(p(ee)){const Q=T(C),pe=n.get(ee).__webglTexture;t.bindTexture(Q,pe),m(Q),t.unbindTexture()}}}const ce=[],D=[];function Ye(C){if(C.samples>0){if(k(C)===!1){const S=C.textures,G=C.width,ne=C.height;let ee=r.COLOR_BUFFER_BIT;const Q=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,pe=n.get(C),fe=S.length>1;if(fe)for(let me=0;me<S.length;me++)t.bindFramebuffer(r.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,pe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let me=0;me<S.length;me++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ee|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ee|=r.STENCIL_BUFFER_BIT)),fe){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,pe.__webglColorRenderbuffer[me]);const We=n.get(S[me]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,We,0)}r.blitFramebuffer(0,0,G,ne,0,0,G,ne,ee,r.NEAREST),l===!0&&(ce.length=0,D.length=0,ce.push(r.COLOR_ATTACHMENT0+me),C.depthBuffer&&C.resolveDepthBuffer===!1&&(ce.push(Q),D.push(Q),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,D)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ce))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),fe)for(let me=0;me<S.length;me++){t.bindFramebuffer(r.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,pe.__webglColorRenderbuffer[me]);const We=n.get(S[me]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,pe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.TEXTURE_2D,We,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const S=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[S])}}}function Ie(C){return Math.min(i.maxSamples,C.samples)}function k(C){const S=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function xe(C){const S=a.render.frame;u.get(C)!==S&&(u.set(C,S),C.update())}function $e(C,S){const G=C.colorSpace,ne=C.format,ee=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||G!==Ns&&G!==Zi&&(dt.getTransfer(G)===_t?(ne!==di||ee!==Bi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),S}function Ee(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=N,this.setTexture2D=K,this.setTexture2DArray=$,this.setTexture3D=X,this.setTextureCube=H,this.rebindTextures=_e,this.setupRenderTarget=Pe,this.updateRenderTargetMipmap=De,this.updateMultisampleRenderTarget=Ye,this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=k}function Ix(r,e){function t(n,i=Zi){let s;const a=dt.getTransfer(i);if(n===Bi)return r.UNSIGNED_BYTE;if(n===hu)return r.UNSIGNED_SHORT_4_4_4_4;if(n===pu)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Ff)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===If)return r.BYTE;if(n===Uf)return r.SHORT;if(n===ya)return r.UNSIGNED_SHORT;if(n===fu)return r.INT;if(n===Vr)return r.UNSIGNED_INT;if(n===Fi)return r.FLOAT;if(n===La)return r.HALF_FLOAT;if(n===Nf)return r.ALPHA;if(n===Of)return r.RGB;if(n===di)return r.RGBA;if(n===kf)return r.LUMINANCE;if(n===zf)return r.LUMINANCE_ALPHA;if(n===Ss)return r.DEPTH_COMPONENT;if(n===Fs)return r.DEPTH_STENCIL;if(n===Bf)return r.RED;if(n===mu)return r.RED_INTEGER;if(n===Hf)return r.RG;if(n===gu)return r.RG_INTEGER;if(n===_u)return r.RGBA_INTEGER;if(n===Mo||n===Eo||n===To||n===wo)if(a===_t)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Mo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Eo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===To)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===wo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Mo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Eo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===To)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===wo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===pc||n===mc||n===gc||n===_c)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===pc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===mc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===gc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===_c)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===vc||n===xc||n===yc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===vc||n===xc)return a===_t?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===yc)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===bc||n===Sc||n===Mc||n===Ec||n===Tc||n===wc||n===Ac||n===Cc||n===Rc||n===Pc||n===Dc||n===Lc||n===Ic||n===Uc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===bc)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Sc)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Mc)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ec)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Tc)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===wc)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ac)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Cc)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Rc)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Pc)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Dc)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Lc)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ic)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Uc)return a===_t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ao||n===Fc||n===Nc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Ao)return a===_t?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Fc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Nc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Gf||n===Oc||n===kc||n===zc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Ao)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Oc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===kc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===zc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Us?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const Ux=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Fx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Nx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new xn,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ur({vertexShader:Ux,fragmentShader:Fx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new vi(new nl(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ox extends Ws{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,_=null;const g=new Nx,p=t.getContextAttributes();let m=null,T=null;const E=[],x=[],A=new St;let R=null;const w=new Qn;w.viewport=new Ft;const I=new Qn;I.viewport=new Ft;const b=[w,I],v=new rg;let L=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let J=E[z];return J===void 0&&(J=new Dl,E[z]=J),J.getTargetRaySpace()},this.getControllerGrip=function(z){let J=E[z];return J===void 0&&(J=new Dl,E[z]=J),J.getGripSpace()},this.getHand=function(z){let J=E[z];return J===void 0&&(J=new Dl,E[z]=J),J.getHandSpace()};function B(z){const J=x.indexOf(z.inputSource);if(J===-1)return;const ie=E[J];ie!==void 0&&(ie.update(z.inputSource,z.frame,c||a),ie.dispatchEvent({type:z.type,data:z.inputSource}))}function q(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",q),i.removeEventListener("inputsourceschange",K);for(let z=0;z<E.length;z++){const J=x[z];J!==null&&(x[z]=null,E[z].disconnect(J))}L=null,N=null,g.reset(),e.setRenderTarget(m),h=null,f=null,d=null,i=null,T=null,de.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){s=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){o=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(z){if(i=z,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",q),i.addEventListener("inputsourceschange",K),p.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(A),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,Y=null,oe=null;p.depth&&(oe=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=p.stencil?Fs:Ss,Y=p.stencil?Us:Vr);const Se={colorFormat:t.RGBA8,depthFormat:oe,scaleFactor:s};d=new XRWebGLBinding(i,t),f=d.createProjectionLayer(Se),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),T=new Wr(f.textureWidth,f.textureHeight,{format:di,type:Bi,depthTexture:new ih(f.textureWidth,f.textureHeight,Y,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}else{const ie={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(i,t,ie),i.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),T=new Wr(h.framebufferWidth,h.framebufferHeight,{format:di,type:Bi,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),de.setContext(i),de.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function K(z){for(let J=0;J<z.removed.length;J++){const ie=z.removed[J],Y=x.indexOf(ie);Y>=0&&(x[Y]=null,E[Y].disconnect(ie))}for(let J=0;J<z.added.length;J++){const ie=z.added[J];let Y=x.indexOf(ie);if(Y===-1){for(let Se=0;Se<E.length;Se++)if(Se>=x.length){x.push(ie),Y=Se;break}else if(x[Se]===null){x[Se]=ie,Y=Se;break}if(Y===-1)break}const oe=E[Y];oe&&oe.connect(ie)}}const $=new j,X=new j;function H(z,J,ie){$.setFromMatrixPosition(J.matrixWorld),X.setFromMatrixPosition(ie.matrixWorld);const Y=$.distanceTo(X),oe=J.projectionMatrix.elements,Se=ie.projectionMatrix.elements,_e=oe[14]/(oe[10]-1),Pe=oe[14]/(oe[10]+1),De=(oe[9]+1)/oe[5],ce=(oe[9]-1)/oe[5],D=(oe[8]-1)/oe[0],Ye=(Se[8]+1)/Se[0],Ie=_e*D,k=_e*Ye,xe=Y/(-D+Ye),$e=xe*-D;if(J.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX($e),z.translateZ(xe),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert(),oe[10]===-1)z.projectionMatrix.copy(J.projectionMatrix),z.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const Ee=_e+xe,C=Pe+xe,S=Ie-$e,G=k+(Y-$e),ne=De*Pe/C*Ee,ee=ce*Pe/C*Ee;z.projectionMatrix.makePerspective(S,G,ne,ee,Ee,C),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}}function ae(z,J){J===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(J.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(i===null)return;let J=z.near,ie=z.far;g.texture!==null&&(g.depthNear>0&&(J=g.depthNear),g.depthFar>0&&(ie=g.depthFar)),v.near=I.near=w.near=J,v.far=I.far=w.far=ie,(L!==v.near||N!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),L=v.near,N=v.far),w.layers.mask=z.layers.mask|2,I.layers.mask=z.layers.mask|4,v.layers.mask=w.layers.mask|I.layers.mask;const Y=z.parent,oe=v.cameras;ae(v,Y);for(let Se=0;Se<oe.length;Se++)ae(oe[Se],Y);oe.length===2?H(v,w,I):v.projectionMatrix.copy(w.projectionMatrix),y(z,v,Y)};function y(z,J,ie){ie===null?z.matrix.copy(J.matrixWorld):(z.matrix.copy(ie.matrixWorld),z.matrix.invert(),z.matrix.multiply(J.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(J.projectionMatrix),z.projectionMatrixInverse.copy(J.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=Bc*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(z){l=z,f!==null&&(f.fixedFoveation=z),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(v)};let P=null;function re(z,J){if(u=J.getViewerPose(c||a),_=J,u!==null){const ie=u.views;h!==null&&(e.setRenderTargetFramebuffer(T,h.framebuffer),e.setRenderTarget(T));let Y=!1;ie.length!==v.cameras.length&&(v.cameras.length=0,Y=!0);for(let _e=0;_e<ie.length;_e++){const Pe=ie[_e];let De=null;if(h!==null)De=h.getViewport(Pe);else{const D=d.getViewSubImage(f,Pe);De=D.viewport,_e===0&&(e.setRenderTargetTextures(T,D.colorTexture,f.ignoreDepthValues?void 0:D.depthStencilTexture),e.setRenderTarget(T))}let ce=b[_e];ce===void 0&&(ce=new Qn,ce.layers.enable(_e),ce.viewport=new Ft,b[_e]=ce),ce.matrix.fromArray(Pe.transform.matrix),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.projectionMatrix.fromArray(Pe.projectionMatrix),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert(),ce.viewport.set(De.x,De.y,De.width,De.height),_e===0&&(v.matrix.copy(ce.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),Y===!0&&v.cameras.push(ce)}const oe=i.enabledFeatures;if(oe&&oe.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&d){const _e=d.getDepthInformation(ie[0]);_e&&_e.isValid&&_e.texture&&g.init(e,_e,i.renderState)}}for(let ie=0;ie<E.length;ie++){const Y=x[ie],oe=E[ie];Y!==null&&oe!==void 0&&oe.update(Y,J,c||a)}P&&P(z,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),_=null}const de=new rh;de.setAnimationLoop(re),this.setAnimationLoop=function(z){P=z},this.dispose=function(){}}}const Sr=new Hi,kx=new Ot;function zx(r,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Jf(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,T,E,x){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),d(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m)):m.isMeshStandardMaterial?(s(p,m),f(p,m),m.isMeshPhysicalMaterial&&h(p,m,x)):m.isMeshMatcapMaterial?(s(p,m),_(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),g(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,T,E):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Tn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Tn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const T=e.get(m),E=T.envMap,x=T.envMapRotation;E&&(p.envMap.value=E,Sr.copy(x),Sr.x*=-1,Sr.y*=-1,Sr.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Sr.y*=-1,Sr.z*=-1),p.envMapRotation.value.setFromMatrix4(kx.makeRotationFromEuler(Sr)),p.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,T,E){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*T,p.scale.value=E*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function h(p,m,T){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Tn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=T.texture,p.transmissionSamplerSize.value.set(T.width,T.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,m){m.matcap&&(p.matcap.value=m.matcap)}function g(p,m){const T=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(T.matrixWorld),p.nearDistance.value=T.shadow.camera.near,p.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Bx(r,e,t,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,E){const x=E.program;n.uniformBlockBinding(T,x)}function c(T,E){let x=i[T.id];x===void 0&&(_(T),x=u(T),i[T.id]=x,T.addEventListener("dispose",p));const A=E.program;n.updateUBOMapping(T,A);const R=e.render.frame;s[T.id]!==R&&(f(T),s[T.id]=R)}function u(T){const E=d();T.__bindingPointIndex=E;const x=r.createBuffer(),A=T.__size,R=T.usage;return r.bindBuffer(r.UNIFORM_BUFFER,x),r.bufferData(r.UNIFORM_BUFFER,A,R),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,E,x),x}function d(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){const E=i[T.id],x=T.uniforms,A=T.__cache;r.bindBuffer(r.UNIFORM_BUFFER,E);for(let R=0,w=x.length;R<w;R++){const I=Array.isArray(x[R])?x[R]:[x[R]];for(let b=0,v=I.length;b<v;b++){const L=I[b];if(h(L,R,b,A)===!0){const N=L.__offset,B=Array.isArray(L.value)?L.value:[L.value];let q=0;for(let K=0;K<B.length;K++){const $=B[K],X=g($);typeof $=="number"||typeof $=="boolean"?(L.__data[0]=$,r.bufferSubData(r.UNIFORM_BUFFER,N+q,L.__data)):$.isMatrix3?(L.__data[0]=$.elements[0],L.__data[1]=$.elements[1],L.__data[2]=$.elements[2],L.__data[3]=0,L.__data[4]=$.elements[3],L.__data[5]=$.elements[4],L.__data[6]=$.elements[5],L.__data[7]=0,L.__data[8]=$.elements[6],L.__data[9]=$.elements[7],L.__data[10]=$.elements[8],L.__data[11]=0):($.toArray(L.__data,q),q+=X.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,N,L.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function h(T,E,x,A){const R=T.value,w=E+"_"+x;if(A[w]===void 0)return typeof R=="number"||typeof R=="boolean"?A[w]=R:A[w]=R.clone(),!0;{const I=A[w];if(typeof R=="number"||typeof R=="boolean"){if(I!==R)return A[w]=R,!0}else if(I.equals(R)===!1)return I.copy(R),!0}return!1}function _(T){const E=T.uniforms;let x=0;const A=16;for(let w=0,I=E.length;w<I;w++){const b=Array.isArray(E[w])?E[w]:[E[w]];for(let v=0,L=b.length;v<L;v++){const N=b[v],B=Array.isArray(N.value)?N.value:[N.value];for(let q=0,K=B.length;q<K;q++){const $=B[q],X=g($),H=x%A,ae=H%X.boundary,y=H+ae;x+=ae,y!==0&&A-y<X.storage&&(x+=A-y),N.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=x,x+=X.storage}}}const R=x%A;return R>0&&(x+=A-R),T.__size=x,T.__cache={},this}function g(T){const E={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(E.boundary=4,E.storage=4):T.isVector2?(E.boundary=8,E.storage=8):T.isVector3||T.isColor?(E.boundary=16,E.storage=12):T.isVector4?(E.boundary=16,E.storage=16):T.isMatrix3?(E.boundary=48,E.storage=48):T.isMatrix4?(E.boundary=64,E.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),E}function p(T){const E=T.target;E.removeEventListener("dispose",p);const x=a.indexOf(E.__bindingPointIndex);a.splice(x,1),r.deleteBuffer(i[E.id]),delete i[E.id],delete s[E.id]}function m(){for(const T in i)r.deleteBuffer(i[T]);a=[],i={},s={}}return{bind:l,update:c,dispose:m}}class Hx{constructor(e={}){const{canvas:t=Sm(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=a;const _=new Uint32Array(4),g=new Int32Array(4);let p=null,m=null;const T=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Jn,this.toneMapping=rr,this.toneMappingExposure=1;const x=this;let A=!1,R=0,w=0,I=null,b=-1,v=null;const L=new Ft,N=new Ft;let B=null;const q=new lt(0);let K=0,$=t.width,X=t.height,H=1,ae=null,y=null;const P=new Ft(0,0,$,X),re=new Ft(0,0,$,X);let de=!1;const z=new th;let J=!1,ie=!1;this.transmissionResolutionScale=1;const Y=new Ot,oe=new Ot,Se=new j,_e=new Ft,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let De=!1;function ce(){return I===null?H:1}let D=n;function Ye(M,O){return t.getContext(M,O)}try{const M={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${du}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",he,!1),t.addEventListener("webglcontextcreationerror",ve,!1),D===null){const O="webgl2";if(D=Ye(O,M),D===null)throw Ye(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let Ie,k,xe,$e,Ee,C,S,G,ne,ee,Q,pe,fe,me,We,le,ue,Ne,ke,we,Ke,He,ot,U;function ge(){Ie=new Zv(D),Ie.init(),He=new Ix(D,Ie),k=new Xv(D,Ie,e,He),xe=new Dx(D,Ie),k.reverseDepthBuffer&&f&&xe.buffers.depth.setReversed(!0),$e=new e0(D),Ee=new vx,C=new Lx(D,Ie,xe,Ee,k,He,$e),S=new $v(x),G=new Kv(x),ne=new og(D),ot=new Vv(D,ne),ee=new Jv(D,ne,$e,ot),Q=new n0(D,ee,ne,$e),ke=new t0(D,k,C),le=new qv(Ee),pe=new _x(x,S,G,Ie,k,ot,le),fe=new zx(x,Ee),me=new yx,We=new wx(Ie),Ne=new Gv(x,S,G,xe,Q,h,l),ue=new Rx(x,Q,k),U=new Bx(D,$e,k,xe),we=new Wv(D,Ie,$e),Ke=new Qv(D,Ie,$e),$e.programs=pe.programs,x.capabilities=k,x.extensions=Ie,x.properties=Ee,x.renderLists=me,x.shadowMap=ue,x.state=xe,x.info=$e}ge();const Z=new Ox(x,D);this.xr=Z,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const M=Ie.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Ie.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(M){M!==void 0&&(H=M,this.setSize($,X,!1))},this.getSize=function(M){return M.set($,X)},this.setSize=function(M,O,W=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=M,X=O,t.width=Math.floor(M*H),t.height=Math.floor(O*H),W===!0&&(t.style.width=M+"px",t.style.height=O+"px"),this.setViewport(0,0,M,O)},this.getDrawingBufferSize=function(M){return M.set($*H,X*H).floor()},this.setDrawingBufferSize=function(M,O,W){$=M,X=O,H=W,t.width=Math.floor(M*W),t.height=Math.floor(O*W),this.setViewport(0,0,M,O)},this.getCurrentViewport=function(M){return M.copy(L)},this.getViewport=function(M){return M.copy(P)},this.setViewport=function(M,O,W,V){M.isVector4?P.set(M.x,M.y,M.z,M.w):P.set(M,O,W,V),xe.viewport(L.copy(P).multiplyScalar(H).round())},this.getScissor=function(M){return M.copy(re)},this.setScissor=function(M,O,W,V){M.isVector4?re.set(M.x,M.y,M.z,M.w):re.set(M,O,W,V),xe.scissor(N.copy(re).multiplyScalar(H).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(M){xe.setScissorTest(de=M)},this.setOpaqueSort=function(M){ae=M},this.setTransparentSort=function(M){y=M},this.getClearColor=function(M){return M.copy(Ne.getClearColor())},this.setClearColor=function(){Ne.setClearColor.apply(Ne,arguments)},this.getClearAlpha=function(){return Ne.getClearAlpha()},this.setClearAlpha=function(){Ne.setClearAlpha.apply(Ne,arguments)},this.clear=function(M=!0,O=!0,W=!0){let V=0;if(M){let F=!1;if(I!==null){const se=I.texture.format;F=se===_u||se===gu||se===mu}if(F){const se=I.texture.type,be=se===Bi||se===Vr||se===ya||se===Us||se===hu||se===pu,Ce=Ne.getClearColor(),Ae=Ne.getClearAlpha(),Oe=Ce.r,Be=Ce.g,Fe=Ce.b;be?(_[0]=Oe,_[1]=Be,_[2]=Fe,_[3]=Ae,D.clearBufferuiv(D.COLOR,0,_)):(g[0]=Oe,g[1]=Be,g[2]=Fe,g[3]=Ae,D.clearBufferiv(D.COLOR,0,g))}else V|=D.COLOR_BUFFER_BIT}O&&(V|=D.DEPTH_BUFFER_BIT),W&&(V|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",he,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),Ne.dispose(),me.dispose(),We.dispose(),Ee.dispose(),S.dispose(),G.dispose(),Q.dispose(),ot.dispose(),U.dispose(),pe.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",ye),Z.removeEventListener("sessionend",Xe),Ue.stop()};function te(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function he(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const M=$e.autoReset,O=ue.enabled,W=ue.autoUpdate,V=ue.needsUpdate,F=ue.type;ge(),$e.autoReset=M,ue.enabled=O,ue.autoUpdate=W,ue.needsUpdate=V,ue.type=F}function ve(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Ge(M){const O=M.target;O.removeEventListener("dispose",Ge),ct(O)}function ct(M){Pt(M),Ee.remove(M)}function Pt(M){const O=Ee.get(M).programs;O!==void 0&&(O.forEach(function(W){pe.releaseProgram(W)}),M.isShaderMaterial&&pe.releaseShaderCache(M))}this.renderBufferDirect=function(M,O,W,V,F,se){O===null&&(O=Pe);const be=F.isMesh&&F.matrixWorld.determinant()<0,Ce=Ln(M,O,W,V,F);xe.setMaterial(V,be);let Ae=W.index,Oe=1;if(V.wireframe===!0){if(Ae=ee.getWireframeAttribute(W),Ae===void 0)return;Oe=2}const Be=W.drawRange,Fe=W.attributes.position;let je=Be.start*Oe,ht=(Be.start+Be.count)*Oe;se!==null&&(je=Math.max(je,se.start*Oe),ht=Math.min(ht,(se.start+se.count)*Oe)),Ae!==null?(je=Math.max(je,0),ht=Math.min(ht,Ae.count)):Fe!=null&&(je=Math.max(je,0),ht=Math.min(ht,Fe.count));const kt=ht-je;if(kt<0||kt===1/0)return;ot.setup(F,V,Ce,W,Ae);let Dt,ut=we;if(Ae!==null&&(Dt=ne.get(Ae),ut=Ke,ut.setIndex(Dt)),F.isMesh)V.wireframe===!0?(xe.setLineWidth(V.wireframeLinewidth*ce()),ut.setMode(D.LINES)):ut.setMode(D.TRIANGLES);else if(F.isLine){let ze=V.linewidth;ze===void 0&&(ze=1),xe.setLineWidth(ze*ce()),F.isLineSegments?ut.setMode(D.LINES):F.isLineLoop?ut.setMode(D.LINE_LOOP):ut.setMode(D.LINE_STRIP)}else F.isPoints?ut.setMode(D.POINTS):F.isSprite&&ut.setMode(D.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ut.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ie.get("WEBGL_multi_draw"))ut.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const ze=F._multiDrawStarts,Qt=F._multiDrawCounts,pt=F._multiDrawCount,si=Ae?ne.get(Ae).bytesPerElement:1,jr=Ee.get(V).currentProgram.getUniforms();for(let In=0;In<pt;In++)jr.setValue(D,"_gl_DrawID",In),ut.render(ze[In]/si,Qt[In])}else if(F.isInstancedMesh)ut.renderInstances(je,kt,F.count);else if(W.isInstancedBufferGeometry){const ze=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Qt=Math.min(W.instanceCount,ze);ut.renderInstances(je,kt,Qt)}else ut.render(je,kt)};function Te(M,O,W){M.transparent===!0&&M.side===Ii&&M.forceSinglePass===!1?(M.side=Tn,M.needsUpdate=!0,xt(M,O,W),M.side=cr,M.needsUpdate=!0,xt(M,O,W),M.side=Ii):xt(M,O,W)}this.compile=function(M,O,W=null){W===null&&(W=M),m=We.get(W),m.init(O),E.push(m),W.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),M!==W&&M.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),m.setupLights();const V=new Set;return M.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const se=F.material;if(se)if(Array.isArray(se))for(let be=0;be<se.length;be++){const Ce=se[be];Te(Ce,W,F),V.add(Ce)}else Te(se,W,F),V.add(se)}),E.pop(),m=null,V},this.compileAsync=function(M,O,W=null){const V=this.compile(M,O,W);return new Promise(F=>{function se(){if(V.forEach(function(be){Ee.get(be).currentProgram.isReady()&&V.delete(be)}),V.size===0){F(M);return}setTimeout(se,10)}Ie.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let Le=null;function Ze(M){Le&&Le(M)}function ye(){Ue.stop()}function Xe(){Ue.start()}const Ue=new rh;Ue.setAnimationLoop(Ze),typeof self<"u"&&Ue.setContext(self),this.setAnimationLoop=function(M){Le=M,Z.setAnimationLoop(M),M===null?Ue.stop():Ue.start()},Z.addEventListener("sessionstart",ye),Z.addEventListener("sessionend",Xe),this.render=function(M,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(O),O=Z.getCamera()),M.isScene===!0&&M.onBeforeRender(x,M,O,I),m=We.get(M,E.length),m.init(O),E.push(m),oe.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),z.setFromProjectionMatrix(oe),ie=this.localClippingEnabled,J=le.init(this.clippingPlanes,ie),p=me.get(M,T.length),p.init(),T.push(p),Z.enabled===!0&&Z.isPresenting===!0){const se=x.xr.getDepthSensingMesh();se!==null&&Ve(se,O,-1/0,x.sortObjects)}Ve(M,O,0,x.sortObjects),p.finish(),x.sortObjects===!0&&p.sort(ae,y),De=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,De&&Ne.addToRenderList(p,M),this.info.render.frame++,J===!0&&le.beginShadows();const W=m.state.shadowsArray;ue.render(W,M,O),J===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=p.opaque,F=p.transmissive;if(m.setupLights(),O.isArrayCamera){const se=O.cameras;if(F.length>0)for(let be=0,Ce=se.length;be<Ce;be++){const Ae=se[be];rt(V,F,M,Ae)}De&&Ne.render(M);for(let be=0,Ce=se.length;be<Ce;be++){const Ae=se[be];It(p,M,Ae,Ae.viewport)}}else F.length>0&&rt(V,F,M,O),De&&Ne.render(M),It(p,M,O);I!==null&&w===0&&(C.updateMultisampleRenderTarget(I),C.updateRenderTargetMipmap(I)),M.isScene===!0&&M.onAfterRender(x,M,O),ot.resetDefaultState(),b=-1,v=null,E.pop(),E.length>0?(m=E[E.length-1],J===!0&&le.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,T.pop(),T.length>0?p=T[T.length-1]:p=null};function Ve(M,O,W,V){if(M.visible===!1)return;if(M.layers.test(O.layers)){if(M.isGroup)W=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(O);else if(M.isLight)m.pushLight(M),M.castShadow&&m.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||z.intersectsSprite(M)){V&&_e.setFromMatrixPosition(M.matrixWorld).applyMatrix4(oe);const be=Q.update(M),Ce=M.material;Ce.visible&&p.push(M,be,Ce,W,_e.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||z.intersectsObject(M))){const be=Q.update(M),Ce=M.material;if(V&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),_e.copy(M.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),_e.copy(be.boundingSphere.center)),_e.applyMatrix4(M.matrixWorld).applyMatrix4(oe)),Array.isArray(Ce)){const Ae=be.groups;for(let Oe=0,Be=Ae.length;Oe<Be;Oe++){const Fe=Ae[Oe],je=Ce[Fe.materialIndex];je&&je.visible&&p.push(M,be,je,W,_e.z,Fe)}}else Ce.visible&&p.push(M,be,Ce,W,_e.z,null)}}const se=M.children;for(let be=0,Ce=se.length;be<Ce;be++)Ve(se[be],O,W,V)}function It(M,O,W,V){const F=M.opaque,se=M.transmissive,be=M.transparent;m.setupLightsView(W),J===!0&&le.setGlobalState(x.clippingPlanes,W),V&&xe.viewport(L.copy(V)),F.length>0&&Mt(F,O,W),se.length>0&&Mt(se,O,W),be.length>0&&Mt(be,O,W),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function rt(M,O,W,V){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[V.id]===void 0&&(m.state.transmissionRenderTarget[V.id]=new Wr(1,1,{generateMipmaps:!0,type:Ie.has("EXT_color_buffer_half_float")||Ie.has("EXT_color_buffer_float")?La:Bi,minFilter:Ir,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:dt.workingColorSpace}));const se=m.state.transmissionRenderTarget[V.id],be=V.viewport||L;se.setSize(be.z*x.transmissionResolutionScale,be.w*x.transmissionResolutionScale);const Ce=x.getRenderTarget();x.setRenderTarget(se),x.getClearColor(q),K=x.getClearAlpha(),K<1&&x.setClearColor(16777215,.5),x.clear(),De&&Ne.render(W);const Ae=x.toneMapping;x.toneMapping=rr;const Oe=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),m.setupLightsView(V),J===!0&&le.setGlobalState(x.clippingPlanes,V),Mt(M,W,V),C.updateMultisampleRenderTarget(se),C.updateRenderTargetMipmap(se),Ie.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let Fe=0,je=O.length;Fe<je;Fe++){const ht=O[Fe],kt=ht.object,Dt=ht.geometry,ut=ht.material,ze=ht.group;if(ut.side===Ii&&kt.layers.test(V.layers)){const Qt=ut.side;ut.side=Tn,ut.needsUpdate=!0,Gt(kt,W,V,Dt,ut,ze),ut.side=Qt,ut.needsUpdate=!0,Be=!0}}Be===!0&&(C.updateMultisampleRenderTarget(se),C.updateRenderTargetMipmap(se))}x.setRenderTarget(Ce),x.setClearColor(q,K),Oe!==void 0&&(V.viewport=Oe),x.toneMapping=Ae}function Mt(M,O,W){const V=O.isScene===!0?O.overrideMaterial:null;for(let F=0,se=M.length;F<se;F++){const be=M[F],Ce=be.object,Ae=be.geometry,Oe=V===null?be.material:V,Be=be.group;Ce.layers.test(W.layers)&&Gt(Ce,O,W,Ae,Oe,Be)}}function Gt(M,O,W,V,F,se){M.onBeforeRender(x,O,W,V,F,se),M.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),F.onBeforeRender(x,O,W,V,M,se),F.transparent===!0&&F.side===Ii&&F.forceSinglePass===!1?(F.side=Tn,F.needsUpdate=!0,x.renderBufferDirect(W,O,V,F,M,se),F.side=cr,F.needsUpdate=!0,x.renderBufferDirect(W,O,V,F,M,se),F.side=Ii):x.renderBufferDirect(W,O,V,F,M,se),M.onAfterRender(x,O,W,V,F,se)}function xt(M,O,W){O.isScene!==!0&&(O=Pe);const V=Ee.get(M),F=m.state.lights,se=m.state.shadowsArray,be=F.state.version,Ce=pe.getParameters(M,F.state,se,O,W),Ae=pe.getProgramCacheKey(Ce);let Oe=V.programs;V.environment=M.isMeshStandardMaterial?O.environment:null,V.fog=O.fog,V.envMap=(M.isMeshStandardMaterial?G:S).get(M.envMap||V.environment),V.envMapRotation=V.environment!==null&&M.envMap===null?O.environmentRotation:M.envMapRotation,Oe===void 0&&(M.addEventListener("dispose",Ge),Oe=new Map,V.programs=Oe);let Be=Oe.get(Ae);if(Be!==void 0){if(V.currentProgram===Be&&V.lightsStateVersion===be)return ft(M,Ce),Be}else Ce.uniforms=pe.getUniforms(M),M.onBeforeCompile(Ce,x),Be=pe.acquireProgram(Ce,Ae),Oe.set(Ae,Be),V.uniforms=Ce.uniforms;const Fe=V.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Fe.clippingPlanes=le.uniform),ft(M,Ce),V.needsLights=un(M),V.lightsStateVersion=be,V.needsLights&&(Fe.ambientLightColor.value=F.state.ambient,Fe.lightProbe.value=F.state.probe,Fe.directionalLights.value=F.state.directional,Fe.directionalLightShadows.value=F.state.directionalShadow,Fe.spotLights.value=F.state.spot,Fe.spotLightShadows.value=F.state.spotShadow,Fe.rectAreaLights.value=F.state.rectArea,Fe.ltc_1.value=F.state.rectAreaLTC1,Fe.ltc_2.value=F.state.rectAreaLTC2,Fe.pointLights.value=F.state.point,Fe.pointLightShadows.value=F.state.pointShadow,Fe.hemisphereLights.value=F.state.hemi,Fe.directionalShadowMap.value=F.state.directionalShadowMap,Fe.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Fe.spotShadowMap.value=F.state.spotShadowMap,Fe.spotLightMatrix.value=F.state.spotLightMatrix,Fe.spotLightMap.value=F.state.spotLightMap,Fe.pointShadowMap.value=F.state.pointShadowMap,Fe.pointShadowMatrix.value=F.state.pointShadowMatrix),V.currentProgram=Be,V.uniformsList=null,Be}function yt(M){if(M.uniformsList===null){const O=M.currentProgram.getUniforms();M.uniformsList=Co.seqWithValue(O.seq,M.uniforms)}return M.uniformsList}function ft(M,O){const W=Ee.get(M);W.outputColorSpace=O.outputColorSpace,W.batching=O.batching,W.batchingColor=O.batchingColor,W.instancing=O.instancing,W.instancingColor=O.instancingColor,W.instancingMorph=O.instancingMorph,W.skinning=O.skinning,W.morphTargets=O.morphTargets,W.morphNormals=O.morphNormals,W.morphColors=O.morphColors,W.morphTargetsCount=O.morphTargetsCount,W.numClippingPlanes=O.numClippingPlanes,W.numIntersection=O.numClipIntersection,W.vertexAlphas=O.vertexAlphas,W.vertexTangents=O.vertexTangents,W.toneMapping=O.toneMapping}function Ln(M,O,W,V,F){O.isScene!==!0&&(O=Pe),C.resetTextureUnits();const se=O.fog,be=V.isMeshStandardMaterial?O.environment:null,Ce=I===null?x.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Ns,Ae=(V.isMeshStandardMaterial?G:S).get(V.envMap||be),Oe=V.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Be=!!W.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Fe=!!W.morphAttributes.position,je=!!W.morphAttributes.normal,ht=!!W.morphAttributes.color;let kt=rr;V.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(kt=x.toneMapping);const Dt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ut=Dt!==void 0?Dt.length:0,ze=Ee.get(V),Qt=m.state.lights;if(J===!0&&(ie===!0||M!==v)){const dn=M===v&&V.id===b;le.setState(V,M,dn)}let pt=!1;V.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==Qt.state.version||ze.outputColorSpace!==Ce||F.isBatchedMesh&&ze.batching===!1||!F.isBatchedMesh&&ze.batching===!0||F.isBatchedMesh&&ze.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&ze.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&ze.instancing===!1||!F.isInstancedMesh&&ze.instancing===!0||F.isSkinnedMesh&&ze.skinning===!1||!F.isSkinnedMesh&&ze.skinning===!0||F.isInstancedMesh&&ze.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&ze.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&ze.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&ze.instancingMorph===!1&&F.morphTexture!==null||ze.envMap!==Ae||V.fog===!0&&ze.fog!==se||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==le.numPlanes||ze.numIntersection!==le.numIntersection)||ze.vertexAlphas!==Oe||ze.vertexTangents!==Be||ze.morphTargets!==Fe||ze.morphNormals!==je||ze.morphColors!==ht||ze.toneMapping!==kt||ze.morphTargetsCount!==ut)&&(pt=!0):(pt=!0,ze.__version=V.version);let si=ze.currentProgram;pt===!0&&(si=xt(V,O,F));let jr=!1,In=!1,qs=!1;const Tt=si.getUniforms(),Yn=ze.uniforms;if(xe.useProgram(si.program)&&(jr=!0,In=!0,qs=!0),V.id!==b&&(b=V.id,In=!0),jr||v!==M){xe.buffers.depth.getReversed()?(Y.copy(M.projectionMatrix),Em(Y),Tm(Y),Tt.setValue(D,"projectionMatrix",Y)):Tt.setValue(D,"projectionMatrix",M.projectionMatrix),Tt.setValue(D,"viewMatrix",M.matrixWorldInverse);const yn=Tt.map.cameraPosition;yn!==void 0&&yn.setValue(D,Se.setFromMatrixPosition(M.matrixWorld)),k.logarithmicDepthBuffer&&Tt.setValue(D,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&Tt.setValue(D,"isOrthographic",M.isOrthographicCamera===!0),v!==M&&(v=M,In=!0,qs=!0)}if(F.isSkinnedMesh){Tt.setOptional(D,F,"bindMatrix"),Tt.setOptional(D,F,"bindMatrixInverse");const dn=F.skeleton;dn&&(dn.boneTexture===null&&dn.computeBoneTexture(),Tt.setValue(D,"boneTexture",dn.boneTexture,C))}F.isBatchedMesh&&(Tt.setOptional(D,F,"batchingTexture"),Tt.setValue(D,"batchingTexture",F._matricesTexture,C),Tt.setOptional(D,F,"batchingIdTexture"),Tt.setValue(D,"batchingIdTexture",F._indirectTexture,C),Tt.setOptional(D,F,"batchingColorTexture"),F._colorsTexture!==null&&Tt.setValue(D,"batchingColorTexture",F._colorsTexture,C));const jn=W.morphAttributes;if((jn.position!==void 0||jn.normal!==void 0||jn.color!==void 0)&&ke.update(F,W,si),(In||ze.receiveShadow!==F.receiveShadow)&&(ze.receiveShadow=F.receiveShadow,Tt.setValue(D,"receiveShadow",F.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Yn.envMap.value=Ae,Yn.flipEnvMap.value=Ae.isCubeTexture&&Ae.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&O.environment!==null&&(Yn.envMapIntensity.value=O.environmentIntensity),In&&(Tt.setValue(D,"toneMappingExposure",x.toneMappingExposure),ze.needsLights&&Et(Yn,qs),se&&V.fog===!0&&fe.refreshFogUniforms(Yn,se),fe.refreshMaterialUniforms(Yn,V,H,X,m.state.transmissionRenderTarget[M.id]),Co.upload(D,yt(ze),Yn,C)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Co.upload(D,yt(ze),Yn,C),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&Tt.setValue(D,"center",F.center),Tt.setValue(D,"modelViewMatrix",F.modelViewMatrix),Tt.setValue(D,"normalMatrix",F.normalMatrix),Tt.setValue(D,"modelMatrix",F.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const dn=V.uniformsGroups;for(let yn=0,ll=dn.length;yn<ll;yn++){const gr=dn[yn];U.update(gr,si),U.bind(gr,si)}}return si}function Et(M,O){M.ambientLightColor.needsUpdate=O,M.lightProbe.needsUpdate=O,M.directionalLights.needsUpdate=O,M.directionalLightShadows.needsUpdate=O,M.pointLights.needsUpdate=O,M.pointLightShadows.needsUpdate=O,M.spotLights.needsUpdate=O,M.spotLightShadows.needsUpdate=O,M.rectAreaLights.needsUpdate=O,M.hemisphereLights.needsUpdate=O}function un(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(M,O,W){Ee.get(M.texture).__webglTexture=O,Ee.get(M.depthTexture).__webglTexture=W;const V=Ee.get(M);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=W===void 0,V.__autoAllocateDepthBuffer||Ie.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(M,O){const W=Ee.get(M);W.__webglFramebuffer=O,W.__useDefaultFramebuffer=O===void 0};const $n=D.createFramebuffer();this.setRenderTarget=function(M,O=0,W=0){I=M,R=O,w=W;let V=!0,F=null,se=!1,be=!1;if(M){const Ae=Ee.get(M);if(Ae.__useDefaultFramebuffer!==void 0)xe.bindFramebuffer(D.FRAMEBUFFER,null),V=!1;else if(Ae.__webglFramebuffer===void 0)C.setupRenderTarget(M);else if(Ae.__hasExternalTextures)C.rebindTextures(M,Ee.get(M.texture).__webglTexture,Ee.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Fe=M.depthTexture;if(Ae.__boundDepthTexture!==Fe){if(Fe!==null&&Ee.has(Fe)&&(M.width!==Fe.image.width||M.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(M)}}const Oe=M.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(be=!0);const Be=Ee.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Be[O])?F=Be[O][W]:F=Be[O],se=!0):M.samples>0&&C.useMultisampledRTT(M)===!1?F=Ee.get(M).__webglMultisampledFramebuffer:Array.isArray(Be)?F=Be[W]:F=Be,L.copy(M.viewport),N.copy(M.scissor),B=M.scissorTest}else L.copy(P).multiplyScalar(H).floor(),N.copy(re).multiplyScalar(H).floor(),B=de;if(W!==0&&(F=$n),xe.bindFramebuffer(D.FRAMEBUFFER,F)&&V&&xe.drawBuffers(M,F),xe.viewport(L),xe.scissor(N),xe.setScissorTest(B),se){const Ae=Ee.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+O,Ae.__webglTexture,W)}else if(be){const Ae=Ee.get(M.texture),Oe=O;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ae.__webglTexture,W,Oe)}else if(M!==null&&W!==0){const Ae=Ee.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ae.__webglTexture,W)}b=-1},this.readRenderTargetPixels=function(M,O,W,V,F,se,be){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Ee.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&be!==void 0&&(Ce=Ce[be]),Ce){xe.bindFramebuffer(D.FRAMEBUFFER,Ce);try{const Ae=M.texture,Oe=Ae.format,Be=Ae.type;if(!k.textureFormatReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!k.textureTypeReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=M.width-V&&W>=0&&W<=M.height-F&&D.readPixels(O,W,V,F,He.convert(Oe),He.convert(Be),se)}finally{const Ae=I!==null?Ee.get(I).__webglFramebuffer:null;xe.bindFramebuffer(D.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(M,O,W,V,F,se,be){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=Ee.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&be!==void 0&&(Ce=Ce[be]),Ce){const Ae=M.texture,Oe=Ae.format,Be=Ae.type;if(!k.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!k.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=M.width-V&&W>=0&&W<=M.height-F){xe.bindFramebuffer(D.FRAMEBUFFER,Ce);const Fe=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Fe),D.bufferData(D.PIXEL_PACK_BUFFER,se.byteLength,D.STREAM_READ),D.readPixels(O,W,V,F,He.convert(Oe),He.convert(Be),0);const je=I!==null?Ee.get(I).__webglFramebuffer:null;xe.bindFramebuffer(D.FRAMEBUFFER,je);const ht=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Mm(D,ht,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Fe),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,se),D.deleteBuffer(Fe),D.deleteSync(ht),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(M,O=null,W=0){M.isTexture!==!0&&(ps("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,M=arguments[1]);const V=Math.pow(2,-W),F=Math.floor(M.image.width*V),se=Math.floor(M.image.height*V),be=O!==null?O.x:0,Ce=O!==null?O.y:0;C.setTexture2D(M,0),D.copyTexSubImage2D(D.TEXTURE_2D,W,0,0,be,Ce,F,se),xe.unbindTexture()};const Vt=D.createFramebuffer(),Wt=D.createFramebuffer();this.copyTextureToTexture=function(M,O,W=null,V=null,F=0,se=null){M.isTexture!==!0&&(ps("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,M=arguments[1],O=arguments[2],se=arguments[3]||0,W=null),se===null&&(F!==0?(ps("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),se=F,F=0):se=0);let be,Ce,Ae,Oe,Be,Fe,je,ht,kt;const Dt=M.isCompressedTexture?M.mipmaps[se]:M.image;if(W!==null)be=W.max.x-W.min.x,Ce=W.max.y-W.min.y,Ae=W.isBox3?W.max.z-W.min.z:1,Oe=W.min.x,Be=W.min.y,Fe=W.isBox3?W.min.z:0;else{const jn=Math.pow(2,-F);be=Math.floor(Dt.width*jn),Ce=Math.floor(Dt.height*jn),M.isDataArrayTexture?Ae=Dt.depth:M.isData3DTexture?Ae=Math.floor(Dt.depth*jn):Ae=1,Oe=0,Be=0,Fe=0}V!==null?(je=V.x,ht=V.y,kt=V.z):(je=0,ht=0,kt=0);const ut=He.convert(O.format),ze=He.convert(O.type);let Qt;O.isData3DTexture?(C.setTexture3D(O,0),Qt=D.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(C.setTexture2DArray(O,0),Qt=D.TEXTURE_2D_ARRAY):(C.setTexture2D(O,0),Qt=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,O.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,O.unpackAlignment);const pt=D.getParameter(D.UNPACK_ROW_LENGTH),si=D.getParameter(D.UNPACK_IMAGE_HEIGHT),jr=D.getParameter(D.UNPACK_SKIP_PIXELS),In=D.getParameter(D.UNPACK_SKIP_ROWS),qs=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,Dt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Dt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Oe),D.pixelStorei(D.UNPACK_SKIP_ROWS,Be),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Fe);const Tt=M.isDataArrayTexture||M.isData3DTexture,Yn=O.isDataArrayTexture||O.isData3DTexture;if(M.isDepthTexture){const jn=Ee.get(M),dn=Ee.get(O),yn=Ee.get(jn.__renderTarget),ll=Ee.get(dn.__renderTarget);xe.bindFramebuffer(D.READ_FRAMEBUFFER,yn.__webglFramebuffer),xe.bindFramebuffer(D.DRAW_FRAMEBUFFER,ll.__webglFramebuffer);for(let gr=0;gr<Ae;gr++)Tt&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ee.get(M).__webglTexture,F,Fe+gr),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ee.get(O).__webglTexture,se,kt+gr)),D.blitFramebuffer(Oe,Be,be,Ce,je,ht,be,Ce,D.DEPTH_BUFFER_BIT,D.NEAREST);xe.bindFramebuffer(D.READ_FRAMEBUFFER,null),xe.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(F!==0||M.isRenderTargetTexture||Ee.has(M)){const jn=Ee.get(M),dn=Ee.get(O);xe.bindFramebuffer(D.READ_FRAMEBUFFER,Vt),xe.bindFramebuffer(D.DRAW_FRAMEBUFFER,Wt);for(let yn=0;yn<Ae;yn++)Tt?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,jn.__webglTexture,F,Fe+yn):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,jn.__webglTexture,F),Yn?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,dn.__webglTexture,se,kt+yn):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,dn.__webglTexture,se),F!==0?D.blitFramebuffer(Oe,Be,be,Ce,je,ht,be,Ce,D.COLOR_BUFFER_BIT,D.NEAREST):Yn?D.copyTexSubImage3D(Qt,se,je,ht,kt+yn,Oe,Be,be,Ce):D.copyTexSubImage2D(Qt,se,je,ht,Oe,Be,be,Ce);xe.bindFramebuffer(D.READ_FRAMEBUFFER,null),xe.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Yn?M.isDataTexture||M.isData3DTexture?D.texSubImage3D(Qt,se,je,ht,kt,be,Ce,Ae,ut,ze,Dt.data):O.isCompressedArrayTexture?D.compressedTexSubImage3D(Qt,se,je,ht,kt,be,Ce,Ae,ut,Dt.data):D.texSubImage3D(Qt,se,je,ht,kt,be,Ce,Ae,ut,ze,Dt):M.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,se,je,ht,be,Ce,ut,ze,Dt.data):M.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,se,je,ht,Dt.width,Dt.height,ut,Dt.data):D.texSubImage2D(D.TEXTURE_2D,se,je,ht,be,Ce,ut,ze,Dt);D.pixelStorei(D.UNPACK_ROW_LENGTH,pt),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,si),D.pixelStorei(D.UNPACK_SKIP_PIXELS,jr),D.pixelStorei(D.UNPACK_SKIP_ROWS,In),D.pixelStorei(D.UNPACK_SKIP_IMAGES,qs),se===0&&O.generateMipmaps&&D.generateMipmap(Qt),xe.unbindTexture()},this.copyTextureToTexture3D=function(M,O,W=null,V=null,F=0){return M.isTexture!==!0&&(ps("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,V=arguments[1]||null,M=arguments[2],O=arguments[3],F=arguments[4]||0),ps('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(M,O,W,V,F)},this.initRenderTarget=function(M){Ee.get(M).__webglFramebuffer===void 0&&C.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?C.setTextureCube(M,0):M.isData3DTexture?C.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?C.setTexture2DArray(M,0):C.setTexture2D(M,0),xe.unbindTexture()},this.resetState=function(){R=0,w=0,I=null,xe.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=dt._getUnpackColorSpace()}}function Gx(r){if(!r)return null;const e=new Km,t=new Qn(60,window.innerWidth/window.innerHeight,.1,100);t.position.z=25;let n;try{n=new Hx({canvas:r,alpha:!0,antialias:!0,powerPreference:"high-performance"})}catch(L){return console.warn("WebGL initialization failed, running lightweight mode.",L),null}n.setPixelRatio(Math.min(window.devicePixelRatio,2)),n.setSize(r.clientWidth||window.innerWidth,r.clientHeight||window.innerHeight);const s=window.innerWidth<768?80:220,a=[new lt(16747058),new lt(15250794),new lt(16729943),new lt(16777215)],o=new Ei,l=new Float32Array(s*3),c=new Float32Array(s*3),u=new Float32Array(s);for(let L=0;L<s;L++){l[L*3]=(Math.random()-.5)*50,l[L*3+1]=(Math.random()-.5)*35,l[L*3+2]=(Math.random()-.5)*40;const N=a[Math.floor(Math.random()*a.length)];c[L*3]=N.r,c[L*3+1]=N.g,c[L*3+2]=N.b,u[L]=Math.random()*2+1}o.setAttribute("position",new Vn(l,3)),o.setAttribute("color",new Vn(c,3)),o.setAttribute("scale",new Vn(u,1));const d=document.createElement("canvas");d.width=64,d.height=64;const f=d.getContext("2d"),h=f.createRadialGradient(32,32,0,32,32,32);h.addColorStop(0,"rgba(255, 255, 255, 1)"),h.addColorStop(.3,"rgba(255, 180, 80, 0.8)"),h.addColorStop(.8,"rgba(255, 138, 50, 0.2)"),h.addColorStop(1,"rgba(0, 0, 0, 0)"),f.fillStyle=h,f.fillRect(0,0,64,64);const _=new eg(d),g=new nh({size:2.5,vertexColors:!0,map:_,transparent:!0,opacity:.75,blending:ec,depthWrite:!1}),p=new Qm(o,g);e.add(p);const m=new xu(12,.08,16,64),T=new vu({color:15250794,wireframe:!0,transparent:!0,opacity:.12}),E=new vi(m,T);E.rotation.x=Math.PI/3,e.add(E);let x=0,A=0;const R=L=>{x=(L.clientX/window.innerWidth-.5)*2,A=(L.clientY/window.innerHeight-.5)*2};window.addEventListener("mousemove",R,{passive:!0});const w=()=>{const L=r.clientWidth||window.innerWidth,N=r.clientHeight||window.innerHeight;t.aspect=L/N,t.updateProjectionMatrix(),n.setSize(L,N)};window.addEventListener("resize",w);let I=null;const b=new sg,v=()=>{const L=b.getElapsedTime();p.rotation.y=L*.03+x*.1,p.rotation.x=L*.015-A*.1,E.rotation.z=L*.05,E.rotation.y=L*.02,n.render(e,t),I=requestAnimationFrame(v)};return v(),{destroy:()=>{I&&cancelAnimationFrame(I),window.removeEventListener("mousemove",R),window.removeEventListener("resize",w),o.dispose(),g.dispose(),m.dispose(),T.dispose(),n.dispose()}}}function Vx(r,e){if(!r)return null;const t=r.getContext("2d");let n=r.width=r.clientWidth||800,i=r.height=r.clientHeight||500;const s=[{id:"turmeric",label:"Turmeric",category:"spice",color:"#FFB800",radius:24,x:n*.32,y:i*.4,vx:0,vy:0,compounds:["curcumin","ar-turmerone","zingiberene","cineole"]},{id:"ginger",label:"Ginger",category:"aromatic",color:"#E8B56A",radius:22,x:n*.22,y:i*.65,vx:0,vy:0,compounds:["gingerol","shogaol","zingiberene","citral"]},{id:"black_pepper",label:"Black Pepper",category:"spice",color:"#708090",radius:20,x:n*.48,y:i*.3,vx:0,vy:0,compounds:["piperine","beta-caryophyllene","pinene"]},{id:"cloves",label:"Cloves",category:"spice",color:"#A0522D",radius:22,x:n*.68,y:i*.32,vx:0,vy:0,compounds:["eugenol","eugenyl acetate","beta-caryophyllene"]},{id:"cinnamon",label:"Cinnamon",category:"spice",color:"#D2691E",radius:22,x:n*.8,y:i*.5,vx:0,vy:0,compounds:["cinnamaldehyde","eugenol","linalool"]},{id:"cardamom",label:"Cardamom",category:"spice",color:"#556B2F",radius:20,x:n*.65,y:i*.68,vx:0,vy:0,compounds:["1,8-cineole","terpinyl acetate","linalool"]},{id:"cumin",label:"Cumin",category:"spice",color:"#CD853F",radius:24,x:n*.45,y:i*.62,vx:0,vy:0,compounds:["cuminaldehyde","cymene","pinene"]},{id:"coriander",label:"Coriander",category:"spice",color:"#DAA520",radius:20,x:n*.5,y:i*.8,vx:0,vy:0,compounds:["linalool","alpha-pinene","camphor"]},{id:"garlic",label:"Garlic",category:"aromatic",color:"#E0E0E0",radius:22,x:n*.18,y:i*.35,vx:0,vy:0,compounds:["allicin","diallyl disulfide","trisulfide"]}],a=[{source:"turmeric",target:"ginger",shared:"zingiberene, curcumenol",strength:.9},{source:"turmeric",target:"black_pepper",shared:"bioavailability enhancer (piperine + curcumin)",strength:.95},{source:"cloves",target:"cinnamon",shared:"eugenol, caryophyllene",strength:.92},{source:"cardamom",target:"cinnamon",shared:"linalool, terpenes",strength:.82},{source:"cumin",target:"coriander",shared:"pinene, cymene terpenes",strength:.88},{source:"cumin",target:"black_pepper",shared:"pinene, warm terpenes",strength:.75},{source:"garlic",target:"ginger",shared:"sulfur-phenol culinary synergy",strength:.85}];let o=s[0],l=null,c=null;function u(p){e&&(e.innerHTML=`
      <div class="glass-panel" style="padding: 16px; border: 1px solid rgba(255, 138, 50, 0.3); background: rgba(14, 14, 14, 0.85);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <h4 style="color: ${p.color}; font-size: 1.15rem; font-weight: 700;">${p.label}</h4>
          <span class="badge badge-amber" style="font-size: 0.7rem;">FlavorDB Entity</span>
        </div>
        <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 8px;">
          Dominant volatile aroma compounds:
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;">
          ${p.compounds.map(m=>`<span class="compound-pill" style="border-color: ${p.color}55; color: #FFF;">${m}</span>`).join("")}
        </div>
        <p style="font-size: 0.78rem; color: var(--text-muted); font-family: var(--font-mono);">
          Click any connected node to inspect molecular pairing synergy.
        </p>
      </div>
    `)}u(o);let d=0;function f(){d+=.02,t.clearRect(0,0,n,i),a.forEach(p=>{const m=s.find(x=>x.id===p.source),T=s.find(x=>x.id===p.target);if(!m||!T)return;const E=o&&(o.id===m.id||o.id===T.id);if(t.beginPath(),t.moveTo(m.x,m.y),t.lineTo(T.x,T.y),E?(t.strokeStyle="#FF8A32",t.lineWidth=2.5,t.setLineDash([])):(t.strokeStyle="rgba(255, 255, 255, 0.12)",t.lineWidth=1,t.setLineDash([4,4])),t.stroke(),E){const x=(m.x+T.x)/2,A=(m.y+T.y)/2;t.font='10px "JetBrains Mono", monospace',t.fillStyle="#080808";const R=p.shared,w=t.measureText(R).width;t.fillStyle="rgba(24, 24, 24, 0.9)",t.fillRect(x-w/2-6,A-10,w+12,18),t.strokeStyle="rgba(255, 138, 50, 0.5)",t.strokeRect(x-w/2-6,A-10,w+12,18),t.fillStyle="#E8B56A",t.fillText(R,x-w/2,A+3)}}),s.forEach((p,m)=>{const T=Math.sin(d+m*1.2)*4,E=p.y+T,x=o&&o.id===p.id,A=l&&l.id===p.id;(x||A)&&(t.beginPath(),t.arc(p.x,E,p.radius+10,0,Math.PI*2),t.fillStyle=`${p.color}33`,t.fill()),t.beginPath(),t.arc(p.x,E,p.radius,0,Math.PI*2),t.fillStyle="#141414",t.fill(),t.lineWidth=x?3:1.5,t.strokeStyle=p.color,t.stroke(),t.beginPath(),t.arc(p.x,E,6,0,Math.PI*2),t.fillStyle=p.color,t.fill(),t.font=`${x?"bold":"normal"} 12px "Plus Jakarta Sans", sans-serif`,t.fillStyle="#F5F0E9",t.textAlign="center",t.fillText(p.label,p.x,E+p.radius+16)}),c=requestAnimationFrame(f)}c=requestAnimationFrame(f);const h=p=>{const m=r.getBoundingClientRect(),T=p.clientX-m.left,E=p.clientY-m.top;let x=null;return s.forEach(A=>{Math.hypot(A.x-T,A.y-E)<A.radius+12&&(x=A)}),x},_=p=>{l=h(p),r.style.cursor=l?"pointer":"default"},g=p=>{const m=h(p);m&&(o=m,u(m))};return r.addEventListener("mousemove",_),r.addEventListener("click",g),{destroy:()=>{c&&cancelAnimationFrame(c),r.removeEventListener("mousemove",_),r.removeEventListener("click",g)}}}function Di(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function ch(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.15.1
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Wn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ba={duration:.5,overwrite:!1,delay:0},bu,tn,wt,ni=1e8,vt=1/ni,Vc=Math.PI*2,Wx=Vc/4,Xx=0,uh=Math.sqrt,qx=Math.cos,$x=Math.sin,Jt=function(e){return typeof e=="string"},Lt=function(e){return typeof e=="function"},Gi=function(e){return typeof e=="number"},Su=function(e){return typeof e>"u"},Mi=function(e){return typeof e=="object"},An=function(e){return e!==!1},Mu=function(){return typeof window<"u"},co=function(e){return Lt(e)||Jt(e)},dh=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},cn=Array.isArray,Yx=/random\([^)]+\)/g,jx=/,\s*/g,$d=/(?:-?\.?\d|\.)+/gi,fh=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,vs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,zl=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,hh=/[+-]=-?[.\d]+/,Kx=/[^,'"\[\]\s]+/gi,Zx=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Ct,hi,Wc,Eu,Xn={},Ho={},ph,mh=function(e){return(Ho=ks(e,Xn))&&Dn},Tu=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Sa=function(e,t){return!t&&console.warn(e)},gh=function(e,t){return e&&(Xn[e]=t)&&Ho&&(Ho[e]=t)||Xn},Ma=function(){return 0},Jx={suppressEvents:!0,isStart:!0,kill:!1},Ro={suppressEvents:!0,kill:!1},Qx={suppressEvents:!0},wu={},sr=[],Xc={},_h,kn={},Bl={},Yd=30,Po=[],Au="",Cu=function(e){var t=e[0],n,i;if(Mi(t)||Lt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=Po.length;i--&&!Po[i].targetTest(t););n=Po[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new zh(e[i],n)))||e.splice(i,1);return e},Nr=function(e){return e._gsap||Cu(ii(e))[0]._gsap},vh=function(e,t,n){return(n=e[t])&&Lt(n)?e[t]():Su(n)&&e.getAttribute&&e.getAttribute(t)||n},Cn=function(e,t){return(e=e.split(",")).forEach(t)||e},Ut=function(e){return Math.round(e*1e5)/1e5||0},At=function(e){return Math.round(e*1e7)/1e7||0},Es=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},ey=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Go=function(){var e=sr.length,t=sr.slice(0),n,i;for(Xc={},sr.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Ru=function(e){return!!(e._initted||e._startAt||e.add)},xh=function(e,t,n,i){sr.length&&!tn&&Go(),e.render(t,n,!!(tn&&t<0&&Ru(e))),sr.length&&!tn&&Go()},yh=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Kx).length<2?t:Jt(e)?e.trim():e},bh=function(e){return e},qn=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},ty=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},ks=function(e,t){for(var n in t)e[n]=t[n];return e},jd=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Mi(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Vo=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},ca=function(e){var t=e.parent||Ct,n=e.keyframes?ty(cn(e.keyframes)):qn;if(An(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},ny=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},Sh=function(e,t,n,i,s){var a=e[i],o;if(s)for(o=t[s];a&&a[s]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=a,t.parent=t._dp=e,t},rl=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,a=t._next;s?s._next=a:e[n]===t&&(e[n]=a),a?a._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},dr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Or=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},iy=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},qc=function(e,t,n,i){return e._startAt&&(tn?e._startAt.revert(Ro):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},ry=function r(e){return!e||e._ts&&r(e.parent)},Kd=function(e){return e._repeat?zs(e._tTime,e=e.duration()+e._rDelay)*e:0},zs=function(e,t){var n=Math.floor(e=At(e/t));return e&&n===e?n-1:n},Wo=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},sl=function(e){return e._end=At(e._start+(e._tDur/Math.abs(e._ts||e._rts||vt)||0))},al=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=At(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),sl(e),n._dirty||Or(n,e)),e},Mh=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Wo(e.rawTime(),t),(!t._dur||ka(0,t.totalDuration(),n)-t._tTime>vt)&&t.render(n,!0)),Or(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-vt}},gi=function(e,t,n,i){return t.parent&&dr(t),t._start=At((Gi(n)?n:!n&&Xo(t)&&(!e._last||e._last._start>=e._time)?e._last?e._last._start:e._time:n||e!==Ct?Zn(e,n,t):e._time)+t._delay),t._end=At(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Sh(e,t,"_first","_last",e._sort?"_start":0),Xo(t)||(e._recent=t),i||Mh(e,t),e._ts<0&&al(e,e._tTime),e},Eh=function(e,t){return(Xn.ScrollTrigger||Tu("scrollTrigger",t))&&Xn.ScrollTrigger.create(t,e)},Th=function(e,t,n,i,s){if(Du(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!tn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&_h!==Bn.frame)return sr.push(e),e._lazy=[s,i],1},sy=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},Xo=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},ay=function(e,t,n,i){var s=e.ratio,a=t<0||!t&&(!e._start&&sy(e)&&!(!e._initted&&Xo(e))||(e._ts<0||e._dp._ts<0)&&!Xo(e))?0:1,o=e._rDelay,l=0,c,u,d;if(o&&e._repeat&&(l=ka(0,e._tDur,t),u=zs(l,o),e._yoyo&&u&1&&(a=1-a),u!==zs(e._tTime,o)&&(s=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==s||tn||i||e._zTime===vt||!t&&e._zTime){if(!e._initted&&Th(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?vt:0),n||(n=t&&!d),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=l,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&qc(e,t,n,!0),e._onUpdate&&!n&&Hn(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&Hn(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&dr(e,1),!n&&!tn&&(Hn(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},oy=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Bs=function(e,t,n,i){var s=e._repeat,a=At(t)||0,o=e._tTime/e._tDur;return o&&!i&&(e._time*=a/e._dur),e._dur=a,e._tDur=s?s<0?1e10:At(a*(s+1)+e._rDelay*s):a,o>0&&!i&&al(e,e._tTime=e._tDur*o),e.parent&&sl(e),n||Or(e.parent,e),e},Zd=function(e){return e instanceof Mn?Or(e):Bs(e,e._dur)},ly={_start:0,endTime:Ma,totalDuration:Ma},Zn=function r(e,t,n){var i=e.labels,s=e._recent||ly,a=e.duration()>=ni?s.endTime(!1):e._dur,o,l,c;return Jt(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(t in i||(i[t]=a),i[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&n&&(l=l/100*(cn(n)?n[0]:n).totalDuration()),o>1?r(e,t.substr(0,o-1),n)+l:a+l)):t==null?a:+t},ua=function(e,t,n){var i=Gi(t[1]),s=(i?2:1)+(e<2?0:1),a=t[s],o,l;if(i&&(a.duration=t[1]),a.parent=n,e){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=An(l.vars.inherit)&&l.parent;a.immediateRender=An(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[s-1]}return new Ht(t[0],a,t[s+1])},mr=function(e,t){return e||e===0?t(e):t},ka=function(e,t,n){return n<e?e:n>t?t:n},on=function(e,t){return!Jt(e)||!(t=Zx.exec(e))?"":t[1]},cy=function(e,t,n){return mr(n,function(i){return ka(e,t,i)})},$c=[].slice,wh=function(e,t){return e&&Mi(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Mi(e[0]))&&!e.nodeType&&e!==hi},uy=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return Jt(i)&&!t||wh(i,1)?(s=n).push.apply(s,ii(i)):n.push(i)})||n},ii=function(e,t,n){return wt&&!t&&wt.selector?wt.selector(e):Jt(e)&&!n&&(Wc||!Hs())?$c.call((t||Eu).querySelectorAll(e),0):cn(e)?uy(e,n):wh(e)?$c.call(e,0):e?[e]:[]},Yc=function(e){return e=ii(e)[0]||Sa("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return ii(t,n.querySelectorAll?n:n===e?Sa("Invalid scope")||Eu.createElement("div"):e)}},Ah=function(e){return e.sort(function(){return .5-Math.random()})},Ch=function(e){if(Lt(e))return e;var t=Mi(e)?e:{each:e},n=kr(t.ease),i=t.from||0,s=parseFloat(t.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=t.axis,u=i,d=i;return Jt(i)?u=d={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(u=i[0],d=i[1]),function(f,h,_){var g=(_||t).length,p=a[g],m,T,E,x,A,R,w,I,b;if(!p){if(b=t.grid==="auto"?0:(t.grid||[1,ni])[1],!b){for(w=-ni;w<(w=_[b++].getBoundingClientRect().left)&&b<g;);b<g&&b--}for(p=a[g]=[],m=l?Math.min(b,g)*u-.5:i%b,T=b===ni?0:l?g*d/b-.5:i/b|0,w=0,I=ni,R=0;R<g;R++)E=R%b-m,x=T-(R/b|0),p[R]=A=c?Math.abs(c==="y"?x:E):uh(E*E+x*x),A>w&&(w=A),A<I&&(I=A);i==="random"&&Ah(p),p.max=w-I,p.min=I,p.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(b>g?g-1:c?c==="y"?g/b:b:Math.max(b,g/b))||0)*(i==="edges"?-1:1),p.b=g<0?s-g:s,p.u=on(t.amount||t.each)||0,n=n&&g<0?My(n):n}return g=(p[f]-p.min)/p.max||0,At(p.b+(n?n(g):g)*p.v)+p.u}},jc=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=At(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(Gi(n)?0:on(n))}},Rh=function(e,t){var n=cn(e),i,s;return!n&&Mi(e)&&(i=n=e.radius||ni,e.values?(e=ii(e.values),(s=!Gi(e[0]))&&(i*=i)):e=jc(e.increment)),mr(t,n?Lt(e)?function(a){return s=e(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=ni,u=0,d=e.length,f,h;d--;)s?(f=e[d].x-o,h=e[d].y-l,f=f*f+h*h):f=Math.abs(e[d]-o),f<c&&(c=f,u=d);return u=!i||c<=i?e[u]:a,s||u===a||Gi(a)?u:u+on(a)}:jc(e))},Ph=function(e,t,n,i){return mr(cn(e)?!t:n===!0?!!(n=0):!i,function(){return cn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},dy=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,a){return a(s)},i)}},fy=function(e,t){return function(n){return e(parseFloat(n))+(t||on(n))}},hy=function(e,t,n){return Lh(e,t,0,1,n)},Dh=function(e,t,n){return mr(n,function(i){return e[~~t(i)]})},py=function r(e,t,n){var i=t-e;return cn(e)?Dh(e,r(0,e.length),t):mr(n,function(s){return(i+(s-e)%i)%i+e})},my=function r(e,t,n){var i=t-e,s=i*2;return cn(e)?Dh(e,r(0,e.length-1),t):mr(n,function(a){return a=(s+(a-e)%s)%s||0,e+(a>i?s-a:a)})},Ea=function(e){return e.replace(Yx,function(t){var n=t.indexOf("[")+1,i=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(jx);return Ph(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},Lh=function(e,t,n,i,s){var a=t-e,o=i-n;return mr(s,function(l){return n+((l-e)/a*o||0)})},gy=function r(e,t,n,i){var s=isNaN(e+t)?0:function(h){return(1-h)*e+h*t};if(!s){var a=Jt(e),o={},l,c,u,d,f;if(n===!0&&(i=1)&&(n=null),a)e={p:e},t={p:t};else if(cn(e)&&!cn(t)){for(u=[],d=e.length,f=d-2,c=1;c<d;c++)u.push(r(e[c-1],e[c]));d--,s=function(_){_*=d;var g=Math.min(f,~~_);return u[g](_-g)},n=t}else i||(e=ks(cn(e)?[]:{},e));if(!u){for(l in t)Pu.call(o,e,l,"get",t[l]);s=function(_){return Uu(_,o)||(a?e.p:e)}}}return mr(n,s)},Jd=function(e,t,n){var i=e.labels,s=ni,a,o,l;for(a in i)o=i[a]-t,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},Hn=function(e,t,n){var i=e.vars,s=i[t],a=wt,o=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&sr.length&&Go(),o&&(wt=o),u=l?s.apply(c,l):s.call(c),wt=a,u},na=function(e){return dr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!tn),e.progress()<1&&Hn(e,"onInterrupt"),e},xs,Ih=[],Uh=function(e){if(e)if(e=!e.name&&e.default||e,Mu()||e.headless){var t=e.name,n=Lt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Ma,render:Uu,add:Pu,kill:Iy,modifier:Ly,rawVars:0},a={targetTest:0,get:0,getSetter:Iu,aliases:{},register:0};if(Hs(),e!==i){if(kn[t])return;qn(i,qn(Vo(e,s),a)),ks(i.prototype,ks(s,Vo(e,a))),kn[i.prop=t]=i,e.targetTest&&(Po.push(i),wu[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}gh(t,i),e.register&&e.register(Dn,i,Rn)}else Ih.push(e)},bt=255,ia={aqua:[0,bt,bt],lime:[0,bt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,bt],navy:[0,0,128],white:[bt,bt,bt],olive:[128,128,0],yellow:[bt,bt,0],orange:[bt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[bt,0,0],pink:[bt,192,203],cyan:[0,bt,bt],transparent:[bt,bt,bt,0]},Hl=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*bt+.5|0},Fh=function(e,t,n){var i=e?Gi(e)?[e>>16,e>>8&bt,e&bt]:0:ia.black,s,a,o,l,c,u,d,f,h,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),ia[e])i=ia[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+s+s+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&bt,i&bt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&bt,e&bt]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match($d),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,a=u<=.5?u*(c+1):u+c-u*c,s=u*2-a,i.length>3&&(i[3]*=1),i[0]=Hl(l+1/3,s,a),i[1]=Hl(l,s,a),i[2]=Hl(l-1/3,s,a);else if(~e.indexOf("="))return i=e.match(fh),n&&i.length<4&&(i[3]=1),i}else i=e.match($d)||ia.transparent;i=i.map(Number)}return t&&!_&&(s=i[0]/bt,a=i[1]/bt,o=i[2]/bt,d=Math.max(s,a,o),f=Math.min(s,a,o),u=(d+f)/2,d===f?l=c=0:(h=d-f,c=u>.5?h/(2-d-f):h/(d+f),l=d===s?(a-o)/h+(a<o?6:0):d===a?(o-s)/h+2:(s-a)/h+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},Nh=function(e){var t=[],n=[],i=-1;return e.split(ar).forEach(function(s){var a=s.match(vs)||[];t.push.apply(t,a),n.push(i+=a.length+1)}),t.c=n,t},Qd=function(e,t,n){var i="",s=(e+i).match(ar),a=t?"hsla(":"rgba(",o=0,l,c,u,d;if(!s)return e;if(s=s.map(function(f){return(f=Fh(f,t,1))&&a+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=Nh(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(ar,"1").split(vs),d=c.length-1;o<d;o++)i+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(ar),d=c.length-1;o<d;o++)i+=c[o]+s[o];return i+c[d]},ar=(function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in ia)r+="|"+e+"\\b";return new RegExp(r+")","gi")})(),_y=/hsl[a]?\(/,Oh=function(e){var t=e.join(" "),n;if(ar.lastIndex=0,ar.test(t))return n=_y.test(t),e[1]=Qd(e[1],n),e[0]=Qd(e[0],n,Nh(e[1])),!0},Ta,Bn=(function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,a=s,o=[],l,c,u,d,f,h,_=function g(p){var m=r()-i,T=p===!0,E,x,A,R;if((m>e||m<0)&&(n+=m-t),i+=m,A=i-n,E=A-a,(E>0||T)&&(R=++d.frame,f=A-d.time*1e3,d.time=A=A/1e3,a+=E+(E>=s?0:s-E),x=1),T||(l=c(g)),x)for(h=0;h<o.length;h++)o[h](A,f,R,p)};return d={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(p){return f/(1e3/(p||60))},wake:function(){ph&&(!Wc&&Mu()&&(hi=Wc=window,Eu=hi.document||{},Xn.gsap=Dn,(hi.gsapVersions||(hi.gsapVersions=[])).push(Dn.version),mh(Ho||hi.GreenSockGlobals||!hi.gsap&&hi||{}),Ih.forEach(Uh)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(p){return setTimeout(p,a-d.time*1e3+1|0)},Ta=1,_(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Ta=0,c=Ma},lagSmoothing:function(p,m){e=p||1/0,t=Math.min(m||33,e)},fps:function(p){s=1e3/(p||240),a=d.time*1e3+s},add:function(p,m,T){var E=m?function(x,A,R,w){p(x,A,R,w),d.remove(E)}:p;return d.remove(p),o[T?"unshift":"push"](E),Hs(),E},remove:function(p,m){~(m=o.indexOf(p))&&o.splice(m,1)&&h>=m&&h--},_listeners:o},d})(),Hs=function(){return!Ta&&Bn.wake()},at={},vy=/^[\d.\-M][\d.\-,\s]/,xy=/["']/g,yy=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[i]=isNaN(c)?c.replace(xy,"").trim():+c,i=l.substr(o+1).trim();return t},by=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},Sy=function(e){var t=(e+"").split("("),n=at[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[yy(t[1])]:by(e).split(",").map(yh)):at._CE&&vy.test(e)?at._CE("",e):n},My=function(e){return function(t){return 1-e(1-t)}},kr=function(e,t){return e&&(Lt(e)?e:at[e]||Sy(e))||t},Yr=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},a;return Cn(e,function(o){at[o]=Xn[o]=s,at[a=o.toLowerCase()]=n;for(var l in s)at[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=at[o+"."+l]=s[l]}),s},kh=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Gl=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),a=s/Vc*(Math.asin(1/i)||0),o=function(u){return u===1?1:i*Math.pow(2,-10*u)*$x((u-a)*s)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:kh(o);return s=Vc/s,l.config=function(c,u){return r(e,c,u)},l},Vl=function r(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:kh(n);return i.config=function(s){return r(e,s)},i};Cn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;Yr(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});at.Linear.easeNone=at.none=at.Linear.easeIn;Yr("Elastic",Gl("in"),Gl("out"),Gl());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(o){return o<t?r*o*o:o<n?r*Math.pow(o-1.5/e,2)+.75:o<i?r*(o-=2.25/e)*o+.9375:r*Math.pow(o-2.625/e,2)+.984375};Yr("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);Yr("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});Yr("Circ",function(r){return-(uh(1-r*r)-1)});Yr("Sine",function(r){return r===1?1:-qx(r*Wx)+1});Yr("Back",Vl("in"),Vl("out"),Vl());at.SteppedEase=at.steps=Xn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,a=1-vt;return function(o){return((i*ka(0,a,o)|0)+s)*n}}};ba.ease=at["quad.out"];Cn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Au+=r+","+r+"Params,"});var zh=function(e,t){this.id=Xx++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:vh,this.set=t?t.getSetter:Iu},wa=(function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Bs(this,+t.duration,1,1),this.data=t.data,wt&&(this._ctx=wt,wt.data.push(this)),Ta||Bn.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Bs(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Hs(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(al(this,n),!s._dp||s.parent||Mh(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&gi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===vt||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),xh(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Kd(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Kd(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?zs(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-vt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Wo(this.parent._time,this):this._tTime,a=this._rts<0;this._rts=+n||0,this._ts=this._ps||n===-vt?0:this._rts;var o=this.totalDuration();return(a!==this._rts<0||s>0&&s<o)&&this.totalTime(ka(-Math.abs(this._delay),o,s),i!==!1),sl(this),iy(this)},e.paused=function(n){if(!arguments.length)return this._ps;if(this._ps!==n)if(this._ps=n,n)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else{Hs(),this._ts=this._rts;var i=this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,s=this.progress()===1&&Math.abs(this._zTime)!==vt,a;if(s)for(this._tTime-=vt,a=this._first;a;){if(!a._dur&&a._zTime<0&&a._ts&&a._start<=i+vt){s=!1;break}a=a._next}this.totalTime(i,s)}return this},e.startTime=function(n){if(arguments.length){this._start=At(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&gi(i,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(An(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Wo(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=Qx);var i=tn;return tn=n,Ru(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),tn=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Zd(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Zd(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(Zn(this,n),An(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,An(i)),this._dur||(this._zTime=-vt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-vt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-vt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-vt)},e.eventCallback=function(n,i,s){var a=this.vars;return arguments.length>1?(i?(a[n]=i,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},e.then=function(n){var i=this,s=i._prom;return new Promise(function(a){var o=Lt(n)?n:bh,l=function(){var u=i.then;i.then=null,s&&s(),Lt(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=u),a(o),i.then=u};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},e.kill=function(){na(this)},r})();qn(wa.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-vt,_prom:0,_ps:!1,_rts:1});var Mn=(function(r){ch(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=An(n.sortChildren),Ct&&gi(n.parent||Ct,Di(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Eh(Di(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,a){return ua(0,arguments,this),this},t.from=function(i,s,a){return ua(1,arguments,this),this},t.fromTo=function(i,s,a,o){return ua(2,arguments,this),this},t.set=function(i,s,a){return s.duration=0,s.parent=this,ca(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Ht(i,s,Zn(this,a),1),this},t.call=function(i,s,a){return gi(this,Ht.delayedCall(0,i,s),a)},t.staggerTo=function(i,s,a,o,l,c,u){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=u,a.parent=this,new Ht(i,a,Zn(this,l)),this},t.staggerFrom=function(i,s,a,o,l,c,u){return a.runBackwards=1,ca(a).immediateRender=An(a.immediateRender),this.staggerTo(i,s,a,o,l,c,u)},t.staggerFromTo=function(i,s,a,o,l,c,u,d){return o.startAt=a,ca(o).immediateRender=An(o.immediateRender),this.staggerTo(i,s,o,l,c,u,d)},t.render=function(i,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:At(i),d=this._zTime<0!=i<0&&(this._initted||!c),f,h,_,g,p,m,T,E,x,A,R,w;if(this!==Ct&&u>l&&i>=0&&(u=l),u!==this._tTime||a||d){if(o!==this._time&&c&&(u+=this._time-o,i+=this._time-o),f=u,x=this._start,E=this._ts,m=!E,d&&(c||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(R=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,a);if(f=At(u%p),u===l?(g=this._repeat,f=c):(A=At(u/p),g=~~A,g&&g===A&&(f=c,g--),f>c&&(f=c)),A=zs(this._tTime,p),!o&&this._tTime&&A!==g&&this._tTime-A*p-this._dur<=0&&(A=g),R&&g&1&&(f=c-f,w=1),g!==A&&!this._lock){var I=R&&A&1,b=I===(R&&g&1);if(g<A&&(I=!I),o=I?0:u%c?c:u,this._lock=1,this.render(o||(w?0:At(g*p)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&Hn(this,"onRepeat"),this.vars.repeatRefresh&&!w&&(this.invalidate()._lock=1,A=g),o&&o!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,b&&(this._lock=2,o=I?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!w&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(T=oy(this,At(o),At(f)),T&&(u-=f-(f=T._start))),this._tTime=u,this._time=f,this._act=!!E,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&u&&c&&!s&&!A&&(Hn(this,"onStart"),this._tTime!==u))return this;if(f>=o&&i>=0)for(h=this._first;h;){if(_=h._next,(h._act||f>=h._start)&&h._ts&&T!==h){if(h.parent!==this)return this.render(i,s,a);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,s,a),f!==this._time||!this._ts&&!m){T=0,_&&(u+=this._zTime=-vt);break}}h=_}else{h=this._last;for(var v=i<0?i:f;h;){if(_=h._prev,(h._act||v<=h._end)&&h._ts&&T!==h){if(h.parent!==this)return this.render(i,s,a);if(h.render(h._ts>0?(v-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(v-h._start)*h._ts,s,a||tn&&Ru(h)),f!==this._time||!this._ts&&!m){T=0,_&&(u+=this._zTime=v?-vt:vt);break}}h=_}}if(T&&!s&&(this.pause(),T.render(f>=o?0:-vt)._zTime=f>=o?1:-1,this._ts))return this._start=x,sl(this),this.render(i,s,a);this._onUpdate&&!s&&Hn(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&o)&&(x===this._start||Math.abs(E)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&dr(this,1),!s&&!(i<0&&!o)&&(u||o||!l)&&(Hn(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var a=this;if(Gi(s)||(s=Zn(this,s,i)),!(i instanceof wa)){if(cn(i))return i.forEach(function(o){return a.add(o,s)}),this;if(Jt(i))return this.addLabel(i,s);if(Lt(i))i=Ht.delayedCall(0,i);else return this}return this!==i?gi(this,i,s):this},t.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-ni);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Ht?s&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},t.remove=function(i){return Jt(i)?this.removeLabel(i):Lt(i)?this.killTweensOf(i):(i.parent===this&&rl(this,i),i===this._recent&&(this._recent=this._last),Or(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=At(Bn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=Zn(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,a){var o=Ht.delayedCall(0,s||Ma,a);return o.data="isPause",this._hasPause=1,gi(this,o,Zn(this,i))},t.removePause=function(i){var s=this._first;for(i=Zn(this,i);s;)s._start===i&&s.data==="isPause"&&dr(s),s=s._next},t.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)Ji!==o[l]&&o[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var a=[],o=ii(i),l=this._first,c=Gi(s),u;l;)l instanceof Ht?ey(l._targets,o)&&(c?(!Ji||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(u=l.getTweensOf(o,s)).length&&a.push.apply(a,u),l=l._next;return a},t.tweenTo=function(i,s){s=s||{};var a=this,o=Zn(a,i),l=s,c=l.startAt,u=l.onStart,d=l.onStartParams,f=l.immediateRender,h,_=Ht.to(a,qn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||vt,onStart:function(){if(a.pause(),!h){var p=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());_._dur!==p&&Bs(_,p,0,1).render(_._time,!0,!0),h=1}u&&u.apply(_,d||[])}},s));return f?_.render(0):_},t.tweenFromTo=function(i,s,a){return this.tweenTo(s,qn({startAt:{time:Zn(this,i)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Jd(this,Zn(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Jd(this,Zn(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+vt)},t.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=At(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=i);return Or(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Or(this)},t.totalDuration=function(i){var s=0,a=this,o=a._last,l=ni,c,u,d;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(d=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,gi(a,o,u-o._delay,1)._lock=0):l=u,u<0&&o._ts&&(s-=u,(!d&&!a._dp||d&&d.smoothChildTiming)&&(a._start+=At(u/a._ts),a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;Bs(a,a===Ct&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(i){if(Ct._ts&&(xh(Ct,Wo(i,Ct)),_h=Bn.frame),Bn.frame>=Yd){Yd+=Wn.autoSleep||120;var s=Ct._first;if((!s||!s._ts)&&Wn.autoSleep&&Bn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Bn.sleep()}}},e})(wa);qn(Mn.prototype,{_lock:0,_hasPause:0,_forcing:0});var Ey=function(e,t,n,i,s,a,o){var l=new Rn(this._pt,e,t,0,1,Wh,null,s),c=0,u=0,d,f,h,_,g,p,m,T;for(l.b=n,l.e=i,n+="",i+="",(m=~i.indexOf("random("))&&(i=Ea(i)),a&&(T=[n,i],a(T,e,t),n=T[0],i=T[1]),f=n.match(zl)||[];d=zl.exec(i);)_=d[0],g=i.substring(c,d.index),h?h=(h+1)%5:g.substr(-5)==="rgba("&&(h=1),_!==f[u++]&&(p=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:p,c:_.charAt(1)==="="?Es(p,_)-p:parseFloat(_)-p,m:h&&h<4?Math.round:0},c=zl.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(hh.test(i)||m)&&(l.e=0),this._pt=l,l},Pu=function(e,t,n,i,s,a,o,l,c,u){Lt(i)&&(i=i(s||0,e,a));var d=e[t],f=n!=="get"?n:Lt(d)?c?e[t.indexOf("set")||!Lt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,h=Lt(d)?c?Ry:Gh:Lu,_;if(Jt(i)&&(~i.indexOf("random(")&&(i=Ea(i)),i.charAt(1)==="="&&(_=Es(f,i)+(on(f)||0),(_||_===0)&&(i=_))),!u||f!==i||Kc)return!isNaN(f*i)&&i!==""?(_=new Rn(this._pt,e,t,+f||0,i-(f||0),typeof d=="boolean"?Dy:Vh,0,h),c&&(_.fp=c),o&&_.modifier(o,this,e),this._pt=_):(!d&&!(t in e)&&Tu(t,i),Ey.call(this,e,t,f,i,h,l||Wn.stringFilter,c))},Ty=function(e,t,n,i,s){if(Lt(e)&&(e=da(e,s,t,n,i)),!Mi(e)||e.style&&e.nodeType||cn(e)||dh(e))return Jt(e)?da(e,s,t,n,i):e;var a={},o;for(o in e)a[o]=da(e[o],s,t,n,i);return a},Bh=function(e,t,n,i,s,a){var o,l,c,u;if(kn[e]&&(o=new kn[e]).init(s,o.rawVars?t[e]:Ty(t[e],i,s,a,n),n,i,a)!==!1&&(n._pt=l=new Rn(n._pt,s,e,0,1,o.render,o,0,o.priority),n!==xs))for(c=n._ptLookup[n._targets.indexOf(s)],u=o._props.length;u--;)c[o._props[u]]=l;return o},Ji,Kc,Du=function r(e,t,n){var i=e.vars,s=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,h=i.autoRevert,_=e._dur,g=e._startAt,p=e._targets,m=e.parent,T=m&&m.data==="nested"?m.vars.targets:p,E=e._overwrite==="auto"&&!bu,x=e.timeline,A=i.easeReverse||d,R,w,I,b,v,L,N,B,q,K,$,X,H;if(x&&(!f||!s)&&(s="none"),e._ease=kr(s,ba.ease),e._rEase=A&&(kr(A)||e._ease),e._from=!x&&!!i.runBackwards,e._from&&(e.ratio=1),!x||f&&!i.stagger){if(B=p[0]?Nr(p[0]).harness:0,X=B&&i[B.prop],R=Vo(i,wu),g&&(g._zTime<0&&g.progress(1),t<0&&u&&o&&!h?g.render(-1,!0):g.revert(u&&_?Ro:Jx),g._lazy=0),a){if(dr(e._startAt=Ht.set(p,qn({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!g&&An(l),startAt:null,delay:0,onUpdate:c&&function(){return Hn(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(tn||!o&&!h)&&e._startAt.revert(Ro),o&&_&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&_&&!g){if(t&&(o=!1),I=qn({overwrite:!1,data:"isFromStart",lazy:o&&!g&&An(l),immediateRender:o,stagger:0,parent:m},R),X&&(I[B.prop]=X),dr(e._startAt=Ht.set(p,I)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(tn?e._startAt.revert(Ro):e._startAt.render(-1,!0)),e._zTime=t,!o)r(e._startAt,vt,vt);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&An(l)||l&&!_,w=0;w<p.length;w++){if(v=p[w],N=v._gsap||Cu(p)[w]._gsap,e._ptLookup[w]=K={},Xc[N.id]&&sr.length&&Go(),$=T===p?w:T.indexOf(v),B&&(q=new B).init(v,X||R,e,$,T)!==!1&&(e._pt=b=new Rn(e._pt,v,q.name,0,1,q.render,q,0,q.priority),q._props.forEach(function(ae){K[ae]=b}),q.priority&&(L=1)),!B||X)for(I in R)kn[I]&&(q=Bh(I,R,e,$,v,T))?q.priority&&(L=1):K[I]=b=Pu.call(e,v,I,"get",R[I],$,T,0,i.stringFilter);e._op&&e._op[w]&&e.kill(v,e._op[w]),E&&e._pt&&(Ji=e,Ct.killTweensOf(v,K,e.globalTime(t)),H=!e.parent,Ji=0),e._pt&&l&&(Xc[N.id]=1)}L&&Xh(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!H,f&&t<=0&&x.render(ni,!0,!0)},wy=function(e,t,n,i,s,a,o,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,f,h;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,h=e._targets.length;h--;){if(u=f[h][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return Kc=1,e.vars[t]="+=0",Du(e,o),Kc=0,l?Sa(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(h=c.length;h--;)d=c[h],u=d._pt||d,u.s=(i||i===0)&&!s?i:u.s+(i||0)+a*u.c,u.c=n-u.s,d.e&&(d.e=Ut(n)+on(d.e)),d.b&&(d.b=u.s+on(d.b))},Ay=function(e,t){var n=e[0]?Nr(e[0]).harness:0,i=n&&n.aliases,s,a,o,l;if(!i)return t;s=ks({},t);for(a in i)if(a in s)for(l=i[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},Cy=function(e,t,n,i){var s=t.ease||i||"power1.inOut",a,o;if(cn(t))o=n[e]||(n[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:s})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:s})},da=function(e,t,n,i,s){return Lt(e)?e.call(t,n,i,s):Jt(e)&&~e.indexOf("random(")?Ea(e):e},qo=Au+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Hh={};Cn(qo+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Hh[r]=1});qo=qo.split(",");var Ht=(function(r){ch(e,r);function e(n,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=r.call(this,a?i:ca(i))||this;var l=o.vars,c=l.duration,u=l.delay,d=l.immediateRender,f=l.stagger,h=l.overwrite,_=l.keyframes,g=l.defaults,p=l.scrollTrigger,m=i.parent||Ct,T=(cn(n)||dh(n)?Gi(n[0]):"length"in i)?[n]:ii(n),E,x,A,R,w,I,b,v;if(o._targets=T.length?Cu(T):Sa("GSAP target "+n+" not found. https://gsap.com",!Wn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=h,_||f||co(c)||co(u)){i=o.vars;var L=i.easeReverse||i.yoyoEase;if(E=o.timeline=new Mn({data:"nested",defaults:g||{},targets:m&&m.data==="nested"?m.vars.targets:T}),E.kill(),E.parent=E._dp=Di(o),E._start=0,f||co(c)||co(u)){if(R=T.length,b=f&&Ch(f),Mi(f))for(w in f)~qo.indexOf(w)&&(v||(v={}),v[w]=f[w]);for(x=0;x<R;x++)A=Vo(i,Hh),A.stagger=0,L&&(A.easeReverse=L),v&&ks(A,v),I=T[x],A.duration=+da(c,Di(o),x,I,T),A.delay=(+da(u,Di(o),x,I,T)||0)-o._delay,!f&&R===1&&A.delay&&(o._delay=u=A.delay,o._start+=u,A.delay=0),E.to(I,A,b?b(x,I,T):0),E._ease=at.none;E.duration()?c=u=0:o.timeline=0}else if(_){ca(qn(E.vars.defaults,{ease:"none"})),E._ease=kr(_.ease||i.ease||"none");var N=0,B,q,K;if(cn(_))_.forEach(function($){return E.to(T,$,">")}),E.duration();else{A={};for(w in _)w==="ease"||w==="easeEach"||Cy(w,_[w],A,_.easeEach);for(w in A)for(B=A[w].sort(function($,X){return $.t-X.t}),N=0,x=0;x<B.length;x++)q=B[x],K={ease:q.e,duration:(q.t-(x?B[x-1].t:0))/100*c},K[w]=q.v,E.to(T,K,N),N+=K.duration;E.duration()<c&&E.to({},{duration:c-E.duration()})}}c||o.duration(c=E.duration())}else o.timeline=0;return h===!0&&!bu&&(Ji=Di(o),Ct.killTweensOf(T),Ji=0),gi(m,Di(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(d||!c&&!_&&o._start===At(m._time)&&An(d)&&ry(Di(o))&&m.data!=="nested")&&(o._tTime=-vt,o.render(Math.max(0,-u)||0)),p&&Eh(Di(o),p),o}var t=e.prototype;return t.render=function(i,s,a){var o=this._time,l=this._tDur,c=this._dur,u=i<0,d=i>l-vt&&!u?l:i<vt?0:i,f,h,_,g,p,m,T,E;if(!c)ay(this,i,s,a);else if(d!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=d,E=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+i,s,a);if(f=At(d%g),d===l?(_=this._repeat,f=c):(p=At(d/g),_=~~p,_&&_===p?(f=c,_--):f>c&&(f=c)),m=this._yoyo&&_&1,m&&(f=c-f),p=zs(this._tTime,g),f===o&&!a&&this._initted&&_===p)return this._tTime=d,this;_!==p&&this.vars.repeatRefresh&&!m&&!this._lock&&f!==g&&this._initted&&(this._lock=a=1,this.render(At(g*_),!0).invalidate()._lock=0)}if(!this._initted){if(Th(this,u?i:f,a,s,d))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&_!==p))return this;if(c!==this._dur)return this.render(i,s,a)}if(this._rEase){var x=f<o;if(x!==this._inv){var A=x?o:c-o;this._inv=x,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=A?(x?-1:1)/A:0,this._invScale=x?-this.ratio:1-this.ratio,this._invEase=x?this._rEase:this._ease}this.ratio=T=this._invRatio+this._invScale*this._invEase((f-this._invTime)*this._invRecip)}else this.ratio=T=this._ease(f/c);if(this._from&&(this.ratio=T=1-T),this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&d&&!s&&!p&&(Hn(this,"onStart"),this._tTime!==d))return this;for(h=this._pt;h;)h.r(T,h.d),h=h._next;E&&E.render(i<0?i:E._dur*E._ease(f/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&qc(this,i,s,a),Hn(this,"onUpdate")),this._repeat&&_!==p&&this.vars.onRepeat&&!s&&this.parent&&Hn(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&qc(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&dr(this,1),!s&&!(u&&!o)&&(d||o||m)&&(Hn(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,a,o,l){Ta||Bn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Du(this,c),u=this._ease(c/this._dur),wy(this,i,s,a,o,u,c,l)?this.resetTo(i,s,a,o,1):(al(this,0),this.parent||Sh(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?na(this):this.scrollTrigger&&this.scrollTrigger.kill(!!tn),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,Ji&&Ji.vars.overwrite!==!0)._first||na(this),this.parent&&a!==this.timeline.totalDuration()&&Bs(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?ii(i):o,c=this._ptLookup,u=this._pt,d,f,h,_,g,p,m;if((!s||s==="all")&&ny(o,l))return s==="all"&&(this._pt=0),na(this);for(d=this._op=this._op||[],s!=="all"&&(Jt(s)&&(g={},Cn(s,function(T){return g[T]=1}),s=g),s=Ay(o,s)),m=o.length;m--;)if(~l.indexOf(o[m])){f=c[m],s==="all"?(d[m]=s,_=f,h={}):(h=d[m]=d[m]||{},_=s);for(g in _)p=f&&f[g],p&&((!("kill"in p.d)||p.d.kill(g)===!0)&&rl(this,p,"_pt"),delete f[g]),h!=="all"&&(h[g]=1)}return this._initted&&!this._pt&&u&&na(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return ua(1,arguments)},e.delayedCall=function(i,s,a,o){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(i,s,a){return ua(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,a){return Ct.killTweensOf(i,s,a)},e})(wa);qn(Ht.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Cn("staggerTo,staggerFrom,staggerFromTo",function(r){Ht[r]=function(){var e=new Mn,t=$c.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var Lu=function(e,t,n){return e[t]=n},Gh=function(e,t,n){return e[t](n)},Ry=function(e,t,n,i){return e[t](i.fp,n)},Py=function(e,t,n){return e.setAttribute(t,n)},Iu=function(e,t){return Lt(e[t])?Gh:Su(e[t])&&e.setAttribute?Py:Lu},Vh=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},Dy=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Wh=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},Uu=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},Ly=function(e,t,n,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(e,t,n),s=a},Iy=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?rl(this,t,"_pt"):t.dep||(n=1),t=i;return!n},Uy=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},Xh=function(e){for(var t=e._pt,n,i,s,a;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:a)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:a=t,t=n}e._pt=s},Rn=(function(){function r(t,n,i,s,a,o,l,c,u){this.t=n,this.s=s,this.c=a,this.p=i,this.r=o||Vh,this.d=l||this,this.set=c||Lu,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=Uy,this.m=n,this.mt=s,this.tween=i},r})();Cn(Au+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return wu[r]=1});Xn.TweenMax=Xn.TweenLite=Ht;Xn.TimelineLite=Xn.TimelineMax=Mn;Ct=new Mn({sortChildren:!1,defaults:ba,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Wn.stringFilter=Oh;var zr=[],Do={},Fy=[],ef=0,Ny=0,Wl=function(e){return(Do[e]||Fy).map(function(t){return t()})},Aa=function(){var e=Date.now(),t=[];e-ef>2&&(Wl("matchMediaInit"),zr.forEach(function(n){var i=n.queries,s=n.conditions,a,o,l,c;for(o in i)a=hi.matchMedia(i[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&t.push(n))}),Wl("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),ef=e,Wl("matchMedia"))},qh=(function(){function r(t,n){this.selector=n&&Yc(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Ny++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){Lt(n)&&(s=i,i=n,n=Lt);var a=this,o=function(){var c=wt,u=a.selector,d;return c&&c!==a&&c.data.push(a),s&&(a.selector=Yc(s)),wt=a,d=i.apply(a,arguments),Lt(d)&&a._r.push(d),wt=c,a.selector=u,a.isReverted=!1,d};return a.last=o,n===Lt?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},e.ignore=function(n){var i=wt;wt=null,n(this),wt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Ht&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?(function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Mn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Ht)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i){for(var a=zr.length;a--;)zr[a].id===this.id&&zr.splice(a,1);this._mqs&&this._mqs.forEach(function(o){return o.removeListener?o.removeListener(Aa):o.removeEventListener("change",Aa)}),this._mqs=null}},e.revert=function(n){this.kill(n||{})},r})(),Oy=(function(){function r(t){this.contexts=[],this.scope=t,wt&&wt.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){Mi(n)||(n={matches:n});var a=new qh(0,s||this.scope),o=a.conditions={},l,c,u;wt&&!a.selector&&(a.selector=wt.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?u=1:(l=hi.matchMedia(n[c]),l&&(zr.indexOf(a)<0&&zr.push(a),(o[c]=l.matches)&&(u=1),l.addListener?l.addListener(Aa):l.addEventListener("change",Aa),(a._mqs||(a._mqs=[])).push(l)));return u&&i(a,function(d){return a.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r})(),$o={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return Uh(i)})},timeline:function(e){return new Mn(e)},getTweensOf:function(e,t){return Ct.getTweensOf(e,t)},getProperty:function(e,t,n,i){Jt(e)&&(e=ii(e)[0]);var s=Nr(e||{}).get,a=n?bh:yh;return n==="native"&&(n=""),e&&(t?a((kn[t]&&kn[t].get||s)(e,t,n,i)):function(o,l,c){return a((kn[o]&&kn[o].get||s)(e,o,l,c))})},quickSetter:function(e,t,n){if(e=ii(e),e.length>1){var i=e.map(function(u){return Dn.quickSetter(u,t,n)}),s=i.length;return function(u){for(var d=s;d--;)i[d](u)}}e=e[0]||{};var a=kn[t],o=Nr(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(u){var d=new a;xs._pt=0,d.init(e,n?u+n:u,xs,0,[e]),d.render(1,d),xs._pt&&Uu(1,xs)}:o.set(e,l);return a?c:function(u){return c(e,l,n?u+n:u,o,1)}},quickTo:function(e,t,n){var i,s=Dn.to(e,qn((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,u){return s.resetTo(t,l,c,u)};return a.tween=s,a},isTweening:function(e){return Ct.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=kr(e.ease,ba.ease)),jd(ba,e||{})},config:function(e){return jd(Wn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,a=e.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!kn[o]&&!Xn[o]&&Sa(t+" effect requires "+o+" plugin.")}),Bl[t]=function(o,l,c){return n(ii(o),qn(l||{},s),c)},a&&(Mn.prototype[t]=function(o,l,c){return this.add(Bl[t](o,Mi(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){at[e]=kr(t)},parseEase:function(e,t){return arguments.length?kr(e,t):at},getById:function(e){return Ct.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Mn(e),i,s;for(n.smoothChildTiming=An(e.smoothChildTiming),Ct.remove(n),n._dp=0,n._time=n._tTime=Ct._time,i=Ct._first;i;)s=i._next,(t||!(!i._dur&&i instanceof Ht&&i.vars.onComplete===i._targets[0]))&&gi(n,i,i._start-i._delay),i=s;return gi(Ct,n,0),n},context:function(e,t){return e?new qh(e,t):wt},matchMedia:function(e){return new Oy(e)},matchMediaRefresh:function(){return zr.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||Aa()},addEventListener:function(e,t){var n=Do[e]||(Do[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Do[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:py,wrapYoyo:my,distribute:Ch,random:Ph,snap:Rh,normalize:hy,getUnit:on,clamp:cy,splitColor:Fh,toArray:ii,selector:Yc,mapRange:Lh,pipe:dy,unitize:fy,interpolate:gy,shuffle:Ah},install:mh,effects:Bl,ticker:Bn,updateRoot:Mn.updateRoot,plugins:kn,globalTimeline:Ct,core:{PropTween:Rn,globals:gh,Tween:Ht,Timeline:Mn,Animation:wa,getCache:Nr,_removeLinkedListItem:rl,reverting:function(){return tn},context:function(e){return e&&wt&&(wt.data.push(e),e._ctx=wt),wt},suppressOverwrites:function(e){return bu=e}}};Cn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return $o[r]=Ht[r]});Bn.add(Mn.updateRoot);xs=$o.to({},{duration:0});var ky=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},zy=function(e,t){var n=e._targets,i,s,a;for(i in t)for(s=n.length;s--;)a=e._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=ky(a,i)),a&&a.modifier&&a.modifier(t[i],e,n[s],i))},Xl=function(e,t){return{name:e,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var l,c;if(Jt(s)&&(l={},Cn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}zy(o,s)}}}},Dn=$o.registerPlugin({name:"attr",init:function(e,t,n,i,s){var a,o,l;this.tween=n;for(a in t)l=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(l||0)+"",t[a],i,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)tn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Xl("roundProps",jc),Xl("modifiers"),Xl("snap",Rh))||$o;Ht.version=Mn.version=Dn.version="3.15.1";ph=1;Mu()&&Hs();at.Power0;at.Power1;at.Power2;at.Power3;at.Power4;at.Linear;at.Quad;at.Cubic;at.Quart;at.Quint;at.Strong;at.Elastic;at.Back;at.SteppedEase;at.Bounce;at.Sine;at.Expo;at.Circ;/*!
 * CSSPlugin 3.15.1
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var tf,Qi,Ts,Fu,Ur,nf,Nu,By=function(){return typeof window<"u"},Vi={},Ar=180/Math.PI,ws=Math.PI/180,us=Math.atan2,rf=1e8,Ou=/([A-Z])/g,Hy=/(left|right|width|margin|padding|x)/i,Gy=/[\s,\(]\S/,xi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Zc=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Vy=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Wy=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Xy=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},qy=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},$h=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Yh=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},$y=function(e,t,n){return e.style[t]=n},Yy=function(e,t,n){return e.style.setProperty(t,n)},jy=function(e,t,n){return e._gsap[t]=n},Ky=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},Zy=function(e,t,n,i,s){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},Jy=function(e,t,n,i,s){var a=e._gsap;a[t]=n,a.renderTransform(s,a)},Rt="transform",Pn=Rt+"Origin",Qy=function r(e,t){var n=this,i=this.target,s=i.style,a=i._gsap;if(e in Vi&&s){if(this.tfm=this.tfm||{},e!=="transform")e=xi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=Li(i,o)}):this.tfm[e]=a.x?a[e]:Li(i,e),e===Pn&&(this.tfm.zOrigin=a.zOrigin);else return xi.transform.split(",").forEach(function(o){return r.call(n,o,t)});if(this.props.indexOf(Rt)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Pn,t,"")),e=Rt}(s||t)&&this.props.push(e,t,s[e])},jh=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},eb=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,a;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Ou,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Nu(),(!s||!s.isStart)&&!n[Rt]&&(jh(n),i.zOrigin&&n[Pn]&&(n[Pn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Kh=function(e,t){var n={target:e,props:[],revert:eb,save:Qy};return e._gsap||Dn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},Zh,Jc=function(e,t){var n=Qi.createElementNS?Qi.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Qi.createElement(e);return n&&n.style?n:Qi.createElement(e)},Gn=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(Ou,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,Gs(t)||t,1)||""},sf="O,Moz,ms,Ms,Webkit".split(","),Gs=function(e,t,n){var i=t||Ur,s=i.style,a=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(sf[a]+e in s););return a<0?null:(a===3?"ms":a>=0?sf[a]:"")+e},Qc=function(){By()&&window.document&&(tf=window,Qi=tf.document,Ts=Qi.documentElement,Ur=Jc("div")||{style:{}},Jc("div"),Rt=Gs(Rt),Pn=Rt+"Origin",Ur.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Zh=!!Gs("perspective"),Nu=Dn.core.reverting,Fu=1)},af=function(e){var t=e.ownerSVGElement,n=Jc("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Ts.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Ts.removeChild(n),s},of=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Jh=function(e){var t,n;try{t=e.getBBox()}catch{t=af(e),n=1}return t&&(t.width||t.height)||n||(t=af(e)),t&&!t.width&&!t.x&&!t.y?{x:+of(e,["x","cx","x1"])||0,y:+of(e,["y","cy","y1"])||0,width:0,height:0}:t},Qh=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Jh(e))},fr=function(e,t){if(t){var n=e.style,i;t in Vi&&t!==Pn&&(t=Rt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(Ou,"-$1").toLowerCase())):n.removeAttribute(t)}},er=function(e,t,n,i,s,a){var o=new Rn(e._pt,t,n,0,1,a?Yh:$h);return e._pt=o,o.b=i,o.e=s,e._props.push(n),o},lf={deg:1,rad:1,turn:1},tb={grid:1,flex:1},hr=function r(e,t,n,i){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=Ur.style,l=Hy.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,f=i==="px",h=i==="%",_,g,p,m;if(i===a||!s||lf[i]||lf[a])return s;if(a!=="px"&&!f&&(s=r(e,t,n,"px")),m=e.getCTM&&Qh(e),(h||a==="%")&&(Vi[t]||~t.indexOf("adius")))return _=m?e.getBBox()[l?"width":"height"]:e[u],Ut(h?s/_*d:s/100*_);if(o[l?"width":"height"]=d+(f?a:i),g=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,m&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===Qi||!g.appendChild)&&(g=Qi.body),p=g._gsap,p&&h&&p.width&&l&&p.time===Bn.time&&!p.uncache)return Ut(s/p.width*d);if(h&&(t==="height"||t==="width")){var T=e.style[t];e.style[t]=d+i,_=e[u],T?e.style[t]=T:fr(e,t)}else(h||a==="%")&&!tb[Gn(g,"display")]&&(o.position=Gn(e,"position")),g===e&&(o.position="static"),g.appendChild(Ur),_=Ur[u],g.removeChild(Ur),o.position="absolute";return l&&h&&(p=Nr(g),p.time=Bn.time,p.width=g[u]),Ut(f?_*s/d:_&&s?d/_*s:0)},Li=function(e,t,n,i){var s;return Fu||Qc(),t in xi&&t!=="transform"&&(t=xi[t],~t.indexOf(",")&&(t=t.split(",")[0])),Vi[t]&&t!=="transform"?(s=Ra(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:jo(Gn(e,Pn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Yo[t]&&Yo[t](e,t,n)||Gn(e,t)||vh(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?hr(e,t,s,n)+n:s},nb=function(e,t,n,i){if(!n||n==="none"){var s=Gs(t,e,1),a=s&&Gn(e,s,1);a&&a!==n?(t=s,n=a):t==="borderColor"&&(n=Gn(e,"borderTopColor"))}var o=new Rn(this._pt,e.style,t,0,1,Wh),l=0,c=0,u,d,f,h,_,g,p,m,T,E,x,A;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=Gn(e,i.substring(4,i.indexOf(")")))),i==="auto"&&(g=e.style[t],e.style[t]=i,i=Gn(e,t)||i,g?e.style[t]=g:fr(e,t)),u=[n,i],Oh(u),n=u[0],i=u[1],f=n.match(vs)||[],A=i.match(vs)||[],A.length){for(;d=vs.exec(i);)p=d[0],T=i.substring(l,d.index),_?_=(_+1)%5:(T.substr(-5)==="rgba("||T.substr(-5)==="hsla(")&&(_=1),p!==(g=f[c++]||"")&&(h=parseFloat(g)||0,x=g.substr((h+"").length),p.charAt(1)==="="&&(p=Es(h,p)+x),m=parseFloat(p),E=p.substr((m+"").length),l=vs.lastIndex-E.length,E||(E=E||Wn.units[t]||x,l===i.length&&(i+=E,o.e+=E)),x!==E&&(h=hr(e,t,g,E)||0),o._pt={_next:o._pt,p:T||c===1?T:",",s:h,c:m-h,m:_&&_<4||t==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=t==="display"&&i==="none"?Yh:$h;return hh.test(i)&&(o.e=0),this._pt=o,o},cf={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},ib=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=cf[n]||n,t[1]=cf[i]||i,t.join(" ")},rb=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],Vi[o]&&(l=1,o=o==="transformOrigin"?Pn:Rt),fr(n,o);l&&(fr(n,Rt),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Ra(n,1),a.uncache=1,jh(i)))}},Yo={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var a=e._pt=new Rn(e._pt,t,n,0,0,rb);return a.u=i,a.pr=-10,a.tween=s,e._props.push(n),1}}},Ca=[1,0,0,1,0,0],ep={},tp=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},uf=function(e){var t=Gn(e,Rt);return tp(t)?Ca:t.substr(7).match(fh).map(Ut)},ku=function(e,t){var n=e._gsap||Nr(e),i=e.style,s=uf(e),a,o,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Ca:s):(s===Ca&&!e.offsetParent&&e!==Ts&&!n.svg&&(l=i.display,i.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,Ts.appendChild(e)),s=uf(e),l?i.display=l:fr(e,"display"),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):Ts.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},eu=function(e,t,n,i,s,a){var o=e._gsap,l=s||ku(e,!0),c=o.xOrigin||0,u=o.yOrigin||0,d=o.xOffset||0,f=o.yOffset||0,h=l[0],_=l[1],g=l[2],p=l[3],m=l[4],T=l[5],E=t.split(" "),x=parseFloat(E[0])||0,A=parseFloat(E[1])||0,R,w,I,b;n?l!==Ca&&(w=h*p-_*g)&&(I=x*(p/w)+A*(-g/w)+(g*T-p*m)/w,b=x*(-_/w)+A*(h/w)-(h*T-_*m)/w,x=I,A=b):(R=Jh(e),x=R.x+(~E[0].indexOf("%")?x/100*R.width:x),A=R.y+(~(E[1]||E[0]).indexOf("%")?A/100*R.height:A)),i||i!==!1&&o.smooth?(m=x-c,T=A-u,o.xOffset=d+(m*h+T*g)-m,o.yOffset=f+(m*_+T*p)-T):o.xOffset=o.yOffset=0,o.xOrigin=x,o.yOrigin=A,o.smooth=!!i,o.origin=t,o.originIsAbsolute=!!n,e.style[Pn]="0px 0px",a&&(er(a,o,"xOrigin",c,x),er(a,o,"yOrigin",u,A),er(a,o,"xOffset",d,o.xOffset),er(a,o,"yOffset",f,o.yOffset)),e.setAttribute("data-svg-origin",x+" "+A)},Ra=function(e,t){var n=e._gsap||new zh(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(e),c=Gn(e,Pn)||"0",u,d,f,h,_,g,p,m,T,E,x,A,R,w,I,b,v,L,N,B,q,K,$,X,H,ae,y,P,re,de,z,J;return u=d=f=g=p=m=T=E=x=0,h=_=1,n.svg=!!(e.getCTM&&Qh(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Rt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Rt]!=="none"?l[Rt]:"")),i.scale=i.rotate=i.translate="none"),w=ku(e,n.svg),n.svg&&(n.uncache?(H=e.getBBox(),c=n.xOrigin-H.x+"px "+(n.yOrigin-H.y)+"px",X=""):X=!t&&e.getAttribute("data-svg-origin"),eu(e,X||c,!!X||n.originIsAbsolute,n.smooth!==!1,w)),A=n.xOrigin||0,R=n.yOrigin||0,w!==Ca&&(L=w[0],N=w[1],B=w[2],q=w[3],u=K=w[4],d=$=w[5],w.length===6?(h=Math.sqrt(L*L+N*N),_=Math.sqrt(q*q+B*B),g=L||N?us(N,L)*Ar:0,T=B||q?us(B,q)*Ar+g:0,T&&(_*=Math.abs(Math.cos(T*ws))),n.svg&&(u-=A-(A*L+R*B),d-=R-(A*N+R*q))):(J=w[6],de=w[7],y=w[8],P=w[9],re=w[10],z=w[11],u=w[12],d=w[13],f=w[14],I=us(J,re),p=I*Ar,I&&(b=Math.cos(-I),v=Math.sin(-I),X=K*b+y*v,H=$*b+P*v,ae=J*b+re*v,y=K*-v+y*b,P=$*-v+P*b,re=J*-v+re*b,z=de*-v+z*b,K=X,$=H,J=ae),I=us(-B,re),m=I*Ar,I&&(b=Math.cos(-I),v=Math.sin(-I),X=L*b-y*v,H=N*b-P*v,ae=B*b-re*v,z=q*v+z*b,L=X,N=H,B=ae),I=us(N,L),g=I*Ar,I&&(b=Math.cos(I),v=Math.sin(I),X=L*b+N*v,H=K*b+$*v,N=N*b-L*v,$=$*b-K*v,L=X,K=H),p&&Math.abs(p)+Math.abs(g)>359.9&&(p=g=0,m=180-m),h=Ut(Math.sqrt(L*L+N*N+B*B)),_=Ut(Math.sqrt($*$+J*J)),I=us(K,$),T=Math.abs(I)>2e-4?I*Ar:0,x=z?1/(z<0?-z:z):0),n.svg&&(X=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!tp(Gn(e,Rt)),X&&e.setAttribute("transform",X))),Math.abs(T)>90&&Math.abs(T)<270&&(s?(h*=-1,T+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,T+=T<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=f+a,n.scaleX=Ut(h),n.scaleY=Ut(_),n.rotation=Ut(g)+o,n.rotationX=Ut(p)+o,n.rotationY=Ut(m)+o,n.skewX=T+o,n.skewY=E+o,n.transformPerspective=x+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[Pn]=jo(c)),n.xOffset=n.yOffset=0,n.force3D=Wn.force3D,n.renderTransform=n.svg?ab:Zh?np:sb,n.uncache=0,n},jo=function(e){return(e=e.split(" "))[0]+" "+e[1]},ql=function(e,t,n){var i=on(t);return Ut(parseFloat(t)+parseFloat(hr(e,"x",n+"px",i)))+i},sb=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,np(e,t)},Mr="0deg",Js="0px",Er=") ",np=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,f=n.skewX,h=n.skewY,_=n.scaleX,g=n.scaleY,p=n.transformPerspective,m=n.force3D,T=n.target,E=n.zOrigin,x="",A=m==="auto"&&e&&e!==1||m===!0;if(E&&(d!==Mr||u!==Mr)){var R=parseFloat(u)*ws,w=Math.sin(R),I=Math.cos(R),b;R=parseFloat(d)*ws,b=Math.cos(R),a=ql(T,a,w*b*-E),o=ql(T,o,-Math.sin(R)*-E),l=ql(T,l,I*b*-E+E)}p!==Js&&(x+="perspective("+p+Er),(i||s)&&(x+="translate("+i+"%, "+s+"%) "),(A||a!==Js||o!==Js||l!==Js)&&(x+=l!==Js||A?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+Er),c!==Mr&&(x+="rotate("+c+Er),u!==Mr&&(x+="rotateY("+u+Er),d!==Mr&&(x+="rotateX("+d+Er),(f!==Mr||h!==Mr)&&(x+="skew("+f+", "+h+Er),(_!==1||g!==1)&&(x+="scale("+_+", "+g+Er),T.style[Rt]=x||"translate(0, 0)"},ab=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,f=n.scaleY,h=n.target,_=n.xOrigin,g=n.yOrigin,p=n.xOffset,m=n.yOffset,T=n.forceCSS,E=parseFloat(a),x=parseFloat(o),A,R,w,I,b;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=ws,c*=ws,A=Math.cos(l)*d,R=Math.sin(l)*d,w=Math.sin(l-c)*-f,I=Math.cos(l-c)*f,c&&(u*=ws,b=Math.tan(c-u),b=Math.sqrt(1+b*b),w*=b,I*=b,u&&(b=Math.tan(u),b=Math.sqrt(1+b*b),A*=b,R*=b)),A=Ut(A),R=Ut(R),w=Ut(w),I=Ut(I)):(A=d,I=f,R=w=0),(E&&!~(a+"").indexOf("px")||x&&!~(o+"").indexOf("px"))&&(E=hr(h,"x",a,"px"),x=hr(h,"y",o,"px")),(_||g||p||m)&&(E=Ut(E+_-(_*A+g*w)+p),x=Ut(x+g-(_*R+g*I)+m)),(i||s)&&(b=h.getBBox(),E=Ut(E+i/100*b.width),x=Ut(x+s/100*b.height)),b="matrix("+A+","+R+","+w+","+I+","+E+","+x+")",h.setAttribute("transform",b),T&&(h.style[Rt]=b)},ob=function(e,t,n,i,s){var a=360,o=Jt(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?Ar:1),c=l-i,u=i+c+"deg",d,f;return o&&(d=s.split("_")[1],d==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),d==="cw"&&c<0?c=(c+a*rf)%a-~~(c/a)*a:d==="ccw"&&c>0&&(c=(c-a*rf)%a-~~(c/a)*a)),e._pt=f=new Rn(e._pt,t,n,i,c,Vy),f.e=u,f.u="deg",e._props.push(n),f},df=function(e,t){for(var n in t)e[n]=t[n];return e},lb=function(e,t,n){var i=df({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,u,d,f,h,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[Rt]=t,o=Ra(n,1),fr(n,Rt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Rt],a[Rt]=t,o=Ra(n,1),a[Rt]=c);for(l in Vi)c=i[l],u=o[l],c!==u&&s.indexOf(l)<0&&(h=on(c),_=on(u),d=h!==_?hr(n,l,c,_):parseFloat(c),f=parseFloat(u),e._pt=new Rn(e._pt,o,l,d,f-d,Zc),e._pt.u=_||0,e._props.push(l));df(o,i)};Cn("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",a=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(o){return e<2?r+o:"border"+o+r});Yo[e>1?"border"+r:r]=function(o,l,c,u,d){var f,h;if(arguments.length<4)return f=a.map(function(_){return Li(o,_,c)}),h=f.join(" "),h.split(f[0]).length===5?f[0]:h;f=(u+"").split(" "),h={},a.forEach(function(_,g){return h[_]=f[g]=f[g]||f[(g-1)/2|0]}),o.init(l,h,d)}});var ip={name:"css",register:Qc,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var a=this._props,o=e.style,l=n.vars.startAt,c,u,d,f,h,_,g,p,m,T,E,x,A,R,w,I,b;Fu||Qc(),this.styles=this.styles||Kh(e),I=this.styles.props,this.tween=n;for(g in t)if(g!=="autoRound"&&(u=t[g],!(kn[g]&&Bh(g,t,n,i,e,s)))){if(h=typeof u,_=Yo[g],h==="function"&&(u=u.call(n,i,e,s),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=Ea(u)),_)_(this,e,g,u,n)&&(w=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(g)+"").trim(),u+="",ar.lastIndex=0,ar.test(c)||(p=on(c),m=on(u),m?p!==m&&(c=hr(e,g,c,m)+m):p&&(u+=p)),this.add(o,"setProperty",c,u,i,s,0,0,g),a.push(g),I.push(g,0,o[g]);else if(h!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,e,s):l[g],Jt(c)&&~c.indexOf("random(")&&(c=Ea(c)),on(c+"")||c==="auto"||(c+=Wn.units[g]||on(Li(e,g))||""),(c+"").charAt(1)==="="&&(c=Li(e,g))):c=Li(e,g),f=parseFloat(c),T=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),T&&(u=u.substr(2)),d=parseFloat(u),g in xi&&(g==="autoAlpha"&&(f===1&&Li(e,"visibility")==="hidden"&&d&&(f=0),I.push("visibility",0,o.visibility),er(this,o,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),g!=="scale"&&g!=="transform"&&(g=xi[g],~g.indexOf(",")&&(g=g.split(",")[0]))),E=g in Vi,E){if(this.styles.save(g),b=u,h==="string"&&u.substring(0,6)==="var(--"){if(u=Gn(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var v=e.style.perspective;e.style.perspective=u,u=Gn(e,"perspective"),v?e.style.perspective=v:fr(e,"perspective")}d=parseFloat(u)}if(x||(A=e._gsap,A.renderTransform&&!t.parseTransform||Ra(e,t.parseTransform),R=t.smoothOrigin!==!1&&A.smooth,x=this._pt=new Rn(this._pt,o,Rt,0,1,A.renderTransform,A,0,-1),x.dep=1),g==="scale")this._pt=new Rn(this._pt,A,"scaleY",A.scaleY,(T?Es(A.scaleY,T+d):d)-A.scaleY||0,Zc),this._pt.u=0,a.push("scaleY",g),g+="X";else if(g==="transformOrigin"){I.push(Pn,0,o[Pn]),u=ib(u),A.svg?eu(e,u,0,R,0,this):(m=parseFloat(u.split(" ")[2])||0,m!==A.zOrigin&&er(this,A,"zOrigin",A.zOrigin,m),er(this,o,g,jo(c),jo(u)));continue}else if(g==="svgOrigin"){eu(e,u,1,R,0,this);continue}else if(g in ep){ob(this,A,g,f,T?Es(f,T+u):u);continue}else if(g==="smoothOrigin"){er(this,A,"smooth",A.smooth,u);continue}else if(g==="force3D"){A[g]=u;continue}else if(g==="transform"){lb(this,u,e);continue}}else g in o||(g=Gs(g)||g);if(E||(d||d===0)&&(f||f===0)&&!Gy.test(u)&&g in o)p=(c+"").substr((f+"").length),d||(d=0),m=on(u)||(g in Wn.units?Wn.units[g]:p),p!==m&&(f=hr(e,g,c,m)),this._pt=new Rn(this._pt,E?A:o,g,f,(T?Es(f,T+d):d)-f,!E&&(m==="px"||g==="zIndex")&&t.autoRound!==!1?qy:Zc),this._pt.u=m||0,E&&b!==u?(this._pt.b=c,this._pt.e=b,this._pt.r=Xy):p!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=Wy);else if(g in o)nb.call(this,e,g,c,T?T+u:u);else if(g in e)this.add(e,g,c||e[g],T?T+u:u,i,s);else if(g!=="parseTransform"){Tu(g,u);continue}E||(g in o?I.push(g,0,o[g]):typeof e[g]=="function"?I.push(g,2,e[g]()):I.push(g,1,c||e[g])),a.push(g)}}w&&Xh(this)},render:function(e,t){if(t.tween._time||!Nu())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Li,aliases:xi,getSetter:function(e,t,n){var i=xi[t];return i&&i.indexOf(",")<0&&(t=i),t in Vi&&t!==Pn&&(e._gsap.x||Li(e,"x"))?n&&nf===n?t==="scale"?Ky:jy:(nf=n||{})&&(t==="scale"?Zy:Jy):e.style&&!Su(e.style[t])?$y:~t.indexOf("-")?Yy:Iu(e,t)},core:{_removeProperty:fr,_getMatrix:ku}};Dn.utils.checkPrefix=Gs;Dn.core.getStyleSaver=Kh;(function(r,e,t,n){var i=Cn(r+","+e+","+t,function(s){Vi[s]=1});Cn(e,function(s){Wn.units[s]="deg",ep[s]=1}),xi[i[13]]=r+","+e,Cn(n,function(s){var a=s.split(":");xi[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Cn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Wn.units[r]="px"});Dn.registerPlugin(ip);var rp=Dn.registerPlugin(ip)||Dn;rp.core.Tween;function cb(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function ub(r,e,t){return e&&cb(r.prototype,e),r}/*!
 * Observer 3.15.1
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var en,Lo,En,tr,nr,As,sp,Cr,Cs,ap,Oi,ci,op,lp=function(){return en||typeof window<"u"&&(en=window.gsap)&&en.registerPlugin&&en},cp=1,ys=[],nt=[],Si=[],fa=Date.now,tu=function(e,t){return t},db=function(){var e=Cs.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,nt),i.push.apply(i,Si),nt=n,Si=i,tu=function(a,o){return t[a](o)}},or=function(e,t){return~Si.indexOf(e)&&Si[Si.indexOf(e)+1][t]},ha=function(e){return!!~ap.indexOf(e)},hn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},fn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},uo="scrollLeft",fo="scrollTop",nu=function(){return Oi&&Oi.isPressed||nt.cache++},Ko=function(e,t){var n=function i(s){if(s||s===0){cp&&En.history.scrollRestoration!=="manual"&&(En.history.scrollRestoration="manual");var a=Oi&&Oi.isPressed;s=i.v=Math.round(s)||(Oi&&Oi.iOS?1:0),e(s),i.cacheID=nt.cache,a&&tu("ss",s)}else(t||nt.cache!==i.cacheID||tu("ref"))&&(i.cacheID=nt.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},vn={s:uo,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Ko(function(r){return arguments.length?En.scrollTo(r,qt.sc()):En.pageXOffset||tr[uo]||nr[uo]||As[uo]||0})},qt={s:fo,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:vn,sc:Ko(function(r){return arguments.length?En.scrollTo(vn.sc(),r):En.pageYOffset||tr[fo]||nr[fo]||As[fo]||0})},Sn=function(e,t){return(t&&t._ctx&&t._ctx.selector||en.utils.toArray)(e)[0]||(typeof e=="string"&&en.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},fb=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},pr=function(e,t){var n=t.s,i=t.sc;ha(e)&&(e=tr.scrollingElement||nr);var s=nt.indexOf(e),a=i===qt.sc?1:2;!~s&&(s=nt.push(e)-1),nt[s+a]||hn(e,"scroll",nu);var o=nt[s+a],l=o||(nt[s+a]=Ko(or(e,n),!0)||(ha(e)?i:Ko(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,o||(l.smooth=en.getProperty(e,"scrollBehavior")==="smooth"),l},iu=function(e,t,n){var i=e,s=e,a=fa(),o=a,l=t||50,c=Math.max(500,l*3),u=function(_,g){var p=fa();g||p-a>l?(s=i,i=_,o=a,a=p):n?i+=_:i=s+(_-s)/(p-o)*(a-o)},d=function(){s=i=n?0:i,o=a=0},f=function(_){var g=o,p=s,m=fa();return(_||_===0)&&_!==i&&u(_),a===o||m-o>c?0:(i+(n?p:-p))/((n?m:a)-g)*1e3};return{update:u,reset:d,getVelocity:f}},Qs=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},ff=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},up=function(){Cs=en.core.globals().ScrollTrigger,Cs&&Cs.core&&db()},dp=function(e){return en=e||lp(),!Lo&&en&&typeof document<"u"&&document.body&&(En=window,tr=document,nr=tr.documentElement,As=tr.body,ap=[En,tr,nr,As],en.utils.clamp,op=en.core.context||function(){},Cr="onpointerenter"in As?"pointer":"mouse",sp=Nt.isTouch=En.matchMedia&&En.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in En||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,ci=Nt.eventTypes=("ontouchstart"in nr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in nr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return cp=0},500),Lo=1),Cs||up(),Lo};vn.op=qt;nt.cache=0;var Nt=(function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Lo||dp(en)||console.warn("Please gsap.registerPlugin(Observer)"),Cs||up();var i=n.tolerance,s=n.dragMinimum,a=n.type,o=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,f=n.onStopDelay,h=n.ignore,_=n.wheelSpeed,g=n.event,p=n.onDragStart,m=n.onDragEnd,T=n.onDrag,E=n.onPress,x=n.onRelease,A=n.onRight,R=n.onLeft,w=n.onUp,I=n.onDown,b=n.onChangeX,v=n.onChangeY,L=n.onChange,N=n.onToggleX,B=n.onToggleY,q=n.onHover,K=n.onHoverEnd,$=n.onMove,X=n.ignoreCheck,H=n.isNormalizer,ae=n.onGestureStart,y=n.onGestureEnd,P=n.onWheel,re=n.onEnable,de=n.onDisable,z=n.onClick,J=n.scrollSpeed,ie=n.capture,Y=n.allowClicks,oe=n.lockAxis,Se=n.onLockAxis;this.target=o=Sn(o)||nr,this.vars=n,h&&(h=en.utils.toArray(h)),i=i||1e-9,s=s||0,_=_||1,J=J||1,a=a||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(En.getComputedStyle(As).lineHeight)||22);var _e,Pe,De,ce,D,Ye,Ie,k=this,xe=0,$e=0,Ee=n.passive||!u&&n.passive!==!1,C=pr(o,vn),S=pr(o,qt),G=C(),ne=S(),ee=~a.indexOf("touch")&&!~a.indexOf("pointer")&&ci[0]==="pointerdown",Q=ha(o),pe=o.ownerDocument||tr,fe=[0,0,0],me=[0,0,0],We=0,le=function(){return We=fa()},ue=function(Le,Ze){return(k.event=Le)&&h&&fb(Le.target,h)||Ze&&ee&&Le.pointerType!=="touch"||X&&X(Le,Ze)},Ne=function(){k._vx.reset(),k._vy.reset(),Pe.pause(),d&&d(k)},ke=function(){var Le=k.deltaX=ff(fe),Ze=k.deltaY=ff(me),ye=Math.abs(Le)>=i,Xe=Math.abs(Ze)>=i;L&&(ye||Xe)&&L(k,Le,Ze,fe,me),ye&&(A&&k.deltaX>0&&A(k),R&&k.deltaX<0&&R(k),b&&b(k),N&&k.deltaX<0!=xe<0&&N(k),xe=k.deltaX,fe[0]=fe[1]=fe[2]=0),Xe&&(I&&k.deltaY>0&&I(k),w&&k.deltaY<0&&w(k),v&&v(k),B&&k.deltaY<0!=$e<0&&B(k),$e=k.deltaY,me[0]=me[1]=me[2]=0),(ce||De)&&($&&$(k),De&&(p&&De===1&&p(k),T&&T(k),De=0),ce=!1),Ye&&!(Ye=!1)&&Se&&Se(k),D&&(P(k),D=!1),_e=0},we=function(Le,Ze,ye){fe[ye]+=Le,me[ye]+=Ze,k._vx.update(Le),k._vy.update(Ze),c?_e||(_e=requestAnimationFrame(ke)):ke()},Ke=function(Le,Ze){oe&&!Ie&&(k.axis=Ie=Math.abs(Le)>Math.abs(Ze)?"x":"y",Ye=!0),Ie!=="y"&&(fe[2]+=Le,k._vx.update(Le,!0)),Ie!=="x"&&(me[2]+=Ze,k._vy.update(Ze,!0)),c?_e||(_e=requestAnimationFrame(ke)):ke()},He=function(Le){if(!ue(Le,1)){Le=Qs(Le,u);var Ze=Le.clientX,ye=Le.clientY,Xe=Ze-k.x,Ue=ye-k.y,Ve=k.isDragging;k.x=Ze,k.y=ye,(Ve||(Xe||Ue)&&(Math.abs(k.startX-Ze)>=s||Math.abs(k.startY-ye)>=s))&&(De||(De=Ve?2:1),Ve||(k.isDragging=!0),Ke(Xe,Ue))}},ot=k.onPress=function(Te){ue(Te,1)||Te&&Te.button||(k.axis=Ie=null,Pe.pause(),k.isPressed=!0,Te=Qs(Te),xe=$e=0,k.startX=k.x=Te.clientX,k.startY=k.y=Te.clientY,k._vx.reset(),k._vy.reset(),hn(H?o:pe,ci[1],He,Ee,!0),k.deltaX=k.deltaY=0,E&&E(k))},U=k.onRelease=function(Te){if(!ue(Te,1)){fn(H?o:pe,ci[1],He,!0);var Le=!isNaN(k.y-k.startY),Ze=k.isDragging,ye=Ze&&(Math.abs(k.x-k.startX)>3||Math.abs(k.y-k.startY)>3),Xe=Qs(Te);!ye&&Le&&(k._vx.reset(),k._vy.reset(),u&&Y&&en.delayedCall(.08,function(){if(fa()-We>300&&!Te.defaultPrevented){if(Te.target.click)Te.target.click();else if(pe.createEvent){var Ue=pe.createEvent("MouseEvents");Ue.initMouseEvent("click",!0,!0,En,1,Xe.screenX,Xe.screenY,Xe.clientX,Xe.clientY,!1,!1,!1,!1,0,null),Te.target.dispatchEvent(Ue)}}})),k.isDragging=k.isGesturing=k.isPressed=!1,d&&Ze&&!H&&Pe.restart(!0),De&&ke(),m&&Ze&&m(k),x&&x(k,ye)}},ge=function(Le){return Le.touches&&Le.touches.length>1&&(k.isGesturing=!0)&&ae(Le,k.isDragging)},Z=function(){return(k.isGesturing=!1)||y(k)},te=function(Le){if(!ue(Le)){var Ze=C(),ye=S();we((Ze-G)*J,(ye-ne)*J,1),G=Ze,ne=ye,d&&Pe.restart(!0)}},he=function(Le){if(!ue(Le)){Le=Qs(Le,u),P&&(D=!0);var Ze=(Le.deltaMode===1?l:Le.deltaMode===2?En.innerHeight:1)*_;we(Le.deltaX*Ze,Le.deltaY*Ze,0),d&&!H&&Pe.restart(!0)}},ve=function(Le){if(!ue(Le)){var Ze=Le.clientX,ye=Le.clientY,Xe=Ze-k.x,Ue=ye-k.y;k.x=Ze,k.y=ye,ce=!0,d&&Pe.restart(!0),(Xe||Ue)&&Ke(Xe,Ue)}},Ge=function(Le){k.event=Le,q(k)},ct=function(Le){k.event=Le,K(k)},Pt=function(Le){return ue(Le)||Qs(Le,u)&&z(k)};Pe=k._dc=en.delayedCall(f||.25,Ne).pause(),k.deltaX=k.deltaY=0,k._vx=iu(0,50,!0),k._vy=iu(0,50,!0),k.scrollX=C,k.scrollY=S,k.isDragging=k.isGesturing=k.isPressed=!1,op(this),k.enable=function(Te){return k.isEnabled||(hn(Q?pe:o,"scroll",nu),a.indexOf("scroll")>=0&&hn(Q?pe:o,"scroll",te,Ee,ie),a.indexOf("wheel")>=0&&hn(o,"wheel",he,Ee,ie),(a.indexOf("touch")>=0&&sp||a.indexOf("pointer")>=0)&&(hn(o,ci[0],ot,Ee,ie),hn(pe,ci[2],U),hn(pe,ci[3],U),Y&&hn(o,"click",le,!0,!0),z&&hn(o,"click",Pt),ae&&hn(pe,"gesturestart",ge),y&&hn(pe,"gestureend",Z),q&&hn(o,Cr+"enter",Ge),K&&hn(o,Cr+"leave",ct),$&&hn(o,Cr+"move",ve)),k.isEnabled=!0,k.isDragging=k.isGesturing=k.isPressed=ce=De=!1,k._vx.reset(),k._vy.reset(),G=C(),ne=S(),Te&&Te.type&&ot(Te),re&&re(k)),k},k.disable=function(){k.isEnabled&&(ys.filter(function(Te){return Te!==k&&ha(Te.target)}).length||fn(Q?pe:o,"scroll",nu),k.isPressed&&(k._vx.reset(),k._vy.reset(),fn(H?o:pe,ci[1],He,!0)),fn(Q?pe:o,"scroll",te,ie),fn(o,"wheel",he,ie),fn(o,ci[0],ot,ie),fn(pe,ci[2],U),fn(pe,ci[3],U),fn(o,"click",le,!0),fn(o,"click",Pt),fn(pe,"gesturestart",ge),fn(pe,"gestureend",Z),fn(o,Cr+"enter",Ge),fn(o,Cr+"leave",ct),fn(o,Cr+"move",ve),k.isEnabled=k.isPressed=k.isDragging=!1,de&&de(k))},k.kill=k.revert=function(){k.disable();var Te=ys.indexOf(k);Te>=0&&ys.splice(Te,1),Oi===k&&(Oi=0)},ys.push(k),H&&ha(o)&&(Oi=k),k.enable(g)},ub(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r})();Nt.version="3.15.1";Nt.create=function(r){return new Nt(r)};Nt.register=dp;Nt.getAll=function(){return ys.slice()};Nt.getById=function(r){return ys.filter(function(e){return e.vars.id===r})[0]};lp()&&en.registerPlugin(Nt);/*!
 * ScrollTrigger 3.15.1
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Re,ms,tt,gt,zn,mt,zu,Zo,Pa,pa,ra,ho,sn,ol,ru,gn,hf,pf,gs,fp,$l,hp,mn,su,pp,mp,Ki,au,Bu,Rs,Hu,lr,ou,Yl,po=1,an=Date.now,jl=an(),ri=0,sa=0,mf=function(e,t,n){var i=On(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},gf=function(e,t){return t&&(!On(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},hb=function r(){return sa&&requestAnimationFrame(r)},_f=function(){return ol=1},vf=function(){return ol=0},pi=function(e){return e},aa=function(e){return Math.round(e*1e5)/1e5||0},gp=function(){return typeof window<"u"},_p=function(){return Re||gp()&&(Re=window.gsap)&&Re.registerPlugin&&Re},Xr=function(e){return!!~zu.indexOf(e)},vp=function(e){return(e==="Height"?Hu:tt["inner"+e])||zn["client"+e]||mt["client"+e]},xp=function(e){return or(e,"getBoundingClientRect")||(Xr(e)?function(){return Oo.width=tt.innerWidth,Oo.height=Hu,Oo}:function(){return Ui(e)})},pb=function(e,t,n){var i=n.d,s=n.d2,a=n.a;return(a=or(e,"getBoundingClientRect"))?function(){return a()[i]}:function(){return(t?vp(s):e["client"+s])||0}},mb=function(e,t){return!t||~Si.indexOf(e)?xp(e):function(){return Oo}},yi=function(e,t){var n=t.s,i=t.d2,s=t.d,a=t.a;return Math.max(0,(n="scroll"+i)&&(a=or(e,n))?a()-xp(e)()[s]:Xr(e)?(zn[n]||mt[n])-vp(i):e[n]-e["offset"+i])},mo=function(e,t){for(var n=0;n<gs.length;n+=3)(!t||~t.indexOf(gs[n+1]))&&e(gs[n],gs[n+1],gs[n+2])},On=function(e){return typeof e=="string"},ln=function(e){return typeof e=="function"},oa=function(e){return typeof e=="number"},Rr=function(e){return typeof e=="object"},ea=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},ds=function(e,t,n){if(e.enabled){var i=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);i&&i.totalTime&&(e.callbackAnimation=i)}},fs=Math.abs,yp="left",bp="top",Gu="right",Vu="bottom",Br="width",Hr="height",ma="Right",ga="Left",_a="Top",va="Bottom",Bt="padding",ei="margin",Vs="Width",Wu="Height",Xt="px",ti=function(e){return tt.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},gb=function(e){var t=ti(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},xf=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Ui=function(e,t){var n=t&&ti(e)[ru]!=="matrix(1, 0, 0, 1, 0, 0)"&&Re.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},Jo=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},Sp=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},_b=function(e){return function(t){return Re.utils.snap(Sp(e),t)}},Xu=function(e){var t=Re.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,a){a===void 0&&(a=.001);var o;if(!s)return t(i);if(s>0){for(i-=a,o=0;o<n.length;o++)if(n[o]>=i)return n[o];return n[o-1]}else for(o=n.length,i+=a;o--;)if(n[o]<=i)return n[o];return n[0]}:function(i,s,a){a===void 0&&(a=.001);var o=t(i);return!s||Math.abs(o-i)<a||o-i<0==s<0?o:t(s<0?i-e:i+e)}},vb=function(e){return function(t,n){return Xu(Sp(e))(t,n.direction)}},go=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},Zt=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},Kt=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},_o=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},yf={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},vo={toggleActions:"play",anticipatePin:0},Qo={top:0,left:0,center:.5,bottom:1,right:1},Io=function(e,t){if(On(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in Qo?Qo[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},xo=function(e,t,n,i,s,a,o,l){var c=s.startColor,u=s.endColor,d=s.fontSize,f=s.indent,h=s.fontWeight,_=gt.createElement("div"),g=Xr(n)||or(n,"pinType")==="fixed",p=e.indexOf("scroller")!==-1,m=g?mt:n.tagName==="IFRAME"?n.contentDocument.body:n,T=e.indexOf("start")!==-1,E=T?c:u,x="border-color:"+E+";font-size:"+d+";color:"+E+";font-weight:"+h+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return x+="position:"+((p||l)&&g?"fixed;":"absolute;"),(p||l||!g)&&(x+=(i===qt?Gu:Vu)+":"+(a+parseFloat(f))+"px;"),o&&(x+="box-sizing:border-box;text-align:left;width:"+o.offsetWidth+"px;"),_._isStart=T,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=x,_.innerText=t||t===0?e+"-"+t:e,m.children[0]?m.insertBefore(_,m.children[0]):m.appendChild(_),_._offset=_["offset"+i.op.d2],Uo(_,0,i,T),_},Uo=function(e,t,n,i){var s={display:"block"},a=n[i?"os2":"p2"],o=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+a+Vs]=1,s["border"+o+Vs]=0,s[n.p]=t+"px",Re.set(e,s)},et=[],lu={},Da,bf=function(){return an()-ri>34&&(Da||(Da=requestAnimationFrame(zi)))},hs=function(){(!mn||!mn.isPressed||mn.startX>mt.clientWidth)&&(nt.cache++,mn?Da||(Da=requestAnimationFrame(zi)):zi(),ri||$r("scrollStart"),ri=an())},Kl=function(){mp=tt.innerWidth,pp=tt.innerHeight},la=function(e){nt.cache++,(e===!0||!sn&&!hp&&!gt.fullscreenElement&&!gt.webkitFullscreenElement&&(!su||mp!==tt.innerWidth||Math.abs(tt.innerHeight-pp)>tt.innerHeight*.25))&&Zo.restart(!0)},qr={},xb=[],Mp=function r(){return Kt(it,"scrollEnd",r)||Fr(!0)},$r=function(e){return qr[e]&&qr[e].map(function(t){return t()})||xb},Nn=[],Ep=function(e){for(var t=0;t<Nn.length;t+=5)(!e||Nn[t+4]&&Nn[t+4].query===e)&&(Nn[t].style.cssText=Nn[t+1],Nn[t].getBBox&&Nn[t].setAttribute("transform",Nn[t+2]||""),Nn[t+3].uncache=1)},Tp=function(){nt.cache++,nt.forEach(function(e){return ln(e)&&(e.rec=e())})},qu=function(e,t){var n;for(gn=0;gn<et.length;gn++)n=et[gn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));lr=!0,t&&Ep(t),t||$r("revert")},wp=function(e,t){nt.cache++,(t||!_n)&&nt.forEach(function(n){return ln(n)&&n.cacheID++&&(n.rec=0)}),On(e)&&(Bu=e,tt.history.scrollRestoration!==e&&(tt.history.scrollRestoration=e))},_n,Gr=0,Sf,yb=function(){if(Sf!==Gr){var e=Sf=Gr;requestAnimationFrame(function(){return e===Gr&&Fr(!0)})}},Ap=function(){mt.appendChild(Rs),Hu=!mn&&Rs.offsetHeight||tt.innerHeight,mt.removeChild(Rs)},Mf=function(e){return Pa(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Fr=function(e,t){if(zn=gt.documentElement,mt=gt.body,zu=[tt,gt,zn,mt],ri&&!e&&!lr){Zt(it,"scrollEnd",Mp);return}Ap(),_n=it.isRefreshing=!0,lr||Tp();var n=$r("refreshInit");fp&&it.sort(),t||qu(),nt.forEach(function(i){ln(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),et.slice(0).forEach(function(i){return i.refresh()}),lr=!1,et.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",a=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-a),i.refresh()}}),ou=1,Mf(!0),et.forEach(function(i){var s=yi(i.scroller,i._dir),a=i.vars.end==="max"||i._endClamp&&i.end>s,o=i._startClamp&&i.start>=s;(a||o)&&i.setPositions(o?s-1:i.start,a?Math.max(o?s:i.start+1,s):i.end,!0)}),Mf(!1),ou=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),nt.forEach(function(i){ln(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),wp(Bu,1),Zo.pause(),Gr++,_n=2,zi(2),et.forEach(function(i){return ln(i.vars.onRefresh)&&i.vars.onRefresh(i)}),_n=it.isRefreshing=!1,$r("refresh")},cu=0,Fo=1,xa,zi=function(e){if(e===2||!_n&&!lr){it.isUpdating=!0,xa&&xa.update(0);var t=et.length,n=an(),i=n-jl>=50,s=t&&et[0].scroll();if(Fo=cu>s?-1:1,_n||(cu=s),i&&(ri&&!ol&&n-ri>200&&(ri=0,$r("scrollEnd")),ra=jl,jl=n),Fo<0){for(gn=t;gn-- >0;)et[gn]&&et[gn].update(0,i);Fo=1}else for(gn=0;gn<t;gn++)et[gn]&&et[gn].update(0,i);it.isUpdating=!1}Da=0},uu=[yp,bp,Vu,Gu,ei+va,ei+ma,ei+_a,ei+ga,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],No=uu.concat([Br,Hr,"boxSizing","max"+Vs,"max"+Wu,"position",ei,Bt,Bt+_a,Bt+ma,Bt+va,Bt+ga]),bb=function(e,t,n){Ps(n);var i=e._gsap;if(i.spacerIsNative)Ps(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},Zl=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=uu.length,a=t.style,o=e.style,l;s--;)l=uu[s],a[l]=n[l];a.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(a.display="inline-block"),o[Vu]=o[Gu]="auto",a.flexBasis=n.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[Br]=Jo(e,vn)+Xt,a[Hr]=Jo(e,qt)+Xt,a[Bt]=o[ei]=o[bp]=o[yp]="0",Ps(i),o[Br]=o["max"+Vs]=n[Br],o[Hr]=o["max"+Wu]=n[Hr],o[Bt]=n[Bt],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},Sb=/([A-Z])/g,Ps=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,a;for((e.t._gsap||Re.core.getCache(e.t)).uncache=1;i<n;i+=2)a=e[i+1],s=e[i],a?t[s]=a:t[s]&&t.removeProperty(s.replace(Sb,"-$1").toLowerCase())}},yo=function(e){for(var t=No.length,n=e.style,i=[],s=0;s<t;s++)i.push(No[s],n[No[s]]);return i.t=e,i},Mb=function(e,t,n){for(var i=[],s=e.length,a=n?8:0,o;a<s;a+=2)o=e[a],i.push(o,o in t?t[o]:e[a+1]);return i.t=e.t,i},Oo={left:0,top:0},Ef=function(e,t,n,i,s,a,o,l,c,u,d,f,h,_){ln(e)&&(e=e(l)),On(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?Io("0"+e.substr(3),n):0));var g=h?h.time():0,p,m,T;if(h&&h.seek(0),isNaN(e)||(e=+e),oa(e))h&&(e=Re.utils.mapRange(h.scrollTrigger.start,h.scrollTrigger.end,0,f,e)),o&&Uo(o,n,i,!0);else{ln(t)&&(t=t(l));var E=(e||"0").split(" "),x,A,R,w;T=Sn(t,l)||mt,x=Ui(T)||{},(!x||!x.left&&!x.top)&&ti(T).display==="none"&&(w=T.style.display,T.style.display="block",x=Ui(T),w?T.style.display=w:T.style.removeProperty("display")),A=Io(E[0],x[i.d]),R=Io(E[1]||"0",n),e=x[i.p]-c[i.p]-u+A+s-R,o&&Uo(o,R,i,n-R<20||o._isStart&&R>20),n-=n-R}if(_&&(l[_]=e||-.001,e<0&&(e=0)),a){var I=e+n,b=a._isStart;p="scroll"+i.d2,Uo(a,I,i,b&&I>20||!b&&(d?Math.max(mt[p],zn[p]):a.parentNode[p])<=I+1),d&&(c=Ui(o),d&&(a.style[i.op.p]=c[i.op.p]-i.op.m-a._offset+Xt))}return h&&T&&(p=Ui(T),h.seek(f),m=Ui(T),h._caScrollDist=p[i.p]-m[i.p],e=e/h._caScrollDist*f),h&&h.seek(g),h?e:Math.round(e)},Eb=/(webkit|moz|length|cssText|inset)/i,Tf=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,a,o;if(t===mt){e._stOrig=s.cssText,o=ti(e);for(a in o)!+a&&!Eb.test(a)&&o[a]&&typeof s[a]=="string"&&a!=="0"&&(s[a]=o[a]);s.top=n,s.left=i}else s.cssText=e._stOrig;Re.core.getCache(e).uncache=1,t.appendChild(e)}},Cp=function(e,t,n){var i=t,s=i;return function(a){var o=Math.round(e());return o!==i&&o!==s&&Math.abs(o-i)>3&&Math.abs(o-s)>3&&(a=o,n&&n()),s=i,i=Math.round(a),i}},bo=function(e,t,n){var i={};i[t.p]="+="+n,Re.set(e,i)},wf=function(e,t){var n=pr(e,t),i="_scroll"+t.p2,s=function a(o,l,c,u,d){var f=a.tween,h=l.onComplete,_={};c=c||n();var g=Cp(n,c,function(){f.kill(),a.tween=0});return d=u&&d||0,u=u||o-c,f&&f.kill(),l[i]=o,l.inherit=!1,l.modifiers=_,_[i]=function(){return g(c+u*f.ratio+d*f.ratio*f.ratio)},l.onUpdate=function(){nt.cache++,a.tween&&zi()},l.onComplete=function(){a.tween=0,h&&h.call(f)},f=a.tween=Re.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Zt(e,"wheel",n.wheelHandler),it.isTouch&&Zt(e,"touchmove",n.wheelHandler),s},it=(function(){function r(t,n){ms||r.register(Re)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),au(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!sa){this.update=this.refresh=this.kill=pi;return}n=xf(On(n)||oa(n)||n.nodeType?{trigger:n}:n,vo);var s=n,a=s.onUpdate,o=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,d=s.scrub,f=s.trigger,h=s.pin,_=s.pinSpacing,g=s.invalidateOnRefresh,p=s.anticipatePin,m=s.onScrubComplete,T=s.onSnapComplete,E=s.once,x=s.snap,A=s.pinReparent,R=s.pinSpacer,w=s.containerAnimation,I=s.fastScrollEnd,b=s.preventOverlaps,v=n.horizontal||n.containerAnimation&&n.horizontal!==!1?vn:qt,L=!d&&d!==0,N=Sn(n.scroller||tt),B=Re.core.getCache(N),q=Xr(N),K=("pinType"in n?n.pinType:or(N,"pinType")||q&&"fixed")==="fixed",$=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],X=L&&n.toggleActions.split(" "),H="markers"in n?n.markers:vo.markers,ae=q?0:parseFloat(ti(N)["border"+v.p2+Vs])||0,y=this,P=n.onRefreshInit&&function(){return n.onRefreshInit(y)},re=pb(N,q,v),de=mb(N,q),z=0,J=0,ie=0,Y=pr(N,v),oe,Se,_e,Pe,De,ce,D,Ye,Ie,k,xe,$e,Ee,C,S,G,ne,ee,Q,pe,fe,me,We,le,ue,Ne,ke,we,Ke,He,ot,U,ge,Z,te,he,ve,Ge,ct;if(y._startClamp=y._endClamp=!1,y._dir=v,p*=45,y.scroller=N,y.scroll=w?w.time.bind(w):Y,Pe=Y(),lr&&Y.rec==null&&(Y.rec=Pe),y.vars=n,i=i||n.animation,"refreshPriority"in n&&(fp=1,n.refreshPriority===-9999&&(xa=y)),B.tweenScroll=B.tweenScroll||{top:wf(N,qt),left:wf(N,vn)},y.tweenTo=oe=B.tweenScroll[v.p],y.scrubDuration=function(ye){ge=oa(ye)&&ye,ge?U?U.duration(ye):U=Re.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:ge,paused:!0,onComplete:function(){return m&&m(y)}}):(U&&U.progress(1).kill(),U=0)},i&&(i.vars.lazy=!1,i._initted&&!y.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),y.animation=i.pause(),i.scrollTrigger=y,y.scrubDuration(d),He=0,l||(l=i.vars.id)),x&&((!Rr(x)||x.push)&&(x={snapTo:x}),"scrollBehavior"in mt.style&&Re.set(q?[mt,zn]:N,{scrollBehavior:"auto"}),nt.forEach(function(ye){return ln(ye)&&ye.target===(q?gt.scrollingElement||zn:N)&&(ye.smooth=!1)}),_e=ln(x.snapTo)?x.snapTo:x.snapTo==="labels"?_b(i):x.snapTo==="labelsDirectional"?vb(i):x.directional!==!1?function(ye,Xe){return Xu(x.snapTo)(ye,an()-J<500?0:Xe.direction)}:Re.utils.snap(x.snapTo),Z=x.duration||{min:.1,max:2},Z=Rr(Z)?pa(Z.min,Z.max):pa(Z,Z),te=Re.delayedCall(x.delay||ge/2||.1,function(){var ye=Y(),Xe=an()-J<500,Ue=oe.tween;if((Xe||Math.abs(y.getVelocity())<10)&&!Ue&&!ol&&z!==ye){var Ve=(ye-ce)/C,It=i&&!L?i.totalProgress():Ve,rt=Xe?0:(It-ot)/(an()-ra)*1e3||0,Mt=Re.utils.clamp(-Ve,1-Ve,fs(rt/2)*rt/.185),Gt=Ve+(x.inertia===!1?0:Mt),xt,yt,ft=x,Ln=ft.onStart,Et=ft.onInterrupt,un=ft.onComplete;if(xt=_e(Gt,y),oa(xt)||(xt=Gt),yt=Math.max(0,Math.round(ce+xt*C)),ye<=D&&ye>=ce&&yt!==ye){if(Ue&&!Ue._initted&&Ue.data<=fs(yt-ye))return;x.inertia===!1&&(Mt=xt-Ve),oe(yt,{duration:Z(fs(Math.max(fs(Gt-It),fs(xt-It))*.185/rt/.05||0)),ease:x.ease||"power3",data:fs(yt-ye),onInterrupt:function(){return te.restart(!0)&&Et&&ds(y,Et)},onComplete:function(){y.update(),z=Y(),i&&!L&&(U?U.resetTo("totalProgress",xt,i._tTime/i._tDur):i.progress(xt)),He=ot=i&&!L?i.totalProgress():y.progress,T&&T(y),un&&ds(y,un)}},ye,Mt*C,yt-ye-Mt*C),Ln&&ds(y,Ln,oe.tween)}}else y.isActive&&z!==ye&&te.restart(!0)}).pause()),l&&(lu[l]=y),f=y.trigger=Sn(f||h!==!0&&h),ct=f&&f._gsap&&f._gsap.stRevert,ct&&(ct=ct(y)),h=h===!0?f:Sn(h),On(o)&&(o={targets:f,className:o}),h&&(_===!1||_===ei||(_=!_&&h.parentNode&&h.parentNode.style&&ti(h.parentNode).display==="flex"?!1:Bt),y.pin=h,Se=Re.core.getCache(h),Se.spacer?S=Se.pinState:(R&&(R=Sn(R),R&&!R.nodeType&&(R=R.current||R.nativeElement),Se.spacerIsNative=!!R,R&&(Se.spacerState=yo(R))),Se.spacer=ee=R||gt.createElement("div"),ee.classList.add("pin-spacer"),l&&ee.classList.add("pin-spacer-"+l),Se.pinState=S=yo(h)),n.force3D!==!1&&Re.set(h,{force3D:!0}),y.spacer=ee=Se.spacer,Ke=ti(h),le=Ke[_+v.os2],pe=Re.getProperty(h),fe=Re.quickSetter(h,v.a,Xt),Zl(h,ee,Ke),ne=yo(h)),H){$e=Rr(H)?xf(H,yf):yf,k=xo("scroller-start",l,N,v,$e,0),xe=xo("scroller-end",l,N,v,$e,0,k),Q=k["offset"+v.op.d2];var Pt=Sn(or(N,"content")||N);Ye=this.markerStart=xo("start",l,Pt,v,$e,Q,0,w),Ie=this.markerEnd=xo("end",l,Pt,v,$e,Q,0,w),w&&(Ge=Re.quickSetter([Ye,Ie],v.a,Xt)),!K&&!(Si.length&&or(N,"fixedMarkers")===!0)&&(gb(q?mt:N),Re.set([k,xe],{force3D:!0}),Ne=Re.quickSetter(k,v.a,Xt),we=Re.quickSetter(xe,v.a,Xt))}if(w){var Te=w.vars.onUpdate,Le=w.vars.onUpdateParams;w.eventCallback("onUpdate",function(){y.update(0,0,1),Te&&Te.apply(w,Le||[])})}if(y.previous=function(){return et[et.indexOf(y)-1]},y.next=function(){return et[et.indexOf(y)+1]},y.revert=function(ye,Xe){if(!Xe)return y.kill(!0);var Ue=ye!==!1||!y.enabled,Ve=sn;Ue!==y.isReverted&&(Ue&&(he=Math.max(Y(),y.scroll.rec||0),ie=y.progress,ve=i&&i.progress()),Ye&&[Ye,Ie,k,xe].forEach(function(It){return It.style.display=Ue?"none":"block"}),Ue&&(sn=y,y.update(Ue)),h&&(!A||!y.isActive)&&(Ue?bb(h,ee,S):Zl(h,ee,ti(h),ue)),Ue||y.update(Ue),sn=Ve,y.isReverted=Ue)},y.refresh=function(ye,Xe,Ue,Ve){if(!((sn||!y.enabled)&&!Xe)){if(h&&ye&&ri){Zt(r,"scrollEnd",Mp);return}!_n&&P&&P(y),sn=y,oe.tween&&!Ue&&(oe.tween.kill(),oe.tween=0),U&&U.pause(),g&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(je){return je.vars.immediateRender&&je.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),y.isReverted||y.revert(!0,!0),y._subPinOffset=!1;var It=re(),rt=de(),Mt=w?w.duration():yi(N,v),Gt=C<=.01||!C,xt=0,yt=Ve||0,ft=Rr(Ue)?Ue.end:n.end,Ln=n.endTrigger||f,Et=Rr(Ue)?Ue.start:n.start||(n.start===0||!f?0:h?"0 0":"0 100%"),un=y.pinnedContainer=n.pinnedContainer&&Sn(n.pinnedContainer,y),$n=f&&Math.max(0,et.indexOf(y))||0,Vt=$n,Wt,M,O,W,V,F,se,be,Ce,Ae,Oe,Be,Fe;for(H&&Rr(Ue)&&(Be=Re.getProperty(k,v.p),Fe=Re.getProperty(xe,v.p));Vt-- >0;)F=et[Vt],F.end||F.refresh(0,1)||(sn=y),se=F.pin,se&&(se===f||se===h||se===un)&&!F.isReverted&&(Ae||(Ae=[]),Ae.unshift(F),F.revert(!0,!0)),F!==et[Vt]&&($n--,Vt--);for(ln(Et)&&(Et=Et(y)),Et=mf(Et,"start",y),ce=Ef(Et,f,It,v,Y(),Ye,k,y,rt,ae,K,Mt,w,y._startClamp&&"_startClamp")||(h?-.001:0),ln(ft)&&(ft=ft(y)),On(ft)&&!ft.indexOf("+=")&&(~ft.indexOf(" ")?ft=(On(Et)?Et.split(" ")[0]:"")+ft:(xt=Io(ft.substr(2),It),ft=On(Et)?Et:(w?Re.utils.mapRange(0,w.duration(),w.scrollTrigger.start,w.scrollTrigger.end,ce):ce)+xt,Ln=f)),ft=mf(ft,"end",y),D=Math.max(ce,Ef(ft||(Ln?"100% 0":Mt),Ln,It,v,Y()+xt,Ie,xe,y,rt,ae,K,Mt,w,y._endClamp&&"_endClamp"))||-.001,xt=0,Vt=$n;Vt--;)F=et[Vt]||{},se=F.pin,se&&F.start-F._pinPush<=ce&&!w&&F.end>0&&(Wt=F.end-(y._startClamp?Math.max(0,F.start):F.start),(se===f&&F.start-F._pinPush<ce||se===un)&&isNaN(Et)&&(xt+=Wt*(1-F.progress)),se===h&&(yt+=Wt));if(ce+=xt,D+=xt,y._startClamp&&(y._startClamp+=xt),y._endClamp&&!_n&&(y._endClamp=D||-.001,D=Math.min(D,yi(N,v))),C=D-ce||(ce-=.01)&&.001,Gt&&(ie=Re.utils.clamp(0,1,Re.utils.normalize(ce,D,he))),y._pinPush=yt,Ye&&xt&&(Wt={},Wt[v.a]="+="+xt,un&&(Wt[v.p]="-="+Y()),Re.set([Ye,Ie],Wt)),h&&!(ou&&y.end>=yi(N,v)))Wt=ti(h),W=v===qt,O=Y(),me=parseFloat(pe(v.a))+yt,!Mt&&D>1&&(Oe=(q?gt.scrollingElement||zn:N).style,Oe={style:Oe,value:Oe["overflow"+v.a.toUpperCase()]},q&&ti(mt)["overflow"+v.a.toUpperCase()]!=="scroll"&&(Oe.style["overflow"+v.a.toUpperCase()]="scroll")),Zl(h,ee,Wt),ne=yo(h),M=Ui(h,!0),be=K&&pr(N,W?vn:qt)(),_?(ue=[_+v.os2,C+yt+Xt],ue.t=ee,Vt=_===Bt?Jo(h,v)+C+yt:0,Vt&&(ue.push(v.d,Vt+Xt),ee.style.flexBasis!=="auto"&&(ee.style.flexBasis=Vt+Xt)),Ps(ue),un&&et.forEach(function(je){je.pin===un&&je.vars.pinSpacing!==!1&&(je._subPinOffset=!0)}),K&&Y(he)):(Vt=Jo(h,v),Vt&&ee.style.flexBasis!=="auto"&&(ee.style.flexBasis=Vt+Xt)),K&&(V={top:M.top+(W?O-ce:be)+Xt,left:M.left+(W?be:O-ce)+Xt,boxSizing:"border-box",position:"fixed"},V[Br]=V["max"+Vs]=Math.ceil(M.width)+Xt,V[Hr]=V["max"+Wu]=Math.ceil(M.height)+Xt,V[ei]=V[ei+_a]=V[ei+ma]=V[ei+va]=V[ei+ga]="0",V[Bt]=Wt[Bt],V[Bt+_a]=Wt[Bt+_a],V[Bt+ma]=Wt[Bt+ma],V[Bt+va]=Wt[Bt+va],V[Bt+ga]=Wt[Bt+ga],G=Mb(S,V,A),_n&&Y(0)),i?(Ce=i._initted,$l(1),i.render(i.duration(),!0,!0),We=pe(v.a)-me+C+yt,ke=Math.abs(C-We)>1,K&&ke&&G.splice(G.length-2,2),i.render(0,!0,!0),Ce||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),$l(0)):We=C,Oe&&(Oe.value?Oe.style["overflow"+v.a.toUpperCase()]=Oe.value:Oe.style.removeProperty("overflow-"+v.a));else if(f&&Y()&&!w)for(M=f.parentNode;M&&M!==mt;)M._pinOffset&&(ce-=M._pinOffset,D-=M._pinOffset),M=M.parentNode;Ae&&Ae.forEach(function(je){return je.revert(!1,!0)}),y.start=ce,y.end=D,Pe=De=_n?he:Y(),!w&&!_n&&!lr&&(Pe<he&&Y(he),y.scroll.rec=0),y.revert(!1,!0),J=an(),te&&(z=-1,te.restart(!0)),sn=0,i&&L&&(i._initted||ve)&&i.progress()!==ve&&i.progress(ve||0,!0).render(i.time(),!0,!0),(Gt||ie!==y.progress||w||g||i&&!i._initted)&&(i&&!L&&(i._initted||ie||i.vars.immediateRender!==!1)&&i.totalProgress(w&&ce<-.001&&!ie?Re.utils.normalize(ce,D,0):ie,!0),y.progress=Gt||(Pe-ce)/C===ie?0:ie),h&&_&&(ee._pinOffset=Math.round(y.progress*We)),U&&U.invalidate(),isNaN(Be)||(Be-=Re.getProperty(k,v.p),Fe-=Re.getProperty(xe,v.p),bo(k,v,Be),bo(Ye,v,Be-(Ve||0)),bo(xe,v,Fe),bo(Ie,v,Fe-(Ve||0))),Gt&&!_n&&y.update(),u&&!_n&&!Ee&&(Ee=!0,u(y),Ee=!1)}},y.getVelocity=function(){return(Y()-De)/(an()-ra)*1e3||0},y.endAnimation=function(){ea(y.callbackAnimation),i&&(U?U.progress(1):i.paused()?L||ea(i,y.direction<0,1):ea(i,i.reversed()))},y.labelToScroll=function(ye){return i&&i.labels&&(ce||y.refresh()||ce)+i.labels[ye]/i.duration()*C||0},y.getTrailing=function(ye){var Xe=et.indexOf(y),Ue=y.direction>0?et.slice(0,Xe).reverse():et.slice(Xe+1);return(On(ye)?Ue.filter(function(Ve){return Ve.vars.preventOverlaps===ye}):Ue).filter(function(Ve){return y.direction>0?Ve.end<=ce:Ve.start>=D})},y.update=function(ye,Xe,Ue){if(!(w&&!Ue&&!ye)){var Ve=_n===!0?he:y.scroll(),It=ye?0:(Ve-ce)/C,rt=It<0?0:It>1?1:It||0,Mt=y.progress,Gt,xt,yt,ft,Ln,Et,un,$n;if(Xe&&(De=Pe,Pe=w?Y():Ve,x&&(ot=He,He=i&&!L?i.totalProgress():rt)),p&&h&&!sn&&!po&&ri&&(!rt&&ce<Ve+(Ve-De)/(an()-ra)*p?rt=1e-4:rt===1&&D>Ve+(Ve-De)/(an()-ra)*p&&(rt=.9999)),rt!==Mt&&y.enabled){if(Gt=y.isActive=!!rt&&rt<1,xt=!!Mt&&Mt<1,Et=Gt!==xt,Ln=Et||!!rt!=!!Mt,y.direction=rt>Mt?1:-1,y.progress=rt,Ln&&!sn&&(yt=rt&&!Mt?0:rt===1?1:Mt===1?2:3,L&&(ft=!Et&&X[yt+1]!=="none"&&X[yt+1]||X[yt],$n=i&&(ft==="complete"||ft==="reset"||ft in i))),b&&(Et||$n)&&($n||d||!i)&&(ln(b)?b(y):y.getTrailing(b).forEach(function(O){return O.endAnimation()})),L||(U&&!sn&&!po?(U._dp._time-U._start!==U._time&&U.render(U._dp._time-U._start),U.resetTo?U.resetTo("totalProgress",rt,i._tTime/i._tDur):(U.vars.totalProgress=rt,U.invalidate().restart())):i&&i.totalProgress(rt,!!(sn&&(J||ye)))),h){if(ye&&_&&(ee.style[_+v.os2]=le),!K)fe(aa(me+We*rt));else if(Ln){if(un=!ye&&rt>Mt&&D+1>Ve&&Ve+1>=yi(N,v),A)if(!ye&&(Gt||un)){var Vt=Ui(h,!0),Wt=Ve-ce;Tf(h,mt,Vt.top+(v===qt?Wt:0)+Xt,Vt.left+(v===qt?0:Wt)+Xt)}else Tf(h,ee);Ps(Gt||un?G:ne),ke&&rt<1&&Gt||fe(me+(rt===1&&!un?We:0))}}x&&!oe.tween&&!sn&&!po&&te.restart(!0),o&&(Et||E&&rt&&(rt<1||!Yl))&&Pa(o.targets).forEach(function(O){return O.classList[Gt||E?"add":"remove"](o.className)}),a&&!L&&!ye&&a(y),Ln&&!sn?(L&&($n&&(ft==="complete"?i.pause().totalProgress(1):ft==="reset"?i.restart(!0).pause():ft==="restart"?i.restart(!0):i[ft]()),a&&a(y)),(Et||!Yl)&&(c&&Et&&ds(y,c),$[yt]&&ds(y,$[yt]),E&&(rt===1?y.kill(!1,1):$[yt]=0),Et||(yt=rt===1?1:3,$[yt]&&ds(y,$[yt]))),I&&!Gt&&Math.abs(y.getVelocity())>(oa(I)?I:2500)&&(ea(y.callbackAnimation),U?U.progress(1):ea(i,ft==="reverse"?1:!rt,1))):L&&a&&!sn&&a(y)}if(we){var M=w?Ve/w.duration()*(w._caScrollDist||0):Ve;Ne(M+(k._isFlipped?1:0)),we(M)}Ge&&Ge(-Ve/w.duration()*(w._caScrollDist||0))}},y.enable=function(ye,Xe){y.enabled||(y.enabled=!0,Zt(N,"resize",la),q||Zt(N,"scroll",hs),P&&Zt(r,"refreshInit",P),ye!==!1&&(y.progress=ie=0,Pe=De=z=Y()),Xe!==!1&&y.refresh())},y.getTween=function(ye){return ye&&oe?oe.tween:U},y.setPositions=function(ye,Xe,Ue,Ve){if(w){var It=w.scrollTrigger,rt=w.duration(),Mt=It.end-It.start;ye=It.start+Mt*ye/rt,Xe=It.start+Mt*Xe/rt}y.refresh(!1,!1,{start:gf(ye,Ue&&!!y._startClamp),end:gf(Xe,Ue&&!!y._endClamp)},Ve),y.update()},y.adjustPinSpacing=function(ye){if(ue&&ye){var Xe=ue.indexOf(v.d)+1;ue[Xe]=parseFloat(ue[Xe])+ye+Xt,ue[1]=parseFloat(ue[1])+ye+Xt,Ps(ue)}},y.disable=function(ye,Xe){if(ye!==!1&&y.revert(!0,!0),y.enabled&&(y.enabled=y.isActive=!1,Xe||U&&U.pause(),he=0,Se&&(Se.uncache=1),P&&Kt(r,"refreshInit",P),te&&(te.pause(),oe.tween&&oe.tween.kill()&&(oe.tween=0)),!q)){for(var Ue=et.length;Ue--;)if(et[Ue].scroller===N&&et[Ue]!==y)return;Kt(N,"resize",la),q||Kt(N,"scroll",hs)}},y.kill=function(ye,Xe){y.disable(ye,Xe),U&&!Xe&&U.kill(),l&&delete lu[l];var Ue=et.indexOf(y);Ue>=0&&et.splice(Ue,1),Ue===gn&&Fo>0&&gn--,Ue=0,et.forEach(function(Ve){return Ve.scroller===y.scroller&&(Ue=1)}),Ue||_n||lr||(y.scroll.rec=0),i&&(i.scrollTrigger=null,ye&&i.revert({kill:!1}),Xe||i.kill()),Ye&&[Ye,Ie,k,xe].forEach(function(Ve){return Ve.parentNode&&Ve.parentNode.removeChild(Ve)}),xa===y&&(xa=0),h&&(Se&&(Se.uncache=1),Ue=0,et.forEach(function(Ve){return Ve.pin===h&&Ue++}),Ue||(Se.spacer=0)),n.onKill&&n.onKill(y)},et.push(y),y.enable(!1,!1),ct&&ct(y),i&&i.add&&!C){var Ze=y.update;y.update=function(){y.update=Ze,nt.cache++,ce||D||y.refresh()},Re.delayedCall(.01,y.update),C=.01,ce=D=0}else y.refresh();h&&yb()},r.register=function(n){return ms||(Re=n||_p(),gp()&&window.document&&r.enable(),ms=sa),ms},r.defaults=function(n){if(n)for(var i in n)vo[i]=n[i];return vo},r.disable=function(n,i){sa=0,et.forEach(function(a){return a[i?"kill":"disable"](n)}),Kt(tt,"wheel",hs),Kt(gt,"scroll",hs),clearInterval(ho),Kt(gt,"touchcancel",pi),Kt(mt,"touchstart",pi),go(Kt,gt,"pointerdown,touchstart,mousedown",_f),go(Kt,gt,"pointerup,touchend,mouseup",vf),Zo.kill(),mo(Kt);for(var s=0;s<nt.length;s+=3)_o(Kt,nt[s],nt[s+1]),_o(Kt,nt[s],nt[s+2])},r.enable=function(){if(tt=window,gt=document,zn=gt.documentElement,mt=gt.body,Re){if(Pa=Re.utils.toArray,pa=Re.utils.clamp,au=Re.core.context||pi,$l=Re.core.suppressOverwrites||pi,Bu=tt.history.scrollRestoration||"auto",cu=tt.pageYOffset||0,Re.core.globals("ScrollTrigger",r),mt){sa=1,Rs=document.createElement("div"),Rs.style.height="100vh",Rs.style.position="absolute",Ap(),hb(),Nt.register(Re),r.isTouch=Nt.isTouch,Ki=Nt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),su=Nt.isTouch===1,Zt(tt,"wheel",hs),zu=[tt,gt,zn,mt],Re.matchMedia?(r.matchMedia=function(u){var d=Re.matchMedia(),f;for(f in u)d.add(f,u[f]);return d},Re.addEventListener("matchMediaInit",function(){Tp(),qu()}),Re.addEventListener("matchMediaRevert",function(){return Ep()}),Re.addEventListener("matchMedia",function(){Fr(0,1),$r("matchMedia")}),Re.matchMedia().add("(orientation: portrait)",function(){return Kl(),Kl})):console.warn("Requires GSAP 3.11.0 or later"),Kl(),Zt(gt,"scroll",hs);var n=mt.hasAttribute("style"),i=mt.style,s=i.borderTopStyle,a=Re.core.Animation.prototype,o,l;for(a.revert||Object.defineProperty(a,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",o=Ui(mt),qt.m=Math.round(o.top+qt.sc())||0,vn.m=Math.round(o.left+vn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(mt.setAttribute("style",""),mt.removeAttribute("style")),ho=setInterval(bf,250),Re.delayedCall(.5,function(){return po=0}),Zt(gt,"touchcancel",pi),Zt(mt,"touchstart",pi),go(Zt,gt,"pointerdown,touchstart,mousedown",_f),go(Zt,gt,"pointerup,touchend,mouseup",vf),ru=Re.utils.checkPrefix("transform"),No.push(ru),ms=an(),Zo=Re.delayedCall(.2,Fr).pause(),gs=[gt,"visibilitychange",function(){var u=tt.innerWidth,d=tt.innerHeight;gt.hidden?(hf=u,pf=d):(hf!==u||pf!==d)&&la()},gt,"DOMContentLoaded",Fr,tt,"load",Fr,tt,"resize",la],mo(Zt),et.forEach(function(u){return u.enable(0,1)}),l=0;l<nt.length;l+=3)_o(Kt,nt[l],nt[l+1]),_o(Kt,nt[l],nt[l+2])}else if(gt){var c=function u(){r.enable(),gt.removeEventListener("DOMContentLoaded",u)};gt.addEventListener("DOMContentLoaded",c)}}},r.config=function(n){"limitCallbacks"in n&&(Yl=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(ho)||(ho=i)&&setInterval(bf,i),"ignoreMobileResize"in n&&(su=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(mo(Kt)||mo(Zt,n.autoRefreshEvents||"none"),hp=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=Sn(n),a=nt.indexOf(s),o=Xr(s);~a&&nt.splice(a,o?6:2),i&&(o?Si.unshift(tt,i,mt,i,zn,i):Si.unshift(s,i))},r.clearMatchMedia=function(n){et.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var a=(On(n)?Sn(n):n).getBoundingClientRect(),o=a[s?Br:Hr]*i||0;return s?a.right-o>0&&a.left+o<tt.innerWidth:a.bottom-o>0&&a.top+o<tt.innerHeight},r.positionInViewport=function(n,i,s){On(n)&&(n=Sn(n));var a=n.getBoundingClientRect(),o=a[s?Br:Hr],l=i==null?o/2:i in Qo?Qo[i]*o:~i.indexOf("%")?parseFloat(i)*o/100:parseFloat(i)||0;return s?(a.left+l)/tt.innerWidth:(a.top+l)/tt.innerHeight},r.killAll=function(n){if(et.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=qr.killAll||[];qr={},i.forEach(function(s){return s()})}},r})();it.version="3.15.1";it.saveStyles=function(r){return r?Pa(r).forEach(function(e){if(e&&e.style){var t=Nn.indexOf(e);t>=0&&Nn.splice(t,5),Nn.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Re.core.getCache(e),au())}}):Nn};it.revert=function(r,e){return qu(!r,e)};it.create=function(r,e){return new it(r,e)};it.refresh=function(r){return r?la(!0):(ms||it.register())&&Fr(!0)};it.update=function(r){return++nt.cache&&zi(r===!0?2:0)};it.clearScrollMemory=wp;it.maxScroll=function(r,e){return yi(r,e?vn:qt)};it.getScrollFunc=function(r,e){return pr(Sn(r),e?vn:qt)};it.getById=function(r){return lu[r]};it.getAll=function(){return et.filter(function(r){return r.vars.id!=="ScrollSmoother"})};it.isScrolling=function(){return!!ri};it.snapDirectional=Xu;it.addEventListener=function(r,e){var t=qr[r]||(qr[r]=[]);~t.indexOf(e)||t.push(e)};it.removeEventListener=function(r,e){var t=qr[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};it.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,a=function(c,u){var d=[],f=[],h=Re.delayedCall(i,function(){u(d,f),d=[],f=[]}).pause();return function(_){d.length||h.restart(!0),d.push(_.trigger),f.push(_),s<=d.length&&h.progress(1)}},o;for(o in e)n[o]=o.substr(0,2)==="on"&&ln(e[o])&&o!=="onRefreshInit"?a(o,e[o]):e[o];return ln(s)&&(s=s(),Zt(it,"refresh",function(){return s=e.batchMax()})),Pa(r).forEach(function(l){var c={};for(o in n)c[o]=n[o];c.trigger=l,t.push(it.create(c))}),t};var Af=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},Jl=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Nt.isTouch?" pinch-zoom":""):"none",e===zn&&r(mt,t)},So={auto:1,scroll:1},Tb=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,a=s._gsap||Re.core.getCache(s),o=an(),l;if(!a._isScrollT||o-a._isScrollT>2e3){for(;s&&s!==mt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(So[(l=ti(s)).overflowY]||So[l.overflowX]));)s=s.parentNode;a._isScroll=s&&s!==n&&!Xr(s)&&(So[(l=ti(s)).overflowY]||So[l.overflowX]),a._isScrollT=o}(a._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},Rp=function(e,t,n,i){return Nt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&Tb,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Zt(gt,Nt.eventTypes[0],Rf,!1,!0)},onDisable:function(){return Kt(gt,Nt.eventTypes[0],Rf,!0)}})},wb=/(input|label|select|textarea)/i,Cf,Rf=function(e){var t=wb.test(e.target.tagName);(t||Cf)&&(e._gsapAllow=!0,Cf=t)},Ab=function(e){Rr(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,a=t.onRelease,o,l,c=Sn(e.target)||zn,u=Re.core.globals().ScrollSmoother,d=u&&u.get(),f=Ki&&(e.content&&Sn(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),h=pr(c,qt),_=pr(c,vn),g=1,p=(Nt.isTouch&&tt.visualViewport?tt.visualViewport.scale*tt.visualViewport.width:tt.outerWidth)/tt.innerWidth,m=0,T=ln(i)?function(){return i(o)}:function(){return i||2.8},E,x,A=Rp(c,e.type,!0,s),R=function(){return x=!1},w=pi,I=pi,b=function(){l=yi(c,qt),I=pa(Ki?1:0,l),n&&(w=pa(0,yi(c,vn))),E=Gr},v=function(){f._gsap.y=aa(parseFloat(f._gsap.y)+h.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",h.offset=h.cacheID=0},L=function(){if(x){requestAnimationFrame(R);var H=aa(o.deltaY/2),ae=I(h.v-H);if(f&&ae!==h.v+h.offset){h.offset=ae-h.v;var y=aa((parseFloat(f&&f._gsap.y)||0)-h.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+y+", 0, 1)",f._gsap.y=y+"px",h.cacheID=nt.cache,zi()}return!0}h.offset&&v(),x=!0},N,B,q,K,$=function(){b(),N.isActive()&&N.vars.scrollY>l&&(h()>l?N.progress(1)&&h(l):N.resetTo("scrollY",l))};return f&&Re.set(f,{y:"+=0"}),e.ignoreCheck=function(X){return Ki&&X.type==="touchmove"&&L()||g>1.05&&X.type!=="touchstart"||o.isGesturing||X.touches&&X.touches.length>1},e.onPress=function(){x=!1;var X=g;g=aa((tt.visualViewport&&tt.visualViewport.scale||1)/p),N.pause(),X!==g&&Jl(c,g>1.01?!0:n?!1:"x"),B=_(),q=h(),b(),E=Gr},e.onRelease=e.onGestureStart=function(X,H){if(h.offset&&v(),!H)K.restart(!0);else{nt.cache++;var ae=T(),y,P;n&&(y=_(),P=y+ae*.05*-X.velocityX/.227,ae*=Af(_,y,P,yi(c,vn)),N.vars.scrollX=w(P)),y=h(),P=y+ae*.05*-X.velocityY/.227,ae*=Af(h,y,P,yi(c,qt)),N.vars.scrollY=I(P),N.invalidate().duration(ae).play(.01),(Ki&&N.vars.scrollY>=l||y>=l-1)&&Re.to({},{onUpdate:$,duration:ae})}a&&a(X)},e.onWheel=function(){N._ts&&N.pause(),an()-m>1e3&&(E=0,m=an())},e.onChange=function(X,H,ae,y,P){if(Gr!==E&&b(),H&&n&&_(w(y[2]===H?B+(X.startX-X.x):_()+H-y[1])),ae){h.offset&&v();var re=P[2]===ae,de=re?q+X.startY-X.y:h()+ae-P[1],z=I(de);re&&de!==z&&(q+=z-de),h(z)}(ae||H)&&zi()},e.onEnable=function(){Jl(c,n?!1:"x"),it.addEventListener("refresh",$),Zt(tt,"resize",$),h.smooth&&(h.target.style.scrollBehavior="auto",h.smooth=_.smooth=!1),A.enable()},e.onDisable=function(){Jl(c,!0),Kt(tt,"resize",$),it.removeEventListener("refresh",$),A.kill()},e.lockAxis=e.lockAxis!==!1,o=new Nt(e),o.iOS=Ki,Ki&&!h()&&h(1),Ki&&Re.ticker.add(pi),K=o._dc,N=Re.to(o,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Cp(h,h(),function(){return N.pause()})},onUpdate:zi,onComplete:K.vars.onComplete}),o};it.sort=function(r){if(ln(r))return et.sort(r);var e=tt.pageYOffset||0;return it.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+tt.innerHeight}),et.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};it.observe=function(r){return new Nt(r)};it.normalizeScroll=function(r){if(typeof r>"u")return mn;if(r===!0&&mn)return mn.enable();if(r===!1){mn&&mn.kill(),mn=r;return}var e=r instanceof Nt?r:Ab(r);return mn&&mn.target===e.target&&mn.kill(),Xr(e.target)&&(mn=e),e};it.core={_getVelocityProp:iu,_inputObserver:Rp,_scrollers:nt,_proxies:Si,bridge:{ss:function(){ri||$r("scrollStart"),ri=an()},ref:function(){return sn}}};_p()&&Re.registerPlugin(it);rp.registerPlugin(it);function Cb(r,e){if(!r||!e)return null;r.muted=!0,r.playsInline=!0,r.setAttribute("muted",""),r.setAttribute("playsinline",""),r.preload="auto";let t=10,n=!1,i=0,s=null;const a=()=>{r.duration&&!isNaN(r.duration)&&(t=r.duration),n=!0,l()};r.readyState>=1?a():r.addEventListener("loadedmetadata",a);const o=()=>{if(n&&!isNaN(i)){const c=i-r.currentTime;Math.abs(c)>.03&&(r.currentTime+=c*.18)}s=requestAnimationFrame(o)};s=requestAnimationFrame(o);function l(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){r.currentTime=1;return}it.create({trigger:e,start:"top top",end:"bottom bottom",scrub:1,onUpdate:u=>{i=u.progress*t}})}return r.addEventListener("error",c=>{console.warn("Video playback notice, displaying atmospheric fallback.",c)}),{destroy:()=>{s&&cancelAnimationFrame(s),it.getAll().forEach(c=>c.kill())}}}const Rb="/api";class Pb{constructor(){this.token=localStorage.getItem("drishyam_token")||null}setToken(e){this.token=e,e?localStorage.setItem("drishyam_token",e):localStorage.removeItem("drishyam_token")}getHeaders(e={}){const t={"Content-Type":"application/json",...e};return this.token&&(t.Authorization=`Bearer ${this.token}`),t}async request(e,t={}){t.headers=this.getHeaders(t.headers);try{const n=await fetch(`${Rb}${e}`,t);return n.status,await n.json()}catch(n){return console.warn(`API call ${e} failed:`,n),null}}async register(e,t,n){const i=await this.request("/auth/register",{method:"POST",body:JSON.stringify({email:e,password:t,full_name:n})});return i!=null&&i.access_token&&this.setToken(i.access_token),i}async login(e,t){const n=await this.request("/auth/login",{method:"POST",body:JSON.stringify({email:e,password:t})});return n!=null&&n.access_token&&this.setToken(n.access_token),n}async demoLogin(){const e=await this.request("/auth/demo-login",{method:"POST"});return e!=null&&e.access_token&&this.setToken(e.access_token),e}async getMe(){return await this.request("/auth/me")}logout(){this.setToken(null)}async getProfile(){return await this.request("/profile")}async updateProfile(e){return await this.request("/profile",{method:"PUT",body:JSON.stringify(e)})}async getPreferences(){return await this.request("/preferences")}async updatePreferences(e){return await this.request("/preferences",{method:"PUT",body:JSON.stringify(e)})}async getGoals(){return await this.request("/goals")}async updateGoals(e){return await this.request("/goals",{method:"PUT",body:JSON.stringify(e)})}async calculateGoals(e){return await this.request("/goals/calculate",{method:"POST",body:JSON.stringify(e)})}async getPantry(){return await this.request("/pantry")||[]}async addPantryItem(e){return await this.request("/pantry",{method:"POST",body:JSON.stringify(e)})}async updatePantryItem(e,t){return await this.request(`/pantry/${e}`,{method:"PUT",body:JSON.stringify(t)})}async deletePantryItem(e){return await this.request(`/pantry/${e}`,{method:"DELETE"})}async recommend(e={}){return await this.request("/recommend",{method:"POST",body:JSON.stringify(e)})}async getRecipe(e){return await this.request(`/recipes/${e}`)}async getSavedRecipes(){return await this.request("/recipes/saved/all")||[]}async saveRecipe(e){return await this.request(`/recipes/${e}/save`,{method:"POST"})}async unsaveRecipe(e){return await this.request(`/recipes/${e}/save`,{method:"DELETE"})}async getInstructions(e){return await this.request(`/instructions/${e}`)}async analyzeNutrition(e){return await this.request("/nutrition/analyze",{method:"POST",body:JSON.stringify(e)})}async getNutritionSummary(e=null){return await this.request(`/nutrition/summary${e?`?date=${e}`:""}`)}async logMeal(e){return await this.request("/nutrition/meal-log",{method:"POST",body:JSON.stringify(e)})}async getNutritionHistory(e=7){return await this.request(`/nutrition/history?days=${e}`)}async getMealPlans(){return await this.request("/meal-plans")||[]}async addMealPlan(e){return await this.request("/meal-plans",{method:"POST",body:JSON.stringify(e)})}async deleteMealPlan(e){return await this.request(`/meal-plans/${e}`,{method:"DELETE"})}async getShoppingItems(){return await this.request("/shopping/items")||[]}async addShoppingItem(e){return await this.request("/shopping/items",{method:"POST",body:JSON.stringify(e)})}async toggleShoppingItem(e){return await this.request(`/shopping/items/${e}`,{method:"PUT"})}async deleteShoppingItem(e){return await this.request(`/shopping/items/${e}`,{method:"DELETE"})}async getShoppingSuggestions(){return await this.request("/shopping/suggestions")||[]}async getFlavourProfile(e){return await this.request(`/flavour/${encodeURIComponent(e)}`)}async getSubstitutes(e){return await this.request(`/substitute?ingredient=${encodeURIComponent(e)}`)}async getHealth(){return await this.request("/health")}}const qe=new Pb;function Db(r="login",e=()=>{}){const t=document.getElementById("drishyam-auth-modal");t&&t.remove();const n=document.createElement("div");n.id="drishyam-auth-modal",n.className="modal-backdrop";let i=r;function s(){n.innerHTML=`
      <div class="modal-content glass-panel" style="max-width: 440px; border-color: rgba(255, 138, 50, 0.3); padding: 36px 32px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="brand-symbol" style="width: 28px; height: 28px; font-size: 0.95rem;">D</div>
            <span style="font-family: var(--font-serif); font-weight: 700; letter-spacing: 0.15em; font-size: 1.1rem;">DRISHYAM</span>
          </div>
          <button id="auth-close-btn" style="color: var(--text-muted); font-size: 1.4rem; padding: 4px;">&times;</button>
        </div>

        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 6px; font-weight: 700;">
          ${i==="login"?"Welcome back":"Create your account"}
        </h3>
        <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 24px;">
          ${i==="login"?"Sign in to access your intelligent pantry and nutrition targets.":"Join the next generation of computational gastronomy."}
        </p>

        <form id="auth-form" style="display: flex; flex-direction: column; gap: 16px;">
          ${i==="register"?`
            <div>
              <label style="display: block; font-size: 0.78rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 6px;">Full Name</label>
              <input type="text" id="auth-name" required placeholder="Chef Alex" style="width: 100%; padding: 12px 14px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff; font-size: 0.92rem;" />
            </div>
          `:""}

          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 6px;">Email Address</label>
            <input type="email" id="auth-email" required placeholder="alex@kitchen.ai" value="${i==="login"?"demo@drishyam.ai":""}" style="width: 100%; padding: 12px 14px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff; font-size: 0.92rem;" />
          </div>

          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 6px;">Password</label>
            <input type="password" id="auth-password" required placeholder="••••••••" value="${i==="login"?"drishyam2026":""}" style="width: 100%; padding: 12px 14px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff; font-size: 0.92rem;" />
          </div>

          <div id="auth-error" style="color: var(--accent-red); font-size: 0.82rem; display: none;"></div>

          <button type="submit" id="auth-submit-btn" class="btn-primary" style="width: 100%; padding: 14px; margin-top: 6px;">
            ${i==="login"?"Sign In":"Create Account"}
          </button>
        </form>

        <div style="position: relative; text-align: center; margin: 20px 0;">
          <div style="position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: var(--border-subtle);"></div>
          <span style="position: relative; background: var(--bg-surface); padding: 0 12px; font-size: 0.76rem; color: var(--text-muted); text-transform: uppercase; font-family: var(--font-mono);">OR</span>
        </div>

        <button id="auth-demo-btn" class="btn-secondary" style="width: 100%; padding: 12px; border-color: rgba(232, 181, 106, 0.4); color: var(--accent-secondary); font-size: 0.88rem;">
          ⚡ Instant Demo Sign In (Chef Suman)
        </button>

        <div style="margin-top: 22px; text-align: center; font-size: 0.85rem; color: var(--text-secondary);">
          ${i==="login"?`
            Don't have an account yet? <a href="#" id="auth-toggle-mode" style="color: var(--accent-primary); font-weight: 600;">Sign up</a>
          `:`
            Already have an account? <a href="#" id="auth-toggle-mode" style="color: var(--accent-primary); font-weight: 600;">Sign in</a>
          `}
        </div>
      </div>
    `,n.querySelector("#auth-close-btn").onclick=()=>n.remove(),n.querySelector("#auth-toggle-mode").onclick=a=>{a.preventDefault(),i=i==="login"?"register":"login",s()},n.querySelector("#auth-demo-btn").onclick=async()=>{const a=n.querySelector("#auth-demo-btn");a.innerText="Connecting...",a.disabled=!0;const o=await qe.demoLogin();o!=null&&o.access_token?(n.remove(),e(o.user)):(a.innerText="Demo Login Failed",a.disabled=!1)},n.querySelector("#auth-form").onsubmit=async a=>{a.preventDefault();const o=n.querySelector("#auth-email").value,l=n.querySelector("#auth-password").value,c=n.querySelector("#auth-error"),u=n.querySelector("#auth-submit-btn");c.style.display="none",u.innerText="Verifying...",u.disabled=!0;let d;if(i==="register"){const f=n.querySelector("#auth-name").value;d=await qe.register(o,l,f)}else d=await qe.login(o,l);d!=null&&d.access_token?(n.remove(),e(d.user)):(c.innerText=(d==null?void 0:d.detail)||"Authentication failed. Please check credentials.",c.style.display="block",u.innerText=i==="login"?"Sign In":"Create Account",u.disabled=!1)}}s(),document.body.appendChild(n)}function Lb(r,e){r.innerHTML=`
    <!-- Top Navigation Header -->
    <header class="navbar-wrapper">
      <nav class="navbar glass-pill">
        <a href="#" class="brand-group">
          <div class="brand-symbol">D</div>
          <span class="brand-name">DRISHYAM</span>
        </a>

        <div class="nav-links">
          <a href="#ingredient-intelligence" class="nav-link">Discover</a>
          <a href="#ingredient-intelligence" class="nav-link">How it works</a>
          <a href="#flavour-science" class="nav-link">Flavour science</a>
          <a href="#nutrition-intelligence" class="nav-link">Nutrition</a>
          <a href="#personalized-cooking" class="nav-link">Goals</a>
        </div>

        <div class="nav-actions">
          <button id="nav-signin-btn" class="btn-ghost">Sign In</button>
          <button id="nav-launch-btn" class="btn-primary">Launch DRISHYAM</button>
          <button id="nav-mobile-menu-btn" class="btn-mobile-toggle" aria-label="Toggle menu">☰</button>
        </div>
      </nav>
    </header>

    <!-- Mobile Drawer -->
    <div id="mobile-menu-drawer" class="mobile-drawer">
      <a href="#ingredient-intelligence" class="mobile-drawer-link">Discover</a>
      <a href="#ingredient-intelligence" class="mobile-drawer-link">How it works</a>
      <a href="#flavour-science" class="mobile-drawer-link">Flavour science</a>
      <a href="#nutrition-intelligence" class="mobile-drawer-link">Nutrition</a>
      <a href="#personalized-cooking" class="mobile-drawer-link">Goals</a>
      <button id="mobile-launch-btn" class="btn-primary" style="margin-top: 8px; width: 100%;">Launch DRISHYAM ➔</button>
    </div>

    <!-- Scroll-Controlled Cinematic Hero -->
    <div class="hero-scroll-container" id="hero-section">
      <div class="hero-sticky-frame">
        <!-- Scroll Scrubbed Cinematic Video -->
        <video id="hero-cinematic-video" class="hero-video-bg" playsinline muted preload="auto">
          <source src="/videos/WhatsApp%20Video%202026-11-10%20at%2000.01.23.mp4" type="video/mp4" />
          <source src="/videos/WhatsApp Video 2026-11-10 at 00.01.23.mp4" type="video/mp4" />
        </video>

        <!-- Three.js Ambient Particle & Amber Light Overlay -->
        <canvas id="hero-three-canvas" class="hero-three-canvas"></canvas>

        <!-- Vignette & Lighting Gradients -->
        <div class="hero-vignette"></div>

        <!-- Floating HUD Vision Markers in Hero -->
        <div class="hero-vision-hud">
          <div class="hud-box" style="top: 28%; left: 16%; width: 140px; height: 110px;">
            <div class="hud-tag">TURMERIC (94%)</div>
          </div>
          <div class="hud-box" style="top: 36%; right: 18%; width: 160px; height: 120px; animation-delay: -2s;">
            <div class="hud-tag">CUMIN SEEDS (92%)</div>
          </div>
          <div class="hud-box" style="bottom: 24%; left: 32%; width: 130px; height: 100px; animation-delay: -4s;">
            <div class="hud-tag">CLOVES (89%)</div>
          </div>
        </div>

        <!-- Hero Content Overlay -->
        <div class="hero-content">
          <div class="hero-eyebrow">
            <span class="status-dot"></span>
            THE INTELLIGENT KITCHEN
          </div>

          <h1 class="hero-title">
            Your ingredients.<br />
            Your nutrition.<br />
            <span class="gradient-text-amber">Your next great meal.</span>
          </h1>

          <p class="hero-desc">
            Discover what you can cook, understand the science of flavour and make every meal work towards your goals. Powered by computational gastronomy and Foodoscope.
          </p>

          <div class="hero-cta-group">
            <button id="hero-start-btn" class="btn-primary">
              Start Exploring ➔
            </button>
            <a href="#ingredient-intelligence" class="btn-secondary">
              Discover How It Works
            </a>
          </div>

          <div style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase;">
            Powered by Foodoscope RecipeDB & FlavorDB • Molecular Gastronomy
          </div>
        </div>

        <div class="hero-scroll-indicator">
          <div class="scroll-mouse-icon">
            <div class="scroll-wheel"></div>
          </div>
          <span>SCROLL TO DISCOVER</span>
        </div>
      </div>
    </div>

    <!-- Section 1: Ingredient Intelligence -->
    <section class="drishyam-section" id="ingredient-intelligence">
      <div class="section-header">
        <span class="section-eyebrow">INTELLIGENT RECOGNITION & CATALOG</span>
        <h2 class="section-title">Every ingredient has a story.</h2>
        <p class="section-desc">
          From ancient Indian whole spices to kitchen staples, DRISHYAM analyzes botanical profiles, flavor volatility and nutritional composition in real time.
        </p>
      </div>

      <!-- Scene 1 Botanical Spectrum Telemetry Card -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 36px; align-items: center; margin-bottom: 54px;">
        <div class="glass-panel" style="padding: 28px; border-radius: var(--radius-xl); box-shadow: var(--shadow-elevated); background: linear-gradient(135deg, rgba(24,24,24,0.9), rgba(16,16,16,0.95)); border: 1px solid var(--border-subtle);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <span class="badge badge-amber">Botanical Spectrum • Scientific Profiling</span>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-primary);">AI SPECTRUM</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 20px;">
            <div style="background: rgba(255,255,255,0.03); border-radius: var(--radius-md); padding: 14px; border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-size: 0.72rem; color: var(--text-tertiary); text-transform: uppercase;">Curcuma longa</div>
              <div style="font-size: 1.1rem; font-weight: 700; color: var(--accent-primary); margin: 4px 0;">Turmeric</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary);">Curcumin, Turmerone, Zingiberene</div>
            </div>
            <div style="background: rgba(255,255,255,0.03); border-radius: var(--radius-md); padding: 14px; border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-size: 0.72rem; color: var(--text-tertiary); text-transform: uppercase;">Cuminum cyminum</div>
              <div style="font-size: 1.1rem; font-weight: 700; color: var(--accent-secondary); margin: 4px 0;">Cumin Seeds</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary);">Cuminaldehyde, Terpenes, Cymene</div>
            </div>
            <div style="background: rgba(255,255,255,0.03); border-radius: var(--radius-md); padding: 14px; border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-size: 0.72rem; color: var(--text-tertiary); text-transform: uppercase;">Syzygium aromaticum</div>
              <div style="font-size: 1.1rem; font-weight: 700; color: #E8B56A; margin: 4px 0;">Whole Cloves</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary);">Eugenol 85%, Caryophyllene</div>
            </div>
            <div style="background: rgba(255,255,255,0.03); border-radius: var(--radius-md); padding: 14px; border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-size: 0.72rem; color: var(--text-tertiary); text-transform: uppercase;">Elettaria cardamomum</div>
              <div style="font-size: 1.1rem; font-weight: 700; color: #4ADE80; margin: 4px 0;">Green Cardamom</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary);">1,8-Cineole, Terpinyl acetate</div>
            </div>
          </div>
          <div style="padding: 16px; background: rgba(255,138,50,0.08); border-radius: var(--radius-md); border-left: 3px solid var(--accent-primary);">
            <div style="font-size: 0.82rem; color: var(--text-primary); font-weight: 600;">Molecular Pairing Coherence</div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;">98.4% shared aromatic volatile affinity mapped across Foodoscope FlavorDB.</div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 18px;">
          <div class="glass-card" style="padding: 20px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
              <span style="font-size: 1.4rem;">✨</span>
              <h4 style="font-size: 1.05rem; font-weight: 700;">Powders & Whole Aromatics</h4>
            </div>
            <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6;">
              Accurately tracks turmeric, red chilli, coriander powder, black pepper, cumin seeds, cloves, cardamom, and cinnamon stick profiles with zero ambiguity.
            </p>
          </div>

          <div class="glass-card" style="padding: 20px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
              <span style="font-size: 1.4rem;">🧅</span>
              <h4 style="font-size: 1.05rem; font-weight: 700;">Counter Staples & Aromatics</h4>
            </div>
            <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6;">
              Detects onions, tomatoes, garlic bulbs, fresh ginger root, green chillies, lemons, curry leaves and coconut in seconds.
            </p>
          </div>

          <div class="glass-card" style="padding: 20px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
              <span style="font-size: 1.4rem;">🫙</span>
              <h4 style="font-size: 1.05rem; font-weight: 700;">Pantry Auto-Accumulation</h4>
            </div>
            <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6;">
              Add items manually or organize your digital kitchen with live quantity tracking, unit conversions, and expiry warnings.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: How It Works -->
    <section class="drishyam-section" id="how-it-works">
      <div class="section-header">
        <span class="section-eyebrow">THE ARCHITECTURE</span>
        <h2 class="section-title">From your kitchen counter to your dining table.</h2>
        <p class="section-desc">
          Four interconnected intelligence layers working together in milliseconds to turn raw spices into culinary masterpieces.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 36px; align-items: center;">
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div class="glass-card" style="padding: 22px; border-left: 3px solid var(--accent-primary);">
            <div style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--accent-primary); margin-bottom: 4px;">LAYER 01</div>
            <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 6px;">Zero-Cost Vision & Detection</h4>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
              High-accuracy ingredient classification optimized for real kitchen lighting and textures.
            </p>
          </div>

          <div class="glass-card" style="padding: 22px; border-left: 3px solid var(--accent-secondary);">
            <div style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--accent-secondary); margin-bottom: 4px;">LAYER 02</div>
            <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 6px;">Temporal Accumulator & Digital Pantry</h4>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
              Ingredients are confirmed with human-in-the-loop control, building an inventory with zero duplicate entries.
            </p>
          </div>

          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
            Your pantry synchronizes with your profile, dietary lifestyle (Vegetarian, Vegan, Non-Vegetarian) and specific allergen restrictions.
          </p>

          <div style="display: flex; gap: 12px; margin-top: 6px;">
            <button id="pantry-launch-btn" class="btn-primary" style="padding: 12px 24px;">Manage Your Pantry ➔</button>
          </div>
        </div>

        <!-- Scene 2 Real-Time Pantry Detection Telemetry Card -->
        <div class="glass-panel" style="padding: 28px; border-radius: var(--radius-xl); box-shadow: var(--shadow-elevated); background: linear-gradient(135deg, rgba(20,20,20,0.95), rgba(10,10,10,0.98)); border: 1px solid var(--border-subtle); position: relative;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h4 style="font-size: 1.15rem; font-weight: 700;">Real-Time Pantry Detection</h4>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-primary); display: flex; align-items: center; gap: 6px;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #4ADE80; box-shadow: 0 0 8px #4ADE80;"></span>
              AI ENGINE READY
            </div>
          </div>
          <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 20px;">Instant edge classification of culinary staples.</p>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,138,50,0.3); border-radius: var(--radius-md);">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="color: var(--accent-primary); font-size: 1.1rem;">🧂</span>
                <div>
                  <div style="font-size: 0.92rem; font-weight: 600;">Turmeric Powder</div>
                  <div style="font-size: 0.72rem; color: var(--text-tertiary);">Curcuminoid spice • 250g</div>
                </div>
              </div>
              <span class="badge badge-green">94% Confidence</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(232,181,106,0.3); border-radius: var(--radius-md);">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="color: var(--accent-secondary); font-size: 1.1rem;">🌱</span>
                <div>
                  <div style="font-size: 0.92rem; font-weight: 600;">Whole Cumin Seeds</div>
                  <div style="font-size: 0.72rem; color: var(--text-tertiary);">Terpene aromatic • 200g</div>
                </div>
              </div>
              <span class="badge badge-green">92% Confidence</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: var(--radius-md);">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.1rem;">🧅</span>
                <div>
                  <div style="font-size: 0.92rem; font-weight: 600;">Red Onion & Fresh Garlic</div>
                  <div style="font-size: 0.72rem; color: var(--text-tertiary);">Allium aromatics • Staple base</div>
                </div>
              </div>
              <span class="badge badge-amber">89% Confidence</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Molecular Flavour Science -->
    <section class="drishyam-section" id="flavour-science">
      <div class="section-header">
        <span class="section-eyebrow">MOLECULAR COMPUTATIONAL GASTRONOMY</span>
        <h2 class="section-title">Cooking meets chemistry.</h2>
        <p class="section-desc">
          Foodoscope FlavorDB maps the chemical volatile compounds of food. Ingredients that share aroma molecules taste harmonious together.
        </p>
      </div>

      <!-- Interactive FlavorDB Graph Visualization -->
      <div class="flavor-network-container">
        <canvas id="flavor-network-canvas" class="flavor-network-canvas"></canvas>
        <div id="flavor-info-overlay" class="flavor-info-overlay"></div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 32px;">
        <div class="glass-card" style="padding: 22px;">
          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--accent-primary); margin-bottom: 8px;">
            Curcumin + Piperine Synergy
          </h4>
          <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6;">
            Turmeric's anti-inflammatory curcumin has low natural bioavailability. Piperine from black pepper inhibits glucuronidation, increasing curcumin absorption by over 2000%.
          </p>
        </div>

        <div class="glass-card" style="padding: 22px;">
          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--accent-secondary); margin-bottom: 8px;">
            Eugenol Whole-Spice Quartet
          </h4>
          <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6;">
            Cloves, cinnamon, cardamom, and bay leaf share volatile eugenol and cineole terpenes. When bloomed in hot oil or ghee, they release an intensely balanced aromatic bouquet.
          </p>
        </div>
      </div>
    </section>

    <!-- Section 4 & 5: Recipe Discovery & Nutrition Intelligence -->
    <section class="drishyam-section" id="nutrition-intelligence">
      <div class="section-header">
        <span class="section-eyebrow">NUTRITIONAL GASTRONOMY DASHBOARD</span>
        <h2 class="section-title">Know what goes onto your plate.</h2>
        <p class="section-desc">
          Complete nutritional breakdown of calories, protein, carbohydrates, fats, and dietary fibre. Understand exactly what each ingredient contributes to your health.
        </p>
      </div>

      <!-- Scene 4 Live Dish & Interactive Dashboard -->
      <div class="nutrition-preview-grid">
        <div class="dish-visual-card glass-panel" style="padding: 28px; border-radius: var(--radius-xl); display: flex; flex-direction: column; justify-content: space-between; background: linear-gradient(135deg, rgba(22,22,22,0.95), rgba(12,12,12,0.98)); border: 1px solid var(--border-subtle);">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
              <span class="badge badge-green">94% Pantry Match</span>
              <span class="badge badge-amber">Gastronomy Score: 88/100</span>
            </div>
            <div style="font-size: 2.2rem; margin-bottom: 10px;">🍲</div>
            <h3 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 8px;">Paneer Tikka Masala Skillet</h3>
            <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6;">
              Spiced cottage cheese seared with ginger, garlic, and cumin. Synergizes rich lactic diacetyl umami with eugenol and piperine aromatics.
            </p>
          </div>
          <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between;">
            <div>
              <div style="font-size: 0.72rem; color: var(--text-tertiary);">TOTAL TIME</div>
              <div style="font-size: 0.95rem; font-weight: 600;">25 mins</div>
            </div>
            <div>
              <div style="font-size: 0.72rem; color: var(--text-tertiary);">ENERGY</div>
              <div style="font-size: 0.95rem; font-weight: 600; color: var(--accent-primary);">365 kcal</div>
            </div>
            <div>
              <div style="font-size: 0.72rem; color: var(--text-tertiary);">PROTEIN</div>
              <div style="font-size: 0.95rem; font-weight: 600; color: #4ADE80;">17.5g</div>
            </div>
          </div>
        </div>

        <div class="nutrition-dashboard-card glass-panel">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
            <div>
              <span class="badge badge-amber" style="font-size: 0.7rem; margin-bottom: 4px;">Verified RecipeDB Dish</span>
              <h3 style="font-size: 1.35rem; font-weight: 700;">Paneer Tikka Masala Skillet</h3>
            </div>
            <div style="text-align: right;">
              <span style="font-family: var(--font-mono); font-size: 1.7rem; font-weight: 800; color: var(--accent-primary);">365</span>
              <span style="font-size: 0.78rem; color: var(--text-muted); display: block;">kcal / serving</span>
            </div>
          </div>

          <!-- Animated Macro Rings -->
          <div class="macro-ring-container">
            <div class="macro-box">
              <span class="macro-label">Protein</span>
              <div class="macro-val" style="color: #2ED573;">17.5g</div>
              <span style="font-size: 0.68rem; color: var(--text-muted);">Paneer • High</span>
            </div>
            <div class="macro-box">
              <span class="macro-label">Carbs</span>
              <div class="macro-val" style="color: #FFB800;">14.8g</div>
              <span style="font-size: 0.68rem; color: var(--text-muted);">Tomato • Onion</span>
            </div>
            <div class="macro-box">
              <span class="macro-label">Total Fat</span>
              <div class="macro-val" style="color: #FF4757;">26.2g</div>
              <span style="font-size: 0.68rem; color: var(--text-muted);">Dairy • Oil</span>
            </div>
            <div class="macro-box">
              <span class="macro-label">Fibre</span>
              <div class="macro-val" style="color: #00D2D3;">3.9g</div>
              <span style="font-size: 0.68rem; color: var(--text-muted);">Spices • Veg</span>
            </div>
          </div>

          <!-- Ingredient Contribution Breakdown -->
          <div>
            <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 10px;">
              Ingredient Contribution Analysis
            </h4>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; padding: 8px 12px; background: rgba(255,255,255,0.03); border-radius: var(--radius-sm);">
                <span>🧀 <strong>Fresh Paneer (100g)</strong></span>
                <span style="color: #2ED573; font-family: var(--font-mono);">18.3g Protein • 296 kcal</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; padding: 8px 12px; background: rgba(255,255,255,0.03); border-radius: var(--radius-sm);">
                <span>🍅 <strong>Ripe Tomatoes (150g)</strong></span>
                <span style="color: #FFB800; font-family: var(--font-mono);">5.8g Carbs • 27 kcal</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; padding: 8px 12px; background: rgba(255,255,255,0.03); border-radius: var(--radius-sm);">
                <span>🧄 <strong>Garlic & Ginger (20g)</strong></span>
                <span style="color: var(--accent-secondary); font-family: var(--font-mono);">Allicin + Gingerol Volatiles</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 6: Personalized Cooking -->
    <section class="drishyam-section" id="personalized-cooking" style="padding-top: 30px;">
      <div class="section-header">
        <span class="section-eyebrow">PERSONALIZED NUTRITION GOALS</span>
        <h2 class="section-title">Food that fits your goals.</h2>
        <p class="section-desc">
          Whether you are cutting fat, gaining lean mass, or optimizing athletic recovery, DRISHYAM personalizes your recipe ranking based on validated metabolic targets.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px;">
        <div class="glass-card" style="padding: 22px;">
          <div style="font-size: 1.7rem; margin-bottom: 10px;">🔥</div>
          <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">Fat Loss / Cutting</h4>
          <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px;">
            Controlled 500 kcal deficit, elevated protein density (2.2g/kg), and high fibre to maintain satiety.
          </p>
          <span class="badge badge-amber">Protein Dense • Deficit</span>
        </div>

        <div class="glass-card" style="padding: 22px;">
          <div style="font-size: 1.7rem; margin-bottom: 10px;">💪</div>
          <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">Lean Bulk</h4>
          <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px;">
            Targeted 250 kcal surplus providing amino acids for muscle synthesis with minimal adipose gain.
          </p>
          <span class="badge badge-gold">Clean Surplus • 2.0g/kg</span>
        </div>

        <div class="glass-card" style="padding: 22px;">
          <div style="font-size: 1.7rem; margin-bottom: 10px;">⚖️</div>
          <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">Body Recomposition</h4>
          <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px;">
            Near-isocaloric intake with elevated protein (2.3g/kg) to stimulate muscle repair during fat oxidation.
          </p>
          <span class="badge badge-green">Isocaloric • Recomp</span>
        </div>

        <div class="glass-card" style="padding: 22px;">
          <div style="font-size: 1.7rem; margin-bottom: 10px;">🥗</div>
          <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">General Health</h4>
          <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px;">
            Focusing on gut microbiome prebiotic diversity, polyphenol-rich spices, and balanced energy balance.
          </p>
          <span class="badge badge-gold">Longevity • Prebiotics</span>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="final-cta-section">
      <div style="max-width: 760px; margin: 0 auto; text-align: center;">
        <span class="section-eyebrow">YOUR KITCHEN, SCIENTIFICALLY DECODED</span>
        <h2 style="font-family: var(--font-serif); font-size: clamp(2.2rem, 4.5vw, 3.6rem); font-weight: 700; margin: 14px 0 18px 0;">
          Make more of what's already in your kitchen.
        </h2>
        <p style="font-size: clamp(1rem, 2vw, 1.15rem); color: var(--text-secondary); line-height: 1.7; margin-bottom: 28px;">
          Your pantry is full of possibilities. Let DRISHYAM discover them.
        </p>

        <button id="cta-launch-btn" class="btn-primary" style="padding: 15px 34px; font-size: 1.05rem;">
          Launch DRISHYAM ➔
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div style="display: flex; align-items: center; gap: 10px;">
        <div class="brand-symbol" style="width: 26px; height: 26px; font-size: 0.85rem;">D</div>
        <span style="font-family: var(--font-serif); font-weight: 700; letter-spacing: 0.15em; color: #FFF;">DRISHYAM</span>
        <span style="font-size: 0.78rem; color: var(--text-muted); margin-left: 10px;">© 2026 DRISHYAM. All rights reserved.</span>
      </div>

      <div style="display: flex; gap: 18px; font-size: 0.85rem; flex-wrap: wrap; justify-content: center;">
        <a href="#hero-section" style="color: var(--text-secondary);">Product</a>
        <a href="#ingredient-intelligence" style="color: var(--text-secondary);">Features</a>
        <a href="#flavour-science" style="color: var(--text-secondary);">FlavorDB</a>
        <a href="#nutrition-intelligence" style="color: var(--text-secondary);">Nutrition</a>
        <a href="https://github.com" target="_blank" style="color: var(--text-secondary);">GitHub</a>
      </div>
    </footer>
  `;const t=r.querySelector("#hero-three-canvas"),n=Gx(t),i=r.querySelector("#hero-cinematic-video"),s=r.querySelector("#hero-section"),a=Cb(i,s),o=r.querySelector("#flavor-network-canvas"),l=r.querySelector("#flavor-info-overlay"),c=Vx(o,l),u=r.querySelector("#nav-mobile-menu-btn"),d=r.querySelector("#mobile-menu-drawer");return u&&d&&(u.onclick=()=>{d.classList.toggle("open"),u.innerText=d.classList.contains("open")?"✕":"☰"},d.querySelectorAll(".mobile-drawer-link").forEach(f=>{f.onclick=()=>{d.classList.remove("open"),u.innerText="☰"}}),r.querySelector("#mobile-launch-btn").onclick=()=>{d.classList.remove("open"),e()}),r.querySelector("#nav-signin-btn").onclick=()=>{Db("login",f=>{e()})},r.querySelector("#nav-launch-btn").onclick=()=>e(),r.querySelector("#hero-start-btn").onclick=()=>e(),r.querySelector("#pantry-launch-btn").onclick=()=>e(),r.querySelector("#cta-launch-btn").onclick=()=>e(),()=>{n!=null&&n.destroy&&n.destroy(),a!=null&&a.destroy&&a.destroy(),c!=null&&c.destroy&&c.destroy()}}function Ib(r=()=>{}){const e=document.getElementById("drishyam-onboarding-modal");e&&e.remove();const t=document.createElement("div");t.id="drishyam-onboarding-modal",t.className="modal-backdrop";let n=1;const i={age:26,height_cm:175,weight_kg:72,target_weight_kg:75,biological_sex:"male",activity_level:"moderate",primary_goal:"lean_bulk",dietary_lifestyle:"vegetarian",allergies:[],cuisine_preferences:["North Indian","South Indian"],taste_preferences:["spicy","savoury"],max_cooking_minutes:45},s=[{id:"fat_loss",title:"Fat Loss / Cutting",desc:"Preserve lean muscle while targeting a 500 kcal deficit and high protein density.",icon:"🔥",highlight:"High Protein • 500 kcal Deficit"},{id:"lean_bulk",title:"Lean Bulk",desc:"Controlled 250 kcal surplus optimizing muscle synthesis with minimal adipose gain.",icon:"💪",highlight:"High Protein • 250 kcal Surplus"},{id:"traditional_bulk",title:"Traditional Bulk",desc:"Robust 500 kcal surplus maximizing glycogen replenishment and strength adaptation.",icon:"⚡",highlight:"Hearty Energy • High Carbs"},{id:"dirty_bulk",title:"Dirty Bulk",desc:"High calorie surplus prioritizing rapid mass gain. Note: Higher fat accumulation expected.",icon:"🍔",highlight:"Max Calories • Fast Mass"},{id:"recomposition",title:"Body Recomposition",desc:"Simultaneous fat oxidation and muscle building via elevated protein near maintenance.",icon:"⚖️",highlight:"High Protein • Isocaloric"},{id:"maintenance",title:"Maintenance",desc:"Exact energy balance supporting metabolic longevity, health and daily vitality.",icon:"🌿",highlight:"Energy Balance • Balanced Macros"},{id:"general_health",title:"General Health & Longevity",desc:"Prioritizing dietary variety, prebiotic fibre, micronutrients and anti-inflammatory spices.",icon:"🥗",highlight:"High Fibre • Micronutrient Rich"},{id:"athletic_performance",title:"Athletic Performance",desc:"Carbohydrate-dense fueling for athletes, rapid glycogen turnover and quick recovery.",icon:"🏆",highlight:"High Glycogen • Rapid Recovery"}],a=[{id:"peanuts",label:"Peanuts"},{id:"tree_nuts",label:"Tree Nuts (Almonds, Cashews)"},{id:"dairy",label:"Dairy / Lactose"},{id:"eggs",label:"Eggs"},{id:"gluten",label:"Gluten / Wheat"},{id:"soy",label:"Soy"},{id:"shellfish",label:"Shellfish"}];function o(){t.innerHTML=`
      <div class="modal-content glass-panel" style="max-width: 680px; padding: 36px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div>
            <span class="badge badge-amber" style="margin-bottom: 6px;">Step ${n} of 4</span>
            <h3 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700;">
              ${n===1?"Your Physical Profile":n===2?"Your Fitness & Nutrition Objective":n===3?"Dietary Lifestyle & Allergies":"Cuisines & Cooking Preferences"}
            </h3>
          </div>
          <button id="onboarding-close-btn" style="color: var(--text-muted); font-size: 1.4rem;">&times;</button>
        </div>

        <div style="margin-bottom: 28px;">
          ${l()}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 20px;">
          ${n>1?`
            <button id="onboarding-back-btn" class="btn-secondary" style="padding: 10px 20px;">Back</button>
          `:"<div></div>"}
          
          <button id="onboarding-next-btn" class="btn-primary" style="padding: 12px 28px;">
            ${n===4?"Complete Onboarding & Launch":"Continue"}
          </button>
        </div>
      </div>
    `,t.querySelector("#onboarding-close-btn").onclick=()=>t.remove();const u=t.querySelector("#onboarding-back-btn");u&&(u.onclick=()=>{n-=1,o()});const d=t.querySelector("#onboarding-next-btn");d.onclick=async()=>{if(c(),n<4)n+=1,o();else{d.innerText="Personalizing DRISHYAM...",d.disabled=!0,await qe.updateProfile({age:i.age,height_cm:i.height_cm,weight_kg:i.weight_kg,target_weight_kg:i.target_weight_kg,biological_sex:i.biological_sex,activity_level:i.activity_level}),await qe.updatePreferences({dietary_lifestyle:i.dietary_lifestyle,allergies:i.allergies,cuisine_preferences:i.cuisine_preferences,taste_preferences:i.taste_preferences,max_cooking_minutes:i.max_cooking_minutes});const f=await qe.calculateGoals({primary_goal:i.primary_goal,weight_kg:i.weight_kg,height_cm:i.height_cm,age:i.age,biological_sex:i.biological_sex,activity_level:i.activity_level});f&&await qe.updateGoals({primary_goal:i.primary_goal,target_calories:f.target_calories,target_protein_g:f.target_protein_g,target_carbs_g:f.target_carbs_g,target_fat_g:f.target_fat_g,target_fibre_g:f.target_fibre_g}),t.remove(),r(i)}}}function l(){if(n===1)return`
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px;">
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Age</label>
            <input type="number" id="ob-age" value="${i.age}" min="14" max="100" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Biological Sex</label>
            <select id="ob-sex" style="width: 100%; padding: 12px; background: #141414; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;">
              <option value="male" ${i.biological_sex==="male"?"selected":""}>Male</option>
              <option value="female" ${i.biological_sex==="female"?"selected":""}>Female</option>
            </select>
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Height (cm)</label>
            <input type="number" id="ob-height" value="${i.height_cm}" min="120" max="230" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Current Weight (kg)</label>
            <input type="number" id="ob-weight" value="${i.weight_kg}" min="35" max="250" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Target Weight (kg)</label>
            <input type="number" id="ob-target-weight" value="${i.target_weight_kg}" min="35" max="250" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Daily Activity Level</label>
            <select id="ob-activity" style="width: 100%; padding: 12px; background: #141414; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;">
              <option value="sedentary" ${i.activity_level==="sedentary"?"selected":""}>Sedentary (Desk Job)</option>
              <option value="light" ${i.activity_level==="light"?"selected":""}>Light (1-2 workouts/week)</option>
              <option value="moderate" ${i.activity_level==="moderate"?"selected":""}>Moderate (3-5 workouts/week)</option>
              <option value="active" ${i.activity_level==="active"?"selected":""}>Active (6-7 workouts/week)</option>
              <option value="very_active" ${i.activity_level==="very_active"?"selected":""}>Athlete / High Activity</option>
            </select>
          </div>
        </div>
      `;if(n===2)return`
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; max-height: 420px; overflow-y: auto; padding-right: 4px;">
          ${s.map(u=>`
            <div class="goal-card glass-card ${i.primary_goal===u.id?"active":""}" data-goal="${u.id}" style="padding: 16px; cursor: pointer; border-width: ${i.primary_goal===u.id?"2px":"1px"}; border-color: ${i.primary_goal===u.id?"var(--accent-primary)":"var(--border-subtle)"}; background: ${i.primary_goal===u.id?"rgba(255,138,50,0.1)":"var(--bg-glass-card)"};">
              <div style="font-size: 1.5rem; margin-bottom: 6px;">${u.icon}</div>
              <h4 style="font-size: 0.98rem; font-weight: 700; color: #FFF; margin-bottom: 4px;">${u.title}</h4>
              <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 8px;">${u.desc}</p>
              <span class="badge badge-gold" style="font-size: 0.68rem;">${u.highlight}</span>
            </div>
          `).join("")}
        </div>
      `;if(n===3)return`
        <div>
          <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">Dietary Lifestyle</label>
          <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 24px;">
            ${["vegetarian","vegan","eggetarian","pescatarian","non-vegetarian","jain","any"].map(u=>`
              <button type="button" class="diet-select-btn badge ${i.dietary_lifestyle===u?"badge-amber":""}" data-diet="${u}" style="padding: 8px 16px; cursor: pointer; text-transform: capitalize; font-size: 0.85rem;">
                ${u.replace("-"," ")}
              </button>
            `).join("")}
          </div>

          <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">
            Food Allergies <span style="color: var(--accent-red); font-size: 0.72rem; font-family: var(--font-mono);">(HARD FILTERED OUT)</span>
          </label>
          <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 12px;">
            Selected allergens will strictly exclude recipes containing them.
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            ${a.map(u=>`
              <label style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); cursor: pointer; font-size: 0.85rem;">
                <input type="checkbox" class="allergy-checkbox" value="${u.id}" ${i.allergies.includes(u.id)?"checked":""} style="accent-color: var(--accent-primary);" />
                ${u.label}
              </label>
            `).join("")}
          </div>
        </div>
      `;if(n===4)return`
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-primary); margin-bottom: 10px;">Favorite Cuisines</label>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${["North Indian","South Indian","Punjabi","Bengali","Asian","Mediterranean","Italian","Mexican"].map(u=>`
                <button type="button" class="cuisine-btn badge ${i.cuisine_preferences.includes(u)?"badge-gold":""}" data-cuisine="${u}" style="padding: 8px 14px; cursor: pointer; font-size: 0.82rem;">
                  ${u}
                </button>
              `).join("")}
            </div>
          </div>

          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-primary); margin-bottom: 10px;">Preferred Cooking Time</label>
            <select id="ob-time" style="width: 100%; padding: 12px; background: #141414; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;">
              <option value="20" ${i.max_cooking_minutes===20?"selected":""}>Quick (under 20 minutes)</option>
              <option value="35" ${i.max_cooking_minutes===35?"selected":""}>Standard (under 35 minutes)</option>
              <option value="50" ${i.max_cooking_minutes===50?"selected":""}>Full Meal (under 50 minutes)</option>
              <option value="90" ${i.max_cooking_minutes===90?"selected":""}>Slow Simmered / Feasts (up to 90 mins)</option>
            </select>
          </div>
        </div>
      `}function c(){if(n===1&&(i.age=parseInt(t.querySelector("#ob-age").value)||26,i.biological_sex=t.querySelector("#ob-sex").value,i.height_cm=parseFloat(t.querySelector("#ob-height").value)||175,i.weight_kg=parseFloat(t.querySelector("#ob-weight").value)||72,i.target_weight_kg=parseFloat(t.querySelector("#ob-target-weight").value)||75,i.activity_level=t.querySelector("#ob-activity").value),n===3){const u=Array.from(t.querySelectorAll(".allergy-checkbox:checked")).map(d=>d.value);i.allergies=u}n===4&&(i.max_cooking_minutes=parseInt(t.querySelector("#ob-time").value)||45)}t.addEventListener("click",u=>{const d=u.target.closest(".goal-card");d&&(i.primary_goal=d.getAttribute("data-goal"),t.querySelectorAll(".goal-card").forEach(_=>{_.style.borderColor="var(--border-subtle)",_.style.background="var(--bg-glass-card)"}),d.style.borderColor="var(--accent-primary)",d.style.background="rgba(255,138,50,0.1)");const f=u.target.closest(".diet-select-btn");f&&(i.dietary_lifestyle=f.getAttribute("data-diet"),t.querySelectorAll(".diet-select-btn").forEach(_=>_.classList.remove("badge-amber")),f.classList.add("badge-amber"));const h=u.target.closest(".cuisine-btn");if(h){const _=h.getAttribute("data-cuisine");i.cuisine_preferences.includes(_)?(i.cuisine_preferences=i.cuisine_preferences.filter(g=>g!==_),h.classList.remove("badge-gold")):(i.cuisine_preferences.push(_),h.classList.add("badge-gold"))}}),o(),document.body.appendChild(t)}var $u={};(function r(e,t,n,i){var s=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),a=typeof Path2D=="function"&&typeof DOMMatrix=="function",o=(function(){if(!e.OffscreenCanvas)return!1;try{var y=new OffscreenCanvas(1,1),P=y.getContext("2d");P.fillRect(0,0,1,1);var re=y.transferToImageBitmap();P.createPattern(re,"no-repeat")}catch{return!1}return!0})();function l(){}function c(y){var P=t.exports.Promise,re=P!==void 0?P:e.Promise;return typeof re=="function"?new re(y):(y(l,l),null)}var u=(function(y,P){return{transform:function(re){if(y)return re;if(P.has(re))return P.get(re);var de=new OffscreenCanvas(re.width,re.height),z=de.getContext("2d");return z.drawImage(re,0,0),P.set(re,de),de},clear:function(){P.clear()}}})(o,new Map),d=(function(){var y=Math.floor(16.666666666666668),P,re,de={},z=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(P=function(J){var ie=Math.random();return de[ie]=requestAnimationFrame(function Y(oe){z===oe||z+y-1<oe?(z=oe,delete de[ie],J()):de[ie]=requestAnimationFrame(Y)}),ie},re=function(J){de[J]&&cancelAnimationFrame(de[J])}):(P=function(J){return setTimeout(J,y)},re=function(J){return clearTimeout(J)}),{frame:P,cancel:re}})(),f=(function(){var y,P,re={};function de(z){function J(ie,Y){z.postMessage({options:ie||{},callback:Y})}z.init=function(Y){var oe=Y.transferControlToOffscreen();z.postMessage({canvas:oe},[oe])},z.fire=function(Y,oe,Se){if(P)return J(Y,null),P;var _e=Math.random().toString(36).slice(2);return P=c(function(Pe){function De(ce){ce.data.callback===_e&&(delete re[_e],z.removeEventListener("message",De),P=null,u.clear(),Se(),Pe())}z.addEventListener("message",De),J(Y,_e),re[_e]=De.bind(null,{data:{callback:_e}})}),P},z.reset=function(){z.postMessage({reset:!0});for(var Y in re)re[Y](),delete re[Y]}}return function(){if(y)return y;if(!n&&s){var z=["var CONFETTI, SIZE = {}, module = {};","("+r.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{y=new Worker(URL.createObjectURL(new Blob([z])))}catch(J){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",J),null}de(y)}return y}})(),h={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function _(y,P){return P?P(y):y}function g(y){return y!=null}function p(y,P,re){return _(y&&g(y[P])?y[P]:h[P],re)}function m(y){return y<0?0:Math.floor(y)}function T(y,P){return Math.floor(Math.random()*(P-y))+y}function E(y){return parseInt(y,16)}function x(y){return y.map(A)}function A(y){var P=String(y).replace(/[^0-9a-f]/gi,"");return P.length<6&&(P=P[0]+P[0]+P[1]+P[1]+P[2]+P[2]),{r:E(P.substring(0,2)),g:E(P.substring(2,4)),b:E(P.substring(4,6))}}function R(y){var P=p(y,"origin",Object);return P.x=p(P,"x",Number),P.y=p(P,"y",Number),P}function w(y){y.width=document.documentElement.clientWidth,y.height=document.documentElement.clientHeight}function I(y){var P=y.getBoundingClientRect();y.width=P.width,y.height=P.height}function b(y){var P=document.createElement("canvas");return P.style.position="fixed",P.style.top="0px",P.style.left="0px",P.style.pointerEvents="none",P.style.zIndex=y,P}function v(y,P,re,de,z,J,ie,Y,oe){y.save(),y.translate(P,re),y.rotate(J),y.scale(de,z),y.arc(0,0,1,ie,Y,oe),y.restore()}function L(y){var P=y.angle*(Math.PI/180),re=y.spread*(Math.PI/180);return{x:y.x,y:y.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:y.startVelocity*.5+Math.random()*y.startVelocity,angle2D:-P+(.5*re-Math.random()*re),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:y.color,shape:y.shape,tick:0,totalTicks:y.ticks,decay:y.decay,drift:y.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:y.gravity*3,ovalScalar:.6,scalar:y.scalar,flat:y.flat}}function N(y,P){P.x+=Math.cos(P.angle2D)*P.velocity+P.drift,P.y+=Math.sin(P.angle2D)*P.velocity+P.gravity,P.velocity*=P.decay,P.flat?(P.wobble=0,P.wobbleX=P.x+10*P.scalar,P.wobbleY=P.y+10*P.scalar,P.tiltSin=0,P.tiltCos=0,P.random=1):(P.wobble+=P.wobbleSpeed,P.wobbleX=P.x+10*P.scalar*Math.cos(P.wobble),P.wobbleY=P.y+10*P.scalar*Math.sin(P.wobble),P.tiltAngle+=.1,P.tiltSin=Math.sin(P.tiltAngle),P.tiltCos=Math.cos(P.tiltAngle),P.random=Math.random()+2);var re=P.tick++/P.totalTicks,de=P.x+P.random*P.tiltCos,z=P.y+P.random*P.tiltSin,J=P.wobbleX+P.random*P.tiltCos,ie=P.wobbleY+P.random*P.tiltSin;if(y.fillStyle="rgba("+P.color.r+", "+P.color.g+", "+P.color.b+", "+(1-re)+")",y.beginPath(),a&&P.shape.type==="path"&&typeof P.shape.path=="string"&&Array.isArray(P.shape.matrix))y.fill(X(P.shape.path,P.shape.matrix,P.x,P.y,Math.abs(J-de)*.1,Math.abs(ie-z)*.1,Math.PI/10*P.wobble));else if(P.shape.type==="bitmap"){var Y=Math.PI/10*P.wobble,oe=Math.abs(J-de)*.1,Se=Math.abs(ie-z)*.1,_e=P.shape.bitmap.width*P.scalar,Pe=P.shape.bitmap.height*P.scalar,De=new DOMMatrix([Math.cos(Y)*oe,Math.sin(Y)*oe,-Math.sin(Y)*Se,Math.cos(Y)*Se,P.x,P.y]);De.multiplySelf(new DOMMatrix(P.shape.matrix));var ce=y.createPattern(u.transform(P.shape.bitmap),"no-repeat");ce.setTransform(De),y.globalAlpha=1-re,y.fillStyle=ce,y.fillRect(P.x-_e/2,P.y-Pe/2,_e,Pe),y.globalAlpha=1}else if(P.shape==="circle")y.ellipse?y.ellipse(P.x,P.y,Math.abs(J-de)*P.ovalScalar,Math.abs(ie-z)*P.ovalScalar,Math.PI/10*P.wobble,0,2*Math.PI):v(y,P.x,P.y,Math.abs(J-de)*P.ovalScalar,Math.abs(ie-z)*P.ovalScalar,Math.PI/10*P.wobble,0,2*Math.PI);else if(P.shape==="star")for(var D=Math.PI/2*3,Ye=4*P.scalar,Ie=8*P.scalar,k=P.x,xe=P.y,$e=5,Ee=Math.PI/$e;$e--;)k=P.x+Math.cos(D)*Ie,xe=P.y+Math.sin(D)*Ie,y.lineTo(k,xe),D+=Ee,k=P.x+Math.cos(D)*Ye,xe=P.y+Math.sin(D)*Ye,y.lineTo(k,xe),D+=Ee;else y.moveTo(Math.floor(P.x),Math.floor(P.y)),y.lineTo(Math.floor(P.wobbleX),Math.floor(z)),y.lineTo(Math.floor(J),Math.floor(ie)),y.lineTo(Math.floor(de),Math.floor(P.wobbleY));return y.closePath(),y.fill(),P.tick<P.totalTicks}function B(y,P,re,de,z){var J=P.slice(),ie=y.getContext("2d"),Y,oe,Se=c(function(_e){function Pe(){Y=oe=null,ie.clearRect(0,0,de.width,de.height),u.clear(),z(),_e()}function De(){n&&!(de.width===i.width&&de.height===i.height)&&(de.width=y.width=i.width,de.height=y.height=i.height),!de.width&&!de.height&&(re(y),de.width=y.width,de.height=y.height),ie.clearRect(0,0,de.width,de.height),J=J.filter(function(ce){return N(ie,ce)}),J.length?Y=d.frame(De):Pe()}Y=d.frame(De),oe=Pe});return{addFettis:function(_e){return J=J.concat(_e),Se},canvas:y,promise:Se,reset:function(){Y&&d.cancel(Y),oe&&oe()}}}function q(y,P){var re=!y,de=!!p(P||{},"resize"),z=!1,J=p(P,"disableForReducedMotion",Boolean),ie=s&&!!p(P||{},"useWorker"),Y=ie?f():null,oe=re?w:I,Se=y&&Y?!!y.__confetti_initialized:!1,_e=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,Pe;function De(D,Ye,Ie){for(var k=p(D,"particleCount",m),xe=p(D,"angle",Number),$e=p(D,"spread",Number),Ee=p(D,"startVelocity",Number),C=p(D,"decay",Number),S=p(D,"gravity",Number),G=p(D,"drift",Number),ne=p(D,"colors",x),ee=p(D,"ticks",Number),Q=p(D,"shapes"),pe=p(D,"scalar"),fe=!!p(D,"flat"),me=R(D),We=k,le=[],ue=y.width*me.x,Ne=y.height*me.y;We--;)le.push(L({x:ue,y:Ne,angle:xe,spread:$e,startVelocity:Ee,color:ne[We%ne.length],shape:Q[T(0,Q.length)],ticks:ee,decay:C,gravity:S,drift:G,scalar:pe,flat:fe}));return Pe?Pe.addFettis(le):(Pe=B(y,le,oe,Ye,Ie),Pe.promise)}function ce(D){var Ye=J||p(D,"disableForReducedMotion",Boolean),Ie=p(D,"zIndex",Number);if(Ye&&_e)return c(function(Ee){Ee()});re&&Pe?y=Pe.canvas:re&&!y&&(y=b(Ie),document.body.appendChild(y)),de&&!Se&&oe(y);var k={width:y.width,height:y.height};Y&&!Se&&Y.init(y),Se=!0,Y&&(y.__confetti_initialized=!0);function xe(){if(Y){var Ee={getBoundingClientRect:function(){if(!re)return y.getBoundingClientRect()}};oe(Ee),Y.postMessage({resize:{width:Ee.width,height:Ee.height}});return}k.width=k.height=null}function $e(){Pe=null,de&&(z=!1,e.removeEventListener("resize",xe)),re&&y&&(document.body.contains(y)&&document.body.removeChild(y),y=null,Se=!1)}return de&&!z&&(z=!0,e.addEventListener("resize",xe,!1)),Y?Y.fire(D,k,$e):De(D,k,$e)}return ce.reset=function(){Y&&Y.reset(),Pe&&Pe.reset()},ce}var K;function $(){return K||(K=q(null,{useWorker:!0,resize:!0})),K}function X(y,P,re,de,z,J,ie){var Y=new Path2D(y),oe=new Path2D;oe.addPath(Y,new DOMMatrix(P));var Se=new Path2D;return Se.addPath(oe,new DOMMatrix([Math.cos(ie)*z,Math.sin(ie)*z,-Math.sin(ie)*J,Math.cos(ie)*J,re,de])),Se}function H(y){if(!a)throw new Error("path confetti are not supported in this browser");var P,re;typeof y=="string"?P=y:(P=y.path,re=y.matrix);var de=new Path2D(P),z=document.createElement("canvas"),J=z.getContext("2d");if(!re){for(var ie=1e3,Y=ie,oe=ie,Se=0,_e=0,Pe,De,ce=0;ce<ie;ce+=2)for(var D=0;D<ie;D+=2)J.isPointInPath(de,ce,D,"nonzero")&&(Y=Math.min(Y,ce),oe=Math.min(oe,D),Se=Math.max(Se,ce),_e=Math.max(_e,D));Pe=Se-Y,De=_e-oe;var Ye=10,Ie=Math.min(Ye/Pe,Ye/De);re=[Ie,0,0,Ie,-Math.round(Pe/2+Y)*Ie,-Math.round(De/2+oe)*Ie]}return{type:"path",path:P,matrix:re}}function ae(y){var P,re=1,de="#000000",z='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof y=="string"?P=y:(P=y.text,re="scalar"in y?y.scalar:re,z="fontFamily"in y?y.fontFamily:z,de="color"in y?y.color:de);var J=10*re,ie=""+J+"px "+z,Y=new OffscreenCanvas(J,J),oe=Y.getContext("2d");oe.font=ie;var Se=oe.measureText(P),_e=Math.ceil(Se.actualBoundingBoxRight+Se.actualBoundingBoxLeft),Pe=Math.ceil(Se.actualBoundingBoxAscent+Se.actualBoundingBoxDescent),De=2,ce=Se.actualBoundingBoxLeft+De,D=Se.actualBoundingBoxAscent+De;_e+=De+De,Pe+=De+De,Y=new OffscreenCanvas(_e,Pe),oe=Y.getContext("2d"),oe.font=ie,oe.fillStyle=de,oe.fillText(P,ce,D);var Ye=1/re;return{type:"bitmap",bitmap:Y.transferToImageBitmap(),matrix:[Ye,0,0,Ye,-_e*Ye/2,-Pe*Ye/2]}}t.exports=function(){return $().apply(this,arguments)},t.exports.reset=function(){$().reset()},t.exports.create=q,t.exports.shapeFromPath=H,t.exports.shapeFromText=ae})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),$u,!1);const Yu=$u.exports;$u.exports.create;async function Ub(r,e){let t=await qe.getMe();if(!t){const o=await qe.demoLogin();t=(o==null?void 0:o.user)||{full_name:"Chef Guest",email:"guest@drishyam.ai"}}let n=window.location.hash.replace("#","")||"dashboard";["dashboard","pantry","recipes","nutrition","goals","planner","saved","shopping","profile"].includes(n)||(n="dashboard"),r.innerHTML=`
    <div class="app-container">
      <!-- Desktop Sidebar -->
      <aside class="app-sidebar">
        <div>
          <div class="sidebar-brand">
            <div class="brand-symbol" style="width: 32px; height: 32px; font-size: 1.05rem;">D</div>
            <div>
              <div style="font-family: var(--font-serif); font-weight: 700; letter-spacing: 0.15em; font-size: 1.15rem; color: #FFF;">DRISHYAM</div>
              <div style="font-size: 0.7rem; color: var(--accent-secondary); font-family: var(--font-mono);">GASTRONOMY OS</div>
            </div>
          </div>

          <nav class="sidebar-nav">
            <div class="sidebar-item ${n==="dashboard"?"active":""}" data-tab="dashboard">
              <span style="font-size: 1.1rem;">📊</span> Dashboard
            </div>
            <div class="sidebar-item ${n==="pantry"?"active":""}" data-tab="pantry">
              <span style="font-size: 1.1rem;">🏺</span> My Pantry
            </div>
            <div class="sidebar-item ${n==="recipes"?"active":""}" data-tab="recipes">
              <span style="font-size: 1.1rem;">🍲</span> Discover Recipes
            </div>
            <div class="sidebar-item ${n==="nutrition"?"active":""}" data-tab="nutrition">
              <span style="font-size: 1.1rem;">📈</span> Nutrition Intelligence
            </div>
            <div class="sidebar-item ${n==="goals"?"active":""}" data-tab="goals">
              <span style="font-size: 1.1rem;">🎯</span> My Goals
            </div>
            <div class="sidebar-item ${n==="planner"?"active":""}" data-tab="planner">
              <span style="font-size: 1.1rem;">📅</span> Meal Planner
            </div>
            <div class="sidebar-item ${n==="saved"?"active":""}" data-tab="saved">
              <span style="font-size: 1.1rem;">⭐</span> Saved Recipes
            </div>
            <div class="sidebar-item ${n==="shopping"?"active":""}" data-tab="shopping">
              <span style="font-size: 1.1rem;">🛒</span> Shopping List
            </div>
            <div class="sidebar-item ${n==="profile"?"active":""}" data-tab="profile">
              <span style="font-size: 1.1rem;">⚙️</span> Profile & Preferences
            </div>
          </nav>
        </div>

        <div class="sidebar-footer">
          <div class="system-status-indicator">
            <span class="status-dot"></span>
            Foodoscope API & FlavorDB Active
          </div>
          <button id="sidebar-home-btn" class="btn-secondary" style="width: 100%; padding: 8px; font-size: 0.8rem;">
            ← Return to Homepage
          </button>
        </div>
      </aside>

      <!-- Main Workspace -->
      <main class="app-main">
        <header class="app-header">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="display: flex; flex-direction: column;">
              <span style="font-size: 0.78rem; color: var(--accent-secondary); font-family: var(--font-mono); text-transform: uppercase;">
                Welcome back
              </span>
              <h2 style="font-family: var(--font-serif); font-size: 1.35rem; font-weight: 700; color: #FFF;" id="header-user-name">
                ${t.full_name||"Chef"}
              </h2>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 12px;">
            <button id="header-onboarding-btn" class="btn-secondary" style="padding: 8px 16px; font-size: 0.82rem; border-color: rgba(232, 181, 106, 0.4); color: var(--accent-secondary);">
              🎯 Customize Goals
            </button>
            <button id="header-logout-btn" class="btn-secondary" style="padding: 8px 14px; font-size: 0.82rem;">
              Logout
            </button>
          </div>
        </header>

        <!-- Dynamic View Workspace -->
        <div class="app-view-content" id="workspace-content">
          <!-- Injected via loadTabContent -->
        </div>
      </main>

      <!-- Mobile Bottom Navigation -->
      <nav class="app-mobile-nav">
        <button class="mobile-nav-btn ${n==="dashboard"?"active":""}" data-tab="dashboard">
          <span style="font-size: 1.2rem;">📊</span>
          <span>Home</span>
        </button>
        <button class="mobile-nav-btn ${n==="pantry"?"active":""}" data-tab="pantry">
          <span style="font-size: 1.2rem;">🏺</span>
          <span>Pantry</span>
        </button>
        <button class="mobile-nav-btn ${n==="recipes"?"active":""}" data-tab="recipes">
          <span style="font-size: 1.2rem;">🍲</span>
          <span>Recipes</span>
        </button>
        <button class="mobile-nav-btn ${n==="nutrition"?"active":""}" data-tab="nutrition">
          <span style="font-size: 1.2rem;">📈</span>
          <span>Nutrition</span>
        </button>
        <button class="mobile-nav-btn ${n==="planner"?"active":""}" data-tab="planner">
          <span style="font-size: 1.2rem;">📅</span>
          <span>Plan</span>
        </button>
      </nav>
    </div>
  `;const i=r.querySelector("#workspace-content");r.querySelectorAll("[data-tab]").forEach(o=>{o.onclick=()=>{const l=o.getAttribute("data-tab");s(l)}}),r.querySelector("#sidebar-home-btn").onclick=e,r.querySelector("#header-logout-btn").onclick=()=>{qe.logout(),e()},r.querySelector("#header-onboarding-btn").onclick=()=>{Ib(()=>{a(n)})};function s(o){n=o,window.location.hash=o,r.querySelectorAll(".sidebar-item").forEach(l=>{l.classList.toggle("active",l.getAttribute("data-tab")===o)}),r.querySelectorAll(".mobile-nav-btn").forEach(l=>{l.classList.toggle("active",l.getAttribute("data-tab")===o)}),a(o)}async function a(o){i.innerHTML=`<div style="text-align: center; padding: 60px; color: var(--text-muted);">Loading ${o}...</div>`,o==="dashboard"?await Fb(i,s):o==="pantry"?await Nb(i,s):o==="recipes"?await Ob(i):o==="nutrition"?await kb(i):o==="goals"?await zb(i):o==="planner"?await Pp(i,s):o==="saved"?await Dp(i):o==="shopping"?await Bb(i):o==="profile"&&await Hb(i)}a(n)}async function Fb(r,e){var c,u,d,f;const[t,n,i,s]=await Promise.all([qe.getGoals(),qe.getNutritionSummary(),qe.getPantry(),qe.recommend({limit:3})]),a=(t==null?void 0:t.target_calories)||2400,o=((c=n==null?void 0:n.consumed)==null?void 0:c.calories)||0,l=Math.min(Math.round(o/a*100),100);r.innerHTML=`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <!-- Top Metric Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
        <!-- Calorie Ring Card -->
        <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Daily Energy Target</span>
            <span class="badge badge-amber" style="font-size: 0.7rem; text-transform: uppercase;">${((u=t==null?void 0:t.primary_goal)==null?void 0:u.replace("_"," "))||"Lean Bulk"}</span>
          </div>

          <div style="display: flex; align-items: baseline; gap: 8px; margin: 16px 0 8px 0;">
            <span style="font-family: var(--font-mono); font-size: 2.2rem; font-weight: 800; color: #FFF;">${o}</span>
            <span style="font-size: 0.9rem; color: var(--text-muted);">/ ${a} kcal</span>
          </div>

          <!-- Progress Bar -->
          <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.06); border-radius: var(--radius-full); overflow: hidden;">
            <div style="width: ${l}%; height: 100%; background: linear-gradient(90deg, #FF8A32, #E8B56A); border-radius: var(--radius-full);"></div>
          </div>
          <span style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 8px;">${a-o} kcal remaining today</span>
        </div>

        <!-- Protein Card -->
        <div class="glass-card" style="padding: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Protein Target</span>
            <span style="font-size: 1.2rem;">🥩</span>
          </div>
          <div style="margin: 16px 0 8px 0;">
            <span style="font-family: var(--font-mono); font-size: 2.2rem; font-weight: 800; color: #2ED573;">${((d=n==null?void 0:n.consumed)==null?void 0:d.protein_g)||0}g</span>
            <span style="font-size: 0.9rem; color: var(--text-muted);">/ ${(t==null?void 0:t.target_protein_g)||150}g</span>
          </div>
          <span style="font-size: 0.78rem; color: var(--text-secondary);">Essential for muscle synthesis and metabolic preservation.</span>
        </div>

        <!-- Pantry Inventory Card -->
        <div class="glass-card" style="padding: 24px; cursor: pointer;" id="dash-pantry-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Pantry Items</span>
            <span style="font-size: 1.2rem;">🏺</span>
          </div>
          <div style="margin: 16px 0 8px 0;">
            <span style="font-family: var(--font-mono); font-size: 2.2rem; font-weight: 800; color: var(--accent-secondary);">${i.length}</span>
            <span style="font-size: 0.9rem; color: var(--text-muted);">ingredients available</span>
          </div>
          <span style="font-size: 0.78rem; color: var(--accent-primary); font-weight: 600;">Manage Pantry ➔</span>
        </div>
      </div>

      <!-- Recommended Recipes Grid -->
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div>
            <h3 style="font-family: var(--font-serif); font-size: 1.4rem; font-weight: 700;">Top Recommended for Your Pantry</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">Ranked with Foodoscope FlavorDB molecular aroma pairing & your fitness goals</p>
          </div>
          <button class="btn-secondary" id="dash-all-recipes-btn" style="padding: 8px 16px; font-size: 0.82rem;">
            Explore All Dishes ➔
          </button>
        </div>

        <div class="recipes-grid">
          ${((f=s==null?void 0:s.recipes)==null?void 0:f.slice(0,3).map(h=>Lp(h)).join(""))||'<div style="color: var(--text-muted);">No matching recipes found yet.</div>'}
        </div>
      </div>
    </div>
  `,r.querySelector("#dash-pantry-card").onclick=()=>e("pantry"),r.querySelector("#dash-all-recipes-btn").onclick=()=>e("recipes"),ju(r)}async function Nb(r,e){let t=await qe.getPantry(),n="All",i="";const s=["All","Spices","Vegetables","Fruits","Grains","Legumes","Dairy","Meat/Seafood","Oils"];function a(){const l=r.querySelector("#pantry-items-list"),c=t.filter(u=>{const d=n==="All"||u.category===n,f=u.name.toLowerCase().includes(i.toLowerCase());return d&&f});l.innerHTML=c.length===0?`
      <div style="text-align: center; padding: 48px; color: var(--text-muted); grid-column: 1 / -1;">
        No ingredients found in this category. Add items above to build your kitchen inventory!
      </div>
    `:c.map(u=>`
      <div class="glass-card" style="padding: 16px; display: flex; justify-content: space-between; align-items: center; opacity: ${u.is_available?1:.5};">
        <div style="display: flex; align-items: center; gap: 14px;">
          <button class="toggle-avail-btn" data-id="${u.id}" style="width: 24px; height: 24px; border-radius: 6px; border: 2px solid ${u.is_available?"#2ED573":"var(--text-muted)"}; background: ${u.is_available?"#2ED57333":"transparent"}; display: flex; align-items: center; justify-content: center; color: #2ED573; font-weight: 700; font-size: 0.8rem;">
            ${u.is_available?"✓":""}
          </button>
          <div>
            <h4 style="font-size: 1.05rem; font-weight: 700; color: #FFF; text-transform: capitalize;">${u.name}</h4>
            <span style="font-size: 0.78rem; color: var(--text-muted);">${u.category} • ${u.quantity} ${u.unit}</span>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 8px;">
          <button class="pantry-del-btn" data-id="${u.id}" style="color: var(--text-muted); font-size: 1.2rem; padding: 4px 8px; border-radius: var(--radius-sm);" title="Delete ingredient">
            ✕
          </button>
        </div>
      </div>
    `).join(""),l.querySelectorAll(".toggle-avail-btn").forEach(u=>{u.onclick=async()=>{const d=parseInt(u.getAttribute("data-id")),f=t.find(h=>h.id===d);f&&(f.is_available=!f.is_available,await qe.updatePantryItem(d,{is_available:f.is_available}),a())}}),l.querySelectorAll(".pantry-del-btn").forEach(u=>{u.onclick=async()=>{const d=parseInt(u.getAttribute("data-id"));await qe.deletePantryItem(d),t=t.filter(f=>f.id!==d),a()}})}r.innerHTML=`
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
        <div>
          <h3 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700;">My Digital Kitchen Pantry</h3>
          <p style="font-size: 0.88rem; color: var(--text-secondary);">Manage every whole spice, powder, fresh aromatic, and staple sitting on your counter.</p>
        </div>

        <button id="pantry-find-recipes-btn" class="btn-primary" style="padding: 12px 24px;">
          🍲 Cook with Current Pantry ➔
        </button>
      </div>

      <!-- Add Ingredient Bar -->
      <div class="glass-panel" style="padding: 18px; margin-bottom: 24px; display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <input type="text" id="add-ing-name" placeholder="Add ingredient (e.g. Garam Masala, Cumin, Spinach)..." style="flex: 2; min-width: 200px; padding: 12px 16px; background: rgba(0,0,0,0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
        
        <select id="add-ing-category" style="flex: 1; min-width: 130px; padding: 12px; background: #141414; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;">
          ${s.filter(l=>l!=="All").map(l=>`<option value="${l}">${l}</option>`).join("")}
        </select>

        <input type="number" id="add-ing-qty" value="100" style="width: 80px; padding: 12px; background: rgba(0,0,0,0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />

        <select id="add-ing-unit" style="width: 80px; padding: 12px; background: #141414; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;">
          <option value="g">g</option>
          <option value="ml">ml</option>
          <option value="tbsp">tbsp</option>
          <option value="tsp">tsp</option>
          <option value="pcs">pcs</option>
        </select>

        <button id="add-ing-submit-btn" class="btn-primary" style="padding: 12px 20px;">
          + Add Item
        </button>
      </div>

      <!-- Filters & Search -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${s.map(l=>`
            <button class="cat-filter-btn badge ${l===n?"badge-amber":""}" data-cat="${l}" style="padding: 6px 14px; cursor: pointer;">
              ${l}
            </button>
          `).join("")}
        </div>

        <input type="text" id="pantry-search-box" placeholder="Search inventory..." style="padding: 8px 14px; background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff; font-size: 0.85rem;" />
      </div>

      <!-- Inventory Grid -->
      <div id="pantry-items-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px;">
        <!-- Rendered by updateList -->
      </div>
    </div>
  `,r.querySelectorAll(".cat-filter-btn").forEach(l=>{l.onclick=()=>{n=l.getAttribute("data-cat"),r.querySelectorAll(".cat-filter-btn").forEach(c=>c.classList.remove("badge-amber")),l.classList.add("badge-amber"),a()}});const o=r.querySelector("#pantry-search-box");o.oninput=l=>{i=l.target.value,a()},r.querySelector("#add-ing-submit-btn").onclick=async()=>{const l=r.querySelector("#add-ing-name"),c=l.value.trim();if(!c)return;const u=r.querySelector("#add-ing-category").value,d=parseFloat(r.querySelector("#add-ing-qty").value)||100,f=r.querySelector("#add-ing-unit").value,h=await qe.addPantryItem({name:c,category:u,quantity:d,unit:f,source:"manual"});h&&(t.unshift(h),l.value="",a(),Yu({particleCount:30,spread:60,origin:{y:.7}}))},r.querySelector("#pantry-find-recipes-btn").onclick=()=>e("recipes"),a()}async function Ob(r){let e="any",t=45;async function n(){r.querySelector("#recipes-results-wrap").innerHTML=`
      <div style="text-align: center; padding: 48px; color: var(--text-muted); grid-column: 1 / -1;">
        Calculating molecular synergy and pantry utilization...
      </div>
    `;const s=await qe.recommend({diet:e,minutes:t}),a=(s==null?void 0:s.recipes)||[],o=s==null?void 0:s.unlock_suggestion,l=r.querySelector("#recipes-results-wrap");l.innerHTML=a.length===0?`
      <div style="text-align: center; padding: 48px; color: var(--text-muted); grid-column: 1 / -1;">
        No recipes match your active dietary filters and cooking time. Try increasing cooking time or choosing 'any' diet.
      </div>
    `:a.map(u=>Lp(u)).join("");const c=r.querySelector("#recipe-unlock-banner");o&&o.ingredient?(c.style.display="flex",c.innerHTML=`
        <div style="font-size: 1.5rem;">💡</div>
        <div>
          <strong style="color: var(--accent-secondary);">The One Ingredient to Unlock More Dishes:</strong>
          <span style="color: var(--text-primary); margin-left: 6px;">${o.impact_description}</span>
        </div>
      `):c.style.display="none",ju(r)}r.innerHTML=`
    <div>
      <div style="margin-bottom: 24px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700;">Discover What You Can Actually Cook</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">
          Ranked using the computational gastronomy formula: 0.30×Core Coverage + 0.20×Pantry Utilisation + 0.20×FlavorDB Coherence + 0.30×Gap Fit.
        </p>
      </div>

      <!-- Unlock Suggestion Banner -->
      <div id="recipe-unlock-banner" class="glass-panel" style="padding: 16px 20px; border-color: rgba(232, 181, 106, 0.4); background: rgba(232, 181, 106, 0.08); display: none; align-items: center; gap: 14px; margin-bottom: 24px; border-radius: var(--radius-md);"></div>

      <!-- Filter Controls -->
      <div class="glass-panel" style="padding: 16px 20px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <span style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted); margin-right: 4px;">Diet:</span>
          ${["any","vegetarian","vegan","non-vegetarian"].map(s=>`
            <button class="diet-tab-btn badge ${s===e?"badge-amber":""}" data-diet="${s}" style="padding: 6px 14px; cursor: pointer; text-transform: capitalize;">
              ${s}
            </button>
          `).join("")}
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted);">Max Time:</span>
          <select id="recipes-time-select" style="padding: 8px 12px; background: #141414; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff; font-size: 0.85rem;">
            <option value="20" ${t===20?"selected":""}>20 mins</option>
            <option value="35" ${t===35?"selected":""}>35 mins</option>
            <option value="45" ${t===45?"selected":""}>45 mins</option>
            <option value="90" ${t===90?"selected":""}>90 mins</option>
          </select>
        </div>
      </div>

      <!-- Recipe Cards Grid -->
      <div class="recipes-grid" id="recipes-results-wrap"></div>
    </div>
  `,r.querySelectorAll(".diet-tab-btn").forEach(s=>{s.onclick=()=>{e=s.getAttribute("data-diet"),r.querySelectorAll(".diet-tab-btn").forEach(a=>a.classList.remove("badge-amber")),s.classList.add("badge-amber"),n()}});const i=r.querySelector("#recipes-time-select");i.onchange=s=>{t=parseInt(s.target.value),n()},n()}async function kb(r){var l,c,u,d,f;const[e,t,n]=await Promise.all([qe.getNutritionSummary(),qe.getGoals(),qe.getNutritionHistory(7)]),i=(t==null?void 0:t.target_calories)||2400,s=((l=e==null?void 0:e.consumed)==null?void 0:l.calories)||0,a=((c=e==null?void 0:e.consumed)==null?void 0:c.protein_g)||0,o=(t==null?void 0:t.target_protein_g)||150;r.innerHTML=`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h3 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700;">Nutritional Intelligence & Meal Analytics</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">Evidence-based metabolic calculations tracking energy balance and macronutrient distribution.</p>
      </div>

      <!-- Big Macro Dashboard -->
      <div class="glass-panel" style="padding: 28px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
          <div>
            <span class="badge badge-amber" style="margin-bottom: 4px;">Today's Energy Balance</span>
            <h4 style="font-size: 1.35rem; font-weight: 700;">Macronutrient Target Progress</h4>
          </div>
          <div style="text-align: right;">
            <span style="font-family: var(--font-mono); font-size: 1.8rem; font-weight: 800; color: #FFF;">${s}</span>
            <span style="font-size: 0.85rem; color: var(--text-muted);">/ ${i} kcal</span>
          </div>
        </div>

        <div class="macro-ring-container">
          <div class="macro-box">
            <span class="macro-label">Protein</span>
            <div class="macro-val" style="color: #2ED573;">${a}g</div>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Goal: ${o}g</span>
          </div>
          <div class="macro-box">
            <span class="macro-label">Carbohydrates</span>
            <div class="macro-val" style="color: #FFB800;">${((u=e==null?void 0:e.consumed)==null?void 0:u.carbs_g)||0}g</div>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Goal: ${(t==null?void 0:t.target_carbs_g)||260}g</span>
          </div>
          <div class="macro-box">
            <span class="macro-label">Fats</span>
            <div class="macro-val" style="color: #FF4757;">${((d=e==null?void 0:e.consumed)==null?void 0:d.fat_g)||0}g</div>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Goal: ${(t==null?void 0:t.target_fat_g)||70}g</span>
          </div>
          <div class="macro-box">
            <span class="macro-label">Dietary Fibre</span>
            <div class="macro-val" style="color: #00D2D3;">32g</div>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Target: ${(t==null?void 0:t.target_fibre_g)||35}g</span>
          </div>
        </div>
      </div>

      <!-- Recent Meals Logged -->
      <div>
        <h4 style="font-family: var(--font-serif); font-size: 1.25rem; font-weight: 700; margin-bottom: 16px;">Meals Logged Today</h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${((f=e==null?void 0:e.recent_meals)==null?void 0:f.length)>0?e.recent_meals.map(h=>`
            <div class="glass-card" style="padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span class="badge badge-gold" style="font-size: 0.68rem; margin-bottom: 4px; text-transform: uppercase;">${h.meal_type}</span>
                <h5 style="font-size: 1.05rem; font-weight: 700;">${h.title}</h5>
                <span style="font-size: 0.78rem; color: var(--text-muted);">${h.servings} serving(s)</span>
              </div>
              <div style="text-align: right;">
                <span style="font-family: var(--font-mono); font-weight: 700; color: #FFF; font-size: 1.1rem;">${h.calories} kcal</span>
                <span style="display: block; font-size: 0.78rem; color: #2ED573;">${h.protein_g}g Protein</span>
              </div>
            </div>
          `).join(""):`
            <div class="glass-panel" style="padding: 24px; text-align: center; color: var(--text-muted);">
              No meals logged today yet. Browse Discover Recipes to cook and log your dishes!
            </div>
          `}
        </div>
      </div>
    </div>
  `}async function zb(r){const[e,t]=await Promise.all([qe.getGoals(),qe.getProfile()]);r.innerHTML=`
    <div style="max-width: 800px;">
      <div style="margin-bottom: 24px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700;">Personalized Fitness Objectives & Targets</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">Configure your daily calorie, protein, carbohydrate, and fat allocations.</p>
      </div>

      <div class="glass-panel" style="padding: 28px; display: flex; flex-direction: column; gap: 20px;">
        <div>
          <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">Primary Fitness Objective</label>
          <select id="goal-primary-select" style="width: 100%; padding: 12px; background: #141414; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;">
            <option value="fat_loss" ${(e==null?void 0:e.primary_goal)==="fat_loss"?"selected":""}>Fat Loss / Cutting (500 kcal deficit, high protein)</option>
            <option value="lean_bulk" ${(e==null?void 0:e.primary_goal)==="lean_bulk"?"selected":""}>Lean Bulk (250 kcal surplus, clean muscle gain)</option>
            <option value="traditional_bulk" ${(e==null?void 0:e.primary_goal)==="traditional_bulk"?"selected":""}>Traditional Bulk (500 kcal surplus, max strength)</option>
            <option value="dirty_bulk" ${(e==null?void 0:e.primary_goal)==="dirty_bulk"?"selected":""}>Dirty Bulk (750 kcal surplus, fast mass)</option>
            <option value="recomposition" ${(e==null?void 0:e.primary_goal)==="recomposition"?"selected":""}>Body Recomposition (Isocaloric, high protein)</option>
            <option value="maintenance" ${(e==null?void 0:e.primary_goal)==="maintenance"?"selected":""}>Maintenance (Energy balance, vitality)</option>
            <option value="general_health" ${(e==null?void 0:e.primary_goal)==="general_health"?"selected":""}>General Health & Longevity</option>
            <option value="athletic_performance" ${(e==null?void 0:e.primary_goal)==="athletic_performance"?"selected":""}>Athletic Performance</option>
          </select>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Daily Calorie Target (kcal)</label>
            <input type="number" id="goal-calories" value="${(e==null?void 0:e.target_calories)||2400}" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>

          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Daily Protein Target (g)</label>
            <input type="number" id="goal-protein" value="${(e==null?void 0:e.target_protein_g)||150}" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>

          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Daily Carbs Target (g)</label>
            <input type="number" id="goal-carbs" value="${(e==null?void 0:e.target_carbs_g)||260}" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>

          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Daily Fat Target (g)</label>
            <input type="number" id="goal-fat" value="${(e==null?void 0:e.target_fat_g)||70}" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>
        </div>

        <div style="display: flex; gap: 14px; margin-top: 10px;">
          <button id="goal-recalc-btn" class="btn-secondary" style="padding: 12px 20px;">
            ⚡ Auto-Calculate from My Physical Stats
          </button>
          <button id="goal-save-btn" class="btn-primary" style="padding: 12px 24px;">
            Save Target Changes
          </button>
        </div>
      </div>
    </div>
  `,r.querySelector("#goal-recalc-btn").onclick=async()=>{const n=r.querySelector("#goal-primary-select").value,i=await qe.calculateGoals({primary_goal:n});i&&(r.querySelector("#goal-calories").value=i.target_calories,r.querySelector("#goal-protein").value=i.target_protein_g,r.querySelector("#goal-carbs").value=i.target_carbs_g,r.querySelector("#goal-fat").value=i.target_fat_g)},r.querySelector("#goal-save-btn").onclick=async()=>{const n=r.querySelector("#goal-save-btn");n.innerText="Saving...",await qe.updateGoals({primary_goal:r.querySelector("#goal-primary-select").value,target_calories:parseFloat(r.querySelector("#goal-calories").value),target_protein_g:parseFloat(r.querySelector("#goal-protein").value),target_carbs_g:parseFloat(r.querySelector("#goal-carbs").value),target_fat_g:parseFloat(r.querySelector("#goal-fat").value),target_fibre_g:35}),n.innerText="Saved Successfully ✓",setTimeout(()=>{n.innerText="Save Target Changes"},2e3)}}async function Pp(r,e){let t=await qe.getMealPlans();const n=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];r.innerHTML=`
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h3 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700;">Weekly Computational Meal Planner</h3>
          <p style="font-size: 0.88rem; color: var(--text-secondary);">Structure your meals across the week to effortlessly meet nutritional targets.</p>
        </div>

        <button class="btn-primary" id="planner-discover-btn" style="padding: 10px 20px;">
          + Find Dishes to Schedule ➔
        </button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
        ${n.map(i=>{const s=t.filter(a=>a.day_of_week===i);return`
            <div class="glass-card" style="padding: 18px; display: flex; flex-direction: column; min-height: 200px;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px; margin-bottom: 12px;">
                <h4 style="font-weight: 700; color: #FFF;">${i}</h4>
                <span class="badge badge-gold" style="font-size: 0.68rem;">${s.length} meal(s)</span>
              </div>

              <div style="display: flex; flex-direction: column; gap: 8px; flex: 1;">
                ${s.length>0?s.map(a=>`
                  <div style="padding: 10px; background: rgba(255,255,255,0.03); border-radius: var(--radius-sm); display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <span style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">${a.meal_type}</span>
                      <h5 style="font-size: 0.88rem; font-weight: 700;">${a.recipe_title}</h5>
                      <span style="font-size: 0.72rem; color: #2ED573;">${a.calories} kcal • ${a.protein}g protein</span>
                    </div>
                    <button class="del-plan-btn" data-id="${a.id}" style="color: var(--text-muted); font-size: 1rem; padding: 2px;">✕</button>
                  </div>
                `).join(""):`
                  <div style="color: var(--text-muted); font-size: 0.8rem; font-style: italic; margin-top: 10px;">
                    No dishes scheduled for ${i}.
                  </div>
                `}
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,r.querySelector("#planner-discover-btn").onclick=()=>e("recipes"),r.querySelectorAll(".del-plan-btn").forEach(i=>{i.onclick=async()=>{const s=parseInt(i.getAttribute("data-id"));await qe.deleteMealPlan(s),Pp(r,e)}})}async function Dp(r){const e=await qe.getSavedRecipes();r.innerHTML=`
    <div>
      <div style="margin-bottom: 24px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700;">Saved Culinary Recipes</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">Your personal collection of saved dishes and nutritional bookmarks.</p>
      </div>

      <div class="recipes-grid">
        ${e.length>0?e.map(t=>`
          <div class="recipe-app-card">
            <div class="recipe-card-img-wrap">
              <img src="${t.image_url||"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800"}" alt="${t.title}" />
              <button class="unsave-recipe-btn" data-id="${t.recipe_id}" style="position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.8); border: 1px solid var(--accent-red); color: var(--accent-red); padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem;">
                Remove
              </button>
            </div>
            <div class="recipe-card-body">
              <span class="badge badge-gold" style="font-size: 0.68rem;">${t.cuisine||"Authentic"}</span>
              <h4 style="font-size: 1.15rem; font-weight: 700;">${t.title}</h4>
              <button class="open-recipe-modal-btn btn-secondary" data-id="${t.recipe_id}" style="padding: 8px 14px; font-size: 0.85rem; margin-top: auto;">
                View Cooking Steps ➔
              </button>
            </div>
          </div>
        `).join(""):`
          <div style="padding: 48px; text-align: center; color: var(--text-muted); grid-column: 1 / -1;">
            You have not saved any recipes yet. Bookmark dishes from the Discover Recipes section!
          </div>
        `}
      </div>
    </div>
  `,r.querySelectorAll(".unsave-recipe-btn").forEach(t=>{t.onclick=async()=>{const n=t.getAttribute("data-id");await qe.unsaveRecipe(n),Dp(r)}}),ju(r)}async function Bb(r){let[e,t]=await Promise.all([qe.getShoppingItems(),qe.getShoppingSuggestions()]);function n(){const i=r.querySelector("#shopping-items-list");i.innerHTML=e.length===0?`
      <div style="padding: 32px; text-align: center; color: var(--text-muted);">
        Your grocery list is empty! Check the suggestions below or add items manually.
      </div>
    `:e.map(s=>`
      <div class="glass-card" style="padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; opacity: ${s.is_purchased?.45:1};">
        <label style="display: flex; align-items: center; gap: 12px; cursor: pointer; text-decoration: ${s.is_purchased?"line-through":"none"};">
          <input type="checkbox" class="toggle-shop-btn" data-id="${s.id}" ${s.is_purchased?"checked":""} style="width: 18px; height: 18px; accent-color: var(--accent-primary);" />
          <span style="font-size: 0.95rem; font-weight: 600;">${s.ingredient_name}</span>
          <span style="font-size: 0.78rem; color: var(--text-muted);">(${s.quantity} ${s.unit})</span>
        </label>
        <button class="del-shop-btn" data-id="${s.id}" style="color: var(--text-muted); padding: 4px;">✕</button>
      </div>
    `).join(""),i.querySelectorAll(".toggle-shop-btn").forEach(s=>{s.onchange=async()=>{const a=parseInt(s.getAttribute("data-id"));await qe.toggleShoppingItem(a);const o=e.find(l=>l.id===a);o&&(o.is_purchased=!o.is_purchased),n()}}),i.querySelectorAll(".del-shop-btn").forEach(s=>{s.onclick=async()=>{const a=parseInt(s.getAttribute("data-id"));await qe.deleteShoppingItem(a),e=e.filter(o=>o.id!==a),n()}})}r.innerHTML=`
    <div>
      <div style="margin-bottom: 24px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700;">Smart Kitchen Shopping List</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">Automatically aggregated ingredients needed to unlock recipes and replenish your pantry.</p>
      </div>

      <!-- Add item input -->
      <div class="glass-panel" style="padding: 16px; margin-bottom: 24px; display: flex; gap: 10px;">
        <input type="text" id="add-shop-name" placeholder="Add grocery item (e.g. Greek Yogurt, Fresh Cilantro)..." style="flex: 1; padding: 10px 14px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
        <button id="add-shop-btn" class="btn-primary" style="padding: 10px 20px;">+ Add Item</button>
      </div>

      <div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 24px;">
        <div>
          <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 12px;">Active Groceries</h4>
          <div id="shopping-items-list" style="display: flex; flex-direction: column; gap: 8px;"></div>
        </div>

        <div>
          <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 12px;">Suggested to Unlock Recipes</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${t.map(i=>`
              <div class="glass-card" style="padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h5 style="font-size: 0.9rem; font-weight: 700;">${i.ingredient_name}</h5>
                  <span style="font-size: 0.75rem; color: var(--accent-secondary);">${i.suggested_for_recipe}</span>
                </div>
                <button class="add-suggestion-btn btn-secondary" data-name="${i.ingredient_name}" style="padding: 6px 12px; font-size: 0.78rem;">
                  + Add
                </button>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `,n(),r.querySelector("#add-shop-btn").onclick=async()=>{const i=r.querySelector("#add-shop-name"),s=i.value.trim();if(!s)return;const a=await qe.addShoppingItem({ingredient_name:s});a&&(e.unshift(a),i.value="",n())},r.querySelectorAll(".add-suggestion-btn").forEach(i=>{i.onclick=async()=>{const s=i.getAttribute("data-name"),a=await qe.addShoppingItem({ingredient_name:s});a&&(e.unshift(a),i.innerText="Added ✓",i.disabled=!0,n())}})}async function Hb(r){const[e,t]=await Promise.all([qe.getProfile(),qe.getPreferences()]);r.innerHTML=`
    <div style="max-width: 760px;">
      <div style="margin-bottom: 24px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700;">Chef Profile & Dietary Exclusions</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">Manage physical stats, allergens, and dietary lifestyles.</p>
      </div>

      <div class="glass-panel" style="padding: 28px; display: flex; flex-direction: column; gap: 20px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Age</label>
            <input type="number" id="prof-age" value="${(e==null?void 0:e.age)||26}" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Weight (kg)</label>
            <input type="number" id="prof-weight" value="${(e==null?void 0:e.weight_kg)||72}" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Height (cm)</label>
            <input type="number" id="prof-height" value="${(e==null?void 0:e.height_cm)||175}" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Dietary Lifestyle</label>
            <select id="prof-diet" style="width: 100%; padding: 10px; background: #141414; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;">
              <option value="vegetarian" ${(t==null?void 0:t.dietary_lifestyle)==="vegetarian"?"selected":""}>Vegetarian</option>
              <option value="vegan" ${(t==null?void 0:t.dietary_lifestyle)==="vegan"?"selected":""}>Vegan</option>
              <option value="eggetarian" ${(t==null?void 0:t.dietary_lifestyle)==="eggetarian"?"selected":""}>Eggetarian</option>
              <option value="pescatarian" ${(t==null?void 0:t.dietary_lifestyle)==="pescatarian"?"selected":""}>Pescatarian</option>
              <option value="non-vegetarian" ${(t==null?void 0:t.dietary_lifestyle)==="non-vegetarian"?"selected":""}>Non-Vegetarian</option>
              <option value="jain" ${(t==null?void 0:t.dietary_lifestyle)==="jain"?"selected":""}>Jain</option>
              <option value="any" ${(t==null?void 0:t.dietary_lifestyle)==="any"?"selected":""}>Any</option>
            </select>
          </div>
        </div>

        <div>
          <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">
            Excluded Allergens (Separated by commas)
          </label>
          <input type="text" id="prof-allergies" value="${((t==null?void 0:t.allergies)||[]).join(", ")}" placeholder="e.g. peanuts, dairy, gluten" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
        </div>

        <button id="prof-save-btn" class="btn-primary" style="padding: 12px 24px; align-self: flex-start;">
          Save Profile & Restrictions
        </button>
      </div>
    </div>
  `,r.querySelector("#prof-save-btn").onclick=async()=>{const n=r.querySelector("#prof-save-btn");n.innerText="Saving...",await qe.updateProfile({age:parseInt(r.querySelector("#prof-age").value),weight_kg:parseFloat(r.querySelector("#prof-weight").value),height_cm:parseFloat(r.querySelector("#prof-height").value)});const s=r.querySelector("#prof-allergies").value.split(",").map(a=>a.trim().toLowerCase()).filter(Boolean);await qe.updatePreferences({dietary_lifestyle:r.querySelector("#prof-diet").value,allergies:s}),n.innerText="Changes Saved ✓",setTimeout(()=>{n.innerText="Save Profile & Restrictions"},2e3)}}function Lp(r){const e=r.match_percentage||Math.round((r.coverage||.7)*100),t=r.final_personalized_score?Math.round(r.final_personalized_score*100):r.score||85;return`
    <div class="recipe-app-card">
      <div class="recipe-card-img-wrap">
        <img src="${r.image_url||"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800"}" alt="${r.title}" />
        <div class="recipe-match-badge">${e}% Match</div>
      </div>

      <div class="recipe-card-body">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="badge badge-gold" style="font-size: 0.68rem;">${r.cuisine||"Authentic"}</span>
          <span style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: var(--accent-primary);">
            Score: ${t}/100
          </span>
        </div>

        <h4 style="font-size: 1.15rem; font-weight: 700; line-height: 1.3;">${r.title}</h4>

        <div class="recipe-meta-row">
          <span>⏱️ ${r.cook_time_minutes||r.minutes||25} min</span>
          <span>🔥 ${r.calories_per_serving||280} kcal</span>
          <span style="color: #2ED573;">🥩 ${r.protein_grams||14}g protein</span>
        </div>

        <!-- Available vs Missing -->
        <div style="font-size: 0.78rem; margin: 4px 0;">
          <div style="color: #2ED573; margin-bottom: 2px;">
            ✓ In Pantry: ${r.ingredients_available?r.ingredients_available.slice(0,3).join(", "):"Cumin, Turmeric, Onion"}
          </div>
          ${r.ingredients_missing&&r.ingredients_missing.length>0?`
            <div style="color: var(--accent-secondary);">
              + Need: ${r.ingredients_missing.slice(0,2).join(", ")}
            </div>
          `:""}
        </div>

        <!-- Why Drishyam Recommended -->
        ${r.why_drishyam_recommended?`
          <div style="font-size: 0.75rem; color: var(--text-muted); background: rgba(255,255,255,0.02); padding: 8px; border-radius: var(--radius-sm); line-height: 1.4;">
            💡 ${r.why_drishyam_recommended}
          </div>
        `:""}

        <!-- One Ingredient to Buy Unlock Pill -->
        ${r.one_ingredient_to_buy||r.unlock&&r.unlock.ingredient?`
          <div class="unlock-box">
            <span>✨</span>
            <span>Add <strong>${r.one_ingredient_to_buy||r.unlock.ingredient}</strong> to unlock full flavor</span>
          </div>
        `:""}

        <div style="display: flex; gap: 8px; margin-top: auto; padding-top: 10px;">
          <button class="open-recipe-modal-btn btn-primary" data-id="${r.recipe_id||r.id}" style="flex: 1; padding: 10px; font-size: 0.85rem;">
            View Recipe ➔
          </button>
          <button class="save-card-btn btn-icon" data-id="${r.recipe_id||r.id}" title="Save to bookmarks">
            ⭐
          </button>
        </div>
      </div>
    </div>
  `}function ju(r){r.querySelectorAll(".open-recipe-modal-btn").forEach(e=>{e.onclick=()=>{const t=e.getAttribute("data-id");Gb(t)}}),r.querySelectorAll(".save-card-btn").forEach(e=>{e.onclick=async()=>{const t=e.getAttribute("data-id");await qe.saveRecipe(t),e.style.color="#FFB800",Yu({particleCount:20,spread:50,origin:{y:.8}})}})}async function Gb(r){var l;const e=document.getElementById("drishyam-recipe-modal");e&&e.remove();const t=document.createElement("div");t.id="drishyam-recipe-modal",t.className="modal-backdrop",t.innerHTML=`
    <div class="modal-content glass-panel" style="max-width: 720px; padding: 32px;">
      <div style="text-align: center; padding: 40px; color: var(--text-muted);">
        Loading recipe instructions and molecular pairings...
      </div>
    </div>
  `,document.body.appendChild(t);const[n,i]=await Promise.all([qe.getRecipe(r),qe.getInstructions(r)]),s=n||{title:"Homestyle Dal Tadka",prep_time_minutes:10,cook_time_minutes:20,servings:4,nutrition_per_serving:{calories:215,protein:11.8,carbs:33.4,fat:4.6},ingredients:[{name:"lentils",quantity:200,unit:"g"},{name:"turmeric",quantity:5,unit:"g"},{name:"cumin",quantity:5,unit:"g"},{name:"garlic",quantity:20,unit:"g"}],molecular_profile:{notes:"Tempering synergy balancing cumin terpenes with allium sulfur."}},a=(i==null?void 0:i.steps)||(i==null?void 0:i.instructions)||s.instructions||["Rinse ingredients thoroughly.","Heat oil in a pan, crackle whole spices until aromatic.","Add aromatics and cook until tender.","Simmer and garnish with fresh herbs before serving."],o=s.nutrition_per_serving||{calories:280,protein:14,carbs:30,fat:10};t.innerHTML=`
    <div class="modal-content glass-panel" style="max-width: 760px; padding: 32px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
        <div>
          <span class="badge badge-amber" style="margin-bottom: 6px;">Verified RecipeDB Preparation</span>
          <h2 style="font-family: var(--font-serif); font-size: 1.8rem; font-weight: 700; color: #FFF;">${s.title}</h2>
          <div style="display: flex; gap: 14px; color: var(--text-muted); font-size: 0.85rem; margin-top: 6px;">
            <span>⏱️ Prep: ${s.prep_time_minutes||10}m</span>
            <span>🍳 Cook: ${s.cook_time_minutes||20}m</span>
            <span>🍽️ ${s.servings||2} Servings</span>
            <span>🔥 ${o.calories} kcal/serving</span>
          </div>
        </div>
        <button id="modal-close-btn" style="color: var(--text-muted); font-size: 1.6rem; line-height: 1;">&times;</button>
      </div>

      <!-- Molecular Flavor Synergy -->
      <div class="glass-card" style="padding: 16px; margin-bottom: 24px; border-color: rgba(255, 138, 50, 0.3);">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="font-size: 1.1rem;">🧪</span>
          <strong style="color: var(--accent-primary); font-size: 0.9rem;">FlavorDB Volatile Aroma Synergy</strong>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
          ${((l=s.molecular_profile)==null?void 0:l.notes)||"Ingredients share volatile terpenes and allium aroma compounds that enhance culinary depth."}
        </p>
      </div>

      <!-- Ingredients Checklist -->
      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 12px;">
          Ingredients Needed
        </h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          ${(s.ingredients||[]).map(c=>{const u=typeof c=="object"?c.name:c,d=typeof c=="object"?`${c.quantity} ${c.unit}`:"";return`
              <div style="padding: 8px 12px; background: rgba(255,255,255,0.03); border-radius: var(--radius-sm); font-size: 0.85rem; display: flex; justify-content: space-between;">
                <span>• <strong>${u}</strong></span>
                <span style="color: var(--text-muted); font-family: var(--font-mono);">${d}</span>
              </div>
            `}).join("")}
        </div>
      </div>

      <!-- Step-by-Step Instructions -->
      <div style="margin-bottom: 28px;">
        <h4 style="font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 14px;">
          Step-by-Step Cooking Instructions
        </h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${a.map((c,u)=>`
            <div style="display: flex; gap: 14px; font-size: 0.9rem; line-height: 1.6;">
              <span style="font-family: var(--font-mono); font-weight: 800; color: var(--accent-primary); width: 24px; flex-shrink: 0;">${u+1}.</span>
              <span style="color: var(--text-secondary);">${c}</span>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 20px;">
        <button id="modal-save-btn" class="btn-secondary" style="padding: 10px 20px;">
          ⭐ Save to Favorites
        </button>
        <button id="modal-log-meal-btn" class="btn-primary" style="padding: 10px 24px;">
          ✓ Log This Meal as Consumed
        </button>
      </div>
    </div>
  `,t.querySelector("#modal-close-btn").onclick=()=>t.remove(),t.querySelector("#modal-save-btn").onclick=async()=>{await qe.saveRecipe(r),t.querySelector("#modal-save-btn").innerText="Saved ✓"},t.querySelector("#modal-log-meal-btn").onclick=async()=>{const c=t.querySelector("#modal-log-meal-btn");c.innerText="Logging...",await qe.logMeal({recipe_id:r,recipe_title:s.title,meal_type:"lunch",servings:1,calories:o.calories||300,protein:o.protein||15,carbs:o.carbs||30,fat:o.fat||10}),c.innerText="Meal Logged Successfully ✓",Yu({particleCount:40,spread:70,origin:{y:.6}}),setTimeout(()=>t.remove(),1200)}}class Vb{constructor(e){this.app=e,this.currentCleanup=null,window.addEventListener("popstate",()=>this.handleRoute())}navigate(e){window.history.pushState({},"",e),this.handleRoute()}handleRoute(){if(this.currentCleanup&&typeof this.currentCleanup=="function"){try{this.currentCleanup()}catch{}this.currentCleanup=null}window.location.pathname.startsWith("/app")?Ub(this.app,()=>this.navigate("/")):this.currentCleanup=Lb(this.app,()=>this.navigate("/app"))}}let Ql=null;function Wb(r){return Ql=new Vb(r),Ql.handleRoute(),Ql}document.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("app");r&&Wb(r)});
