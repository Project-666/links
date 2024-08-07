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

window.googleTranslateElementInit = function () {
  if (currentUrl.searchParams.has("hl")) {
    autoTranslate = false;
  }

  try {
    const lang = autoTranslate ? getUserLang() : langParam || webLang;
    new google.translate.TranslateElement(
      {
        pageLanguage: "auto",
        includedLanguages: lang
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
  } catch (error) {
    console.error("Error initializing Google Translate:", error);
  }
};

if (!autoTranslate && langParam) {
  window.googleTranslateElementInit();
}
