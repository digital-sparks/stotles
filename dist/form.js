(()=>{window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{let m="lead_id",u=localStorage.getItem(m);u||(u=c(),localStorage.setItem(m,u));function c(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(r){let i=Math.random()*16|0;return(r==="x"?i:i&3|8).toString(16)})}window.dataLayer=window.dataLayer||[];function o(){let r=new URL(window.location.href);return`${r.origin}${r.pathname}${r.hash}`}function f(r,i,n){window.dataLayer.push({event:`${r}_start`,form_name:i,form_id:n,form_url:o()})}function p(r,i,n,s){window.dataLayer.push({event:`${r}_interaction`,form_name:i,form_id:n,form_url:o(),field_name:s})}$.validator.addMethod("regex",function(r,i,n){return n&&n.constructor!=RegExp?n=new RegExp(n):n.global&&(n.lastIndex=0),this.optional(i)||n.test(r)}),$.validator.setDefaults({ignore:[]}),document.querySelectorAll("form").forEach((r,i)=>{let n=r.getAttribute("id"),s=r.getAttribute("data-name"),d=r.getAttribute("data-track-name"),l=!1;r.addEventListener("input",()=>{l||(l=!0,f(d,s,n))},{once:!0}),r.querySelectorAll("input, select, textarea").forEach(e=>{e.addEventListener("input",()=>{p(d,s,n,e.name)},{once:!0})}),$(r).validate({submitHandler:function(e){let a=Cookies.get("stotles_utm"),t=a?JSON.parse(a):void 0;if(t){let x=t.url?`<${t.url}|Link>`:"Unknown";e.querySelector("input[name=referrer]").value=t.referrer?t.referrer:"Unknown",e.querySelector("input[name=first_stotles_page]").value=x,e.querySelector("input[name=utm_params]").value=t.utmParams?Object.entries(t.utmParams).map(([y,w])=>`${y}: ${w}`).join(", "):"Unknown",e.querySelector("input[name=utm_source]").value=t.utmParams?t.utmParams.source:void 0,e.querySelector("input[name=utm_medium]").value=t.utmParams?t.utmParams.medium:void 0,e.querySelector("input[name=utm_campaign]").value=t.utmParams?t.utmParams.campaign:void 0,e.querySelector("input[name=utm_content]").value=t.utmParams?t.utmParams.content:void 0,e.querySelector("input[name=utm_term]").value=t.utmParams?t.utmParams.term:"undefined"}return window.dataLayer.push({event:`${d}_submitted`,form_name:s,form_id:n,form_url:o(),lead_id:u}),!0},errorClass:"is-error",validClass:"is-success",errorPlacement:function(e,a){a.attr("type")=="checkbox"||a.attr("type")=="radio"?e.appendTo(a.closest(".form_field-wrapper")):a[0].nodeName==="SELECT"?e.appendTo(a.closest('[fs-selectcustom-element="dropdown"]')):a.parent().hasClass("newsletter_input")?e.appendTo(a.parent().parent()):e.insertAfter(a)},highlight:function(e,a,t){e.getAttribute("type")=="checkbox"||e.getAttribute("type")=="radio"?$(e).prev().addClass(a).removeClass(t):e.nodeName==="SELECT"?$(e).closest('[fs-selectcustom-element="dropdown"]').addClass(a).removeClass(t):$(e).addClass(a).removeClass(t)},unhighlight:function(e,a,t){e.getAttribute("type")=="checkbox"||e.getAttribute("type")=="radio"?$(e).prev().removeClass(a).addClass(t):e.nodeName==="SELECT"?$(e).closest('[fs-selectcustom-element="dropdown"]').removeClass(a).addClass(t):$(e).removeClass(a).addClass(t)},rules:{email:{email:!0}},messages:{name:"Name is required",fname:"First name is required",lname:"Last name is required",message:"Message is required",email:"Email address is required",phone:"Phone is required",company:"Company is required",jobtitle:"Job title is required",industry:"Industry is required",privacy:"Please agree to our privacy policy"}})})});})();
