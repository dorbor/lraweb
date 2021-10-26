/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
// jshint esversion:7
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// const flash = require('connect-flash');
const {
  userAuthenticated
} = require('./helper/auth')
// const {isEmpty} = require('./helper/uploadHelper');
const mongoose = require('mongoose')
const upload = require('express-fileupload')
const dateFormat = require('dateformat')
const now = new Date()

// eslint-disable-next-line func-style
const isEmpty = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

// model includes
const Comment = require('./models/Comment')
const User = require('./models/User')
const Officer = require('./models/Officer')
const Category = require('./models/Category')
const Division = require('./models/Division')
const Position = require('./models/Position')

mongoose.Promise = global.Promise
const bcrypt = require('bcrypt')
const saltRounds = 10

const app = express()

app.set('view engine', 'ejs')
app.use(upload())

app.use(bodyParser.urlencoded({
  extended: true
}))
// app.use(expressValidator());
app.use(express.static((__dirname, 'public')))
app.use('/admin', express.static((__dirname, 'public')))
app.use('/', express.static((__dirname, 'public')))
app.use('/admin/editOfficer', express.static((__dirname, 'public')))
app.use('/admin/editPosition', express.static((__dirname, 'public')))
app.use('/admin/editDivision', express.static((__dirname, 'public')))
app.use('/admin/editCategory', express.static((__dirname, 'public')))
app.use('/admin/editUser', express.static((__dirname, 'public')))
app.use('/admin/map', express.static((__dirname, 'public')))
app.use('/admin/details', express.static((__dirname, 'public')))
app.use('/officerDetails', express.static((__dirname, 'public')))
app.use('/complain', express.static((__dirname, 'public')))
app.use('/applaud', express.static((__dirname, 'public')))
app.use('/static', express.static((__dirname, 'public/images/officers')))


// routes LRAt
const audit = require('./routes/admin/audit')
const front = require('./routes/home/index')

app.use(
  session({
    secret: 'max',
    saveUninitialized: false,
    resave: false
  })
)

app.use(passport.initialize())
app.use(passport.session())
mongoose.connect(
  'mongodb+srv://dorbor:Dorbor123@cluster0-8idgt.mongodb.net/findofficer',
  {
    useNewUrlParser: true
  }
)


app.use((req, res, next) => {
  res.locals.user = req.user || null
  // req.locals.success_message = req.flash('success_message');
  // req.locals.error_message = req.flash('error_message');
  // req.locals.form_errors = req.flash('form_errors');
  next()
})


// extended routes
app.use('/admin/audit', audit)
app.use('/', front)


app.get('/adminlogin', (req, res) => {
  res.render('login')
})

