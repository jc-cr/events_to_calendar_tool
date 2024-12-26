# events_to_calendar_tool

Web tool for inputting events and outputting a CSV you can use in a calendar app. All processing done client side.

## Import to Google Calendar

[Source](https://support.google.com/calendar/answer/37118?hl=en&co=GENIE.Platform%3DDesktop#zippy=%2Ccreate-or-edit-a-csv-file)

​After you export your events, you can import them into Google Calendar. You can import with ICS and CSV files on a computer. 

1. Open Google Calendar.
2. In the top right, click Settings  and then Settings.
3. In the menu on the left, click Import & Export.
4. Click Select file from your computer and select the file you exported. The file should end in ".ics" or ".csv."
5. Choose which calendar to add the imported events to.
    By default, events are imported into your primary calendar.
6. Click Import.

If you import repeat events from a .csv file, they might not show up that way. They'll be on your calendar as a series of one-time events.


## Test Locally

`python3 -m http.server 8000`
