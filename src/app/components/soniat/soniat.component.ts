import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import Message from '../message/message';
import { AfterViewInit, AfterViewChecked, ElementRef } from '@angular/core';

@Component({
  selector: 'app-soniat',
  templateUrl: './soniat.component.html',
  styleUrls: [
    '../soniat/soniat.component.css'
  ]
})

export class SoniatComponent implements OnInit, AfterViewInit, AfterViewChecked {
  
  @ViewChild('chat', {static: false}) chatElement: ElementRef;
  @ViewChild('box', {static: false}) box: ElementRef;
  @ViewChild('input',{static: false}) input: ElementRef;

  soniatForm: FormGroup;
  messages: Message[] = [];
  mostrar: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { };

  ngOnInit() {
    this.soniatForm = this.formBuilder.group({
      message: ['', Validators.required]
    })
    this.saveMessage("Hola me llamo SONIAT y seré tu asesor tecnológico durante la consulta, por favor coméntame ¿De que país nos escribes?",false)




  }
  ngAfterViewInit(){
    this.scrollToBottom();
    this.chatElement.nativeElement.focus();
  }
  ngAfterViewChecked(){
    this.scrollToBottom();
    this.chatElement.nativeElement.focus();
  }
  scrollToBottom(): void{
    try{
      this.box.nativeElement.scrollTop = this.box.nativeElement.scrollHeight;
    }catch(err){
      console.log(err)
    }
  }
  reset() {
    this.input.nativeElement.value = '';
  }
  onSubmit() {
    const question = this.soniatForm.controls.message.value;
    if (question != null) {
      this.saveMessage(question, true);
      this.apiService.extractToken().subscribe((data: String) => {
        //el subscribe tiene varias funciones (success, error)
        this.apiService.getAnswer(question, data).subscribe((response: String) => {
          this.saveMessage(response, false); 
        }, error => {
          console.log(error);
        })
      }, error => {
        console.log(error);
      });
    }
  }
  saveMessage(question: String, userMessage: boolean): void {
    this.messages.push({
      userMessage: userMessage,
      value: question
    })
  }
  toggleBox() {
    this.mostrar = !this.mostrar;
  } 
}
