import { Component, OnInit } from '@angular/core';

//Importando Modelo
import { Post } from 'src/app/post.model';
//Importando Servicio
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  //Respetando el formato del tipo de datos que se definieron
  Posts: Post[]
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe( (res) =>{
      this.Posts = res.map( (e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Post)
        };
      });
    });
  }

  deleteRow = (Post) => this.postService.deletePost(Post);
}
