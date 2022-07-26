window.addEventListener("load", () => {
    document.all["viewDiv"].style.visibility = "visible";
    document.all["loadScreen"].style.visibility = "hidden";
});
require([
      "esri/config",
      "esri/Map",
      "esri/views/SceneView"
  ], function(esriConfig,Map, SceneView) {

    esriConfig.apiKey = "AAPKed898b01d6c0496282aa6c4d1d819efcKOhvqxaj6gDew8v29HlQBXwKBd3b624qYc9A__fj5mkd3FHMAZ0FZ6e2bjZeUg4g";

    const map = new Map({
      basemap: "arcgis-topographic", //Basemap layer service
      ground: "world-elevation", //Elevation service
    });

    const view = new SceneView({
      container: "viewDiv",
      map: map,
      camera: {
        position: {
          x: -76.1351, //Longitude
          y: 43.0392, //Latitude
          z: 2000//Meters
        },
        tilt: 60
      }
      });
    });