app.get('/admin', userAuthenticated, (req, res) => {
  Officer.find({
    agency: 'LRA'
  }).then((off) => {
    Comment.find({
      agency: 'LRA'
    }).then((comments) => {
      const complains = []
      const applauds = []
      // officers by counties counties
      const montserrado = []
      const bong = []
      const nimba = []
      const bomi = []
      const lofa = []
      const margibi = []
      const capemount = []
      const gbarpolu = []
      const grandBassa = []
      const rivergee = []
      const rivercess = []
      const grandkru = []
      const grandgedeh = []
      const maryland = []
      // comments by officers
      const comMontserrado = []
      const comBong = []
      const comNimba = []
      const comBomi = []
      const comLofa = []
      const comMargibi = []
      const comCapemount = []
      const comGbarpolu = []
      const comGrandBassa = []
      const comRivergee = []
      const comRivercess = []
      const comGrandkru = []
      const comGrandgedeh = []
      const comMaryland = []
      // Applauds by officers
      const appMontserrado = []
      const appBong = []
      const appNimba = []
      const appBomi = []
      const appLofa = []
      const appMargibi = []
      const appCapemount = []
      const appGbarpolu = []
      const appGrandBassa = []
      const appRivergee = []
      const appRivercess = []
      const appGrandkru = []
      const appGrandgedeh = []
      const appMaryland = []

      comments.forEach((com) => {
        if (com.type == 'Complain') {
          complains.push(com)
          if (com.county == 'Montserrado') {
            comMontserrado.push(com)
          }
          if (com.county == 'Bong') {
            comBong.push(com)
          }
          if (com.county == 'Bomi') {
            comBomi.push(com)
          }
          if (com.county == 'Nimba') {
            comNimba.push(com)
          }
          if (com.county == 'lofa') {
            comLofa.push(com)
          }
          if (com.county == 'Margibi') {
            comMargibi.push(com)
          }
          if (com.county == 'Grand Cape Mount') {
            comCapemount.push(com)
          }
          if (com.county == 'Gbarpolu') {
            comGbarpolu.push(com)
          }
          if (com.county == 'Grand Bassa') {
            comGrandBassa.push(com)
          }
          if (com.county == 'River Gee') {
            comRivergee.push(com)
          }
          if (com.county == 'Rivercess') {
            comRivercess.push(com)
          }
          if (com.county == 'Grand Kru') {
            comGrandkru.push(com)
          }
          if (com.county == 'Grand Gedeh') {
            comGrandgedeh.push(com)
          }
          if (com.county == 'Maryland') {
            comMaryland.push(com)
          }
        }
      })

      comments.forEach((com) => {
        if (com.type == 'Applaud') {
          applauds.push(com)
          if (com.county == 'Montserrado') {
            appMontserrado.push(com)
          }
          if (com.county == 'Bong') {
            appBong.push(com)
          }
          if (com.county == 'Bomi') {
            appBomi.push(com)
          }
          if (com.county == 'Nimba') {
            appNimba.push(com)
          }
          if (com.county == 'lofa') {
            appLofa.push(com)
          }
          if (com.county == 'Margibi') {
            appMargibi.push(com)
          }
          if (com.county == 'Grand Cape Mount') {
            appCapemount.push(com)
          }
          if (com.county == 'Gbarpolu') {
            appGbarpolu.push(com)
          }
          if (com.county == 'Grand Bassa') {
            appGrandBassa.push(com)
          }
          if (com.county == 'River Gee') {
            appRivergee.push(com)
          }
          if (com.county == 'Rivercess') {
            appRivercess.push(com)
          }
          if (com.county == 'Grand Kru') {
            appGrandkru.push(com)
          }
          if (com.county == 'Grand Gedeh') {
            appGrandgedeh.push(com)
          }
          if (com.county == 'Maryland') {
            appMaryland.push(com)
          }
        }
      })

      // officers by counties
      off.forEach((offco) => {
        if (offco.assignment == 'Montserrado') {
          montserrado.push(offco)
        }
        if (offco.assignment == 'Bong') {
          bong.push(offco)
        }
        if (offco.assignment == 'Bomi') {
          bomi.push(offco)
        }
        if (offco.assignment == 'Nimba') {
          nimba.push(offco)
        }
        if (offco.assignment == 'Lofa') {
          lofa.push(offco)
        }
        if (offco.assignment == 'Margibi') {
          margibi.push(offco)
        }
        if (offco.assignment == 'Grand Cape Mount') {
          capemount.push(offco)
        }
        if (offco.assignment == 'Gbarpolu') {
          gbarpolu.push(offco)
        }
        if (offco.assignment == 'Grand Bassa') {
          grandBassa.push(offco)
        }
        if (offco.assignment == 'River Gee') {
          rivergee.push(offco)
        }
        if (offco.assignment == 'Rivercess') {
          rivercess.push(offco)
        }
        if (offco.assignment == 'Grand Kru') {
          grandkru.push(offco)
        }
        if (offco.assignment == 'Grand Gedeh') {
          grandgedeh.push(offco)
        }
        if (offco.assignment == 'Maryland') {
          maryland.push(offco)
        }
      })

      res.render('admin/index', {
        officers: off,
        comments,
        complains,
        applauds,
        // officers counties chart
        montserrado,
        bomi,
        nimba,
        lofa,
        margibi,
        capemount,
        gbarpolu,
        grandBassa,
        rivergee,
        rivercess,
        grandkru,
        grandgedeh,
        maryland,
        // comments by counties
        comMontserrado,
        comBong,
        comNimba,
        comBomi,
        comLofa,
        comMargibi,
        comCapemount,
        comGbarpolu,
        comGrandBassa,
        comRivergee,
        comRivercess,
        comGrandkru,
        comGrandgedeh,
        comMaryland,
        // Applauds by counties
        appMontserrado,
        appBong,
        appNimba,
        appBomi,
        appLofa,
        appMargibi,
        appCapemount,
        appGbarpolu,
        appGrandBassa,
        appRivergee,
        appRivercess,
        appGrandkru,
        appGrandgedeh,
        appMaryland
      })
    })
  })
})

