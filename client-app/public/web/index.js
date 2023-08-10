const linkRegisterKRU = document.querySelector("#link-register-kru");

const api_url = "http://coms.kru.ac.th/comsci/api/systemsetting";

async function getAPI(url) {
  const response = await fetch(url);

  return await response.json();
}

async function displayPortfolioData() {
  var setting = await getAPI(api_url);
 
  linkRegisterKRU.href = setting.registerUrl;
}

displayPortfolioData();