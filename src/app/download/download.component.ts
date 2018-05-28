import { Component, OnInit, Input, ComponentRef } from '@angular/core';
import { DomService } from '../dom.service';
import { trigger,style,transition,animate,keyframes,query,stagger, state } from '@angular/animations';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
  animations: [
    trigger('initModal', [
      state('start', style({
        transform: 'translateY(250%)'
      })),
      state('end', style({
        transform: 'translateY(0)'
      })),
      transition('start => end', animate('300ms ease-in', keyframes([
        style({transform: 'translateY(250%)', offset: 0}),
        style({transform: 'translateY(30px)', offset: 0.7}),
        style({transform: 'translateY(0)', offset: 1})
      ]))),
      transition('end => start', animate('300ms ease-in', keyframes([
        style({transform: 'translateY(0)', offset: 0}),
        style({transform: 'translateY(30px)', offset: 0.7}),
        style({transform: 'translateY(250%)', offset: 1})
    ])))
  ])
]
})
export class DownloadComponent implements OnInit {

  @Input('reference') reference: ComponentRef<{}>;
  @Input('file') file:Object;
  private animateValue: string = "start"
  constructor(private dom:DomService) { }
  ngOnInit() {
    setTimeout(()=>{
    this.animateValue = "end";      
    }, 600);
  }

  destroy(){
    this.animateValue = "start";
    setTimeout(()=>{
      this.dom.detachComponent(this.reference);
    }, 600);
  }

}
