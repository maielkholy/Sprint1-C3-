import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class FoodService {

  constructor(private httpClient: HttpClient) { }

  createProduct(name:string, price:number,sellerName:string , comp: string) {
    return this.httpClient.post(environment.apiUrl + 'product/createProduct', {'name':name, 'price':price,'sellerName':sellerName,'comp':comp});
  }

  getProducts(){
    return this.httpClient.get(environment.apiUrl + 'product/getProducts');
  }

  updateProduct(pid: object,name:string, price:number,sellerName:string, comp: string ) {
    return this.httpClient.patch(environment.apiUrl + 'product/updateProduct/'+pid, {'name':name,'price':price,'sellerName':sellerName,'comp':comp});
  }

deleteProduct(pid:object){
  return this.httpClient.delete(environment.apiUrl +'/product/deleteProduct/' +pid )
}
}
