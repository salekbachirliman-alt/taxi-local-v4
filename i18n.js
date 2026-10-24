/* Taxi Local bilingual interface: Spanish / Arabic. UI-only; does not alter booking or auth logic. */
(function(){
"use strict";
var KEY="taxiLocalLanguage";
var language="es";
try{language=localStorage.getItem(KEY)==="ar"?"ar":"es"}catch(_){}
var translations={
"Bienvenido a Taxi Local":"مرحبًا بك في تاكسي لوكال",
"Crear cuenta / Iniciar sesión":"إنشاء حساب / تسجيل الدخول",
"Pedir taxi ahora":"اطلب سيارة أجرة الآن",
"Reservar para más tarde":"احجز لوقت لاحق",
"PANEL DEL CONDUCTOR":"لوحة السائق",
"Últimas reservas":"أحدث الحجوزات",
"NUEVA SOLICITUD":"طلب جديد",
"Pide tu taxi":"اطلب سيارة أجرة",
"← Volver":"← رجوع",
"← Volver al formulario":"← العودة إلى النموذج",
"← Volver al inicio":"← العودة إلى الرئيسية",
"Nombre (opcional)":"الاسم (اختياري)",
"Tu nombre":"اسمك",
"Teléfono":"رقم الهاتف",
"Tu teléfono":"رقم هاتفك",
"¿Dónde te recogemos?":"أين نلتقطك؟",
"Dirección de recogida":"عنوان الالتقاط",
"Calle, número o lugar":"الشارع أو الرقم أو المكان",
"Compartir mi ubicación actual":"مشاركة موقعي الحالي",
"Pulsa el botón para compartir automáticamente tu punto de recogida. El navegador te pedirá permiso.":"اضغط لمشاركة موقع الالتقاط تلقائيًا. سيطلب المتصفح إذنك.",
"Destino":"الوجهة",
"¿A dónde vas?":"إلى أين تريد الذهاب؟",
"Fecha y hora de recogida":"تاريخ ووقت الالتقاط",
"Elige una hora de al menos 15 minutos en el futuro. Las reservas se pueden hacer con hasta 90 días de antelación.":"اختر وقتًا بعد 15 دقيقة على الأقل. يمكن الحجز قبل 90 يومًا كحد أقصى.",
"Número de pasajeros":"عدد الركاب",
"Notas (opcional)":"ملاحظات (اختياري)",
"Equipaje, punto de encuentro...":"الأمتعة أو مكان اللقاء...",
"Solicitar taxi":"طلب سيارة أجرة",
"La solicitud se enviará a los conductores. No se realiza ningún cobro desde esta app.":"سيُرسل الطلب إلى السائقين. لا يتم الدفع عبر هذا التطبيق.",
"BIENVENIDO A TAXI LOCAL":"مرحبًا بك في تاكسي لوكال",
"¿Cómo quieres entrar?":"كيف تريد الدخول؟",
"Selecciona el tipo de cuenta para continuar.":"اختر نوع الحساب للمتابعة.",
"Cliente":"عميل",
"Conductor":"سائق",
"Administrador":"مسؤول",
"CUENTA DE CLIENTE":"حساب العميل",
"Tus datos, siempre guardados":"بياناتك محفوظة دائمًا",
"Crea una cuenta con correo y contraseña para que tu nombre y teléfono aparezcan automáticamente en futuras reservas. También puedes pedir un taxi como invitado sin registrarte.":"أنشئ حسابًا بالبريد الإلكتروني وكلمة المرور ليظهر اسمك ورقم هاتفك تلقائيًا في الحجوزات القادمة. يمكنك أيضًا طلب سيارة كضيف دون تسجيل.",
"Editar mis datos":"تعديل بياناتي",
"Pedir taxi":"طلب سيارة أجرة",
"Cerrar sesión":"تسجيل الخروج",
"Iniciar sesión":"تسجيل الدخول",
"Crear cuenta":"إنشاء حساب",
"Nombre de usuario":"اسم المستخدم",
"ej. salek_23":"مثال: salek_23",
"Nombre de usuario o teléfono":"اسم المستخدم أو رقم الهاتف",
"Tu nombre de usuario o teléfono":"اسم المستخدم أو رقم هاتفك",
"Contraseña":"كلمة المرور",
"Mínimo 8 caracteres":"8 أحرف على الأقل",
"Para registrarte, elige un nombre de usuario único y escribe tu teléfono español sin +34. No se enviarán correos ni códigos SMS; el teléfono no se verifica como titularidad durante este piloto.":"للتسجيل، اختر اسم مستخدم فريدًا وأدخل رقم هاتفك الإسباني دون ‎+34. لن تُرسل رسائل بريد أو رموز SMS؛ ولا يتم التحقق من ملكية الرقم في هذه المرحلة التجريبية.",
"CLIENTE":"العميل",
"Mis reservas":"حجوزاتي",
"Inicia sesión para consultar tus reservas.":"سجّل الدخول لعرض حجوزاتك.",
"Taxis disponibles en tu localidad":"سيارات الأجرة المتاحة في منطقتك",
"Cargando taxis disponibles…":"جارٍ تحميل سيارات الأجرة المتاحة…",
"CONDUCTOR":"السائق",
"Reservas recientes":"الحجوزات الأخيرة",
"Servicios asignados en las últimas 24 horas.":"الرحلات المسندة خلال آخر 24 ساعة.",
"Las reservas asignadas aparecerán aquí.":"ستظهر الحجوزات المسندة هنا.",
"TAXISTAS DISPONIBLES":"السائقون المتاحون",
"Encuentra tu taxi":"اعثر على سيارة أجرة",
"Conductores disponibles en tu ciudad":"السائقون المتاحون في مدينتك",
"Actualizar taxis ↻":"تحديث السائقين ↻",
"ZONA DE CONDUCTORES":"منطقة السائقين",
"Acceso conductor":"دخول السائق",
"Zona de trabajo":"منطقة العمل",
"Nombre de usuario único":"اسم مستخدم فريد",
"ej. salek123":"مثال: salek123",
"Ambas":"كلتاهما",
"Teléfono o nombre de usuario":"رقم الهاتف أو اسم المستخدم",
"+34 612 345 678":"‎+34 612 345 678",
"Entrar":"دخول",
"Código recibido por SMS":"الرمز المستلم عبر SMS",
"Código de verificación":"رمز التحقق",
"Verificar teléfono":"التحقق من الهاتف",
"Crea tu cuenta con nombre de usuario, teléfono y contraseña. No necesitas confirmar SMS ni correo. Tu perfil deberá ser aprobado por la administración antes de trabajar.":"أنشئ حسابك باستخدام اسم المستخدم والهاتف وكلمة المرور. لا يلزم تأكيد SMS أو البريد الإلكتروني. يجب أن توافق الإدارة على ملفك قبل بدء العمل.",
"Completa tu perfil":"أكمل ملفك الشخصي",
"Nombre completo":"الاسم الكامل",
"Nombre y apellido":"الاسم واللقب",
"Teléfono de contacto":"رقم هاتف للتواصل",
"Enviar registro":"إرسال التسجيل",
"Gestión de cuentas":"إدارة الحسابات",
"Gestión de conductores y reservas.":"إدارة السائقين والحجوزات.",
"Cuentas por confirmar":"حسابات بانتظار التأكيد",
"Actualizar ↻":"تحديث ↻",
"Perfiles de conductores":"ملفات السائقين",
"Todas las reservas":"جميع الحجوزات",
"Reservas":"الحجوزات",
"Activar disponibilidad y compartir ubicación":"تفعيل التوفر ومشاركة الموقع",
"Para aparecer en el mapa de clientes, el conductor debe estar aprobado y activar su disponibilidad.":"للظهور على خريطة العملاء، يجب اعتماد السائق وتفعيل حالة التوفر.",
"Mapa de reservas recientes":"خريطة الحجوزات الأخيرة",
"MI CUENTA":"حسابي",
"Usuario":"المستخدم",
"Mi cuenta":"حسابي",
"Iniciar sesión / Crear cuenta":"تسجيل الدخول / إنشاء حساب",
"Inicia sesión para guardar tus datos y consultar tus viajes.":"سجّل الدخول لحفظ بياناتك وعرض رحلاتك.",
"Tu cuenta":"حسابك",
"Número de teléfono:":"رقم الهاتف:",
"Activar disponibilidad":"تفعيل التوفر",
"Reservas activas":"الحجوزات النشطة",
"Reservas realizadas":"الحجوزات السابقة",
"Instalar Taxi Local":"تثبيت تاكسي لوكال",
"Añade Taxi Local a la pantalla de inicio.":"أضف تاكسي لوكال إلى الشاشة الرئيسية.",
"Inicio":"الرئيسية",
"Nombre y apellido":"الاسم واللقب",
"Error de inicialización:":"خطأ في التهيئة:",
"Sesión iniciada. Cargando cuentas y reservas…":"تم تسجيل الدخول. جارٍ تحميل الحسابات والحجوزات…",
"ZONA DE ADMINISTRACIÓN":"منطقة الإدارة",
"Acceso de administración":"دخول الإدارة",
"Panel del conductor":"لوحة السائق",
"Últimas reservas":"أحدث الحجوزات",
"Error JavaScript:":"خطأ JavaScript:",
"Comprobando permiso de ubicación…":"جارٍ التحقق من إذن الموقع…",
"La ubicación requiere HTTPS. Abre la aplicación desde el enlace oficial en Safari.":"يتطلب الموقع HTTPS. افتح التطبيق من الرابط الرسمي في Safari.",
"Este navegador no permite acceder a la ubicación. Puedes escribir la dirección manualmente.":"هذا المتصفح لا يسمح بالوصول إلى الموقع. يمكنك كتابة العنوان يدويًا.",
"El iPhone está buscando tu ubicación. Si aparece una solicitud de permiso, pulsa Permitir.":"يجري iPhone البحث عن موقعك. إذا ظهر طلب إذن، اضغط سماح.",
"Ubicación añadida. Se enviará el enlace del mapa con la solicitud.":"تمت إضافة الموقع. سيُرسل رابط الخريطة مع الطلب.",
"Permiso denegado. En Ajustes > Privacidad y seguridad > Localización, activa Localización y permite el acceso a Safari.":"تم رفض الإذن. من الإعدادات > الخصوصية والأمان > خدمات الموقع، فعّل الموقع واسمح لـ Safari بالوصول.",
"No se pudo determinar la ubicación. Comprueba que Localización esté activada e inténtalo otra vez.":"تعذر تحديد الموقع. تأكد من تفعيل خدمات الموقع وحاول مجددًا.",
"La ubicación tardó demasiado. Pulsa el botón para volver a intentarlo.":"استغرق تحديد الموقع وقتًا طويلًا. اضغط الزر للمحاولة مجددًا.",
"No se pudo obtener la ubicación. Escribe la dirección manualmente.":"تعذر الحصول على الموقع. اكتب العنوان يدويًا.",
"En iPhone: abre esta página en Safari, pulsa Compartir (cuadrado con flecha hacia arriba) y elige “Añadir a pantalla de inicio”. Después pulsa “Añadir”.":"على iPhone: افتح الصفحة في Safari، واضغط مشاركة، ثم اختر «إضافة إلى الشاشة الرئيسية» واضغط «إضافة».",
"Puedes instalarla cuando quieras desde este botón.":"يمكنك تثبيتها في أي وقت باستخدام هذا الزر.",
"Si tu navegador ofrece instalación, abre su menú (⋮ o Compartir) y elige “Instalar aplicación” o “Añadir a pantalla de inicio”.":"إذا كان المتصفح يدعم التثبيت، افتح القائمة (⋮ أو مشاركة) واختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».",
"Taxi Local se está instalando.":"جارٍ تثبيت تاكسي لوكال."
};
var attrTranslations={
"placeholder":{
"Tu nombre":"اسمك","Tu teléfono":"رقم هاتفك","Calle, número o lugar":"الشارع أو الرقم أو المكان","¿A dónde vas?":"إلى أين تريد الذهاب؟","Equipaje, punto de encuentro...":"الأمتعة أو مكان اللقاء...","ej. salek_23":"مثال: salek_23","Tu nombre de usuario o teléfono":"اسم المستخدم أو رقم هاتفك","Mínimo 8 caracteres":"8 أحرف على الأقل","Nombre de usuario o teléfono":"اسم المستخدم أو رقم الهاتف","Nombre y apellido":"الاسم واللقب","Teléfono de administrador (9 cifras)":"رقم هاتف المسؤول (9 أرقام)","Código de verificación":"رمز التحقق"
},
"aria-label":{"Mapa de taxis disponibles":"خريطة سيارات الأجرة المتاحة","Mapa de reservas recientes":"خريطة الحجوزات الأخيرة","Navegación principal":"التنقل الرئيسي"}
};
function normalize(s){return String(s||"").replace(/\s+/g," ").trim()}
function translateNode(node){
 if(node.nodeType!==3)return;
 var original=node.nodeValue, key=normalize(original);
 if(!key)return;
 if(language==="ar"&&translations[key])node.nodeValue=original.replace(key,translations[key]);
 else if(language==="es"&&node.__taxiOriginal)node.nodeValue=node.__taxiOriginal;
}
function walk(root){
 if(!root)return;
 var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];
 while(walker.nextNode())nodes.push(walker.currentNode);
 nodes.forEach(function(n){
  var key=normalize(n.nodeValue);
  if(!n.__taxiOriginal)n.__taxiOriginal=n.nodeValue;
  if(language==="ar"&&translations[key])n.nodeValue=n.nodeValue.replace(key,translations[key]);
  else if(language==="es")n.nodeValue=n.__taxiOriginal;
 });
 if(root.querySelectorAll)root.querySelectorAll("input,textarea,button,[aria-label],option").forEach(function(el){
  ["placeholder","aria-label"].forEach(function(attr){
   if(!el.hasAttribute(attr))return;
   if(!el.dataset["taxiOriginal"+attr])el.dataset["taxiOriginal"+attr]=el.getAttribute(attr);
   var original=el.dataset["taxiOriginal"+attr];
   el.setAttribute(attr,language==="ar"&&attrTranslations[attr]&&attrTranslations[attr][original]?attrTranslations[attr][original]:original);
  });
 });
}
function apply(){
 document.documentElement.lang=language;
 document.documentElement.dir=language==="ar"?"rtl":"ltr";
 document.body.classList.toggle("lang-ar",language==="ar");
 var select=document.getElementById("taxi-language");
 if(select)select.value=language;
 walk(document.body);
}
function addSelector(){
 var select=document.getElementById("taxi-language");
 if(!select){
  var header=document.querySelector("header.top");
  if(!header)return;
  var wrap=document.createElement("label");
  wrap.className="language-switch";
  wrap.setAttribute("for","taxi-language");
  wrap.innerHTML='<span class="language-label">Idioma / اللغة</span><select id="taxi-language" aria-label="Idioma / اللغة"><option value="es">Español</option><option value="ar">العربية</option></select>';
  header.appendChild(wrap);
  select=wrap.querySelector("select");
 }
 if(select.dataset.taxiLanguageBound==="1")return;
 select.dataset.taxiLanguageBound="1";
 select.addEventListener("change",function(){
  language=this.value==="ar"?"ar":"es";
  try{localStorage.setItem(KEY,language)}catch(_){}
  apply();
 });
}
function init(){
 addSelector();apply();
 var observer=new MutationObserver(function(records){
  records.forEach(function(record){
   if(record.type==="characterData"){var n=record.target,key=normalize(n.nodeValue);if(language==="ar"&&translations[key]){if(!n.__taxiOriginal)n.__taxiOriginal=n.nodeValue;n.nodeValue=n.nodeValue.replace(key,translations[key])}else if(language==="es"&&n.__taxiOriginal)n.nodeValue=n.__taxiOriginal;}
   record.addedNodes&&record.addedNodes.forEach(function(n){if(n.nodeType===1)walk(n);else if(n.nodeType===3)translateNode(n)});
  });
 });
 observer.observe(document.body,{subtree:true,childList:true,characterData:true});
 document.addEventListener("click",function(){if(!document.getElementById("taxi-language"))addSelector()});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
window.TaxiLocalI18n={getLanguage:function(){return language},setLanguage:function(v){language=v==="ar"?"ar":"es";try{localStorage.setItem(KEY,language)}catch(_){}apply()}};
})();