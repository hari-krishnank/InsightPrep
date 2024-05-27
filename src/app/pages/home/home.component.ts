import { Component, OnInit, inject } from '@angular/core';
import { InterviewService } from '../../service/interview.service';
import { APIResponseModel, ILanguage, LanguageTopic, Question } from '../../model/language.model';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { QuestionCountComponent } from '../question-count/question-count.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, QuestionCardComponent, QuestionCountComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  languageList: ILanguage[] = [];
  service = inject(InterviewService);
  topicList$: Observable<LanguageTopic[]> | undefined;
  selectedLanguage: number = 0;
  selectedTopic: number = 0;
  questionList: Question[] = []
  questionCountList: Question[] = [];

  constructor(private interviewSrv: InterviewService) { }

  ngOnInit(): void {
    this.loadLanguages();
    this.getCount();
  }


  loadLanguages() {
    this.service.getAllLanguage().subscribe((res: APIResponseModel) => {
      this.languageList = res.data;
    })
  }


  onLanguageChange(event: any) {
    this.questionList = []
    this.getQuestionByLanguage(event)
    this.topicList$ = this.service.getTopicsByLanguageId(event).pipe(
      map((item: APIResponseModel) => {
        return item.data
      })
    )
  }

  onTopicChange() {
    this.service.getQuestionsByTopicId(this.selectedTopic).subscribe((res: APIResponseModel) => {
      this.questionList = res.data
    })
  }


  getQuestionByLanguage(id: number) {
    this.service.getQuestionsByLanguageId(id).subscribe((res: APIResponseModel) => {
      this.questionList = res.data
    })
  }

  getCount() {
    this.service.getQuestionCountByLanguage().subscribe((res: APIResponseModel) => {
      this.questionCountList = res.data.filter((item: any) => {
        console.log(item.language);
        
        if (item.language != null) {
          console.log('count',item);
          return item
        }
      })

    })
  }
}
