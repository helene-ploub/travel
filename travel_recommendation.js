const btnSearch = document.getElementById('btnSearch');


function searchCondition() {
    const input = document.getElementById('destinationInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const country = data.countries.find(item => item.name.toLowerCase() === input);

        if (country) {
          country.cities.forEach(city => {
            resultDiv.innerHTML += `
              <h2>${city.name}</h2>
              <img src="${city.imageUrl}" alt="${city.name}">
              <p><strong>Description:</strong> ${city.description}</p>
            `;
          });
        } else {
          resultDiv.innerHTML = 'Condition not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
}

btnSearch.addEventListener('click', searchCondition);

