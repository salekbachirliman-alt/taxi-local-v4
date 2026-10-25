/* Taxi Local — panel inferior deslizable, táctil y accesible. */
(function(){
 "use strict";
 function init(){
  var main=document.querySelector("main"),handle=document.getElementById("taxi-sheet-handle"),toggle=document.getElementById("taxi-sheet-toggle");
  if(!main||!handle||!toggle)return;
  var collapsed=false,startY=0,lastY=0,dragging=false,pointer=null,suppressClick=false;
  function isMapView(){
   var s=document.querySelector(".screen.active");if(!s)return false;
   if(s.id==="driver-map"||s.id==="customer-reservations")return true;
   if(s.id==="home"){var dh=document.getElementById("driver-home");return !!dh&&!dh.classList.contains("hidden");}
   if(s.id==="driver"){var dd=document.getElementById("driver-dashboard");return !!dd&&!dd.classList.contains("hidden");}
   return false;
  }
  var lastEnabled=null;
  function refreshMode(){
   var enabled=isMapView();
   if(document.body.classList.contains("taxi-sheet-mode")!==enabled)document.body.classList.toggle("taxi-sheet-mode",enabled);
   var displayValue=enabled?"flex":"none";
   if(handle.style.display!==displayValue)handle.style.display=displayValue;
   if(!enabled){
    collapsed=false;
    if(main.classList.contains("taxi-sheet-collapsed"))main.classList.remove("taxi-sheet-collapsed");
   }
   updateLabels();
   lastEnabled=enabled;
  }
  function updateLabels(){
   handle.setAttribute("aria-expanded",String(!collapsed));
   handle.setAttribute("aria-label",collapsed?"Desplegar panel inferior":"Reducir panel inferior");
   toggle.setAttribute("aria-label",collapsed?"Ampliar panel":"Reducir panel");
   toggle.querySelector("span").textContent=collapsed?"⌃":"⌄";
  }
  function setCollapsed(value){
   collapsed=!!value;main.classList.toggle("taxi-sheet-collapsed",collapsed);
   updateLabels();if(!collapsed)main.scrollTop=0;
  }
  function togglePanel(){setCollapsed(!collapsed);}
  toggle.addEventListener("click",function(e){e.stopPropagation();togglePanel();});
  handle.addEventListener("click",function(e){if(e.target===toggle||toggle.contains(e.target))return;if(suppressClick){suppressClick=false;e.preventDefault();return;}togglePanel();});
  handle.addEventListener("keydown",function(e){
   if(e.key==="Enter"||e.key===" "){e.preventDefault();togglePanel();}
   else if(e.key==="ArrowUp"){e.preventDefault();setCollapsed(false);}
   else if(e.key==="ArrowDown"){e.preventDefault();setCollapsed(true);}
  });
  handle.addEventListener("pointerdown",function(e){
   if(e.target===toggle||toggle.contains(e.target))return;
   dragging=true;pointer=e.pointerId;startY=e.clientY;lastY=startY;
   if(handle.setPointerCapture)handle.setPointerCapture(e.pointerId);
  });
  handle.addEventListener("pointermove",function(e){if(dragging&&e.pointerId===pointer)lastY=e.clientY;});
  function finish(e){
   if(!dragging||(e&&e.pointerId!==pointer))return;
   var delta=lastY-startY;dragging=false;pointer=null;
   if(Math.abs(delta)>18){suppressClick=true;setCollapsed(delta>0);setTimeout(function(){suppressClick=false;},350);}
  }
  handle.addEventListener("pointerup",finish);handle.addEventListener("pointercancel",finish);
  var observer=new MutationObserver(function(){refreshMode();});
  observer.observe(main,{subtree:true,attributes:true,attributeFilter:["class"]});
  document.querySelectorAll("[data-screen]").forEach(function(el){el.addEventListener("click",function(){setTimeout(refreshMode,80);});});
  window.addEventListener("resize",refreshMode);
  document.addEventListener("visibilitychange",refreshMode);
  refreshMode();
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();