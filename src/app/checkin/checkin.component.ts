import { Component, OnInit } from "@angular/core";

declare var Instascan: any;

@Component({
  selector: "app-checkin",
  templateUrl: "./checkin.component.html",
  styleUrls: ["./checkin.component.css"],
})
export class CheckinComponent implements OnInit {
  scanner = null;

  constructor() {}

  ngOnInit(): void {
    this.scanner = new Instascan.Scanner({
      video: document.getElementById("preview"),
      scanPeriod: 5,
    });
    this.scanner.addListener("scan", (content, image) => {
      console.log(content);
    });
    Instascan.Camera.getCameras()
      .then((cameras) => {
        if (cameras.length > 0) {
          this.scanner.start(cameras[0]);
        } else {
          console.error("No cameras found.");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  ngOnDestroy(): void {
    this.scanner.stop();
  }
}
