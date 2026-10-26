/**
 * Dr. Parween's Hospital - Master Constants & Verified Medical Data
 * Extracted directly from live platform & verified credentials.
 */

export const HOSPITAL_INFO = {
  name: "Dr. Parween's Hospital",
  tagline: "Best Gynecologist & Multi-Specialty Hospital in Sangareddy",
  subTagline: "Compassionate Healthcare for Women, Children & Families",
  experienceYears: 10,
  phone: "+91 9170150500",
  rawPhone: "9170150500",
  whatsappPhone: "919170150500",
  emergencyPhone: "+91 9170150500",
  email: "drparweenhospital@gmail.com",
  address: {
    line1: "H NO: 3, 5-108/2/A/1, FRS ROAD",
    line2: "Near Fateh Khan Dargah, ATABAL, RAJAMPET",
    city: "Sangareddy",
    state: "Telangana",
    pincode: "502001",
    full: "H NO: 3, 5-108/2/A/1, FRS ROAD, near Fateh Khan Dargah, ATABAL, RAJAMPET, Sangareddy, Telangana – 502001",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Dr%20Parweens%20Hospitals%20-%20Leading%20Obstetrician-Gynecologist%20%26%20Medical%20Clinic%2C%20H%20NO%3A%203%2C%205-108%2F2%2FA%2F1%2C%20FRS%20ROAD%2C%20near%20Fateh%20Khan%20Dargah%2C%20ATABAL%2C%20RAJAMPET%2C%20Sangareddy%2C%20Telangana%20502001&t=m&z=15&output=embed&iwloc=near",
    googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Dr+Parweens+Hospital+Sangareddy"
  },
  timings: {
    opdDays: "Monday – Saturday",
    opdHours: "9:00 AM – 6:00 PM",
    sunday: "Emergency Services 24/7",
    emergency: "24-Hour Emergency & Labor Ward Available"
  },
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
    whatsapp: "https://wa.me/919170150500?text=Hello%20Dr.%20Parween's%20Hospital,%20I%20would%20like%20to%20inquire%20about%20an%20appointment."
  }
};

export const LEAD_DOCTOR = {
  name: "Dr. Parween Saba",
  title: "Founder, Medical Director & Chief Consultant",
  degrees: "MBBS, MD (Obstetrics & Gynecology)",
  specialties: [
    "Senior Consultant Obstetrician & Gynecologist",
    "High-Risk Pregnancy Specialist",
    "Advanced Laparoscopic Surgeon",
    "Infertility & Reproductive Health Expert"
  ],
  experience: "10+ Years of Clinical Excellence",
  bio: "Dr. Parween Saba is widely recognized as one of the most trusted and accomplished obstetrician-gynecologists in Sangareddy and surrounding Telangana regions. Renowned for her gentle bedside manner, clinical precision in complex high-risk deliveries, and dedication to normal physiological births whenever possible, she leads Dr. Parween's Hospital with an unwavering patient-first ethos.",
  image: "/assets/doctors/dr-parween.png",
  imageNoBg: "/assets/doctors/dr-parween-nobg.png",
  highlights: [
    "Specialized in Normal & Painless Epidural Deliveries",
    "Over 5,000+ Safe Deliveries & Critical Interventions Handled",
    "Pioneer in Minimally Invasive Laparoscopic Gynecological Surgeries",
    "Recognized for High-Risk Twin & Complicated Pregnancy Management"
  ]
};

