import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Unit } from './unit.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  obsUnit: Observable<Unit[]>; //L’observable che sta in attesa dei dati
  data: Unit[];
  postObserver : Observable<Object>;
  postData : Object;
  constructor(private http: HttpClient) { } //Dependency injection
  getUnitList(): void {
    //Qui va sostituito l’url con quello delle vostre api
    this.obsUnit = this.http.get<Unit[]>('https://3000-f3440e1b-f877-4bfb-a3c0-9c0941938d11.ws-eu01.gitpod.io/users/json');
    //Mi sottoscrivo all’observable e scrivo la arrow function che riceve i dati
    this.obsUnit.subscribe((data: Unit[]) => {this.data = data;});
  }

addUnit(newUnit: HTMLInputElement, newCost: HTMLInputElement, newHitSpeed: HTMLInputElement, newDeployTime: HTMLInputElement,
   newRange: HTMLInputElement, newTarget: HTMLInputElement, newCount: HTMLInputElement, newTransport: HTMLInputElement,
   newType: HTMLInputElement, newRarity: HTMLInputElement): boolean {
    let newData: Unit = new Unit();
    newData.Unit = newUnit.value;
    newData.Cost = newCost.value;
    newData.Hit_Speed = newHitSpeed.value;
    newData.Deploy_Time = newDeployTime.value;
    newData.Range = newRange.value;
    newData.Target = newTarget.value;
    newData.Count = newCount.value;
    newData.Transport = newTransport.value;
    newData.Type = newType.value;
    newData.Rarity = newRarity.value;
    let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.postObserver = this.http.post('https://3000-f3440e1b-f877-4bfb-a3c0-9c0941938d11.ws-eu01.gitpod.io/users/json', JSON.stringify(newData),headers)

    //Meglio così ma da verificare
    //this.postObserver = this.http.post('http://localhost:3000/users', newData);
    this.postObserver.subscribe(data => this.postData = data);
    return false;
  }

}
