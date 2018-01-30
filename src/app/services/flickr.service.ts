import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class FlickrService {
    result$: Observable<any>;
    key = 'a5e95177da353f58113fd60296e1d250';
    user='24662369@N07';
    constructor(private _http: Http) { };

    getResult(query: string) {
        let url = `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key==${this.key}&user_id==${this.user}&format=json&nojsoncallback=1`;
        return this._http
            .get(url)
            .map(res => res.json())
            .map((val) => {
                if (val.stat === 'ok') {
                
                    return val.photos.photo.map((photo: any) => {
                        return {
                            url: `https://farm{photo.farm}.staticflickr.com/{photo.server}/{photo.id}_{photo.secret}.jpg`,
                            title: photo.title
                        }
                    })
                }
                else {
                    return [];
             }
            });
    }
}
