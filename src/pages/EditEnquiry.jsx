import { useParams } from 'react-router-dom';
import ProjectFormPage from '../components/common/ProjectFormPage';
import { useEditEnquiry } from '../hooks/useEditEnquiry';
import { ENQUIRY_FORM_FIELDS } from '../constants/formSchemas';

export default function EditEnquiry() {
  const { id } = useParams();
  const { defaultValues, isFetching, fetchError, handleUpdate } = useEditEnquiry(id);

  return (
    <ProjectFormPage
      title="Project Details Edit"
      backTo="/e2o"
      backLabel="Back to Enquiry To Offer"
      fields={ENQUIRY_FORM_FIELDS}
      mode="edit"
      defaultValues={defaultValues}
      isFetching={isFetching}
      fetchError={fetchError}
      onSubmit={handleUpdate}
      submitLabel="Save"
      submittingLabel="Updating..."
    />
  );
}
