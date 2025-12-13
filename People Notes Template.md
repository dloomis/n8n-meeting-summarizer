---
company: 
location: 
title: 
email: 
website: 
aliases: 
---
#people

## Notes
-

## Hot Takes
```dataview 
TABLE WITHOUT ID q as "Hot Take", file.link as "Meeting"
FROM "03 Meeting Summaries"
FLATTEN quote as q
WHERE contains(q, this.file.name)
```

## Meetings
```dataview
TABLE file.cday as Created, summary AS "Summary"
FROM "03 Meeting Summaries" where contains(file.outlinks, [[]])
SORT file.cday DESC
```