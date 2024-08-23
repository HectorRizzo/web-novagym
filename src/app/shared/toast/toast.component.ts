import { Component, Input, OnInit } from "@angular/core";
import { ToastService } from "../../services/toast.services";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-toast",
    templateUrl: "./toast.component.html",
    styleUrls: ["./toast.component.scss"],
    standalone: true,
    imports: [CommonModule] // Asegúrate de importar CommonModule aquí

})

export class ToastComponent implements OnInit {
    
    @Input() message: string = '';
    @Input() type: string = 'success';
    isVisible: boolean = false;
    

    constructor(private toastService: ToastService) { }

    ngOnInit() {
        console.log('ToastComponent initialized');
        this.toastService.toastState.subscribe(toast => {
            console.log('ToastComponent: ', toast);
            this.message = toast.message;
            this.type = toast.type;
            this.isVisible = true;
            setTimeout(() => {
                this.isVisible = false;
            }, 3000);
          });
    }
}