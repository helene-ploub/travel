const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnReset');

function searchCondition() {
    const input = document.getElementById('destinationInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const country = data.countries.find(item => item.name.toLowerCase() === input);
        const beach = data.beaches.find(item => item.name.toLowerCase() === input);

        if (input.includes("temple")) {
            data.temples.forEach(foundTemple => {
                resultDiv.innerHTML += `
                <h2>${foundTemple.name}</h2>
                <img src="${foundTemple.imageUrl}" alt="${foundTemple.name}">
                <p><strong>Description:</strong> ${foundTemple.description}</p>
                `;
            });

        } 
        else if (country) {
            country.cities.forEach(city => {
                resultDiv.innerHTML += `
                <h2>${city.name}</h2>
                <img src="${city.imageUrl}" alt="${city.name}">
                <p><strong>Description:</strong> ${city.description}</p>
                `;
            });
        } else if (input.includes("beach")) {
                data.beaches.forEach(foundBeach => {
                    resultDiv.innerHTML += `
                    <h2>${foundBeach.name}</h2>
                    <img src="${foundBeach.imageUrl}" alt="${foundBeach.name}">
                    <p><strong>Description:</strong> ${foundBeach.description}</p>
                    `;
                });
            
        } else {
            resultDiv.innerHTML = 'Sorry, this destination is not comprised in our catalog.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
}

btnSearch.addEventListener('click', searchCondition);

function resetSearch() {
    const resultDiv = document.getElementById('result');
    const inputField = document.getElementById('destinationInput');
    resultDiv.innerHTML = ''; // Vide le contenu de resultDiv
    inputField.value = ''; // Réinitialise le champ de saisie
}

btnClear.addEventListener('click', resetSearch);
