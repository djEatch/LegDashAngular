import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

// import * from './getserverlist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';



  // showServerList() {
  //   this.configService.getConfig()
  //     .subscribe((data: Config) => this.config = {
  //         heroesUrl: data['heroesUrl'],
  //         textfile:  data['textfile']
  //     });
  // }
}

