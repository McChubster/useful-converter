"use strict";
// Map for all categories and units
const category = {
    "length": {
        name: "Length",
        units: {
            "meter": { name: "Meter", symbol: "m" },
            "centimeter": { name: "Centimeter", symbol: "cm" },
            "kilometer": { name: "Kilometer", symbol: "km" },
            "inch": { name: "Inch", symbol: "in" },
            "foot": { name: "Foot", symbol: "ft" },
            "yard": { name: "Yard", symbol: "yd" },
            "millimeter": { name: "Millimeter", symbol: "mm" },
            "mile": { name: "Mile", symbol: "mi" }
        }
    },
    "volumeMass": {
        name: "volumeMass",
        units: {
            "milliliter": { name: "Milliliter", symbol: "mL" },
            "liter": { name: "Liter", symbol: "L" },
            "gram": { name: "Gram", symbol: "g" },
            "kilogram": { name: 'Kilogram', symbol: "kg" },
            "tablespoon": { name: "Tablespoon", symbol: "tbsp" },
            "teaspoon": { name: "Teaspoon", symbol: "tsp" },
            "cup": { name: "Cup", symbol: "c" },
            "ounce": { name: "Ounce", symbol: "oz" },
            "quart": { name: "Quart", symbol: "qt" },
            "fluid_ounce": { name: "Fluid Ounce", symbol: "fl oz" },
            "gallon": { name: "Gallon", symbol: "gal" },
            "milligram": { name: "Milligram", symbol: "mg" },
            "pound": { name: "Pound", symbol: "lb" }
        }
    },
    "area": {
        name: "Area",
        units: {
            "ping": { name: "Ping", symbol: "坪" },
            "square_meter": { name: "Square Meter", symbol: "m²" },
            "square_centimeter": { name: "Square Centimeter", symbol: "cm²" },
            "square_kilometer": { name: "Square Kilometer", symbol: "km²" },
            "square_foot": { name: "Square Foot", symbol: "sq ft" }
        }
    },
    "currency": {
        name: "Currency",
        units: {
            "gbp": { name: "British Pound", symbol: "GBP" },
            "ntd": { name: "New Taiwan Dollar", symbol: "NTD" },
            "jpy": { name: "Japanese Yen", symbol: "JPY" },
            "usd": { name: "US Dollar", symbol: "USD" },
            "eur": { name: "Euro", symbol: "EUR" },
            "krw": { name: "Korean Won", symbol: "KRW" }
        }
    },
    "time": {
        name: "Time",
        units: {
            "second": { name: "Second", symbol: "s" },
            "minute": { name: "Minute", symbol: "min" },
            "hour": { name: "Hour", symbol: "hr" },
            "day": { name: "Day", symbol: "d" },
            "week": { name: "Week", symbol: "wk" },
            "month": { name: "Month", symbol: "mo" },
            "year": { name: "Year", symbol: "yr" }
        }
    },
    "temperature": {
        name: "Temperature",
        units: {
            "celsius": { name: "Celsius", symbol: "°C" },
            "fahrenheit": { name: "Fahrenheit", symbol: "°F" },
            "kelvin": { name: "Kelvin", symbol: "K" }
        }
    }
};
// Map for all conversion ratios
const conversionRatios = {
    // First unit within each categories are the anchor units
    // All other units convert to and from this anchor
    "length": {
        toAnchor: {
            "meter": 1, // Base unit
            "inch": 0.0254,
            "centimeter": 0.01,
            "kilometer": 1000,
            "foot": 0.3048,
            "yard": 0.9144,
            "millimeter": 0.001,
            "mile": 1609.344
        }
    },
    "volummeMass": {
        toAnchor: {
            "kilogram": 1, // Base unit
            "gram": 0.001,
            "milligram": 0.000001,
            "pound": 0.45359237,
            "ounce": 0.0283495231,
            "liter": 1, // assuming 1 liter = 1 kg (water density), adjust if needed
            "milliliter": 0.001,
            "cup": 0.24, // assuming metric cup
            "tablespoon": 0.015, // metric tbsp
            "teaspoon": 0.005, // metric tsp
            "quart": 0.946353, // US quart to kg
            "fluid_ounce": 0.0295735,
            "gallon": 3.78541 // US gallon
        }
    },
    "area": {
        toAnchor: {
            "square_meter": 1, //Anchor unit
            "square_centimeter": 0.0001,
            "square_kilometer": 1000000,
            "square_foot": 0.092903,
            "ping": 3.30579
        }
    }
};
const categoryScenarioContainer = document.getElementById("category-scenarios-container");
const convertButton = document.getElementById("convert-btn");
const fromDropdown = document.getElementById("from-dropdown");
const toDropdown = document.getElementById("to-dropdown");
const leftInput = document.getElementById("from-input");
const rightInput = document.getElementById("to-input");
function checkButtonClicked(fromDropdown, toDropdown, buttonPressed) {
    // Check if element clicked is a button
    if (buttonPressed.tagName === 'BUTTON') {
        // Get button's data-category
        const button = buttonPressed.dataset.category;
        // Check if button has a data-category and if category exist
        if (button && category.hasOwnProperty(button)) {
            // Clear dropdown menu options
            fromDropdown.options.length = 0;
            toDropdown.options.length = 0;
            // Return name of button to populate dropdown
            return button;
        }
    }
    return null;
}
function populateDropdowns(fromDropdown, toDropdown, button) {
    // Retrieve all units in selected category
    const unitsInCategory = category[button].units;
    // Populate dropdowns
    for (const unitNames in unitsInCategory) {
        const unit = unitsInCategory[unitNames];
        // Create new options
        const newOption = document.createElement('option');
        //Set value for new option (HTML)
        newOption.value = unit.name;
        // Set displaying text for new option
        newOption.text = `${unit.name}(${unit.symbol})`;
        // Add new options to fromDropdown
        fromDropdown.add(newOption);
        // Clone the new option and add to toDropdown (an element can only have one parent)
        const clonedNewOption = newOption.cloneNode(true);
        toDropdown.add(clonedNewOption);
    }
}
function checkInputs(leftInput, rightInput) {
    // Check which input has a value
    if (leftInput.value && rightInput.value) {
        return { isInputFilled: true, filledInputs: [leftInput, rightInput] };
    }
    else if (leftInput.value) {
        return { isInputFilled: true, filledInputs: [leftInput] };
    }
    else if (rightInput.value) {
        return { isInputFilled: true, filledInputs: [rightInput] };
    }
    else {
        return { isInputFilled: false, filledInputs: [] };
    }
}
function conversion(inputs) {
}
if (categoryScenarioContainer) {
    categoryScenarioContainer.addEventListener('click', function (event) {
        const buttonPressed = event.target;
        let buttonClicked = checkButtonClicked(fromDropdown, toDropdown, buttonPressed);
        populateDropdowns(fromDropdown, toDropdown, buttonClicked);
    });
}
if (convertButton) {
    convertButton.addEventListener('click', function () {
        let inputStatus = checkInputs(leftInput, rightInput);
        if (inputStatus.isInputFilled) {
        }
        else {
            //implement what happens if no value in input
        }
        let isUnitSelected = fromDropdown.selectedOptions;
        console.log(`Left unit selected? ${isUnitSelected[0].label}`);
        // isUnitSelected[0].label (for extracting the display text of an option)
        // For testing purposes
        let leftValue = document.getElementById("left-value");
        let rightValue = document.getElementById("right-value");
        if (leftValue) {
            leftValue.innerText = `Left Input: ${leftInput.value}`;
        }
        if (rightValue) {
            rightValue.innerText = `Right Input: ${rightInput.value}`;
        }
    });
}
// // 5ft(from) to 5 yd(to)
// ft to m
// from's value(5) * from's ratio(0.3048) = 1.524 meter
// m to yd
// base's value(1.524) / to's ratio(0.9144) = 1.6667 meter
// within the convert function
// if one of the input filled, and if both units are selected
// {do the conversion}
// if none input filled, then wait till whenever and input is filled 
