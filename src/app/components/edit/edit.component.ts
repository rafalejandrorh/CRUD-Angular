import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public editForm: FormGroup
  postRef:any
  constructor(
    public postService: PostService,
    public formBuilder: FormBuilder,
    private activateroute: ActivatedRoute,
    private router: Router
  ) { 
    this.editForm = this.formBuilder.group({
      Titulo: [''],
      contenido: [''],
      autor: ['']
    })
  }

  ngOnInit(): void {
    const id = this.activateroute.snapshot.paramMap.get('id')
    this.postService.getPostById(id).subscribe( res =>{
      this.postRef = res
      this.editForm = this.formBuilder.group({
        Titulo: [this.postRef.Titulo],
        contenido: [this.postRef.contenido],
        autor: [this.postRef.autor]
      })
    })
  }

  onSubmit () {
    const id = this.activateroute.snapshot.paramMap.get('id')
    this.postService.updatePost(this.editForm.value, id)
    this.router.navigate([''])
  }
}
