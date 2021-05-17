import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Goal } from '../models/goal.model';

//connects to 9081 on the backend
const baseUrl = 'http://localhost:9081/api/goals';

@Injectable({
  providedIn: 'root'
})
/**
 * CRUD Operations
 * * & delete all
 */
export class GoalService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Goal[]> {
    return this.http.get<Goal[]>(baseUrl);
  }
  
  get(id: any): Observable<Goal> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
}
