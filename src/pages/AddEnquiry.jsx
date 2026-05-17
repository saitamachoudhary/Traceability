import ProjectFormPage from '../components/common/ProjectFormPage';
import { useSaveEnquiry } from '../hooks/useSaveEnquiry';
import { ENQUIRY_FORM_FIELDS } from '../constants/formSchemas';

export default function AddEnquiry() {
  const { handleSave } = useSaveEnquiry();

  return (
    <ProjectFormPage
      title="Project Details"
      backTo="/e2o"
      backLabel="Back to Enquiry To Offer"
      fields={ENQUIRY_FORM_FIELDS}
      mode="add"
      onSubmit={handleSave}
      submitLabel="Save"
      submittingLabel="Saving..."
    />
  );
}
