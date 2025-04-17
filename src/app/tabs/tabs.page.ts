import { Component, EnvironmentInjector, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { storefrontOutline, happyOutline, cartOutline, fastFoodOutline, menuOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [
    IonTabs, 
    IonTabBar, 
    IonTabButton, 
    IonIcon, 
    IonLabel,
    CommonModule,
  ],
})
export class TabsPage {
  activeTab: string = 'inicio'; // 'inicio' será el tab activo por defecto
  public environmentInjector = inject(EnvironmentInjector);

  constructor(private router: Router) {
    addIcons({storefrontOutline,cartOutline,happyOutline,menuOutline,fastFoodOutline});
  }

  navigateToHome() {
    this.router.navigate(['/tabs/inicio']);
    this.activeTab = 'inicio';
  }

  onTabChange(tab: string) {
    this.activeTab = tab;
  }
}
