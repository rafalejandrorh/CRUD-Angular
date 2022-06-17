import { Injectable } from '@angular/core';

//Firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ReplaySubject } from 'rxjs';

//Modelo
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor( private angularFirestore: AngularFirestore) { }

  //Metodos CRUD
  getPosts(){
    return this.angularFirestore
        .collection("posts")
        .snapshotChanges()
  }

  getPostById(id){
    return this.angularFirestore
        .collection("posts")
        .doc(id)
        .valueChanges()
  }

  createPost(post: Post){
    return new Promise<any>( (resolve, reject) => {
      this.angularFirestore
        .collection("posts")
        .add(post)
        .then( (response) => {
         console.log(response)
        },
        (error) => {
         reject(error)
        })
    })
  }

  updatePost(post: Post, id){
    return this.angularFirestore
      .collection("posts")
      .doc(id)
      .update({
        Titulo: post.Titulo,
        contenido: post.contenido,
        autor: post.autor
      });
  }

  deletePost(post){
    return this.angularFirestore
      .collection("posts")
      .doc(post.id)
      .delete()
  }
}
