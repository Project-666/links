const currentUrl = new URL(window.location.href);
const langParam = currentUrl.searchParams.get("hl");
const webLang = document.documentElement.lang;
let autoTranslate = true;
const widgetCss =
  "#google_translate_element,.skiptranslate{display:none;}body{top:0px !important;}";
const elStyle = document.createElement("style");
elStyle.classList.add("translateCss");
elStyle.textContent = widgetCss;
document.head.appendChild(elStyle);

function addHreflang() {
  const baseUrl = currentUrl.origin + currentUrl.pathname;

  const languages = [
    { lang: "en", url: baseUrl + "?hl=en" },
    { lang: "nl", url: baseUrl + "?hl=nl" },
    { lang: "fr", url: baseUrl + "?hl=fr" },
    { lang: "ja", url: baseUrl + "?hl=ja" },
    { lang: "ru", url: baseUrl + "?hl=ru" },
    { lang: "id", url: baseUrl + "?hl=in" },
  ];

  languages.forEach((language) => {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = language.lang;
    link.href = language.url;
    document.head.appendChild(link);
  });
}

if (!document.getElementById("google_translate_element")) {
  const elDiv = document.createElement("div");
  elDiv.id = "google_translate_element";
  document.body.appendChild(elDiv);
}

if (!window.translateScript) {
  window.translateScript = document.createElement("script");
  translateScript.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(translateScript);
}

function getUserLang() {
  const userLang = navigator.language || navigator.userLanguage;
  return userLang.split("-")[0];
}

// function updateUrlLangParam(webLang, langParam) {
//   if (langParam === "id") {
//     return;
//   } else if (langParam !== "id" && langParam !== webLang) {
//     currentUrl.searchParams.set("hl", webLang);
//     if (window.location.href !== currentUrl.href) {
//       window.history.replaceState({}, "", currentUrl);

//       // Update content within the div with class 'mainC'
//       const contentElement = document.querySelector('.mainC');
//       if (contentElement) {
//         const newUrl = currentUrl.href;
//         fetch(newUrl)
//           .then(response => response.text())
//           .then(html => {
//             const parser = new DOMParser();
//             const newDoc = parser.parseFromString(html, 'text/html');
//             const newContent = newDoc.querySelector('.mainC'); // Asumsi kelas 'mainC' juga ada di halaman baru
//             if (newContent) {
//               contentElement.innerHTML = newContent.innerHTML;
//             }
//           })
//           .catch(error => {
//             console.error("Error fetching content:", error);
//           });
//       } else {
//         console.warn("Element with class 'mainC' not found. Update logic might not work as expected.");
//       }
//     }
//   }
// }

window.googleTranslateElementInit = function () {
  if (currentUrl.searchParams.has("hl")) {
    autoTranslate = false;
  }

  try {
    const lang = autoTranslate ? getUserLang() : langParam || webLang;
    new google.translate.TranslateElement(
      {
        pageLanguage: "auto",
        includedLanguages: lang,
      },
      "google_translate_element"
    );

    setTimeout(() => {
      const selectElement = document.querySelector(
        "#google_translate_element select"
      );
      if (selectElement) {
        selectElement.value = lang;
        selectElement.dispatchEvent(new Event("change"));
      }
    }, 1000);

    // if (autoTranslate) {
    //   setTimeout(() => {
    //     const webLang = document.documentElement.lang;
    //     updateUrlLangParam(webLang, langParam);
    //     addHreflang();
    //   }, 1500);
    // }
  } catch (error) {
    console.error("Error initializing Google Translate:", error);
  }
};

if (!autoTranslate && langParam) {
  window.googleTranslateElementInit();
}
