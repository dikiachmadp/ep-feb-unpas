import { FiBookOpen, FiUsers, FiGlobe, FiFileText } from 'react-icons/fi'

export const NAV_ROUTES = [
  { key: 'home', path: '/' },
  { key: 'profile', path: '/profil' },
  { key: 'academics', path: '/akademik' },
  { key: 'student', path: '/mahasiswa' },
  { key: 'registration', path: '/pendaftaran' },
  { key: 'news', path: '/berita-kegiatan' },
];

export const FEATURE_ICONS = {
  curriculum: FiBookOpen,
  research: FiFileText,
  network: FiUsers,
  international: FiGlobe,
};

export const HOME_DATA = {
    hero: {
        badge: "Accredited Excellent",
        title: "Study Program",
        subtitle: "Economic Development",
        description: "Faculty of Economics and Business - Pasundan University",
        cta_primary: "Register Now",
        cta_secondary: "Contact Us",
        stats: [
            { key: 'students', value: '180+' },
            { key: 'lecturers', value: '8' },
            { key: 'years', value: '30+' },
            { key: 'accreditation', value: 'Unggul' },
        ]
    },
    why: {
        title: "Why Economic Development?",
        subtitle: "Our Excellence",
        description: "The FEB UNPAS Economic Development Study Program offers a modern curriculum relevant to industry needs and national development.",
        features: {
            curriculum: {
                title: "IQF-Based Curriculum",
                desc: "A curriculum constantly updated according to the Indonesian Qualifications Framework and job market demands."
            },
            research: {
                title: "Research & Community Service",
                desc: "Active in research and community service activities contributing to regional development."
            },
            network: {
                title: "Broad Alumni Network",
                desc: "Alumni are spread across various government agencies, financial institutions, and leading companies."
            },
            international: {
                title: "International Outlook",
                desc: "Student exchange programs and research collaborations with international universities and institutions."
            }
        }
    },
    promo: {
        label: "Featured Program",
        title: "Merdeka Belajar Curriculum",
        desc: "Learning flexibility with integrated MBKM programs",
        button: "Learn More"
    },
    news: {
        title: "News & Events",
        subtitle: "Latest updates",
        button: "See All",
        items: [
            {
                title: "2024 National Seminar on Economic Development",
                date: "March 15, 2024",
                excerpt: "The Economic Development Study Program held a national seminar on Indonesia's digital economic transformation.",
                category: "Seminar"
            },
            {
                title: "EP Students Win National PKM Award",
                date: "February 22, 2024",
                excerpt: "A team of Economic Development students won the top award in the National Student Creativity Program.",
                category: "Achievement"
            },
            {
                title: "Industrial Visit to Bank Indonesia",
                date: "February 8, 2024",
                excerpt: "An industrial visit to Bank Indonesia provided direct insights into national monetary policy.",
                category: "Activity"
            }
        ]
    },
    cta: {
        badge: "New Student Admission",
        title: "Ready to Join Us?",
        desc: "Register now and become part of an academic community dedicated to the progress of Indonesia's economy.",
        button: "Register Now"
    }
};

