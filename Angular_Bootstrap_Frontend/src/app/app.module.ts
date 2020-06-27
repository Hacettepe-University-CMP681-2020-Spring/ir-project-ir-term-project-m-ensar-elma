import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SearchPGComponent } from './search-pg/search-pg.component';
import { ResultPGComponent } from './result-pg/result-pg.component';
import { ContextPGComponent } from './context-pg/context-pg.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    SearchPGComponent,
    ResultPGComponent,
    ContextPGComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
