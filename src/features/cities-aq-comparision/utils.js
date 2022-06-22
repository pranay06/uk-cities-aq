export function calculateCityAverageAQ (cityAQ) {
    let cityAverageAQ = {}
    cityAQ.map((loc)=>{
        loc.measurements.map(({parameter, value, unit})=>{
            if(!cityAverageAQ[parameter]){
                cityAverageAQ[parameter] ={
                    sum: 0,
                    count: 0,
                    unit: unit
                };
            }

            cityAverageAQ[parameter].sum += value;
            cityAverageAQ[parameter].count++
        })
    })
    Object.keys(cityAverageAQ).map((key)=>{

        cityAverageAQ[key].average = cityAverageAQ[key].sum/cityAverageAQ[key].count;
        cityAverageAQ[key].average = Math.round(cityAverageAQ[key].average*100)/100;
    });

    cityAverageAQ.lastUpdated = cityAQ[0].measurements[0].lastUpdated;
    cityAverageAQ.cityName = cityAQ
    return cityAverageAQ;
}

