import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BodyComponent } from './components/body/body.component';
import { NewCardComponent } from './components/new-card/new-card.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CardCreateComponent } from './components/card-create/card-create.component';
import { TruncatePipe } from './pipe/truncate.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    BodyComponent,
    NewCardComponent,
    CardCreateComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    
    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
