import { useParams } from 'react-router-dom';
import ProjectFormPage from '../components/common/ProjectFormPage';
import { useEditO2S } from '../hooks/useEditO2S';
import { O2S_EDIT_FORM_FIELDS } from '../constants/formSchemas';

export default function EditOrderToShipment() {
  const { id } = useParams();
  const { defaultValues, isFetching, fetchError, handleUpdate } = useEditO2S(id);

  return (
    <ProjectFormPage
      title="Project Details Edit"
      backTo="/o2s"
      backLabel="Back to Order to Shipment"
      fields={O2S_EDIT_FORM_FIELDS}
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
