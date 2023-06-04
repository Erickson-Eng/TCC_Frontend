import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ProfileService } from '../../profile/profile.service';
import { CommunityService } from '../../community/community.service';
import { Membership } from 'src/app/shared/model/Membership';
import { Community } from 'src/app/shared/model/Community';
import { MembershipList } from '../../profile/athlete/athlete.component';

interface Booking {
  text: string;
  day: string;
  checkinBooking: Date;
  checkoutBooking: Date;
  applicationState: string;
  gymId: number;
  communityId: number;
}

@Component({
  selector: 'app-agendamento-gym',
  templateUrl: './agendamento-gym.component.html',
  styleUrls: ['./agendamento-gym.component.scss'],
})
export class AgendamentoGymComponent implements OnInit {
  gymId = 0;
  username = '';
  scheduleForm!: FormGroup;
  booking: Booking = {
    text: '',
    day: '',
    checkinBooking: new Date(),
    checkoutBooking: new Date(),
    applicationState: '',
    gymId: 0,
    communityId: 0,
  };

  memberships: Membership[] = [];
  communities: Community[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snakeBar: MatSnackBar,
    private authService: AuthService,
    private profileService: ProfileService,
    private communityService: CommunityService
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();

    this.profileService.getAthleteInfo(this.username).subscribe((data) => {
      this.communityService
        .getAllApplication(undefined, 'APPROVED', data.id)
        .subscribe((membership: MembershipList) => {
          this.memberships = membership.membershipList;
          this.memberships.forEach((membership) => {
            this.communityService
              .getCommunityById(membership.communityId)
              .subscribe((community) => {
                this.communityService
                  .getImageForCommunity(community.id)
                  .subscribe((image) => {
                    community.imageSrc = image;
                  });
                this.communities.push(community);
              });
          });
        });
    });

    this.route.params.subscribe((params) => {
      const gymId = params['id'];
      this.gymId = gymId;
    });

    this.scheduleForm = this.formBuilder.group(
      {
        communityId: ['', Validators.required],
        date: [Date],
        checkinBooking: ['', Validators.required],
        checkoutBooking: ['', Validators.required],
        text: ['', Validators.required],
      },
      { validator: this.checkinCheckoutValidator }
    );
  }

  submitForm() {
    let booking = this.mapBookingForm();
    console.log(booking);
  }

  mapBookingForm(): Booking {
    let formValues = this.scheduleForm.value;
    let booking: Booking = {
      text: formValues.text,
      day: 'SEGUNDA',
      checkinBooking: this.criarDataComHora(
        formValues.date,
        formValues.checkinBooking
      ),
      checkoutBooking: this.criarDataComHora(
        formValues.date,
        formValues.checkoutBooking
      ),
      applicationState: '',
      gymId: this.gymId,
      communityId: formValues.communityId,
    };
    return booking;
  }

  criarDataComHora(data: Date, hora: string) {
    const [horas, minutos, periodo] = hora.split(/:| /);
    let hora24 = parseInt(horas);

    if (periodo.toLowerCase() === 'pm' && hora24 !== 12) {
      hora24 += 12;
    }

    const novaData = new Date(data);
    novaData.setHours(hora24);
    novaData.setMinutes(parseInt(minutos));

    return novaData;
  }

  checkinCheckoutValidator(formGroup: FormGroup) {
    const checkin = formGroup.get('checkinBooking')?.value;
    const checkout = formGroup.get('checkoutBooking')?.value;

    if (checkin && checkout && checkin >= checkout) {
      formGroup.get('checkoutBooking')?.setErrors({ invalidTimeRange: true });
    } else {
      formGroup.get('checkoutBooking')?.setErrors(null);
    }
  }
}
