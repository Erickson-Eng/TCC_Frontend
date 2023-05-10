import { Component, OnInit } from '@angular/core';
import { CardItem } from 'src/app/shared/model/CardItem';
import { Gym } from 'src/app/shared/model/Gym';
import { GymService } from '../gym.service';

@Component({
  selector: 'app-list-gym',
  templateUrl: './list-gym.component.html',
  styleUrls: ['./list-gym.component.scss'],
})
export class ListGymComponent implements OnInit {
  ngOnInit(): void {
    this.cardList = this.mapGymToCardItemList(this.gymList);
  }

  constructor(private service: GymService) {}

  cardList: CardItem[] = [];
  gymList: Gym[] = [
    {
      name: 'Academia Fitness',
      shortDescription: 'Academia com diversas modalidades de exercícios',
      locale: {
        street: 'Rua das Flores',
        number: '123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
      },
      sportPracticable: [
        { id: 1, name: 'Basquete' },
        { id: 2, name: 'Futebol' },
        { id: 3, name: 'Volei' },
      ],
      rules: 'Os alunos devem usar roupas adequadas e trazer uma toalha',
    },
    {
      name: 'Studio de Yoga Zen',
      shortDescription: 'Studio especializado em aulas de yoga',
      locale: {
        street: 'Avenida dos Girassóis',
        number: '456',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '98765-432',
      },
      sportPracticable: [{ id: 4, name: 'Tenis' }],
      rules:
        'Chegar 10 minutos antes do início da aula e trazer seu próprio tapete',
    },
    {
      name: 'Academia de Lutas ForteBravo',
      shortDescription: 'Academia especializada em artes marciais',
      locale: {
        street: 'Rua das Artes Marciais',
        number: '789',
        city: 'Belo Horizonte',
        state: 'MG',
        zipCode: '54321-098',
      },
      sportPracticable: [
        { id: 6, name: 'League of legends' },
        { id: 1, name: 'Basquete' },
      ],
      rules:
        'Todos os alunos devem usar equipamentos de proteção durante as aulas',
    },
    {
      name: 'Centro de Pilates Equilíbrio',
      shortDescription: 'Espaço dedicado à prática de pilates',
      locale: {
        street: 'Avenida do Equilíbrio',
        number: '321',
        city: 'Curitiba',
        state: 'PR',
        zipCode: '76543-210',
      },
      sportPracticable: [
        { id: 7, name: 'Futsal' },
        { id: 8, name: 'Natação' },
      ],
      rules: 'Trazer uma garrafa de água e usar roupas confortáveis',
    },
    {
      name: 'Academia Fitness Plus',
      shortDescription: 'Academia com treinamento funcional e musculação',
      locale: {
        street: 'Rua dos Atletas',
        number: '987',
        city: 'Porto Alegre',
        state: 'RS',
        zipCode: '21098-765',
      },
      rules: 'Agendar horário para utilização dos equipamentos',
    },
  ];




  mapGymToCardItemList(gymList: Gym[]): CardItem[] {
    return gymList.map((gym) => {
      const item: CardItem = {
        photoUrl: '../../../../assets/images/default-image.png',
        title: gym.name,
        contentBody: gym.shortDescription,
      };

      if (gym.locale) {
        item.subtitleBotton = `${gym.locale.street}, ${gym.locale.number} - ${gym.locale.city}`;
      }
      if (gym.sportPracticable) {
        item.itemList = gym.sportPracticable.map((sport) => {
          return sport.name;
        });
      }

      return item;
    });
  }
}
