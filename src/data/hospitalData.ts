import { IMAGES } from '../assets/images';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'cataract' | 'retina' | 'cornea' | 'optics' | 'general' | 'pediatric';
  tagline: string;
  description: string;
  keyExaminations: string[];
  treatmentOptions: string[];
  durationMinutes: number;
  preparationTip: string;
  icon: string;
}

export interface DoctorItem {
  id: string;
  name: string;
  title: string;
  degrees: string;
  subspecialty: string;
  experienceYears: number;
  fellowships: string[];
  languages: string[];
  availableDays: string[];
  bio: string;
  avatarSeed: string;
  image: string;
}

export interface TechItem {
  id: string;
  name: string;
  manufacturer: string;
  clinicalApplication: string;
  accuracy: string;
  benefit: string;
  details: string;
}

export interface AnatomyPart {
  id: string;
  name: string;
  latinName: string;
  xPercent: number; // For interactive diagram mapping
  yPercent: number;
  functionDesc: string;
  commonPathologies: string[];
  diagnosticMethod: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'general' | 'prep' | 'emergency';
}

export const HOSPITAL_INFO = {
  name: 'Oculus Ophthalmic Hospital & Vision Institute',
  shortName: 'Oculus Vision',
  tagline: 'Precision Ophthalmology & Compassionate Vision Care',
  emergencyPhone: '+1 (800) 847-4660',
  mainPhone: '+1 (800) 555-3937',
  email: 'care@oculuseyehospital.org',
  address: '450 Precision Parkway, Medical District, Suite 100',
  city: 'San Francisco, CA 94158',
  hours: {
    weekdays: 'Monday – Friday: 7:30 AM – 6:30 PM',
    saturday: 'Saturday: 8:00 AM – 2:00 PM',
    sunday: 'Sunday: Urgent Triage by On-Call Specialist Only',
    emergency: '24/7 Ophthalmic Trauma & Acute Glaucoma On-Call Unit',
  },
  stats: [
    { label: 'Patient Evaluations Conducted', value: 28500, suffix: '+' },
    { label: 'Board-Certified Subspecialists', value: 18, suffix: ' MDs' },
    { label: 'Surgical Precision Rate', value: 99.8, suffix: '%' },
    { label: 'Years of Clinical Excellence', value: 34, suffix: ' Yrs' },
  ]
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'comprehensive-checkups',
    name: 'Comprehensive Eye & Vision Assessment',
    category: 'general',
    tagline: 'In-depth microscopic slit lamp, intraocular pressure & macular health screening',
    description: 'A multi-parameter evaluation of visual acuity, refractive status, ocular muscle mobility, pupil response, corneal curvature, and dilated fundus examination to detect subtle systemic and ocular conditions early.',
    keyExaminations: ['Autorefraction & wavefront analysis', 'Goldmann applanation tonometry', 'High-definition digital fundus imaging', 'Slit-lamp biomicroscopy of anterior segment'],
    treatmentOptions: ['Corrective prescriptions', 'Preventive lifestyle guidance', 'Baseline systemic health linkage', 'Early anomaly referral'],
    durationMinutes: 45,
    preparationTip: 'Pupil dilation may temporarily blur close vision for 2-4 hours. Please bring sunglasses for your journey home.',
    icon: 'Eye',
  },
  {
    id: 'cataract-evaluation',
    name: 'Cataract Evaluation & Micro-Incision Surgery',
    category: 'cataract',
    tagline: 'Bladeless femtosecond laser and premium multifocal intraocular lens implants',
    description: 'Restoring crisp, vibrant color and clarity through sub-2.2mm micro-coaxial phacoemulsification or laser-assisted lens replacement tailored to your individual lifestyle and refractive goals.',
    keyExaminations: ['IOLMaster 700 optical biometry', 'Endothelial cell specular microscopy', 'Corneal topography & astigmatic axis mapping', 'Macular OCT safety confirmation'],
    treatmentOptions: ['Extended Depth of Focus (EDOF) lenses', 'Toric astigmatism-correcting IOLs', 'Trifocal presbyopia-correcting implants', 'Monofocal distance clarity'],
    durationMinutes: 60,
    preparationTip: 'Discontinue soft contact lenses 3 days prior to your surgical biometry measurements.',
    icon: 'Sparkles',
  },
  {
    id: 'glaucoma-screening',
    name: 'Glaucoma Early Detection & Trabecular Care',
    category: 'retina',
    tagline: 'Preserving optic nerve fibres with micro-pulse laser and gentle pressure modulation',
    description: 'Often called the silent thief of sight, glaucoma requires precise monitoring of retinal nerve fiber layers (RNFL) and aqueous humor outflow to arrest visual field loss before it is noticed.',
    keyExaminations: ['Humphrey 24-2 Swedish Interactive Thresholding (SITA)', 'Spectral-Domain OCT of optic nerve head & ganglion cell complex', 'Pachymetry (corneal thickness measurement)', 'Gonioscopy (iridocorneal angle grading)'],
    treatmentOptions: ['Selective Laser Trabeculoplasty (SLT)', 'Minimally Invasive Glaucoma Surgery (MIGS)', 'Prostaglandin analogue drop regimens', 'Endocyclophotocoagulation'],
    durationMinutes: 50,
    preparationTip: 'Bring your current pressure-lowering drops and time of last administration.',
    icon: 'Activity',
  },
  {
    id: 'retina-macula',
    name: 'Vitreoretinal & Macular Subspecialty Clinic',
    category: 'retina',
    tagline: 'Specialized interventions for diabetic retinopathy, wet/dry AMD & retinal tears',
    description: 'Advanced posterior segment care utilizing high-speed optical coherence tomography angiography and targeted intravitreal pharmacotherapy to safeguard central fine vision and peripheral integrity.',
    keyExaminations: ['Swept-Source OCT Angiography (OCTA)', '200-degree ultra-widefield fundus autofluorescence', 'B-Scan ocular ultrasonography', 'Fluorescein angiography'],
    treatmentOptions: ['Anti-VEGF intravitreal micro-injections', 'Argon panretinal photocoagulation', 'Pneumatic retinopexy', 'Micro-gauge pars plana vitrectomy'],
    durationMinutes: 75,
    preparationTip: 'Dilation is mandatory for retinal visits. Having an accompanied driver is strongly advised.',
    icon: 'Shield',
  },
  {
    id: 'cornea-surface',
    name: 'Cornea, Keratoconus & Ocular Surface Center',
    category: 'cornea',
    tagline: 'Anterior segment reconstruction, corneal cross-linking & therapeutic keratoplasty',
    description: 'Targeted therapeutics for corneal dystrophies, ectasias, recurrent erosions, and infectious keratitis using advanced anterior segment tomographic mapping and gentle biopolymer protective shields.',
    keyExaminations: ['Scheimpflug corneal tomography (Pentacam)', 'Anterior segment OCT', 'Tear film osmolarity & MMP-9 inflammatory biomarker assay', 'Corneal wavefront aberrometry'],
    treatmentOptions: ['Corneal cross-linking (CXL)', 'Phototherapeutic keratectomy (PTK)', 'Custom scleral contact lens fitting', 'Endothelial keratoplasty (DMEK/DSAEK)'],
    durationMinutes: 45,
    preparationTip: 'Avoid rubbing eyes or wearing rigid lenses for 7 days prior to tomography.',
    icon: 'Layers',
  },
  {
    id: 'dry-eye-assessment',
    name: 'Meibomian Gland & Dry Eye Thermal Assessment',
    category: 'cornea',
    tagline: 'Restoring tear film lipid stability with LipiView infrared imaging & thermal pulsation',
    description: 'Chronic stinging, gritty sensations, and fluctuating blur frequently originate from evaporative dry eye caused by blocked meibomian glands. Our specialized suite addresses root causes rather than superficial drops.',
    keyExaminations: ['Non-invasive tear break-up time (NIBUT)', 'Infrared meibography gland dropout grading', 'Lipid layer thickness interferometry', 'Lissamine green ocular surface staining'],
    treatmentOptions: ['Vectored thermal pulsation (LipiFlow)', 'Intense Pulsed Light (IPL) for ocular rosacea', 'Autologous serum tears', 'Punctal occlusion biocompatible plugs'],
    durationMinutes: 40,
    preparationTip: 'Please refrain from using oil-based facial moisturizers or eye cosmetics on the day of testing.',
    icon: 'Droplets',
  },
  {
    id: 'paediatric-ophthalmology',
    name: 'Paediatric Eye Care & Strabismus Clinic',
    category: 'pediatric',
    tagline: 'Child-friendly amblyopia screening, binocular vision therapy & muscle balancing',
    description: 'Early childhood vision development is critical for lifelong binocular clarity. Our compassionate specialists utilize gentle, play-adapted objective skiascopy and computerized stereoscopic testing.',
    keyExaminations: ['Cycloplegic retinoscopy with child-friendly targets', 'Lang & Titmus 3D stereopsis test', 'Prism cover ocular alignment measurements', 'Orthoptic binocular assessment'],
    treatmentOptions: ['Amblyopia patch & optical penalization therapy', 'Adjustable suture strabismus realignment', 'Myopia progression control lenses & low-dose atropine', 'Custom pediatric optical frames'],
    durationMinutes: 50,
    preparationTip: 'Feel free to bring your child’s favourite toy or tablet for comfort during drop absorption.',
    icon: 'Heart',
  },
  {
    id: 'spectacles-refractive',
    name: 'Refractive Vision Correction & Advanced Optics',
    category: 'optics',
    tagline: 'Custom wavefront refraction, Implantable Collamer Lenses (ICL) & specialized prism lenses',
    description: 'For patients seeking spectacle independence or struggling with complex optical aberrations, our vision correction unit provides definitive evaluation for laser surface ablation, SMILE, or phakic ICL.',
    keyExaminations: ['Total ocular wavefront aberrometry', 'Mesopic & photopic pupillometry', 'White-to-white anterior chamber depth sizing', 'Refractive subjective cross-cylinder refining'],
    treatmentOptions: ['EVO+ Implantable Collamer Lens (ICL)', 'Wavefront-guided customized PRK', 'Precision digital progressive lenses', 'Computer vision ergonomic lenses'],
    durationMinutes: 55,
    preparationTip: 'Bring all current glasses including computer and reading pairs to your consultation.',
    icon: 'Glasses',
  },
  {
    id: 'emergency-eye-care',
    name: '24/7 Urgent Ophthalmic Triage & Foreign Body Care',
    category: 'general',
    tagline: 'Immediate consultation for sudden vision loss, blunt trauma, flashes/floaters & chemical exposure',
    description: 'Acute ophthalmic emergencies require rapid triage within the golden hour to prevent irreversible retinal or corneal injury. Direct access to on-call vitreoretinal and corneal surgeons.',
    keyExaminations: ['Immediate neutral pH chemical balance check', 'Seidel test for open-globe penetration', 'Urgent dilated peripheral indirect ophthalmoscopy', 'Corneal rust ring and metallic foreign body microscopic isolation'],
    treatmentOptions: ['Emergency saline neutralization irrigation', 'Microscopic corneal foreign body debridement', 'Urgent intravitreal antibiotic/steroid injection', 'Emergent intraocular pressure paracentesis'],
    durationMinutes: 30,
    preparationTip: 'For chemical injuries, begin flushing eyes continuously with clean water immediately before traveling to the hospital.',
    icon: 'AlertCircle',
  },
  {
    id: 'general-ophthalmology',
    name: 'General Medical Ophthalmology Consultations',
    category: 'general',
    tagline: 'Systemic-ocular cross evaluations, hypertensive retinopathy & neuro-ophthalmic screening',
    description: 'Close coordination between ophthalmology and systemic internal medicine to monitor how diabetes, thyroid diseases, rheumatoid arthritis, and neurological conditions manifest in the delicate ocular microvasculature.',
    keyExaminations: ['Pupillary light reflex afferent defect testing (RAPD)', 'Cranial nerve 3, 4, 6 motility assessment', 'Microvascular caliber ratio imaging', 'Color desaturation and Ishihara testing'],
    treatmentOptions: ['Multidisciplinary clinical reports', 'Steroid-sparing immunosuppression monitoring', 'Targeted topical anti-inflammatory regimens', 'Collaborative neurology consults'],
    durationMinutes: 40,
    preparationTip: 'Bring recent laboratory results or referral notes from your primary care physician.',
    icon: 'Stethoscope',
  }
];

