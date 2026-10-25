/* Taxi Local — panel inferior deslizable, táctil y accesible. */
(function(){
 "use strict";
 function init(){
  var main=document.querySelector("main"),handle=document.getElementById("taxi-sheet-handle"),toggle=document.getElementById("taxi-sheet-toggle");
  if(!main||!handle||!toggle)return;
  var collapsed=false,startY=0,lastY=0,dragging=false,pointer=null,suppressClick=false;
  function isSheetView(){
   var s=document.querySelector(".screen.active");if(!s)return false;
   if(s.id==="driver"){
    var admin=document.getElementById("admin-dashboard"),dash=document.getElementById("driver-dashboard");
    return !!dash&&!dash.classList.contains("hidden")&&(!admin||admin.classList.contains("hidden"));
   }
   return ["home","booking","account-choice","customer-account","customer-reservations","driver-map","driver-reservations","account"].indexOf(s.id)!==-1;
  }
  var lastEnabled=null;
  function refreshMode(){
   var enabled=isSheetView();
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
  function beginDrag(e){
   if(e.target===toggle||toggle.contains(e.target))return;
   if(e.pointerType==="mouse"&&e.button!==0)return;
   var rect=main.getBoundingClientRect();
   var fromHandle=handle.contains(e.target);
   /* En pantallas desplegadas, el gesto se inicia en la banda superior del panel.
      Así no bloqueamos el desplazamiento normal de formularios y listas. */
   if(!fromHandle&&e.clientY>rect.top+86)return;
   dragging=true;pointer=e.pointerId;startY=e.clientY;lastY=startY;
   if(handle.setPointerCapture&&fromHandle){try{handle.setPointerCapture(e.pointerId)}catch(_e){}}
   else if(main.setPointerCapture){try{main.setPointerCapture(e.pointerId)}catch(_e){}}
  }
  function moveDrag(e){if(dragging&&e.pointerId===pointer)lastY=e.clientY;}
  function finish(e){
   if(!dragging||(e&&e.pointerId!==pointer))return;
   var delta=lastY-startY;dragging=false;pointer=null;
   if(Math.abs(delta)>22){suppressClick=true;setCollapsed(delta>0);setTimeout(function(){suppressClick=false;},350);}
  }
  main.addEventListener("pointerdown",beginDrag);
  main.addEventListener("pointermove",moveDrag);
  main.addEventListener("pointerup",finish);
  main.addEventListener("pointercancel",finish);
  var observer=new MutationObserver(function(){refreshMode();});
  observer.observe(main,{subtree:true,attributes:true,attributeFilter:["class"]});
  document.querySelectorAll("[data-screen]").forEach(function(el){el.addEventListener("click",function(){setTimeout(refreshMode,80);});});
  window.addEventListener("resize",refreshMode);
  document.addEventListener("visibilitychange",refreshMode);
  refreshMode();
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();