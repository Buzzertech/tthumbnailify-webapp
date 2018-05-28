import { HttpClient } from '@angular/common/http';
import  * as config from './../config/config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  public processUrls(urls:string[], quality:string):Observable<Object>{
    return this.http.post(config.apiConfig.apiUrls.bulk, {url:urls, params:quality});
  }

  public processUrl(url:string, quality:string):Observable<Object>{
    return this.http.post(config.apiConfig.apiUrls.single, {url:url, params: quality})
  }
}
