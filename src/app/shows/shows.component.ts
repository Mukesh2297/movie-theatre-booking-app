import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

  editObj: object;

  isEdit = false;

  displayShowInfo = false;

  constructor() { }

  ngOnInit(): void {
  }

  showToBeEdited(event){
    console.log(event);
    this.editObj = event;
  }

  editResponse(event){

    console.log(event);
    this.isEdit = event;
    this.displayShowInfo = event;
  }

  createNewShow(){
    this.displayShowInfo = true;
    this.isEdit = false;
  }

  formEditCancelled(event){
    this.displayShowInfo = !event;
  }

}
