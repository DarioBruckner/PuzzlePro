import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FAQComponent } from './faq/faq.component';
import { ChoosePuzzleComponent } from './choose-puzzle/choose-puzzle.component';
import { HighscoresComponent } from './highscores/highscores.component';

const routes: Routes = [
  {path: "login", component:LogInComponent},
  {path: "signup", component:SignUpComponent},
  {path: "profile", component:ProfileComponent},
  {path: "FAQ", component:FAQComponent},
  {path: "", component:ChoosePuzzleComponent}
  {path: "highscores", component:HighscoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
