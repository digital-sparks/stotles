(()=>{window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{let w=document.title,q=document.querySelector('meta[name="description"]')?.getAttribute("content")||"",u=document.URL;document.querySelector('[data-share="twitter"]').setAttribute("href",`https://twitter.com/intent/tweet?text=${encodeURIComponent(w)}: ${encodeURIComponent(u)}`),document.querySelector('[data-share="email"]').setAttribute("href",`mailto:?subject=${encodeURIComponent(w)}&body=${encodeURIComponent(u)}`),document.querySelector('[data-share="linkedin"]').setAttribute("href",`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}`),document.querySelector('[data-share="url"]').addEventListener("click",function(n){n.preventDefault();let e=document.createElement("input");document.body.appendChild(e),e.value=document.URL,e.select(),document.execCommand("copy"),document.body.removeChild(e)});let S={};["Quad","Cubic","Quart","Quint","Expo"].forEach((n,e)=>{S[n]=function(r){return Math.pow(r,e+2)}});let _=function(e){let r=window.location.search.substring(1),t=r.split("&"),a,i;for(i=0;i<t.length;i++)if(a=t[i].split("="),a[0]===e)return typeof a[1]===void 0?!0:decodeURIComponent(a[1]);return""},h=!1,y=document.querySelector("#gated-form"),d=y.closest(".sign-up_component");window.localStorage.getItem("seenPopup")==="true"||_("popup")==="false"?d.style.display="none":(h=!0,d.style.display="block"),y.addEventListener("submit",function(n){n.preventDefault();let e=this,r=e.getAttribute("action"),t={};new FormData(e).forEach(function(f,g){t[g]=f}),t.campaign_description=document.title;let i=Cookies.get("stotles_utm"),o=i?JSON.parse(i):void 0;if(o){let f=o.url?`<${o.url}|Link>`:"Unknown";t.referrer=o.referrer?o.referrer:"Unknown",t.first_stotles_page=f,t.utm_params=o.utmParams?Object.entries(o.utmParams).map(([g,E])=>`${g}: ${E}`).join(", "):"Unknown",t.utm_source=o.utmParams?o.utmParams.source:void 0,t.utm_medium=o.utmParams?o.utmParams.medium:void 0,t.utm_campaign=o.utmParams?o.utmParams.campaign:void 0,t.utm_content=o.utmParams?o.utmParams.content:void 0,t.utm_term=o.utmParams?o.utmParams.term:void 0}var c=new XMLHttpRequest;c.open("POST",r,!0),c.setRequestHeader("Content-Type","application/json"),c.setRequestHeader("Accept","application/json"),c.onload=function(){c.status===200&&(d.style.display="none",window.localStorage.setItem("seenPopup","true"),document.querySelector(".rich-text-wrap").style.maxHeight="none",window.lintrk("track",{conversion_id:15511809}),window.dataLayer.push({event:"download_report",report_event_label:t.campaign_description}))},c.onerror=function(){console.log("Error:",c.statusText)},c.send(JSON.stringify(t))});let s=document.querySelector(".section_report-content"),l=document.querySelector(".sign-up_component"),x=document.querySelector(".reports_index-wrap"),m=s.querySelector(".rich-text-wrap"),p=P(m);for(let n=0;n<p.length;n++)if(p[n].nodeValue.includes("[GATE]")){console.log('Word "[GATE]" found!');let e=document.createElement("span");if(e.textContent="",C(p[n],"[GATE] ",e),h){b(e);let r;window.addEventListener("resize",()=>{clearTimeout(r),r=setTimeout(function(){b(e)},50)})}break}function b(n){let e=l.clientHeight,r=x.clientHeight,t=parseInt(window.getComputedStyle(s.querySelector(".padding-global")).getPropertyValue("padding-top"))+parseInt(window.getComputedStyle(s.querySelector(".padding-global")).getPropertyValue("padding-bottom")),a=document.createRange();a.selectNode(n);let o=a.getBoundingClientRect().top-s.getBoundingClientRect().top+32;($(window).innerWidth()||document.documentElement.clientWidth)>991?m.style.maxHeight=o+e-t/2+"px":m.style.maxHeight=o+e-r-t+"px",l.style.position="absolute",l.style.top=o+"px"}function P(n){var e=[];if(n.nodeType==Node.TEXT_NODE)e.push(n);else for(var r=n.childNodes,t=0;t<r.length;t++)e=e.concat(P(r[t]));return e}function C(n,e,r){let t=n.parentNode,a=n.nodeValue,i=a.indexOf(e);if(i===-1)return;let o=document.createTextNode(a.slice(0,i)),c=document.createTextNode(a.slice(i+e.length));t.insertBefore(o,n),t.insertBefore(r,n),t.insertBefore(c,n),t.removeChild(n)}});})();