// Categories section
app.get('/admin/addCategory', userAuthenticated, (req, res) => {
  Comment.find({
    agency: 'LRA'
  }).then((comments) => {
    const complains = []
    const applauds = []
    comments.forEach((com) => {
      if (com.type == 'Complain') {
        complains.push(com)
      }
    })
    comments.forEach((com) => {
      if (com.type == 'Applaud') {
        applauds.push(com)
      }
    })

    res.render('admin/addCategory', {
      comments,
      complains,
      applauds
    })
  })
})

app.post('/admin/addCategory', userAuthenticated, (req, res) => {
  const setCategory = new Category({
    agency: 'LRA',
    title: req.body.title,
    desc: req.body.desc,
    createdAt: dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT')
  })

  setCategory.save((err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Category save')
    }
  })
  res.redirect('/admin/allCategories')
})

app.get('/admin/allCategories', userAuthenticated, (req, res) => {
  Category.find({
    agency: 'LRA'
  }).then((cat) => {
    Comment.find({
      agency: 'LRA'
    }).then((comments) => {
      const complains = []
      const applauds = []
      comments.forEach((com) => {
        if (com.type == 'Complain') {
          complains.push(com)
        }
      })
      comments.forEach((com) => {
        if (com.type == 'Applaud') {
          applauds.push(com)
        }
      })

      res.render('admin/allCategories', {
        comments,
        complains,
        applauds,
        categories: cat
      })
    })
  })
})

app.get('/admin/editCategory/:id', userAuthenticated, (req, res) => {
  const id = req.params.id
  Comment.find({
    agency: 'LRA'
  }).then((comments) => {
    Category.findOne({
      agency: 'LRA',
      _id: id
    }).then((cat) => {
      const complains = []
      const applauds = []
      comments.forEach((com) => {
        if (com.type == 'Complain') {
          complains.push(com)
        }
      })
      comments.forEach((com) => {
        if (com.type == 'Applaud') {
          applauds.push(com)
        }
      })

      res.render('admin/editCategory', {
        comments,
        complains,
        applauds,
        category: cat
      })
    })
  })
})

app.post('/admin/editCategory/:id', userAuthenticated, (req, res) => {
  const id = req.params.id
  Category.findOne({
    agency: 'LRA',
    _id: id
  }).then((cat) => {
    cat.agency = 'LRA'
    cat.title = req.body.title
    cat.desc = req.body.desc
    cat.createdAt = dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT')

    cat.save((err) => {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/admin/allCategories')
      }
    })
  })
})

// /Category ends

// Division section
app.get('/admin/addDivision', userAuthenticated, (req, res) => {
  Comment.find({
    agency: 'LRA'
  }).then((comments) => {
    const complains = []
    const applauds = []
    comments.forEach((com) => {
      if (com.type == 'Complain') {
        complains.push(com)
      }
    })
    comments.forEach((com) => {
      if (com.type == 'Applaud') {
        applauds.push(com)
      }
    })
    res.render('admin/addDivision', {
      comments,
      complains,
      applauds
    })
  })
})