export const MEDICAL_SERVICES = [
  {
    id: "obstetrics-gynecology",
    slug: "obstetrics-gynecology",
    title: "Obstetrics & Gynecology",
    shortDescription: "Complete maternity and women’s healthcare, from preconception to pregnancy and postnatal care.",
    fullDescription: "From early pregnancy counseling to labor, delivery, and postpartum care, our Obstetrics & Gynecology department provides world-class clinical care tailored to every woman's journey. We emphasize natural and painless deliveries, routine gynecological wellness, PCOS/PCOD management, menstrual disorders, and menopause health.",
    icon: "HeartPulse",
    image: "/assets/services/obstetrics-gynecology.jpg",
    features: [
      "Normal & Painless Labor (Epidural Delivery)",
      "Comprehensive Antenatal & Postnatal Care",
      "PCOS, PCOD & Hormonal Imbalance Clinic",
      "Infertility Evaluation & Follicular Tracking",
      "Menopausal Health & Cervical Cancer Screening",
      "Hysterectomy & Myomectomy Procedures"
    ]
  },
  {
    id: "high-risk-pregnancy",
    slug: "high-risk-pregnancy",
    title: "High-Risk Pregnancy Management",
    shortDescription: "Expert monitoring and safe delivery for complex maternal and fetal conditions.",
    fullDescription: "High-risk pregnancies require experienced obstetric clinical instincts and dedicated diagnostic monitoring. Our team handles gestational hypertension (preeclampsia), gestational diabetes, recurrent miscarriages, twin/multiple gestations, thyroid disorders, and advanced maternal age cases with 24x7 emergency backup.",
    icon: "ShieldAlert",
    image: "/assets/services/high-risk-pregnancy.png",
    features: [
      "Gestational Diabetes & Preeclampsia Protocols",
      "Multiple Pregnancy (Twin/Triplets) Monitoring",
      "Continuous Electronic Fetal Heart Monitoring",
      "Emergency Lower Segment Cesarean Section (LSCS)",
      "Recurrent Pregnancy Loss Workup",
      "Dedicated High-Dependency Obstetric Beds"
    ]
  },
  {
    id: "laparoscopic-surgery",
    slug: "laparoscopic-surgery",
    title: "Laparoscopic & General Surgery",
    shortDescription: "Minimally invasive keyhole procedures ensuring smaller incisions, minimal pain, and rapid recovery.",
    fullDescription: "Our surgical unit is equipped with advanced modular OT equipment for state-of-the-art keyhole laparoscopic surgeries. Patients benefit from significantly less pain, negligible blood loss, minimal scarring, and quick return to regular activities.",
    icon: "Activity",
    image: "/assets/services/laparoscopic-surgery.png",
    features: [
      "Total Laparoscopic Hysterectomy (TLH)",
      "Laparoscopic Ovarian Cystectomy & Oophorectomy",
      "Diagnostic Laparoscopy & Hysteroscopy for Infertility",
      "Laparoscopic Appendectomy & Gallbladder Removal",
      "Hernia Repairs (Inguinal, Umbilical, Incisional)",
      "Piles, Fissure & Perianal Surgery Clinic"
    ]
  },
  {
    id: "internal-medicine",
    slug: "internal-medicine",
    title: "Internal Medicine",
    shortDescription: "Expert diagnosis and compassionate management of acute infections and chronic lifestyle diseases.",
    fullDescription: "Internal Medicine forms the bedrock of holistic healing at Dr. Parween's Hospital. We provide comprehensive evidence-based treatment for diabetes, hypertension, infectious fevers (Dengue, Typhoid, Malaria), respiratory ailments, and geriatric health.",
    icon: "Stethoscope",
    image: "/assets/services/internal-medicine.png",
    features: [
      "Type 2 Diabetes Mellitus Comprehensive Care",
      "Hypertension & Cardiovascular Risk Assessment",
      "Acute Febrile Illness & Tropical Infection Care",
      "Thyroid, Endocrine & Metabolic Disorder Management",
      "Gastrointestinal & Liver Health Consultations",
      "Preventive Executive Health Checkups"
    ]
  },
  {
    id: "pediatrics-child-care",
    slug: "pediatrics-child-care",
    title: "Pediatrics & Child Care",
    shortDescription: "Gentle, compassionate healthcare for newborns, infants, toddlers, and growing adolescents.",
    fullDescription: "Every child deserves gentle, empathetic medical attention. Our pediatrics wing offers newborn care, complete childhood immunization schedules, developmental milestone screenings, and rapid intervention for acute pediatric illnesses.",
    icon: "Baby",
    image: "/assets/services/pediatrics.png",
    features: [
      "Newborn Care & Neonatal Stabilization",
      "Full National & Optional Vaccination Schedule",
      "Childhood Asthma & Respiratory Allergy Clinic",
      "Growth, Nutrition & Milestone Developmental Check",
      "Pediatric Fevers, Dehydration & Infection Management",
      "Pediatric Emergency Support"
    ]
  },
  {
    id: "physiotherapy-rehabilitation",
    slug: "physiotherapy-rehabilitation",
    title: "Physiotherapy & Rehabilitation",
    shortDescription: "Restoring functional mobility, relieving chronic aches, and post-delivery conditioning.",
    fullDescription: "Our physical rehabilitation center provides specialized antenatal pelvic floor exercises, postnatal muscle toning, orthopedic recovery therapy, stroke rehab, and ergonomic pain relief protocols.",
    icon: "Flame",
    image: "/assets/services/physiotherapy.png",
    features: [
      "Antenatal & Postnatal Pelvic Floor Conditioning",
      "Post-Surgical Mobilization & Rehab",
      "Chronic Back, Neck & Joint Pain Relief",
      "Sciatica & Disc Bulge Physical Therapy",
      "Electrotherapy, Ultrasound & Deep Tissue Modalities",
      "Elderly Mobility Enhancement"
    ]
  },
  {
    id: "diagnostics-lab-tests",
    slug: "diagnostics-lab-tests",
    title: "Diagnostics & 24x7 Lab Tests",
    shortDescription: "High-resolution ultrasound imaging, computerized digital pathology, and rapid test turnaround.",
    fullDescription: "Accurate diagnoses pave the way for prompt healing. Our in-house diagnostic suite offers advanced ultrasound scanning, Doppler obstetric imaging, complete hematology, clinical biochemistry, and infectious panels with guaranteed precision.",
    icon: "FlaskConical",
    image: "/assets/services/diagnostics.png",
    features: [
      "High-Resolution 3D/4D Obstetric Ultrasound",
      "Pelvic & Abdominal Sonography",
      "Fetal Doppler & Anomaly Scans",
      "Complete Blood Count (CBC) & Biochemistry",
      "Hormone Testing (Thyroid, Beta-hCG, Fertility Profiles)",
      "Fast-Track Reports with WhatsApp Delivery"
    ]
  }
];

