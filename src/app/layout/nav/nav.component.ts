import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/data/modal/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(public modal: ModalService) {}

  ngOnInit(): void {}

  openModal($event: Event, id: string) {
    $event.preventDefault();

    this.modal.toogleModal(id);
  }
}
