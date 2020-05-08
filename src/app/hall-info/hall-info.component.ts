import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-hall-info',
  templateUrl: './hall-info.component.html',
  styleUrls: ['./hall-info.component.css']
})
export class HallInfoComponent implements OnInit {

  displayedColumns: string[] = ['s.no', 'name', 'rows', 'columns', 'actions'];

  apiResponse;

  hallInfo;

  apiResponseMessage: string;

  @Output() editHallObj = new EventEmitter<any>();

  updateHallResponse;

 //  @ViewChild('createHallComponent' , {read: ViewContainerRef}) createHallComponent: ViewContainerRef;

  constructor(
    public http: HttpClient,
    private apiService: ApiService) {}

  ngOnInit() {
    console.log('HallInfo Updated');
    this.getHallInfo();

  }

  editHall(obj) {
    this.editHallObj.emit(obj);
  }

  getHallInfo() {
    this.apiService.get('halls').subscribe((response: any) => {
      this.hallInfo = new MatTableDataSource(response);
      this.hallInfo = this.hallInfo.filteredData.halls;
      console.log(this.hallInfo);
      });
  }



}
