import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LanguageService} from 'src/app/services/language.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.less']
})
export class EmailFormComponent implements OnInit {

  constructor(
    private http: HttpClient,
    public lang: LanguageService,
  ) {}

  data = {
    name: '',
    email: '',
    email2: '',
    'data-agree': false,
  };

  validationErrors: any = {};
  loading = false;

  @Output() emailRegistered = new EventEmitter<any>();

  ngOnInit() {
  }

  processErrors() {
    if (this.validationErrors.email) {
      this.data.email = '';
    }

  }

  placeholder(field: string, def = '') {
    const error = this.validationErrors[field];
    if (error) {
      switch (error.type) {
        case 'required':
          return 'form-error-required';
        case 'invalid':
          return 'form-error-invalid-email';
        default:
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
    this.http.post(environment.apiPrefix + '/email', this.data)
      .subscribe(
        response => {
          this.validationErrors = response;
          this.processErrors();
          this.loading = false;
          this.emailRegistered.emit(this.data);
          console.log('response', response);
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
