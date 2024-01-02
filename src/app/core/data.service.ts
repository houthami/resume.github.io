import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { IAdsenses, IExperience } from "../experience/experience-interfaces";
import { IAbout } from "../about/about-interfaces";
import { INew } from "../news/news-interfaces";

@Injectable()
export class DataService {

    baseUrl: string = "assets/data/";
    
    constructor(private http: HttpClient) { }

    getAdsenses() : Observable<IAdsenses> {
        return this.http.get<IAdsenses>(this.baseUrl + "adsense.json")
            .pipe(
                catchError(this.handleError)
            );
    }

    getExperiences() : Observable<IExperience[]> {
        return this.http.get<IExperience[]>(this.baseUrl + "experiences.json")
            .pipe(
                catchError(this.handleError)
            );
    }
    
    getAbout() : Observable<IAbout> {
      return this.http.get<IAbout>(this.baseUrl + "about.json")
          .pipe(
              catchError(this.handleError)
          );
    }

    getNews() : Observable<INew[]> {
        return this.http.get<INew[]>(this.baseUrl + "news.json")
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: any) {
      console.error("server error:", error);
      if (error.error instanceof Error) {
          const errMessage = error.error.message;
          return Observable.throw(errMessage);
          // Use the following instead if using lite-server
          // return Observable.throw(err.text() || "backend server error");
      }
      return Observable.throw(error || "Node.js server error");
    }
}