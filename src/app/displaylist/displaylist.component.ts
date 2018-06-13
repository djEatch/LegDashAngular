import { Component, OnInit, ViewChild } from '@angular/core';
import {Sort, MatSort, MatTableDataSource} from '@angular/material';
import {Server} from '../server';
import {Servers} from '../servers';
import { GetserverlistService } from '../getserverlist.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-displaylist',
  templateUrl: './displaylist.component.html',
  styleUrls: ['./displaylist.component.css']
})
export class DisplaylistComponent implements OnInit {

  servers: Observable<Server[]>;

  constructor(private sls:GetserverlistService){}

  getServers():void{
    this.servers = this.sls.getList();
  }

   displayedColumns = ['name', 'hostname', 'port', 'path'];

   //@ViewChild(MatSort) sort: MatSort;



   sortData(sort: Sort) {
    
    let data: Server[] = [];
    this.servers.subscribe((servers) => {data = servers as Server[]});
    if (!sort.active || sort.direction == '') {
      this.servers = of(data);
      return;
    }

    this.servers = of(data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'hostname': return compare(+a.hostname, +b.hostname, isAsc);
        case 'port': return compare(+a.port, +b.port, isAsc);
        case 'path': return compare(+a.path, +b.path, isAsc);
        default: return 0;
      }
    }));

  } 

  ngOnInit() {
    this.getServers();
    //this.dataSource.sort = this.sort;
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

