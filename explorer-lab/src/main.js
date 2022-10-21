import "./css/index.css";
import IMask from "imask";

const ccBgColor01 = document.querySelector(".cc-bg-color-01");
const ccBgColor02 = document.querySelector(".cc-bg-color-02");
const ccLogo = document.querySelector(".cc-img-logo");
const ccSecurity = document.querySelector(".cc-security .value");
const ccNumber = document.querySelector(".cc-number");
const ccDate = document.querySelector(".cc-expiration .value");
const ccHolder = document.querySelector(".cc-holder .value");

const setCardType = (type) => {
	const colors = {
		visa: ["#436D99", "#2D57F2"],
		mastercard: ["#DF6F29", "C69347"],
		default: ["black", "gray"],
	};

	ccBgColor01.setAttribute("fill", colors[type][0]);
	ccBgColor02.setAttribute("fill", colors[type][1]);
	ccLogo.setAttribute("src", `cc-${type}.svg`);
};

const securityCode = document.querySelector("#security-code");

const securityCodePattern = {
	mask: "0000",
};

const securityCodeMasked = IMask(securityCode, securityCodePattern);

const expirationDate = document.querySelector("#expiration-date");

const expirationDatePattern = {
	mask: "MM{/}YY",
	blocks: {
		YY: {
			mask: IMask.MaskedRange,
			from: new Date().getFullYear().toString().slice(2),
			to: (new Date().getFullYear() + 10).toString().slice(2),
		},
		MM: {
			mask: IMask.MaskedRange,
			from: 1,
			to: 12,
		},
	},
};

const expirationDateMasked = IMask(expirationDate, expirationDatePattern);

const cardNumber = document.querySelector("#card-number");

const cardNumberPattern = {
	mask: [
		{
			mask: "0000 0000 0000 0000",
			cardtype: "visa",
			regex: /^4\d{0,15}/,
		},
		{
			mask: "0000 0000 0000 0000",
			cardtype: "mastercard",
			regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
		},
		{
			mask: "0000 0000 0000 0000",
			cardtype: "default",
		},
	],
	dispatch: (appended, dynamicMasked) => {
		const number = (dynamicMasked.value + appended).replace(/\D/g, "");
		const foundMask = dynamicMasked.compiledMasks.find((item) =>
			number.match(item.regex),
		);

		return foundMask;
	},
};

const cardNumberMasked = IMask(cardNumber, cardNumberPattern);

const addButton = document.querySelector("#add-card");
const cardHolder = document.querySelector("#card-holder");

addButton.addEventListener("click", (event) => {
	event.preventDefault();

	if (
		securityCodeMasked.value !== "" ||
		cardNumberMasked.value !== "" ||
		expirationDateMasked.value !== "" ||
		cardHolder.value !== ""
	) {
		alert("Cartão adicionado com sucesso!");
		securityCodeMasked.value = "";
		cardNumberMasked.value = "";
		expirationDateMasked.value = "";
		updateCardHolder("");
		return;
	}
	alert("Preencha todos os campos!");
});

cardHolder.addEventListener("input", () => updateCardHolder(cardHolder.value));

const updateCardHolder = (holder) => {
	ccHolder.innerText = holder !== "" ? holder : "FULANO DA SILVA";
};

securityCodeMasked.on("accept", () =>
	updateSecurityCode(securityCodeMasked.value),
);

const updateSecurityCode = (code) => {
	ccSecurity.innerText = code.length > 0 ? code : "123";
};

cardNumberMasked.on("accept", () => {
	const cartType = cardNumberMasked.masked.currentMask.cardtype;
	setCardType(cartType);
	updateCardNumber(cardNumberMasked.value);
});

const updateCardNumber = (number) => {
	ccNumber.innerText = number.length > 0 ? number : "1234 5678 9012 3456";
};

expirationDateMasked.on("accept", () =>
	updateExpirationDate(expirationDateMasked.value),
);

const updateExpirationDate = (date) => {
	ccDate.innerText = date.length > 0 ? date : "02/32";
};

globalThis.setCardType = setCardType;
