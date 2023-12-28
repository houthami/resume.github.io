import {
    Component, OnInit,
    Input, HostListener,
    EventEmitter, ElementRef,
    Output
} from "@angular/core";
import { INew } from "../news-interfaces";
import { trigger, state, style, animate, transition } from "@angular/animations";
import { debounce } from "../../core/utils";

@Component({
    selector: "app-news-carousel",
    templateUrl: "./news-carousel.component.html",
    styleUrls: ["./news-carousel.component.scss", "./news-carousel.component.responsivity.scss"],
    animations: [
        trigger("fadeInOut", [
            state("void", style({
                opacity: 0
            })),
            transition("void <=> *", animate(300)),
        ])
    ]
})

export class NewsCarouselComponent {

    public _news: INew[] = [];
    public _originalNews: INew[] = [];
    public _currentPage: number;

    @Output() resultsPerPageChanged = new EventEmitter<number>();

    resultsPerPage: number;
    elWidth: number;
    start: number;
    end: number;

    constructor(private elRef: ElementRef) { }

    @Input() get currentPage(): number {
        return this._currentPage;
    }

    set currentPage(value: number) {
        if(value) {
            this._currentPage = value;
            this.populateCarousel();
        }
    }

    @Input() get news(): INew[] {
        return this._news;
    }

    set news(value: INew[]) {
        if(value) {
            this._originalNews = value;
            this.onResizeElement();
        }
    }

    @HostListener("window:resize")
    @debounce(25)
    onResize() {
        this.onResizeElement();
    }

    private onResizeElement(): void {
        this.elWidth = this.elRef.nativeElement.clientWidth; 
        this.resultsPerPage = Math.min(Math.ceil(this.elWidth / 465), 3);

        this.populateCarousel();
    }

    private populateCarousel(): void {

        if(this._currentPage && this._news) {
            this.start =  (this._currentPage - 1) * this.resultsPerPage;
            this.end = this._currentPage * this.resultsPerPage;

            this._news = this._originalNews.slice(this.start, this.end);
            this._news.sort((a:any, b:any) => +new Date (b.date) - +new Date(a.date));

            this.resultsPerPageChanged.emit(this.resultsPerPage);
        }
    }
}
