import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrl: './new-card.component.scss'
})
export class NewCardComponent {
  cardId: number=0;
  simpleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.simpleForm = this.fb.group({
      title: ['', Validators.required],
      paragraph: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cardId = +params['id'];
      this.loadFormData();
    });
  }

  loadFormData() {
    const formData = JSON.parse(localStorage.getItem(`formData_${this.cardId}`) || '{}');
    if (formData.title) {
      this.simpleForm.patchValue({
        title: formData.title,
        paragraph: formData.paragraph
      });
    }
  }

  onSubmit() {
    const formData = this.simpleForm.value;
    localStorage.setItem(`formData_${this.cardId}`, JSON.stringify(formData));
    console.log(formData);
    this.router.navigate(['/']);
  }
}
