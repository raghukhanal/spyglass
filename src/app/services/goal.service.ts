import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

//idk if we need this yet, 8080 is where our server is gonna connect
const baseUrl = 'http://localhost:8080/api/goals';

@Injectable({
  providedIn: 'root'
})
/**
 * CRUD Operations
 * * & delete all
 */
export class GoalService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }
  get(id) {
    return this.http.get('${baseUrl}/${id}');
  }
  create(data) {
    return this.http.post(baseUrl, data);
  }
  update(id, data) {
    return this.http.put('${baseUrl}/${id}', data);
  }
  delete(id) {
    return this.http.delete('${baseUrl}/${id}');
  }
  deleteAll() {
    return this.http.delete(baseUrl);
  }
}
