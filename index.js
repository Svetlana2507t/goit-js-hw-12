import{a as E,i as o,S as _}from"./assets/vendor-D0cagnvz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();const q="47332202-20d723453e83dbf57917d8670";async function g(r,t=20,i){const n="https://pixabay.com/api/";try{return(await E.get(`${n}`,{params:{key:q,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:t}})).data}catch(e){o.error({title:"Error",message:`Error: ${e.message}`})}}function p(r){return r.map(({webformatURL:t,largeImageURL:i,tags:n,likes:e,views:s,comments:d,downloads:v})=>`
        <li class="img-card">
          <div class="img-img">
            <a class="gallery-link" href="${i}">
              <img class="gallery-image" src="${t}" alt="${n}" />
            </a>
          </div>
          <div class="img-info">
            <ul class="img-info-list">
              <li><h3>Likes</h3><p>${e}</p></li>
              <li><h3>Views</h3><p>${s}</p></li>
              <li><h3>Comments</h3><p>${d}</p></li>
              <li><h3>Downloads</h3><p>${v}</p></li>
            </ul>
          </div>
        </li>
      `).join("")}function y(r,t){r.insertAdjacentHTML("beforeend",t),a.classList.replace("hidden","load-more-button")}function h(r){r.innerHTML=""}o.settings({position:"topRight"});const M=document.querySelector(".js-search-form"),S=document.querySelector("#query"),l=document.getElementById("loader"),u=document.querySelector(".image-cards"),a=document.querySelector("#load-more");let m,c=1,f=15,L=300;a.dataset.listenerAttached||(a.addEventListener("click",w),a.dataset.listenerAttached="true");const b=new _(".image-cards a");window.__formSubmitListenerAttached||(M.addEventListener("submit",r=>{if(r.preventDefault(),m=S.value.trim(),c=1,!m){o.warning({title:"Error",message:"Please enter a searched word"});return}l.classList.remove("disabled"),g(m,f,c).then(t=>{if(t.hits.length===0){o.warning({title:"No Results",message:"No images found for your query."}),h(u);return}h(u);const i=p(t.hits);if(y(u,i),Math.ceil(t.totalHits/f)<=c){a.classList.add("hidden"),l.classList.add("disabled"),o.warning({title:"No more pages",message:"We're sorry, but you've reached the end of search results."});return}a.classList.replace("hidden","load-more-button");let e=document.querySelector(".img-card");e&&(L=e.getBoundingClientRect().height*2),b.refresh()}).catch(t=>{console.error("Error fetching images:",t),o.error({title:"Error",message:`Failed to fetch images: ${t.message}`})}).finally(()=>{l.classList.add("disabled")})}),window.__formSubmitListenerAttached=!0);async function w(){c+=1;try{const r=await g(m,f,c);l.classList.remove("disabled");const t=p(r.hits);y(u,t),l.classList.add("disabled"),window.scrollBy({top:L,left:0,behavior:"smooth"});let i=Math.ceil(r.totalHits/f);if(c>=i){a.classList.add("hidden"),l.classList.add("disabled"),o.warning({title:"No more pages",message:"We're sorry, but you've reached the end of search results."});return}b.refresh()}catch(r){o.error({title:"Error",message:`Failed to load more images: ${r.message}`})}finally{l.classList.add("disabled")}}window.__loadMoreClickListenerAttached||(a.addEventListener("click",w),window.__loadMoreClickListenerAttached=!0);
//# sourceMappingURL=index.js.map
