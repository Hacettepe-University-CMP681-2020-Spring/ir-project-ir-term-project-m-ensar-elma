import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-search-pg',
  templateUrl: './search-pg.component.html',
  styleUrls: ['./search-pg.component.css']
})
export class SearchPGComponent implements OnInit {
  private REST_API_SERVER = "http://localhost:8000/";

  constructor(private http: HttpClient) { }
  recommend=[];
  CategoryList=[];
  SelectedCategoryList=[];
  QAList=[];
  QAListAnswer=[];
  CommentList=["Muhammed Ensar ELMA","Mustafa Şentürk","Muhammed Ensar ELMA","Muhammed Ensar ELMA"];
  recommend_filter=this.recommend;
  index_filter=0;
  searchtext="";
  titleInDetail="";
  contextInDetail="";
  quickAnswer="";
  // page manage
  whoIam="Muhammed Ensar ELMA";
  commenttest="Lorem ipsum dolor sit amet, consectetur adipiscing elittetur adipiscing elittetur adipiscing elit. Fusce a volutpat mauris, at molestie lacus. Nam vestibulum sodales odio ut pulvinar.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a volutpat mauris, at molestie lacus. Nam vestibulum sodales odio ut pulvinar.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a volutpat mauris, at molestie lacus. Nam vestibulum sodales odio ut pulvinar";
  simpleSearchPG:boolean=true;
  contextPG:boolean=false;
  searchresultPG:boolean=false;
  untilItype:boolean=false;
  ngOnInit(): void {
    debugger;
    this.http.get(this.REST_API_SERVER+"post/getall").subscribe((data: any[])=>{
      var test=data[0].fields;
      
      for (let index = 0; index < data.length; index++) {
        const element = data[index].fields.title;
        const answer = data[index].fields.content;
        const bertanswer = data[index].fields.bertanswer;
        const bertconf = data[index].fields.bertconf;
        const category = data[index].fields.category;
        if (!this.CategoryList.includes(category)) {
          this.CategoryList.push(category)
        }
        this.recommend[index]=element;
        this.QAList[index]={title:element,answer:answer,bertanswer:bertanswer,conf:bertconf}
      
      }
     
     
    })  ;
  }
  filter_recommend(value): void {
    debugger;
    this.recommend_filter=[];this.index_filter=0;
    if(this.searchtext==""){this.recommend_filter=this.recommend;if(value=='second'){
      if(this.untilItype){this.untilItype=false;}else{this.untilItype=true;}

    }
    
    
    return;}
    for (let index = 0; index < this.recommend.length; index++) {
    
      if(this.recommend[index].toLowerCase().includes(this.searchtext.toLowerCase())){
        debugger;
        this.recommend_filter[this.index_filter]=this.recommend[index];this.index_filter+=1;}
      
    }
    if(value=='second'){if(this.untilItype){this.untilItype=false;}else{this.untilItype=true;}}
  }
  setComplete(value1): void {
    debugger;
    this.searchtext=value1;
    this.searchit();
  }
  goHome(): void {
    this.searchresultPG=false;
    this.contextPG=false;
    this.simpleSearchPG=true;
  }
  goDetails(title): void {
    debugger;
    this.searchresultPG=false;
    this.contextPG=true;
    this.titleInDetail=title.title;
    this.contextInDetail=title.answer;
  }




  QuickAnswer(qa): void {
    var displaylength=250;
    debugger;
    this.searchresultPG=false;
    this.contextPG=true;
    this.titleInDetail=qa.title;
    this.contextInDetail=qa.answer;
    this.quickAnswer="";
    this.http.get(this.REST_API_SERVER+"bert/?passage="+qa.answer +"&"+"question="+qa.title).subscribe((data: any[])=>{
      debugger;
      console.log(data);
     this.quickAnswer=qa.answer;
     var key=data["result"];
     this.quickAnswer=this.quickAnswer.replace(key.answer,"<b style=\"font-size:30px\">"+key.answer+"</b>");
     var indexkey=this.quickAnswer.indexOf(key.answer);

     if (indexkey<=displaylength) {
       this.quickAnswer=this.quickAnswer.substring(0,indexkey+key.answer.length+displaylength);
     }
     else if(indexkey >displaylength){
      this.quickAnswer=this.quickAnswer.substring(indexkey-displaylength,indexkey+key.answer.length+displaylength);
     }
     this.quickAnswer=this.quickAnswer+"..."+key.confidence; 
    })  ;


  }

  test(): void {
    debugger;

    
  }
  goBackResult(): void {
    debugger;
    this.searchresultPG=true;
    this.contextPG=false;
    this.simpleSearchPG=false;
    
  }
  selectCategory(category): void {
    debugger;
   this.CategoryList.splice(this.CategoryList.indexOf(category),1);
   this.SelectedCategoryList.push(category);
  }
  removeSelectedCategory(category): void {
    debugger;
   this.SelectedCategoryList.splice(this.SelectedCategoryList.indexOf(category),1);
   this.CategoryList.push(category);
  }
  searchit(): void {
	 this.Retriever();
    debugger;
    this.simpleSearchPG=false;
    this.searchresultPG=true;
    this.contextPG=false;
    this.untilItype=false;

    this.http.get(this.REST_API_SERVER+"post/?query="+this.searchtext).subscribe((data: any[])=>{
      debugger;
      console.log(data);



      this.CategoryList=[];
      this.QAListAnswer=[];
      this.QAList=[];
      for (let index = 0; index < data.length; index++) {
        const element = data[index].fields.title;
        const answer = data[index].fields.content;
        const category = data[index].fields.category;
        const bertanswer = data[index].fields.bertanswer;
        const bertconf = data[index].fields.bertconf;
        var skor=0;
        var searcharray=this.searchtext.replace("?"," ").replace("*"," ").split(" ");
        for(let indox=0;indox<searcharray.length; indox++){if(element.includes(searcharray[indox])){skor+=1;}}
        
        if (!this.CategoryList.includes(category)) {
          this.CategoryList.push(category)
        }
        this.QAList[index]={title:element,answer:answer,bertanswer:bertanswer,conf:bertconf,skor:skor}
      }
      this.QAList.sort(function(a,b){return b.skor-a.skor});
     
    })  ;




  }

  Retriever(): void {
    debugger;
    this.simpleSearchPG=false;
    this.searchresultPG=true;
    this.contextPG=false;
    this.untilItype=false;

    this.http.get(this.REST_API_SERVER+"retriever/?query="+this.searchtext).subscribe((data: any[])=>{
      debugger;
      console.log(data);
 
     
    })  ;




  }
}
