import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cake } from '../cake.model';
import { CakesService } from '../cakes.service';

@Component({
  selector: 'app-cake-new',
  templateUrl: './cake-new.component.html',
  styleUrls: ['./cake-new.component.scss']
})
export class CakeNewComponent implements OnInit {

  cake: Cake = new Cake();

  nameError: string;
  commentError: string;
  imageUrlError: string;
  yumFactorError: string;

  constructor(
    private router: Router,
    private cakeServices: CakesService
  ) { }

  ngOnInit(): void {
    this.clearErrors();
  }

  clearErrors(){
    this.nameError = undefined;
    this.commentError = undefined;
    this.imageUrlError = undefined;
    this.yumFactorError = undefined;
  }

  validate(){
    this.clearErrors();

    // Validate name
    if ( !this.cake.name || this.cake.name.length === 0 ) { this.nameError = 'Name is required' }
    
    // Validate comment
    if ( !this.cake.comment ) { 
      this.commentError = 'Comment is required'; 
    } else {
      if ( this.cake.comment.length < 5 ) { this.commentError = 'Comment must be greater than 5 characters' }
      if ( this.cake.comment.length > 200 ) { this.commentError = 'Comment must be less than 200 characters' }
    }

    // Validate image url
    if ( !this.cake.imageUrl ) { this.imageUrlError = 'Image URL s required' }

    // Validate yum factor
    if ( !this.cake.yumFactor ) { 
      this.yumFactorError = 'Yum factor is required'; 
    } else {
      if ( this.cake.yumFactor < 1 ) { this.yumFactorError = 'Yum factor must be between 1 and 5' }
      if ( this.cake.yumFactor > 5 ) { this.yumFactorError = 'Yum factor must be between 1 and 5' }
    }
    
    return !!( this.nameError || this.commentError || this.imageUrlError || this.yumFactorError );
  }

  create(){
    if ( this.validate() ) { return }

    this.cakeServices.create(this.cake).subscribe(c => {
      this.router.navigate(['cakes']);
    });
  }
}
