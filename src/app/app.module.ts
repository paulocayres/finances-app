import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {provideNgxMask } from 'ngx-mask';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { MaskitoDirective } from '@maskito/angular';
registerLocaleData(pt);
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations:[AppComponent],
  imports: [ BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, { provide: LOCALE_ID, useValue: 'pt-BR' }, provideNgxMask(), MaskitoDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
