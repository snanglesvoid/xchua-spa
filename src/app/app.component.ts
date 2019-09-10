import { Component, OnInit, OnDestroy } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { slideInAnimation } from './app.animations'
import {
  NgcCookieConsentService,
  NgcInitializeEvent,
  NgcStatusChangeEvent,
  NgcNoCookieLawEvent,
} from 'ngx-cookieconsent'
import { Subscription } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private ccs: NgcCookieConsentService,
    private cookie: CookieService
  ) {}

  title = 'xc-hua'

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    )
  }

  private popupOpenSubscription: Subscription
  private popupCloseSubscription: Subscription
  private initializeSubscription: Subscription
  private statusChangeSubscription: Subscription
  private revokeChoiceSubscription: Subscription
  private noCookieLawSubscription: Subscription

  ngOnInit() {
    if (this.cookie.get('consent')) {
      this.ccs.destroy()
    }
    this.popupOpenSubscription = this.ccs.popupOpen$.subscribe(() => {
      // you can use this.ccs.getConfig() to do stuff...
      console.log('ccs popup open')
    })

    this.popupCloseSubscription = this.ccs.popupClose$.subscribe(() => {
      // you can use this.ccs.getConfig() to do stuff...
      console.log('ccs popup close')
      this.cookie.set('consent', 'true', 365)
    })

    this.initializeSubscription = this.ccs.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccs.getConfig() to do stuff...
        console.log('ccs initialize')
      }
    )

    this.statusChangeSubscription = this.ccs.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        console.log('ccs status change', event)
        // you can use this.ccs.getConfig() to do stuff...
      }
    )

    this.revokeChoiceSubscription = this.ccs.revokeChoice$.subscribe(() => {
      // you can use this.ccs.getConfig() to do stuff...
      console.log('ccs revoke choice')
    })

    this.noCookieLawSubscription = this.ccs.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccs.getConfig() to do stuff...
        console.log('ccs no cookie law: ', event)
        this.ccs.destroy()
      }
    )
    ;(window as any).ccs = this.ccs
  }

  ngOnDestroy() {
    this.popupOpenSubscription.unsubscribe()
    this.popupCloseSubscription.unsubscribe()
    this.initializeSubscription.unsubscribe()
    this.statusChangeSubscription.unsubscribe()
    this.revokeChoiceSubscription.unsubscribe()
    this.noCookieLawSubscription.unsubscribe()
  }
}