export const HOSPITAL_INFRASTRUCTURE = [
  {
    id: "modular-ot",
    title: "State-of-the-Art Modular Operation Theatre",
    category: "Surgical Suite",
    description: "Equipped with laminar air flow, HEPA air filtration, advanced electrocautery, and high-definition laparoscopy towers.",
    image: "/assets/gallery/operation-theater.jpg"
  },
  {
    id: "hospital-exterior",
    title: "Hospital Main Entrance & Ambulance Bay",
    category: "Facility",
    description: "Conveniently located on FRS Road with easy street access, dedicated emergency ramp, and seamless patient drop-off.",
    image: "/assets/gallery/facility-3.png"
  },
  {
    id: "reception-lobby",
    title: "Welcoming Reception & Patient Lounge",
    category: "Patient Care",
    description: "Air-conditioned, comfortable seating with digital token calling and patient coordination counters.",
    image: "/assets/gallery/reception.png"
  },
  {
    id: "emergency-room",
    title: "24-Hour Emergency & Triage Ward",
    category: "Emergency",
    description: "Round-the-clock emergency medical response unit with crash cart, oxygen, and emergency monitoring equipment.",
    image: "/assets/gallery/emergency-care.jpg"
  },
  {
    id: "digital-diagnostics",
    title: "Computerized Laboratory & Testing Hub",
    category: "Diagnostics",
    description: "Automated hematology analyzers, biochemistry instruments, and digital report generation.",
    image: "/assets/gallery/diagnostics-suite.jpg"
  },
  {
    id: "xray-imaging",
    title: "Ultrasonography & Diagnostic Imaging",
    category: "Imaging",
    description: "High-precision ultrasound machines for maternal fetal monitoring and general body imaging.",
    image: "/assets/gallery/x-ray-lab.jpg"
  },
  {
    id: "deluxe-cabin-1",
    title: "Private Inpatient Care Suite",
    category: "Cabin & Rooms",
    description: "Spacious private air-conditioned patient cabins with attendant couch, ensuite bathroom, and 24/7 nurse call support.",
    image: "/assets/gallery/facility-1.png"
  },
  {
    id: "deluxe-cabin-2",
    title: "Maternity Recovery Ward",
    category: "Cabin & Rooms",
    description: "Quiet, hygienic recovery rooms specially designed for new mothers and their newborns.",
    image: "/assets/gallery/facility-2.png"
  },
  // {
  //   id: "deluxe-cabin-3",
  //   title: "Post-Operative Observation Unit",
  //   category: "Cabin & Rooms",
  //   description: "Continuous vital signs tracking and clinical observation post-surgical procedures.",
  //   image: "/assets/gallery/facility-3.png"
  // }
];

