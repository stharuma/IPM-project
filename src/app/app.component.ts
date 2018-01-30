import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FlickrService } from './services/flickr.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FlickrService]
})
// export class AppComponent {
//   title = 'app';
// }
export class AppComponent implements OnInit {
  searchControl = new FormControl();

  model$: Observable<any>;
  photos: Object;
  constructor(private _formBuilder: FormBuilder, private _flickrService: FlickrService) {
  }
  ngOnInit() {
    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap((query: string) => this._flickrService.getResult(query))
      .subscribe(value => {
        this.photos = value;
      });
  }
}

