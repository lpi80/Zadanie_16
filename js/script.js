const url = 'https://restcountries.eu/rest/v2/name/';
const countriesList = document.getElementById('countries');
var test;
document.getElementById('search').addEventListener('click', searchCountries);

function searchCountries() {
    const countryName = document.getElementById('country-name').value;
    if (!countryName.length) countryName = 'Poland';
    fetch(url + countryName)
        .then(function (resp) {
           return resp.json();
        })
        .then(showCountriesList)
}

function generateTemplate(name, data, basicElement) {
    const template = document.getElementById(name).innerHTML;
    const element = document.createElement(basicElement || 'li');

    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);

    return element;
}

function showCountriesList(resp) {
    countriesList.innerHTML = '';
    resp.forEach(function (item) {
        element = generateTemplate('country-template', { name: item.name, capital: item.capital, language: item.languages[0].name, currency: item.currencies[0].code, population: item.population,
                    area: item.area, flag: item.flag});
        countriesList.appendChild(element);
    });
}



