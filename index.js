import{a as w,i,S as E}from"./assets/vendor-D0cagnvz.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const q="47332202-20d723453e83dbf57917d8670";async function h(s,r=20,o){const a="https://pixabay.com/api/";try{return(await w.get(`${a}`,{params:{key:q,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:r}})).data}catch(e){throw console.log(e.message),i.error({title:"Error",message:`Error: ${e.message}`}),e}}function p(s){return s.map(({webformatURL:r,largeImageURL:o,tags:a,likes:e,views:t,comments:c,downloads:v})=>`
        <li class="img-card">
          <div class="img-img">
            <a class="gallery-link" href="${o}">
              <img class="gallery-image" src="${r}" alt="${a}" />
            </a>
          </div>
          <div class="img-info">
            <ul class="img-info-list">
              <li><h3>Likes</h3><p>${e}</p></li>
              <li><h3>Views</h3><p>${t}</p></li>
              <li><h3>Comments</h3><p>${c}</p></li>
              <li><h3>Downloads</h3><p>${v}</p></li>
            </ul>
          </div>
        </li>
      `).join("")}function y(s,r){s.insertAdjacentHTML("beforeend",r),d.classList.replace("hidden","load-more-button")}function f(s){s.innerHTML=""}i.settings({position:"topRight"});const $=document.querySelector(".js-search-form"),M=document.querySelector("#query"),l=document.getElementById("loader"),u=document.querySelector(".image-cards"),d=document.querySelector("#load-more");let m,n=1,g=15,L=300;d.addEventListener("click",P);const b=new E(".image-cards a");$.addEventListener("submit",s=>{if(s.preventDefault(),m=M.value.trim(),n=1,!m){i.warning({title:"Error",message:"Please enter a searched word"});return}l.classList.remove("disabled"),h(m,g,n).then(r=>{if(r.hits.length===0){i.warning({title:"No Results",message:"No images found for your query."}),f(u);return}f(u);const o=p(r.hits);if(y(u,o),Math.ceil(r.totalHits/g)<=n){d.classList.add("hidden"),l.classList.add("disabled"),i.warning({title:"No more pages",message:"We're sorry, but you've reached the end of search results."});return}d.classList.replace("hidden","load-more-button");let e=document.querySelector(".img-card");e&&(L=e.getBoundingClientRect().height*2),b.refresh()}).catch(r=>{console.error("Error fetching images:",r),i.error({title:"Error",message:`Failed to fetch images: ${r.message}`})}).finally(()=>{l.classList.add("disabled")})});async function P(){n+=1;try{l.classList.remove("disabled");const s=await h(m,g,n);let r=Math.ceil(s.totalHits/g);if(n>=r){console.log("We're sorry, but you've reached the end of search results."),d.classList.add("hidden"),l.classList.add("disabled"),i.warning({title:"No more pages",message:"We're sorry, but you've reached the end of search results."});return}const o=p(s.hits);y(u,o),l.classList.add("disabled"),window.scrollBy({top:L,left:0,behavior:"smooth"}),b.refresh()}catch{console.error("Error in onClickLoadMore:",error.message),i.error({title:"Error",message:`Failed to load more images: ${error.message}`})}}
//# sourceMappingURL=index.js.map
