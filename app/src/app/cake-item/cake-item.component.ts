import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cake } from '../cake.model';
import { CakesService } from '../cakes.service';

@Component({
  selector: 'app-cake-item',
  templateUrl: './cake-item.component.html',
  styleUrls: ['./cake-item.component.scss']
})
export class CakeItemComponent implements OnInit {

  cake: Cake = new Cake();

  constructor(
    private route: ActivatedRoute,
    private cakeServices: CakesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cakeServices.getOne(params.id).subscribe(c => this.cake = c);
    });
  }

}
