import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { isAndroid } from '@nativescript/core';
import { ProductService, Product } from '../../../services/product.service';
import { action, alert } from '@nativescript/core/ui/dialogs';
import { Toasty } from '@triniwiz/nativescript-toasty';
import { Animation } from '@nativescript/core';

@Component({
  selector: 'ProductList',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  platformMessage: string = '';

  constructor(
    private productService: ProductService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    if (isAndroid) {
      this.platformMessage = 'Estás usando Android';
    } else {
      this.platformMessage = 'Estás usando iOS';
    }

    this.products = this.productService.getProducts();
  }

  onProductTap(productId: number): void {
    this.routerExtensions.navigate(['/products/detail', productId], {
      transition: {
        name: 'slide',
        duration: 300,
        curve: 'easeInOut'
      }
    });
  }

  onChangeCategory(product: Product, event: any): void {
    event.stopPropagation();
    
    action({
      message: `Seleccionar nueva categoría para ${product.name}`,
      cancelButtonText: 'Cancelar',
      actions: ['Electrónica', 'Móviles', 'Tablets', 'Audio', 'Accesorios']
    }).then(result => {
      if (result !== 'Cancelar') {
        product.category = result;
        
        const toast = new Toasty({
          text: `Categoría actualizada a: ${result}`,
          duration: 'short',
          position: 'bottom'
        });
        toast.show();
      }
    });
  }

  onLongPress(product: Product): void {
    alert({
      title: 'Información del Producto',
      message: `ID: ${product.id}\nNombre: ${product.name}\nPrecio: $${product.price}`,
      okButtonText: 'OK'
    });
  }

  onDoubleTap(product: Product): void {
    const toast = new Toasty({
      text: `❤️ ${product.name} agregado a favoritos`,
      duration: 'short',
      position: 'center'
    });
    toast.show();
  }

  onAnimateButton(args: any): void {
    const button = args.object;
    
    const animation = new Animation([{
      target: button,
      rotate: 360,
      duration: 500,
      curve: 'easeInOut'
    }]);
    
    animation.play().then(() => {
      button.rotate = 0;
    });
  }
}
