"use client"
import { Eye, RotateCw, Save, Share2 } from "lucide-react";
import Image from "next/image";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import { useEffect, useRef, useState } from "react";
import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from "@/type";
import { educationsPreset, experiencesPreset, hobbiesPreset, languagesPreset, personalDetailsPreset, skillsPreset } from "@/presets";
import CVPreview from "./components/CVPreview";
import ExperienceForm from "./components/ExperienceForm";
import EducationForm from "./components/EducationForm";
import LanguageForm from "./components/LanguageForm";
import SkillForm from "./components/SkillForm";
import HobbyForm from "./components/HobbyForm";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import confetti from "canvas-confetti"

export default function Home() {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(personalDetailsPreset)
  const [file, setFile] = useState<File | null>(null)
  const [theme, setTheme] = useState<string>('valentine')
  const [zoom, setZoom] = useState<number>(163)
  const [experiences, setExperience] = useState<Experience[]>(experiencesPreset)
  const [educations, setEducations] = useState<Education[]>(educationsPreset)
  const [languages, setLanguages] = useState<Language[]>(languagesPreset)
  const [skills, setSkills] = useState<Skill[]>(skillsPreset)
  const [hobbies, setHobbies] = useState<Hobby[]>(hobbiesPreset);
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const defaultImageUrl = '/profil.jpeg'
    fetch(defaultImageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const defaultFile = new File([blob], "profile.jpg", { type: blob.type })
        setFile(defaultFile)
      })
  }, [])

  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ]

  const handleResetPersonalDetails = () => setPersonalDetails(
    {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      photoUrl: '',
      postSeeking: '',
      description: ''
    }
  )

  const handleResetExperiences = () => setExperience([])
  const handleResetEducations = () => setEducations([])
  const handleResetLanguages = () => setLanguages([])
  const handleResetSkills = () => setSkills([])
  const handleResetHobbies = () => setHobbies([]);

  const cvPreviewRef = useRef(null)

  // Pré-générer le PDF quand le modal s'ouvre
  const handleOpenModal = async () => {
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
      
      // Générer le PDF en arrière-plan
      setIsSharing(true);
      try {
        const element = cvPreviewRef.current;
        if (element) {
          const canvas = await html2canvas(element, {
            scale: 3,
            useCORS: true,
          });
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: 'mm',
            format: "A4"
          });
          
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          
          const blob = pdf.output('blob');
          setPdfBlob(blob);
        }
      } catch (error) {
        console.error('Erreur lors de la pré-génération du PDF:', error);
      } finally {
        setIsSharing(false);
      }
    }
  };

  const handleDownloadPdf = async () => {
    const element = cvPreviewRef.current
    if(element){
      try {
        const canvas = await html2canvas(element , {
          scale : 3,
          useCORS: true,
        })
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF({
          orientation:"portrait",
          unit:'mm',
          format:"A4"
        })
        
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width 
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`cv.pdf`)
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement
        if(modal){
          modal.close()
        }
        confetti({
             particleCount: 100,
             spread: 70 ,
             origin: {y:0.6},
             zIndex:9999
        })
      } catch (error) {
         console.error('Erreur lors de la génération du PDF :', error);
      }
    }
  }

  const handleShare = async () => {
    // Vérifier si le PDF est déjà généré
    let blobToShare = pdfBlob;
    
    if (!blobToShare) {
      setIsSharing(true);
      try {
        const element = cvPreviewRef.current;
        if (!element) throw new Error('Élément non trouvé');
        
        const canvas = await html2canvas(element, {
          scale: 3,
          useCORS: true,
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: 'mm',
          format: "A4"
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        
        blobToShare = pdf.output('blob');
        setPdfBlob(blobToShare);
      } catch (error) {
        console.error('Erreur lors de la génération du PDF:', error);
        alert('Erreur lors de la préparation du CV');
        setIsSharing(false);
        return;
      } finally {
        setIsSharing(false);
      }
    }
    
    // Créer le fichier PDF à partager
    const pdfFile = new File([blobToShare], `CV_${personalDetails.fullName || 'candidat'}.pdf`, { type: 'application/pdf' });
    
    try {
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
        // Partager UNIQUEMENT le fichier PDF, sans texte supplémentaire
        await navigator.share({
          files: [pdfFile]
        });
        
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          zIndex: 9999
        });
        
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
        if (modal) {
          modal.close();
        }
      } else {
        // Fallback pour les navigateurs qui ne supportent pas le partage
        const url = URL.createObjectURL(blobToShare);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CV_${personalDetails.fullName || 'candidat'}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('Votre navigateur ne supporte pas le partage direct. Le CV a été téléchargé.');
      }
    } catch (error) {
      console.error('Erreur lors du partage:', error);
      if (error instanceof Error && error.name !== 'AbortError') {
        alert('Erreur lors du partage du CV. Veuillez réessayer.');
      }
    }
  };

  return (
    <div>
      <div className="hidden lg:block">
        <section className="flex items-center h-screen">

          <div className="w-1/3 h-full p-10 bg-base-200 scrollable no-scrollbar overflow-y-auto">
            <div className="mb-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold italic">
                Ami
                <span className="text-primary">rah</span>
              </h1>
              
              <div className="flex gap-2">
                <button className="btn btn-primary" onClick={handleOpenModal}>
                  Prévisualiser
                  <Eye className="w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-lg">

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Qui êtes-vous ?</h1>
                <button
                  onClick={handleResetPersonalDetails}
                  className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>

              <PersonalDetailsForm
                personalDetails={personalDetails}
                setPersonalDetails={setPersonalDetails}
                setFile={setFile}
              />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Expériences</h1>
                <button
                  onClick={handleResetExperiences}
                  className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>

              <ExperienceForm
                experience={experiences}
                setExperiences={setExperience}
              />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Éducations</h1>
                <button
                  onClick={handleResetEducations}
                  className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>

              <EducationForm
                educations={educations}
                setEducations={setEducations}
              />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Langues</h1>
                <button
                  onClick={handleResetLanguages}
                  className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>

              <LanguageForm
                languages={languages}
                setLanguages={setLanguages}
              />

              <div className="flex justify-between">

                <div className="w-1/2">
                  <div className="flex justify-between items-center">
                    <h1 className="badge badge-primary badge-outline">Compétences</h1>
                    <button
                      onClick={handleResetSkills}
                      className="btn btn-primary btn-sm">
                      <RotateCw className="w-4" />
                    </button>
                  </div>
                  <SkillForm skills={skills} setSkills={setSkills} />
                </div>

                <div className="ml-4 w-1/2">
                  <div className="flex justify-between items-center">
                    <h1 className="badge badge-primary badge-outline">Loisirs</h1>
                    <button
                      onClick={handleResetHobbies}
                      className="btn btn-primary btn-sm">
                      <RotateCw className="w-4" />
                    </button>
                  </div>
                  <HobbyForm hobbies={hobbies} setHobbies={setHobbies} />
                </div>

              </div>

            </div>

          </div>

          <div className="w-2/3 h-full bg-base-100 bg-[url('/file.svg')] bg-cover bg-center scrollable-preview relative overflow-hidden">

            <div className="flex items-center justify-center fixed z-[9999] top-5 right-5">
              <input
                type="range"
                min={50}
                max={200}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="range range-xs range-primary" />
              <p className="ml-4 text-sm text-primary">{zoom}%</p>
            </div>

            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="select select-bordered fixed z-[9999] select-sm top-12 right-5"
            >
              {themes.map((themeName) => (
                <option key={themeName} value={themeName}>
                  {themeName}
                </option>
              ))}
            </select>

            <div
              className="flex justify-center items-center min-h-full"
              style={{
                transform: `scale(${zoom / 200})`,
                transformOrigin: "center center"
              }}
            >
              <CVPreview
                personalDetails={personalDetails}
                file={file}
                theme={theme}
                experiences={experiences}
                educations={educations}
                languages={languages}
                hobbies={hobbies}
                skills={skills}
              />
            </div>

          </div>

        </section>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            <div className="mt-5">
              <div className="flex justify-end mb-5 gap-2">
                <button 
                  onClick={handleShare} 
                  className="btn btn-secondary" 
                  disabled={isSharing}
                >
                  {isSharing ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Préparation...
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 mr-2" />
                      Partager
                    </>
                  )}
                </button>
                <button onClick={handleDownloadPdf} className="btn btn-primary">
                  <Save className='w-4 mr-2' />
                  Télécharger
                </button>
              </div>

              <div className="w-full max-w-full overflow-auto">
                <div className="w-full max-w-full flex justify-center items-center">
                  <CVPreview
                    personalDetails={personalDetails}
                    file={file}
                    theme={theme}
                    experiences={experiences}
                    educations={educations}
                    languages={languages}
                    hobbies={hobbies}
                    skills={skills}
                    download={true}
                    ref={cvPreviewRef}
                  />
                </div>
              </div>

            </div>
          </div>
        </dialog>

      </div>

      <div className="lg:hidden">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-3xl font-bold">Désolé, le CV Builder est uniquement accessible sur ordinateur.</h1>
              <Image
                src="/sad-sorry.gif"
                width={500}
                height={500}
                alt="Picture of the author"
                className="mx-auto my-6"
              />
              <p className="py-6">
                Pour créer et personnaliser votre CV, veuillez utiliser un ordinateur. Nous vous remercions de votre compréhension.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}