import { Component, Input, OnInit } from '@angular/core';
import { Gateway } from '../model/gateway';


@Component({
  selector: 'app-gateway-detail',
  templateUrl: './gateway-detail.component.html',
  styleUrls: ['./gateway-detail.component.scss']
})
export class GatewayDetailComponent implements OnInit {

  @Input() gateway: Gateway = {} as Gateway;

  constructor() { }

  ngOnInit(): void {
  }

}
