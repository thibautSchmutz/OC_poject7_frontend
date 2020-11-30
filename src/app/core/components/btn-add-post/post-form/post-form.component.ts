import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostService } from 'src/app/post/post.service';
import { toFormData } from '../../../utils/formdata-builder';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  @Output()
  public closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // DECLARATION FORMULAIRE
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    // CREATION FORMULAIRE
    this.form = this.fb.group({
      user_id: [null],
      content: [null, [Validators.required]],
      imageUrl: [null],
    });

    this.form.patchValue({
      user_id: this.authService.user_id,
    });
  }

  // IMAGE UPLOAD
  patchImage(e) {
    // via le component "image-upload" on récupère l'image séléctionée
    this.form.patchValue({
      imageUrl: e.files[0],
    });
  }

  // EMIT TO CLOSE MODAL

  addPost() {
    if (this.form.value.content !== null) {
      // Utilisatation d'un FormData pour assigner chaque type de champs (surtout pour l'image de type "file")
      let formData: FormData = toFormData(this.form.value);

      // EMIT POUR FERMER LA MODAL
      this.closeModal.emit(true);

      // ENVOYER FORMULAIRE AU SERVEUR VIA POST SERVICE
      this.postService.addNewPost(formData).subscribe(
        (res) => {
          this.postService.updatePostState();
        },
        (err) => console.log(err)
      );
    }
  }
}
