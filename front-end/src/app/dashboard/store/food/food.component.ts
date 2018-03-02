import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FoodService } from './food.service'
@Component({
  selector: 'app-food',
  template: '<ng2-smart-table [settings]="settings" [source]="data" (createConfirm)="onCreateCall($event)" (editConfirm)="onEditCall($event)" (deleteConfirm)= "onDeleteCall($event)" ></ng2-smart-table>',
  providers: [FoodService]
})

export class FoodComponent implements OnInit {
  settings = {

    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    columns: {

      name: {
        title: 'Product Name'
      },
      price: {
        title: 'Price'
      },
      createdAt: {
        title: 'Created At'
      },
      sellerName: {
        title: 'Seller Name'
      },
      comp: {
        title: 'Component Name'
      },
      _id: {
        title: 'id',
        show: false
      },
    }
  };

  data = [];
  constructor(private foodService:FoodService){

  }
  onCreateCall(event){
       event.confirm.resolve(event.newData);
       this.foodService.createProduct(event.newData.name, event.newData.price,event.newData.sellerName,event.newData.comp).subscribe();
  }
  onEditCall(event){
       event.confirm.resolve(event.newData);
       this.foodService.updateProduct(event.newData._id ,event.newData.name, event.newData.price,event.newData.sellerName,event.newData.comp).subscribe();
  }
  onDeleteCall(event){
    event.confirm.resolve(event.newData);
    this.foodService.deleteProduct(event.newData._id).subscribe();
  }
  ngOnInit() {
    this.foodService.getProducts().subscribe(
      (res: any) => {
        console.log(res)
        if(res.hasOwnProperty('data'))
        this.data = res.data;
      }
    );
   }


}
