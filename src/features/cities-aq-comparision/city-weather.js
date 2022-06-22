import {useCityAQ, useRemoveCityAQ}  from '../../serverCache/city-aq';
import React from 'react';
import moment from "moment";
import {calculateCityAverageAQ} from "./utils";
import ErrorFallback from "../../components/error-fallback";
import SuspenseFallback from "../../components/suspense-fallback.js";
import {ErrorBoundary} from 'react-error-boundary';
import { QueryErrorResetBoundary } from 'react-query';

import {SelectedCitiesProvider} from '../../uiState/selected-cities';

const CityWeather =  React.memo(function ({city, remove}) {

    //This cityAQ does not have AQ since the backend APIs did not return that, instead returned AQ of locations of that city
    const {data: cityAQ} = useCityAQ(city);

    //Calculated the average AQ of city with the help of AQ of params of its locations
    const cityAverageAQ = calculateCityAverageAQ(cityAQ);

    function removeHandler() {
        remove(city)
    }


    return(
    <div className='card position-relative'>
         <SelectedCitiesProvider>
            <QueryErrorResetBoundary>
                {
                    ({reset})=>(
                        <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>

                                <React.Suspense fallback={<SuspenseFallback message="Fetching AQI of UK for you."></SuspenseFallback>}>
                                    {/* Ideally suspense should act here for this component but wierdly this gets caught in the outer suspense */}
                                    {(cityAverageAQ)?<>
                                        <div  className='card__close position-absolute' onClick={() => removeHandler()}>
                                            X
                                        </div>
                                        <p className='card__time text-uppercase'>
                                                Updated {moment(cityAverageAQ.lastUpdated).fromNow()}
                                            </p>
                                            <p className='card__location'>{city.city}</p>
                                            <p className='card__city'>in  United Kingdom</p>
                                            <p className='card__measurements'>
                                                Values:
                                                {
                                                    Object.keys(cityAverageAQ).map((parameter, index)=>(
                                                        <span className='parameter' key={index+parameter+city.city}>
                                                            {parameter}: {cityAverageAQ[parameter].average}
                                                            <span className='parameter__separator'>,</span>{' '}
                                                    </span>
                                                    ))
                                                }
                                    </p></>:null}




                                </React.Suspense>


                        </ErrorBoundary>
                    )
                }


            </QueryErrorResetBoundary>
        </SelectedCitiesProvider>

    </div>)
})

export default CityWeather;