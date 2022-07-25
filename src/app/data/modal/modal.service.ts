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
  }

  isModalOpen(id: string): boolean {
    return !!this.#modals.find((element) => element.id === id)?.visible;
  }

  toogleModal(id: string) {
    const modal = this.#modals.find((element) => element.id === id);

    if (modal) {
      modal.visible = !modal.visible;
    }
  }

  unregister(id: string) {
    this.#modals = this.#modals.filter((element) => element.id !== id);
  }
}
