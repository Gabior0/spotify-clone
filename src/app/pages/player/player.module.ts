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

@NgModule({
  declarations: [
    PlayerComponent,
    LeftBoardComponent,
    ButtomMenuComponent,
    FooterUserComponent,
    HomeComponent,
    TopArtistComponent,
    RightBoardComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(playerRotes),
  ],
})
export class PlayerModule {}
