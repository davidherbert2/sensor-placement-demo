import Map from "ol/Map";
import View from "ol/View";
import LayerGroup from "ol/layer/Group";
import {fromLonLat} from "ol/proj";
import MousePosition from "ol/control/MousePosition";
import Zoom from "ol/control/Zoom";

import * as geoconst from "./src/GeoConstants";
import * as layerspec from "./src/LayerSetup.js";
import LayerSwitcherControl from "./src/LayerSwitcherControl";

window.onload = () => {

    /**
     * List of map layers/groups
     */
    let layers = [        	               
        new LayerGroup({
            title: "Urban Observatory",
            switcherOpts: {
                expanded: true,
                icon: "satellite-dish"
            },
            layers: [
                layerspec.SENSORS('Air Quality', 'NO2', 200, true, "car-alt"),
                layerspec.SENSORS('Air Quality', 'PM2.5', 201, false, "smog"), 
                layerspec.SENSORS('Air Quality', 'PM10', 202, false, "smog")
            ]
        }),
        new LayerGroup({
            title: "Boundaries",
            switcherOpts: {
                expanded: true,
                icon: "draw-polygon"
            },
            layers: [
                layerspec.LA(),
                layerspec.LSOA(), 
                layerspec.OA()
            ]
        }),	
        new LayerGroup({
            title: "Office of National Statistics",
            switcherOpts: {
                expanded: true,
                icon: "user"
            },
            layers: [
                layerspec.IMD(), 
                layerspec.DISABILITY()
            ]
        }), 
        new LayerGroup({
            title: "Base maps",
            switcherOpts: {
                expanded: false,
                icon: "map"
            },
            layers: [layerspec.OPENSTREETMAP()]
        })		
    ];

	/**
	 * Create the map
	 */
	let map = new Map({
		target: "map",
		layers: layers,
		view: new View({
			center: fromLonLat(geoconst.NEWCASTLE_CENTROID),
            zoom: 14,
            minZoom: 10
		}),
		controls: [
			new MousePosition({
				projection: "EPSG:4326",
				coordinateFormat: (coord) => {
					return(`<strong>${coord[0].toFixed(4)},${coord[1].toFixed(4)}</strong>`);
				}
			}),
            new Zoom(),
            new LayerSwitcherControl({
                layers: layers
            })
		]
	});	
	
}
