import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  // DECLARATION FORMULAIRE
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // CREATION FORMULAIRE
    this.form = this.fb.group({
      content: [null, [Validators.required]],
      imageUrl: [null],
    });
  }

  addPost() {
    console.log(this.form.value);
  }

  // IMAGE UPLOAD & READER
  // imageUrlReader est bindé à l'attribut 'src' de l'img de preview
  imageUrlReader: string;
  onFileChange(event) {
    // permet d'accéder à l'objet (files) du l'input de type file et de l'assigner au formControl
    this.form.patchValue({
      imageUrl: event.target.files[0],
    });

    //permet la lecture dans le DOM du fichier grâce à FileReader
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.imageUrlReader = event.target.result;
    };
  }
}
