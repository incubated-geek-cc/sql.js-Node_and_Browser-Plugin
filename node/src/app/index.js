import 'asset/css/leaflet.css';
const L=require('leaflet');
const SQL=require('asset/js/sql.js');
const MBTiles=require('Leaflet.TileLayer.MBTiles');
import 'asset/css/main.css';

var southWest = new L.LatLng(1.22557, 103.67592);
var northEast = new L.LatLng(1.4267, 104.02542);
var bounds = new L.LatLngBounds(southWest, northEast);
var mapCenter=new L.LatLng( 1.326135, 103.85067000000001 );

var map;
var mb;
function init() {
    mb = new L.TileLayer.MBTiles('asset/light_all.mbtiles', {
      minZoom: 11,
      maxZoom: 15,
      attribution: "<span class='prefix-attribution'><a href='https://www.onemap.sg/home/'><img src='asset/img/onemap.png' height='25px' width='25px' alt='onemap logo' /></a> New OneMap | Map data © contributors, <a href='http://SLA.gov.sg'>SLA</a> | <a href='https://www.buymeacoffee.com/geekcc' target='_blank'>Buy me a coffee! ☕</a></span>",
      zoomControl: false
    });

    map = L.map("map", {
        zoomControl:true,
        zoom: 11, 
        center: mapCenter
    });

    mb.on("databaseloaded", function(ev) {
        console.info("MBTiles DB loaded", ev);
        mb.addTo(map);
        map.fitBounds(bounds);
        map.setZoom(11);
        map.setView(mapCenter, 13);
    });
    mb.on("databaseerror", function(ev) {
        console.info("MBTiles DB error", ev);
    });
};
init();