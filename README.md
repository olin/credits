# credits

Installation:

```
$ npm install
$ node .
```

Api: `credits.getCredits(username, password, callback)`

## Example:

```
SIS Username: tryan
SIS Password: 
Reading FA 2009
Reading SP 2010
Reading FA 2010
Reading SP 2011
Reading FA 2011
Reading SP 2012
Reading FA 2012
Reading SP 2013
[ { section: '01',
    name: 'Live to Write: Creative Wrt Wksh',
    credit: 4,
    grade: 'P',
    type: 'AHSE',
    number: '1199',
    id: 'AHSE1199' },
  { section: '01',
    name: 'Introduction Modeling & Control: Engineering Compartment Systems',
    credit: 3,
    grade: 'P',
    type: 'ENGR',
    number: '1110',
    id: 'ENGR1110' },

    ...

  { section: '02',
    name: 'Founders Journey with Zolot',
    credit: 4,
    grade: 'A',
    type: 'AHSE',
    number: '1599',
    id: 'AHSE1599' },
  { section: '02',
    name: 'Artificial Intelligence',
    credit: 4,
    grade: 'N/A until 05/25/2013',
    type: 'ENGR',
    number: '3599A',
    id: 'ENGR3599A' } ]

credits: { AHSE: 24, ENGR: 68, MTH: 12, SCI: 14, OIE: 1, CC: 0 }
```