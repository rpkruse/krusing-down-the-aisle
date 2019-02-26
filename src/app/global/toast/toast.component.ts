import { Component, OnInit } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';

import { DataShareService } from '../../services/services';

import { IMessageType, IMessageOutput } from '../../interfaces/interfaces';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css', '../shared-styles.css'],
  animations: [
    trigger(
      'showState', [
        state('show', style({
          opacity: 1,
          visibility: 'visible'
        })),
        state('hide', style({
          opacity: 0,
          visibility: 'hidden'
        })),
        transition('hide <=> show', animate('300ms')),
      ],
    )
  ]
})

export class ToastComponent implements OnInit {
  IMessageType = IMessageType;

  messageOut: IMessageOutput;
  messageLevel: IMessageType;
  messageToDisplay: string;

  private s: Subscription;
  private maxTime: number = 100;

  timer: number = this.maxTime;

  private hovering: boolean = false;
  private maxChars = 20;

  private interval = interval(30);

  constructor(private _dataShareService: DataShareService) { }

  ngOnInit() {
    this._dataShareService.message.subscribe(res => this.onMessageChange(res));
  }

  private onMessageChange(message: IMessageOutput) {
    this.messageOut = message;

    if (this.messageOut) {
      this.timer = this.maxTime;

      const msg = this.messageOut.message;
      const action = this.messageOut.action;

      this.messageLevel = this.messageOut.mType;

      if (msg.length <= 0)
        this.messageToDisplay = action;
      else
        this.messageToDisplay = this.fixMessageString(msg) + action;

      this.startTimer();
    }
  }

  private startTimer() {
    this.s = this.interval.subscribe(() => {
      if (!this.hovering) this.timer--;

      if (this.timer <= 0) {
        this.timer = this.maxTime;
        this.messageOut = null;
        this.s.unsubscribe();
      }
    });
  }

  public fixMessageString(message: string): string {
    message = message.trim();
    let tmp: string = "";

    let split: string[] = message.split(" ");

    //If our message is already smaller than the max char value or when we remove spaces it is smaller, we just return it
    if (message.length <= this.maxChars || message.length - split.length <= this.maxChars) return message + " ";

    if (split.length === 1)
      return split[0].substring(0, this.maxChars) + " ";

    //Otherwise we must loop to a while word closest to our maxChar value
    let count: number = 0;
    let cutOff: number = 0;

    for (let i = 0; i < split.length; i++) {
      count += split[i].length;

      if (count > this.maxChars) {
        cutOff = i - 1;
        break;
      }

      cutOff++;
    }

    //Setup the message to return
    for (let i = 0; i < cutOff; i++) {
      if (i + 1 !== cutOff)
        tmp += split[i] + " ";
      else
        tmp += split[i] + "...";
    }

    return tmp;
  }

  public hoverToKeepMessage(keep: boolean) {
    this.hovering = keep;
  }
}