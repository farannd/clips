import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/data/modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  // providers: [ModalService],
})
export class ModalComponent implements OnInit {
  constructor(public modal: ModalService) {}

  ngOnInit(): void {}

  closeModal() {
    this.modal.toogleModal();
  }
}
