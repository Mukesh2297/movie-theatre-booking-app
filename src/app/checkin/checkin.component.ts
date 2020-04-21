import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiService } from "../services/api.service";

declare var Instascan: any;

@Component({
  selector: "app-checkin",
  templateUrl: "./checkin.component.html",
  styleUrls: ["./checkin.component.css"],
})
export class CheckinComponent implements OnInit, OnDestroy {
  scanner = null;
  apiResponse;
  apiResponseMessage = null;
  selectedInd = 0;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    Instascan.Camera.getCameras()
      .then((cameras) => {
        this.apiResponse = cameras;
        alert(JSON.stringify(cameras));
        if (cameras.length > 0 && this.selectedInd !== undefined) {
          // alert(JSON.stringify(cameras));
          this.scanner.start(cameras[1]);
        } else {
          alert("No cameras found.");
        }
      })
      .catch((e) => {
        alert(e);
      });
    this.scanner = new Instascan.Scanner({
      video: document.getElementById("preview"),
      scanPeriod: 5,
      mirror: false,
    });
    this.scanner.addListener("scan", (content, image) => {
      const checkinDetails = {
        qr_data: content,
      };
      this.apiService
        .post("bookings/checkin", checkinDetails)
        .subscribe((response: any) => {
          if (response.status === "OK") {
            this.apiResponseMessage = "Checkin Confirmed";
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.scanner.stop();
  }

  cameraChange(event) {
    alert(event.value);

    this.selectedInd = event.value;

    Instascan.Camera.getCameras()
      .then((cameras) => {
        this.apiResponse = cameras;
        alert(cameras);
        this.scanner.start(cameras[this.selectedInd]);
      })
      .catch((e) => {
        alert(e);
      });
    this.scanner = new Instascan.Scanner({
      video: document.getElementById("preview"),
      scanPeriod: 5,
      mirror: false,
    });
    this.scanner.addListener("scan", (content, image) => {
      const checkinDetails = {
        qr_data: content,
      };
      this.apiService
        .post("bookings/checkin", checkinDetails)
        .subscribe((response: any) => {
          if (response.status === "OK") {
            this.apiResponseMessage = "Checkin Confirmed";
          }
        });
    });
  }

  back() {
    history.back();
  }
}
