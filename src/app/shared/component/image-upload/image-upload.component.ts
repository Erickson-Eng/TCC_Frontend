import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent {
  @Output() imageSelected: EventEmitter<File> = new EventEmitter<File>();

  selectedImage: string | undefined;
  selectedImageName: string | undefined;

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imageSelected.emit(file);
    }
  }

  handleImageUpload(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.selectedImage = e.target?.result as string;
        this.selectedImageName = file.name;
      };

      reader.readAsDataURL(file);
    }
  }
}
