import { Component, OnInit } from '@angular/core'
import { LanguageService } from 'src/app/services/language.service'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-subscribe-form',
  templateUrl: './subscribe-form.component.html',
  styleUrls: ['./subscribe-form.component.less'],
})
export class SubscribeFormComponent implements OnInit {
  data: any = {
    firstname: '',
    lastname: '',
    email: '',
    'data-agree': false,
  }

  loading = false
  submitted = null

  validationErrors: any = {}

  constructor(private http: HttpClient, public language: LanguageService) {}

  ngOnInit() {}

  subscribe() {
    this.loading = true
    this.http.post(environment.apiPrefix + '/subscribe', this.data).subscribe(
      response => {
        // console.log('success', response)
        this.validationErrors = {}
        this.processErrors()
        this.loading = false
        this.submitted = response
      },
      error => {
        console.error('fail', error)
        this.validationErrors = error.error
        this.processErrors()
        this.loading = false
      }
    )
  }

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
}