export const DOCTORS_LIST: DoctorItem[] = [
  {
    id: 'dr-elena-vance',
    name: 'Dr. Elena Vance, MD, FRCOphth',
    title: 'Chief Medical Officer & Senior Cataract/Refractive Surgeon',
    degrees: 'MD, Harvard Medical School · Fellow of Royal College of Ophthalmologists',
    subspecialty: 'Femtosecond Cataract Surgery, Presbyopia & ICL Implants',
    experienceYears: 22,
    fellowships: ['Moorfields Eye Hospital, London (Anterior Segment)', 'Johns Hopkins Wilmer Eye Institute'],
    languages: ['English', 'French', 'German'],
    availableDays: ['Mon', 'Wed', 'Thu'],
    bio: 'Pioneered micro-coaxial phacoemulsification techniques with over 14,000 successful lens restorations. Known for compassionate patient dialogue and custom wavefront optical matching.',
    avatarSeed: 'elena',
    image: IMAGES.doctorElena,
  },
  {
    id: 'dr-julian-mercer',
    name: 'Dr. Julian Mercer, MD, PhD',
    title: 'Director of Vitreoretinal Surgery & Macular Research',
    degrees: 'MD, PhD Stanford School of Medicine',
    subspecialty: 'Retinal Detachment, Macular Hole & Diabetic Retinopathy',
    experienceYears: 18,
    fellowships: ['Bascom Palmer Eye Institute (Vitreoretinal Disease)', 'UCSF Eye Center'],
    languages: ['English', 'Spanish'],
    availableDays: ['Tue', 'Thu', 'Fri'],
    bio: 'International authority on high-resolution OCT-guided retinal membrane peeling and novel micro-dosing therapies for age-related macular degeneration.',
    avatarSeed: 'julian',
    image: IMAGES.doctorJulian,
  },
  {
    id: 'dr-sophia-al-mansoor',
    name: 'Dr. Sophia Al-Mansoor, MD',
    title: 'Head of Glaucoma & Anterior Segment Reconstruction',
    degrees: 'MD, Columbia University Vagelos College of Physicians and Surgeons',
    subspecialty: 'Micro-Invasive Glaucoma Surgery (MIGS) & Corneal Cross-Linking',
    experienceYears: 15,
    fellowships: ['Duke University Eye Center (Glaucoma Fellowship)', 'Singapore National Eye Centre'],
    languages: ['English', 'Arabic'],
    availableDays: ['Mon', 'Tue', 'Wed', 'Sat'],
    bio: 'Dedicated to preserving optic nerve vitality using gentle selective laser trabeculoplasty and micro-stents to reduce medication dependency and maintain active lifestyles.',
    avatarSeed: 'sophia',
    image: IMAGES.doctorSophia,
  },
  {
    id: 'dr-arthur-chen',
    name: 'Dr. Arthur Chen, MD',
    title: 'Director of Paediatric Ophthalmology & Adult Strabismus',
    degrees: 'MD, University of Pennsylvania Perelman School of Medicine',
    subspecialty: 'Pediatric Vision Development, Amblyopia & Ocular Motility',
    experienceYears: 16,
    fellowships: ['Boston Children’s Hospital (Pediatric Ophthalmology)', 'CHOP Eye Center'],
    languages: ['English', 'Mandarin'],
    availableDays: ['Wed', 'Fri', 'Sat'],
    bio: 'Creates a calming, joy-filled environment for children and infants. Specializes in adjustable-suture strabismus surgery and evidence-based childhood myopia containment.',
    avatarSeed: 'arthur',
    image: IMAGES.doctorArthur,
  }
];

