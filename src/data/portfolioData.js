import articlesData from './articles.json';

export const THEME_KEY = 'aman-portfolio-theme';

export const summaryParagraphs = [
  'Full-Stack Software Engineer with hands-on experience in building scalable web applications using React.js, Node.js, Express.js, Django, and RESTful APIs. Proficient in JavaScript, Python, MySQL, MongoDB, Redis, JWT authentication, AI/LLM integrations, and AWS cloud services. Strong focus on clean code, MVC architecture, Agile methodologies, and problem-solving.',
];

export const technicalSkills = [
  ['Languages', 'JavaScript, Python, HTML, CSS'],
  ['Frontend', 'React.js'],
  ['Backend', 'Node.js, Express.js, Django'],
  ['Databases', 'MySQL, MongoDB, Redis'],
  ['Tools', 'Git, GitHub, Docker, Postman, Jira'],
  ['Cloud', 'AWS'],
];

export const coreConcepts = [
  'RESTful APIs',
  'WebSockets',
  'Webhooks',
  'JWT/OAuth',
  'AI/LLM Integrations',
  'Responsive Design',
  'Agile/Scrum',
  'CI/CD Concepts',
  'HL7 FHIR',
  'HIPAA Compliance',
];

export const experience = [
  {
    role: 'Associate Software Engineer',
    org: 'Hale Healthcare IT Labs',
    location: 'Bhubaneswar, India',
    period: 'July 2024 - November 2025',
    highlights: [
      'Built scalable healthcare web applications using React.js, Hooks, and Context API, serving 1000+ clinical users.',
      'Designed secure RESTful APIs using Node.js, Express.js, and Django REST Framework with JWT/OAuth authentication.',
      'Integrated EHR systems (OpenEMR, Epic, Oracle Health) using HL7 FHIR and SMART on FHIR standards to enable real-time clinical data exchange and interoperability.',
      'Developed AI-powered Clinical Decision Support (CDS) features using LLM integrations to assist providers with recommendations.',
      'Implemented Stripe payment gateway and Zoom API integrations for Clinical Supervision Systems.',
      'Optimized backend performance, reducing API response time by 30%.',
      'Maintained HIPAA compliance and implemented secure role-based access control.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    org: 'Hale Healthcare IT Labs',
    location: 'Bhubaneswar, India',
    period: 'December 2023 - June 2024',
    highlights: [
      'Developed a HIPAA-compliant real-time chat application using Socket.io, enabling secure communication between patients and providers.',
      'Implemented role-based access control (RBAC) and authentication using JWT.',
      'Designed backend services with Node.js and Express.js, and integrated Redis for real-time messaging and caching.',
      'Collaborated with senior engineers to implement healthcare workflows aligned with security and compliance standards.',
    ],
  },
  {
    role: 'Data Science Intern',
    org: 'Celebal Technologies',
    location: 'Remote',
    period: 'June 2023 - August 2023',
    highlights: [
      'Performed exploratory data analysis (EDA) and feature engineering on large structured datasets using Python libraries such as Pandas and NumPy.',
      'Built and evaluated machine learning models using Scikit-learn for customer segmentation and fraud detection use cases.',
      'Implemented K-Means clustering to identify distinct customer segments, enabling targeted marketing strategies.',
      'Developed classification models (Logistic Regression, Random Forest, XGBoost) to detect fraudulent transactions, improving detection accuracy by up to 40%.',
      'Applied model evaluation techniques (cross-validation, confusion matrix, ROC-AUC) to optimize performance.',
      'Visualized insights using Matplotlib and Seaborn to support data-driven decision-making.',
    ],
  },
];

export const projects = [
  {
    title: 'AI-powered CDS application using SMART on FHIR',
    description:
      'AI-enabled Clinical Decision Support application built with SMART on FHIR workflows for interoperable EHR integration and actionable clinical insights.',
    image: '/assets/img/1.jpeg',
    github: 'https://github.com/amanKIIT/AI-powered-CDS-application-using-SMART-on-FHIR',
  },
  {
    title: 'RxAnalyzer - An AI-powered medical prescription summarizer',
    description:
      'Prescription intelligence tool that summarizes clinical prescriptions using AI to improve readability, medication clarity, and patient-provider communication.',
    image: '/assets/img/2.jpeg',
    github: 'https://github.com/amanKIIT/RxAnalyzer-An-AI-powered-medical-prescription-summary-generator',
  },
  {
    title: 'SMART on FHIR Chat Application for Clinicians, Providers and Patients',
    description:
      'Real-time SMART on FHIR chat solution enabling secure communication between clinicians, providers, and patients with context-aware healthcare workflows.',
    image: '/assets/img/3.jpeg',
    github: 'https://github.com/amanKIIT/SMART-on-FHIR-Chat-Application-for-Clinicians-Providers-and-Patients',
  },
  {
    title: 'SMART on FHIR Suite for Clinicians and Providers',
    description:
      'Integrated SMART on FHIR platform suite for clinicians and providers, designed to streamline care workflows and improve interoperability across systems.',
    image: '/assets/img/4.jpeg',
    github: 'https://github.com/amanKIIT/SMART-on-FHIR-Suite-for-Clinicians-Providers',
  },
  {
    title: 'Crop Disease Detection System',
    description:
      'Created a CNN-based deep learning system to promote smart and precision agriculture with TensorFlow and Keras for crop disease classification.',
    image: '/assets/img/crop%20disease.png',
    github: 'https://github.com/amankiit/Crop-Disease-Detection-using-Deep-Learning',
  },
  {
    title: 'Customer Segmentation Using ML',
    description:
      'Applied clustering algorithms in Python to segment customers based on behavioral and demographic patterns.',
    image: '',
    github: '',
  },
  {
    title: 'Blockchain based decentralized Voting Application',
    description:
      'Developed a decentralized voting dApp using Solidity, Truffle, Ganache, and MetaMask with a secure frontend built in JavaScript, HTML, and CSS.',
    image: '/assets/img/ethereum%20voting%20app.png',
    github: 'https://github.com/amankiit/Ethereum-blockchain-based-Voting-Election-app',
  },
  {
    title: 'Sparse Data Study for Malware Detection',
    description:
      'Compared sparse data handling techniques and evaluated multiple machine learning classifiers for Android malware detection.',
    image: '',
    github: '',
  },
];

export const education = [
  {
    title: 'Bachelor of Technology in Computer Science Engineering',
    meta: 'Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar | 2024',
    info: 'CGPA: 8.71 / 10',
  },
  {
    title: '12th (Intermediate)',
    meta: 'Chinmaya Vidyalaya (CBSE) | 2020',
    info: 'Percentage: 74.20%',
  },
  {
    title: '10th (Matriculation)',
    meta: 'Chinmaya Vidyalaya (CBSE) | 2018',
    info: 'Percentage: 84.83%',
  },
];

export const certifications = [
  'Web Development - Coursera',
  'Blockchain Basics and Foundation - Coursera',
  'Problem Solving (Intermediate) - HackerRank',
  'AWS Graduate - Amazon Web Services',
];

export const contacts = [
  ['LinkedIn', 'amanraj31', 'https://linkedin.com/in/amanraj31'],
  ['X', '@f_sicc', 'https://x.com/f_sicc'],
  ['YouTube', '@f_sicc', 'https://www.youtube.com/@f_sicc'],
  ['GitHub', 'amanKIIT', 'https://github.com/amanKIIT'],
];

export const nav = [
  ['Home', '#home'],
  ['Summary', '#summary'],
  ['Experience', '#experience'],
  ['Projects', '#projects'],
  ['Education', '#education'],
  ['Contact', '#contact'],
];

export const blogPosts = Array.isArray(articlesData?.articles)
  ? articlesData.articles
  : [];
