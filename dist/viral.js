(()=>{window.addEventListener("vlReady",i);document.querySelector("#email-form").addEventListener("submit",()=>{var e=document.querySelector('div[data-vl-container="sharing-stage"]');console.log("form submitted");var t={attributes:!0,attributeFilter:["style"]},n=new MutationObserver(function(o){o.forEach(function(r){var l=window.getComputedStyle(e).display;l==="block"&&(console.log("form state changed"),i())})});n.observe(e,t)});async function i(){let e;for(;!e;)try{e=await ViralLoops.getCampaign(),e||(console.log("Waiting for campaign..."),await new Promise(t=>setTimeout(t,200)))}catch(t){console.error("An error occurred:",t)}console.log(e);for(let t=0;t<localStorage.length;t++){let n=localStorage.key(t);if(n.includes("vl_refCode_")){let o="https://www.stotles.com/bid-module-waitlist",r=e.userData?e.userData.referralCode:localStorage.getItem(n),l=await e.getRank({referralCode:r});document.querySelectorAll("[data-name=rank]").forEach(c=>{c.textContent=`#${l.rank}`}),document.querySelector("[data-name=url]").textContent=`${o}?referralCode=${r}&refSource=copy`,document.querySelector("[data-name=facebook]").setAttribute("href",`https://www.facebook.com/share_channel/?link=${encodeURIComponent(o+"?referralCode="+r+"&refSource=facebook")}&app_id=966242223397117&source_surface=external_reshare&display&hashtag`),document.querySelector("[data-name=whatsapp]").setAttribute("href",`https://api.whatsapp.com/send?text=${encodeURIComponent("Please help me unlock special rewards by joining me on Stotles' Operating System Waitlist "+o+"?referralCode="+r+"&refSource=whatsapp")}`),document.querySelector("[data-name=twitter]").setAttribute("href",`https://twitter.com/intent/post?url=${encodeURIComponent(o+"?referralCode="+r+"&refSource=twitter")}&text=${encodeURIComponent("I just joined the Stotles Waitlist for AI-driven public sector tools. Help me unlock special rewards by joining too!")}&via=Stotles_Central`),document.querySelector("[data-name=linkedin]").setAttribute("href",`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(o+"?referralCode="+r+"&refSource=linkedin")}`),document.querySelector("[data-name=email]").setAttribute("href",`mailto:?subject=${encodeURIComponent("Help me unlock AI powered public sector tools \u{1F513}")}&body=${encodeURIComponent(`Hi there,

I just joined Stotles' new waitlist for their AI-driven public sector operating system and I think you should too!
The more people I refer, the more chances I have to unlock special rewards.

Click my link to check it out: `+o+"?referralCode="+r+`&refSource=email

Thanks,`)}`),document.querySelector("[data-name=copy-url]").addEventListener("click",function(c){c.preventDefault();let a=document.createElement("input");document.body.appendChild(a),a.value=`${o}?referralCode=${r}&refSource=copy`,a.select(),document.execCommand("copy"),document.body.removeChild(a)})}}}})();
