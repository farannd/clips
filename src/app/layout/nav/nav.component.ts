import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/service/modal/modal.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    public modal: ModalService,
    public auth: AuthService,
    private authFire: AngularFireAuth
  ) {}

  ngOnInit(): void {}

  openModal($event: Event, id: string) {
    $event.preventDefault();

    this.modal.toogleModal(id);
  }

  async logout(e: Event) {
    e.preventDefault();
    try {
      await this.authFire.signOut();
    } catch (e) {}
  }
}
