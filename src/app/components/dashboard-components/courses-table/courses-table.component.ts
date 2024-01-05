import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss'],
  providers: [DatePipe]
})
export class CoursesTableComponent {

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.GetCoursesTable()
    this.GetUpCommingCourses()
  }


  //----------------------------------------------------------------------------------------------------------------------------------------------------------------
// COURSES TABLE

  courses_table:any;
  courses_table_cols:any;

  GetCoursesTable() {
    this.courses_table = [
      { status:"done",program:"1-Day Custom Advanced Driving",location: 'Las Vegas Motor Speedway',country:"USA", date: '2022-03-29' },
      { status:"done",program:"Advance [Counter-Ambush]",location: 'Las Vegas Motor Speedway',country:"USA", date: '2022-02-19' },
      { status:"done",program:"1-Day Custom Advanced Driving",location: 'WeatherTech Laguna Seca International Raceway',country:"USA", date: '2022-07-29' },
      { status:"done",program:"Advanced Management of Armored Vehicles",location: 'Las Vegas Motor Speedway',country:"USA", date: '2022-10-22' },
      { status:"done",program:"Advance [Counter-Ambush]",location: 'WeatherTech Laguna Seca International Raceway',country:"USA", date: '2023-02-01' },
      { status:"in progress", program:"Advanced Management of Armored Vehicles",location: 'Las Vegas Motor Speedway',country:"USA", date: '2023-06-20' },
   ];

   this.courses_table_cols=[
    { field: 'status', header: 'Status:' },
    { field: 'program', header: 'Program:' },
    { field: 'location', header: 'Location:' },
    { field: 'date', header: 'Date:' },
    ];
  }

  comming_courses_table:any;
  comming_courses_table_cols:any;
  merged_courses_table:any;

  GetUpCommingCourses() {
    this.comming_courses_table = [
      { status:"not done", program:"1-Day Custom Advanced Driving",location: 'Las Vegas Motor Speedway',country:"USA", date: '2023-11-20' },
      { status:"not done", program:"1-Day Custom Advanced Driving",location: 'WeatherTech Laguna Seca International Raceway',country:"USA", date: '2023-11-20' },
   ];

   this.comming_courses_table_cols=[
    { field: 'status', header: 'Status:' },
    { field: 'program', header: 'Program:' },
    { field: 'location', header: 'Location:' },
    { field: 'date', header: 'Date:' },
    ];

    this.merged_courses_table = this.courses_table.concat(this.comming_courses_table);
  }



}
