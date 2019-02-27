import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import { GoogleMap, LatLng, GoogleMapsEvent } from "@ionic-native/google-maps";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  map: GoogleMap;
  myLocationMarker = false;

  constructor(public navCtrl: NavController, private platform: Platform) {
    this.platform.ready().then(() => {
      if (this.platform.is("cordova")) {
        this.loadMap();
      }
    });
  }

  loadMap() {
    let location = new LatLng(39.548507, -8.979411);

    this.map = new GoogleMap("map", {
      backgroundColor: "white",
      controls: {
        compass: false,
        myLocationButton: false,
        myLocation: false,
        indoorPicker: false,
        zoom: false
      },
      gestures: {
        scroll: true,
        tilt: true,
        rotate: true,
        zoom: true
      },
      camera: {
        target: location,
        tilt: 0,
        zoom: 19,
        bearing: 0
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log("Map is ready!");
    });
  }

  toggleMyLocationMarker() {
    if (this.myLocationMarker) {
      this.map.setMyLocationEnabled(false);
      this.myLocationMarker = false;
    } else {
      this.map.setMyLocationEnabled(true);
      this.myLocationMarker = true;
    }
  }
}
