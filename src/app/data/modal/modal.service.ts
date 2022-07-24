import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  //private modifiers dalam JS bisa menggunakan prefix # atau gunakan private
  //#visible = false;

  #modals: IModal[] = [];

  constructor() {}

  register(id: string) {
    this.#modals.push({
      id,
      visible: false,
    });
    console.log(this.#modals);
  }

  isModalOpen() {
    return true;
  }

  toogleModal() {
    // this.#visible = !this.#visible;
  }
}
