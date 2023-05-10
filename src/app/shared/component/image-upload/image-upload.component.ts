import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent {
  @Output() imageSelected: EventEmitter<File> = new EventEmitter<File>();

  imageUrl: string | undefined;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.imageSelected.emit(file);

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
