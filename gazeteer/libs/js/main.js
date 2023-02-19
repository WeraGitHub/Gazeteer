$(window).on('load', function() {

    if ($('#preloader').length) {

        $('#preloader').delay(100).fadeOut('slow', function() {

            $(this).remove();

        });
    }

});


$(document).ready(() => {


    var map;
    var bounds;


    navigator.geolocation.getCurrentPosition(function(location) {
        var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);

        map = L.map('mapid', {zoomControl:false}).setView(latlng, 6)

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoid2Vyb25pa2FtYXAiLCJhIjoiY2tmbWV2ZHJkMDAzeDJyb2UxZXk3ajNvbCJ9.twWlIT4cgP4zWszUaSBtUw'
        }).addTo(map);        

    });


    let $currentCurrencyCode = "";
    let $currentCapital = "";
    let $currentCountry = "";

    const covidArray = [{ "Country": "South Georgia and the South Sandwich Islands", "Slug": "south-georgia-and-the-south-sandwich-islands", "ISO2": "GS" }, { "Country": "Barbados", "Slug": "barbados", "ISO2": "BB" }, { "Country": "Gabon", "Slug": "gabon", "ISO2": "GA" }, { "Country": "Kuwait", "Slug": "kuwait", "ISO2": "KW" }, { "Country": "Nigeria", "Slug": "nigeria", "ISO2": "NG" }, { "Country": "Philippines", "Slug": "philippines", "ISO2": "PH" }, { "Country": "Sao Tome and Principe", "Slug": "sao-tome-and-principe", "ISO2": "ST" }, { "Country": "Ecuador", "Slug": "ecuador", "ISO2": "EC" }, { "Country": "Egypt", "Slug": "egypt", "ISO2": "EG" }, { "Country": "Mauritania", "Slug": "mauritania", "ISO2": "MR" }, { "Country": "Pakistan", "Slug": "pakistan", "ISO2": "PK" }, { "Country": "Brunei Darussalam", "Slug": "brunei", "ISO2": "BN" }, { "Country": "Libya", "Slug": "libya", "ISO2": "LY" }, { "Country": "Maldives", "Slug": "maldives", "ISO2": "MV" }, { "Country": "Slovakia", "Slug": "slovakia", "ISO2": "SK" }, { "Country": "Vanuatu", "Slug": "vanuatu", "ISO2": "VU" }, { "Country": "Congo (Brazzaville)", "Slug": "congo-brazzaville", "ISO2": "CG" }, { "Country": "Guinea-Bissau", "Slug": "guinea-bissau", "ISO2": "GW" }, { "Country": "Portugal", "Slug": "portugal", "ISO2": "PT" }, { "Country": "Comoros", "Slug": "comoros", "ISO2": "KM" }, { "Country": "Djibouti", "Slug": "djibouti", "ISO2": "DJ" }, { "Country": "Equatorial Guinea", "Slug": "equatorial-guinea", "ISO2": "GQ" }, { "Country": "Georgia", "Slug": "georgia", "ISO2": "GE" }, { "Country": "Australia", "Slug": "australia", "ISO2": "AU" }, { "Country": "Austria", "Slug": "austria", "ISO2": "AT" }, { "Country": "New Caledonia", "Slug": "new-caledonia", "ISO2": "NC" }, { "Country": "Andorra", "Slug": "andorra", "ISO2": "AD" }, { "Country": "Guatemala", "Slug": "guatemala", "ISO2": "GT" }, { "Country": "Hungary", "Slug": "hungary", "ISO2": "HU" }, { "Country": "Korea (North)", "Slug": "korea-north", "ISO2": "KP" }, { "Country": "Yemen", "Slug": "yemen", "ISO2": "YE" }, { "Country": "Uzbekistan", "Slug": "uzbekistan", "ISO2": "UZ" }, { "Country": "Finland", "Slug": "finland", "ISO2": "FI" }, { "Country": "Anguilla", "Slug": "anguilla", "ISO2": "AI" }, { "Country": "El Salvador", "Slug": "el-salvador", "ISO2": "SV" }, { "Country": "Bulgaria", "Slug": "bulgaria", "ISO2": "BG" }, { "Country": "Fiji", "Slug": "fiji", "ISO2": "FJ" }, { "Country": "Mozambique", "Slug": "mozambique", "ISO2": "MZ" }, { "Country": "Saint-Martin (French part)", "Slug": "saint-martin-french-part", "ISO2": "MF" }, { "Country": "Jersey", "Slug": "jersey", "ISO2": "JE" }, { "Country": "Algeria", "Slug": "algeria", "ISO2": "DZ" }, { "Country": "British Indian Ocean Territory", "Slug": "british-indian-ocean-territory", "ISO2": "IO" }, { "Country": "Cuba", "Slug": "cuba", "ISO2": "CU" }, { "Country": "Ghana", "Slug": "ghana", "ISO2": "GH" }, { "Country": "Liechtenstein", "Slug": "liechtenstein", "ISO2": "LI" }, { "Country": "Northern Mariana Islands", "Slug": "northern-mariana-islands", "ISO2": "MP" }, { "Country": "ALA Aland Islands", "Slug": "ala-aland-islands", "ISO2": "AX" }, { "Country": "Cayman Islands", "Slug": "cayman-islands", "ISO2": "KY" }, { "Country": "Jamaica", "Slug": "jamaica", "ISO2": "JM" }, { "Country": "Kyrgyzstan", "Slug": "kyrgyzstan", "ISO2": "KG" }, { "Country": "Latvia", "Slug": "latvia", "ISO2": "LV" }, { "Country": "Saint Kitts and Nevis", "Slug": "saint-kitts-and-nevis", "ISO2": "KN" }, { "Country": "Argentina", "Slug": "argentina", "ISO2": "AR" }, { "Country": "Belize", "Slug": "belize", "ISO2": "BZ" }, { "Country": "Colombia", "Slug": "colombia", "ISO2": "CO" }, { "Country": "Dominica", "Slug": "dominica", "ISO2": "DM" }, { "Country": "Palestinian Territory", "Slug": "palestine", "ISO2": "PS" }, { "Country": "Thailand", "Slug": "thailand", "ISO2": "TH" }, { "Country": "United States of America", "Slug": "united-states", "ISO2": "US" }, { "Country": "Guyana", "Slug": "guyana", "ISO2": "GY" }, { "Country": "Honduras", "Slug": "honduras", "ISO2": "HN" }, { "Country": "Jordan", "Slug": "jordan", "ISO2": "JO" }, { "Country": "Kenya", "Slug": "kenya", "ISO2": "KE" }, { "Country": "Mauritius", "Slug": "mauritius", "ISO2": "MU" }, { "Country": "Sierra Leone", "Slug": "sierra-leone", "ISO2": "SL" }, { "Country": "Belarus", "Slug": "belarus", "ISO2": "BY" }, { "Country": "Costa Rica", "Slug": "costa-rica", "ISO2": "CR" }, { "Country": "Peru", "Slug": "peru", "ISO2": "PE" }, { "Country": "Cameroon", "Slug": "cameroon", "ISO2": "CM" }, { "Country": "Serbia", "Slug": "serbia", "ISO2": "RS" }, { "Country": "Zambia", "Slug": "zambia", "ISO2": "ZM" }, { "Country": "Isle of Man", "Slug": "isle-of-man", "ISO2": "IM" }, { "Country": "Nauru", "Slug": "nauru", "ISO2": "NR" }, { "Country": "Svalbard and Jan Mayen Islands", "Slug": "svalbard-and-jan-mayen-islands", "ISO2": "SJ" }, { "Country": "United Arab Emirates", "Slug": "united-arab-emirates", "ISO2": "AE" }, { "Country": "Aruba", "Slug": "aruba", "ISO2": "AW" }, { "Country": "Azerbaijan", "Slug": "azerbaijan", "ISO2": "AZ" }, { "Country": "Hong Kong, SAR China", "Slug": "hong-kong-sar-china", "ISO2": "HK" }, { "Country": "Malta", "Slug": "malta", "ISO2": "MT" }, { "Country": "Réunion", "Slug": "réunion", "ISO2": "RE" }, { "Country": "Solomon Islands", "Slug": "solomon-islands", "ISO2": "SB" }, { "Country": "Malawi", "Slug": "malawi", "ISO2": "MW" }, { "Country": "Qatar", "Slug": "qatar", "ISO2": "QA" }, { "Country": "San Marino", "Slug": "san-marino", "ISO2": "SM" }, { "Country": "Uruguay", "Slug": "uruguay", "ISO2": "UY" }, { "Country": "Denmark", "Slug": "denmark", "ISO2": "DK" }, { "Country": "Malaysia", "Slug": "malaysia", "ISO2": "MY" }, { "Country": "Singapore", "Slug": "singapore", "ISO2": "SG" }, { "Country": "Spain", "Slug": "spain", "ISO2": "ES" }, { "Country": "Gambia", "Slug": "gambia", "ISO2": "GM" }, { "Country": "Moldova", "Slug": "moldova", "ISO2": "MD" }, { "Country": "Somalia", "Slug": "somalia", "ISO2": "SO" }, { "Country": "Tokelau", "Slug": "tokelau", "ISO2": "TK" }, { "Country": "Albania", "Slug": "albania", "ISO2": "AL" }, { "Country": "Bangladesh", "Slug": "bangladesh", "ISO2": "BD" }, { "Country": "Bermuda", "Slug": "bermuda", "ISO2": "BM" }, { "Country": "Czech Republic", "Slug": "czech-republic", "ISO2": "CZ" }, { "Country": "Saudi Arabia", "Slug": "saudi-arabia", "ISO2": "SA" }, { "Country": "Tunisia", "Slug": "tunisia", "ISO2": "TN" }, { "Country": "Bosnia and Herzegovina", "Slug": "bosnia-and-herzegovina", "ISO2": "BA" }, { "Country": "Canada", "Slug": "canada", "ISO2": "CA" }, { "Country": "Iran, Islamic Republic of", "Slug": "iran", "ISO2": "IR" }, { "Country": "Morocco", "Slug": "morocco", "ISO2": "MA" }, { "Country": "Cape Verde", "Slug": "cape-verde", "ISO2": "CV" }, { "Country": "Virgin Islands, US", "Slug": "virgin-islands", "ISO2": "VI" }, { "Country": "Central African Republic", "Slug": "central-african-republic", "ISO2": "CF" }, { "Country": "Oman", "Slug": "oman", "ISO2": "OM" }, { "Country": "Côte d'Ivoire", "Slug": "cote-divoire", "ISO2": "CI" }, { "Country": "Guam", "Slug": "guam", "ISO2": "GU" }, { "Country": "Lithuania", "Slug": "lithuania", "ISO2": "LT" }, { "Country": "Netherlands Antilles", "Slug": "netherlands-antilles", "ISO2": "AN" }, { "Country": "South Africa", "Slug": "south-africa", "ISO2": "ZA" }, { "Country": "United Kingdom", "Slug": "united-kingdom", "ISO2": "GB" }, { "Country": "Falkland Islands (Malvinas)", "Slug": "falkland-islands-malvinas", "ISO2": "FK" }, { "Country": "Belgium", "Slug": "belgium", "ISO2": "BE" }, { "Country": "Croatia", "Slug": "croatia", "ISO2": "HR" }, { "Country": "Iraq", "Slug": "iraq", "ISO2": "IQ" }, { "Country": "Mongolia", "Slug": "mongolia", "ISO2": "MN" }, { "Country": "Vietnam", "Slug": "vietnam", "ISO2": "VN" }, { "Country": "Chad", "Slug": "chad", "ISO2": "TD" }, { "Country": "Greenland", "Slug": "greenland", "ISO2": "GL" }, { "Country": "Mexico", "Slug": "mexico", "ISO2": "MX" }, { "Country": "Syrian Arab Republic (Syria)", "Slug": "syria", "ISO2": "SY" }, { "Country": "Guadeloupe", "Slug": "guadeloupe", "ISO2": "GP" }, { "Country": "India", "Slug": "india", "ISO2": "IN" }, { "Country": "Trinidad and Tobago", "Slug": "trinidad-and-tobago", "ISO2": "TT" }, { "Country": "Paraguay", "Slug": "paraguay", "ISO2": "PY" }, { "Country": "Russian Federation", "Slug": "russia", "ISO2": "RU" }, { "Country": "Saint-Barthélemy", "Slug": "saint-barthélemy", "ISO2": "BL" }, { "Country": "Sri Lanka", "Slug": "sri-lanka", "ISO2": "LK" }, { "Country": "Ethiopia", "Slug": "ethiopia", "ISO2": "ET" }, { "Country": "Papua New Guinea", "Slug": "papua-new-guinea", "ISO2": "PG" }, { "Country": "Saint Vincent and Grenadines", "Slug": "saint-vincent-and-the-grenadines", "ISO2": "VC" }, { "Country": "Lebanon", "Slug": "lebanon", "ISO2": "LB" }, { "Country": "Mali", "Slug": "mali", "ISO2": "ML" }, { "Country": "Montserrat", "Slug": "montserrat", "ISO2": "MS" }, { "Country": "Pitcairn", "Slug": "pitcairn", "ISO2": "PN" }, { "Country": "Cambodia", "Slug": "cambodia", "ISO2": "KH" }, { "Country": "Madagascar", "Slug": "madagascar", "ISO2": "MG" }, { "Country": "Mayotte", "Slug": "mayotte", "ISO2": "YT" }, { "Country": "Romania", "Slug": "romania", "ISO2": "RO" }, { "Country": "Togo", "Slug": "togo", "ISO2": "TG" }, { "Country": "Burkina Faso", "Slug": "burkina-faso", "ISO2": "BF" }, { "Country": "Cyprus", "Slug": "cyprus", "ISO2": "CY" }, { "Country": "Gibraltar", "Slug": "gibraltar", "ISO2": "GI" }, { "Country": "South Sudan", "Slug": "south-sudan", "ISO2": "SS" }, { "Country": "Uganda", "Slug": "uganda", "ISO2": "UG" }, { "Country": "Norway", "Slug": "norway", "ISO2": "NO" }, { "Country": "Sweden", "Slug": "sweden", "ISO2": "SE" }, { "Country": "Antigua and Barbuda", "Slug": "antigua-and-barbuda", "ISO2": "AG" }, { "Country": "Cocos (Keeling) Islands", "Slug": "cocos-keeling-islands", "ISO2": "CC" }, { "Country": "Haiti", "Slug": "haiti", "ISO2": "HT" }, 
    { "Country": "Ireland", "Slug": "ireland", "ISO2": "IE" }, { "Country": "New Zealand", "Slug": "new-zealand", "ISO2": "NZ" }, { "Country": "Bahrain", "Slug": "bahrain", "ISO2": "BH" }, { "Country": "Faroe Islands", "Slug": "faroe-islands", "ISO2": "FO" }, { "Country": "Sudan", "Slug": "sudan", "ISO2": "SD" }, { "Country": "Bolivia", "Slug": "bolivia", "ISO2": "BO" }, { "Country": "French Southern Territories", "Slug": "french-southern-territories", "ISO2": "TF" }, { "Country": "Liberia", "Slug": "liberia", "ISO2": "LR" }, { "Country": "France", "Slug": "france", "ISO2": "FR" }, { "Country": "Nicaragua", "Slug": "nicaragua", "ISO2": "NI" }, { "Country": "Ukraine", "Slug": "ukraine", "ISO2": "UA" }, { "Country": "American Samoa", "Slug": "american-samoa", "ISO2": "AS" }, { "Country": "Armenia", "Slug": "armenia", "ISO2": "AM" }, { "Country": "Brazil", "Slug": "brazil", "ISO2": "BR" }, { "Country": "Monaco", "Slug": "monaco", "ISO2": "MC" }, { "Country": "Nepal", "Slug": "nepal", "ISO2": "NP" }, { "Country": "Tanzania, United Republic of", "Slug": "tanzania", "ISO2": "TZ" }, { "Country": "Tajikistan", "Slug": "tajikistan", "ISO2": "TJ" }, { "Country": "Zimbabwe", "Slug": "zimbabwe", "ISO2": "ZW" }, { "Country": "Cook Islands", "Slug": "cook-islands", "ISO2": "CK" }, { "Country": "Greece", "Slug": "greece", "ISO2": "GR" }, { "Country": "Grenada", "Slug": "grenada", "ISO2": "GD" }, { "Country": "Suriname", "Slug": "suriname", "ISO2": "SR" }, { "Country": "French Polynesia", "Slug": "french-polynesia", "ISO2": "PF" }, { "Country": "Switzerland", "Slug": "switzerland", "ISO2": "CH" }, { "Country": "Korea (South)", "Slug": "korea-south", "ISO2": "KR" }, { "Country": "Namibia", "Slug": "namibia", "ISO2": "NA" }, { "Country": "Christmas Island", "Slug": "christmas-island", "ISO2": "CX" }, { "Country": "Kiribati", "Slug": "kiribati", "ISO2": "KI" }, { "Country": "Timor-Leste", "Slug": "timor-leste", "ISO2": "TL" }, { "Country": "Afghanistan", "Slug": "afghanistan", "ISO2": "AF" }, { "Country": "Italy", "Slug": "italy", "ISO2": "IT" }, { "Country": "Saint Lucia", "Slug": "saint-lucia", "ISO2": "LC" }, { "Country": "Samoa", "Slug": "samoa", "ISO2": "WS" }, { "Country": "British Virgin Islands", "Slug": "british-virgin-islands", "ISO2": "VG" }, { "Country": "French Guiana", "Slug": "french-guiana", "ISO2": "GF" }, { "Country": "Netherlands", "Slug": "netherlands", "ISO2": "NL" }, { "Country": "Indonesia", "Slug": "indonesia", "ISO2": "ID" }, { "Country": "Montenegro", "Slug": "montenegro", "ISO2": "ME" }, { "Country": "Seychelles", "Slug": "seychelles", "ISO2": "SC" }, { "Country": "Guinea", "Slug": "guinea", "ISO2": "GN" }, { "Country": "Saint Helena", "Slug": "saint-helena", "ISO2": "SH" }, { "Country": "Swaziland", "Slug": "swaziland", "ISO2": "SZ" }, { "Country": "Venezuela (Bolivarian Republic)", "Slug": "venezuela", "ISO2": "VE" }, { "Country": "Bhutan", "Slug": "bhutan", "ISO2": "BT" }, { "Country": "Estonia", "Slug": "estonia", "ISO2": "EE" }, { "Country": "Niue", "Slug": "niue", "ISO2": "NU" }, { "Country": "Panama", "Slug": "panama", "ISO2": "PA" }, { "Country": "Wallis and Futuna Islands", "Slug": "wallis-and-futuna-islands", "ISO2": "WF" }, { "Country": "Bouvet Island", "Slug": "bouvet-island", "ISO2": "BV" }, { "Country": "Myanmar", "Slug": "myanmar", "ISO2": "MM" }, { "Country": "US Minor Outlying Islands", "Slug": "us-minor-outlying-islands", "ISO2": "UM" }, { "Country": "Luxembourg", "Slug": "luxembourg", "ISO2": "LU" }, { "Country": "Macedonia, Republic of", "Slug": "macedonia", "ISO2": "MK" }, { "Country": "Slovenia", "Slug": "slovenia", "ISO2": "SI" }, { "Country": "Tuvalu", "Slug": "tuvalu", "ISO2": "TV" }, { "Country": "Angola", "Slug": "angola", "ISO2": "AO" }, { "Country": "Norfolk Island", "Slug": "norfolk-island", "ISO2": "NF" }, { "Country": "Turkmenistan", "Slug": "turkmenistan", "ISO2": "TM" }, { "Country": "Botswana", "Slug": "botswana", "ISO2": "BW" }, { "Country": "Heard and Mcdonald Islands", "Slug": "heard-and-mcdonald-islands", "ISO2": "HM" }, { "Country": "Japan", "Slug": "japan", "ISO2": "JP" }, { "Country": "Martinique", "Slug": "martinique", "ISO2": "MQ" }, { "Country": "Rwanda", "Slug": "rwanda", "ISO2": "RW" }, { "Country": "Turks and Caicos Islands", "Slug": "turks-and-caicos-islands", "ISO2": "TC" }, { "Country": "Bahamas", "Slug": "bahamas", "ISO2": "BS" }, { "Country": "Benin", "Slug": "benin", "ISO2": "BJ" }, { "Country": "Holy See (Vatican City State)", "Slug": "holy-see-vatican-city-state", "ISO2": "VA" }, { "Country": "Saint Pierre and Miquelon", "Slug": "saint-pierre-and-miquelon", "ISO2": "PM" }, { "Country": "Turkey", "Slug": "turkey", "ISO2": "TR" }, { "Country": "Kazakhstan", "Slug": "kazakhstan", "ISO2": "KZ" }, { "Country": "Niger", "Slug": "niger", "ISO2": "NE" }, { "Country": "Antarctica", "Slug": "antarctica", "ISO2": "AQ" }, { "Country": "Burundi", "Slug": "burundi", "ISO2": "BI" }, { "Country": "Congo (Kinshasa)", "Slug": "congo-kinshasa", "ISO2": "CD" }, { "Country": "Eritrea", "Slug": "eritrea", "ISO2": "ER" }, { "Country": "Guernsey", "Slug": "guernsey", "ISO2": "GG" }, { "Country": "Palau", "Slug": "palau", "ISO2": "PW" }, { "Country": "Tonga", "Slug": "tonga", "ISO2": "TO" }, { "Country": "China", "Slug": "china", "ISO2": "CN" }, { "Country": "Israel", "Slug": "israel", "ISO2": "IL" }, { "Country": "Lesotho", "Slug": "lesotho", "ISO2": "LS" }, { "Country": "Marshall Islands", "Slug": "marshall-islands", "ISO2": "MH" }, { "Country": "Puerto Rico", "Slug": "puerto-rico", "ISO2": "PR" }, { "Country": "Taiwan, Republic of China", "Slug": "taiwan", "ISO2": "TW" }, { "Country": "Dominican Republic", "Slug": "dominican-republic", "ISO2": "DO" }, { "Country": "Germany", "Slug": "germany", "ISO2": "DE" }, { "Country": "Republic of Kosovo", "Slug": "kosovo", "ISO2": "XK" }, { "Country": "Western Sahara", "Slug": "western-sahara", "ISO2": "EH" }, { "Country": "Chile", "Slug": "chile", "ISO2": "CL" }, { "Country": "Lao PDR", "Slug": "lao-pdr", "ISO2": "LA" }, { "Country": "Macao, SAR China", "Slug": "macao-sar-china", "ISO2": "MO" }, { "Country": "Micronesia, Federated States of", "Slug": "micronesia", "ISO2": "FM" }, { "Country": "Poland", "Slug": "poland", "ISO2": "PL" }, { "Country": "Iceland", "Slug": "iceland", "ISO2": "IS" }, { "Country": "Senegal", "Slug": "senegal", "ISO2": "SN" }];

    function covidSlug(country) {
        for (let index = 0; index < covidArray.length; index++) {
            if (covidArray[index]["ISO2"] == country) {
                return covidArray[index]["Slug"];
            }
        }
    };

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


    var geoJsonStyle = {
        "color": "black",
        "opacity": 0.8,
        "weight": 1,
    }


    $('#selectCountry').on('change', () => {
        
        $.ajax({
            url: "libs/php/getCountryInfo.php",
            type: 'POST',
            dataType: 'json',
            data: {
                country: $('#selectCountry').val(),
                countrySlug: covidSlug($('#selectCountry').val())
            },
            success: function(result) {

                console.log(result);

                if (result.status.name == "ok") {

                    // geonames info
                    $('.continent').html(result['data']['geonames']['continentName']);
                    $('.countryName').html(result['data']['geonames']['countryName']);                    
                    $currentCountry = result['data']['geonames']['countryName'];
                    $('.countryCode').html(result['data']['geonames']['isoAlpha3']);
                    $('.capital').html(result['data']['geonames']['capital']);
                    $currentCapital = result['data']['geonames']['capital'];
                    $('.languages').html(result['data']['geonames']['languages']);
                    $('.population').html(formatNumber(result['data']['geonames']['population']));
                    $('.area').html(`${formatNumber(Math.floor(result['data']['geonames']['areaInSqKm']))} km<sup>2</sup>`);
                    $('.currency').html(result['data']['geonames']['currencyCode']);
                    $currentCurrencyCode = result['data']['geonames']['currencyCode'];

                    // exchange rate info
                    $('.exRate').html(result['data']['exchangeRates'][$currentCurrencyCode]);

                    //weather info:
                    $('.weather').html(result['data']['weatherForecast']['weather'][0]['description']);
                    $('.temperature').html(`${result['data']['weatherForecast']['main']['temp']} <sup>o</sup>C`);
                    $('.pressure').html(`${result['data']['weatherForecast']['main']['pressure']} hPa`);
                    $('.humidity').html(`${result['data']['weatherForecast']['main']['humidity']} %`);

                    //covid info
                    $('.covidConfirmed').html(formatNumber(result['data']['covid']['Confirmed']));
                    $('.covidDeaths').html(formatNumber(result['data']['covid']['Deaths']));
                    $('.covidRecovered').html(formatNumber(result['data']['covid']['Recovered']));
                    $('.covidActive').html(formatNumber(result['data']['covid']['Active']));

                    //multi polygon
                    // bounds = L.geoJSON(result['data']['border'], {
                    //     style: geoJsonStyle
                    // }).addTo(map);
                    // map.flyToBounds(bounds.getBounds(), {
                    //     // map.fitToBounds(bounds, {
                    //     animate: true,
                    //     duration: 2.5
                    // });
                    if (map.hasLayer(bounds)) {
                        map.removeLayer(bounds);                    
                    }                                       
                    
                    bounds = L.geoJSON(result['data']['border'], {                    
                        style: geoJsonStyle                    
                    }).addTo(map);                                      
                    
                    map.fitBounds(bounds.getBounds());

                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
            }
        });
    });

    //modal
    $('#myModal').on('shown.bs.modal', function() {
        $('#myInput').trigger('focus')
    })
    //side icons
    $('#icon1').on('click', () => {
        $('#iconsAll').slideToggle('slow');
    })

    $('#icon2').on('click', () => {
        $('#c1').toggle();
    })
    $('#btnP1').on('click', () => {
        $('#c1').toggle();
    })

    $('#icon3').on('click', () => {
        $('#c2').toggle();
    })
    $('#btnP2').on('click', () => {
        $('#c2').toggle();
    })

    $('#icon4').on('click', () => {
        $('#c3').toggle();
    })
    $('#btnP3').on('click', () => {
        $('#c3').toggle();
    })

    $('#icon5').on('click', () => {
        $('#c4').toggle();
    })
    $('#btnP4').on('click', () => {
        $('#c4').toggle();
    })

})