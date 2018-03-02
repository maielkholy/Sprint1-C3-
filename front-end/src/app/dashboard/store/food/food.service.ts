import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class FoodService {

  constructor(private httpClient: HttpClient) { }

  createProduct(name:string, price:number,seller:string , component: string) {
    return this.httpClient.post(environment.apiUrl + 'c3/createProduct', {'name':name, 'price':price,'seller':seller,'component':component});
  }

  getProducts(){
    return this.httpClient.get(environment.apiUrl + 'c3/getProducts');
  }

  updateProduct(pid: object,name:string, price:number,seller:string, component: string ) {
    return this.httpClient.patch(environment.apiUrl + 'c3/updateProduct/'+pid, {'name':name,'price':price,'seller':seller,'component':component});
  }

  deleteProduct(id:object){
    return this.httpClient.delete(environment.apiUrl +'c3/deleteProduct/' +id );
}
}
