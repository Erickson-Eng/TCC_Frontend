import { Component, OnInit } from '@angular/core';
import { CardItem } from 'src/app/shared/model/CardItem';
import { Community } from 'src/app/shared/model/Community';
import { CommunityService } from '../community.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-list-community',
  templateUrl: './list-community.component.html',
  styleUrls: ['./list-community.component.scss'],
})
export class ListCommunityComponent implements OnInit {
  cardItemList: CardItem[] | undefined;

  communityList: Community[] = [];

  ngOnInit(): void {
    this.service
      .getAllCommunities()
      .pipe(
        tap((response: any) => {
          if (Array.isArray(response.communityList)) {
            const communities = response.communityList;
            this.cardItemList =
              this.transformCommunityListInCardItemList(communities);
              console.log(this.cardItemList);
          }
        })
      )
      .subscribe();
  }

  constructor(private service: CommunityService) {}

  transformCommunityListInCardItemList(communityList: Community[]): CardItem[] {
    return communityList.map((community) => {
      const cardItem: CardItem = {
        photoUrl: '../../../../assets/images/default-image.png',
        title: community.name,
        contentBody: community.description,
      };

      if (community.id) {
        cardItem.subtitleTop = `ID: ${community.id}`;
      }

      if (community.imageId) {
        this.service
          .getImageForCommunity(community.imageId)
          .subscribe((imageSrc: string) => {
            cardItem.photoUrl = imageSrc;
          });
      }

      return cardItem;
    });
  }
}
