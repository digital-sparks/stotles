(()=>{window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{let p="lead_id",s=localStorage.getItem(p);s||(s=y(),localStorage.setItem(p,s));function y(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(n){let i=Math.random()*16|0;return(n==="x"?i:i&3|8).toString(16)})}window.dataLayer=window.dataLayer||[];function d(){let n=new URL(window.location.href);return`${n.origin}${n.pathname}${n.hash}`}function w(n,i,r){window.dataLayer.push({event:`${n}_start`,form_name:i,form_id:r,form_url:d()})}function g(n,i,r,u){window.dataLayer.push({event:`${n}_interaction`,form_name:i,form_id:r,form_url:d(),field_name:u})}$.validator.addMethod("regex",function(n,i,r){return r&&r.constructor!=RegExp?r=new RegExp(r):r.global&&(r.lastIndex=0),this.optional(i)||r.test(n)}),$.validator.setDefaults({ignore:[]}),document.querySelectorAll("form").forEach((n,i)=>{let r=n.getAttribute("id"),u=n.getAttribute("data-name"),c=n.getAttribute("data-track-name"),f=!1;n.addEventListener("input",()=>{f||(f=!0,w(c,u,r))},{once:!0}),n.querySelectorAll("input, select, textarea").forEach(e=>{e.addEventListener("input",()=>{g(c,u,r,e.name)},{once:!0})}),$(n).validate({submitHandler:function(e){let a=Cookies.get("stotles_utm"),t=a?JSON.parse(a):void 0;if(t){let o=t.url?`<${t.url}|Link>`:"Unknown";e.querySelector("input[name=referrer]").value=t.referrer?t.referrer:"Unknown",e.querySelector("input[name=first_stotles_page]").value=o,e.querySelector("input[name=utm_params]").value=t.utmParams?Object.entries(t.utmParams).map(([l,m])=>`${l}: ${m}`).join(", "):"Unknown",e.querySelector("input[name=utm_source]").value=t.utmParams?t.utmParams.source:void 0,e.querySelector("input[name=utm_medium]").value=t.utmParams?t.utmParams.medium:void 0,e.querySelector("input[name=utm_campaign]").value=t.utmParams?t.utmParams.campaign:void 0,e.querySelector("input[name=utm_content]").value=t.utmParams?t.utmParams.content:void 0,e.querySelector("input[name=utm_term]").value=t.utmParams?t.utmParams.term:"undefined"}if(window.dataLayer.push({event:`${c}_submitted`,form_name:u,form_id:r,form_url:d(),lead_id:s}),document.querySelector("#report-popup-form")){e.querySelector("input[name=campaign_description]").value=document.title,document.querySelector("#report-popup-form").style.display="none";let o=new URL(document.URL).pathname+"-popup";window.localStorage.setItem(o,"true")}if(document.querySelector("#gated-form")){e.querySelector("input[name=campaign_description]").value=document.title;let l=document.querySelector("#gated-form").closest(".sign-up_component");l.style.display="none";let m=new URL(document.URL).pathname+"-popup";window.localStorage.setItem(m,"true"),document.querySelector(".rich-text-wrap").style.maxHeight="none"}if(window.downloadUrl){let o=document.createElement("a");o.href=window.downloadUrl,o.download=window.downloadName,o.target="_blank",document.body.appendChild(o),o.click(),document.body.removeChild(o)}return!0},errorClass:"is-error",validClass:"is-success",errorPlacement:function(e,a){a.attr("type")=="checkbox"||a.attr("type")=="radio"?e.appendTo(a.closest(".form_field-wrapper")):a[0].nodeName==="SELECT"?e.appendTo(a.closest('[fs-selectcustom-element="dropdown"]')):a.parent().hasClass("newsletter_input")?e.appendTo(a.parent().parent()):e.insertAfter(a)},highlight:function(e,a,t){e.getAttribute("type")=="checkbox"||e.getAttribute("type")=="radio"?$(e).prev().addClass(a).removeClass(t):e.nodeName==="SELECT"?$(e).closest('[fs-selectcustom-element="dropdown"]').addClass(a).removeClass(t):$(e).addClass(a).removeClass(t)},unhighlight:function(e,a,t){e.getAttribute("type")=="checkbox"||e.getAttribute("type")=="radio"?$(e).prev().removeClass(a).addClass(t):e.nodeName==="SELECT"?$(e).closest('[fs-selectcustom-element="dropdown"]').removeClass(a).addClass(t):$(e).removeClass(a).addClass(t)},rules:{email:{email:!0}},messages:{name:"Name is required",fname:"First name is required",lname:"Last name is required",message:"Message is required",email:"Email address is required",phone:"Phone is required",company:"Company is required",jobtitle:"Job title is required",industry:"Industry is required",privacy:"Please agree to our privacy policy",public_sector_experience:"Please select your experience"}})})});})();
