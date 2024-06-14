let countriesData = [];

const loadCountryAPI = () => {
    // Fetch URL of rest country from website
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            countriesData = data;
            displayCountries(data);
        });
}

// Displaying all countries
const displayCountries = countries => {
    // Sort countries alphabetically by their common name
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    // Generate HTML for each country
    const countriesHTML = countries.map(country => getCountry(country));
    // Displaying div to HTML
    const container = document.getElementById('countries');
    container.innerHTML = countriesHTML.join(' ');
}

// Get data and set it to HTML
const getCountry = country => {
    return `
        <div class="country-div">
        <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
        <h2>${country.name.common}</h2>
        <hr>
        <h4>Population: ${country.population}</h4>
        <h4>Region: ${country.region}</h4>
        <h4>Capital: ${country.capital ? country.capital[0] : 'N/A'}</h4>
        </div>
    `;
}

// Search functionality
const searchCountries = () => {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredCountries = countriesData.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm)
    );
    displayCountries(filteredCountries);
}

// Event listener for search bar
document.getElementById('searchBar').addEventListener('input', searchCountries);

// Call the function to get output in console
loadCountryAPI();
