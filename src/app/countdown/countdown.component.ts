import { SettingDialogComponent } from './../setting-dialog/setting-dialog.component';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, interval } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

interface CountdownConfig {
  until: firebase.firestore.Timestamp;
}

const fillZero = (input: number, n: number) =>
  (input / 10 ** n).toFixed(n).split('.')[1];

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
  countdown: Observable<string>;
  isEnd: boolean;
  constructor(private db: AngularFirestore, public dialog: MatDialog) {}

  ngOnInit() {
    this.countdown = this.db
      .doc<CountdownConfig>('config/countdown')
      .valueChanges()
      .pipe(
        map(config => config.until.toDate()),
        switchMap(date =>
          interval(60).pipe(
            map(() => {
              const timeDiff = date.getTime() - new Date().getTime();
              if (timeDiff > 0) {
                this.isEnd = false;
                return timeDiff;
              }
              this.isEnd = true;
              return 0;
            }),
            map(timeDiff => {
              const hour = Math.floor(timeDiff / (60 * 60 * 1000));
              const minute = Math.floor(
                (timeDiff % (60 * 60 * 1000)) / (60 * 1000)
              );
              const second = Math.floor((timeDiff % (60 * 1000)) / 1000);
              const millisecond = timeDiff % 1000;
              return `${fillZero(hour, 2)}:${fillZero(minute, 2)}:${fillZero(
                second,
                2
              )}.${fillZero(millisecond, 3)}`;
            })
          )
        )
      );
  }

  openSettingDialog() {
    const dialogRef = this.dialog.open(SettingDialogComponent, {
      width: '400px'
    });
  }
}