export const TECH_LIST: TechItem[] = [
  {
    id: 'oct-angiography',
    name: 'Spectral-Domain OCT Angiography (OCTA)',
    manufacturer: 'Heidelberg Spectralis Platform',
    clinicalApplication: 'Non-invasive 3D capillary mapping of macula & choroid',
    accuracy: 'Up to 3.9 μm axial resolution',
    benefit: 'Replaces intravenous dye injections with optical Doppler motion contrast, offering instant vascular mapping without allergic risk.',
    details: 'Allows our vitreoretinal team to detect choroidal neovascularization and diabetic ischemia months before visual symptoms manifest.'
  },
  {
    id: 'femtosecond-laser',
    name: 'Femtosecond Laser Surgical Platform',
    manufacturer: 'Ziemer Z8 High-Precision Mobile Optics',
    clinicalApplication: 'Bladeless corneal incisions, capsulorhexis & lens fragmentation',
    accuracy: 'Sub-micron energy precision with low suction pressure',
    benefit: 'Leaves adjacent corneal collagen untouched while sculpting perfect circular capsulotomies for optical centering of multifocal lenses.',
    details: 'Drastically reduces ultrasonic energy exposure inside the eye, accelerating post-operative corneal clarity within 24 hours.'
  },
  {
    id: 'pentacam-wavefront',
    name: 'Scheimpflug Anterior Segment Tomography',
    manufacturer: 'Oculus Pentacam AXL Wave',
    clinicalApplication: 'Total corneal refractive power & optical aberrations',
    accuracy: '138,000 true elevation points analyzed in 2 seconds',
    benefit: 'Detects early preclinical keratoconus and guarantees safety margin calculation prior to any refractive or cataract treatment.',
    details: 'Provides comprehensive posterior corneal curvature data, ensuring precise IOL power calculations even for post-LASIK eyes.'
  },
  {
    id: 'ultra-widefield-fundus',
    name: '200° Ultra-Widefield Retinal Imaging',
    manufacturer: 'Optos California Autofluorescence Suite',
    clinicalApplication: 'Pan-retinal scanning in a single capture through undilated pupils',
    accuracy: 'Captures 82% of the retina in 0.25 seconds',
    benefit: 'Reveals peripheral tears, asymptomatic detachments, and micro-aneurysms that standard 45° cameras fail to display.',
    details: 'Equipped with dual-wavelength laser autofluorescence to assess retinal pigment epithelium viability without dye toxicity.'
  }
];

