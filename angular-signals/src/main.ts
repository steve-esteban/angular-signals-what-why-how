import 'zone.js/dist/zone';
import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1>Shopping cart</h1>
    <div> {{ quantity() }}</div>
    <select
    [ngModel]="quantity()"
    (change)="onQuantitySelected($any($event.target).value)"
    >
    <option disabled value="">--Select a quantity--</option>
    <option *ngFor="let q of qtyAvailable()"> {{ q }}</option>
    </select>

    <div>Vehicle: {{ selectedVehicle().name}}</div>
    <div>Price: {{ selectedVehicle().price | number: '1.2-2'}}</div>
    <div style="font-weight: bold">Total: {{ exPrice()  | number: '1.2-2' }}</div>
  `,
})
export class App {
  name = 'Angular';
  quantity = signal(1);
  qtyAvailable = signal([1, 2, 3, 4, 5, 6]);

  selectedVehicle = signal<Vehicle>({id: 1, name: "car 1", price: 1000});

  vehicles = signal<Vehicle[]>([]);

  // Computed signal
  exPrice = computed(() => this.selectedVehicle().price * this.quantity());

  constructor() {
    console.log(this.quantity());

    // Update signal
    this.quantity.update(qty => qty * 2);

    // Mutate signal
    this.selectedVehicle.mutate((v) => v.price = v.price * 2);
  }

  // We usually use effects for debugging purposes
  qtyEff = effect(() => console.log(this.quantity()));

  onQuantitySelected(qty: number) {
    // Set signal
    this.quantity.set(qty);

    // If this was uncommented, it would take always the latest set value, ignoring the intermidiate ones
    // this.quantity.set(40);
    // this.quantity.set(45);
  }
}

bootstrapApplication(App);

export interface Vehicle {
  id: number;
  name: string;
  price: number;
}
