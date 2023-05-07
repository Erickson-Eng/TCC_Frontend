import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Community } from 'src/app/shared/model/Community';
import { CommunityService } from '../community.service';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss'],
})
export class CreateCommunityComponent implements OnInit {
  communityForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: CommunityService
  ) {}

  onImageSelected(file: File) {
    console.log(file);
  }

  handleImageUploaded(event: { image: string; imageName: string }): void {
    const selectedImage = event.image;
    const selectedImageName = event.imageName;

    console.log(selectedImage);
    console.log(selectedImageName);
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
    this.service.createCommunity(community).subscribe((data) => {
      console.log(data);
    });
    console.log(community);
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
