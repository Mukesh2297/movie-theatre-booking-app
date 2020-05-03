import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.css']
})
export class ShowInfoComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.get('shows').subscribe(response => console.log(response));
  }

}
