import { Component } from '@angular/core';
import { HistoricoService } from '../services/historico.service';
import { Historico } from '../models/Historico';

import { localPtBr } from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public listaHistoricos: Historico[] = [];


  constructor(private historicoService: HistoricoService) {
    registerLocaleData(localPtBr);
  }

  public buscarHistoricos() {
    this.listaHistoricos = [];

    this.listaHistoricos.getAll().subscribe(dados => {
      this.listaHistoricos = dados.map(registro => {
        return {
          $key: registro.payload.doc.id,
         leitura: registro.payload.doc.data()['leitura'],
          dataHora: new Date(registro.payload.doc.data()['dataHora']['seconds'] * 1000)
        } as Historico;
      });
    });
  }

  async ionViewWillEnter() {
    await this.buscarHistoricos();
  }

  public deletar(key: string) {
    this.historicoService.delete(key);
    this.buscarHistoricos();
  }

}
