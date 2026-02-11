import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../../core/services/feedback.service';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  @Input() open = false;
  @Input() defaultTerm?: string;
  @Input() defaultId?: string;
  @Output() closed = new EventEmitter<void>();

  type: 'bug' | 'feedback' = 'bug';
  email = '';
  message = '';
  submitting = false;
  success = false;

  constructor(private feedback: FeedbackService, private snackbar: SnackbarService) { }

  close() {
    this.open = false;
    this.success = false;
    this.message = '';
    this.closed.emit();
  }

  submit() {
    if (!this.message.trim()) return;
    this.submitting = true;
    const payload = {
      type: this.type,
      message: this.message,
      email: this.email || undefined,
      wordId: this.defaultId,
      wordTerm: this.defaultTerm
    };
    this.feedback.send(payload).subscribe({
      next: () => {
        this.success = true;
        this.submitting = false;
        this.snackbar.show('Gracias — tu reporte fue enviado.');
        setTimeout(() => this.close(), 1500);
      },
      error: () => {
        this.submitting = false;
        // keep the modal open and show an inline message (simple)
        this.success = false;
      }
    });
  }
}
