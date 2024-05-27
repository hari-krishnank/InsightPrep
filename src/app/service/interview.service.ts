import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../model/language.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  apiEndPoint: string = "https://freeapi.gerasim.in/api/Interview/"

  constructor(private http: HttpClient) { }


  getAllLanguage():Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(this.apiEndPoint+"GetAllLanguage")
  }


  getTopicsByLanguageId(langId: number):Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(this.apiEndPoint+"GetLanguageTopicById?id=" +langId)
  }
  
  
  getQuestionsByTopicId(topicId: number):Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(this.apiEndPoint+"GetQuestionByTopicId?id=" +topicId)
  }
 
 
  getQuestionsByLanguageId(langId: number):Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(this.apiEndPoint+"GetAllQuestionsByLanguageId?id=" +langId)
  }

  getQuestionCountByLanguage(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(this.apiEndPoint+"GetQuestionCountByLanguage");
  }
}
