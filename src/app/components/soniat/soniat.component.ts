import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import Message from '../message/message';
import { MessageComponent } from '../message/message.component';
import { uuid } from 'uuidv4';

@Component({
  selector: 'app-soniat',
  templateUrl: './soniat.component.html',
  styleUrls: [
    '../soniat/soniat.component.css'
  ]
})

export class SoniatComponent implements OnInit{
  
  @ViewChild('resetset',{static: false}) resetset: ElementRef;
  @ViewChildren (MessageComponent) childrenMessages: QueryList<MessageComponent>

  soniatForm: FormGroup;
  messages: Message[] = [];
  matchedMessages:string[] = [];
  mostrar: boolean = false;
  writes: string;
  filterSearch: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.soniatForm = this.formBuilder.group({
      message: ['', Validators.required]
    })
    this.saveMessage("Hola me llamo SONIAT y seré tu asesor tecnológico durante la consulta, por favor coméntame ¿De que país nos escribes?",false)
  }

  ngAfterViewInit(): void {
    this.childrenMessages.changes.subscribe((messages: QueryList<MessageComponent>)=>{
      this.scrollToMessage(messages.last.messageInput.id,'end')  
    })
  }

  // ngAfterViewChecked(): void {
  //   this.scrollToMessage(this.childrenMessages.last.messageInput.id,'end')  
  // }

  scrollToMessage(id:string, blockString: ScrollLogicalPosition) {
    const messageElem:HTMLElement = document.getElementById(`${id}`)
    if(messageElem) messageElem.scrollIntoView({behavior:'smooth',block:blockString})
  }

   reset() {
    this.resetset.nativeElement.value = '';
  }
  onSubmit() {
    const question = this.soniatForm.controls.message.value;
    if (question != null) {
      this.saveMessage(question, true);
      this.apiService.extractToken().subscribe((data: string) => {
        setTimeout( ()=>{
          this.mostrarEscribiendo();
          },1000);
           setTimeout( ()=>{
           this.borrarEscribiendo(false);       
         this.apiService.getAnswer(question, data).subscribe((response: string) => {
           this.saveMessage(response, false); 
         }, error => {
         })
      },3000);
      }, error =>{
      });
    }
  }
  saveMessage(question: string, userMessage: boolean): void {
    this.messages.push({
      userMessage: userMessage,
      value: question,
      id: uuid()
    })
  }
 
  filterChanged(input:string)
  {
    if(input.length<3) return
    this.matchedMessages = this.messages
      .filter(m => (m.value.toLowerCase().indexOf(input.toLowerCase()) > -1))
      .map(m => (m.id)).reverse()
    const lastElem:HTMLElement = document.getElementById(`${this.matchedMessages[0]}`)
    if(lastElem) lastElem.scrollIntoView({
      block:"center" 
    })
  }

  toggleBox() {
    this.mostrar = !this.mostrar;
  } 

  mostrarEscribiendo(){
    this.writes = 'escribiendo...';
  }
  borrarEscribiendo(mostrar: boolean){
    if(mostrar===false){
      delete this.writes;
    }
    return true;
  }
}


