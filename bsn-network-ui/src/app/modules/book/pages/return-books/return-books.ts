import { Component, OnInit, signal } from '@angular/core';
import { PageResponseBorrowedBookResponse } from '../../../../services/models/page-response-borrowed-book-response';
import { BookService } from '../../../../services/services/book.service';
import { BorrowedBookResponse } from '../../../../services/models/borrowed-book-response';

@Component({
  selector: 'app-return-books',
  imports: [],
  templateUrl: './return-books.html',
  styleUrl: './return-books.scss',
})
export class ReturnBooks implements OnInit{
  returnedBooks = signal<PageResponseBorrowedBookResponse>({}) ;
  page = signal<number>(0);
  size = signal<number>(10);
  message = signal<string>('');
  level = signal<string>('');

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }

  private findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks({
      page : this.page(),
      size : this.size()
    }).subscribe({
      next: (response ) =>{
        this.returnedBooks.set(response);
      }
    })
  }

  goToFirstPage() {
    this.page.set(0);
    this.findAllReturnedBooks();
  }

  goToPreviousPage() {
    this.page.set(this.page()-1);
    this.findAllReturnedBooks();
  }

  goToPage(page : number) {
    this.page.set(page);
    this.findAllReturnedBooks();
  }

  goToNextPage() {
    this.page.set(this.page()+1);
    this.findAllReturnedBooks();
  }

  goToLastPage() {
    this.page.set(this.returnedBooks().totalPages as number - 1);
    this.findAllReturnedBooks();
  }

  get isLastPage() : boolean{
    return this.page() == this.returnedBooks().totalPages as number - 1;
  }

  approveBookReturn(book: BorrowedBookResponse) {
    if(!book.returned){
      this.level.set('error');
      this.message.set('The book is not yet returned.');
      return;
    }
    this.bookService.approveReturnBorrowBook({
      'book-id' : book.id as number
    }).subscribe({
      next: ()=>{
        this.level.set('success');
        this.message.set('Book return approved');
        this.findAllReturnedBooks();
      }
    })
  }
}
