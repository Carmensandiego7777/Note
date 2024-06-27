import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrl: './card-create.component.scss'
})
export class CardCreateComponent {
  simpleForm: FormGroup;

  constructor(private fb: FormBuilder, private route: Router) {
    this.simpleForm = this.fb.group({
      title: ['',Validators.required],
      paragraph: ['']
    });
  }

  onSubmit() {
    const currentId = parseInt(localStorage.getItem('currentId') || '0', 10);
    const newId = currentId + 1;
    const formData = this.simpleForm.value;
    localStorage.setItem(`formData_${newId}`, JSON.stringify(formData));
    localStorage.setItem('currentId', newId.toString());
    console.log(formData);
    this.route.navigate(['/']);
  }
}

