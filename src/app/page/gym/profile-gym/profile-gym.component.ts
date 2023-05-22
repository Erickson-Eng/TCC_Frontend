import { Component, OnInit } from '@angular/core';
import { GymService } from '../gym.service';
import { Gym } from 'src/app/shared/model/Gym';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-gym',
  templateUrl: './profile-gym.component.html',
  styleUrls: ['./profile-gym.component.scss'],
})
export class ProfileGymComponent implements OnInit {
  id!: number;
  gym: Gym = {
    id: 0,
    name: '',
    shortDescription: '',
    locale: {
      street: '',
      number: '',
      city: '',
      state: '',
      zipCode: '',
    },
  };
  constructor(private service: GymService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.service.getGymById(this.id).subscribe((data) => {
        this.gym = data;
      });
    });
  }
}
