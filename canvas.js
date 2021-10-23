// getting a reference to our HTML element
const canvas = document.querySelector('canvas')

// initiating 2D context on it
const c = canvas.getContext('2d')

window.onload = initDivMouseOver;
function initDivMouseOver() {
    // This is done so incredibly poorly
    // I'm sorry

    // CO
    var COROW = document.getElementById("COROW");
    COROW.mouseIsOver = false;
    COROW.onmouseover = function () {
        this.mouseIsOver = true;
    };
    COROW.onmouseout = function () {
        this.mouseIsOver = false;
    }
    COROW.onclick = function () {
        if (this.mouseIsOver) {
            document.getElementById("molecule").src = "resources/CO.pdb.gif";
            document.getElementById("SOURCES").innerHTML = "Typically originates from incomplete combustion of carbon fuels, such as that which occurs in car engines and power plants.";
            document.getElementById("EFFECTS").innerHTML = "When inhaled, carbon monoxide can prevent the blood from carrying oxygen. Exposure may cause dizziness, nausea and headaches. Exposure to extreme concentrations can lead to loss of consciousness.";
        }
    }
    //NO2
    var NO2ROW = document.getElementById("NO2ROW");
    NO2ROW.mouseIsOver = false;
    NO2ROW.onmouseover = function () {
        this.mouseIsOver = true;
    };
    NO2ROW.onmouseout = function () {
        this.mouseIsOver = false;
    }
    NO2ROW.onclick = function () {
        if (this.mouseIsOver) {
            document.getElementById("molecule").src = "resources/N02.pdb.gif";
            document.getElementById("SOURCES").innerHTML = "Main sources are fuel burning processes, such as those used in industry and transportation.";
            document.getElementById("EFFECTS").innerHTML = "Exposure may cause increased bronchial reactivity in patients with asthma, lung function decline in patients with Chronic Obstructive Pulmonary Disease (COPD), and increased risk of respiratory infections, especially in young children.";
        }
    }
    // O3
    var O3ROW = document.getElementById("O3ROW");
    O3ROW.mouseIsOver = false;
    O3ROW.onmouseover = function () {
        this.mouseIsOver = true;
    };
    O3ROW.onmouseout = function () {
        this.mouseIsOver = false;
    }
    O3ROW.onclick = function () {
        if (this.mouseIsOver) {
            document.getElementById("molecule").src = "resources/ozone.gif";
            document.getElementById("SOURCES").innerHTML = "Ozone is created in a chemical reaction between atmospheric oxygen, nitrogen oxides, carbon monoxide and organic compounds, in the presence of sunlight.";
            document.getElementById("EFFECTS").innerHTML = "Ozone can irritate the airways and cause coughing, a burning sensation, wheezing and shortness of breath. Additionally, ozone is one of the major components of photochemical smog.";
        }
    }
    // PM10
    var PM10ROW = document.getElementById("PM10ROW");
    PM10ROW.mouseIsOver = false;
    PM10ROW.onmouseover = function () {
        this.mouseIsOver = true;
    };
    PM10ROW.onmouseout = function () {
        this.mouseIsOver = false;
    }
    PM10ROW.onclick = function () {
        if (this.mouseIsOver) {
            document.getElementById("molecule").src = "resources/PM10.pdb.gif";
            document.getElementById("SOURCES").innerHTML = "Main sources are combustion processes (e.g. indoor heating, wildfires), mechanical processes (e.g. construction, mineral dust, agriculture) and biological particles (e.g. pollen, bacteria, mold).";
            document.getElementById("EFFECTS").innerHTML = "Inhalable particles can penetrate into the lungs. Short term exposure can cause irritation of the airways, coughing, and aggravation of heart and lung diseases, expressed as difficulty breathing, heart attacks and even premature death.";
        }
    }
    // PM25
    var PM25ROW = document.getElementById("PM25ROW");
    PM25ROW.mouseIsOver = false;
    PM25ROW.onmouseover = function () {
        this.mouseIsOver = true;
    };
    PM25ROW.onmouseout = function () {
        this.mouseIsOver = false;
    }
    PM25ROW.onclick = function () {
        if (this.mouseIsOver) {
            document.getElementById("molecule").src = "resources/PM2.5.pdb.gif";
            document.getElementById("SOURCES").innerHTML = "Main sources are combustion processes (e.g. power plants, indoor heating, car exhausts, wildfires), mechanical processes (e.g. construction, mineral dust) and biological particles (e.g. bacteria, viruses).";
            document.getElementById("EFFECTS").innerHTML = "Fine particles can penetrate into the lungs and bloodstream. Short term exposure can cause irritation of the airways, coughing and aggravation of heart and lung diseases, expressed as difficulty breathing, heart attacks and even premature death.";
        }
    }
    // SO2
    var SO2ROW = document.getElementById("SO2ROW");
    SO2ROW.mouseIsOver = false;
    SO2ROW.onmouseover = function () {
        this.mouseIsOver = true;
    };
    SO2ROW.onmouseout = function () {
        this.mouseIsOver = false;
    }
    SO2ROW.onclick = function () {
        if (this.mouseIsOver) {
            document.getElementById("molecule").src = "resources/S02.pdb.gif";
            document.getElementById("SOURCES").innerHTML = "Main sources are burning processes of sulfur-containing fuel in industry, transportation and power plants.";
            document.getElementById("EFFECTS").innerHTML = "Exposure causes irritation of the respiratory tract, coughing and generates local inflammatory reactions. These in turn, may cause aggravation of lung diseases, even with short term exposure.";
        }
    }
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

async function call() {
    // String Parsing to replace spaces with pluses in accordance to google API
    var address = document.getElementById('address').value;
    for (var i = 0; i < address.length; i++) {
        if (address.charAt(i) === ' ') {
            address = setCharAt(address, i, '+');
        }
    }
    // GeoCoding the given address into a latitude and longitude
    const googleResponse = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBGd8bfIjYaPa8KtpylOW69OwSWE-tiAmc");
    const googleData = await googleResponse.json();
    var lat = googleData.results[0].geometry.location.lat;
    var lon = googleData.results[0].geometry.location.lng;
    // Getting air quality data for resultant latitude and longitude
    const geoResponse = await fetch("https://api.breezometer.com/air-quality/v2/current-conditions?lat=" + lat + "&lon=" + lon + "&features=pollutants_concentrations,pollutants_aqi_information,health_recommendations,sources_and_effects&key=006c7b9ee6da46f792b0172252f2322e");
    const geoData = await geoResponse.json();
    console.log(geoData);
    // Carbon Monoxide
    var COCONC = geoData.data.pollutants.co.concentration.value + " " + geoData.data.pollutants.co.concentration.units;
    var COAQI = geoData.data.pollutants.co.aqi_information.baqi.aqi;
    var COCOLOR = " " + geoData.data.pollutants.co.aqi_information.baqi.color;
    document.getElementById("COCONC").innerHTML= COCONC;
    document.getElementById("COAQI").innerHTML= COAQI;
    document.getElementById("COAQI").style.color = COCOLOR;
    // Nitrogen Dioxide
    var NO2CONC = geoData.data.pollutants.no2.concentration.value + " " + geoData.data.pollutants.no2.concentration.units;
    var NO2AQI = geoData.data.pollutants.no2.aqi_information.baqi.aqi;
    var NO2COLOR = geoData.data.pollutants.no2.aqi_information.baqi.color;
    document.getElementById("NO2CONC").innerHTML= NO2CONC;
    document.getElementById("NO2AQI").innerHTML= NO2AQI;
    document.getElementById("NO2AQI").style.color =NO2COLOR;
    // Ozone
    var O3CONC = geoData.data.pollutants.o3.concentration.value + " " + geoData.data.pollutants.o3.concentration.units;
    var O3AQI = geoData.data.pollutants.o3.aqi_information.baqi.aqi;
    var O3COLOR = " " + geoData.data.pollutants.o3.aqi_information.baqi.color;
    document.getElementById("O3CONC").innerHTML= O3CONC;
    document.getElementById("O3AQI").innerHTML= O3AQI;
    document.getElementById("O3AQI").style.color = O3COLOR;
    // PM10
    var PM10CONC = geoData.data.pollutants.pm10.concentration.value + " " + geoData.data.pollutants.pm10.concentration.units;
    var PM10AQI = geoData.data.pollutants.pm10.aqi_information.baqi.aqi;
    var PM10COLOR = " " + geoData.data.pollutants.pm10.aqi_information.baqi.color;
    document.getElementById("PM10CONC").innerHTML= PM10CONC;
    document.getElementById("PM10AQI").innerHTML= PM10AQI;
    document.getElementById("PM10AQI").style.color = PM10COLOR;
    // PM25
    var PM25CONC = geoData.data.pollutants.pm25.concentration.value + " " + geoData.data.pollutants.pm25.concentration.units;
    var PM25AQI = geoData.data.pollutants.pm25.aqi_information.baqi.aqi;
    var PM25COLOR = " " + geoData.data.pollutants.pm25.aqi_information.baqi.color;
    document.getElementById("PM25CONC").innerHTML= PM25CONC;
    document.getElementById("PM25AQI").innerHTML= PM25AQI;
    document.getElementById("PM25AQI").style.color = PM25COLOR;
    // SO2
    var SO2CONC = geoData.data.pollutants.so2.concentration.value + " " + geoData.data.pollutants.so2.concentration.units;
    var SO2AQI = geoData.data.pollutants.so2.aqi_information.baqi.aqi;
    var SO2COLOR = " " + geoData.data.pollutants.so2.aqi_information.baqi.color;
    document.getElementById("SO2CONC").innerHTML= SO2CONC;
    document.getElementById("SO2AQI").innerHTML= SO2AQI;
    document.getElementById("SO2AQI").style.color = SO2COLOR;

    var CO = geoData.data.pollutants.co.concentration.value * 1.18;
    var NO2 = geoData.data.pollutants.no2.concentration.value * 1.95;
    var O3 = geoData.data.pollutants.o3.concentration.value * 2.03;
    var PM10 = geoData.data.pollutants.pm10.concentration.value;
    var PM25 = geoData.data.pollutants.pm25.concentration.value;
    var SO2 = geoData.data.pollutants.so2.concentration.value * 2.71;
    var total = CO+NO2+O3+PM10+PM25+SO2;
    console.log(total);
    // Now I will scale this to 1600 (perfect square)
    var multiplier = 1600/total;
    CO = Math.ceil(CO*multiplier);
    NO2 = Math.ceil(NO2*multiplier);
    O3 = Math.ceil(O3*multiplier);
    PM10 = Math.floor(PM10 * multiplier);
    PM25 = Math.floor(PM25*multiplier);
    SO2 = Math.floor(SO2 * multiplier);
    console.log("CO: " + CO); //mm = 28
    console.log("NO2: " + NO2); //mm = 46
    console.log("O3: " + O3); //mm = 48
    console.log("PM10: " + PM10); //mm~500
    console.log("PM25: " + PM25); //mm~250
    console.log("SO2: " + SO2); //mm=64
    var newTotal = CO+NO2+O3+PM10+PM25+SO2;
    var diff = 1600 - newTotal;
    CO = CO + diff;
    newTotal = CO+NO2+O3+PM10+PM25+SO2;
    console.log(newTotal);
    // Draw the grid on the canvas
    var boxes = 40;
    var rowIncrement = canvas.width/40;
    var colIncrement = canvas.height/40;
    for (var row = 0; row < boxes; row++) {
        for (var column = 0; column < boxes; column++) {
            var x = column * rowIncrement;
            var y = row * colIncrement;
            c.beginPath();
            c.lineWidth = 0.25;
            c.strokeStyle = "black";
            if (CO !== 0) {
                c.fillStyle = "#DCEDFF";
                CO--;
            } else if (NO2 !== 0){
                c.fillStyle = "#94B0DA";
                NO2--;
            } else if (O3 !== 0) {
                c.fillStyle = "#8F91A2";
                O3--;
            } else if (PM10 !== 0) {
                c.fillStyle = "#505A5B";
                PM10--;
            } else if (PM25 !== 0) {
                c.fillStyle = "#384D48";
                PM25--
            } else {
                c.fillStyle = "#343F3E";
            }
            c.rect(x, y, rowIncrement, colIncrement);
            c.fill();
            c.stroke();
            c.closePath();
        }
    }
}