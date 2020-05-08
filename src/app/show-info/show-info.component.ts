import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.css']
})
export class ShowInfoComponent implements OnInit {

  displayedColumns: string[] = ['s.no', 'hallName', 'showTime',  'actions'];

  showInfo;

  showTable: boolean;

  movies;

  dateArr: any[] = [];

  dayArr: any[] = [];

  daySelected;

  dateValue = 0;

  @Output() editObj =  new EventEmitter<object>();

  @Output() isEdit = new EventEmitter<boolean>();

  isMovieSelected = false;

  selectedMovieId: number;

  constructor(private apiService: ApiService, private appService: AppService ) { }

  ngOnInit(): void {
  this.dateArr = this.appService.dateArr;
  this.dayArr = this.appService.dayArr;
  this.apiService.get('movies').subscribe((response: any) => { this.movies = response.movies; });
  }

  selectedMovie(event) {

    this.selectedMovieId = event.value;
    this.dateValue = 0;
    const daySelected = this.appService.getFormattedDate(this.dateValue);
    const params = {id: this.selectedMovieId, date: daySelected};

    this.getMovieInfo(params);
  }

  DisplayAvailableShows(event) {
    this.daySelected = this.appService.getFormattedDate(event.value);
    const params = {id: this.selectedMovieId, date: this.daySelected};

    this.getMovieInfo(params);

  }

  editShow(showObj) {

    console.log(showObj);

    const selectedObj = {movieId: this.selectedMovieId,
      hall_name: showObj.hall_name,
      show_time: showObj.show_time,
      show_id: showObj.show_id };

    this.editObj.emit(selectedObj);
    this.isEdit.emit(true);

  }


  getMovieInfo(params) {
    this.apiService.get('movies/showtime', params).subscribe((response: any) => {
      // const apiResponse = response.movies.map(arrItem => arrItem.availability );
      const apiResponse = response.movies.reduce((curr, obj) => {
        return [...curr, ...obj.availability];
      }, []);
      console.log(apiResponse);
      if (apiResponse.length > 0) {
        this.showInfo = apiResponse;
        this.showTable = true;
      } else { this.showInfo = false; }
      // this.showInfo = new MatTableDataSource(response);
      // this.showInfo = this.showInfo.filteredData.movies[0].availability;
    });

  }

}
















// const tableDataSource = response.movies.map((value) => value);
    //         this.showInfo = new MatTableDataSource(tableDataSource);
    //         console.log(this.showInfo);
    //         // this.showInfo = this.showInfo
    //         console.log(typeof this.showInfo);
    //         this.showTable = true;
    //       } else { this.showTable = false; }
    // //   this.showInfo = new MatTableDataSource(response.movies.availability);
    // //  // this.showInfo = this.showInfo.movies.map(movieItem => movieItem.availability);
    // //   console.log(this.showInfo);
    // //
