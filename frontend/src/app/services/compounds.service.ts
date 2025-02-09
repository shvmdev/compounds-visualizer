import { inject, Injectable } from '@angular/core';
import { Compound } from '../model/compound.type';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompoundsService {
  http = inject(HttpClient);
  getCompoundsFromApi(page: number): Observable<Compound[]> {
    const apiUrl = `http://localhost:5000/compounds?page=${page}`;
    return this.http.get<{ count: number; rows: Compound[] }>(apiUrl).pipe(
      map((response) => response.rows) // Extract only `rows`
    );
  }

  getCompoundById(id: number): Observable<Compound> {
    const apiUrl = `http://localhost:5000/compounds`;
    return this.http.get<Compound>(`${apiUrl}/${id}`);
  }

  updateCompoundById(updatedCompound: Compound): Observable<Compound> {
    const apiUrl = `http://localhost:5000/compounds`;
    return this.http.put<Compound>(
      `${apiUrl}/${updatedCompound.id}`,
      updatedCompound
    );
  }

  constructor() {}
}
