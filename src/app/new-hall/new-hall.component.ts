import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-new-hall",
  templateUrl: "./new-hall.component.html",
  styleUrls: ["./new-hall.component.css"]
})
export class NewHallComponent implements OnInit {
  constructor(public http: HttpClient) {}

  ngOnInit(): void {}

  update(hallName, seatColumns, seatRows) {
    let hall_name = hallName.value;
    let total_rows = seatRows.value;
    let total_columns = seatColumns.value;

    let newhallDetails = new HttpParams()
      .set("name", hall_name)
      .set("total_rows", `${total_rows}`)
      .set("total_columns", `${total_columns}`);

    this.http
      .post("/halls", newhallDetails.toString(), {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        ),
        withCredentials: true
      })
      .subscribe(response => {
        console.log(response);
      });
  }
}