app.post('/admin/addDivision', userAuthenticated, (req, res) => {
  const setDivision = new Division({
    agency: 'LRA',
    title: req.body.title,
    desc: req.body.desc,
    createdAt: dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT')
  })

  setDivision.save((err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Division save')
    }
  })
  res.redirect('/admin/allDivisions')
})

app.get('/admin/allDivisions', userAuthenticated, (req, res) => {
  Division.find({
    agency: 'LRA'
  }).then((div) => {
    Comment.find({
      agency: 'LRA'
    }).then((comments) => {
      const complains = []
      const applauds = []
      comments.forEach((com) => {
        if (com.type == 'Complain') {
          complains.push(com)
        }
      })
      comments.forEach((com) => {
        if (com.type == 'Applaud') {
          applauds.push(com)
        }
      })

      res.render('admin/allDivisions', {
        comments,
        complains,
        applauds,
        divisions: div
      })
    })
  })
})

app.get('/admin/editDivision/:id', userAuthenticated, (req, res) => {
  const id = req.params.id
  Comment.find({
    agency: 'LRA'
  }).then((comments) => {
    Division.findOne({
      agency: 'LRA',
      _id: id
    }).then((div) => {
      const complains = []
      const applauds = []
      comments.forEach((com) => {
        if (com.type == 'Complain') {
          complains.push(com)
        }
      })
      comments.forEach((com) => {
        if (com.type == 'Applaud') {
          applauds.push(com)
        }
      })

      res.render('admin/editDivision', {
        comments,
        complains,
        applauds,
        division: div
      })
    })
  })
})

app.post('/admin/editDivision/:id', userAuthenticated, (req, res) => {
  const id = req.params.id
  Division.findOne({
    agency: 'LRA',
    _id: id
  }).then((div) => {
    div.agency = 'LRA'
    div.title = req.body.title
    div.desc = req.body.desc
    div.createdAt = dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT')

    div.save((err) => {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/admin/allDivisions')
      }
    })
  })
})
// /Division ends

// Position section
app.get('/admin/addPosition', userAuthenticated, (req, res) => {
  Comment.find({
    agency: 'LRA'
  }).then((comments) => {
    const complains = []
    const applauds = []
    comments.forEach((com) => {
      if (com.type == 'Complain') {
        complains.push(com)
      }
    })
    comments.forEach((com) => {
      if (com.type == 'Applaud') {
        applauds.push(com)
      }
    })

    res.render('admin/addPosition', {
      comments,
      complains,
      applauds
    })
  })
})

app.post('/admin/addPosition', userAuthenticated, (req, res) => {
  const setPosition = new Position({
    agency: 'LRA',
    title: req.body.title,
    date: dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT')
  })

  setPosition.save((err) => {
    if (err) {
      console.log(`Position save error${err}`)
    }
  })
  res.redirect('/admin/allPositions')
})

app.get('/admin/editPosition/:id', userAuthenticated, (req, res) => {
  const id = req.params.id
  Comment.find({
    agency: 'LRA'
  }).then((comments) => {
    Position.findOne({
      agency: 'LRA',
      _id: id
    }).then((pos) => {
      const complains = []
      const applauds = []
      comments.forEach((com) => {
        if (com.type == 'Complain') {
          complains.push(com)
        }
      })
      comments.forEach((com) => {
        if (com.type == 'Applaud') {
          applauds.push(com)
        }
      })

      res.render('admin/editPosition', {
        comments,
        complains,
        applauds,
        position: pos
      })
    })
  })
})

app.post('/admin/editPosition/:id', userAuthenticated, (req, res) => {
  const id = req.params.id
  Position.findOne({
    agency: 'LRA',
    _id: id
  }).then((pos) => {
    pos.agency = 'LRA'
    pos.title = req.body.title
    pos.date = dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT')

    pos.save((err) => {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/admin/allPositions')
      }
    })
  })
})

