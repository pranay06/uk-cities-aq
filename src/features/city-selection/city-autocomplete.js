import React from "react";
import Downshift from "downshift";
import { useSelectedCities } from "../../uiState/selected-cities";
import { useCities } from "../../serverCache/cities";
import {getItems, itemToString, stateReducer} from "./utils";
import { matchSorter } from "match-sorter";

const CityAutoComplete = React.memo(
  function () {

  const { data: cities } = useCities();
  const [selectedCities, dispatchSelectedCities] = useSelectedCities();

  function handleSelection(selectedCity) {

    dispatchSelectedCities({
      type: "add",
      value: selectedCity,
    });
  }

  const itemToString = (item) => (item ? item.city : "");

  const getItems = (value) =>(value
        ? matchSorter(cities, value, {
            keys: ["city"],
            threshold: matchSorter.rankings.WORD_STARTS_WITH,
          })
        : cities);
  const stateReducer = (state, changes) => {
      if (
        changes.type === Downshift.stateChangeTypes.blurButton ||
        changes.type === Downshift.stateChangeTypes.keyDownEscape ||
        changes.type === Downshift.stateChangeTypes.mouseUp
      ) {
        return { ...changes, inputValue: state.inputValue };
      }
      return changes;
  };
  return (
    <Downshift
      stateReducer={stateReducer}
      onChange={(selection) => {
        handleSelection(selection);
      }}
      itemToString={itemToString}
    >
      {({
        getInputProps,
        getLabelProps,
        getMenuProps,
        getItemProps,
        getToggleButtonProps,
        clearSelection,
        openMenu,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex,
      }) => (
        <div className="search position-relative">
          <input
            {...getInputProps({
              onFocus: openMenu,
              placeHolder: "Enter city name...",
              type: "search",
              className: "search__input position-relative",
            })}
          ></input>
          <div
            {...getMenuProps({
              className: "search__results position-absolute",
            })}
          >
            {isOpen
              ? getItems(inputValue).map((city, index) => (
                  <div
                    {...getItemProps({
                      item: city,
                      key: city.uiKey,
                      disabled: selectedCities.find(
                        (selectedCity) => city.uiKey === selectedCity.uiKey
                      ),
                      style: {
                        backgroundColor: selectedCities.find(
                          (selectedCity) => city.uiKey === selectedCity.uiKey
                        )
                          ? "grey"
                          : null,
                      },
                      className: "search__result",
                    })}
                  >
                    {city.city}
                  </div>
                ))
              : null}
          </div>
        </div>
      )}
    </Downshift>
  );
});

export default AutoComplete;
