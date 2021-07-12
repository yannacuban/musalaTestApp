import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { Gateway } from '../model/gateway';
import { ParamsService } from '../model/params-service';
import { Peripheral } from '../model/peripheral';
import { AppService } from '../services/appService';

@Component({
  selector: 'app-gateway-list',
  templateUrl: './gateway-list.component.html',
  styleUrls: ['./gateway-list.component.scss']
})
export class GatewayListComponent implements OnInit {

  sortFilters: any = [];
  gateways: Gateway[] = [];
  selectedGateway: Gateway = {} as Gateway;
  callingService = false;
  serviceParams: ParamsService = {} as ParamsService;


  constructor(private route: ActivatedRoute,
    public router: Router,
    private modalService: NgbModal,
    private appService: AppService,
    private toastService: ToastrService) {

  }

  ngOnInit() {
    this.serviceParams.pageSize = 10;
    this.serviceParams.pageNumber = 1;
    this.serviceParams.order = 0;
    this.setFiltersValues();
    this.callForGateways();
  }

  private callForGateways() {
    this.callingService = true;
    this.appService.getGateways(this.serviceParams).pipe(
      finalize(() => this.callingService = false)).subscribe(
      (res: any) => {
        if (res != null && res.items && res.items.length > 0) {
          this.serviceParams.totalNumberOfRecords = res.totalNumberOfRecords;
          this.gateways = res.items;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  DeleteGateway(id: number){
    this.callingService = true;
    this.appService.removeGateway(id).pipe(
      finalize(() => this.callingService = false)).subscribe(
      (res: any) => {
        if (res) {
            const editedPos = this.gateways.findIndex(r => r.id === id);
            this.gateways.splice(editedPos, 1);
            this.serviceParams.totalNumberOfRecords = this.serviceParams.totalNumberOfRecords -1;
            this.selectedGateway = this.gateways[this.gateways.length] || {} as Gateway;
            this.toastService.success("Gateway Deleted");
        }
      },
      error => console.log(error)
    );
    this.callingService = false;
  }

  FilterChange(e: any) {
    if (e) {
      this.serviceParams.order = e.direction;
    }
    this.callForGateways(); 
  }

  setFiltersValues() {
    this.sortFilters = [];
    this.addFilterToList('nameAsc', 'By Alphabetic Ascending', 'Ascending');
    this.addFilterToList('nameDesc', 'By Alphabetic Descending', 'Descending');
  }

  /** add or refresh the language of the filter property **/
  private addFilterToList(prop: string, traduction: string, direction: string) {
    const filterObj = this.sortFilters.find((f: any) => f.property === prop && f.direction === direction);
    if (filterObj) {
      filterObj.name = traduction;
    } else {
      this.sortFilters.push(
        {
          name: traduction,
          direction: direction,
          property: prop
        }
      );
    }
    this.sortFilters = Object.assign([], this.sortFilters);
  }

  PageChage(event: any) {
    this.serviceParams.pageNumber = event;
    this.serviceParams.pageSize = 10;
    this.callForGateways();
  }

  onSelected(gateway: Gateway) {
   this.selectedGateway = gateway;
  }
}
