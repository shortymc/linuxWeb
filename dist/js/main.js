function delay(e){return e=e||2e3,new Promise(t=>{setTimeout(()=>{t()},e)})}htmlEl=document.querySelector("html"),page={changePage:async(pageUrl,doOnComplete=!1,executeOnComplete=!0)=>{fetch(pageUrl).then(async pageRequest=>{if(!pageRequest.ok)return console.error(`The specified page does not exists! (${pageUrl})`),!1;{htmlEl.style="background:black;";let pageHTML=await pageRequest.text();htmlEl.style="background:black; visibility: hidden",executeOnComplete&&(htmlEl.style="background:black; visibility: hidden !important;"),htmlEl.innerHTML=await pageHTML,executeOnComplete&&doOnComplete||eval(doOnComplete),await(await page.loadAllJsFromHtml()),doOnComplete&&executeOnComplete?(eval(doOnComplete),setTimeout(()=>{htmlEl.style=""},100)):htmlEl.style=""}})},loadJs:jsSrc=>new Promise(async resolve=>{try{let jsCode=await(await fetch(jsSrc)).text();eval(await jsCode+'console.info(jsSrc + " Loaded")')}catch(e){console.error(e,jsSrc),eval(jsCode)}resolve()}),loadAllJsFromHtml:()=>{let e=document.querySelectorAll("script");return new Promise(async t=>{for(const t in e){let a=e[t];a.src&&await page.loadJs(a.src)}t()})}},date={months:["January","February","March","April","May","June","July","August","September","October","November","December"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],get:(e,t=" ")=>(e=e.split(" ")).map(e=>{switch(e){case"date":return(new Date).getDate();case"year":return(new Date).getFullYear();case"month":return(new Date).getMonth()+1;case"month>full":return date.months[(new Date).getMonth()];case"month>str":return(new Date).toDateString().slice(4,7);case"day":return(new Date).getDay();case"day>full":return date.weekdays((new Date).getDay());case"day>str":return(new Date).toDateString().slice(0,3);case"time":return date.getTime("hms",":");case"time-h":return date.getTime("ms",":");case"time-m":return date.getTime("hs",":");case"time-s":return date.getTime("hm",":");case"h":return(new Date).getHours();case"m":return(new Date).getMinutes();case"s":return(new Date).getSeconds()}}).join(t),getDate:()=>new Date((new Date).getDate()).toLocaleDateString(),getTime:(x,divider=":",clock12h=!0)=>{let h,m,s,strEnd="",d=new Date;[h,m,s]=[d.getHours(),d.getMinutes(),d.getSeconds()],clock12h&&(h>12?(h-=12,strEnd="PM"):strEnd="AM"),m.toString().length<2&&(m="0"+m),s.toString().length<2&&(s="0"+s);let returnTime=x.split("").map(x=>eval(x)).join(divider)+" "+strEnd;return returnTime},getDateAndTime:()=>new Date((new Date).toLocaleTimeString())};let range=(e,t=null)=>{let a=[...Array(null==t?e:t).keys()];return t&&(a=a.splice(e)),a},isValid=e=>e&&""!==e.toString().trim()||0==e,isDefined=e=>void 0!==e&&null!=e,escapeHtml=e=>{if(!isDefined(e))return"";var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"};return e.replace(/[&<>"']/g,(function(e){return t[e]}))},isObjectEmpty=e=>{if(isDefined(e))return 0==Object.entries(e).length},isArrayEmpty=e=>{if(isDefined(e)&&"Object"==typeof e)return 0==e.length},isTextEmpty=e=>0==e.toString().trim().length,elementIsInEventPath=(e,t)=>!!isDefined(e)&&(clickPath=e.path||e.composedPath(),clickPath.includes(t)),tagIsInEventPath=(e,t)=>{for(element of(t=t.toUpperCase(),clickPath=e.path||e.composedPath(),clickPath))if(element.tagName==t)return!0;return!1},addDoubleClickListener=(e,t)=>{clickedAmount=0,doubleClickTimeout=0,e.addEventListener("click",e=>{2==++clickedAmount&&(clearTimeout(doubleClickTimeout),t(e)),clearTimeout(doubleClickTimeout),doubleClickTimeout=setTimeout(()=>{clickedAmount=0},300)})};