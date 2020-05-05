import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-shows-table',
  templateUrl: './shows-table.component.html',
  styleUrls: ['./shows-table.component.css']
})
export class ShowsTableComponent implements OnInit {

  displayedColumns: string[] = ['s.no', 'hall_name', 'show_time',  'actions'];

  tableData;

  @Input() private showInfo;

  constructor() { }

  ngOnInit() {
    console.log(this.showInfo);
    this.tableData = new MatTableDataSource(this.showInfo);
    this.tableData = this.tableData.filteredData;
  }

}
