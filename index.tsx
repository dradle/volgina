import React, { useState, useEffect, createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Menu, X, ArrowRight, CheckCircle2, ChevronDown, ChevronUp, 
  Activity, Brain, Layers, LifeBuoy, Flower2, Search, Users, Circle, 
  Star, Quote, Phone, MapPin, Mail, Send
} from 'lucide-react';

// ==========================================
// 1. TYPES & CONSTANTS
// ==========================================

type Language = 'ru' | 'pl';

interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Education {
  year: string;
  title: string;
  institution: string;
  duration?: string;
}

interface SiteContent {
  nav: {
    about: string;
    methods: string;
    reviews: string;
    contacts: string;
  };
  hero: {
    badge: string;
    title: string;
    titleName: string;
    subtitle: string;
    cta: string;
    aboutBtn: string;
    tags: {
      med: string;
      jung: string;
      lgbt: string;
    };
    role: string;
  };
  about: {
    title: string;
    intro: string;
    expLabel: string;
    experience: string;
    memberships: string;
    featuresLabel: string;
    features: string[];
    eduTitle: string;
    eduShowMore: string;
    eduHide: string;
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    list: Service[];
  };
  reviews: {
    title: string;
    subtitle: string;
    list: Testimonial[];
  };
  contact: {
    title: string;
    subtitle: string;
    emailLabel: string;
    emailSub: string;
    tgLabel: string;
    phoneLabel: string;
    locLabel: string;
    faqTitle: string;
    list: FAQ[];
  };
  footer: {
    rights: string;
    disclaimer: string;
  };
  educationList: Education[];
}

const SectionId = {
  HERO: 'hero',
  ABOUT: 'about',
  SERVICES: 'services',
  REVIEWS: 'reviews',
  CONTACT: 'contact'
};

const CONTACT_INFO = {
  phone: "+48 668 388 874",
  whatsapp: "https://wa.me/48668388874",
  telegram: "https://t.me/volgina_violetta",
  telegramHandle: "@volgina_violetta",
  email: "vio.volgina@gmail.com",
  location: {
    ru: "г. Краков, Польша",
    pl: "Kraków, Polska"
  }
};

const EDUCATION_DATA = [
  {
    year: "2024",
    title: "Psychologia analityczna oraz psychoterapia jungowska",
    institution: "Stowarzyszenie Analityków Jungowskich"
  },
  {
    year: "2014 - 2015",
    title: "Врач-психотерапевт / Lekarz psychoterapeuta",
    institution: "Квалификационная комиссия МЗ РБ"
  },
  {
    year: "2008 - 2014",
    title: "Врач (Медико-психологическое дело) / Lekarz",
    institution: "Гродненский государственный медицинский университет"
  },
  {
    year: "2021",
    title: "Базовый курс аналитической психологии К.Г.Юнга",
    institution: "Белорусская ассоциация психотерапевтов (535 часов)"
  },
  {
    year: "2020",
    title: "Imaginative Körper-Psychotherapie, ImKP",
    institution: "Institut für Psychosomatische Medizin und Psychotherapie"
  },
  {
    year: "2019",
    title: "Символдрама (А1, В1) / Psychoterapia Leunerowska",
    institution: "МОО СРС КИП"
  },
  {
    year: "2018",
    title: "Introductory Weekend To Group Analytic Theory And Practice",
    institution: "The Institute of Group Analysis"
  },
  {
    year: "2010 - 2013",
    title: "Гештальт-терапия / Terapia Gestalt",
    institution: "Московский институт Гештальт-терапии и консультирования"
  }
];

