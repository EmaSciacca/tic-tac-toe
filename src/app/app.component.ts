import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Header string
  headerStr = "X Turn";

  restartGame() {
    console.log("restartGame invoked");
  }
}
