import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/post/services/post.service';
import { UserState } from 'src/app/user/model/user';
import { UserService } from 'src/app/user/services/user.service';
import { toFormData } from '../../../../core/utils/formdata-builder';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  private user: UserState;
  @Output()
  public closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // DECLARATION FORMULAIRE
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.userState$.subscribe((res) => (this.user = res));
    // CREATION FORMULAIRE
    this.form = this.fb.group({
      user_id: [null],
      content: [null, [Validators.required]],
      imageUrl: [null],
    });

    this.form.patchValue({
      user_id: this.user.currentUser.id,
    });
  }

  // IMAGE UPLOAD
  patchImage(e) {
    // via le component "image-upload" on récupère l'image séléctionée
    this.form.patchValue({
      imageUrl: e.files[0],
    });
  }

  addPost() {
    if (this.form.value.content !== null) {
      // Utilisatation d'un FormData pour assigner chaque type de champs (surtout pour l'image de type "file")
      let formData: FormData = toFormData(this.form.value);

      // EMIT POUR FERMER LA MODAL
      this.closeModal.emit(true);

      // ENVOYER FORMULAIRE AU SERVEUR VIA POST SERVICE
      this.postService.addNewPost(formData).subscribe(
        (res) => {
          this.postService.getAllPosts();
        },
        (err) => console.log(err)
      );
    }
  }
}
