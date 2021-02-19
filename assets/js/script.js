$( document ).ready(function() {


    /************************** Heat map set up ************************/

    // Leaflet base layer with OpenStreetMap for background 
    var baseLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoicmVnLWlzIiwiYSI6ImNramg0Nm40ZzR2bGwyemxnOWRsem4xdmwifQ.1kuHM5lWEUiJZCH4JvZVmA'
    });

    const cfg = {
        // if true: multiple points values are averaged instead of added 
        "absolute": true,
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        // if scaleRadius is false it will be the constant radius used in pixels
        "radius": 0.018,
        // The blur factor that will be applied to all datapoints.
        // The higher the blur factor is, the smoother the gradients will be
        "blur":0.85,
        "maxOpacity": .8,
        // scales the radius based on map zoom
        "scaleRadius": true,
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": false,
        // which field name in your data represents the latitude - default "lat"
        latField: "latitude",
        // which field name in your data represents the longitude - default "lng"
        lngField: "longitude",
        // which field name in your data represents the data value - default "value"
        // Empty because it is set later
        valueField: ""
    };

    // Modifies the "valueField" in a config object
    function setConfig(config, value){
        var newConfig = Object.assign({},config);;
        newConfig.valueField = value;
        return newConfig;
    }

    // Create separate heat map layers for SNR and RSSI
    var heatmapLayerSNR = new HeatmapOverlay(setConfig(cfg, "snr"));
    var heatmapLayerRSSI = new HeatmapOverlay(setConfig(cfg, "rssi"));

    // Create leaflet map
    var mycoveragemap = new L.Map('coveragemapid', {
        center: new L.LatLng(49.8728277, 8.6490228),
        zoom: 13,
        layers: [baseLayer, heatmapLayerSNR] //Default layers
    });
    
    // Add Layer Control to map
    var layerControl = new L.control.layers(null, null).addTo(mycoveragemap);
    layerControl.addBaseLayer(baseLayer, "Mapbox Light");


    /************************** Functions ************************/


    // Get array of beacon ids
    function getBeaconIDs(rawData) {
        var beaconIDs = [];

        if(rawData && (typeof rawData === "object")){
            Object.keys(rawData).forEach(element =>{
                var thisBeaconID = rawData[element].beaconID;
                beaconIDs.indexOf(thisBeaconID) === -1 ? beaconIDs.push(thisBeaconID) : null;
            });
        }
        return beaconIDs.sort(function(a, b){return a - b});
    }

    // Filter data with beacon id
    function filterByID(rawData, beaconID) {
        var filteredData = [];
        if(rawData && (typeof rawData === "object")){
            Object.keys(rawData).forEach(element =>{
                if (rawData[element].beaconID === beaconID){
                    filteredData.push(rawData[element]);
                }
            });
        }
        return filteredData;
    }

    // Add markers to map on beacon locations
    function setMarker(beaconLocations){
        var beaconMarkers = [];
        if(beaconLocations && (typeof beaconLocations === "object")){
            Object.keys(beaconLocations).forEach(element =>{
                var thisBeaconID = beaconLocations[element].beaconID;
                var thisBeaconDescription = beaconLocations[element].description;
                var marker = L
                    .marker([beaconLocations[element].latitude, beaconLocations[element].longitude])
                    .bindTooltip(`<b>Beacon ${thisBeaconID}</b> <br> ${thisBeaconDescription}`);
                beaconMarkers.push(marker);
            });
        }
        return L.layerGroup(beaconMarkers);
    }

    // Add all available beacon IDs to drop down menu
    function addBeaconMenu(data){
        var _beaconIDs = getBeaconIDs(currentData);
        $("#beaconID").empty();
        _beaconIDs.forEach(id =>{
            $("#beaconID").append(`<option value="${id}">Beacon ${id}</option>`);
         });
    }
    

    /************************** Variables ************************/


    // Variable for the currently selected Data Type
    var currentDataType = "SNR";

    // Variables for threshold values, min and max
    var minSNR = 0;
    var maxSNR = 20;
    var minRSSI = -90;
    var maxRSSI = -50;
    $("#thMin").val(minSNR);
    $("#thMax").val(maxSNR);

    // Variable for the currently selected data
    var currentData = demoData;

    // Variable for the currently selected beaconID
    var currentID = getBeaconIDs(currentData)[0];

    // Variable for the currently selected data filtered for the selected beacon
    var currentDataFiltered = filterByID(currentData, currentID);


    /************************** Initializing map and filter options  ************************/


    // Display default heat map
    heatmapLayerSNR.setData({min: minSNR, max: maxSNR, data: currentDataFiltered});
    heatmapLayerRSSI.setData({min: minRSSI, max: maxRSSI, data: currentDataFiltered});

    // Add list of beacon IDs to drop down menu
    addBeaconMenu(currentData);

    // Add markers for beacon locations on map
    var beaconMarkers = setMarker(demoBeacons);


    /************************** Filter options listener ************************/


    // Read file path on "Load Data" button click
    $("#btnLoadData").click(function(){
        // File path given in user input
        var filePath = $("#dataPath").val();
        // Reset visual feedback
        $("#dataPath").attr('class', 'form-control');
        $("#dataPathAlert").text("");
        
        if(filePath) {// Checks if a file path is given
            // Load JSON
            $.getJSON(filePath, function() {
            })
            .done(function(responseData) { // New data found
                currentData = responseData;

                // Add all available beacon IDs to drop down menu
                addBeaconMenu(currentData);

                // Set displayed beaconID to first in list
                currentID = getBeaconIDs(currentData)[0];

                // Display loaded data in map 
                currentDataFiltered = filterByID(responseData, currentID);
                heatmapLayerSNR.setData({min: minSNR, max: maxSNR, data: currentDataFiltered});
                heatmapLayerRSSI.setData({min: minRSSI, max: maxRSSI, data: currentDataFiltered});
                
                // Change visual feedback
                $("#dataPathAlert").text("");
                $("#dataPath").attr('class', 'form-control is-valid');
            })
            .fail(function(){
                // Change visual feedback
                $("#dataPathAlert").text("Loading JSON from path failed.");
                $("#dataPath").attr('class', 'form-control is-invalid');
            })  
        } else { // If no input given
            // Change visual feedback
            $("#dataPathAlert").text("Please enter URL path.");
            $("#dataPath").attr('class', 'form-control is-invalid');
        }
    });

    // Reset to demo data on "Reset" button click
    $("#btnResetData").click(function(){
        currentData = demoData;
        
        // Reset visual feedback
        $("#dataPath").val("");
        $("#dataPath").attr('class', 'form-control');
        $("#dataPathAlert").text("");

        // Add all available beacon IDs to drop down menu
        addBeaconMenu(currentData);

        // Set displayed beaconID to first in list
        currentID = getBeaconIDs(currentData)[0];

        // Display demo data in map
        currentDataFiltered = filterByID(demoData, currentID);
        heatmapLayerSNR.setData({min: minSNR, max: maxSNR, data: currentDataFiltered});
        heatmapLayerRSSI.setData({min: minRSSI, max: maxRSSI, data: currentDataFiltered});
    });

    // On radio button change (data type)
    $('input[type=radio][name=dataRadio]').change(function() {
        if (this.value == 'SNR') {
            // Change Min and Max value
            $("#thMin").val(minSNR);
            $("#thMax").val(maxSNR);

            // Change help text
            $("#helpMin").text("Minimal SNR");
            $("#helpMax").text("Maximal SNR");

            //Change heat map to SNR
            mycoveragemap.removeLayer(heatmapLayerRSSI);
            mycoveragemap.addLayer(heatmapLayerSNR);

            //Change dataShown variable
            currentDataType = "SNR";
        }
        else if (this.value == 'RSSI') {
            // Change Min and Max value
            $("#thMin").val(minRSSI);
            $("#thMax").val(maxRSSI);

            // Change help text
            $("#helpMin").text("Minimal RSSI");
            $("#helpMax").text("Maximal RSSI");

            //Change heat map to RSSI
            mycoveragemap.removeLayer(heatmapLayerSNR);
            mycoveragemap.addLayer(heatmapLayerRSSI);

            //Change dataShown variable
            currentDataType = "RSSI";
        }
    });

    // On display beacons location
    $("#beaconSwitch").click(function(){
        if($(this).is(':checked')){
            $("#beaconSwitchLabel").text("On")
             mycoveragemap.addLayer(beaconMarkers);
        } else {
            $("#beaconSwitchLabel").text("Off")
            mycoveragemap.removeLayer(beaconMarkers);
        }
    })

    // On min threshold input change
    $("#thMin").on("input", function(){
        if(currentDataType === "SNR"){
            minSNR = $("#thMin").val();
            heatmapLayerSNR.setData({min: minSNR, max: maxSNR, data: currentDataFiltered});
            //heatmapLayerSNR.setDataMin(minSNR);
        } else if(currentDataType === "RSSI"){
            minRSSI = $("#thMin").val();
            heatmapLayerRSSI.setData({min: minRSSI, max: maxRSSI, data: currentDataFiltered});
            // heatmapLayerRSSI.setDataMin(minRSSI);
        } else console.warn("Value for dataShown is not SNR or RSSI");
        console.log("changing min th worked")
    });

    // On max threshold input change
    $("#thMax").on("input", function(){
        if(currentDataType === "SNR"){
            maxSNR = $("#thMax").val();
            heatmapLayerSNR.setData({min: minSNR, max: maxSNR, data: currentDataFiltered});
            //var currentData = heatmapLayerSNR.getData();
            //heatmapLayerSNR.setDataMax(maxSNR);
            //heatmapLayerSNR.setDataMax(5);
        } else if(currentDataType === "RSSI"){
            maxRSSI = $("#thMax").val();
            heatmapLayerRSSI.setData({min: minRSSI, max: maxRSSI, data: currentDataFiltered});
            // heatmapLayerRSSI.setDataMax(maxRSSI);
        } else console.warn("Value for dataShown is not SNR or RSSI");
        console.log("changing max th worked")
    });

    // On beacon change beacon 
    $("#beaconID").on('change', function(){
        // Select beacon to display on coverage map
        var newSelectedID = Number(this.value);
        if (newSelectedID != currentID){
            currentDataFiltered = filterByID(currentData, newSelectedID);
            heatmapLayerSNR.setData({min: minSNR, max: maxSNR, data: currentDataFiltered});
            heatmapLayerRSSI.setData({min: minRSSI, max: maxRSSI, data: currentDataFiltered});
            console.log(`Filter: Changed coverage map from beaconID ${ currentID} to ${newSelectedID}`);
            currentID = newSelectedID;
        }
    })

    // Read data for map center on button click
    $("#btnUpdate").click(function(){
        // Select map center
        if (!$("#centerLat").val() || !$("#centerLng").val()){
            console.log("Filter: At least one center coordinate is empty")
        } else {
            mycoveragemap.setView([$("#centerLat").val(), $("#centerLng").val()], 12); // or flyTo instead of setView
        }
    });
 
});
