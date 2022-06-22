import {useSelectedCities} from '../../uiState/selected-cities';


import React  from "react";

import CityWeather from './city-weather';

const CitiesAqComparision = React.memo(function () {
    //Get data for this city
    const [selectedCities, dispatchSelectedCities] = useSelectedCities();


    function remove(city) {
        dispatchSelectedCities({
            type: "remove",
            value: city
        })
    }

    //calculate average value of air quality metrics

    //iteratively render


    return (<div className='cards-wrapper d-flex'>
        {
            selectedCities &&
            (selectedCities.map((selectedCity)=>(

                <CityWeather key={selectedCity.uiKey} city={selectedCity} remove={(city)=>remove(city)}></CityWeather>

            )))
        }
    </div>);
});

export default CitiesAqComparision;