const translations = {
  de: {
    role: "Senior iOS-Entwickler",
    "location-prefix": "Ansässig in",
    "cv-title": "Lebenslauf",
    "part0-label": "Part 0",
    "part0-title": "Ausbildung & Studium",
    "part0-1": "2005–2008 — Abitur in Baden-Württemberg",
    "part0-2": "2008–2009 — Diplom-Informatik an der Uni Stuttgart, beendet, um in ein anderes Bundesland umzuziehen",
    "part0-3": "2009–2011 — Bachelor-Informatik an der RWTH, beendet zugunsten der Ausbildung (Nebenjob Hiwi als PHP-Entwickler)",
    "part1-title": "Fachinformatiker & Full-Stack",
    "part1-1": "2011–2014 — Ausbildung zum Fachinformatiker Anwendungsentwicklung",
    "part1-2": "2014–2015 — Entwickler für Java-Backends und iOS (Objective-C/Swift)",
    "part2-title": "iOS-Entwicklung",
    "part2-1": "Juli 2015 — Wechsel nach Leverkusen als iOS-Entwickler",
    "part2-2": "September 2015 — Auszeit wegen Depressionen; später Diagnose Autismus (Asperger-Syndrom)",
    "part2-3": "Juli 2017 — Rückkehr zur Arbeit als iOS-Entwickler",
    "part3-label": "RTL & Bedrock Streaming",
    "part3-title": "Senior Native iOS",
    "part3-1": "September 2021 — Senior Developer Native (iOS) bei der RTL Technology GmbH, Köln",
    "part3-2": "September 2023 — Mobile Office und Umzug nach Böblingen",
    "part3-3": "September 2025 — Ausgliederung der Streaming-Sparte aus der RTL Technology GmbH in die neu gegründete RTL Streaming Deutschland GmbH",
    "part3-4": "Dezember 2025 — Umbenennung zur Bedrock Streaming Deutschland GmbH und Wechsel ins Bedrock Core Team (gemeinsame Mobile-Plattform)",
    "contact-title": "Kontakt",
    "contact-lead-before": "Eine kurze Mail an ",
    "contact-lead-after": " genügt.",
    "contact-email-code": "\\(vorname)@\\(nachname).cc",
  },
  en: {
    role: "Senior iOS Developer",
    "location-prefix": "Based in",
    "cv-title": "Curriculum Vitae",
    "part0-label": "Part 0",
    "part0-title": "Education",
    "part0-1": "2005–2008 — Abitur (university entrance qualification) in Baden-Württemberg",
    "part0-2": "2008–2009 — Diplom computer science at the University of Stuttgart, ended in order to relocate to another federal state",
    "part0-3": "2009–2011 — Bachelor computer science at RWTH Aachen, ended to begin an IT apprenticeship (part-time PHP developer)",
    "part1-title": "IT Specialist & Full-Stack",
    "part1-1": "2011–2014 — Completed apprenticeship as IT specialist in application development",
    "part1-2": "2014–2015 — Developer for Java backends and iOS (Objective-C/Swift)",
    "part2-title": "iOS Development",
    "part2-1": "July 2015 — Moved to Leverkusen as iOS developer",
    "part2-2": "September 2015 — Time off due to depression; later diagnosed with autism (Asperger's syndrome)",
    "part2-3": "July 2017 — Return to work as iOS developer",
    "part3-label": "RTL & Bedrock Streaming",
    "part3-title": "Senior Native iOS",
    "part3-1": "September 2021 — Senior Developer Native (iOS) at RTL Technology GmbH, Cologne",
    "part3-2": "September 2023 — Remote work and move to Böblingen",
    "part3-3": "September 2025 — Streaming division spun off from RTL Technology GmbH into the newly formed RTL Streaming Deutschland GmbH",
    "part3-4": "December 2025 — Company renamed to Bedrock Streaming Deutschland GmbH and move to the Bedrock Core Team (shared mobile platform)",
    "contact-title": "Contact",
    "contact-lead-before": "A short email to ",
    "contact-lead-after": " is all it takes.",
    "contact-email-code": "\\(firstname)@\\(lastname).cc",
  },
};

const STORAGE_KEY = "cv-lang";

function setLanguage(lang) {
  const strings = translations[lang];
  if (!strings) return;

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (strings[key] !== undefined) {
      el.textContent = strings[key];
    }
  });

  const photo = document.querySelector(".hero__photo");
  if (photo) {
    photo.alt = photo.dataset[`alt${lang === "de" ? "De" : "En"}`] || "";
  }

  document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  });

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
}

function initLanguage() {
  let lang = "de";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "de") lang = stored;
  } catch {
    /* ignore */
  }

  const browser = navigator.language?.toLowerCase();
  if (!localStorage.getItem(STORAGE_KEY) && browser?.startsWith("en")) {
    lang = "en";
  }

  setLanguage(lang);

  document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
}

initLanguage();