app.get('/admin/allPositions', userAuthenticated, (req, res) => {
  Position.find({
    agency: 'LRA'
  }).then((pos) => {
    Comment.find({
      agency: 'LRA'
    }).then((comments) => {
      const complains = []
      const applauds = []
      comments.forEach((com) => {
        if (com.type == 'Complain') {
          complains.push(com)
        }
      })
      comments.forEach((com) => {
        if (com.type == 'Applaud') {
          applauds.push(com)
        }
      })

      res.render('admin/allPositions', {
        comments,
        complains,
        applauds,
        positions: pos
      })
    })
  })
})
// /Position ends

app.get('/admin/addOfficer', userAuthenticated, (req, res) => {
  Comment.find({
    agency: 'LRA'
  }).then((comments) => {
    Position.find({
      agency: 'LRA'
    }).then((pos) => {
      Division.find({
        agency: 'LRA'
      }).then((div) => {
        const complains = []
        const applauds = []
        comments.forEach((com) => {
          if (com.type == 'Complain') {
            complains.push(com)
          }
        })
        comments.forEach((com) => {
          if (com.type == 'Applaud') {
            applauds.push(com)
          }
        })

        res.render('admin/addOfficer', {
          comments,
          complains,
          applauds,
          positions: pos,
          divisions: div
        })
      })
    })
  })
})

app.post('/admin/addOfficer', userAuthenticated, (req, res) => {
  let fileName = 'placeHolder.png'
  if (!isEmpty(req.files)) {
    const file = req.files.officerImage
    fileName = file.name

    file.mv(`./public/images/officers/${fileName}`, (err) => {
      if (err) {
        console.log(err)
      }
    })
  }

  const setOfficr = new Officer({
    id: req.body.id,
    agency: 'LRA',
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    image: fileName,
    assignment: req.body.assignment,
    email: req.body.email,
    phone: req.body.phone,
    phone1: req.body.phone1,
    gender: req.body.gender,
    department: req.body.department,
    division: req.body.division,
    position: req.body.position,
    section: req.body.section,
    status: req.body.status
  })

  setOfficr.save((err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('saved')
    }
  })

  res.redirect('/admin/allOfficers')
})

app.get('/admin/allOfficers', userAuthenticated, (req, res) => {
  Officer.find({
    agency: 'LRA'
  }).then((off) => {
    Comment.find({
      agency: 'LRA'
    }).then((comments) => {
      const complains = []
      const applauds = []
      comments.forEach((com) => {
        if (com.type == 'Complain') {
          complains.push(com)
        }
      })
      comments.forEach((com) => {
        if (com.type == 'Applaud') {
          applauds.push(com)
        }
      })

      res.render('admin/allOfficers', {
        officers: off,
        comments,
        complains,
        applauds
      })
    })
  })
})

app.get('/admin/editOfficer/:id', userAuthenticated, (req, res) => {
  const id = req.params.id

  Officer.findOne({
    _id: id,
    agency: 'LRA'
  }).then((foundOff) => {
    Comment.find({
      agency: 'LRA'
    }).then((comments) => {
      Position.find({
        agency: 'LRA'
      }).then((pos) => {
        Division.find({
          agency: 'LRA'
        }).then((div) => {
          const complains = []
          const applauds = []
          comments.forEach((com) => {
            if (com.type == 'Complain') {
              complains.push(com)
            }
          })
          comments.forEach((com) => {
            if (com.type == 'Applaud') {
              applauds.push(com)
            }
          })

          res.render('admin/editOfficer', {
            comments,
            complains,
            applauds,
            officer: foundOff,
            positions: pos,
            divisions: div
          })
        })
      })
    })
  })
})

