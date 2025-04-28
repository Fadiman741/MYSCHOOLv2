import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-modal',
  standalone: true,  // Added this for Angular 17+ standalone components
  imports: [FormsModule, CommonModule],
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.css'
})
export class PaymentModalComponent {
  @Input() amount: number = 0;
  @Input() groupId: number = 0;
  @Output() paymentComplete = new EventEmitter<{groupId: number, success: boolean}>();
  @Output() modalClosed = new EventEmitter<void>();

  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  cardName: string = '';
  isLoading: boolean = false;  // Added loading state
  errorMessage: string | null = null;  // Added error handling
  groupData: any;

  constructor(public dialogRef: MatDialogRef<PaymentModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any){
    this.groupData = data;
    console.log(this.groupData.group)
  }
  closeModal() {
    this.dialogRef.close();
  }

  processPayment() {
    // Validate inputs
    if (!this.validateInputs()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    // Prepare payment data
    const paymentData = {
      cardNumber: this.cardNumber,
      expiryDate: this.expiryDate,
      cvv: this.cvv,
      cardName: this.cardName,
      amount: this.amount,
      groupId: this.groupId
    };

    console.log('Processing payment:', paymentData);
    
    // Simulate API call (replace with actual payment service call)
    setTimeout(() => {
      this.isLoading = false;
      
      // For demo purposes - in reality, check the response from your payment service
      const paymentSuccess = Math.random() > 0.2; // 80% success rate for demo
      
      if (paymentSuccess) {
        this.paymentComplete.emit({groupId: this.groupId, success: true});
      } else {
        this.errorMessage = 'Payment failed. Please check your card details and try again.';
      }
    }, 1500);
  }

  private validateInputs(): boolean {
    // Basic validation
    if (!this.cardNumber || this.cardNumber.replace(/\s/g, '').length !== 16) {
      this.errorMessage = 'Please enter a valid 16-digit card number';
      return false;
    }

    if (!this.expiryDate || !/^\d{2}\/\d{2}$/.test(this.expiryDate)) {
      this.errorMessage = 'Please enter a valid expiry date (MM/YY)';
      return false;
    }

    if (!this.cvv || this.cvv.length < 3) {
      this.errorMessage = 'Please enter a valid CVV (3-4 digits)';
      return false;
    }

    if (!this.cardName) {
      this.errorMessage = 'Please enter the name on your card';
      return false;
    }

    return true;
  }
}