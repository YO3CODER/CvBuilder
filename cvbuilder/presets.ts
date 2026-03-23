import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from '@/type';

export const personalDetailsPreset: PersonalDetails = {
    fullName: 'Ouahabou Yelemcoure',
    email: 'ouahabou.dev@gmail.com',
    phone: '+225 01 60 75 99 28',
    address: 'Abidjan, Côte d’Ivoire',
    photoUrl: '/profil.jpeg',
    postSeeking: 'Software Engineer & Tech Entrepreneur',
    description: 'Software Engineer spécialisé dans la création d’applications web modernes et performantes. Expérience en Next Js , Neon , Prisma , Tailwind css , Daysi ui, Clerk , Python  , PHP, Java, React et gestion de bases de données MySQL . J’aime concevoir des solutions pratiques pour les entreprises, notamment dans la gestion, la facturation et les systèmes SaaS.'
};

export const experiencesPreset: Experience[] = [
    {
        id: 'uuid-1',
        jobTitle: 'Développeur Full Stack',
        companyName: 'Projet confidentiel',
        startDate: '2024-01-01',
        endDate: '2025-01-01',
        description: 'Expérience en développement web et applications digitales.'
    },
    {
        id: 'uuid-2',
        jobTitle: 'Développeur Backend',
        companyName: 'Projet web personnel',
        startDate: '2023-01-01',
        endDate: '2024-01-01',
        description: 'Développement backend et gestion de bases de données.'
    }
];
export const educationsPreset: Education[] = [
    {
        id: 'uuid-3',
        degree: 'Licence en Informatique',
        school: 'Institut Universitaire d’Abidjan',
        startDate: '2023-09-01',
        endDate: '2028-06-01',
        description: 'Formation en développement logiciel, bases de données, réseaux et génie logiciel.'
    } , 

    {
    id: 'uuid-4',
    degree: 'JavaScript : la formation ultime',
    school: 'Udemy',
    startDate: '2025-12-01',
    endDate: '2026-03-10',
    description: 'Maîtrise de JavaScript moderne (ES6+).'
} , 


];



export const skillsPreset: Skill[] = [
    { id: 'uuid-4', name: 'Next.js' },
    { id: 'uuid-5', name: 'JavaScript' },
    { id: 'uuid-6', name: 'React.js' },
    { id: 'uuid-7', name: 'PHP' },
    { id: 'uuid-8', name: 'Java' },
    { id: 'uuid-9', name: 'MySQL' } , 
    { id: 'uuid-10', name: 'Python ' }
];

export const languagesPreset: Language[] = [
    { id: 'uuid-10', language: 'Français', proficiency: 'Avancé' },
    { id: 'uuid-11', language: 'Anglais', proficiency: 'Intermédiaire' }
];

export const hobbiesPreset: Hobby[] = [
    { id: 'uuid-12', name: 'Développement de projets' },
    { id: 'uuid-13', name: 'Lecture tech' },
    { id: 'uuid-14', name: 'Apprentissage de nouvelles technologies' }
];