// /// update officer information
app.post('/admin/editOfficer/:id', userAuthenticated, (req, res) => {
  Officer.findOne({
    _id: req.params.id,
    agency: 'LRA'
  }).then((foundOff) => {
    Comment.find({
      agency: 'LRA'
    }).then((comments) => {
      foundOff.id = req.body.id
      agency = 'LRA'
      foundOff.firstName = req.body.firstName
      foundOff.middleName = req.body.middleName
      foundOff.lastName = req.body.lastName

      if (!isEmpty(req.files)) {
        const file = req.files.officerImage
        const fileName = file.name

        file.mv(`./public/images/officers/${fileName}`, (err) => {
          if (err) {
            console.log(err)
          }
        })
        foundOff.image = fileName
      } else {
        foundOff.image = foundOff.image
      }

      foundOff.assignment = req.body.assignment
      foundOff.email = req.body.email
      foundOff.phone = req.body.phone
      foundOff.phone1 = req.body.phone1
      foundOff.gender = req.body.gender
      foundOff.department = req.body.department
      foundOff.division = req.body.division
      foundOff.position = req.body.position
      foundOff.section = req.body.section
      foundOff.status = req.body.status

      const complains = []
      const applauds = []
      comments.forEach((com) => {
        if (com.type == 'Complain') {
          complains.push(com)
        }
      })
      comments.forEach((com) => {
        if (com.type == 'Applaud') {
          applauds.push(com)
        }
      })

      foundOff.save((err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Updated Seccessfully')
        }
      })

      res.redirect('/admin/allOfficers')
    })
  })
})

// Delete Officer method
app.get('/admin/deleteOfficer/:id', userAuthenticated, (req, res) => {
  const id = req.params.id
  Officer.findByIdAndRemove({
    _id: id,
    agency: 'LRA'
  }).then(() => {
    res.redirect('/admin/allOfficers')
  })
})

// apploud and complain section

app.get('/admin/allComments', userAuthenticated, (req, res) => {
  Officer.find({
    agency: 'LRA'
  }).then((off) => {
    Comment.find({
      agency: 'LRA'
    }).then((comments) => {
      const complains = []
      const applauds = []
      comments.forEach((com) => {
        if (com.type == 'Complain') {
          complains.push(com)
        }
      })
      comments.forEach((com) => {
        if (com.type == 'Applaud') {
          applauds.push(com)
        }
      })

      res.render('admin/allComments', {
        officers: off,
        comments,
        complains,
        applauds
      })
    })
  })
})

app.get('/admin/applauds', userAuthenticated, (req, res) => {
  Officer.find({}).then((off) => {
    Comment.find({
      agency: 'LRA'
    }).then((comments) => {
      const complains = []
      const applauds = []
      comments.forEach((com) => {
        if (com.type == 'Complain') {
          complains.push(com)
        }
      })
      comments.forEach((com) => {
        if (com.type == 'Applaud') {
          applauds.push(com)
        }
      })

      res.render('admin/applauds', {
        officers: off,
        comments,
        complains,
        applauds
      })
    })
  })
})

// google map routes
app.get('/admin/details/:id', userAuthenticated, (req, res) => {
  const id = req.params.id
  Category.find({}).then((cat) => {
    Comment.find({
      agency: 'LRA'
    }).then((comments) => {
      Comment.findOne({
        _id: id,
        agency: 'LRA'
      }).then((foundCom) => {
        const complains = []
        const applauds = []
        comments.forEach((com) => {
          if (com.type == 'Complain') {
            complains.push(com)
          }
        })
        comments.forEach((com) => {
          if (com.type == 'Applaud') {
            applauds.push(com)
          }
        })

        res.render('admin/commentDetails', {
          categories: cat,
          comments,
          complains,
          applauds,
          comment: foundCom
        })
      })
    })
  })
})

// updating comments category
app.post('/admin/comment/:id', userAuthenticated, (req, res) => {
  const id = req.params.id
  Comment.findOne({
    agency: 'LRA',
    _id: id
  }).then((com) => {
    com.agency = 'LRA'
    com.type = com.type
    com.officerId = com.officerId
    com.fullName = com.fullName
    com.number = com.number
    com.email = com.email
    com.content = com.content
    com.county = com.county
    com.category = req.body.category
    com.latitude = com.latitude
    com.longitude = com.longitude
    com.updatedBy = com.updatedBy
    com.status = req.body.status
    com.date = dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT')

    com.save((err) => {
      if (err) {
        console.log(err)
      } else {
        res.redirect(`/admin/details/${id}`)
      }
    })
  })
})

