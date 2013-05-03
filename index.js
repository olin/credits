var scrapi = require('scrapi');
var async = require('async');
var read = require('read');


var api = scrapi({
  "base": "https://my.olin.edu/",
  "spec": {
    "/ICS/": {
      "loginform": {
        "__VIEWSTATE": {
          $query: "#__VIEWSTATE",
          $value: "(attr value)"
        },
        "___BrowserRefresh": {
          $query: "#___BrowserRefresh",
          $value: "(attr value)"
        }
      }
    },
    "/ICS/My_StAR/My_Grades_and_Transcript.jnz": {
      classes: {
        $query: "#pg0_V_tblTermData tr",
        $each: {
          $query: "td",
          $each: "(text)"
        }
      },
      summary: {
        $query: "#pg0_V_tblDivisonData tr",
        $each: {
          $query: "td",
          $each: "(text)"
        }
      }
    }
  }
});

function getCredits (username, password, next) {
  api('/ICS/').get(function (err, json) {
    api('/ICS/').post({
      "__VIEWSTATE": json.loginform.__VIEWSTATE,
      "___BrowserRefresh": json.loginform.___BrowserRefresh,
      "userName": username,
      "password": password,
      "btnLogin": "Login"
    }, function (err, html, res) {
      if (res.statusCode != 302) {
        throw new Error('Invalid login.');
      }

      api('/ICS/My_StAR/My_Grades_and_Transcript.jnz').get({
        portlet: "Unofficial_Transcript_OLIN"
      }, function (err, json) {
        if (err) {
          return next(err);
        }

        var years = {}, cur = [];
        json.classes.forEach(function (m) {
          if (m[0].match(/^\d+/)) {
            // 2009, 2010...
            cur = years[m[0]] = [];
          } else {
            m = m.map(function (n) {
              return (n.match(/<\/?td>/) ? '' : n).replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
            })
            if (m.length > 1 && m[1].match(/\-/)) {
              // Class name
              cur.push({
                course: m[1],
                title: m[2],
                grade: m[3],
                repeat: m[4],
                attemptedcredits: m[5],
                earnedcredits: m[6],
                passcredits: m[7],
                gpacredits: m[8],
                qualitypoints: m[9],
                nondegreecredits: m[10],
                gpa: m[11] || '',
                notes: m[12] || ''
              });
            } else {
              // Totals
            }
          }
        });
        next(err, years);
      })
    });
  });
}

if (!module.parent) {
  read({prompt: 'my.olin.edu Username:'}, function (err, username) {
    read({prompt: 'my.olin.edu Password:', silent: true}, function (err, password) {
      getCredits(username, password, console.log);
    })
  })
}