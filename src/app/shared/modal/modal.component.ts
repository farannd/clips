import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ModalService } from 'src/app/data/modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  // providers: [ModalService],
})
export class ModalComponent implements OnInit {
  @Input() ModalId = '';

  constructor(public modal: ModalService, public el: ElementRef) {}

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }

  closeModal() {
    this.modal.toogleModal(this.ModalId);
  }
}
