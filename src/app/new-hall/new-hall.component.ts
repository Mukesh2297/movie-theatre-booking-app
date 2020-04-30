import { Component, OnInit, ViewChild, ComponentFactoryResolver, Injector, ViewContainerRef, ComponentRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { EditComponent } from '../edit/edit.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateHallComponent } from '../createHall/create-hall.component';


@Component({
  selector: 'app-new-hall',
  templateUrl: './new-hall.component.html',
  styleUrls: ['./new-hall.component.css'],
})
export class NewHallComponent implements OnInit {
  displayedColumns: string[] = ['s.no', 'name', 'rows', 'columns', 'actions'];

  apiResponse;

  hallInfo;

  apiResponseMessage: string;

  displayHallInfo = true;

  @ViewChild('createHallComponent' , {read: ViewContainerRef}) createHallComponent: ViewContainerRef;

  constructor(
    public http: HttpClient,
    private apiService: ApiService,
    private editDialog: MatDialog,
    private compFactoryResolver: ComponentFactoryResolver,
    private injector: Injector) {}

  ngOnInit() {
    this.getHallInfo();

  }

  // update(form) {
  //   const newHallDetails = form.value;

  //   this.apiService.post('halls', newHallDetails).subscribe((response) => {
  //     this.apiResponse = response;
  //     if (this.apiResponse.status === 'OK') {
  //       this.apiResponseMessage = 'Hall Created';
  //       setTimeout(() => {
  //         form.form.reset();
  //         this.formDirective.resetForm();
  //         this.apiResponseMessage = '';
  //       }, 1000);
  //     } else {
  //       this.apiResponseMessage = 'Something went wrong';
  //       setTimeout(() => {
  //         form.form.reset();
  //         this.formDirective.resetForm();
  //         this.apiResponseMessage = '';
  //       }, 2000);
  //     }
  //   });
  // }

  editHall(obj) {
    this.editDialog.open(EditComponent, {width: '300px', data: obj}).afterClosed().subscribe(response => {
        this.getHallInfo();
      });
  }

  async createNewHall() {
    const {CreateHallComponent} = await import('./../createHall/create-hall.component');
    const createHallCompFactory =  this.compFactoryResolver.resolveComponentFactory(CreateHallComponent);
    const {instance} = this.createHallComponent.createComponent(createHallCompFactory, null, this.injector);

  }

  showHallInfo() {
    this.displayHallInfo = true;
    // const viewRef = this.createHallComponent.get(this.createHallComponent.length - 1);
    // viewRef.detach();
  }


  getHallInfo() {
    this.apiService.get('halls').subscribe((response: any) => {
      this.hallInfo = new MatTableDataSource(response);
      this.hallInfo = this.hallInfo.filteredData.halls;
      console.log(this.hallInfo);
      });
  }

}
