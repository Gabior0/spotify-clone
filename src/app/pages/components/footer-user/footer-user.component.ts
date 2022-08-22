import { SpotifyService } from './../../../services/spotify.service';
import { IUser } from './../../../interfaces/IUser';
import { Component, OnInit } from '@angular/core';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer-user',
  templateUrl: './footer-user.component.html',
  styleUrls: ['./footer-user.component.scss'],
})
export class FooterUserComponent implements OnInit {
  exitIcon = faSignOut;
  userFooter: IUser = null;

  constructor(private spotifiService: SpotifyService) {}

  ngOnInit(): void {
    this.userFooter = this.spotifiService.user;
  }

  logout() {
    this.spotifiService.logout();
  }
}
