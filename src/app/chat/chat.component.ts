import { AfterViewChecked, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  message: string = '';
  @ViewChild('msgerChat') private myScrollContainer!: ElementRef;
  ALIGNMENT = {
    LEFT: 'left',
    RIGHT: 'right',
  };

  USER_TYPE = {
    BOT: 'BOT',
    PERSON: 'PERSON'
  }

  BOT_MSGS = [
    "Hi, how are you?",
    "Ohh... I can't understand what you trying to say. Sorry!",
    "I like to play games... But I don't know how to play!",
    "Sorry if my answers are not relevant. :))",
    "I feel sleepy! :("
  ];

  // Icons made by Freepik from www.flaticon.com
  BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
  PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
  BOT_NAME = "BOT";
  PERSON_NAME = "Ramesh";

  messages: Message[] = [] ;

  constructor() { }

  ngOnInit() {
    this.initMessage();
  }

  initMessage() {
    this.messages.push(
    {
      userType:  this.USER_TYPE.BOT,
      message: 'Hi, welcome to SimpleChat! Go ahead and send me a message. 😄',
      date: new Date(),
      image: this.BOT_IMG,
      name: this.BOT_NAME,
      alignment: this.ALIGNMENT.LEFT
    });
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
  }

  sendMessage() {
    if (!this.message) return;

    this.messages.push(
    {
      userType:  this.USER_TYPE.PERSON,
      message: this.message,
      date: new Date(),
      image: this.PERSON_IMG,
      name: this.PERSON_NAME,
      alignment: this.ALIGNMENT.RIGHT
    });

    this.message = "";

    this.scrollToBottom();
  
    this.botResponse();
  }

  random(min: any, max: any) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  botResponse() {
    const r = this.random(0, this.BOT_MSGS.length - 1);
    const msgText = this.BOT_MSGS[r];
    const delay = msgText.split(" ").length * 100;
  
    setTimeout(() => {
      this.messages.push(
      {
        userType:  this.USER_TYPE.BOT,
        message: msgText,
        date: new Date(),
        image: this.BOT_IMG,
        name: this.BOT_NAME,
        alignment: this.ALIGNMENT.LEFT
      });
      this.scrollToBottom();
    }, delay);
  }

  get currentDate() {
    return new Date();
  }

}

export interface Message {
  userType: string;
  message: string;
  date: Date;
  image: string;
  name: string;
  alignment: string;
}
