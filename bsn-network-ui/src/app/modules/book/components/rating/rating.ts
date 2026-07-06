import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  imports: [],
  templateUrl: './rating.html',
  styleUrl: './rating.scss',
})
export class Rating {
  @Input() rating : number = 0;
  maxRating : number = 5;


  get fullStarts() : number{
    return Math.floor(this.rating);
  }

  get hasHalfStar() : boolean {
    return this.rating % 1 !== 0;
  }

  get emptyStarts() : number {
    return this.maxRating - Math.ceil(this.rating);
  }

}
