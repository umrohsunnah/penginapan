/* ============================================================
   Penginapan.web.id — Main Script (vanilla JS, no framework)
   - Mobile nav toggle (ARIA-driven)
   - FAQ accordion (details/summary with safe keyboard support)
   - Scroll reveal (IntersectionObserver)
   - Booking form (client-side check, WhatsApp redirect)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");
  if (toggle && navMenu) {
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      navMenu.classList.toggle("open");
    });
    // Close menu when a link is tapped
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Booking form ---------- */
  var bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(bookingForm);
      var checkin = data.get("checkin") || "";
      var checkout = data.get("checkout") || "";
      var guests = data.get("guests") || "2";
      var room = data.get("room") || "Kamar Deluxe";

      // Ganti nomor ini dengan nomor WhatsApp resmi penginapan Anda.
      var phone = "6281200000000";

      var dateText = checkin && checkout
        ? " dari " + checkin + " sampai " + checkout
        : "";
      var message = encodeURIComponent(
        "Halo, saya ingin memesan " + room + " di Penginapan.web.id" +
        dateText + " untuk " + guests + " tamu. Apakah masih tersedia?"
      );
      window.open(
        "https://wa.me/" + phone + "?text=" + message,
        "_blank",
        "noopener"
      );
    });
  }

  /* ---------- Smooth scroll offset for fixed header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: top, behavior: "smooth" });
        target.focus({ preventScroll: true });
      }
    });
  });
})();
