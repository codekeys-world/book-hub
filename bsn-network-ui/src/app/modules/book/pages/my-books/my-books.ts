import { Component, OnInit, signal } from '@angular/core';
import { BookCard } from '../../components/book-card/book-card';
import { PageResponseBookResponse } from '../../../../services/models/page-response-book-response';
import { BookService } from '../../../../services/services/book.service';
import { Router, RouterLink } from '@angular/router';
import { BookResponse } from '../../../../services/models/book-response';

@Component({
  selector: 'app-my-books',
  imports: [
    BookCard,
    RouterLink
  ],
  templateUrl: './my-books.html',
  styleUrl: './my-books.scss',
})
export class MyBooks implements OnInit{
  bookResponse : PageResponseBookResponse = {};
  protected page = 0;
  private size = 5;


  constructor(private bookService: BookService, private router: Router) {
  }

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookService.findAllBooksByOwner({
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

  archiveBook(book : BookResponse) {
    this.bookService.updateArchivedStatus({
      'book-id' : book.id as number
    }).subscribe({
      next: ()=>{
        book.archived = !book.archived;
      }
    })
  }

  shareBook(book : BookResponse) {
    this.bookService.updateShareableStatus({
      'book-id' : book.id as number
    }).subscribe({
      next: (bookId) =>{
        book.shareable = !book.shareable;
      }
    })
  }

  editBook(book : BookResponse) {
    this.router.navigate(['books', 'manage', book.id]);
  }

}
