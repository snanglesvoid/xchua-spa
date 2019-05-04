import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.less']
})
export class ContactFormComponent implements OnInit {

  data: any = {
    'name' : '',
    'email' : '',
    'phone' : '',
    'message' : '',
    'agree' : false,
  }

  validationErrors: any = {
    
  }

  constructor() { }

  ngOnInit() {
  }

}