const CONTENT: Record<'ru' | 'pl', SiteContent> = {
  ru: {
    nav: {
      about: 'Обо мне',
      methods: 'Методы',
      reviews: 'Отзывы',
      contacts: 'Контакты'
    },
    hero: {
      badge: 'Врач-психотерапевт',
      title: 'Виолетта Волгина',
      titleName: 'Виолетта Волгина',
      subtitle: ' — Глубинный путь к себе',
      cta: 'Связаться со мной',
      aboutBtn: 'Обо мне',
      tags: {
        med: 'Медицинское образование',
        jung: 'Юнгианский подход',
        lgbt: 'LGBTQ+ friendly'
      },
      role: 'Врач-психотерапевт'
    },
    about: {
      title: 'Обо мне',
      intro: 'Врач-психотерапевт. Нахожусь в продолжительной обучающей программе по юнгианскому анализу, прохожу личный анализ с 2020 года, работаю под еженедельной супервизией.',
      expLabel: 'Опыт работы:',
      experience: 'С 2014 года. Работала врачом в психиатрическом диспансере им. Бехтерева и в наркологическом отделении. Частная практика с 2017 года.',
      memberships: 'Член Польского сообщества аналитической психологии (PTPA). Обучаюсь в Stowarzyszenie Analityków Jungowskich.',
      featuresLabel: 'Особенности работы:',
      features: [
        'Работаю с лицами старше 18 лет',
        'Позиция сидя или лежа на кушетке',
        'Толерантна к ЛГБТК+ и религиозным взглядам'
      ],
      eduTitle: 'Образование и квалификация',
      eduShowMore: 'Показать все дипломы',
      eduHide: 'Свернуть'
    },
    services: {
      badge: 'Методы работы',
      title: 'Направления терапии',
      subtitle: 'Использую различные подходы для наиболее глубокой и эффективной работы с вашим запросом.',
      list: [
        {
          id: 'jungian',
          title: 'Юнгианский анализ',
          description: 'Глубинная работа с бессознательным, сновидениями и архетипами для обретения целостности.',
          iconName: 'Brain'
        },
        {
          id: 'integrative',
          title: 'Интегративный подход',
          description: 'Сочетание различных методик для наиболее эффективного решения индивидуальных проблем клиента.',
          iconName: 'Layers'
        },
        {
          id: 'crisis',
          title: 'Кризисная психология',
          description: 'Помощь в острых состояниях, проживании горя, потерь и резких жизненных изменений.',
          iconName: 'LifeBuoy'
        },
        {
          id: 'symboldrama',
          title: 'Символдрама',
          description: 'Метод работы с воображением и образами для мягкой проработки эмоциональных конфликтов.',
          iconName: 'Flower2'
        },
        {
          id: 'analytical',
          title: 'Аналитическая терапия',
          description: 'Длительная терапия, направленная на глубокое понимание себя и причин своих поступков.',
          iconName: 'Search'
        },
        {
          id: 'group',
          title: 'Группанализ',
          description: 'Работа в группе, позволяющая увидеть свои паттерны поведения через взаимодействие с другими.',
          iconName: 'Users'
        }
      ]
    },
    reviews: {
      title: 'Отзывы клиентов',
      subtitle: 'Истории людей, которые изменили свою жизнь.',
      list: [
        {
          id: '1',
          name: 'Марина',
          text: 'Виолетта помогла мне справиться с тревогой, которая мучила меня годами. Очень глубокий и профессиональный подход. Чувствую себя в безопасности на сеансах.',
          rating: 5
        },
        {
          id: '2',
          name: 'Алексей',
          text: 'Пришел в терапию с кризисом среднего возраста. Работаем в юнгианском подходе, разбираем сны. Это открыло для меня совершенно новые грани моей личности.',
          rating: 5
        },
        {
          id: '3',
          name: 'Елена',
          text: 'Благодарю за помощь в сложный период развода. Виолетта — очень чуткий врач, который помогает не просто пережить боль, но и найти в этом ресурс.',
          rating: 5
        }
      ]
    },
    contact: {
      title: 'Контакты',
      subtitle: 'Для записи на встречу предпочтительнее писать на почту или в Telegram',
      emailLabel: 'Email',
      emailSub: 'Предпочтительный способ связи',
      tgLabel: 'Telegram',
      phoneLabel: 'Телефон',
      locLabel: 'Локация',
      faqTitle: 'Частые вопросы',
      list: [
        {
          question: "С какими запросами вы работаете?",
          answer: "Я работаю с тревожными и депрессивными состояниями, кризисами, проблемами в отношениях, зависимостями, психосоматикой, вопросами самоопределения и поиска смысла."
        },
        {
          question: "Как записаться на прием?",
          answer: "Предпочтительнее всего написать мне на электронную почту или связаться через Telegram."
        },
        {
          question: "Работаете ли вы онлайн?",
          answer: "Да, я провожу консультации онлайн. Также возможен очный прием в г. Краков."
        }
      ]
    },
    footer: {
      rights: 'Все права защищены.',
      disclaimer: 'Сайт носит информационный характер.'
    },
    educationList: EDUCATION_DATA
  },
  pl: {
    nav: {
      about: 'O mnie',
      methods: 'Metody',
      reviews: 'Opinie',
      contacts: 'Kontakt'
    },
    hero: {
      badge: 'Lekarz psychoterapeuta',
      title: 'Violetta Volgina',
      titleName: 'Violetta Volgina',
      subtitle: ' — Głęboka droga do siebie',
      cta: 'Skontaktuj się',
      aboutBtn: 'O mnie',
      tags: {
        med: 'Wykształcenie medyczne',
        jung: 'Podejście jungowskie',
        lgbt: 'LGBTQ+ friendly'
      },
      role: 'Lekarz psychoterapeuta'
    },
    about: {
      title: 'O mnie',
      intro: 'Lekarz psychoterapeuta. Jestem w trakcie długoterminowego szkolenia z analizy jungowskiej, przechodzę analizę własną od 2020 roku i pracuję pod cotygodniową superwizją.',
      expLabel: 'Doświadczenie zawodowe:',
      experience: 'Od 2014 roku. Pracowałam jako lekarz w szpitalu psychiatrycznym im. Bechteriewa oraz na oddziale narkologicznym. Praktyka prywatna od 2017 roku.',
      memberships: 'Członkini Polskiego Towarzystwa Psychologii Analitycznej (PTPA). Szkolę się w Stowarzyszeniu Analityków Jungowskich.',
      featuresLabel: 'Zasady pracy:',
      features: [
        'Pracuję z osobami powyżej 18 roku życia',
        'Praca w pozycji siedzącej lub na kozetce',
        'Przyjazna dla LGBTQ+ i otwarta na różne poglądy religijne'
      ],
      eduTitle: 'Wykształcenie i kwalifikacje',
      eduShowMore: 'Pokaż wszystkie dyplomy',
      eduHide: 'Zwiń'
    },
    services: {
      badge: 'Metody pracy',
      title: 'Obszary terapii',
      subtitle: 'Stosuję różne podejścia, aby jak najskuteczniej i najgłębiej pracować z Twoim problemem.',
      list: [
        {
          id: 'jungian',
          title: 'Analiza Jungowska',
          description: 'Głęboka praca z nieświadomością, snami i archetypami w celu odzyskania wewnętrznej integralności.',
          iconName: 'Brain'
        },
        {
          id: 'integrative',
          title: 'Podejście integracyjne',
          description: 'Łączenie różnych metod w celu najbardziej efektywnego rozwiązania indywidualnych problemów klienta.',
          iconName: 'Layers'
        },
        {
          id: 'crisis',
          title: 'Psychologia kryzysowa',
          description: 'Pomoc w ostrych stanach, przeżywaniu żałoby, straty i nagłych zmianach życiowych.',
          iconName: 'LifeBuoy'
        },
        {
          id: 'symboldrama',
          title: 'Psychoterapia Leunerowska',
          description: 'Metoda pracy z wyobraźnią i obrazami (Symboldrama) do łagodnego przepracowania konfliktów emocjonalnych.',
          iconName: 'Flower2'
        },
        {
          id: 'analytical',
          title: 'Psychoterapia analityczna',
          description: 'Długoterminowa terapia mająca na celu głębokie zrozumienie siebie i przyczyn swoich działań.',
          iconName: 'Search'
        },
        {
          id: 'group',
          title: 'Analiza grupowa',
          description: 'Praca w grupie, pozwalająca dostrzec swoje wzorce zachowań poprzez interakcje z innymi.',
          iconName: 'Users'
        }
      ]
    },
    reviews: {
      title: 'Opinie klientów',
      subtitle: 'Historie ludzi, którzy zmienili swoje życie.',
      list: [
        {
          id: '1',
          name: 'Marina',
          text: 'Violetta pomogła mi uporać się z lękiem, który męczył mnie latami. Bardzo głębokie i profesjonalne podejście. Czuję się bezpiecznie na sesjach.',
          rating: 5
        },
        {
          id: '2',
          name: 'Alex',
          text: 'Zgłosiłem się na terapię z kryzysem wieku średniego. Pracujemy w podejściu jungowskim, analizujemy sny. To otworzyło przede mną zupełnie nowe aspekty mojej osobowości.',
          rating: 5
        },
        {
          id: '3',
          name: 'Elena',
          text: 'Dziękuję za pomoc w trudnym okresie rozwodu. Violetta to bardzo wrażliwy lekarz, który pomaga nie tylko przetrwać ból, ale także znaleźć w nim zasoby.',
          rating: 5
        }
      ]
    },
    contact: {
      title: 'Kontakt',
      subtitle: 'Aby umówić się na spotkanie, najlepiej napisać e-mail lub wiadomość na Telegramie.',
      emailLabel: 'Email',
      emailSub: 'Preferowana forma kontaktu',
      tgLabel: 'Telegram',
      phoneLabel: 'Telefon',
      locLabel: 'Lokalizacja',
      faqTitle: 'Częste pytania',
      list: [
        {
          question: "Z jakimi problemami pracujesz?",
          answer: "Pracuję ze stanami lękowymi i depresyjnymi, kryzysami, problemami w relacjach, uzależnieniami, psychosomatyką oraz kwestiami tożsamości."
        },
        {
          question: "Jak umówić się na wizytę?",
          answer: "Najlepiej napisać do mnie na adres e-mail lub skontaktować się przez Telegram."
        },
        {
          question: "Czy pracujesz online?",
          answer: "Tak, prowadzę konsultacje online. Możliwe jest również spotkanie osobiste w Krakowie."
        }
      ]
    },
    footer: {
      rights: 'Wszelkie prawa zastrzeżone.',
      disclaimer: 'Strona ma charakter informacyjny.'
    },
    educationList: EDUCATION_DATA
  }
};

