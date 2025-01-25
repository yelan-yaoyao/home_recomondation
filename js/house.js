fetch('/home_recomondation/pages/navbar.html')
.then(response => response.text())
.then(data => {
    document.getElementById('navbar').innerHTML = data;
})
.catch(error => console.error('Error loading navbar:', error));


document.getElementById("filter-button").addEventListener("click", () => {
    const maxPrice = document.getElementById("price").value;
    const state = document.getElementById("state").value.toLowerCase();
    const city = document.getElementById("city").value.toLowerCase();

    fetch("..//pages/house.json")
        .then(response => response.json())
        .then(data => {
            const filteredHouses = data.filter(house => {
                return (
                    (!maxPrice || house.price <= maxPrice) &&
                    (!state || house.state.toLowerCase().includes(state)) &&
                    (!city || house.city.toLowerCase().includes(city))
                );
            });

            const houseList = document.getElementById("house-list");
            houseList.innerHTML = "";

            filteredHouses.forEach(house => {
                const houseItem = document.createElement("div");
                houseItem.className = "house-item";
                houseItem.innerHTML = `
                    <img src="${house.image}" alt="House">
                    <div class="description">
                        <p>${house.description}</p>
                        <p><strong>Price:</strong> $${house.price}</p>
                        <p><strong>Location:</strong> ${house.city}, ${house.state}</p>
                    </div>
                `;
                 // Add event listener for clicking a house item
                 houseItem.addEventListener("click", () => {
                    showHouseDetails(house);
                });

                houseList.appendChild(houseItem);
            });
        });
});
function showHouseDetails(house) {
    // Create a modal container
    const modal = document.createElement("div");
    modal.className = "modal";

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <div class="modal-images">
                <img src="${house.image}" alt="House Image">
            </div>
            <div class="modal-description">
                <h2>${house.description}</h2>
                <p><strong>Price:</strong> $${house.price}</p>
                <p><strong>Location:</strong> ${house.city}, ${house.state}</p>
                <p><strong>Additional Info:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod.</p>
                <button id="order-now">Order Now</button>
            </div>
        </div>
    `;

    // Add close button functionality
    modal.querySelector(".close-button").addEventListener("click", () => {
        document.body.removeChild(modal);
    });

    // Append modal to the body
    document.body.appendChild(modal);
}


//the state and city stuff
const stateCityMap = {
    California: ["LosAngeles", "San Francisco", "San Diego"],
    NewYork: ["Houston", "NewYork", "Austin"],
    
    Florida: ["Los Angeles", "San Francisco", "San Diego","Miami"]
  };

  const stateSelect = document.getElementById("state");
  const citySelect = document.getElementById("city");

  // Event listener for state selection
  stateSelect.addEventListener("change", function () {
    const selectedState = stateSelect.value;

    // Clear existing city options
    citySelect.innerHTML = '<option value="">--Select City--</option>';

    // Populate cities based on selected state
    if (selectedState && stateCityMap[selectedState]) {
      stateCityMap[selectedState].forEach(city => {
        const option = document.createElement("option");
        option.value = city.toLowerCase().replace(/ /g, "-");
        option.textContent = city;
        citySelect.appendChild(option);
      });
    }
  });