export const PROFILE_DATA = {
    title: "Study Program Profile",
    subtitle: "About Us",
    hero_badge: "Explore Our Essence",
    nav_menu: [
        { id: "sejarah", label: "History", icon: "FiClock" },
        { id: "logo", label: "Identity", icon: "FiHexagon" },
        { id: "visimisi", label: "Vision Mission", icon: "FiTarget" },
        { id: "keunggulan", label: "Excellence", icon: "FiStar" },
        { id: "capaian", label: "Achievements", icon: "FiAward" },
        { id: "fasilitas", label: "Facilities", icon: "FiMapPin" }
    ],
    history: {
        title: "Study Program History",
        footer: "Continuing to transform into a leading economics faculty in West Java.",
        timeline_label: "Timeline",
        content: [
            "The Economic Development Study Program of the Faculty of Economics and Business, Pasundan University (FEB UNPAS), is a strategic program in the development of economic education in Bandung and West Java. Located in the heart of Bandung, this program was born as a response to complex national economic development needs and the increasing demand for experts in economic development.",
            "The history of the Economic Development Study Program began in 1983, marked by the granting of the operational license through the Decree of the Directorate General of Higher Education, Ministry of Education and Culture of the Republic of Indonesia. Academic legality was further strengthened by the Decree of the Minister of Education and Culture No. 10427/0/1985 dated October 5, 1985, which became the milestone for formal economic education at Pasundan University.",
            "In line with the development of educational quality, on August 5, 1990, the Economics Study Program obtained 'Recognized' status through Decree No. 0702/0/1990. Sustained academic quality and governance led to an upgrade to 'Equalized' status based on Decree No. 07/DIKTI/KEP/1993. This status confirmed that the educational quality was on par with state universities at that time.",
            "Entering the era of national higher education quality assurance reform, since 1995, the government implemented an accreditation mechanism by an independent body, the National Accreditation Board for Higher Education (BAN-PT). Adapting to this policy, in 1996, the Economics Study Program underwent its first reaccreditation and achieved a 'B' (Good) rank.",
            "A commitment to academic quality improvement was shown through curriculum strengthening, lecturer quality enhancement, research development, and network expansion. These efforts paid off in 2005 when the program upgraded its accreditation rank from 'B' to 'A' (Excellent).",
            "This achievement was not a one-time event; it was consistently maintained. In the 2010 reaccreditation, the program again achieved an 'A' rank, which was maintained in 2016, valid until 2021. This consistency reflects a sustainable culture of quality and strong academic governance within the FEB UNPAS Economic Development Study Program.",
            "The peak of quality achievement was marked by the Decree of the Executive Director of BAN-PT No. 4401/SK/BAN-PT/Ak.KP/S/V/2024 dated May 21, 2024, which granted the Economic Development Study Program the 'EXCELLENT' (UNGGUL) status. This rank is national recognition for education quality, research, community service, governance, and tangible contributions to regional and national economic development.",
            "With a journey spanning over four decades, the FEB Pasundan University Economic Development Study Program continues to transform into an adaptive center for economic development science, community-oriented, and committed to producing excellent, professional, and globally competitive graduates."
        ],
        milestones: [
            { year: "1983", event: "Operational license from DGHE." },
            { year: "1985", event: "Formal legality via Ministerial Decree." },
            { year: "2005", event: "Achieved 'A' Accreditation Rank." },
            { year: "2024", event: "Achieved 'EXCELLENT' Accreditation." }
        ]
    },
    identity: {
        title: "Visual Philosophy & Meaning",
        description: "The Economics Study Program logo at FEB Pasundan University is a visual representation of academic identity, scientific values, and future development direction. The logo features a stylized letter 'E' as the main symbol representing Economics, built from three dynamic curved elements moving upwards.",
        approach_title: "Scientific Approach",
        approach_desc: "The curved shapes symbolize a comprehensive, adaptive, and sustainable approach to economic science, while reflecting the synergy between education, research, and community service as the pillars of higher education.",
        growth_title: "Spirit of Growth",
        growth_desc: "The upward-pointing direction illustrates optimism, growth, and transformation, showing the commitment to producing graduates who continue to develop, excel academically, and compete nationally and globally.",
        closing: "Overall, the logo reflects a progressive, future-oriented academic identity based on professionalism and real contributions to societal economic development.",
        labels: {
            construction: "Symbol Construction",
            official_mark: "Official Study Program Mark",
            philosophy: "Shape Philosophy",
            color_palette: "Official Color Palette",
            typography: "Typography System",
            headline_font: "Headline Font (Display)",
            body_font: "Body Font (Content)"
        },
        colors: {
            primary_name: "Forest Green",
            primary_desc: "Represents growth, sustainability, balance, and a commitment to inclusive economic development.",
            accent_name: "Gold",
            accent_desc: "Symbolizes excellence, achievement, and the intellectual value that is the primary goal of the educational process."
        }
    },
    vision: {
        title: "Vision",
        text: "To become a leading study program in producing competent economics graduates recognized nationally and internationally in the fields of Governance, Banking, Entrepreneurship, and Academia or Economic Research Institutions, upholding Islamic values and Sundanese culture by 2037."
    },
    mission: {
        title: "Mission",
        items: [
            "To organize high-quality, relevant, and adaptive economic development education in line with science and technology developments.",
            "To conduct innovative scientific research in economic development to contribute to knowledge and national development.",
            "To implement community service that benefits the improvement of public welfare.",
            "To develop strategic collaborations with various national and international institutions to enhance academic quality and professional networks.",
            "To create a conducive academic environment, based on integrity and Islamic values in campus life."
        ]
    },
    objectives: {
        title: "Study Program Objectives",
        items: [
            "To produce competent, professional, and ethical graduates in the field of economic development.",
            "To produce research and scientific publications recognized nationally and internationally.",
            "To provide real contributions to society through sustainable community service programs.",
            "To build strategic partnerships to enhance graduate quality and program relevance."
        ]
    },
    advantages: {
        title: "Our Value Added",
        items: [
            { title: "Adaptive Curriculum", desc: "Aligned with the needs of the financial industry and global digital business." },
            { title: "Expert Faculty", desc: "A combination of doctoral academics and experienced corporate practitioners." },
            { title: "Digital Ecosystem", desc: "A learning environment with access to the latest economic data platforms." },
            { title: "Professional Certification", desc: "Graduates are equipped with internationally recognized competency certifications." }
        ]
    },
    achievements: {
        title: "Milestones & Accreditation",
        subtitle: "Achievements",
        footer: "Towards Sustainable Transformation & Academic Internationalization",
        items: [
            { year: "1983", title: "Operational License", desc: "The Economics Study Program was established through an operational license by the DGHE, Ministry of Education and Culture RI." },
            { year: "1985", title: "Legality Strengthening", desc: "Obtained academic legality through Ministerial Decree No. 10427/0/1985 as a formal milestone." },
            { year: "1990", title: "Recognized Status", desc: "Obtained 'Recognized' status based on Ministerial Decree No. 0702/0/1990." },
            { year: "1993", title: "Equalized Status", desc: "Upgraded to 'Equalized' status, indicating quality on par with state universities." },
            { year: "1996", title: "First National Accreditation", desc: "Underwent the first national accreditation by BAN-PT and achieved a 'B' rank." },
            { year: "2005", title: "Accreditation A", desc: "Successfully improved academic quality, achieving the 'A' (Excellent) rank from BAN-PT." },
            { year: "2010", title: "Quality Consistency", desc: "Maintained the 'A' Accreditation, showing consistency in education and governance." },
            { year: "2016", title: "Re-Accreditation A", desc: "Successfully maintained the 'A' rank from BAN-PT (valid until 2021)." },
            { year: "2020", title: "MBKM Curriculum Grant", desc: "Received the Merdeka Belajar Kampus Merdeka (MBKM) curriculum grant for adaptive transformation." },
            { year: "2021", title: "Quality Certification", desc: "Maintained the 'A' rank accreditation from BAN-PT." },
            { year: "2022", title: "PKKM Grant", desc: "Won the Competitive Campus Program (PKKM) grant from the Ministry of Education for learning quality enhancement." },
            { year: "2024", title: "EXCELLENT Rank", desc: "Achieved the highest 'EXCELLENT' (UNGGUL) rank based on BAN-PT Decree No. 4401/SK/BAN-PT/Ak.KP/S/V/2024." },
            { year: "2025", title: "AACSB International Member", desc: "Became a member of the AACSB international accreditation body as a strategic step toward global business education standards." }
        ]
    },
    facilities: {
        title: "Campus Infrastructure",
        footer: "Global standard facilities to support student academic potential.",
        items: [
            { name: "Library", icon: "FiMapPin", desc: "Access to book collections, journals, and the latest economic databases", img: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800" },
            { name: "Computer Lab", icon: "FiBox", desc: "Computers equipped with the latest economic data analysis software", img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800" },
            { name: "Seminar Room", icon: "FiZap", desc: "Seminar room with complete audio-visual facilities", img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800" },
            { name: "Discussion Area", icon: "FiTarget", desc: "Open discussion areas for collaboration and brainstorming", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800" },
            { name: "Investment Gallery", icon: "FiAward", desc: "Investment corner with stock market info and global economic data", img: "https://images.unsplash.com/photo-1611974717535-7c805a0a7d53?q=80&w=800" },
            { name: "Hybrid Classroom", icon: "FiEye", desc: "Hybrid-ready classrooms for interactive learning", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800" }
        ]
    }
};

export const ACADEMICS_DATA = {
    subtitle: "Academics",
    hero_title: "Economic Development",
    graduate_profile_subtitle: "Graduate Profile",
    graduate_profile_title: "Main Graduate Profile",
    graduate_standard_label: "SKL & CLO STANDARDS",
    curriculum_title: "Curriculum Structure",
    // ... other existing fields
    concentration: {
        title: "Study Concentrations",
        items: [
            {
                name: "Monetary & Banking Economics",
                desc: "Studying monetary policy, banking systems, and macro-financial management.",
                courses: ["Monetary Economics", "Banking Management", "Fiscal Policy", "Capital Markets"]
            },
            {
                name: "Regional Planning & Development",
                desc: "Focusing on regional development planning, regional autonomy, and public policy.",
                courses: ["Regional Planning", "Regional Economics", "Public Policy", "Fiscal Decentralization"]
            },
            {
                name: "Resource & Environmental Economics",
                desc: "Examining natural resource management and environmental policy in sustainable development.",
                courses: ["Environmental Economics", "Natural Resource Economics", "Sustainable Development", "Green Economy"]
            }
        ]
    },
    prospects: {
        title: "Career Prospects",
        items: [
            { icon: "building", title: "Government Agencies", desc: "Ministry of Finance, Bappenas, Bank Indonesia, BPS, and regional agencies." },
            { icon: "bank", title: "Financial Institutions", desc: "Banking, OJK, financial SOEs, and financing institutions." },
            { icon: "chart", title: "Economic Consultants", desc: "Development consultants, policy analysts, and economic researchers." },
            { icon: "academic", title: "Academia & Researchers", desc: "Lecturers, researchers in national and international research institutions." }
        ]
    }
};

export const CONTACT_DATA = {
    title: "Contact Us",
    subtitle: "Contact & Location",
    description: "We are ready to help. Feel free to reach out to us through the following communication channels.",
    address: { title: "Address", value: "Jl. Tamansari No. 6-8, Bandung 40116, West Java, Indonesia" },
    phone: { title: "Phone", value: "0811-2046-768" },
    email: { title: "Email", value: "prodi.ekonomi.feb@unpas.ac.id" },
    hours: { title: "Operational Hours", value: "Monday – Friday: 08:00 AM – 04:00 PM WIB" },
    form: {
        subtitle: "Form",
        title: "Send a Message",
        fields: {
            name: "Full Name",
            email: "Email Address",
            subject: "Subject",
            message: "Message"
        },
        submit: "Send Message",
        placeholders: {
            name: "Enter your full name",
            email: "Enter your email address",
            subject: "What is your inquiry about?",
            message: "Write your message here..."
        },
        responses: {
            success: "Your message has been sent successfully! We will contact you soon.",
            error: "An error occurred. Please try again."
        }
    },
    brochure: {
        title: "Registration Brochure",
        subtitle: "Brochure & Information",
        download: {
            title: "Download Brochure",
            subtitle: "Click to download printable version"
        }
    },
    extra_info: {
        title: "Additional Information",
        items: [
            "Direct visits are welcomed during working hours",
            "Academic consultation can be scheduled with the supervising lecturer according to the student's needs.",
            "For academic questions, please contact the academic department via the email or telephone number provided."
        ]
    },
    cashback: {
        badge: "New Student Special Program",
        title: "Get Cashback of Rp3.000.000 Per Year",
        description: "Register yourself right now.",
        button: "Register Now"
    }
};

export const FOOTER_DATA = {
    tagline: "Creating Reliable Economists for Indonesia",
    links_title: "Quick Links",
    contact_title: "Contact",
    social_title: "Follow Us",
    copyright: "Economic Development Study Program - FEB UNPAS. All Rights Reserved.",
    faculty: "Faculty of Economics and Business",
    university: "Pasundan University",
    location: "Our Location"
};

export const NAV_DATA = {
    home: "Home",
    profile: "Profile",
    academics: "Academics",
    faculty: "Faculty",
    contact: "Contact",
    language: "ID",
    student: "Student",
    registration: "Registration",
    news: "News & Events"
};

export const NEWS_PAGE_DATA = {
    hero: "Latest News",
    title: "Campus News",
    all: "All",
    empty: "No news found for this category."
};
