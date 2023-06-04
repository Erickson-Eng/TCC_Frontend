import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Athlete } from '../../../shared/model/Athlete';
import { CommunityService } from '../../community/community.service';
import { Membership } from 'src/app/shared/model/Membership';
import { Community } from 'src/app/shared/model/Community';

export interface MembershipList {
  membershipList: Membership[];
}

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.scss'],
})
export class AthleteComponent implements OnInit {
  athlete_email = '';
  athlete_username = '';
  other_username = '';
  athlete: Athlete = {
    id: 0,
    firstName: '',
    lastName: '',
    socialName: '',
    birthDate: null,
    cpf: '',
    locale: {
      street: '',
      number: '',
      city: '',
      state: '',
      zipCode: '',
    },
    username: '',
  };

  memberships: Membership[] = [];
  communities: Community[] = [];

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private communityService: CommunityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.athlete_username = params['username?'] || '';
    })
    this.athlete_email = this.authService.getEmail();
    if(this.athlete_username === ''){
      this.athlete_username = this.authService.getUsername();
    }
    this.profileService
      .getAthleteInfo(this.athlete_username)
      .subscribe((data) => {
        this.athlete = data;
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
  }

  redirectToCardDetails(id: number | undefined): void {
    this.router.navigate(['/community/profile/', id]);
  }
}
