# tg_devAka_m9_bitcoinPriceDevelopment

Workaround wenn der **free-API-Key** von Alpha-Vantage keine weiteren Anfragen mehr zulässt.
## Limit erreicht ##
In diesem Fall werden **globale Konstanten** an die ..Backup-Funktionen übergeben:
  > getCurrentBtcCourseBackup(**jsonBtcCourseBackup**);  
  > getMonthlyBtcCourseBackup(**jsonMonthlyCourseBackup**);
Die Konstanten sind in **backupData.js** gespeichert.

## API - Zugriff möglich ##
Sind noch Zugriffe möglich werden die empfangenen Werte an die weiterverarbeitenden Funktionen übergeben:
   > getCurrentBtcCourse(**jsonBtcCourse**);  
   > getMonthlyBtcCourse(**jsonMonthlyBtcCourse**);
