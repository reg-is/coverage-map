$( document ).ready(function() {

    // Leaflet
    var mymap = L.map('testmapid').setView([49.8728277,8.6490228], 13);

    // Load Map Tile
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11', // mapbox/satellite-v9
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoicmVnLWlzIiwiYSI6ImNramg0Nm40ZzR2bGwyemxnOWRsem4xdmwifQ.1kuHM5lWEUiJZCH4JvZVmA'
    }).addTo(mymap);


    // Add Marker
    var marker = L.marker([49.8728277,8.6490228]).addTo(mymap);

    // Add Circle
    var circle = L.circle([49.8752301,8.6534799], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 200
    }).addTo(mymap);

    // Add Polygon
    var polygon = L.polygon([
        [49.872, 8.649],
        [49.875, 8.65],
        [49.875, 8.66]
    ]).addTo(mymap);

    // Add Popup
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    circle.bindPopup("I am a circle.");
    polygon.bindPopup("I am a polygon.");

    var popup = L.popup()
    .setLatLng([49.885, 8.67])
    .setContent("I am a standalone popup.")
    .openOn(mymap);

    // Add Tool Tip
    circle.bindTooltip("my tooltip text").openTooltip();

    // On Click Event
    function onMapClick(e) {
        // alert("You clicked the map at " + e.latlng);
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng)
            .openOn(mymap);
    }
    
    mymap.on('click', onMapClick);


    // Layer Groups 
    // Tutorial: https://leafletjs.com/examples/layers-control/
    var daHBF = L.marker([49.872291, 8.629417]),
        daOstBF = L.marker([49.860452, 8.687782]),
        daSuedBF = L.marker([49.854033, 8.636799]);

    var bahnhoefe = L.layerGroup([daHBF, daOstBF, daSuedBF]);

    // Layer Control
    // Tutorial: https://leafletjs.com/examples/layers-control/
    var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoicmVnLWlzIiwiYSI6ImNramg0Nm40ZzR2bGwyemxnOWRsem4xdmwifQ.1kuHM5lWEUiJZCH4JvZVmA'
            }),

        outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/outdoors-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoicmVnLWlzIiwiYSI6ImNramg0Nm40ZzR2bGwyemxnOWRsem4xdmwifQ.1kuHM5lWEUiJZCH4JvZVmA'
            }),

        light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/light-v10',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoicmVnLWlzIiwiYSI6ImNramg0Nm40ZzR2bGwyemxnOWRsem4xdmwifQ.1kuHM5lWEUiJZCH4JvZVmA'
            }),

        satellite = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/satellite-v9',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoicmVnLWlzIiwiYSI6ImNramg0Nm40ZzR2bGwyemxnOWRsem4xdmwifQ.1kuHM5lWEUiJZCH4JvZVmA'
            }),
        
        satelliteAndStreet = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/satellite-streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoicmVnLWlzIiwiYSI6ImNramg0Nm40ZzR2bGwyemxnOWRsem4xdmwifQ.1kuHM5lWEUiJZCH4JvZVmA'
            });

    mymap.layers = [streets, outdoors, light, satellite, satelliteAndStreet];

    var baseMaps = {
        "Straßen": streets,
        "Outdoor": outdoors,
        "Hell": light,
        "Satellit": satellite,
        "Satellit und Straßen": satelliteAndStreet
    };
    
    var overlayMaps = {
        "Bahnhöfe": bahnhoefe
    };

    L.control.layers(baseMaps, overlayMaps).addTo(mymap);


    // heatmap.js Coverage Map


    var testData2 = {
        max: 20,
        min: 0,
        data: data
      };
      
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
        "radius": 0.005,
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

    var heatmapLayerSNR = new HeatmapOverlay(setConfig(cfg, "snr"));
    var heatmapLayerRSSI = new HeatmapOverlay(setConfig(cfg, "rssi"));

    var overlayLayers = {
        "Coverage Map SNR": heatmapLayerSNR,
        "Coverage Map RSSI": heatmapLayerRSSI
    };


    var mycoveragemap = new L.Map('coveragemapid', {
        center: new L.LatLng(49.8728277, 8.6490228),
        zoom: 12,
        layers: [baseLayer, heatmapLayerSNR] //Default layers
    });
    

    var layerControl = new L.control.layers(null, overlayLayers).addTo(mycoveragemap);
    layerControl.addBaseLayer(baseLayer, "Mapbox Light");
    //layerControl.addOverlay(heatmapLayerSNR, "heatmap SNR");
    //layerControl.addOverlay(heatmapLayerRSSI, "heatmap RSSI");
    //L.control.layers(baseLayer, null).addTo(mycoveragemap);

    heatmapLayerSNR.setData({min: 0, max: 20, data: data});
    heatmapLayerRSSI.setData({min: 50, max: 90, data: data});

    //Get array of Beacon ids
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

    //Filter data with beacon id
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

    //Add list of Beacon IDs to from
    var beaconIDs = getBeaconIDs(data);
    beaconIDs.forEach(id =>{
        $("#beaconID").append(`<option value="${id}">Beacon ${id}</option>`);
    });

    // variable with the currently selected beaconID
    var selectedID = getBeaconIDs(data)[0];

    // variable with the currently selected Data Type
    var dataShown = "SNR";

    //Default threshold values, min and max
    var minSNR = 0;
    var maxSNR = 20;
    var minRSSI = 50;
    var maxRSSI = 90;
    $("#thMin").val(minSNR);
    $("#thMax").val(maxSNR);

    // Default heatmap
    var currentData = filterByID(data, selectedID);
    heatmapLayerSNR.setData({min: minSNR, max: maxSNR, data: currentData});
    heatmapLayerRSSI.setData({min: minRSSI, max: maxRSSI, data: currentData});

    // On radio button change
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
            dataShown = "SNR";
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
            dataShown = "RSSI";
        }
    });

    // On min threshold input change
    $("#thMin").on("input", function(){
        if(dataShown === "SNR"){
            minSNR = $("#thMin").val();
            heatmapLayerSNR.setData({min: minSNR, max: maxSNR, data: currentData});
            //heatmapLayerSNR.setDataMin(minSNR);
        } else if(dataShown === "RSSI"){
            minRSSI = $("#thMin").val();
            heatmapLayerRSSI.setData({min: minRSSI, max: maxRSSI, data: currentData});
            // heatmapLayerRSSI.setDataMin(minRSSI);
        } else console.warn("Value for dataShown is not SNR or RSSI");
        console.log("changing min th worked")
    });

    // On max threshold input change
    $("#thMax").on("input", function(){
        if(dataShown === "SNR"){
            maxSNR = $("#thMax").val();
            heatmapLayerSNR.setData({min: minSNR, max: maxSNR, data: currentData});
            //var currentData = heatmapLayerSNR.getData();
            //heatmapLayerSNR.setDataMax(maxSNR);
            //heatmapLayerSNR.setDataMax(5);
        } else if(dataShown === "RSSI"){
            maxRSSI = $("#thMax").val();
            heatmapLayerRSSI.setData({min: minRSSI, max: maxRSSI, data: currentData});
            // heatmapLayerRSSI.setDataMax(maxRSSI);
        } else console.warn("Value for dataShown is not SNR or RSSI");
        console.log("changing max th worked")
    });


    // Read data from filter options on button click
    $("#btnUpdate").click(function(){

        // Select beacon to display on coverage map
        var newSelectedID = Number($("#beaconID").val());
        if (newSelectedID != selectedID){
            currentData = filterByID(data, newSelectedID);
            heatmapLayerSNR.setData({min: minSNR, max: maxSNR, data: currentData});
            heatmapLayerRSSI.setData({min: minRSSI, max: maxRSSI, data: currentData});
            console.log(`Filter: Changed coverage map from beaconID ${ selectedID} to ${newSelectedID}`);
            selectedID = newSelectedID;
        }

        // Select map center
        if (!$("#centerLat").val() || !$("#centerLng").val()){
            console.log("Filter: At least one center coordinate is empty")
        } else {
            mycoveragemap.setView([$("#centerLat").val(), $("#centerLng").val()], 12); // or flyTo instead of setView
        }

        // Select data type to display on Map 
        var dataType = $("input[name='dataRadio']:checked").val();
        if (dataType == "SNR"){
            mycoveragemap.removeLayer(heatmapLayerRSSI);
            mycoveragemap.addLayer(heatmapLayerSNR);
            dataShown = "SNR";
        }else if (dataType == "RSSI"){
            mycoveragemap.removeLayer(heatmapLayerSNR);
            mycoveragemap.addLayer(heatmapLayerRSSI);
            dataShown = "RSSI";
        }
        
      });
 
    

   // Show and Hide Example map
   $("#testMap").hide();
   $("#btnExample").click(function(){
        $("#testMap").toggle();
   });
    

});
