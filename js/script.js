const url = 'https://restcountries.eu/rest/v2/name/';
const countriesList = document.getElementById('countries');
document.getElementById('search').addEventListener('click', searchCountries);

function searchCountries() {
    let countryName = document.getElementById('country-name').value;
    if (!countryName.length) countryName = 'Poland';
    fetch(url + countryName)
        .then(function (resp) {
           return resp.json();
        })
        .then(showCountriesList)
}

function generateTemplate(name, data, basicElement) {
    const template = document.getElementById(name).innerHTML;
    let element = document.createElement(basicElement || 'li');

    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);

    return element;
}

function showCountriesList(resp) {
    countriesList.innerHTML = '';
    resp.forEach(function (item) {
        let languages = '';
        const length = item.languages.length;
        if (length > 1) {
            for (let i = 0; i < length; i++) {
                languages += item.languages[i].name;
                if (i < length - 1) {
                    languages += ', ';
                }
            }
        } else {
            languages = item.languages[0].name;
        }
        element = generateTemplate('country-template', { name: item.name, capital: item.capital, language: languages, currency: (item.currencies[0].name + ' ' + item.currencies[0].symbol), 
                    population: item.population/1000000, area: item.area/1000, flag: item.flag});
        countriesList.appendChild(element);
    });
}
