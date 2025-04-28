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
if (categoryScenarioContainer) {
    categoryScenarioContainer.addEventListener('click', function (event) {
        console.log(this.innerText);
        console.log("hello3");
    });
}
