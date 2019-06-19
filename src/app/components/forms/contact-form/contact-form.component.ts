import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment'
import { LanguageService } from 'src/app/services/language.service'

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.less'],
})
export class ContactFormComponent implements OnInit {
  data: any = {
    name: '',
    email: '',
    phone: '',
    message: '',
    email2: '',
    'data-agree': false,
  }

  loading = false

  submitted = false

  validationErrors: any = {}

  constructor(private http: HttpClient, public language: LanguageService) {}

  ngOnInit() {}

  processErrors() {
    if (this.validationErrors.email) {
      this.data.email = ''
    }
  }

  placeholder(field, def = '') {
    let error = this.validationErrors[field]
    if (error) {
      if (error.type === 'required') {
        return 'form-error-required'
      } else if (error.type === 'invalid') {
        return 'form-error-invalid-email'
      } else return 'unknown-error-type'
    } else {
      return def || ''
    }
  }

  send() {
    if (this.data.email2) {
      alert('bot alert')
      return
    }
    this.loading = true
    // console.log('data', this.data)
    this.http.post(environment.apiPrefix + '/contact', this.data).subscribe(
      response => {
        // console.log(response)
        this.validationErrors = response
        this.processErrors()
        this.loading = false
        this.submitted = true
      },
      error => {
        console.error(error)
        this.validationErrors = error.error
        this.processErrors()
        this.loading = false
      }
    )
  }
}
