import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { HelpComponent } from './help/help.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './materialmodule';
import { QuickjobComponent } from './quickjob/quickjob.component';
import { SearchpipePipe } from './services/searchpipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    SearchpipePipe,
    HomeComponent,
    QuickjobComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    QuillModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
