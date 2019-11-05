import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-setting-dialog',
  templateUrl: './setting-dialog.component.html',
  styleUrls: ['./setting-dialog.component.scss']
})
export class SettingDialogComponent implements OnInit {
  timeControl = new FormControl('10:00');
  password = '';
  constructor(
    public dialogRef: MatDialogRef<SettingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private db: AngularFirestore
  ) {}

  ngOnInit() {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  async onOk(event: any) {
    event.preventDefault();
    try {
      if (this.password === 'iamyourfather') {
        const [hour, minute] = this.timeControl.value.split(':');
        const until = new Date();
        until.setHours(until.getHours() + Number(hour));
        until.setMinutes(until.getMinutes() + Number(minute));
        await this.db.doc('config/countdown').set({ until });
        this.onNoClick();
      } else {
        alert('Invalid password');
        this.password = '';
      }
    } catch (error) {
      console.error(error);
      this.onNoClick();
    }
  }
}
