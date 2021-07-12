import {Injectable} from '@angular/core';
import {IndividualConfig, ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Injectable()
export class ErrorService {

  toastConfig: IndividualConfig = {} as IndividualConfig;

  constructor(private router: Router,
              private toastrService: ToastrService) {
    this.toastConfig.closeButton = true;
    this.toastConfig.positionClass = 'toast-top-right';
    toastrService.toastrConfig.preventDuplicates = true;
  }

  info(msg: string, title?: string) {
    this.toastrService.info(msg, title ? title : 'Information', this.toastConfig);
  }

  warn(msg: string, title?: string) {
    this.toastrService.warning(msg, title ? title : 'Warning', this.toastConfig);
  }

  extracted(error: any, msg?: any) {
    /**/
    msg = error.status >= 500 ? 'Server Error' : msg;
    this.toastrService.toasts = [];
    if (error.status === 0) {
      this.sendError('Web Service not found');
    } else if (error.status === 404) {
      this.sendError('Url not found');
    } else if (error.status === 422) {
      this.sendError(error.error.message);
    } else if (error.status === 400) {
      if(error.error.messages){
        this.sendError(error.error.messages[0]);
      }
      else{
        this.sendError('Bad Request');
      }      
    } else {
      if (msg) {
        this.sendError(msg, null);
      } else {
        let errorMsg = 'Server Error';
        if (error.status === 0 && error.url === null) {
          errorMsg = 'Server Off';
          this.sendError(errorMsg, null);
        }
      }
      console.log(error);
    }
  }

  private sendError(errorMsg:any, headerMsg?:any) {
    this.toastrService.error(errorMsg, headerMsg ? headerMsg : null, this.toastConfig);
  }

}
