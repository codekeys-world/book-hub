import { Component } from '@angular/core';
import { Menu } from '../../components/menu/menu';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [
    Menu,
    RouterOutlet
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {}
