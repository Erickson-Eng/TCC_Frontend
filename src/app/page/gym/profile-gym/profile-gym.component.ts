import { Component, OnInit } from '@angular/core';
import { GymService } from '../gym.service';
import { Gym } from 'src/app/shared/model/Gym';
import { ActivatedRoute, Router } from '@angular/router';

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
    imageId: 0
  };

  constructor(
    private service: GymService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.service.getGymById(this.id).subscribe((data) => {
        this.gym = data;
        this.service.getGymImage(data.imageId).subscribe(
          (imageSrc: string) => {
            this.gym.imageSrc = imageSrc;
          }
        )
      });
    });
  }

  redirectToSchedule(gymId:number): void {
    this.router.navigate([`gym/${gymId}/schedule`]);
  }

  redirectToAppointments(gymId:number): void {
    this.router.navigate([`gym/appointment/${gymId}`]);
  }
}
