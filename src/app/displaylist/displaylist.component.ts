import { Component, OnInit, ViewChild } from "@angular/core";
import {
  Sort,
  MatSort,
  MatTableDataSource,
  MatSelect,
  MatOption
} from "@angular/material";
import { Server } from "../server";
import { MasterLB } from "../master-lb";
// import {Servers} from '../servers';
import { GetserverlistService } from "../getserverlist.service";
import { Observable, of } from "rxjs";
import { GetMasterLBListService } from "../get-master-lblist.service";
import { take } from "rxjs/operators";
import { GetSubLBListService } from "../get-sub-lblist.service";

@Component({
  selector: "app-displaylist",
  templateUrl: "./displaylist.component.html",
  styleUrls: ["./displaylist.component.css"]
})
export class DisplaylistComponent implements OnInit {
  servers: Observable<Server[]>;
  masterLBs: Observable<MasterLB[]>;
  selectedMLB: MasterLB;

  constructor(
    private sls: GetserverlistService,
    private mlbl: GetMasterLBListService,
    private slbl: GetSubLBListService
  ) {}

  getServers(): void {
    this.servers = this.sls.getList();
  }

  getMasterLBs(): void {
    this.masterLBs = this.mlbl.getList();
  }

  displayedServerColumns = ["name", "hostname", "port", "path"];
  displayedMLBColumns = ["environmentType", "address", "endPoint"];

  //@ViewChild(MatSort) sort: MatSort;

  mlbselected(event: any) {
    const tempMLBs = this.masterLBs.pipe(take(1));
    const tempMLBsubscribe = tempMLBs.subscribe(val => {
      console.log(val);
      console.log(event.value);
      this.selectedMLB = val.find(element=> element.environmentType == event.value);
      console.log(this.selectedMLB);
      const tempSLBsubscribe = this.slbl.getList(this.selectedMLB).subscribe(
        val => {console.log(val)}
      );
    });
  }

  sortServerData(sort: Sort) {
    let data: Server[] = [];
    this.servers.subscribe(servers => {
      data = servers as Server[];
    });
    if (!sort.active || sort.direction == "") {
      this.servers = of(data);
      return;
    }

    this.servers = of(
      data.sort((a, b) => {
        let isAsc = sort.direction == "asc";
        switch (sort.active) {
          case "name":
            return compare(a.name, b.name, isAsc);
          case "hostname":
            return compare(+a.hostname, +b.hostname, isAsc);
          case "port":
            return compare(+a.port, +b.port, isAsc);
          case "path":
            return compare(+a.path, +b.path, isAsc);
          default:
            return 0;
        }
      })
    );
  }

  ngOnInit() {
    this.getMasterLBs();
    this.getServers();
    //this.dataSource.sort = this.sort;
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
