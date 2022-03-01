const getMobileResult = async () => {
    const inputResult = document.getElementById("mobile-search-input");
    const inputResultText = inputResult.value.toLowerCase();
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputResultText}`;
    const res = await fetch(url);
    const data = await res.json();
    showMobileResult(data.data);
};

// for showing mobile results
const showMobileResult = (mobiles) => {
    const showAllMobiles = document.getElementById("show-all-mobiles");
    mobiles.map((mobile) => {
        console.log(mobile.slug);
        const showSingleMobile = document.createElement("div");
        showSingleMobile.classList.add("col");
        showSingleMobile.innerHTML = `
             <div  class="card ">
                    <img src="${mobile.image}" class="card-img-top w-75 mx-auto"  alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">${mobile.phone_name}</h5>
                        <h6 class="card-title mb-3">${mobile.brand}</h6>
                        <button onclick='showMobileDetails(${mobile.slug})'  class="btn btn-outline-primary">Show details</button>
                    </div>
                </div>
        `;
        showAllMobiles.appendChild(showSingleMobile);
    });
};

const showMobileDetails = (mobileId) => {
    url = `https://openapi.programming-hero.com/api/phone/${mobileId}`;
    console.log(url);
};
