import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router} from '@angular/router';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent {
  rota = 'Profile info';
  acceptedTypes: string[] = ['image/jpeg', 'image/png'];
  selectedFile: File | null = null;


  meuFormulario = new FormGroup({
    name: new FormControl(''),
    cpf: new FormControl(''),
    socialName: new FormControl(''),
    socialPronoun: new FormControl(''),
    birthday: new FormControl(''),
    bio: new FormControl(''),
  });

  constructor(private router: Router) {}

  ngOnInit() {}

  onFileSelected(file: File) {
    this.selectedFile = file;
  }

  onSubmit() {
  }
}
