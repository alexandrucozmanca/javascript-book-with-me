import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'javascript-book-with-me';

  transferVariable = "Transfer Variable";
  
  buttonHandler() {
    alert('I am clicked');
  };
}