export const ANATOMY_PARTS: AnatomyPart[] = [
  {
    id: 'cornea',
    name: 'Cornea',
    latinName: 'Cornea tunica',
    xPercent: 22,
    yPercent: 50,
    functionDesc: 'The transparent outermost dome that provides approximately two-thirds of the eye’s total optical focusing power, acting as a crystal-clear protective shield.',
    commonPathologies: ['Keratoconus', 'Corneal abrasions', 'Fuchs endothelial dystrophy', 'Dry eye epithelial breakdown'],
    diagnosticMethod: 'Slit-lamp biomicroscopy & Scheimpflug tomography'
  },
  {
    id: 'iris',
    name: 'Iris',
    latinName: 'Iris stroma',
    xPercent: 35,
    yPercent: 44,
    functionDesc: 'The pigmented muscular aperture of the eye with unique radial trabeculae, constricting and dilating to regulate incoming light onto the retina.',
    commonPathologies: ['Iritis / Anterior uveitis', 'Angle-closure narrow angles', 'Iris coloboma', 'Pigment dispersion syndrome'],
    diagnosticMethod: 'High-magnification slit lamp & dynamic gonioscopy'
  },
  {
    id: 'pupil',
    name: 'Pupil',
    latinName: 'Pupilla',
    xPercent: 42,
    yPercent: 50,
    functionDesc: 'The central dark aperture in the iris that expands (mydriasis) in dim light and contracts (miosis) under bright illumination, serving as an optical aperture stop.',
    commonPathologies: ['Relative Afferent Pupillary Defect (RAPD)', 'Anisocoria (unequal pupils)', 'Horner syndrome', 'Adie tonic pupil'],
    diagnosticMethod: 'Swinging flashlight pupil reflex examination & infrared pupillometry'
  },
  {
    id: 'lens',
    name: 'Crystalline Lens',
    latinName: 'Lens crystallina',
    xPercent: 48,
    yPercent: 50,
    functionDesc: 'A natural flexible biconvex crystal located behind the iris that fine-tunes light onto the retina, altering shape (accommodation) to switch between distance and reading.',
    commonPathologies: ['Age-related cataract', 'Presbyopia (loss of near focusing)', 'Lens subluxation', 'Posterior subcapsular opacification'],
    diagnosticMethod: 'Optical biometry (IOLMaster) & retroillumination photography'
  },
  {
    id: 'retina',
    name: 'Retina & Macula',
    latinName: 'Retina / Fovea centralis',
    xPercent: 78,
    yPercent: 50,
    functionDesc: 'The sensory neuro-epithelial layer containing millions of photoreceptor rods and cones that convert photon energy into electrical signals, with the central macula delivering high-definition 20/20 details.',
    commonPathologies: ['Age-related macular degeneration (AMD)', 'Diabetic retinopathy', 'Retinal vein occlusion', 'Rhegmatogenous detachment'],
    diagnosticMethod: 'High-definition Spectral-Domain OCT & Ultra-widefield imaging'
  },
  {
    id: 'optic-nerve',
    name: 'Optic Nerve',
    latinName: 'Nervus opticus (CN II)',
    xPercent: 90,
    yPercent: 54,
    functionDesc: 'The master biological optic cable comprising over 1.2 million nerve axons that convey visual electrical pulses directly from the retina to the visual cortex in the brain.',
    commonPathologies: ['Glaucomatous neuropathy', 'Optic neuritis', 'Papilledema (elevated intracranial pressure)', 'Ischemic optic neuropathy'],
    diagnosticMethod: 'Humphrey visual field testing & RNFL thickness OCT'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'general',
    question: 'When should I have a comprehensive eye examination?',
    answer: 'Healthy adults aged 20-39 should be screened every 2 years. From age 40 onward, baseline screening is critical because asymptomatic conditions such as glaucoma, early cataract, and macular shifts often begin without initial pain or vision warning signs. Patients with diabetes, hypertension, or family history of eye disease should receive annual dilated exams.'
  },
  {
    category: 'general',
    question: 'How do I schedule an appointment at Oculus Vision Institute?',
    answer: 'You can request an appointment directly through our online booking portal on this website, or call our care coordinators at +1 (800) 555-3937. You may select your preferred subspecialist, choose a convenient morning or afternoon consultation slot, and receive immediate SMS/email confirmation.'
  },
  {
    category: 'prep',
    question: 'What should I bring to my first hospital consultation?',
    answer: 'Please bring your current prescription eyeglasses and sunglasses for the return trip, your photo ID and medical insurance cards, an up-to-date list of systemic medications and eye drops, and any recent ophthalmic records or referral notes from your optometrist or primary physician.'
  },
  {
    category: 'prep',
    question: 'Will my pupils be dilated during the examination?',
    answer: 'Most comprehensive evaluations and retina consultations require pharmacologic pupil dilation drops. This allows our specialists to thoroughly inspect the peripheral retina, macula, and crystalline lens. Dilation typically causes light sensitivity and blurred near vision lasting 2 to 4 hours. We recommend bringing an accompanying driver.'
  },
  {
    category: 'emergency',
    question: 'What symptoms constitute an immediate ophthalmic emergency?',
    answer: 'Seek urgent triage immediately if you experience: sudden painless or painful loss of vision, a sudden shower of dark floating specks accompanied by flashes of light (arc-like sparks), a dark shadow or curtain pulling across your vision, chemical contact in the eye, severe ocular trauma, or an intensely red, painful eye with halos around lights.'
  },
  {
    category: 'general',
    question: 'Is modern cataract surgery painful or will I be awake?',
    answer: 'Cataract surgery is a gentle outpatient procedure taking under 15 minutes. The eye is thoroughly numbed with topical anesthetic drops—no needles into the eye are required. Patients remain comfortably relaxed with mild IV sedation, feeling light coolness and gentle irrigation, with zero sharp pain. Most return to light daily activities within 24 hours.'
  }
];

