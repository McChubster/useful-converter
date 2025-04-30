"use strict";
const category = {
    "length": {
        name: "Length",
        units: {
            "inch": { name: "Inch", symbol: "in" },
            "centimeter": { name: "Centimeter", symbol: "cm" },
            "kilometer": { name: "Kilometer", symbol: "km" },
            "foot": { name: "Foot", symbol: "ft" },
            "yard": { name: "Yard", symbol: "yd" },
            "meter": { name: "Meter", symbol: "m" },
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
const categoryScenarioContainer = document.getElementById("category-scenarios-container");
const convertButton = document.getElementById("convert-btn");
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
function conversion(value1, value2) {
}
if (categoryScenarioContainer) {
    categoryScenarioContainer.addEventListener('click', function (event) {
        const buttonPressed = event.target;
        const fromDropdown = document.getElementById("from-dropdown");
        const toDropdown = document.getElementById("to-dropdown");
        let buttonClicked = checkButtonClicked(fromDropdown, toDropdown, buttonPressed);
        populateDropdowns(fromDropdown, toDropdown, buttonClicked);
    });
}
if (convertButton) {
    convertButton.addEventListener('click', function () {
        // const isInputFilled = 
        const leftInput = document.getElementById("from-input");
        const rightInput = document.getElementById("to-input");
        let leftValue = document.getElementById("left-value");
        let rightValue = document.getElementById("right-value");
        if (leftValue) {
            leftValue.innerText = `Left Input: ${leftInput.value}`;
        }
        if (rightValue) {
            rightValue.innerText = `Right Input: ${rightInput.value}`;
        }
        console.log(leftValue);
    });
}
// I am building a unit converter, I am now trying to figure out how i would implement the conversion feature. Could you give me some pointers without giving me direct answers? 
