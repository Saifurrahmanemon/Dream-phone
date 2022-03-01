const getMobileResult = async () => {
    const inputResult = document.getElementById("mobile-search-input");
    const inputResultText = inputResult.value.toLowerCase();
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputResultText}`;
    const res = await fetch(url);
    const data = await res.json();
    showMobileResult(data.data);
    inputResult.value = "";
};

// for showing mobile results
const showMobileResult = (mobiles) => {
    const showAllMobiles = document.getElementById("show-all-mobiles");
    // for resetting result
    showAllMobiles.textContent = "";
    mobiles.map((mobile) => {
        // destructuring elements from mobile
        const { phone_name, brand, slug, image } = mobile;
        const showSingleMobile = document.createElement("div");
        showSingleMobile.classList.add("col");
        showSingleMobile.innerHTML = `
             <div  class="card shadow p-3 mb-5 bg-white rounded">
                    <img src="${image}" class="card-img-top w-75 mx-auto"  alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">${phone_name}</h5>
                        <h6 class="card-title mb-3">${brand}</h6>
                        <button onclick="getMobileDetails('${slug}')"  class="btn btn-outline-primary">Show details</button>
                    </div>
                </div>
        `;
        showAllMobiles.appendChild(showSingleMobile);
    });
};
// receiving mobile details api
const getMobileDetails = async (mobileId) => {
    url = ` https://openapi.programming-hero.com/api/phone/${mobileId}`;
    const res = await fetch(url);
    const data = await res.json();
    showMobileDetails(data.data);
};

// for showing specific mobile details
const showMobileDetails = (details) => {
    const getMobileDetailsDiv = document.getElementById("mobile-details");
    const showMobileDetail = document.createElement("div");
    const {
        name,
        image,
        brand,
        releaseDate,
        mainFeatures: { storage, displaySize, chipSet, memory, sensors },
    } = details;
    showMobileDetail.classList.add(
        "card",
        "my-3",
        "shadow",
        "mb-5",
        "bg-white",
        "rounded"
    );

    showMobileDetail.innerHTML = `
    <img class="card-img-top w-50 mx-auto pt-2" src="${image}" alt="Card image cap">
     <div class="card-body">
       <h3 class="card-title text-center">${name}</h3>
       <h6 class="card-title text-center">${
           releaseDate ? releaseDate : "No release date found"
       }</h6>
       <h4 class="my-3">Main Features</h4>
        <div class ="text-feature">
        <p><span>Storage:</span> ${storage}</p>
        <p> <span>Display Size:</span> ${displaySize}</p>
        <p> <span>Chip Set:</span> ${chipSet}</p>
        <p> <span>Memory:</span> ${memory}</p>
        </div>
     </div>
    `;
    getMobileDetailsDiv.appendChild(showMobileDetail);
};
