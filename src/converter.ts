interface Unit {
    name: string;
    symbol: string;
}


interface Category {
    name: string;
    units: Record<string, Unit>;
}


// Map for all categories and units
const category: Record<string, Category> = {
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
            "kilogram":{ name: 'Kilogram', symbol: "kg" },
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
}


interface ConversionRatios {
    toAnchor: Record<string, number> 
}


// Map for all conversion ratios
const conversionRatios: Record<string, ConversionRatios> = {
    // First unit within each categories are the anchor units
    // All other units convert to and from this anchor
    "length": {
        toAnchor : {
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
    "volumeMass": {
        toAnchor: {
            "kilogram": 1, // Base unit
            "gram": 0.001,
            "milligram": 0.000001,
            "pound": 0.45359237,
            "ounce": 0.0283495231,
            "liter": 1,             // assuming 1 liter = 1 kg (water density), adjust if needed
            "milliliter": 0.001,
            "cup": 0.24,            // assuming metric cup
            "tablespoon": 0.015,    // metric tbsp
            "teaspoon": 0.005,      // metric tsp
            "quart": 0.946353,      // US quart to kg
            "fluid_ounce": 0.0295735,
            "gallon": 3.78541       // US gallon
        }
    },
    "area": {
        toAnchor: {
            "square_meter": 1, // Base unit
            "square_centimeter": 0.0001,
            "square_kilometer": 1_000_000,
            "square_foot": 0.092903,
            "ping": 3.30579
        }
    }
}


const categoryScenarioContainer = document.getElementById("category-scenarios-container")
const leftDropdown = document.getElementById("from-dropdown") as HTMLSelectElement
const rightDropdown = document.getElementById("to-dropdown") as HTMLSelectElement
const leftInput = document.getElementById("from-input") as HTMLInputElement
const rightInput = document.getElementById("to-input") as HTMLInputElement
let currentCategory: string | null = null


function checkButtonClicked(fromDropdown: HTMLSelectElement, rightDropdown: HTMLSelectElement,buttonPressed: HTMLElement) : string | null {
    // Check if element clicked is a button
    if (buttonPressed.tagName === 'BUTTON') {
        // Get button's data-category
        const button = buttonPressed.dataset.category

        // Check if button has a data-category and if category exist
        if (button && category.hasOwnProperty(button)) {

            // Clear dropdown menu options
            fromDropdown.options.length = 0
            rightDropdown.options.length = 0

            // Return name of button to populate dropdown
            return button
        }
    } 
    return null
}


function populateDropdowns(leftDropdown: HTMLSelectElement, rightDropdown: HTMLSelectElement, button: string) {
    // Retrieve all units in selected category
    const unitsInCategory = category[button].units

    // Populate dropdowns
    for (const unitNames in unitsInCategory) {
        const unit = unitsInCategory[unitNames]
        // Create new options
        const newOption = document.createElement('option') as HTMLOptionElement
        
        //Set value for new option (HTML)
        newOption.value = unit.name.toLowerCase().replace(" ","_")

        // Set displaying text for new option
        newOption.text = `${unit.name}(${unit.symbol})`

        // Add new options to leftDropdown
        leftDropdown.add(newOption)

        // Clone the new option and add to rightDropdown (an element can only have one parent)
        const clonedNewOption = newOption.cloneNode(true) as HTMLOptionElement
        rightDropdown.add(clonedNewOption)
    }
}


function convertUnit(value: number, sourceUnit: string, targetUnit: string, currentCategory: string): number {
    // Get conversion ratios
    const sourceToBaseRatio = conversionRatios[currentCategory].toAnchor[sourceUnit]
    const targetToSourceRatio = conversionRatios[currentCategory].toAnchor[targetUnit]

    // Convert from source unit to base unit
    const sourceValueInBaseUnit = value * sourceToBaseRatio

    // Convert from base unit to target unit
    const convertedValue = sourceValueInBaseUnit / targetToSourceRatio

    return convertedValue
}


if (categoryScenarioContainer) {
    categoryScenarioContainer.addEventListener('click', function(event) {
        const button = event.target as HTMLElement
        let buttonClicked = checkButtonClicked(leftDropdown, rightDropdown, button) as string
        if (buttonClicked) {
            currentCategory = buttonClicked //Track current category
            populateDropdowns(leftDropdown, rightDropdown, buttonClicked)
        }
    })
}


leftInput.addEventListener('input', function(){
    const sourceValue = Number(leftInput.value)
    if (currentCategory) {
        rightInput.value = convertUnit(sourceValue, leftDropdown.value, rightDropdown.value, currentCategory).toFixed(4).toString()
        }
    })


rightInput.addEventListener('input', function(){
    const sourceValue = Number(rightInput.value)
    if (currentCategory) {
        leftInput.value = convertUnit(sourceValue, rightDropdown.value, leftDropdown.value, currentCategory).toFixed(4).toString()
        }
    })


leftDropdown.addEventListener('change', function(){
    if (leftInput && currentCategory) {
        const sourceValue = Number(leftInput.value)
        rightInput.value = convertUnit(sourceValue, leftDropdown.value, rightDropdown.value, currentCategory).toFixed(4).toString()
    }
})


rightDropdown.addEventListener('change', function(){
    if (rightInput && currentCategory) {
        const sourceValue = Number(leftInput.value)
        leftInput.value = convertUnit(sourceValue, rightDropdown.value, leftDropdown.value, currentCategory).toFixed(4).toString()
    }
})

