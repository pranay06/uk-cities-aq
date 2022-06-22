
import CitiesAqComparision from '../features/cities-aq-comparision';

import CitySearchSelect from "../features/city-search-select/index";
import ErrorFallback from "../components/error-fallback";
import SuspenseFallback from "../components/suspense-fallback.js";
import {ErrorBoundary} from 'react-error-boundary';
import { QueryErrorResetBoundary } from 'react-query';
//import {useQueryClient } from "react-query";

import React  from "react";

import {SelectedCitiesProvider} from '../uiState/selected-cities';


export default function CountryCitiesWeather() {
    return<>
        <SelectedCitiesProvider>
            <QueryErrorResetBoundary>
                {
                    ({reset})=>(
                        <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>

                                <React.Suspense fallback={<SuspenseFallback message="Fetching citites of UK for you."></SuspenseFallback>}>

                                    <CitySearchSelect></CitySearchSelect>
                                    <CitiesAqComparision></CitiesAqComparision>
                                </React.Suspense>


                        </ErrorBoundary>
                    )
                }


            </QueryErrorResetBoundary>
        </SelectedCitiesProvider>







    </>;
}