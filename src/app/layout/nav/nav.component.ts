import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/service/modal/modal.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(public modal: ModalService, public auth: AuthService) {}

  ngOnInit(): void {}

  openModal($event: Event, id: string) {
    $event.preventDefault();

    this.modal.toogleModal(id);
  }
}
