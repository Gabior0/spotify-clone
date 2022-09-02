import { SearchComponent } from './../search/search.component';
import { BannerComponent } from './../components/banner/banner.component';
import { ListMusicsComponent } from './../list-musics/list-musics.component';
import { PlayerCardComponent } from './../components/player-card/player-card.component';
import { ArtistItemImageComponent } from './../components/artist-item-image/artist-item-image.component';
import { TopArtistsComponent } from './../components/top-artists/top-artists.component';
import { RecentSearchesComponent } from './../components/recent-searches/recent-searches.component';
import { RightBoardComponent } from './../components/right-board/right-board.component';
import { TopArtistComponent } from './../components/top-artist/top-artist.component';
import { HomeComponent } from './../home/home.component';
import { FooterUserComponent } from './../components/footer-user/footer-user.component';
import { ButtomMenuComponent } from './../components/buttom-menu/buttom-menu.component';
import { LeftBoardComponent } from './../components/left-board/left-board.component';
import { playerRotes } from './../player/player.routes';
import { RouterModule } from '@angular/router';
import { PlayerComponent } from './../player/player.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PlayerComponent,
    LeftBoardComponent,
    ButtomMenuComponent,
    FooterUserComponent,
    HomeComponent,
    TopArtistComponent,
    RightBoardComponent,
    RecentSearchesComponent,
    TopArtistsComponent,
    ArtistItemImageComponent,
    PlayerCardComponent,
    ListMusicsComponent,
    BannerComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(playerRotes),
    FormsModule,
  ],
})
export class PlayerModule {}
