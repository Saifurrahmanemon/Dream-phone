const getMobileResult = async () => {
    const inputResult = document.getElementById("mobile-search-input");
    const inputResultText = inputResult.value.toLowerCase();

    // show Loader
    toggleLoader("inline-block");

    try {
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputResultText}`;
        const res = await fetch(url);
        const data = await res.json();
        showMobileResult(data.data);
    } catch (error) {
        console.log(error);
    }
    inputResult.value = "";
};

// for showing mobile results
const showMobileResult = (mobiles) => {
    const showAllMobiles = document.getElementById("show-all-mobiles");
    const errorText = document.getElementById("no-result-found");
    const getMobileDetailsDiv = document.getElementById("mobile-details");
    // this will show first 20 mobiles if available
    const displayMobiles = mobiles.slice(0, 20);
    // for resetting result and details view
    showAllMobiles.textContent = "";
    getMobileDetailsDiv.textContent = "";
    // show error massage when input is not valid
    if (mobiles.length == 0) {
        errorText.style.display = "block";
        //hide loader
        toggleLoader("none");
    }

    displayMobiles?.forEach((mobile) => {
        errorText.style.display = "none";
        //destructuring elements
        const { phone_name, brand, slug, image } = mobile;
        const showSingleMobile = document.createElement("div");
        showSingleMobile.classList.add("col");
        showSingleMobile.innerHTML = `
             <div  class="card h-100 shadow pt-2 mb-5 bg-white rounded">
                    <img src="${image}" class="card-img-top w-75 mx-auto"  alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">${phone_name}</h5>
                        <p class="card-title mb-3">${brand}</p>
                        <button onclick="getMobileDetails('${slug}')"  class="btn btn-outline-primary rounded ">Show details</button>
                    </div>
                </div>
        `;
        showAllMobiles.appendChild(showSingleMobile);
        // hide Loader
        toggleLoader("none");
    });
};
// receiving mobile details api
const getMobileDetails = async (mobileId) => {
    url = ` https://openapi.programming-hero.com/api/phone/${mobileId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        showMobileDetails(data.data);
    } catch (error) {
        console.log(error);
    }
};

// for showing specific mobile details
const showMobileDetails = (details) => {
    const getMobileDetailsDiv = document.getElementById("mobile-details");
    getMobileDetailsDiv.textContent = "";

    const showMobileDetail = document.createElement("div");
    const {
        name,
        image,
        releaseDate,
        mainFeatures: { storage, displaySize, chipSet, memory, sensors },
    } = details;

    //adding class to showMobileDetail card
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
       <h3 class="card-title text-center">Name: ${name}</h3>
       <h6 class="card-title text-center"> Release Date: ${
           releaseDate ? releaseDate : "No release date found"
       }</h6>
       <h4 class="my-3">Main Features:</h4>
        <div class ="text-feature">
        <p><span>Storage:</span> ${storage}</p>
        <p> <span>Display Size:</span> ${displaySize}</p>
        <p> <span>Chip Set:</span> ${chipSet}</p>
        <p> <span>Memory:</span> ${memory}</p>
        </div>
        <div>
        <h4 class="mt-2">Sensors: </h4>
        ${sensors?.map((item) => `<p class='text-feature' >${item}</p>`)}
        </div>
        <div>
        <h4>Others: </h4>
        <div class ="text-feature">
        ${
            details.others
                ? `
         <p><span>WLAN: </span> ${
             details.others.WLAN ? details.others.WLAN : "Not Found"
         }</p>
        <p> <span>Bluetooth:</span> ${
            details.others.Bluetooth ? details.others.Bluetooth : "Not Found"
        }</p>
        <p> <span>GPS:</span> ${
            details.others.GPS ? details.others.GPS : "Not Found"
        }</p>
        <p> <span>NFC:</span> ${
            details.others.NFC ? details.others.NFC : "Not Found"
        }</p>
        <p> <span>Radio:</span> ${
            details.others.Radio ? details.others.Radio : "Not Found"
        }</p>
        <p> <span>USB:</span> ${
            details.others.USB ? details.others.USB : "Not Found"
        }</p>`
                : "Extra information is not available"
        }
        </div>
        </div>
     </div>
    `;
    getMobileDetailsDiv.appendChild(showMobileDetail);
};

// for switching between display style
const toggleLoader = (displayStyle) => {
    const loader = document.getElementById("loader");
    loader.style.display = displayStyle;
};
