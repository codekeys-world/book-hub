import { Component, OnInit, signal } from '@angular/core';
import { BookService } from '../../../../services/services/book.service';
import { Router } from '@angular/router';
import { PageResponseBookResponse } from '../../../../services/models/page-response-book-response';
import { BookCard } from '../../components/book-card/book-card';
import { BookResponse } from '../../../../services/models/book-response';

@Component({
  selector: 'app-book-list',
  imports: [
    BookCard
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookList implements OnInit{
  bookResponse : PageResponseBookResponse = {};
  protected page = 0;
  private size = 5;
  message = signal<string>('');
  level = signal<string>('success');


  constructor(private bookService: BookService, private router: Router) {
  }

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookService.findAllBooks({
      page: this.page,
      size : this.size
    }).subscribe({
      next: (books ) =>{
        this.bookResponse = books;
      }
    })
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }

  goToPage(page : number) {
    this.page = page;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks();
  }

  get isLastPage() : boolean{
    return this.page == this.bookResponse.totalPages as number - 1;
  }

  borrowBook(book: BookResponse) {
    this.message.set('');
    this.bookService.borrowBook({
      'book-id' : book.id as number
    }).subscribe({
      next: ()=>{
        this.message.set('Book successfuly added to your list');
        this.level.set('success');
      },
      error : (err) =>{
        this.message.set(err.error.error);
        this.level.set('error');
      }
    })
  }
}