// ==========================================
// 2. CONTEXT
// ==========================================

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  content: SiteContent;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const value = {
    language,
    setLanguage,
    content: CONTENT[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// ==========================================
// 3. COMPONENTS
// ==========================================

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', size = 'md', fullWidth = false, className = '', ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-primary text-white hover:bg-[#4A6359] hover:shadow-lg focus:ring-primary",
    secondary: "bg-accent text-white hover:bg-[#C09060] hover:shadow-lg focus:ring-accent",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary"
  };
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-base", lg: "px-8 py-4 text-lg" };
  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Header ---
const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, content } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { label: content.nav.about, id: SectionId.ABOUT },
    { label: content.nav.methods, id: SectionId.SERVICES },
    { label: content.nav.reviews, id: SectionId.REVIEWS },
    { label: content.nav.contacts, id: SectionId.CONTACT },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 text-2xl font-serif font-bold text-primary cursor-pointer" onClick={() => scrollTo(SectionId.HERO)}>
          <Flower2 size={28} />
          <span>{content.hero.titleName}</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-8">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-dark hover:text-accent transition-colors font-medium">
                {item.label}
              </button>
            ))}
          </nav>
          
          {/* Desktop Language Switcher */}
          <div className="flex items-center gap-2 border-l border-gray-300 pl-6">
            <button onClick={() => setLanguage('ru')} className={`font-medium transition-colors ${language === 'ru' ? 'text-primary font-bold' : 'text-gray-400 hover:text-dark'}`}>RU</button>
            <span className="text-gray-300">|</span>
            <button onClick={() => setLanguage('pl')} className={`font-medium transition-colors ${language === 'pl' ? 'text-primary font-bold' : 'text-gray-400 hover:text-dark'}`}>PL</button>
          </div>
        </div>

        {/* Mobile Header Right Side */}
        <div className="flex items-center gap-4 md:hidden">
            {/* Mobile Language Switcher - ALWAYS VISIBLE */}
            <div className="flex items-center gap-2 text-sm font-medium">
                 <button onClick={() => setLanguage('ru')} className={`${language === 'ru' ? 'text-primary font-bold' : 'text-gray-400'}`}>RU</button>
                 <span className="text-gray-300">|</span>
                 <button onClick={() => setLanguage('pl')} className={`${language === 'pl' ? 'text-primary font-bold' : 'text-gray-400'}`}>PL</button>
            </div>
            
            {/* Mobile Toggle Button */}
            <button className="text-dark" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t p-6 shadow-xl flex flex-col space-y-4 animate-in slide-in-from-top-5 fade-in duration-200">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)} className="text-left text-lg text-dark py-2 border-b border-gray-100">
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

