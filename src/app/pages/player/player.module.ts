import { ButtomMenuComponent } from './../components/buttom-menu/buttom-menu.component';
import { LeftBoardComponent } from './../components/left-board/left-board.component';
import { playerRotes } from './../player/player.routes';
import { RouterModule } from '@angular/router';
import { PlayerComponent } from './../player/player.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [PlayerComponent, LeftBoardComponent, ButtomMenuComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(playerRotes),
  ],
})
export class PlayerModule {}
