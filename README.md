# LoRa Coverage Map Creation


## Installation

### Used solution: heatmap.js leaflet plugin
The following files of [heatmap.js](https://github.com/pa7/heatmap.js) plugin can be found in `assets/js/`:
- `heatmap.js` and `leaflet-heatmap.js` are from the original repository of [heatmap.js](https://github.com/pa7/heatmap.js). Only the second one is used for this project. 
- `heatmap.min.js` is a fork of (heatmap.js](https://github.com/pa7/heatmap.js) by [Woracheth](https://github.com/Woracheth/heatmap.js). It resolves the issue of the original repository where multiple points at the same position would increase the intensity. In our case we want that multiple points are averaged.

### Alternative solution: Leaflet.heat plugin
An alternative leaflet-plugin for creating heat maps is `Leaflet.heat`. This solution was tested but finally not used because it has the unwanted behavior adding values of multiple points at the same location instead of averaging them. 

For Leaflet.heat there are multiple versions of the plugin in `assets/js/`:
- `Leaflet.heat` is the original version of [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat)
- `Leaflet.heat-patch-1` is a fork by [Harvinator](https://github.com/Harvinator/Leaflet.heat/tree/patch-1) with a couple of improvements
- `Leaflet.heat-patch-2` is a fork by us with the improvements of [Harvinator](https://github.com/Harvinator/Leaflet.heat/tree/patch-1) and ?


## Dependencies
- [Leaflet](https://leafletjs.com)
- [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat)
- [Better Version for Leaflet.heat?](https://github.com/Harvinator/Leaflet.heat/tree/patch-1)

## Docu


\paragraph{leaflet.heat}
\todo{add description of leaflet.heat}
This plugin can visualize the intensity value of given points in a map as a heat map. For the points a radius and a blur factor can be set.
If there are multiple points at the same location, their intensities are added up to a higher intensity.
This behavior is not wanted for coverage maps. For multiple data points the signal quality (intensity) should not be added up.
A too good signal quality would be displayed.
Averaging the signal quality of multiple points at the smae location 
  adding values of multiple points at the same location instead of averaging them. 

\paragraph{heatmap.js}
\todo{add description of heatmap.js}

\subsubsection{Functions of the coverage map}
To make the coverage map more usable, filters for the collected data have been added.

A drop down menu was added where all the beacons found are listed and users can choose for which beacon the coverage map is displayed.
With radio buttons it can be chosen ether if the \gls{SNR} or the \gls{RSSI} should be visualized in the map.
\todo{implement filter for max and min value}
A min and max threshold value for the data be set. Every measured data point below the min threshold value will not be shown on the map. Every measured data point above and equal to the max threshold value will have the same color on the map.

## Future work

- fine tune radius and blur factor and maybe add option to change it manually in the frontend.