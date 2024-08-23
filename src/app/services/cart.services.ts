// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductDto } from '../dto/product.dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: ProductDto[] = [];
  private cartItemsSubject = new BehaviorSubject<ProductDto[]>(this.cartItems);

  constructor(private http: HttpClient) {
    this.loadCartItems();
  }

  private loadCartItems() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      this.cartItems = JSON.parse(savedCartItems);
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  private saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }

  addToCart(product: ProductDto) {
    this.cartItems.push(product);
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartItems();
  }

  removeProduct(product: ProductDto) {
    this.cartItems = this.cartItems.filter((item) => item.id !== product.id);
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartItems();
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartItems();
  }
}