import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {

  displayedColumns: string[] = ['s.no', 'name', 'ticket_price',  'actions'];

  @Output() editMovieObj = new EventEmitter<object>();

  movieInfo;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('movies').subscribe((response: any) => {
    this.movieInfo = new MatTableDataSource(response);
    this.movieInfo = this.movieInfo.filteredData.movies;
    console.log(this.movieInfo); });
  }

  editMovie(obj){
    this.editMovieObj.emit(obj);
  }

}
