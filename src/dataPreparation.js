const _ = require('lodash');
const XLSX = require('xlsx');
const fs = require('fs');

// Tasks
const tasksWorkbook = XLSX.readFile('./data/Tasks.xlsx');

const taskSheet = tasksWorkbook.Sheets.Sheet1;
const taskHeader = ['name', 'link', 'status'];

let tasks = XLSX.utils.sheet_to_json(taskSheet, { header: taskHeader });
tasks.shift(); // remove header object

const presentationTask = {
  name: 'Presentation',
  link: 'https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/presentation.md',
  status: 'Checked',
};

tasks = tasks.map(t => ({
  name: _.trimEnd(t.name, ['-', ' ']),
  link: t.link,
  status: t.status,
}));

if (!_.includes(tasks, presentationTask)) tasks.push(presentationTask); // add Presentation task, that score contains

// Score
const scoreWorkbook = XLSX.readFile('data/Mentor score.xlsx');

const scoreSheet = scoreWorkbook.Sheets['Form Responses 1'];
const scoreHeader = ['timestamp', 'mentorGithub', 'studentGithub', 'task', 'prLink', 'score', 'comment'];

let score = XLSX.utils.sheet_to_json(scoreSheet, { header: scoreHeader, raw: false });
score.shift();

score = score.map(s => ({
  timestamp: s.timestamp,
  mentorGithub: s.mentorGithub,
  studentGithub: s.studentGithub.toLowerCase().replace('-2018q3', ''),
  task: s.task,
  prLink: s.prLink,
  score: s.score,
  comment: s.comment,
}));

const studentTasks = _.groupBy(score, 'studentGithub');


// Mentor/student
const mentorStudentWorkbook = XLSX.readFile('data/Mentor-students pairs.xlsx');

const pairsSheet = mentorStudentWorkbook.Sheets.pairs;
const mentorsSheet = mentorStudentWorkbook.Sheets['second_name-to_github_account'];

const studentsHeader = ['mentor', 'student'];
const mentorsHeader = ['name', 'surname', 'city', 'countOfStudents', 'github'];

let students = XLSX.utils.sheet_to_json(pairsSheet, { header: studentsHeader });
students.shift(); // remove header object
students = students.map((s) => {
  const studentGithub = `https://github.com/${s.student}`;
  const st = {
    mentor: s.mentor,
    student: {
      nickname: s.student,
      github: studentGithub,
      tasks: studentTasks[studentGithub],
    },
  };
  return st;
});

const studentsByMentor = _.groupBy(students, 'mentor');

let mentors = XLSX.utils.sheet_to_json(mentorsSheet, { header: mentorsHeader });
mentors.shift(); // remove header object
mentors = mentors.map((m) => {
  const mentorFullName = `${m.name} ${m.surname}`;
  const mentor = {
    name: m.name,
    surname: m.surname,
    fullName: mentorFullName,
    city: m.city,
    countOfStudents: m.countOfStudents,
    github: m.github,
    nickname: m.github.replace('https://github.com/', ''),
    students: studentsByMentor[mentorFullName].map(s => s.student),
  };
  return mentor;
});
mentors = _.orderBy(mentors, ['fullName']);

const mentorsList = {
  mentors,
  tasks,
};

fs.writeFile('src/store/data/mentors.json', JSON.stringify(mentorsList, null, 2), (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log('File successfully created!');
});
