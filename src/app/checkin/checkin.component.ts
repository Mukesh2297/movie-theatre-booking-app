import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ScannerPopupComponent } from '../scanner-popup/scanner-popup.component';

declare var Instascan: any;

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],
})
export class CheckinComponent implements OnInit, OnDestroy {
  scanner = null;
  apiResponse;
  apiResponseMessage = null;
  selectedInd = 0;
  constructor(private apiService: ApiService, private scannerPopup: MatDialog) {}

  ngOnInit(): void {
    this.scanner = new Instascan.Scanner({
      video: document.getElementById('preview'),
      scanPeriod: 1,
      mirror: false,
      backgroundScan: false,
    });
    this.scanner.addListener('scan', (content, image) => {
      const checkinDetails = {
        qr_data: content,
      };
      this.apiService
        .post('bookings/checkin', checkinDetails)
        .subscribe((response: any) => {
          if (response.status === 'OK') {
            this.scannerPopup.open(ScannerPopupComponent, {data: {message: 'Checkin Confirmed'} });
          } else if (response.status === 'Already Checked In') {
            this.scannerPopup.open(ScannerPopupComponent, {data: {message: 'Already Checked In'} });
          } else {
            this.scannerPopup.open(ScannerPopupComponent, {data: {message: 'Checkin Error. Retry Again'} });
          }
        });
    });
    Instascan.Camera.getCameras()
      .then((cameras) => {
        this.apiResponse = cameras;
        if (cameras.length > 0 && this.selectedInd !== undefined) {
          this.scanner.start(this.apiResponse[this.selectedInd]);
        } else {
          alert('No cameras found.');
        }
      })
      .catch((e) => {
        alert(`Unable to access camera ${e}`);
      });
  }

  cameraChange(event) {
    this.selectedInd = event.value;
    this.scanner
      .stop()
      .then(() => this.scanner.start(this.apiResponse[this.selectedInd]));
  }

  back() {
    history.back();
  }

  ngOnDestroy(): void {
    this.scanner.stop();
  }
}