export const PATIENT_JOURNEY = [
  {
    step: '01',
    title: 'Book Your Consultation',
    desc: 'Reserve your appointment via our intuitive digital concierge or direct phone line. Tell us your concerns so we assign the right subspecialist.',
    detail: 'Instant confirmation with visit preparation guide sent to your device.'
  },
  {
    step: '02',
    title: 'Diagnostic Wavefront Mapping',
    desc: 'Our certified ophthalmic technicians conduct non-contact digital diagnostics including topography, tonometry, and OCT scans.',
    detail: 'Sub-micron accuracy creates an exact optical fingerprint of your eyes.'
  },
  {
    step: '03',
    title: 'Consult With Your Eye Specialist',
    desc: 'Your ophthalmologist performs a microscopic biomicroscopic slit-lamp exam and reviews your 3D retinal images side-by-side with you.',
    detail: 'Transparent, unhurried dialogue explaining every finding clearly.'
  },
  {
    step: '04',
    title: 'Personalised Care & Follow-Up',
    desc: 'Receive your tailored precision care plan—whether advanced surgical restoration, targeted medical drops, or specialty optics.',
    detail: 'Dedicated clinical coordinator for seamless lifelong vision monitoring.'
  }
];

export const TESTIMONIALS = [
  {
    patient: 'Marcus Vance',
    age: 58,
    procedure: 'Femtosecond Laser Cataract with EDOF Lens',
    surgeon: 'Dr. Elena Vance, MD',
    quote: 'For five years I felt like I was looking at the world through a fogged bathroom window. Dr. Vance restored crystal-clear 20/20 vision in both eyes. The next morning I could read street signs and my watch without glasses.',
    rating: 5,
    outcome: 'Spectacle-free intermediate & distance vision'
  },
  {
    patient: 'Seraphina Lin',
    age: 34,
    procedure: 'Keratoconus Corneal Cross-Linking (CXL)',
    surgeon: 'Dr. Sophia Al-Mansoor, MD',
    quote: 'When other clinics were puzzled by my progressive astigmatism, Dr. Al-Mansoor used the Pentacam tomography to pinpoint early keratoconus. The cross-linking stopped the progression completely. The clinical expertise here is world-class.',
    rating: 5,
    outcome: 'Corneal stability verified at 18-month follow-up'
  },
  {
    patient: 'David Henderson',
    age: 67,
    procedure: 'Diabetic Macular Edema Care & Anti-VEGF',
    surgeon: 'Dr. Julian Mercer, MD',
    quote: 'Dr. Mercer and his retinal team showed me the exact 3D layers of my retina before and after treatment. My central clarity was preserved thanks to their timely intervention. Truly an exceptional, reassuring hospital.',
    rating: 5,
    outcome: 'Visual acuity preserved from 20/70 to 20/25'
  }
];
