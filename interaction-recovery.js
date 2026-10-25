/* Taxi Local v4 emergency interaction recovery.
   Isolated from app.js/Supabase so a failure in another script cannot freeze navigation. */
(function () {
  "use strict";
  if (window.__taxiEmergencyRecoveryInstalled) return;
  window.__taxiEmergencyRecoveryInstalled = true;

  function openScreen(id) {
    var next = document.getElementById(id);
    if (!next) return;
    document.querySelectorAll(".screen").forEach(function (screen) {
      screen.classList.toggle("active", screen === next);
    });
    document.querySelectorAll(".nav-item").forEach(function (button) {
      button.classList.toggle("active", button.getAttribute("data-screen") === id);
    });
    try { window.scrollTo({ top: 0, behavior: "auto" }); } catch (_) {}
  }

  function revealDriverLogin() {
    openScreen("driver");
    var auth = document.getElementById("driver-auth");
    var dashboard = document.getElementById("driver-dashboard");
    var admin = document.getElementById("admin-dashboard");
    var register = document.getElementById("driver-register");
    var tabs = document.querySelector("#driver-auth .tabs");
    if (auth) auth.classList.remove("hidden");
    if (dashboard) dashboard.classList.add("hidden");
    if (admin) admin.classList.add("hidden");
    if (register) register.classList.add("hidden");
    if (tabs) tabs.classList.remove("hidden");
    var form = document.getElementById("auth-form");
    if (form) {
      form.dataset.adminOnly = "false";
      var phone = form.elements.namedItem("phone");
      if (phone) { phone.type = "text"; phone.inputMode = "text"; phone.placeholder = "Teléfono o nombre de usuario"; }
    }
    var title = document.querySelector("#driver h2");
    var eyebrow = document.querySelector("#driver .eyebrow");
    if (title) title.textContent = "Acceso conductor";
    if (eyebrow) eyebrow.textContent = "ZONA DE CONDUCTORES";
  }

  function handleTap(event) {
    var origin = event.target;
    if (!origin || !origin.closest) return;
    var button = origin.closest("button, [role='button'], .nav-item");
    if (!button || button.disabled) return;

    var id = button.id;
    var screen = button.getAttribute("data-screen");
    if (id === "go-customer" || id === "go-customer-account") {
      event.preventDefault(); openScreen("account-choice"); return;
    }
    if (id === "choose-customer") {
      event.preventDefault(); openScreen("customer-account"); return;
    }
    if (id === "choose-driver" || id === "go-driver" || id === "account-driver") {
      event.preventDefault(); revealDriverLogin(); return;
    }
    if (id === "go-book") { event.preventDefault(); openScreen("booking"); return; }
    if (id === "go-schedule") {
      event.preventDefault(); openScreen("booking");
      var title = document.getElementById("booking-title");
      var fields = document.getElementById("scheduled-fields");
      var date = document.getElementById("scheduled-for");
      var submit = document.getElementById("send-ride");
      if (title) title.textContent = "Reserva tu taxi";
      if (fields) fields.classList.remove("hidden");
      if (date) date.required = true;
      if (submit) submit.textContent = "Reservar taxi";
      return;
    }
    if (id === "choose-admin") {
      event.preventDefault(); openScreen("driver");
      var adminForm = document.getElementById("auth-form");
      if (adminForm) adminForm.dataset.adminOnly = "true";
      var authBox = document.getElementById("driver-auth");
      if (authBox) authBox.classList.remove("hidden");
      var tabs = document.querySelector("#driver-auth .tabs");
      if (tabs) tabs.classList.add("hidden");
      var signup = document.getElementById("signup-fields");
      if (signup) signup.classList.add("hidden");
      var title = document.querySelector("#driver h2");
      if (title) title.textContent = "Acceso de administración";
      return;
    }
    if (screen) {
      event.preventDefault(); openScreen(screen);
      if (screen === "driver") revealDriverLogin();
      return;
    }
    if (id === "taxi-sheet-toggle" || button.closest("#taxi-sheet-handle")) {
      if (button.closest("#taxi-sheet-handle")) {
        event.preventDefault();
        var main = document.querySelector("body.taxi-sheet-mode main");
        if (main) main.classList.toggle("taxi-sheet-collapsed");
      }
    }
  }

  /* Capture phase lets basic navigation survive if a later app listener throws. */
  document.addEventListener("click", handleTap, true);
  document.addEventListener("pointerup", function (event) {
    if (event.pointerType === "touch") {
      var target = event.target;
      if (target && target.closest && target.closest("#go-customer, #go-customer-account, #choose-customer, #choose-driver, #go-driver, #account-driver, #go-book, #go-schedule, #choose-admin, .nav-item, .back, [data-screen], #taxi-sheet-toggle")) {
        /* Native click remains authoritative; this handler intentionally does not duplicate actions. */
      }
    }
  }, { passive: true });

  window.addEventListener("error", function (event) {
    var status = document.getElementById("driver-message");
    if (status && event.message && !status.textContent) {
      status.textContent = "Se ha producido un error de JavaScript. La navegación básica sigue disponible; revisa la consola.";
      status.className = "message error";
    }
  });
})();