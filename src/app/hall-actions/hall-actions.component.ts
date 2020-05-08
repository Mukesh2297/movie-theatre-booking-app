import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hall-actions',
  templateUrl: './hall-actions.component.html',
  styleUrls: ['./hall-actions.component.css']
})
export class HallActionsComponent implements OnInit {

  displayHallInfo = true;

  editHallObj;

  isEdit: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  hallToBeEdited(event){

    console.log(event);
    this.editHallObj = event;

    if (this.editHallObj !== undefined){
      this.displayHallInfo = false;
      this.isEdit = true;

    }

  }

  createNewHall(){
    this.displayHallInfo = false;
    this.isEdit = false;
  }

  cancelFormEdit(event){
    this.displayHallInfo = event;
  }

  editedResponse(event){
    console.log(event);
    if (event.hasError === false){
      this.displayHallInfo = true;
    }
  }

}
