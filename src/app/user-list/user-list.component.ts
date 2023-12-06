import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private http:SharedService, private router:Router, private dialog:MatDialog){}

  dataSource!:MatTableDataSource<any>;
  displayedColumns:string[] = ["id",'name','userName','password','actions']

  loggedInUser:any = {};

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;


  ngOnInit(){
      this.http.getDataFromServer('users').subscribe((response:any)=>{
        if(response && response.length > 0){
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;

          this.dataSource.sort = this.sort
        }
      });

      const loggedUser = sessionStorage.getItem('loggedInUser');
      if(loggedUser){
        this.loggedInUser = JSON.parse(loggedUser);
      }
  }

deleteData(row:any, index:number){

  let config = new MatDialogConfig();
  config.width = '700px';
  const dialogRef = this.dialog.open(DialogBoxComponent);
  dialogRef.afterClosed().subscribe((result:boolean)=>{
    if(result == true){
      const url = 'users/' + row.id;
      this.http.deleteDataFromServer(url).subscribe((result:any)=>{
        const data = this.dataSource.data;
        data.splice(index,1);
        this.dataSource.data = data;
        // this.dataSource._updateChangeSubscription();
      })
    }
  })

}

logout(){
  sessionStorage.removeItem('flag')
  sessionStorage.removeItem('loggedInUser')
  this.router.navigate(['/login'])
}
}