// google map routes
app.get('/admin/map/:id', userAuthenticated, (req, res) => {
  const id = req.params.id

  Officer.find({}).then((off) => {
    Comment.find({
      agency: 'LRA'
    }).then((comments) => {
      Comment.findOne({
        _id: id
      }).then((foundCom) => {
        const complains = []
        const applauds = []
        comments.forEach((com) => {
          if (com.type == 'Complain') {
            complains.push(com)
          }
        })
        comments.forEach((com) => {
          if (com.type == 'Applaud') {
            applauds.push(com)
          }
        })

        res.render('admin/map', {
          officers: off,
          comments,
          complains,
          applauds,
          comment: foundCom
        })
      })
    })
  })
})

app.get('/admin/map', userAuthenticated, (req, res) => {
  Officer.find({}).then((off) => {
    Comment.find({
      agency: 'LRA'
    }).then((comments) => {
      const complains = []
      const applauds = []
      comments.forEach((com) => {
        if (com.type == 'Complain') {
          complains.push(com)
        }
      })
      comments.forEach((com) => {
        if (com.type == 'Applaud') {
          applauds.push(com)
        }
      })

      res.render('admin/completeMap', {
        officers: off,
        comments,
        complains,
        applauds
      })
    })
  })
})

app.get('/admin/addUser', userAuthenticated, (req, res) => {
  Comment.find({
    agency: 'LRA'
  }).then((comments) => {
    const complains = []
    const applauds = []
    comments.forEach((com) => {
      if (com.type == 'Complain') {
        complains.push(com)
      }
    })
    comments.forEach((com) => {
      if (com.type == 'Applaud') {
        applauds.push(com)
      }
    })

    res.render('admin/addUser', {
      comments,
      complains,
      applauds
    })
  })
})

app.post('/admin/addUser', userAuthenticated, (req, res) => {
  let fileName = 'placeHolder.png'
  if (!isEmpty(req.files)) {
    const file = req.files.userImage
    fileName = file.name

    file.mv(`./public/images/users/${fileName}`, (err) => {
      if (err) {
        console.log(err)
      }
    })
  }
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    // Store hash in your password DB.
    const setUser = new User({
      agency: 'LRA',
      fullName: req.body.fullName,
      email: req.body.email,
      image: fileName,
      role: req.body.role,
      password: hash,
      status: req.body.status
    })

    setUser.save((err) => {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/admin/allUsers')
      }
    })
  })
})

app.get('/admin/allUsers', userAuthenticated, (req, res) => {
  User.find({
    agency: 'LRA'
  }).then((user) => {
    Officer.find({
      agency: 'LRA'
    }).then((off) => {
      Comment.find({
        agency: 'LRA'
      }).then((comments) => {
        const complains = []
        const applauds = []
        comments.forEach((com) => {
          if (com.type == 'Complain') {
            complains.push(com)
          }
        })
        comments.forEach((com) => {
          if (com.type == 'Applaud') {
            applauds.push(com)
          }
        })

        res.render('admin/allUsers', {
          officers: off,
          comments,
          complains,
          applauds,
          users: user
        })
      })
    })
  })
})

app.get('/admin/editUser/:id', userAuthenticated, (req, res) => {
  const id = req.params.id
  User.findOne({
    _id: id
  }).then((foundUser) => {
    Comment.find({
      agency: 'LRA'
    }).then((comments) => {
      const complains = []
      const applauds = []
      comments.forEach((com) => {
        if (com.type == 'Complain') {
          complains.push(com)
        }
      })
      comments.forEach((com) => {
        if (com.type == 'Applaud') {
          applauds.push(com)
        }
      })

      res.render('admin/editUser', {
        comments,
        complains,
        applauds,
        foundUser
      })
    })
  })
})

