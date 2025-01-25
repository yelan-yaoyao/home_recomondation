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
                houseList.appendChild(houseItem);
            });
        });
});
