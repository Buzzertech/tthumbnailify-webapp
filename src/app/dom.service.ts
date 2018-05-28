import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  ViewRef
} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DomService {

  constructor(private componentFactoryResolver : ComponentFactoryResolver, private appRef : ApplicationRef, private injector : Injector) {}

  public appendComponentToBody(component : any, fileUrl:string, fileType:string) {
    const componentRef = this
      .componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    componentRef.instance['reference'] = componentRef;
    componentRef.instance['file'] = {url: fileUrl, type: fileType};
    
    this
      .appRef
      .attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef < any >).rootNodes[0]as HTMLElement;

    document
      .body
      .appendChild(domElem);
  }

  public detachComponent(ref : any) {
    this
      .appRef
      .detachView(ref.hostView);
    ref.destroy();
  }
}
