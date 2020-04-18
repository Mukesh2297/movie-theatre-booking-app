import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";

declare var Instascan: any;

@Component({
  selector: "app-checkin",
  templateUrl: "./checkin.component.html",
  styleUrls: ["./checkin.component.css"],
})
export class CheckinComponent implements OnInit {
  scanner = null;
  apiResponseMessage = null;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.scanner = new Instascan.Scanner({
      video: document.getElementById("preview"),
      scanPeriod: 5,
    });
    this.scanner.addListener("scan", (content, image) => {
      console.log(content);
      const checkinDetails = {
        booking_id: content,
      };
      this.apiService
        .post("checkin", checkinDetails)
        .subscribe((response: any) => {
          if (response.status === "OK") {
            this.apiResponseMessage = "Checkin Confirmed";
          }
        });
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
