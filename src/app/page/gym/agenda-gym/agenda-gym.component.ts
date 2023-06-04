import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

export interface Agendamento {
  id: number;
  checkinBooking: string;
  checkoutBooking: string;
  gymId: number;
  gymName: string;
  applicationState: string;
  communityId: number;
  communityName: string;
  createdDate: string;
  modifiedDate: string;
}

@Component({
  selector: 'app-agenda-gym',
  templateUrl: './agenda-gym.component.html',
  styleUrls: ['./agenda-gym.component.scss'],
})
export class AgendaGymComponent implements OnInit {
  gridCols: number = 3;
  diasSemana: { dia: string; data: Date }[] = [];
  diaSelecionado: number = 0;
  dataAtual: Date = new Date();
  isMobile = false;
  mesSelecionado: string = '';
  horarios: string[] = [];
  agendamento: Agendamento | null = null;
  agendamentos: Agendamento[] = [
    {
      id: 1,
      checkinBooking: '12:00',
      checkoutBooking: '14:00',
      gymId: 1,
      gymName: 'Ginásio A',
      applicationState: 'APPROVED',
      communityId: 1,
      communityName: 'Necroteam',
      createdDate: '2023-05-28',
      modifiedDate: '2023-05-28',
    },
    {
      id: 2,
      checkinBooking: '12:00',
      checkoutBooking: '14:00',
      gymId: 1,
      gymName: 'Ginásio A',
      applicationState: 'CANCELED',
      communityId: 2,
      communityName: 'Comunidade dos programadores',
      createdDate: '2023-05-28',
      modifiedDate: '2023-05-28',
    },
    {
      id: 3,
      checkinBooking: '15:00',
      checkoutBooking: '16:00',
      gymId: 1,
      gymName: 'Ginásio A',
      applicationState: 'WAITING_FOR_APPROVAL',
      communityId: 2,
      communityName: 'Comunidade dos programadores',
      createdDate: '2023-05-28',
      modifiedDate: '2023-05-28',
    },
    {
      id: 4,
      checkinBooking: '15:00',
      checkoutBooking: '16:00',
      gymId: 2,
      gymName: 'Ginásio A',
      applicationState: 'WAITING_FOR_APPROVAL',
      communityId: 2,
      communityName: 'Racha dos Preás',
      createdDate: '2023-05-28',
      modifiedDate: '2023-05-28',
    },
  ];

  meses: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];


  constructor(private breakpointObserver: BreakpointObserver) {
    this.inicializarDataAtual();
    this.inicializarDiasSemana();
    this.diaSelecionado = this.dataAtual.getDay();
    this.mesSelecionado = this.meses[this.dataAtual.getMonth()];
  }

  ngOnInit() {
    this.getGridCols();
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });

    for (let hora = 0; hora < 24; hora++) {
      const horario = `${hora.toString().padStart(2, '0')}:00`;
      this.horarios.push(horario);
    }
  }

  selecionarAgendamentoPorHorario(horario: string) {
    this.agendamento = null;
    if (this.agendamentos && this.agendamentos.length > 0) {
      const agendamentoSelecionado = this.agendamentos.find(
        (a) => a.checkinBooking === horario
      );

      if (agendamentoSelecionado) {
        this.agendamento = agendamentoSelecionado;
      }
    }
  }

  selecionarMes(mes: string) {
    const mesIndex = this.meses.indexOf(mes);
    this.dataAtual.setMonth(mesIndex);
    this.mesSelecionado = this.meses[this.dataAtual.getMonth()];
    this.inicializarDiasSemana();
  }

  selecionarDia(index: number) {
    this.diaSelecionado = index;
    this.dataAtual = this.diasSemana[index].data;
    console.log('Dia selecionado:', this.diasSemana[index]);
  }

  avancarSemana() {
    const dataAnterior = new Date(this.dataAtual);
    this.dataAtual.setDate(this.dataAtual.getDate() + 7);
    this.inicializarDiasSemana();

    if (dataAnterior.getMonth() !== this.dataAtual.getMonth()) {
      const novoMes = this.meses[this.dataAtual.getMonth()];
      this.selecionarMes(novoMes);
      this.mesSelecionado = novoMes;
    }
  }

  voltarSemana() {
    const dataAnterior = new Date(this.dataAtual);
    this.dataAtual.setDate(this.dataAtual.getDate() - 7);
    this.inicializarDiasSemana();

    if (dataAnterior.getMonth() !== this.dataAtual.getMonth()) {
      const novoMes = this.meses[this.dataAtual.getMonth()];
      this.selecionarMes(novoMes);
      this.mesSelecionado = novoMes;
    }
  }

  avancarMes() {
    this.dataAtual.setMonth(this.dataAtual.getMonth() + 1);
    this.inicializarDiasSemana();
    const mesIndex = this.meses.indexOf(this.mesSelecionado);
    if (mesIndex < this.meses.length - 1) {
      const novoMes = this.meses[mesIndex + 1];
      this.selecionarMes(novoMes);
      this.mesSelecionado = novoMes;
    }
  }

  voltarMes() {
    this.dataAtual.setMonth(this.dataAtual.getMonth() - 1);
    this.inicializarDiasSemana();
    const mesIndex = this.meses.indexOf(this.mesSelecionado);
    if (mesIndex > 0) {
      const novoMes = this.meses[mesIndex - 1];
      this.selecionarMes(novoMes);
      this.mesSelecionado = novoMes;
    }
  }

  private inicializarDataAtual() {
    this.dataAtual = new Date();
  }

  private inicializarDiasSemana() {
    if (!this.dataAtual) {
      return;
    }

    const diaSemana = this.dataAtual.getDay();
    const dataInicioSemana = new Date(this.dataAtual);
    dataInicioSemana.setDate(this.dataAtual.getDate() - diaSemana);

    this.diasSemana = [];

    for (let i = 0; i < 7; i++) {
      const data = new Date(dataInicioSemana);
      data.setDate(dataInicioSemana.getDate() + i);
      this.diasSemana.push({ dia: this.obterNomeDiaSemana(i), data: data });
    }
  }

  getGridCols() {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.gridCols = 1;
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.gridCols = 2;
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.gridCols = 3;
        } else if (result.breakpoints[Breakpoints.Large]) {
          this.gridCols = 3;
        } else if (result.breakpoints[Breakpoints.XLarge]) {
          this.gridCols = 3;
        }
      });
  }

  actionsButtons(booking: Agendamento, state: string){
    return booking.applicationState === state;
  }


  private obterNomeDiaSemana(index: number): string {
    const diasSemana = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];
    return diasSemana[index];
  }
}
