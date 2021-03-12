import { Component, DebugElement, Input, OnDestroy, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/shared/service.service';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { NgForm } from '@angular/forms';


import { Subscription } from 'rxjs';
import { Customer } from 'src/app/shared/customer.model';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {

  subs:Subscription;
  formData : Customer;
  @Input() customeres: Observable<any>;
  customers:any[];
  constructor(private _customerService : ServiceService) { }

  ngOnInit(): void {    
  this.formData = {      

      CustomerID : null,
      CustomerNumIde : 0,
      CustomerTypeIde :null,
      CustomerName :null,
      CustomerLastName : null,
      CustomerBirthDate : null,
      CustomerAge : null,
      CustomerEmail : null
    }
    this.refreshData();
    this.subs = this._customerService.refresh$.subscribe(() => {
      this.refreshData();
    })

    } 


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  
  refreshData(): void{
    this._customerService.getCustomers().subscribe((res:any) =>{
      console.log(res);
      this.customers = res;
    });
  }

  resetForm(form?: NgForm) {
    debugger;
    if (form = null)
      form.resetForm();
      this.formData = {      

        CustomerID : null,
        CustomerNumIde : 0,
        CustomerTypeIde :null,
        CustomerName :null,
        CustomerLastName : null,
        CustomerBirthDate : null,
        CustomerAge : null,
        CustomerEmail : null
      }
  }

  onSubmit(form: NgForm) {
    this._customerService.postCustomers(form.value).subscribe(() => {
      this.refreshData();
      this.resetForm(form);
    })
  }

    
  
  

}
