import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent {
  public image;
  @Output()
  public chosenImage: EventEmitter<Object> = new EventEmitter<Object>();

  onFileChange(event) {
    // emit de l'imageURL vers le parent
    this.chosenImage.emit(event.target);
    //permet la lecture dans le DOM du fichier grâce à FileReader
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.image = event.target.result;
    };
  }
}
