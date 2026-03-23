import { PersonalDetails } from '@/type';
import React, { useCallback } from 'react';

type Props = {
  personalDetails: PersonalDetails;
  setPersonalDetails: (pd: PersonalDetails | ((prev: PersonalDetails) => PersonalDetails)) => void;
  setFile: (file: File | null) => void;
};

const PersonalDetailsForm: React.FC<Props> = ({ 
  personalDetails, 
  setPersonalDetails, 
  setFile 
}) => {
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    field: keyof PersonalDetails
  ) => {
    const value = e.target.value;
    setPersonalDetails(prev => ({ ...prev, [field]: value }));
  }, [setPersonalDetails]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  }, [setFile]);

  const inputFields = [
    { name: 'fullName', type: 'text', placeholder: 'Nom complet', component: 'input' },
    { name: 'email', type: 'email', placeholder: 'Email', component: 'input' },
    { name: 'phone', type: 'tel', placeholder: 'Numéro de téléphone', component: 'input' },
    { name: 'address', type: 'text', placeholder: 'Adresse', component: 'input' },
    { name: 'postSeeking', type: 'text', placeholder: 'Poste recherché', component: 'input' },
  ] as const;

  return (
    <div className="flex flex-col gap-4">
      {/* Nom complet */}
      <input
        type="text"
        placeholder="Nom complet"
        value={personalDetails.fullName}
        onChange={(e) => handleChange(e, 'fullName')}
        className="input input-bordered w-full"
        aria-label="Nom complet"
      />

      {/* Email et téléphone */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Email"
          value={personalDetails.email}
          onChange={(e) => handleChange(e, 'email')}
          className="input input-bordered w-full"
          aria-label="Email"
        />
        <input
          type="tel"
          placeholder="Numéro de téléphone"
          value={personalDetails.phone}
          onChange={(e) => handleChange(e, 'phone')}
          className="input input-bordered w-full"
          aria-label="Numéro de téléphone"
        />
      </div>

      {/* Adresse */}
      <input
        type="text"
        placeholder="Adresse"
        value={personalDetails.address}
        onChange={(e) => handleChange(e, 'address')}
        className="input input-bordered w-full"
        aria-label="Adresse"
      />

      {/* Photo de profil */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Photo de profil</span>
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full file-input-primary"
          aria-label="Photo de profil"
        />
      </div>

      {/* Poste recherché */}
      <input
        type="text"
        placeholder="Poste recherché"
        value={personalDetails.postSeeking}
        onChange={(e) => handleChange(e, 'postSeeking')}
        className="input input-bordered w-full"
        aria-label="Poste recherché"
      />

      {/* Description */}
      <textarea
        placeholder="Description de la personne"
        value={personalDetails.description}
        onChange={(e) => handleChange(e, 'description')}
        className="textarea textarea-bordered w-full min-h-[100px]"
        aria-label="Description"
      />
    </div>
  );
};

export default PersonalDetailsForm;