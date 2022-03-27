import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/appState';
import { ILineitem } from 'src/app/store/products/products.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  // TODO: rename til cart
  @Select((state: AppState) => state.user.cart)
  cart$?: Observable<ILineitem[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
