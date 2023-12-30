import { AfterViewInit, Component, ElementRef, Inject, Input, LOCALE_ID, OnInit, Renderer2, ViewChild } from "@angular/core";
import { IconDefinition, faBars, faCloudDownloadAlt, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { NgNavigatorShareService } from "ng-navigator-share";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss", "./header.component.responsivity.scss"]
})

export class HeaderComponent implements OnInit, AfterViewInit {

  private _activeSection: any;
  private _pageXOffset: any;
  private ngNavigatorShareService: NgNavigatorShareService;
  private indexOfAdsense = 0
  private adsenses = ['Open for freelances', 'Open for CDIs', 'Open for collaboration', 'Open for Works :)']
  adsence = ""

  hasMenuToggled: boolean;
  faBars: IconDefinition;
  faShareAlt: IconDefinition;
  faCloudDownloadAlt: IconDefinition;

  @ViewChild("nav") nav: ElementRef;
  @ViewChild("shareBtn") shareBtn: ElementRef;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private renderer: Renderer2,
    ngNavigatorShareService: NgNavigatorShareService
  ) {
    this.ngNavigatorShareService = ngNavigatorShareService;
  }

  // use getter setter to define the properties
  get activeSection(): any {
    return this._activeSection;
  }

  get pageXOffset(): any {
    return this._pageXOffset;
  }

  @Input()
  set pageXOffset(value: any) {
    this._pageXOffset = value;
    this.onDetectScreenSize();
  }

  @Input()
  set activeSection(value: any) {
    this._activeSection = value;
    this.updateNavigation();
  }

  ngAfterViewInit() {
    // Share button available only for browsers that do support it.
    if (this.ngNavigatorShareService.canShare()) {
      this.shareBtn.nativeElement.style.display = "block";
    }
  }

  ngOnInit(): void {
    this.faBars = faBars;
    this.faShareAlt = faShareAlt;
    this.faCloudDownloadAlt = faCloudDownloadAlt;
    this.displayAdsenses(1, 0)
  }
  private displayAdsenses(speed, charIndex) { 
    
    this.adsence = "";
    const adsenseToDispaly = this.adsenses[this.indexOfAdsense]
    this.updateAdsence(adsenseToDispaly, 1, 0)
  }

  private updateAdsence(adsenseToDispaly, speed, charIndex) {  
    if (charIndex < adsenseToDispaly.length) { 
      setTimeout(() => {
        this.adsence = adsenseToDispaly.substring(0, charIndex);
      }, 100 * speed);
      charIndex++
      setTimeout(() => {
        this.updateAdsence(adsenseToDispaly, speed, charIndex)
      }, 100 * speed);
    }
    else { 
      if(this.indexOfAdsense === this.adsenses.length - 1){ 
        this.indexOfAdsense =  0
      }else{ 
        this.indexOfAdsense = this.indexOfAdsense + 1;
      } 
      
      setTimeout(() => {
        this.displayAdsenses(1, 0)
      }, 1000 * speed);
    }
  }

  private updateNavigation() {

    if (this._activeSection && this.renderer) {

      // Remove any selected anchor
      const activePreviousElem = this.nav.nativeElement.querySelector("a.active");

      if (activePreviousElem) {
        this.renderer.removeClass(activePreviousElem, "active");
      }

      const targetElem = this.nav.nativeElement.querySelector(`a[href^="#${this._activeSection}"]`);
      if (targetElem) {
        this.renderer.addClass(targetElem, "active");
      }
    }
  }

  /*
   * For media types such as tablets and mobile devices, the nav-bar navigation should be
   * collapsed by default.
  */
  private onDetectScreenSize() {
    this.hasMenuToggled = this.pageXOffset > 1024;
  }

  onToggleBar() {
    this.hasMenuToggled = !this.hasMenuToggled;
  }

  resetMenu() {
    this.hasMenuToggled = this.pageXOffset > 1024;
  }

  async share() {
    try {
      await this.ngNavigatorShareService.share({
        title: "Resume - Outhami Hassan",
        text: "Hello, I'm a Full-stack Java Web Developer with 1+ years of experience designing web and mobile projects. Find out more in my live-resume!",
        url: "https://guilhermeborgesbastos.com"
      });
    } catch (error) {
      console.log("You app is not shared, reason: ", error);
    }
  }
}