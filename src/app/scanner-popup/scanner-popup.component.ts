import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scanner-popup',
  templateUrl: './scanner-popup.component.html',
  styleUrls: ['./scanner-popup.component.css']
})
export class ScannerPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , public router: Router ){}

  ngOnInit(): void {
  }

  back()
  {
    this.router.navigate(['/']);
  }

}
