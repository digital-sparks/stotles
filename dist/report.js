(()=>{window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{document.querySelectorAll('.image_component .image_link:not([href="#"])').forEach(e=>{if(e.style.pointerEvents="auto",e.target!=="_blank"){let t=e.href,n=C(t);e.href="#";let o=document.createElement("div");o.classList.add("fs_modal_video-embed"),o.style.height="100%",o.style.width="100%",o.style.position="absolute",o.innerHTML=`<iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/${n}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,e.addEventListener("click",r=>{document.querySelector(".fs_modal_video").appendChild(o)})}else e.removeAttribute("aria-roledescription"),e.removeAttribute("aria-haspopup"),e.removeAttribute("aria-controls"),e.removeAttribute("fs-modal-element")}),document.querySelectorAll('[fs-modal-element="close-1"]').forEach(e=>{e.addEventListener("click",()=>{document.querySelector('[fs-modal-element="modal-1"] .fs_modal_video .fs_modal_video-embed').remove()})});function C(e){var t=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,n=e.match(t);return n&&n[2].length==11?n[2]:"Unable to extract YouTube ID"}let f=document.title,c=new URL(document.URL).origin+new URL(document.URL).pathname;document.querySelector('[data-name="twitter"]').setAttribute("href",`https://twitter.com/intent/tweet?text=${encodeURIComponent(f)}: ${encodeURIComponent(c)}`),document.querySelector('[data-name="email"]').setAttribute("href",`mailto:?subject=${encodeURIComponent(f)}&body=${encodeURIComponent(c)}`),document.querySelector('[data-name="linkedin"]').setAttribute("href",`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(c)}`),document.querySelector('[data-name="url"]').addEventListener("click",function(e){e.preventDefault();let t=document.createElement("input");document.body.appendChild(t),t.value=c,t.select(),document.execCommand("copy"),document.body.removeChild(t)});function v(e){let t=e.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)}function x(e,t,n,o,r){let i=null,a=0;function l(b){i||(i=b);let E=b-i;a=t*E/o,a>t&&(a=t),e.textContent=n[0]+(Math.round((a+Number.EPSILON)*1*r)/(1*r)).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,")+n[1],E<o?window.requestAnimationFrame(l):e.textContent=n[0]+(Math.round((a+Number.EPSILON)*1*r)/(1*r)).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,")+n[1]}window.requestAnimationFrame(l)}let S={};["Quad","Cubic","Quart","Quint","Expo"].forEach((e,t)=>{S[e]=function(n){return Math.pow(n,t+2)}});let q=1500;document.querySelectorAll(".stat_heading").forEach(function(e,t){let n=parseFloat(e.textContent.match(/[0-9.,]+/)[0]),o=e.textContent.split(/[0-9.,]+/),r=!1,i=10;n%1==0&&(i=1),e.textContent="0";let a=()=>{v(e)&&!r&&(x(e,n,o,q,i),r=!0)};window.addEventListener("load",a),window.addEventListener("resize",a),window.addEventListener("scroll",a)});let R=function(t){let n=window.location.search.substring(1),o=n.split("&"),r,i;for(i=0;i<o.length;i++)if(r=o[i].split("="),r[0]===t)return typeof r[1]===void 0?!0:decodeURIComponent(r[1]);return""},h=!1,u=document.querySelector("#gated-form").closest(".sign-up_component"),U=new URL(document.URL).pathname+"-popup";window.localStorage.getItem(U)==="true"||R("popup")==="false"?u.style.display="none":(h=!0,u.style.display="block");let d=document.querySelector(".section_report-content"),s=document.querySelector(".sign-up_component"),I=document.querySelector(".reports_index-wrap"),m=d.querySelector(".rich-text-wrap"),p=y(m),g=!1;for(let e=0;e<p.length;e++)if(p[e].nodeValue.includes("[GATE]")){g=!0;let t=document.createElement("span");if(t.textContent="",_(p[e],"[GATE] ",t),h){w(t);let n;window.addEventListener("resize",()=>{clearTimeout(n),n=setTimeout(function(){w(t)},50)})}break}g||(u.style.display="none");function w(e){let t=s.clientHeight,n=I.clientHeight,o=parseInt(window.getComputedStyle(d.querySelector(".padding-global")).getPropertyValue("padding-top"))+parseInt(window.getComputedStyle(d.querySelector(".padding-global")).getPropertyValue("padding-bottom")),r=document.createRange();r.selectNode(e);let a=r.getBoundingClientRect().top-d.getBoundingClientRect().top+32;($(window).innerWidth()||document.documentElement.clientWidth)>991?m.style.maxHeight=a+t-o/2+"px":m.style.maxHeight=a+t-n-o+"px",s.style.position="absolute",s.style.top=a+"px"}function y(e){var t=[];if(e.nodeType==Node.TEXT_NODE)t.push(e);else for(var n=e.childNodes,o=0;o<n.length;o++)t=t.concat(y(n[o]));return t}function _(e,t,n){let o=e.parentNode,r=e.nodeValue,i=r.indexOf(t);if(i===-1)return;let a=document.createTextNode(r.slice(0,i)),l=document.createTextNode(r.slice(i+t.length));o.insertBefore(a,e),o.insertBefore(n,e),o.insertBefore(l,e),o.removeChild(e)}});})();
