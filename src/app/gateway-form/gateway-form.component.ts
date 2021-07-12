import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { Gateway } from '../model/gateway';
import { ParamsService } from '../model/params-service';
import { Peripheral } from '../model/peripheral';
import { AppService } from '../services/appService';

@Component({
  selector: 'app-gateway-form',
  templateUrl: './gateway-form.component.html',
  styleUrls: ['./gateway-form.component.scss']
})
export class GatewayFormComponent implements OnInit {

  selectedGateway: Gateway = {
    peripheralList: [] as Peripheral[]
  }  as Gateway;
  
  selectedPeripheral: Peripheral = {} as Peripheral;
  peripheralList: Peripheral[] = [];  
  peripheralStatusList: string[] = [];
  callingService = false;   
  peripheralsisCollapsed = true;
  managePeripherals = false;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private appService: AppService,  
              private modalService: NgbModal,            
              private toastService: ToastrService) { 

              }

  ngOnInit() {    
    this.peripheralStatusList.push("Online", "Offline");
    this.route.params
    .subscribe(
      (params: Params) => {
        let id = +params['id'];
        if(id > 0){
          this.managePeripherals = true;
          this.peripheralsisCollapsed = false;
          this.callForPeripheralList(id); 
        }       
      }
    );
       
  }  

  private callForPeripheralList(gatewayId:number) {
    this.callingService = true;  
    this.appService.getGateway(gatewayId).pipe(
      finalize(() => this.callingService = false)).subscribe(
        (res: any) => {
          if (res) {            
            this.selectedGateway = res;
            if(this.selectedGateway.peripheralList){
              this.peripheralList = this.selectedGateway.peripheralList as Peripheral[];
            }            
          }
        },
        error => console.log(error)
      );   
  }

  SubmitGatewayForm() {
    this.callingService = true;  
    if(this.selectedGateway.id == 0 || this.selectedGateway.id == undefined){
      this.appService.addGateway(this.selectedGateway).pipe(
        finalize(() => this.callingService = false)).subscribe(
          (res: any) => {
            if (res) {
              this.managePeripherals = true;
              this.selectedGateway = res;
              this.toastService.success("Gateway Save"); 
            }
          },
          error => console.log(error)
        );
    }
    else{
      this.appService.updateGateway(this.selectedGateway).pipe(
        finalize(() => this.callingService = false)).subscribe(
          (res: any) => {
            if (res) {            
              this.toastService.success("Gateway Save"); 
            }
          },
          error => console.log(error)
        );
    }   
    
  }

  AddPeripheral(peripheralEditModal:any){  
    this.selectedPeripheral =  {} as Peripheral;    
    this.modalService.open(peripheralEditModal, {size: 'lg', centered: true});
  }

  RemovePeripheral(id:number){
    this.appService.removePeripheral(id).pipe(
      finalize(() => this.callingService = false)).subscribe(
        (res: any) => {
          if (res) {            
            const editedPos = this.peripheralList.findIndex(r => r.id === id);
            this.peripheralList.splice(editedPos, 1);
            this.toastService.success("Peripheral Deleted"); 
          }
        },
        error => console.log(error)
      );     
  }

  SubmitPeripheralForm(closeModal: any) {
    if(this.peripheralList.length == 10){
      this.toastService.error("You dont have more than 10 peripherals."); 
      return;
    }
    this.callingService = true;
    this.selectedPeripheral.gatewayId = this.selectedGateway.id;
    if(this.selectedPeripheral.id > 0){      
      this.appService.updatePeripheral(this.selectedPeripheral).pipe(
        finalize(() => this.callingService = false)).subscribe(
          (res: any) => {
            if (res) {
              this.selectedPeripheral = res;
              const editedPos = this.peripheralList.findIndex(r => r.id === this.selectedPeripheral.id);
              this.peripheralList.splice(editedPos, 1,this.selectedPeripheral); 
              this.toastService.success("Peripheral Save"); 
            }
          },
          error => console.log(error)
        );      
    }
    else{
      this.appService.addPeripheral(this.selectedPeripheral).pipe(
        finalize(() => this.callingService = false)).subscribe(
          (res: any) => {
            if (res) {
              this.selectedPeripheral = res;
              this.peripheralList.push(this.selectedPeripheral);
              this.toastService.success("Peripheral Save"); 
            }
          },
          error => console.log(error)
        );       
    }   
    this.modalService.dismissAll();
  }

  SelectPeripheral(peripheral:Peripheral, peripheralEditModal:any) {    
    let copyPeripheral = peripheral || {} as Peripheral;
    this.selectedPeripheral =  {} as Peripheral;    
    this.selectedPeripheral.vendor = copyPeripheral.vendor;
    this.selectedPeripheral.uid = copyPeripheral.uid;
    this.selectedPeripheral.status = copyPeripheral.status;
    this.selectedPeripheral.id = copyPeripheral.id;
    this.modalService.open(peripheralEditModal, {size: 'lg', centered: true});
  }

  ChangeStatus(event:any) {
    this.selectedPeripheral.status = event || {} ;
  }

}
