import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OceanData } from './interface/ocean';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Oceanic Data Explorer';
  data: OceanData[] = [];
  filters: {
    [key: string]: string | number | null;
    regiao: string;
    especie: string;
    statusConservacao: string;
    temperaturaMin: number | null;
    temperaturaMax: number | null;
    phMin: number | null;
    phMax: number | null;
    nivelPoluicao: string;
    pagina: number;
    qtde: number;
  } = {
    regiao: '',
    especie: '',
    statusConservacao: '',
    temperaturaMin: null,
    temperaturaMax: null,
    phMin: null,
    phMax: null,
    nivelPoluicao: '',
    pagina: 1,
    qtde: 5
  };

  constructor(private http: HttpClient) {
    this.getData();
  }

  getData() {
    let params = new HttpParams();
    Object.keys(this.filters).forEach(key => {
      if (this.filters[key] != null && this.filters[key] !== '') {
        params = params.set(key, this.filters[key]!.toString());
      }
    });

    console.log('Requesting data with params:', params.toString());

    this.http.get<OceanData[]>('https://fiap-3sis-gs-20241.azurewebsites.net/OceanData', { params })
      .subscribe(data => {
        console.log('Data received:', data);
        this.data = data;
      }, error => {
        console.error('Error:', error);
      });
  }

  applyFilters() {
    this.getData();
  }

  nextPage() {
    this.filters.pagina++;
    this.getData();
  }

  prevPage() {
    if (this.filters.pagina > 1) {
      this.filters.pagina--;
      this.getData();
    }
  }
}
