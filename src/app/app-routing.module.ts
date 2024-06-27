import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { BodyComponent } from './components/body/body.component';
import { NewCardComponent } from './components/new-card/new-card.component';
import { CardCreateComponent } from './components/card-create/card-create.component';

const routes: Routes = [
  {
    path: '',
    component: BodyComponent
  },{
    path: 'new-card/:id',
    component: NewCardComponent
  },{
    path: 'card-create',
    component: CardCreateComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
