import { Component, OnInit } from '@angular/core';
import { CakesService } from '../cakes.service';
import { Cake } from '../cake.model';

@Component({
  selector: 'app-cake-list',
  templateUrl: './cake-list.component.html',
  styleUrls: ['./cake-list.component.scss']
})
export class CakeListComponent implements OnInit {

  cakes: Cake[];

  constructor(private cakeServices: CakesService) { }

  ngOnInit(): void {
    this.cakeServices.list().subscribe(c => this.cakes = c);
  }

}
