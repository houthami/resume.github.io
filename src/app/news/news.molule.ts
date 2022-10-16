import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NewsComponent } from "./news.component";
import { NewsCarouselComponent } from "./news-carousel/news-carousel.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";
import { CoreModule } from "../core/core.module";

@NgModule({
    imports: [ CommonModule, FontAwesomeModule, CoreModule, BrowserAnimationsModule ],
    declarations: [ NewsComponent, NewsCarouselComponent ],
    exports: [ NewsComponent ]
})

export class NewsModule { }