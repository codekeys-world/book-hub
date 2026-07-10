import { Component, OnInit, signal } from '@angular/core';
import { PageResponseBorrowedBookResponse } from '../../../../services/models/page-response-borrowed-book-response';
import { BorrowedBookResponse } from '../../../../services/models/borrowed-book-response';
import { BookService } from '../../../../services/services/book.service';
import { FeedbackRequest } from '../../../../services/models/feedback-request';
import { FormsModule } from '@angular/forms';
import { Rating } from '../../components/rating/rating';
import { FeedbackService } from '../../../../services/services/feedback.service';

@Component({
  selector: 'app-borrowed-book',
  imports: [
    FormsModule,
    Rating
  ],
  templateUrl: './borrowed-book.html',
  styleUrl: './borrowed-book.scss',
})
export class BorrowedBook implements OnInit{
  borrowedBooks = signal<PageResponseBorrowedBookResponse>({}) ;
  feedBackRequest = signal<FeedbackRequest>({bookId : 0, comment : '', note : 0});
  page = signal<number>(0);
  size = signal<number>(10);
  selectedBook = signal<BorrowedBookResponse | undefined>(undefined);

  constructor(private bookService: BookService, private feedbackService: FeedbackService) {
  }
  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }

  returnBorrowedBook(book: BorrowedBookResponse) {
    this.selectedBook.set(book);
    this.feedBackRequest().bookId = book.id as number;
    alert(this.feedBackRequest().bookId);
  }


  private findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({
      page : this.page(),
      size : this.size()
    }).subscribe({
      next: (response ) =>{
        this.borrowedBooks.set(response);
      }
    })
  }

  goToFirstPage() {
    this.page.set(0);
    this.findAllBorrowedBooks();
  }

  goToPreviousPage() {
    this.page.set(this.page()-1);
    this.findAllBorrowedBooks();
  }

  goToPage(page : number) {
    this.page.set(page);
    this.findAllBorrowedBooks();
  }

  goToNextPage() {
    this.page.set(this.page()+1);
    this.findAllBorrowedBooks();
  }

  goToLastPage() {
    this.page.set(this.borrowedBooks().totalPages as number - 1);
    this.findAllBorrowedBooks();
  }

  get isLastPage() : boolean{
    return this.page() == this.borrowedBooks().totalPages as number - 1;
  }

  returnBook(withFeedback: boolean) {
    this.bookService.returnBorrowBook({
      'book-id' : this.selectedBook()?.id as number
    }).subscribe({
      next: (response ) =>{
        if(withFeedback){
          this.giveFeedback();
        }
        this.selectedBook.set(undefined);
        this.findAllBorrowedBooks();
      }
    })
  }

  private giveFeedback() {
    console.log(this.feedBackRequest());
    this.feedbackService.saveFeedback({
      body : this.feedBackRequest()
    }).subscribe({
      next: () =>{

      }
    })
  }
}
