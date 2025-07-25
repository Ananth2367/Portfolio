
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const nodemailer = require('nodemailer')





const app = express()
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))
app.listen(process.env.PORT,()=>{
    console.log('running on port 8080')
})

const portfolioData = {
  name: "Ananth Dev Prajapat",
  title: "Bachelor's of Technology in Artificial Intelligence and Machine learning",
  email: "ananthdevprajapat@gmail.com",
  phone: "+91 6303586891",
  linkedin: "https://www.linkedin.com/in/ananth-dev-prajapat-a59658257/",
  github: "https://github.com/Ananth2367",
  education: [
    { degree: "B.Tech AI/ML", institution: "CMR Technical Campus", score: "CGPA: 8.59/10" },
    { degree: "12th", institution: "CBSE", score: "96.8%" },
    { degree: "10th", institution: "CBSE", score: "85.5%" }
  ],
  skills: {
    languages: ["Java", "C", "C++", "Python"],
    frontend: ["HTML", "CSS", "JavaScript", "EJS", "React"],
    backend: ["Node.js", "Spring Boot", "Express.js","Mongoose"],
    databases: ["MySQL", "PostgreSQL", "MongoDB"],
    tools: ["Git", "GitHub", "Postman"],
    ai_frameworks:["Spring Ai"]
  },
  projects: [
    {
      "name": "Personal Portfolio Website",
      "desc": "Developed a full-stack portfolio website to showcase academic profile, skills, and projects. Implemented responsive glassmorphism UI, dynamic EJS rendering, and a Nodemailer-powered contact form with resume attachment.",
      "skills": ["Node.js", "Express.js", "EJS", "Tailwind CSS", "HTML/CSS", "JavaScript", "Nodemailer"]
    },
    {
      "name": "RoamNest – Property Listing Platform",
      "desc": "Created a full-stack web application for posting and managing property listings with CRUD operations, RESTful APIs, and dynamic EJS rendering. Designed a responsive, mobile-friendly UI with Bootstrap and implemented MVC architecture.",
      "skills": ["Node.js", "Express.js", "MongoDB", "EJS", "Bootstrap"]
    },
    {
      "name": "E-Commerce Platform",
      "desc": "Built a feature-rich e-commerce platform with Spring Boot backend and React.js frontend. Enabled product management with image upload, RESTful APIs, PostgreSQL integration, and theme toggle. Emphasized clean MVC design and responsive UI.",
      "skills": ["Spring Boot", "Java", "React.js", "PostgreSQL", "REST APIs", "Bootstrap"]
    }
  ],
  achievements: [
    "Global Rank 1405 in CodeChef Starters 170",
    "Top 10 in Smart India Hackathon (SIH)",
    "Mentored 120+ students in DSA"
  ]
};







app.get('/', (req, res) => {
  res.render('index', {portfolioData});
});





app.post("/contact",(req,res)=>{
    let {name,email,phone_number} = req.body

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:  process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  const mailOptions = {
  from: process.env.GMAIL_USER,
  to: email,
  subject: 'Thanks for contacting Ananth!',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Hi ${name},</h2>
      <p>Thanks for reaching out! Here are my details:</p>
      
      <div style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem;">
        <h3>📞 Contact Me</h3>
        <p>Phone: <a href="tel:+916303586891">+91 6303586891</a></p>
        <p>WhatsApp: <a href="https://wa.me/916303586891">Chat Now</a></p>
        
        <h3>🌐 Profiles</h3>
        <p>
          LinkedIn: <a href="https://linkedin.com/in/ananth-dev-prajapat-a596582577">Ananth Dev Prajapat</a><br>
        </p>
      </div>

      <p>I've attached my resume for your reference.</p>
      <p style="color: #6b7280; font-size: 0.9rem;">This is an automated message.</p>
    </div>
  `,
  attachments: [
    {
      filename: 'Ananth_Dev_Prajapat.pdf',
      path: path.join(__dirname, 'public/resume/Ananth _Dev_Prajapat.pdf'), // Path to your resume
      contentType: 'application/pdf'
    }
  ]
};;

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error:", err);
      res.send("Email failed.");
    } else {
      console.log("Email sent:", info.response);
      res.send("Email sent successfully!");
    }
  });
})
