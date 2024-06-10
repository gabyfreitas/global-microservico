import { Component, OnInit } from '@angular/core';
import { OceanDataService } from '../../service/ocean-data.service';
import { OceanData } from '../../interface/ocean';

@Component({
  selector: 'app-ocean-data',
  templateUrl: './ocean-data.component.html',
  styleUrls: ['./ocean-data.component.css']
})
export class OceanDataComponent implements OnInit {

  data: OceanData[] = [];
  filters = {
    regiao: '',
    temperaturaAgua: null,
    pH: null,
    phMin: '',
    phMax: '',
    nivelPoluicao: '',
    especie: '',
    statusEspecie: '',
    projetoConservacao: '',
    tipoProjeto: '',
    tipoParticipacao: ''
  };

  constructor(private oceanDataService: OceanDataService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    console.log('Fetching data with filters:', this.filters);
    this.oceanDataService.getOceanData(this.filters).subscribe(data => {
      console.log('Data received:', data);
      this.data = data;
    }, error => {
      console.error('Error fetching data:', error);
    });
  }

  applyFilters() {
    this.fetchData();
  }
}
