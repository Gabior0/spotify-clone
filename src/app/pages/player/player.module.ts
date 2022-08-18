import { playerRotes } from './../player/player.routes';
import { RouterModule } from '@angular/router';
import { PlayerComponent } from './../player/player.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PlayerComponent],
  imports: [CommonModule, RouterModule.forChild(playerRotes)],
})
export class PlayerModule {}
