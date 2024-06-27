import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {

  constructor(private route:Router){}
  
goto(){
  this.route.navigate(['/card-create']);
}
}
