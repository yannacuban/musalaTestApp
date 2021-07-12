import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {server} from '../app.config';
import { ErrorService } from './error-service.service';
import { Observable } from 'rxjs';
import { ParamsService } from '../model/params-service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs'
import { Gateway } from '../model/gateway';
import { Peripheral } from '../model/peripheral';

  const serverRest = environment.production ? server.production : server.development;
  
  @Injectable({
    providedIn: 'root'
  })
  export class AppService {

    constructor(private http: HttpClient,
                private errorService: ErrorService) { }

    private setHeader() {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json'
        })
      };
      return httpOptions;
    }

    /**
   * List all gateways
   * @returns {Observable<Object>}
   */
     getGateways(params: ParamsService): Observable<any> 
     {
      const url = serverRest + '/gateway?pageSize='+ params.pageSize + '&pageNumber=' + params.pageNumber + '&order='+params.order;
      const options = this.setHeader();
      return this.http.get(url, options).pipe(
         catchError(this.handleError('getGateways', null))
       );
     }

     removeGateway(id:number) {
      const url = serverRest + '/gateway';
      return this.http.delete(url + '/' + id, this.setHeader()).pipe(
          catchError(this.handleError('removeGateway', null))
        );
    }

    addGateway(gateway: Gateway) {
      const url = serverRest + '/gateway';
      return this.http.post(url, JSON.stringify(gateway), this.setHeader())
        .pipe(
          catchError(this.handleError('addGateway', null))
        );
    }

    updateGateway(gateway: Gateway) {
      const url = serverRest + '/gateway';
      return this.http.put(url, JSON.stringify(gateway), this.setHeader())
        .pipe(
          catchError(this.handleError('updateGateway', null))
        );
    }

    getGateway(id:number): Observable<any> 
     {
      const url = serverRest + '/gateway';
      const options = this.setHeader();
      return this.http.get(url + '/' + id, options).pipe(
         catchError(this.handleError('getGateway', null))
       );
     }

     addPeripheral(peripheral: Peripheral) {
      const url = serverRest + '/peripheral';
      return this.http.post(url, JSON.stringify(peripheral), this.setHeader())
        .pipe(
          catchError(this.handleError('addPeripheral', null))
        );
    }

    updatePeripheral(peripheral: Peripheral) {
      const url = serverRest + '/peripheral';
      return this.http.put(url, JSON.stringify(peripheral), this.setHeader())
        .pipe(
          catchError(this.handleError('updatePeripheral', null))
        );
    }

    removePeripheral(id:number) {
      const url = serverRest + '/peripheral';
      return this.http.delete(url + '/' + id, this.setHeader()).pipe(
          catchError(this.handleError('removePeripheral', null))
        );
    }

     /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.errorService.extracted(error);

      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);

    };
  }

  }