export const PATIENT_TESTIMONIALS = [
  {
    id: "1",
    name: "Mohd Sohail Ahmed",
    location: "Sangareddy",
    rating: 5,
    highlight: "Normal Delivery through patient counselling & expertise",
    comment: "Dr. Parween Saba is best in Sangareddy Oby, her confidence, way of handling the case, counselling the patient, her patience is the best. I recently had normal delivery which happened only because of her I really thank her whole heartedly, I recommend her to every lady out there."
  },
  {
    id: "2",
    name: "Khalil Reheman",
    location: "Rajampet, Sangareddy",
    rating: 5,
    highlight: "Surgery went perfectly with reassuring confidence",
    comment: "I was terrified about needing surgery, but Dr. Parween was incredible. Her confidence and kindness were so reassuring. The surgery went perfectly, and I feel like I have my life back."
  },
  {
    id: "3",
    name: "Rathod Gangaram",
    location: "Telangana",
    rating: 5,
    highlight: "Truly skilled surgeon & clear communication",
    comment: "Dr. Parween is a truly skilled surgeon. She explained my condition and the surgical options so clearly, which really put my mind at ease before the procedure. My recovery has been excellent."
  },
  {
    id: "4",
    name: "Ayesha Begum",
    location: "Sangareddy",
    rating: 5,
    highlight: "Warm, friendly staff & exceptional pregnancy care",
    comment: "Dr Parween’s Hospital gave me the best care during my pregnancy. The staff is very friendly, attentive, and supportive. The hospital premises are clean and well-maintained."
  },
  {
    id: "5",
    name: "Fatima",
    location: "Telangana",
    rating: 5,
    highlight: "Very neat, affordable, and honest hospital",
    comment: "Very neat hospital, affordable, and professional with no unnecessary tests or hidden charges. Highly recommended for women’s care and normal deliveries in Sangareddy."
  },
  {
    id: "6",
    name: "Sana",
    location: "Sangareddy",
    rating: 5,
    highlight: "Dr. Parween truly cares for her patients",
    comment: "Dr. Parween is kind, experienced, and truly cares for her patients. She listens without rushing and gives genuine medical guidance. We are blessed to have this hospital here."
  }
];

export const HOSPITAL_FAQS = [
  {
    question: "What are the main specialties at Dr. Parween’s Hospital?",
    answer: "We specialize in Obstetrics and Gynecology, High-Risk Pregnancy Care, Laparoscopic Surgery, and offer comprehensive services across General & Internal Medicine, Pediatrics & Child Care, Physiotherapy, and In-House Diagnostics."
  },
  {
    question: "Does the hospital handle high-risk pregnancies?",
    answer: "Yes — we are fully equipped to manage high-risk pregnancies, including preeclampsia (high blood pressure in pregnancy), gestational diabetes, multiple pregnancies (twins), previous C-sections, and recurrent miscarriages with advanced continuous fetal monitoring."
  },
  {
    question: "Do you offer ultrasound and lab testing on-site?",
    answer: "Yes — we provide high-resolution ultrasound scanning (fetal Doppler, anomaly scans, pelvic scans), computerized blood tests, and complete diagnostic pathology with accurate and prompt reports."
  },
  {
    question: "How can I book an appointment?",
    answer: "You can book directly using our online appointment form on this website, call our desk at +91 9170150500, or send us a WhatsApp message. Emergency cases do not need an appointment and are attended to immediately 24/7."
  },
  {
    question: "What are the consultation and visiting hours?",
    answer: "Our OPD consultation hours are Monday through Saturday, 9:00 AM to 6:00 PM. Emergency obstetric care, labor ward admissions, and acute patient stabilization are available 24 hours a day, 7 days a week."
  },
  {
    question: "Where is the hospital located?",
    answer: "The hospital is located at H NO: 3, 5-108/2/A/1, FRS ROAD, Near Fateh Khan Dargah, ATABAL, RAJAMPET, Sangareddy, Telangana – 502001. We are conveniently accessible from all main roads in Sangareddy with ambulance drop-off facility."
  },
  {
    question: "Are cashless insurance and mediclaim policies accepted?",
    answer: "We assist patients with seamless mediclaim paperwork, detailed discharge summaries, and necessary documentation for health insurance reimbursement across all major health insurance providers."
  }
];

export const TRUST_PILLARS = [
  {
    title: "Experienced Doctors",
    description: "Led by Dr. Parween Saba (MBBS, MD), our clinical team brings over a decade of specialized surgical and maternity expertise.",
    icon: "Award"
  },
  {
    title: "Patient-First Care",
    description: "We treat every individual with empathy, dignity, and moral transparency, prioritizing normal deliveries and conservative healing.",
    icon: "Heart"
  },
  {
    title: "Advanced Facilities",
    description: "Equipped with modular operation theaters, high-end ultrasonography, emergency labor suites, and clean private patient cabins.",
    icon: "Building2"
  },
  {
    title: "Transparent Billing",
    description: "Zero hidden charges. Transparent treatment estimates provided upfront with clear, ethical billing policies.",
    icon: "ReceiptCheck"
  },
  {
    title: "24/7 Emergency Response",
    description: "Instant medical triage and round-the-clock emergency obstetric care ready at all times for mothers and patients in need.",
    icon: "Clock"
  },
  {
    title: "All Under One Roof",
    description: "Consultation, pharmacy, ultrasound, laboratory diagnostics, and surgical admission conveniently situated in a single complex.",
    icon: "CheckCircle2"
  }
];
