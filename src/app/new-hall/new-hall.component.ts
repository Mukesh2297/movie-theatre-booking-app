import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-new-hall",
  templateUrl: "./new-hall.component.html",
  styleUrls: ["./new-hall.component.css"],
})
export class NewHallComponent implements OnInit {
  apiResponse;

  apiResponseMessage:string;

  constructor(public http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {}

  update(hallName, seatColumns, seatRows) {
    let hall_name = hallName.value;
    let total_rows = seatRows.value;
    let total_columns = seatColumns.value;

    const newHallDetails = {
      name: hall_name,
      total_rows: `${total_rows}`,
      total_columns: `${total_columns}`,
    };

    this.apiService.post("halls", newHallDetails).subscribe((response) => {
      this.apiResponse = response;
      if(this.apiResponse.status=="OK")
      {

        this.apiResponseMessage = "Hall Created";
      }
    });
  }
}
