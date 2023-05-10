import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Community } from 'src/app/shared/model/Community';
import { CommunityService } from '../community.service';
import { switchMap, tap } from 'rxjs';
import { Image } from 'src/app/shared/model/Image';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss'],
})
export class CreateCommunityComponent implements OnInit {
  communityForm!: FormGroup;
  selectedImage: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private service: CommunityService,
    private router: Router,
    private _snakeBar: MatSnackBar
  ) {}

    openSnackBar(message: string, action: string) {
    this._snakeBar.open(message, action);
  }

  onImageSelected(image: File) {
    this.selectedImage = image;
  }

  ngOnInit(): void {
    this.communityForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      description: ['', [Validators.required]],
      communityRules: [''],
    });
  }

  isCommunityFormValid() {
    const controls = this.communityForm.controls;
    return controls['name']?.valid && controls['description']?.valid;
  }

  submitForm() {
    let community = this.mapFormToCommunity();
    this.service
      .uploadFile(this.selectedImage!)
      .pipe(
        tap((createdImage: Image) => {
          community.imageId = createdImage.id;
        }),
        switchMap(() => this.service.createCommunity(community))
      )
      .subscribe(() =>{
        this.openSnackBar('Comunidade criada com sucesso', 'OK');
        this.router.navigate(['/community/list']);
      });
  }

  mapFormToCommunity(): Community {
    const values = this.communityForm.value;
    const community: Community = {
      name: values.name,
      description: values.description,
      communityRules: values.communityRules,
    };

    return community;
  }
}
