const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".from select, .to select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(let currcode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        if(select.id==="box1" && currcode==="INR"){
            newoption.selected=true;
        }
        if(select.id==="box2" && currcode==="USD"){
            newoption.selected=true;
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}
const updateflag=(element)=>{
    let currcode=element.value;
    console.log(currcode);
    let countrycode=countryList[currcode];
    let imgsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=imgsrc;
}   
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amt=amount.value;
    if(amt===""||amt<=0){
        alert("Please enter a valid amount");
        return;
    }
    //console.log(fromcurr.value, tocurr.value);
    const url=`${BASE_URL}/$(fromcurr.value.toLowerCase())/$(tocurr.value.toLowerCase()).json`;
    let respose=await fetch(url);
    console.log(respose);
    if(!respose.ok){
        alert("Something went wrong");
        return;
    }
    let data=await respose.json();
    let rate =data[tocurr.value.toLowerCase()];
    console.log(rate);
    let finalamount=amt*rate;
    console.log(finalamount);
    msg.innerText=`${amt}${fromcurr.value} = ${finalamount} ${tocurr.value}`;
});
