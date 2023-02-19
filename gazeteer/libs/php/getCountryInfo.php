<?php

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);
    
    // geonames api 
	$url1='http://api.geonames.org/countryInfoJSON?formatted=true&' . '&country=' . $_REQUEST['country'] . '&username=weronika&style=full';

	$ch1 = curl_init();
	curl_setopt($ch1, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch1, CURLOPT_URL,$url1);

	$result1=curl_exec($ch1);
	curl_close($ch1);

	$decode1 = json_decode($result1,true);		
    
    //currency exchange api
    $currencyInfoURL = 'https://openexchangerates.org/api/latest.json?app_id=f4abef816e3346b48e4a9ff990fdd190&symbols=' . $decode1['geonames'][0]['currencyCode'];

    $ch2 = curl_init();
    curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch2, CURLOPT_URL, $currencyInfoURL);

    $currencyInfoResult = curl_exec($ch2);    
    curl_close($ch2);

    $decode2 = json_decode($currencyInfoResult,true);	
    
    //weather api
    $weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' . $decode1['geonames'][0]['capital'] . '&appid=03cf0108f3a426eceaf55fd80047b8ef&units=metric';

    $ch3 = curl_init();
    curl_setopt($ch3, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch3, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch3, CURLOPT_URL, $weatherUrl);

    $weatherForecastResult = curl_exec($ch3);
    curl_close($ch3);

    $decode3 = json_decode($weatherForecastResult,true);
    
    // covid api        
    $covidUrl = 'https://api.covid19api.com/total/country/' . $_REQUEST['countrySlug'] . '?from=' . date('Y-m-d',strtotime("-1 days")) . '&to=' . date("Y-m-d");

    $ch4 = curl_init();

    curl_setopt($ch4, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch4, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch4, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch4, CURLOPT_URL, $covidUrl);

    $covidResult = curl_exec($ch4);
    curl_close($ch4);

    $decode4 = json_decode($covidResult,true);

    // polygon countries small
    // $IsoAlpha3 = $decode1['geonames'][0]['isoAlpha3'];
    // $decode5 = json_decode(file_get_contents("countries_small.geo.json"), true);
    // $countryGeoJson = null;
    // foreach($decode5['features'] as $feature){
    //     if ($feature['id'] == $IsoAlpha3){
    //         $countryGeoJson = $feature;
    //     }
    // }

    // polygon countries large
    $IsoAlpha3 = $decode1['geonames'][0]['isoAlpha3'];
    $decode5 = json_decode(file_get_contents("countries_large.geo.json"), true);
    $countryGeoJson = null;
    foreach($decode5['features'] as $feature){
        if ($feature['properties']['id'] == $IsoAlpha3){
            $countryGeoJson = $feature;
        }
    }

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) . " s";

    $output['data']['geonames'] = $decode1['geonames'][0];  
    $output['data']['exchangeRates'] = $decode2['rates'];
    $output['data']['weatherForecast'] = $decode3;
    $output['data']['covid'] = $decode4[0];
    $output['data']['border'] = $countryGeoJson;

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);

?>

