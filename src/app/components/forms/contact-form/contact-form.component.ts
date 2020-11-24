import {Component, OnInit, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {LanguageService} from 'src/app/services/language.service';
import {Artwork} from 'src/app/models';

export interface ContactFormData {
  name?: string;
  email?: string;
  artwork?: Artwork;
  message?: string;
  phone?: string;
  email2?: string;
  'data-agree'?: boolean;
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.less'],
})
export class ContactFormComponent implements OnInit {

  constructor(
    private http: HttpClient,
    public language: LanguageService
  ) {}

  @Input()
  public get data() {
    return this.mData;
  }
  public set data(data: ContactFormData) {
    this.mData.name = data.name || '';
    this.mData.email = data.email || '';
    this.mData.phone = data.phone || '';
    this.mData.message = data.message || '';
    this.mData['data-agree'] = data['data-agree'] || false;
  }

  private mData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    message: '',
    email2: '',
    'data-agree': false,
  };

  loading = false;

  submitted = false;

  validationErrors: any = {};

  ngOnInit() {}

  processErrors() {
    if (this.validationErrors.email) {
      this.data.email = '';
    }
  }

  placeholder(field: any, def = '') {
    const error = this.validationErrors[field];
    if (error) {
      if (error.type === 'required') {
        return 'form-error-required';
      } else if (error.type === 'invalid') {
        return 'form-error-invalid-email';
      } else {
        return 'unknown-error-type';
      }
    } else {
      return def || '';
    }
  }

  send() {
    if (this.data.email2) {
      alert('bot alert');
      return;
    }
    this.loading = true;
    // console.log('data', this.data)
    this.http.post(environment.apiPrefix + '/contact', this.data).subscribe(
      response => {
        // console.log(response)
        this.validationErrors = response;
        this.processErrors();
        this.loading = false;
        this.submitted = true;
      },
      error => {
        console.error(error);
        this.validationErrors = error.error;
        this.processErrors();
        this.loading = false;
      }
    );
  }
}
