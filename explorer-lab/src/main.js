import "./css/index.css";
import IMask from "imask";

const ccBgColor01 = document.querySelector(".cc-bg-color-01");
const ccBgColor02 = document.querySelector(".cc-bg-color-02");
const ccLogo = document.querySelector(".cc-img-logo");

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

setCardType("visa");
globalThis.setCardType = setCardType;

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
