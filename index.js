import{a as w,i as a,S as E}from"./assets/vendor-D0cagnvz.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const q="47332202-20d723453e83dbf57917d8670";async function h(t,r=20,s){const i="https://pixabay.com/api/";try{return(await w.get(`${i}`,{params:{key:q,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:r}})).data}catch(e){throw console.log(e.message),a.error({title:"Error",message:`Error: ${e.message}`}),e}}function p(t){return t.map(({webformatURL:r,largeImageURL:s,tags:i,likes:e,views:o,comments:n,downloads:v})=>`
        <li class="img-card">
          <div class="img-img">
            <a class="gallery-link" href="${s}">
              <img class="gallery-image" src="${r}" alt="${i}" />
            </a>
          </div>
          <div class="img-info">
            <ul class="img-info-list">
              <li><h3>Likes</h3><p>${e}</p></li>
              <li><h3>Views</h3><p>${o}</p></li>
              <li><h3>Comments</h3><p>${n}</p></li>
              <li><h3>Downloads</h3><p>${v}</p></li>
            </ul>
          </div>
        </li>
      `).join("")}function y(t,r){t.insertAdjacentHTML("beforeend",r),u.classList.replace("hidden","load-more-button")}function f(t){t.innerHTML=""}a.settings({position:"topRight"});const $=document.querySelector(".js-search-form"),M=document.querySelector("#query"),g=document.getElementById("loader"),l=document.querySelector(".image-cards"),u=document.querySelector("#load-more");let c,d=1,m=15,L=300;u.addEventListener("click",S);const b=new E(".image-cards a");$.addEventListener("submit",t=>{if(t.preventDefault(),c=M.value.trim(),!c){a.warning({title:"Error",message:"Please enter a searched word"});return}g.classList.remove("disabled"),h(c,m,d).then(r=>{if(r.hits.length===0){a.warning({title:"No Results",message:"No images found for your query."}),f(l);return}f(l);const s=p(r.hits);y(l,s),u.classList.replace("hidden","load-more-button");let i=document.querySelector(".img-card");i&&(L=i.getBoundingClientRect().height*2),b.refresh()}).catch(r=>{console.error("Error fetching images:",r),a.error({title:"Error",message:`Failed to fetch images: ${r.message}`})}).finally(()=>{g.classList.add("disabled")})});async function S(){d+=1;try{const t=await h(c,m,d);let r=Math.ceil(t.totalHits/m);if(d>=r){console.log("We're sorry, but you've reached the end of search results."),u.classList.add("hidden"),a.warning({title:"No more pages",message:"We're sorry, but you've reached the end of search results."});return}const s=p(t.hits);y(l,s),window.scrollBy({top:L,left:0,behavior:"smooth"}),b.refresh()}catch{console.error("Error in onClickLoadMore:",error.message),a.error({title:"Error",message:`Failed to load more images: ${error.message}`})}}
//# sourceMappingURL=index.js.map
