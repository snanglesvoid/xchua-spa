import {Injectable} from '@angular/core';
import {ContactFormData} from '../components/forms/contact-form/contact-form.component';

@Injectable({
  providedIn: 'root'
})
export class InquireService {

  constructor() {}
  public get isOpen() {
    return this.mIsOpen;
  }

  private mIsOpen = false;

  private mData: ContactFormData = {};
  openContactModal(data: ContactFormData = {}) {
    // TODO
    console.log(data);
    this.mIsOpen = true;
    this.mData = data;
  }

  closeContactModal() {
    this.mIsOpen = false;
    this.mData = {};
  }

  public get data() {
    return this.mData;
  }
}
