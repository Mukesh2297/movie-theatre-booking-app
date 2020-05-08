import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  editMovieObj;

  isEdit: boolean;

  displayMovieInfo = true;

  constructor() { }

  ngOnInit(): void {
  }

  createNewMovie(){
    this.displayMovieInfo = false;
    this.isEdit = false;
  }


  movieToBeEdited(event){
    console.log(event);
    this.editMovieObj = event;
    if (this.editMovieObj !== null){
      this.displayMovieInfo = false;
      this.isEdit = true;
    }
  }

  cancelFormEdit(event){
    this.displayMovieInfo = event;
  }

  editedResponse(event){
    console.log(event);
    if (event.hasError === false){
      this.displayMovieInfo = true;
    }
  }

}
