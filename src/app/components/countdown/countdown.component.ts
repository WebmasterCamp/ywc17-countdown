import { SettingDialogComponent } from '../setting-dialog/setting-dialog.component';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, interval, Subscription } from 'rxjs';
import { map, switchMap, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CountdownConfig } from '../../type';

const fillZero = (input: number, n: number) =>
  (input / 10 ** n).toFixed(n).split('.')[1];

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
  countdownSubscription: Subscription;
  isEnd: boolean;
  text: string;
  showText: boolean;
  timeLetters: string[];
  constructor(private db: AngularFirestore, public dialog: MatDialog) {}

  ngOnInit() {
    this.countdownSubscription = this.db
      .doc<CountdownConfig>('config/countdown')
      .valueChanges()
      .pipe(
        map(config => {
          this.text = config.text;
          this.showText = config.showText;
          return config;
        }),
        map(config => config.until.toDate()),
        switchMap(date =>
          interval(91).pipe(
            map(() => this.getTimeDiff(date)),
            map(timeDiff => this.formatTime(timeDiff))
          )
        ),
        map(time => (this.isEnd ? 'หมดเวลา' : time)),
        startWith('LOADING...')
      )
      .subscribe(letters => {
        this.timeLetters = letters.split('');
      });
  }

  openSettingDialog() {
    this.dialog.open(SettingDialogComponent, {
      width: '400px'
    });
  }

  getTimeDiff(date: Date) {
    const timeDiff = date.getTime() - new Date().getTime();
    if (timeDiff > 0) {
      this.isEnd = false;
      return timeDiff;
    }
    this.isEnd = true;
    return 0;
  }

  formatTime(timeDiff: number) {
    const hour = Math.floor(timeDiff / (60 * 60 * 1000));
    const minute = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));
    const second = Math.floor((timeDiff % (60 * 1000)) / 1000);
    const millisecond = timeDiff % 1000;
    return `${fillZero(hour, 2)}:${fillZero(minute, 2)}:${fillZero(
      second,
      2
    )}.${fillZero(millisecond, 3)}`;
  }
}
