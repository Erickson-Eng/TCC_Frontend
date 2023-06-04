import { Component, OnInit } from '@angular/core';
import { Community } from 'src/app/shared/model/Community';
import { CommunityService } from '../community.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ProfileService } from '../../profile/profile.service';
import { Membership } from 'src/app/shared/model/Membership';
import { CardItem } from 'src/app/shared/model/CardItem';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

interface MembershipList {
  membershipList: Membership[];
}

@Component({
  selector: 'app-profile-community',
  templateUrl: './profile-community.component.html',
  styleUrls: ['./profile-community.component.scss'],
})
export class ProfileCommunityComponent implements OnInit {
  roles: string[] = [];
  cardItemList: CardItem[] | undefined;
  id!: number;
  gridCols: number = 3;
  username = '';

  community: Community = {
    name: '',
    description: '',
  };
  applications = [];
  membership: Membership[] = [];

  constructor(
    private service: CommunityService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.getGridCols();
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.service.getCommunityById(this.id).subscribe((data) => {
        this.community = data;
        this.service
          .getAllApplication(data.id!, 'APPROVED')
          .subscribe((application: MembershipList) => {
            console.log(application);
            this.membership = application.membershipList;
            this.cardItemList = this.mapMembersToCard(application);
          });
        this.service
          .getImageForCommunity(data!.id)
          .subscribe((imageSrc: string) => {
            this.community.imageSrc = imageSrc;
          });
      });
    });
  }

  mapMembersToCard(membershipList: MembershipList): CardItem[] {
    return membershipList.membershipList.map((membership) => {
      const cardItem: CardItem = {
        photoUrl: '',
        title: membership.athleteName,
        contentBody: membership.communityProfile,
      };

      return cardItem;
    });
  }

  applyOnCommunity() {
    let username = this.authService.getUsername();

    this.profileService.getAthleteInfo(username).subscribe((data) => {
      this.service
        .applyOnCommunity(this.id, data.id)
        .subscribe((memberships) => {
          console.log(memberships);
        });
    });
  }

  canApply(role: string) {
    return this.verifyIfHaveRole(role);
  }

  verifyIfHaveRole(role: string) {
    this.roles = this.authService.getRoles();
    return this.roles.includes(role);
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
          this.gridCols = 1; // 1 coluna em telas extra pequenas (ex.: celulares)
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.gridCols = 2; // 2 colunas em telas pequenas (ex.: tablets)
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.gridCols = 3; // 3 colunas em telas médias
        } else if (result.breakpoints[Breakpoints.Large]) {
          this.gridCols = 3; // 4 colunas em telas grandes
        } else if (result.breakpoints[Breakpoints.XLarge]) {
          this.gridCols = 3; // 5 colunas em telas extra grandes
        }
      });
  }

  verifyIfExist(members: Membership[], username: string, state: string) {
    return members.some(
      (member) =>
        member['username'] === username
        && member['applicationState'] === state
    );
  }

  redirectToUserProfile(username: string | undefined): void {
    this.router.navigate(['/profile/athlete/', username]);
  }
}
