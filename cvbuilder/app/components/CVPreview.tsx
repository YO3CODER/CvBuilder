import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from '@/type';
import React, { forwardRef } from 'react'
import Image from 'next/image'
import { BriefcaseBusiness, GraduationCap, Mail, MapPinCheckInside, Phone, Star } from 'lucide-react';

type Props = {
    personalDetails: PersonalDetails;
    file: File | null;
    theme: string;
    experiences: Experience[];
    educations: Education[];
    languages: Language[];
    skills: Skill[];
    hobbies: Hobby[];
    download?: boolean;
    ref?: any;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

const getStarRating = (proficiency: string) => {
    const maxStars = 5;
    let filledStars = 0;

    switch (proficiency) {
        case 'Débutant':
            filledStars = 1;
            break;
        case 'Intermédiaire':
            filledStars = 3;
            break;
        case 'Avancé':
            filledStars = 5;
            break;
        default:
            filledStars = 0;
    }
    return (
        <>
            {Array.from({ length: filledStars }, (_, index) => (
                <Star key={index} className={`text-primary fill-primary`} />
            ))}
            {Array.from({ length: maxStars - filledStars }, (_, index) => (
                <Star key={index + filledStars} className="text-gray-300" />
            ))}
        </>
    );
}

const CVPreview = forwardRef<HTMLDivElement, Props>(({ 
    personalDetails, 
    file, 
    theme, 
    experiences, 
    educations, 
    languages, 
    skills, 
    hobbies, 
    download = false 
}, ref) => {
    return (
        <div 
            ref={ref} 
            className={`
                flex 
                p-16 
                w-[210mm] 
                min-h-[297mm]
                bg-base-100
                shadow-lg 
                ${download ? '' : 'my-8'}
            `} 
            data-theme={theme}
            style={{
                // Pour l'impression, forcer la hauteur exacte
                ...(download && {
                    height: '297mm',
                })
            }}
        >
            <div className='flex flex-col w-1/3'>
                <div className='h-80 rounded-full border-8 overflow-hidden border-primary'>
                    {file && (
                        <Image
                            src={URL.createObjectURL(file)}
                            width={300}
                            height={300}
                            className='w-full h-full rounded-sm object-cover'
                            alt="Picture of the author"
                            onLoadingComplete={() => {
                                if (typeof file !== 'string') {
                                    URL.revokeObjectURL(URL.createObjectURL(file))
                                }
                            }}
                        />
                    )}
                </div>

                <div className='mt-4 flex-col w-full'>
                    <div>
                        <h1 className='uppercase font-bold my-2'>
                            Contact
                        </h1>
                        <ul className='space-y-2'>
                            {personalDetails.phone && (
                                <li className='flex'>
                                    <div className='break-all text-sm relative'>
                                        <div className='ml-8'>
                                            {personalDetails.phone}
                                        </div>
                                        <div className='absolute left-0 top-0'>
                                            <Phone className='w-5 text-primary' />
                                        </div>
                                    </div>
                                </li>
                            )}
                            {personalDetails.email && (
                                <li className='flex'>
                                    <div className='break-all text-sm relative'>
                                        <div className='ml-8'>
                                            {personalDetails.email}
                                        </div>
                                        <div className='absolute left-0 top-0'>
                                            <Mail className='w-5 text-primary' />
                                        </div>
                                    </div>
                                </li>
                            )}
                            {personalDetails.address && (
                                <li className='flex'>
                                    <div className='break-all text-sm relative'>
                                        <div className='ml-8'>
                                            {personalDetails.address}
                                        </div>
                                        <div className='absolute left-0 top-0'>
                                            <MapPinCheckInside className='w-5 text-primary' />
                                        </div>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>

                    {skills.length > 0 && (
                        <div className='mt-6'>
                            <h1 className='uppercase font-bold my-2'>
                                Compétences
                            </h1>
                            <div className='flex flex-wrap gap-2'>
                                {skills.map((skill, index) => (
                                    <p key={index} className='badge badge-primary uppercase'>
                                        {skill.name}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}

                    {languages.length > 0 && (
                        <div className='mt-6'>
                            <h1 className='uppercase font-bold my-2'>
                                Langues
                            </h1>
                            <div className='flex flex-col space-y-2'>
                                {languages.map((lang, index) => (
                                    <div key={index}>
                                        <span className='capitalize font-semibold'>
                                            {lang.language}
                                        </span>
                                        <div className='flex mt-2'>
                                            {getStarRating(lang.proficiency)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {hobbies.length > 0 && (
                        <div className='mt-6'>
                            <h1 className='uppercase font-bold my-2'>
                                Hobbies
                            </h1>
                            <div className='flex flex-col space-y-2'>
                                {hobbies.map((hobby, index) => (
                                    <div key={index}>
                                        <span className='capitalize'>
                                            {hobby.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className='w-2/3 ml-8'>
                <div className='w-full flex flex-col space-y-4'>
                    {personalDetails.fullName && (
                        <h1 className='uppercase text-xl'>
                            {personalDetails.fullName}
                        </h1>
                    )}
                    {personalDetails.postSeeking && (
                        <h2 className='uppercase text-5xl text-primary font-bold'>
                            {personalDetails.postSeeking}
                        </h2>
                    )}
                    {personalDetails.description && (
                        <p className='break-all w-full text-sm'>
                            {personalDetails.description}
                        </p>
                    )}
                </div>

                <section className='w-full h-fit p-5'>
                    {experiences.length > 0 && (
                        <div>
                            <h1 className='uppercase font-bold mb-2'>
                                Expériences
                            </h1>
                            <ul className='steps steps-vertical space-y-3'>
                                {experiences.map((exp, index) => (
                                    <li className='step step-primary' key={index}>
                                        <div className='text-left'>
                                            <h2 className='flex text-md uppercase font-bold'>
                                                <BriefcaseBusiness className='w-5' />
                                                <span className='ml-2'>{exp.jobTitle}</span>
                                            </h2>
                                            <div className='text-sm my-2'>
                                                <span className='badge badge-primary'>
                                                    {exp.companyName}
                                                </span>
                                                <span className='italic ml-2'>
                                                    {formatDate(exp.startDate)} au {formatDate(exp.endDate)}
                                                </span>
                                            </div>
                                            <p className='text-sm'>
                                                {exp.description}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {educations.length > 0 && (
                        <div className='mt-6'>
                            <h1 className='uppercase font-bold mb-2'>
                                Formations
                            </h1>
                            <ul className='steps steps-vertical space-y-3'>
                                {educations.map((edu, index) => (
                                    <li className='step step-primary' key={index}>
                                        <div className='text-left'>
                                            <h2 className='flex text-md uppercase font-bold'>
                                                <GraduationCap className='w-5' />
                                                <span className='ml-2'>{edu.degree}</span>
                                            </h2>
                                            <div className='text-sm my-2'>
                                                <span className='badge badge-primary'>
                                                    {edu.school}
                                                </span>
                                                <span className='italic ml-2'>
                                                    {formatDate(edu.startDate)} au {formatDate(edu.endDate)}
                                                </span>
                                            </div>
                                            <p className='text-sm'>
                                                {edu.description}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
});

CVPreview.displayName = 'CVPreview';

export default CVPreview;