// Edit user
app.post('/admin/editUser/:id', userAuthenticated, (req, res) => {
  const id = req.params.id
  // eslint-disable-next-line handle-callback-err
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    // Store hash in your password DB.
    User.findOne({
      _id: id
    }).then((foundUser) => {
      foundUser.agency = 'LRA'
      foundUser.fullName = req.body.fullName
      foundUser.email = req.body.email
      if (!isEmpty(req.files)) {
        const file = req.files.userImage
        const fileName = file.name

        file.mv(`./public/images/users/${fileName}`, (err) => {
          if (err) {
            console.log(err)
          }
        })
        foundUser.image = fileName
      } else {
        foundUser.image = foundUser.image
      }
      // user role check
      if (req.body.role === '' || req.body.role === foundUser.role) {
        foundUser.role = foundUser.role
      } else {
        foundUser.role = req.body.role
      }

      // user password check
      if (foundUser.password !== foundUser.password) {
        foundUser.password = hash
      }

      foundUser.status = req.body.status

      foundUser.save((err) => {
        if (err) {
          console.log(err)
        } else {
          res.redirect('/admin/allUsers')
        }
      })
    })
  })
})

// Delete user method
app.get('/admin/user/:id', userAuthenticated, (req, res) => {
  const id = req.params.id
  User.findByIdAndRemove({
    _id: id,
    agency: 'LRA'
  }).then(() => {
    res.redirect('/admin/allUsers')
  })
})

passport.use(
  new LocalStrategy({
    usernameField: 'email'
  }, (email, password, done) => {
    User.findOne({
      email
    }).then((user) => {
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        })
      }

      bcrypt.compare(password, user.password, (err, matched) => {
        if (err) {
          return err
        }
        if (matched) {
          return done(null, user)
        }
        return done(null, false, {
          message: 'Incorrect Password'
        })
      })
    })
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/'
    // failureFlash: true
  })(req, res, next)
})

app.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('/')
})

// front end complain and applaud
app.post('/newComment', (req, res) => {
  const comment = new Comment({
    officerId: req.body.officerId,
    type: req.body.type,
    agency: 'LRA',
    fullName: req.body.fullName,
    number: req.body.number,
    email: req.body.email,
    content: req.body.content,
    county: req.body.county,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    date: dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT')
  })

  comment.save((err) => {
    if (!err) {
      res.redirect('/')
    } else {
      res.send(err)
    }
  })
})

//  apis section

// /request for all officers ///////////
app.route('/api/LRA/officers').get((req, res) => {
  Officer.find({
    agency: 'LRA'
  }, (err, foundOff) => {
    if (!err) {
      res.send(foundOff)
    } else {
      res.send(err)
    }
  })
})

// ///request for all articles ///////////
app.route('/api/comment').post((req, res) => {
  const comment = new Comment({
    officerId: req.body.officerId,
    type: req.body.type,
    agency: req.body.agency,
    fullName: req.body.fullName,
    number: req.body.number,
    email: req.body.email,
    content: req.body.content,
    county: req.body.county,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    date: dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT')
  })

  comment.save((err) => {
    if (!err) {
      res.send(' send Successfully')
    } else {
      res.send(err)
    }
  })
})

app
  .route('/api/LRA/officers/:id')

  .get((req, res) => {
    Officer.findOne(
      {
        id: req.params.id,
        agency: 'LRA'
      },
      // eslint-disable-next-line handle-callback-err
      (err, foundOfficer) => {
        if (foundOfficer) {
          res.send(foundOfficer)
        } else {
          res.send('No matched found')
        }
      }
    )
  })

let port = process.env.PORT
if (port == null || port == '') {
  port = 3000
}

app.listen(port, () => console.log(`Server running on port ${port}`))
// app.LRAten(port, () => {
//   console.log("Server started on port 3000");
// });
