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

  constructor(
    private router: Router,
    private cakeServices: CakesService
  ) { }

  ngOnInit(): void {
  }

  create(){
    this.cakeServices.create(this.cake).subscribe(c => {
      this.router.navigate(['list']);
    });
  }
}
