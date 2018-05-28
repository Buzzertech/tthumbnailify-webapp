import {DomService} from './dom.service';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Component, ViewChild} from '@angular/core';
import {TagInputComponent} from 'ngx-chips';
import {ServicesService} from './services.service';
import {DownloadComponent} from './download/download.component';

@Component({selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.scss']})
export class AppComponent {
  urlForm : FormGroup;
  fileDetails : Object;
  constructor(private form : FormBuilder, private service : ServicesService, private dom : DomService) {
    this.urlForm = this
      .form
      .group({
        url: [
          "", Validators.required
        ],
        quality: ["Select Quality", Validators.required]
      });
  }

  private getResults(e) : void {
    e.preventDefault();
    if (this.urlForm.value.url.length === 1) {
      this
        .service
        .processUrl(this.urlForm.value.url[0].value, this.urlForm.value.quality)
        .subscribe((val : any) => {
          if (val.status === 200) {
            this
              .dom
              .appendComponentToBody(DownloadComponent, val.response, 'image');

          }
        }, (err) => {
          console.error(err);
        });
    } else {
      let urlArr = [];
      this.urlForm.value.url.forEach(url => {
          urlArr.push(url.value);
      });
      this
        .service
        .processUrls(urlArr, this.urlForm.value.quality)
        .subscribe((val : any) => {
          if (val.status === 200) {
            this
              .dom
              .appendComponentToBody(DownloadComponent, val.response, 'zip');
          }
        }),
      (err) => {
        console.error(err)
      };
    }
  }
}
