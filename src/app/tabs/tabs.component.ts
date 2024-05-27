import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [MatTabsModule, RouterLink],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {

}
