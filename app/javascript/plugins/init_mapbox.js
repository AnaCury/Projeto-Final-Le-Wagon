import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const fitMapToMarkers = (map, markers) => {
  if (markers.length > 0) {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
}};

const addMarkersToMap = (map, markers) => {
  markers.forEach((marker) => {
    const popup = new mapboxgl.Popup().setHTML(marker.info_window);

    new mapboxgl.Marker()
      .setLngLat([ marker.lng, marker.lat ])
      .setPopup(popup)
      .addTo(map);
  });
};



const addMarkerToMap = (map, marker) => {
    const popup = new mapboxgl.Popup().setHTML(marker.info_window);

    new mapboxgl.Marker()
      .setLngLat([ marker.lng, marker.lat ])
      .setPopup(popup)
      .addTo(map);
};

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/thiago690/ckt0ik1gy01kg17pdzfw2e6a1'
    });

    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl }));

      const markers = JSON.parse(mapElement.dataset.markers);
      markers.forEach((marker) => {
        if (marker) {
          new mapboxgl.Marker()
          .setLngLat([ marker.lng, marker.lat ])
          .addTo(map);
        }});
        addMarkersToMap(map, markers);
        fitMapToMarkers(map, markers);

      map.on('load', () => {
        setInterval(async () => {
      // make a GET request to parse the GeoJSON at the url
      const report = mapElement.dataset.report;
      let lastReport;
      console.log(report);
      if (report != '' && report != lastReport) {
        addMarkerToMap(map, JSON.parse(report))
        lastReport = report;
        }
        }, 5000);

    })
  };
}
export { initMapbox };
