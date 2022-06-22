import React from "react";

const SelectedCitiesContext = React.createContext();

function selectedCitiesReducer(state, action) {
    switch (action.type) {
        case "add": {

            return [...state, action.value]
        }
        case "remove": {
            return state.filter((city)=> city.uiKey !== action.value.uiKey);
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
            
    }
}

function SelectedCitiesProvider({children}) {
    const [state, dispatch] = React.useReducer(selectedCitiesReducer, []);

    const value = [state, dispatch];

    return <SelectedCitiesContext.Provider value={value}>{children}</SelectedCitiesContext.Provider>
}

function useSelectedCities() {
    const context = React.useContext(SelectedCitiesContext)
    if (context === undefined) {
      throw new Error('useSelectedCities must be used within a SelectedCitiesProvider')
    }
    return context
}


export {SelectedCitiesProvider, useSelectedCities};