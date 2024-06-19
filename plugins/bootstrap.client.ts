import { Modal, Collapse, Toast } from 'bootstrap';

export default defineNuxtPlugin(_nuxtApp => {
  return {
    provide: {
      bootstrap: {
        modal: element => new Modal(element),
        collapse: element => new Collapse(element),
        toast: element => new Toast(element)
      }
    }
  };
});