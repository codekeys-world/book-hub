import { Component, OnInit, signal } from '@angular/core';
import { BookRequest } from '../../../../services/models/book-request';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../../../services/services/book.service';
import { BookResponse } from '../../../../services/models/book-response';

@Component({
  selector: 'app-manage-book',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './manage-book.html',
  styleUrl: './manage-book.scss',
})
export class ManageBook implements OnInit{
  bookRequest = signal<BookRequest>({ authorName: '', isbn: '', synopsis: '', title: '' })  ;

  errorMsg  = signal<Array<string>>([]);
  selectedBookCover = signal<any>('');
  selectedPicture = signal<string | undefined>('');

  constructor(private bookService: BookService, private router : Router, private activatedRoute : ActivatedRoute) {
  }

  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    if(bookId){
      this.bookService.findBookById({
        'book-id' : bookId
      }).subscribe({
        next: (book : BookResponse) => {
          this.bookRequest.set({
            id : book.id,
            title : book.title as string,
            authorName : book.authorName as string,
            isbn : book.isbn as string,
            synopsis: book.synopsis as string,
            shareable : book.shareable
          })
          if(book.cover){
            this.selectedPicture.set('data:image/jpg;base64,'+book.cover);
          }
        }
      })
    }
  }

  onFileSelected(event: any) {
    this.selectedBookCover.set(event.target.files[0]);
    console.log(this.selectedBookCover);
    if(this.selectedBookCover()) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture.set(reader.result as string);
      }
      reader.readAsDataURL(this.selectedBookCover());
    }
  }

  saveBook() {
    this.bookService.saveBook({
      body : this.bookRequest()
    }).subscribe({
      next: (bookId ) =>{

        this.bookService.uploadBookCoverPicture({
          'book-id' : bookId,
          body: {
            file : this.selectedBookCover()
          }
        }).subscribe({
          next: ( ) =>{
            void this.router.navigate(['/books/my-books']);
          }
        })
      },
      error :(err) =>{
        this.errorMsg.set(err.error.validationErrors);
      }
    })
  }


}
