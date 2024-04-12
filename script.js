const BASE_URL = "https://cors-anywhere.herokuapp.com/https://www.amdoren.com/api/currency.php?api_key=5VTYkVxArFtXp4DKpvtDA2TpEixsSP";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg =  document.querySelector(".msg");

window.addEventListener("load", () => {
    updateExchangerate();
});


for (let select of dropdowns){
    for(currencyCode in countryList){
        let codeOption = document.createElement("option");
        codeOption.innerText = currencyCode;
        codeOption.value = currencyCode;
        if (select.name === "from" && currencyCode === "USD"){
            codeOption.selected = "selected";
        }
        else if (select.name === "to" && currencyCode === "INR"){
            codeOption.selected = "selected";
        }
        select.append(codeOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangerate();
    
});

const updateExchangerate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}&from=${fromcurr.value}&to=${tocurr.value}`;

    let response = await fetch(URL);
    let data = await response.json(); // Corrected typo here
    let rate = data["amount"];

    let finalAmount = amtval * rate;
    msg.innerText = `${amtval} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
};
