// Kode Pos Indonesia by Abengkris (abengkris.com)

async function getProvinces() {
    try {
        const response = await fetch("https://links.abengkris.com/widget/kodepos/provinces.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const provinces = await response.json();
        return provinces;
    } catch (error) {
        console.error("Error loading provinces:", error);
        return [];
    }
}

async function getCities() {
    try {
        const response = await fetch("https://links.abengkris.com/widget/kodepos/cities.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const cities = await response.json();
        return cities;
    } catch (error) {
        console.error("Error loading cities:", error);
        return [];
    }
}

async function getDistricts() {
    try {
        const response = await fetch("https://links.abengkris.com/widget/kodepos/districts.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const districts = await response.json();
        return districts;
    } catch (error) {
        console.error("Error loading districts:", error);
        return [];
    }
}

async function getSubDistricts() {
    try {
        const response = await fetch("https://links.abengkris.com/widget/kodepos/subDistricts.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const subDistricts = await response.json();
        return subDistricts;
    } catch (error) {
        console.error("Error loading subDistricts:", error);
        return [];
    }
}

async function getPostalCodes() {
    try {
        const response = await fetch("https://links.abengkris.com/widget/kodepos/postalCodes.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const postalCodes = await response.json();
        return postalCodes;
    } catch (error) {
        console.error("Error loading postalCodes:", error);
        return [];
    }
}

const errContainer = document.getElementById("error");
const errorMessage = document.getElementById("error-message");

function handleSearch() {
    const cityName = document.getElementById("search-input").value.trim();
    if (cityName) {
        const newUrl = `/p/kode-pos-indonesia.html?kota=${encodeURIComponent(cityName)}`;
        window.location.href = newUrl;
    } else {
        errContainer.style.display = "block";
        errorMessage.textContent =
            "*Masukkan nama kota untuk mencari kode pos.";
    }
}

async function main() {
    const loadingElement = document.getElementById("loading");
    const cityEl = document.getElementById("city-name");
    const provEl = document.getElementById("prov-name");
    const postalCodesTable = document.getElementById("postal-codes-table");
    const tableId = document.getElementById("table");
    const infoId = document.getElementById("info");
    const zipCount = document.getElementById("zipCount");

    try {
        loadingElement.style.display = "block";
        const provinces = await getProvinces();
        const cities = await getCities();
        const districts = await getDistricts();
        const subDistricts = await getSubDistricts();
        const postalCodes = await getPostalCodes();
        postalCodesTable.innerHTML = "";

        function getDistrictsByCity(city_id) {
            return districts.filter(district => district.city_id === city_id);
        }

        function getSubDistrictsByDistrict(dis_id) {
            return subDistricts.filter(
                subDistrict => subDistrict.dis_id === dis_id
            );
        }

        function getPostalCodesByCity(city_id) {
            return postalCodes.filter(
                postalCode => postalCode.city_id === city_id
            );
        }

        function updateTitle(newTitle) {
            document.title = newTitle;
        }

        document.getElementById("prov-count").innerHTML = provinces.length;
        document.getElementById("city-count").innerHTML = cities.length;
        document.getElementById("dis-count").innerHTML = districts.length;
        document.getElementById("subdis-count").innerHTML = subDistricts.length;
        document.getElementById("pC-count").innerHTML = postalCodes.length;

        // Mengambil parameter 'city' dari URL
        const urlParams = new URLSearchParams(window.location.search);
        const cityName = urlParams.get("kota");

        if (!cityName) {
            errContainer.style.display = "block";
            errorMessage.textContent = `*Cari berdasarkan nama kota/kabupaten`;
            return;
        }

        const city = cities.find(
            city => city.city_name.toLowerCase() === cityName.toLowerCase()
        );
        if (!city) {
            errContainer.style.display = "block";
            errorMessage.textContent = `*Kota/kabupaten "${cityName}" tidak ada di database kami`;
            return;
        }

        const cityId = city.city_id;
        const districtsInCity = getDistrictsByCity(cityId);

        const disNewCount = districtsInCity.length;

        districtsInCity.forEach(district => {
            const subDistrictsInDistrict = getSubDistrictsByDistrict(
                district.dis_id
            );
        });

        const postalCodesInCity = getPostalCodesByCity(cityId);
        const newZipCode = postalCodesInCity.length;

        const province = provinces.find(
            province => province.prov_id === city.prov_id
        );
        const provinceName = province ? province.prov_name : "Unknown";

        postalCodesInCity.forEach((postalCode, index) => {
            const row = document.createElement("tr");
            const district = districts.find(
                district => district.dis_id === postalCode.dis_id
            );
            const subDistrict = subDistricts.find(
                subDistrict => subDistrict.subdis_id === postalCode.subdis_id
            );

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${provinceName}</td>
                <td>${city.city_name}</td>
                <td>${district ? district.dis_name : "Unknown"}</td>
                <td>${subDistrict ? subDistrict.subdis_name : "Unknown"}</td>
                <td>${postalCode.postal_code}</td>
            `;
            postalCodesTable.appendChild(row);
        });
        infoId.style.display = "block";
        cityEl.textContent = city.city_name;
        provEl.textContent = provinceName;
        updateTitle(`Kode Pos ${city.city_name}`);
        tableId.style.display = "block";
        zipCount.textContent = newZipCode;
    } catch (error) {
        console.error("Error loading data:", error);
        return;
    } finally {
        loadingElement.style.display = "none";
    }
}

window.onload = function () {
    document
        .getElementById("search-button")
        .addEventListener("click", handleSearch);
};

main();

const refreshButton = document.getElementById("refresh-button");
refreshButton.addEventListener("click", () => {
    main();
});
