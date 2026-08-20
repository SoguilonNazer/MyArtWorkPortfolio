// =========================================================
// NAZER O. SOGUILON — CREATIVE PORTFOLIO
// =========================================================

(function () {
  "use strict";

  /* ---------- ARTWORK DATA ---------- */
  // Simple sequential labels, as no titles were provided.
  const ARTWORKS = [
    { src: "assets/images/artwork-01.jpg", label: "Artwork 01" },
    { src: "assets/images/artwork-02.jpg", label: "Artwork 02" },
    { src: "assets/images/artwork-03.jpg", label: "Artwork 03" },
    { src: "assets/images/artwork-04.jpg", label: "Artwork 04" },
    { src: "assets/images/artwork-05.jpg", label: "Artwork 05" },
    { src: "assets/images/artwork-06.jpg", label: "Artwork 06" },
    { src: "assets/images/artwork-07.jpg", label: "Artwork 07" },
    { src: "assets/images/artwork-08.jpg", label: "Artwork 08" },
    { src: "assets/images/artwork-09.jpg", label: "Artwork 09" },
    { src: "assets/images/artwork-10.jpg", label: "Artwork 10" },
    { src: "assets/images/artwork-11.jpg", label: "Artwork 11" },
    { src: "assets/images/artwork-12.jpg", label: "Artwork 12" },
    { src: "assets/images/artwork-13.jpg", label: "Artwork 13" },
    { src: "assets/images/artwork-14.jpg", label: "CamaruDance Festival 01" },
    { src: "assets/images/artwork-15.jpg", label: "CamaruDance Festival 02" }
  ];

  /* ---------- BUILD GALLERY ---------- */
  const gallery = document.getElementById("gallery");

  ARTWORKS.forEach((art, i) => {
    const btn = document.createElement("button");
    btn.className = "gallery-item reveal";
    // Make every 5th item a featured/larger tile for visual rhythm
    if (i % 5 === 0) btn.classList.add("featured");
    btn.setAttribute("data-index", i);
    btn.setAttribute("aria-label", "Open " + art.label);

    const img = document.createElement("img");
    img.src = art.src;
    img.alt = art.label;
    img.loading = "lazy";

    const label = document.createElement("span");
    label.className = "g-label";
    label.textContent = art.label;

    btn.appendChild(img);
    btn.appendChild(label);
    gallery.appendChild(btn);
  });

  /* ---------- LIGHTBOX ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  let currentIndex = 0;
  let lastFocused = null;

  function openLightbox(index) {
    currentIndex = index;
    const art = ARTWORKS[currentIndex];
    lightboxImg.src = art.src;
    lightboxImg.alt = art.label;
    lightboxCaption.textContent = art.label;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lastFocused = document.activeElement;
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % ARTWORKS.length;
    openLightboxUpdate();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + ARTWORKS.length) % ARTWORKS.length;
    openLightboxUpdate();
  }

  function openLightboxUpdate() {
    const art = ARTWORKS[currentIndex];
    lightboxImg.src = art.src;
    lightboxImg.alt = art.label;
    lightboxCaption.textContent = art.label;
  }

  gallery.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (!item) return;
    openLightbox(parseInt(item.getAttribute("data-index"), 10));
  });

  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

  /* ---------- MOBILE MENU ---------- */
  const menuBtn = document.getElementById("menu-btn");
  const mobileNav = document.getElementById("mobile-nav");

  menuBtn.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuBtn.classList.toggle("open", isOpen);
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  mobileNav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuBtn.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

})();
