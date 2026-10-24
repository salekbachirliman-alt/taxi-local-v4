import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const cors={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type","Access-Control-Allow-Methods":"POST, OPTIONS"};
Deno.serve(async(req:Request)=>{
 if(req.method==="OPTIONS")return new Response("ok",{headers:cors});
 const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{...cors,"Content-Type":"application/json"}});
 try{
  if(req.method!=="POST")return json({error:"Método no permitido."},405);
  const url=Deno.env.get("SUPABASE_URL")!,anon=Deno.env.get("SUPABASE_ANON_KEY")!,service=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin=createClient(url,service,{auth:{autoRefreshToken:false,persistSession:false}});
  const publicClient=createClient(url,anon,{auth:{autoRefreshToken:false,persistSession:false}});
  const body=await req.json();
  const customer_name=String(body.customer_name||"").trim(),customer_phone=String(body.customer_phone||"").trim();
  const pickup_town=String(body.pickup_town||"").trim(),pickup_address=String(body.pickup_address||"").trim();
  const destination=String(body.destination||"").trim(),notes=String(body.notes||"").trim();
  const passengers=Number(body.passengers||1);
  let scheduled_for:string|null=null;
  if(body.scheduled_for!==undefined&&body.scheduled_for!==null&&String(body.scheduled_for).trim()!==""){
   const parsed=Date.parse(String(body.scheduled_for));
   if(!Number.isFinite(parsed))return json({error:"La fecha y hora de la reserva no son válidas."},400);
   if(parsed<Date.now()+15*60*1000)return json({error:"Para reservar con antelación, elige una hora que sea al menos 15 minutos posterior a la hora actual."},400);
   if(parsed>Date.now()+90*24*60*60*1000)return json({error:"Solo puedes reservar con hasta 90 días de antelación."},400);
   scheduled_for=new Date(parsed).toISOString();
  }
  if(customer_phone.replace(/\D/g,"").length<9||customer_phone.length>30)return json({error:"Introduce un teléfono válido para que el taxista pueda llamarte."},400);
  if(!["Elda","Petrer","Monóvar","Alicante"].includes(pickup_town))return json({error:"Selecciona una localidad válida."},400);
  if(pickup_address.length<3||pickup_address.length>500)return json({error:"Introduce una dirección de recogida válida."},400);
  if(destination.length<2||destination.length>250)return json({error:"Introduce el destino."},400);
  if(!Number.isInteger(passengers)||passengers<1||passengers>8)return json({error:"El número de pasajeros debe estar entre 1 y 8."},400);
  if(notes.length>500||customer_name.length>100)return json({error:"Revisa los datos introducidos."},400);
  let customer_user_id:string|null=null;
  const authHeader=req.headers.get("Authorization");
  if(authHeader?.startsWith("Bearer ")){
   const token=authHeader.slice(7);
   const {data,error}=await publicClient.auth.getUser(token);
   if(!error&&data.user){
    const {data:profile}=await admin.from("customer_profiles").select("user_id").eq("user_id",data.user.id).maybeSingle();
    if(profile)customer_user_id=data.user.id;
   }
  }
  const row={customer_name:customer_name||null,customer_phone,pickup_town,pickup_address,destination,passengers,notes,status:"pending",driver_id:null,customer_user_id,scheduled_for};
  const {data,error}=await admin.from("rides").insert(row).select("id,customer_name,customer_phone,pickup_town,pickup_address,destination,passengers,notes,status,requested_at,created_at,driver_id,customer_user_id,scheduled_for").single();
  if(error)return json({error:"No se pudo guardar la reserva: "+error.message},500);
  return json({ride:data},201);
 }catch(e){return json({error:e instanceof Error?e.message:"Error inesperado"},500);}
});