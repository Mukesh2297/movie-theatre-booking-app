import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

declare var Instascan: any;

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],
})
export class CheckinComponent implements OnInit {
  scanner = null;
  apiResponse;
  apiResponseMessage = null;
  selectedInd = 0;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.scanner = new Instascan.Scanner({
      video: document.getElementById('preview'),
      scanPeriod: 5,
    });
    this.scanner.addListener('scan', (content, image) => {
      const checkinDetails = {
        qr_data: content,
      };
      this.apiService
        .post('bookings/checkin', checkinDetails)
        .subscribe((response: any) => {
          if (response.status === 'OK') {
            this.apiResponseMessage = 'Checkin Confirmed';
          }
        });
    });
    Instascan.Camera.getCameras()
      .then((cameras) => {
        this.apiResponse = cameras;
        console.log(this.apiResponse);
        if (cameras.length > 0) {
          alert(JSON.stringify(cameras));
          this.scanner.start(cameras[this.selectedInd]);
        } else {
          console.error('No cameras found.');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  ngOnDestroy(): void {
    this.scanner.stop();
  }

  back() {
    history.back();
  }
}
