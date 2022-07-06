function attachMeasurements() {
    console.log('Terms accepted - Plausible.js analytics added');
    var plausibleScript = document.createElement("script");
    plausibleScript.setAttribute("defer", "true");
    plausibleScript.setAttribute("data-domain", "livingnorway.no");
    plausibleScript.setAttribute("src", "https://plausible.io/js/plausible.js");
    document.head.appendChild(plausibleScript);
}