// --- Hero ---
const Hero: React.FC = () => {
  const { content } = useLanguage();
  // Using URL constructor to ensure Vite bundles the asset from root
  const heroImage = new URL('./photo.jpg', import.meta.url).href;

  return (
    <section id={SectionId.HERO} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-secondary/10 rounded-bl-[100px]"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/30 text-primary font-medium text-sm tracking-wider uppercase">
              {content.hero.badge}
            </div>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-dark leading-tight">
              <span className="text-primary">{content.hero.title}</span>{content.hero.subtitle}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
               {content.services.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })} size="lg">
                {content.hero.cta}
              </Button>
              <button onClick={() => document.getElementById(SectionId.ABOUT)?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center font-medium text-dark hover:text-primary transition-colors cursor-pointer bg-transparent border-0">
                {content.hero.aboutBtn}
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-accent"></span>{content.hero.tags.med}</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-accent"></span>{content.hero.tags.jung}</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-accent"></span>{content.hero.tags.lgbt}</div>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto">
               <img src={heroImage} alt={content.hero.role} className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/80 to-transparent p-6 text-white">
                  <p className="font-serif text-xl">{content.hero.titleName}</p>
                  <p className="text-sm opacity-90">{content.hero.role}</p>
               </div>
             </div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-2xl -z-10"></div>
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- About ---
const About: React.FC = () => {
  const [isEducationExpanded, setIsEducationExpanded] = useState(false);
  const { content } = useLanguage();
  const displayedEducation = isEducationExpanded ? content.educationList : content.educationList.slice(0, 3);

  return (
    <section id={SectionId.ABOUT} className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark mb-4">{content.about.title}</h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p className="font-medium text-primary text-xl">{content.about.intro}</p>
              <div className="bg-neutral/50 p-6 rounded-xl text-base border-l-4 border-accent">
                <p className="mb-2 font-bold text-dark">{content.about.expLabel}</p>
                <p>{content.about.experience}</p>
              </div>
              <p className="text-base">{content.about.memberships}</p>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-2">{content.about.featuresLabel}</p>
                <ul className="space-y-2">
                  {content.about.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="text-primary shrink-0" size={18} />
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-neutral p-8 rounded-2xl border border-secondary/20">
              <h3 className="font-serif text-xl font-bold text-dark mb-6 border-b pb-2 border-gray-200">{content.about.eduTitle}</h3>
              <div className="space-y-6">
                {displayedEducation.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-primary/30 animate-in fade-in slide-in-from-left-2 duration-300">
                    <span className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-primary"></span>
                    <p className="text-sm font-bold text-accent mb-1">{edu.year}</p>
                    <p className="font-medium text-dark leading-snug">{edu.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{edu.institution}</p>
                  </div>
                ))}
              </div>
              {content.educationList.length > 3 && (
                <div className="mt-8 text-center">
                  <button onClick={() => setIsEducationExpanded(!isEducationExpanded)} className="inline-flex items-center text-primary font-medium hover:text-accent transition-colors text-sm">
                    {isEducationExpanded ? <>{content.about.eduHide} <ChevronUp size={16} className="ml-1" /></> : <>{content.about.eduShowMore} <ChevronDown size={16} className="ml-1" /></>}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Services ---
const iconMap: Record<string, any> = { Brain: Brain, Layers: Layers, LifeBuoy: LifeBuoy, Flower2: Flower2, Search: Search, Users: Users, Circle: Circle, Activity: Activity };

const Services: React.FC = () => {
  const { content } = useLanguage();
  return (
    <section id={SectionId.SERVICES} className="py-20 bg-neutral/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">{content.services.badge}</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark mb-4">{content.services.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{content.services.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.services.list.map((service) => {
            const Icon = iconMap[service.iconName] || Circle;
            return (
              <div key={service.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 group border border-gray-100">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- Testimonials ---
const Testimonials: React.FC = () => {
  const { content } = useLanguage();
  return (
    <section id={SectionId.REVIEWS} className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark mb-4">{content.reviews.title}</h2>
          <p className="text-gray-600">{content.reviews.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {content.reviews.list.map((review) => (
            <div key={review.id} className="bg-neutral/30 p-8 rounded-2xl relative">
              <Quote className="absolute top-6 right-6 text-accent/20" size={48} />
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} className="fill-accent text-accent" />)}
              </div>
              <p className="text-gray-700 italic mb-6 leading-relaxed text-sm md:text-base">"{review.text}"</p>
              <div className="font-bold text-dark font-serif">{review.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Contact Form ---
const ContactForm: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { content, language } = useLanguage();

  return (
    <section id={SectionId.CONTACT} className="py-20 bg-dark text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">{content.contact.title}</h2>
             <p className="text-gray-300 text-lg">{content.contact.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-accent"><Mail size={24} /></div>
                <div>
                  <h4 className="font-bold mb-1 text-lg">{content.contact.emailLabel}</h4>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-300 hover:text-white transition-colors block text-lg underline underline-offset-4 decoration-accent/50">{CONTACT_INFO.email}</a>
                  <p className="text-sm text-gray-500 mt-1">{content.contact.emailSub}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-accent"><Send size={24} /></div>
                <div>
                  <h4 className="font-bold mb-1 text-lg">{content.contact.tgLabel}</h4>
                  <a href={CONTACT_INFO.telegram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors block text-lg">{CONTACT_INFO.telegramHandle}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-accent"><Phone size={24} /></div>
                <div>
                  <h4 className="font-bold mb-1 text-lg">{content.contact.phoneLabel}</h4>
                  <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="text-gray-300 hover:text-white transition-colors block text-lg">{CONTACT_INFO.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-4 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-accent"><MapPin size={24} /></div>
                <div>
                  <h4 className="font-bold mb-1 text-lg">{content.contact.locLabel}</h4>
                  <p className="text-gray-300 text-lg">{CONTACT_INFO.location[language]}</p>
                </div>
              </div>
            </div>
            {/* FAQ Accordion */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold mb-6 text-accent">{content.contact.faqTitle}</h3>
              {content.contact.list.map((faq, idx) => (
                <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                  <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex justify-between items-center p-5 text-left hover:bg-white/10 transition-colors">
                    <span className="font-medium pr-4">{faq.question}</span>
                    {openFaq === idx ? <ChevronUp size={20} className="text-accent shrink-0" /> : <ChevronDown size={20} className="shrink-0" />}
                  </button>
                  {openFaq === idx && <div className="p-5 pt-0 text-gray-300 text-base leading-relaxed border-t border-white/10 mt-2">{faq.answer}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer: React.FC = () => {
  const { content } = useLanguage();
  return (
    <footer className="bg-[#1A252F] text-white/40 py-8 border-t border-white/5">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Violetta Volgina. {content.footer.rights}</p>
        <p className="text-xs mt-2">{content.footer.disclaimer}</p>
      </div>
    </footer>
  );
};

// --- Telegram Button (Replaces AI) ---
const TelegramFloat: React.FC = () => {
  return (
    <a
      href={CONTACT_INFO.telegram}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#229ED9] text-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      aria-label="Telegram"
    >
      <Send size={28} />
      <span className="absolute right-full mr-4 bg-white text-dark px-3 py-1 rounded-lg text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Telegram
      </span>
    </a>
  );
};

// --- Main App ---
const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen font-sans">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Testimonials />
          <ContactForm />
          <TelegramFloat />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

// --- Mount Application ---
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);