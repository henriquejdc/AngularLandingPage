import { Component, signal } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsletterService } from '../../services/newsletter.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'newsletter-form',
  standalone: true,
  imports: [
    BtnPrimaryComponent,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    NewsletterService
  ],
  templateUrl: './newsletter-form.component.html',
  styleUrl: './newsletter-form.component.scss'
})
export class NewsletterFormComponent {
  newsletterForm!: FormGroup;
  loading = signal(false);

  constructor(private newsletterService: NewsletterService) {
    this.newsletterForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    this.loading.set(true);
    if (this.newsletterForm.valid) {
      this.newsletterService.sendData(
        this.newsletterForm.value.name,
        this.newsletterForm.value.email
      ).subscribe({
        next: () => {
          console.log('Data sent successfully');
          this.newsletterForm.reset();
        }
      });
    }
    console.log(this.newsletterForm.value);
  }
}
