import "./style.css";

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks?.classList.toggle("is-open", !isOpen);
});

navLinks?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navToggle?.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  }
});

// Contact email guidance modal
const CONTACT_EMAIL = "hello@timtim.example";
const contactModal = document.getElementById("contact-modal");
const contactTriggers = document.querySelectorAll("[data-contact-trigger]");
const copyButton = contactModal?.querySelector("[data-contact-copy]");
let lastFocused = null;

function openContact() {
  if (!contactModal) return;
  lastFocused = document.activeElement;
  contactModal.hidden = false;
  document.body.classList.add("no-scroll");
  navToggle?.setAttribute("aria-expanded", "false");
  navLinks?.classList.remove("is-open");
  contactModal.querySelector(".contact-modal-close")?.focus();
}

function closeContact() {
  if (!contactModal || contactModal.hidden) return;
  contactModal.hidden = true;
  document.body.classList.remove("no-scroll");
  if (lastFocused instanceof HTMLElement) lastFocused.focus();
}

contactTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    // Progressive enhancement: only hijack the click when the modal exists
    if (!contactModal) return;
    event.preventDefault();
    openContact();
  });
});

contactModal?.querySelectorAll("[data-contact-close]").forEach((el) => {
  el.addEventListener("click", closeContact);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeContact();
});

copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(CONTACT_EMAIL);
  } catch {
    const node = document.getElementById("contact-email");
    const selection = window.getSelection();
    if (node && selection) {
      const range = document.createRange();
      range.selectNodeContents(node);
      selection.removeAllRanges();
      selection.addRange(range);
      try {
        document.execCommand("copy");
      } catch {
        /* clipboard unavailable */
      }
      selection.removeAllRanges();
    }
  }
  copyButton.textContent = "Copied!";
  copyButton.classList.add("is-copied");
  setTimeout(() => {
    copyButton.textContent = "Copy";
    copyButton.classList.remove("is-copied");
  }, 1600);
});
