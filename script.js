document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("interestForm");
  const resultBox = document.getElementById("resultBox");
  const resultText = document.getElementById("resultText");
  const historyList = document.getElementById("historyList");
  const languageSwitcher = document.getElementById("languageSwitcher");
  const clearBtn = document.getElementById("clearHistoryBtn");

  const labels = {
    en: {
      title: "Simple Interest Calculator",
      principal: "Principal Amount:",
      principalWord: "Principal",
      interestWord: "Interest",
      durationWord: "Duration",
      rate: "Rate of Interest (%):",
      rateType: "Rate Type:",
      time: "Time Period:",
      timeUnit: "Time Unit:",
      currency: "Currency:",
      calculate: "Calculate",
      result: "Result",
      simpleInterest: "Simple Interest",
      total: "Payable Amount",
      history: "Calculation History",
      clear: "Clear History",
      perMonth: "Per Month",
      perAnnum: "Per Annum",
      years: "Years",
      months: "Months",
      days: "Days"
    },
    hi: {
      title: "सरल ब्याज कैलकुलेटर",
      principal: "मूलधन राशि:",
      principalWord: "मूलधन",
      interestWord: "ब्याज",
      durationWord: "अवधि",
      rate: "ब्याज दर (%):",
      rateType: "ब्याज प्रकार:",
      time: "समय अवधि:",
      timeUnit: "समय इकाई:",
      currency: "मुद्रा:",
      calculate: "गणना करें",
      result: "परिणाम",
      simpleInterest: "सरल ब्याज",
      total: "देय राशि",
      history: "गणना इतिहास",
      clear: "इतिहास साफ़ करें",
      perMonth: "प्रति माह",
      perAnnum: "प्रति वर्ष",
      years: "वर्ष",
      months: "महीने",
      days: "दिन"
    },
    kn: {
      title: "ಸರಳ ಬಡ್ಡಿ ಲೆಕ್ಕಪತ್ರ",
      principal: "ಪ್ರಮುಖ ಮೊತ್ತ:",
      principalWord: "ಮೂಲಧನ",
      interestWord: "ಬಡ್ಡಿ",
      durationWord: "ಅವಧಿ",
      rate: "ಬಡ್ಡಿದರ (%):",
      rateType: "ಬಡ್ಡಿ ಪ್ರಕಾರ:",
      time: "ಕಾಲಾವಧಿ:",
      timeUnit: "ಕಾಲ ಘಟಕ:",
      currency: "ಕರೆನ್ಸಿ:",
      calculate: "ಲೆಕ್ಕ ಹಾಕು",
      result: "ಫಲಿತಾಂಶ",
      simpleInterest: "ಸರಳ ಬಡ್ಡಿ",
      total: "ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ",
      history: "ಲೆಕ್ಕ ಇತಿಹಾಸ",
      clear: "ಇತಿಹಾಸ ತೆರವುಗೊಳಿಸಿ",
      perMonth: "ಪ್ರತಿ ತಿಂಗಳು",
      perAnnum: "ವಾರ್ಷಿಕ",
      years: "ವರ್ಷಗಳು",
      months: "ತಿಂಗಳುಗಳು",
      days: "ದಿನಗಳು"
    },
    te: {
      title: "సాధారణ వడ్డీ గణన",
      principal: "ప్రధాన మొత్తం:",
      principalWord: "ప్రధాన మొత్తం",
      interestWord: "వడ్డీ",
      durationWord: "వ్యవధి",
      rate: "వడ్డీ రేటు (%):",
      rateType: "వడ్డీ రకం:",
      time: "సమయ వ్యవధి:",
      timeUnit: "సమయ యూనిట్:",
      currency: "కరెన్సీ:",
      calculate: "లెక్కించండి",
      result: "ఫలితం",
      simpleInterest: "సాధారణ వడ్డీ",
      total: "చెల్లించాల్సిన మొత్తం",
      history: "లెక్కింపు చరిత్ర",
      clear: "చరిత్రను క్లియర్ చేయండి",
      perMonth: "ప్రతి నెల",
      perAnnum: "ప్రతి సంవత్సరం",
      years: "సంవత్సరాలు",
      months: "నెలలు",
      days: "రోజులు"
    }
  };

  function updateLanguage(lang) {
    const l = labels[lang];
    document.getElementById("titleText").textContent = l.title;
    document.getElementById("labelPrincipal").textContent = l.principal;
    document.getElementById("labelRate").textContent = l.rate;
    document.getElementById("labelRateType").textContent = l.rateType;
    document.getElementById("optionMonthly").textContent = l.perMonth;
    document.getElementById("optionAnnually").textContent = l.perAnnum;
    document.getElementById("labelTime").textContent = l.time;
    document.getElementById("labelTimeUnit").textContent = l.timeUnit;
    document.getElementById("optionYears").textContent = l.years;
    document.getElementById("optionMonths").textContent = l.months;
    document.getElementById("optionDays").textContent = l.days;
    document.getElementById("labelCurrency").textContent = l.currency;
    document.getElementById("buttonCalculate").textContent = l.calculate;
    document.getElementById("resultLabel").textContent = l.result;
    document.getElementById("historyLabel").textContent = l.history;
    document.getElementById("clearHistoryBtn").textContent = l.clear;
  }

  // Apply selected language
  languageSwitcher.addEventListener("change", () => updateLanguage(languageSwitcher.value));
  updateLanguage("en");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const principal = parseFloat(document.getElementById("principal").value);
    const rate = parseFloat(document.getElementById("rate").value);
    const rateType = document.getElementById("rateType").value;
    let time = parseFloat(document.getElementById("time").value);
    const timeUnit = document.getElementById("timeUnit").value;
    const currency = document.getElementById("currency").value;

    if ([principal, rate, time].some(isNaN)) {
      resultText.textContent = "⚠️ Please enter valid numeric values.";
      resultBox.style.color = "red";
      return;
    }

    if (timeUnit === "months") time = time / 12;
    if (timeUnit === "days") time = time / 365;

    let adjustedRate = rateType === "monthly" ? rate * 12 : rate;

    const interest = (principal * adjustedRate * time) / 100;
    const total = principal + interest;

    const lang = languageSwitcher.value;
    const l = labels[lang];

    // Show result with localized label
    resultText.innerHTML = `
      ${l.simpleInterest}: <strong>${currency}${interest.toFixed(2)}</strong><br/>
      ${l.total}: <strong>${currency}${total.toFixed(2)}</strong>
    `;
    resultBox.style.color = "#1c3faa";

    // Format duration text in months or years
    let durationText = "";
    if (time < 1) {
      const months = Math.round(time * 12);
      durationText = `${months} ${l.months}`;
    } else {
      const years = parseFloat(time.toFixed(2));
      durationText = `${years} ${l.years}`;
    }

    // Construct localized history entry
    const entry = `${l.principalWord}: ${currency}${principal}, ${l.interestWord}: ${currency}${interest.toFixed(2)}, ${l.durationWord}: ${durationText}`;
    const el = document.createElement("div");
    el.className = "history-entry";
    el.textContent = entry;
    historyList.prepend(el);

    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.unshift(entry);
    if (history.length > 10) history = history.slice(0, 10);
    localStorage.setItem("history", JSON.stringify(history));
  });

  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("history");
    historyList.innerHTML = "";
  });

  // Load saved history on startup
  const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
  savedHistory.forEach(entry => {
    const el = document.createElement("div");
    el.className = "history-entry";
    el.textContent = entry;
    historyList.appendChild(el);
  });
});
