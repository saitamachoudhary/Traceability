import { callWorkflow } from '../utils/tableAPi';
import { apiClientWithVariable, callWorkflowAPI as apiCallWorkflow } from '../utils/apiClient';
import { downloadFile } from "../utils/downloadApi";
import { BEARER_TOKEN } from '../config';
import { callWorkflowAPI } from "../utils/tableAPi";
import { removeEmptyFields } from '../utils/removeEmptyFields';


const normalizeValue = (value, fallback = 0) => {
  if (value === "No Data" || value === null || value === undefined) {
    return fallback;
  }
  return value;
};

export const getTotalOfferValue = (filters) =>
  callWorkflow({
    workflowId: "dbf3da76-cf50-11f0-8899-d9e4226dd9d5",
    ...filters
  }).then(res => normalizeValue(res?.totalSum, 0));

export const getTurPackages = (filters) =>
  callWorkflow({
    workflowId: "87c96aa9-cf51-11f0-8899-cb8d3876306e",
    ...filters
  }).then(res => normalizeValue(res?.total_Tur_packages, 0));

export const getDirectAtPackages = (filters) =>
  callWorkflow({
    workflowId: "085ee5b0-cf52-11f0-8899-9d96291cf20a",
    ...filters
  }).then(res => normalizeValue(res?.total_DirectAt_packages, 0));

export const getExecutedProjects = (filters) =>
  callWorkflow({
    workflowId: "b7237f77-cf52-11f0-8899-f9ef4e091cce",
    ...filters
  }).then(res => normalizeValue(res?.total_executed_projects, 0));

export const getNonExecutedProjects = (filters) =>
  callWorkflow({
    workflowId: "26f4392e-cf53-11f0-8899-5fac8bbb32f8",
    ...filters
  }).then(res => normalizeValue(res?.total_non_executed_projects, 0));

export const getConversionRate = (filters) =>
  callWorkflow({
    workflowId: "bb48f0d5-cf53-11f0-8899-cf73d391ae59",
    ...filters
  }).then(res => normalizeValue(res?.avg_conversion_rate, 0));

export const getConversionChartData = (filters) =>
  callWorkflow({
    workflowId: "4224252f-cf55-11f0-8899-a7e51d11fe6a",
    ...filters
  }).then(res => res?.resultSet || []);

export const getCustomers = (filters) =>
  apiClientWithVariable({
    workflowId: "b81107b2-d729-11f0-a2fd-cbc6fa243cb8",
    variable: {
      projects: filters.projects || "",
      packages: filters.packages || ""
    }
  }).then(res => res?.resultSet || []);

export const getProjects = (filters) =>
  apiClientWithVariable({
    workflowId: "414bf9e6-d732-11f0-a2fd-79c14edccab5",
    variable: {
      customer: filters.customer || "",
      packages: filters.packages || ""
    }
  }).then(res => res?.resultSet || []);

export const getPackages = (filters) =>
  apiClientWithVariable({
    workflowId: "f14807bb-d73a-11f0-a2fd-2f1759f8d68a",
    variable: {
      customer: filters.customer || "",
      projects: filters.projects || ""
    }
  }).then(res => res?.resultSet || []);

export const downloadTemplate = () => {
  return downloadFile({
    data: {
      connectionId: "af995f25-c513-11f0-8899-bb17b82660ad",
      tables: [
        {
          tableName: "enquiry_to_offer_new",
          columns: [
            "offer_reference_no",
            "customer",
            "projects",
            "plant_rating",
            "plant_location",
            "enquiry_source",
            "enquiry_type",
            "enquiry_category",
            "packages",
            "scope",
            "client_enquiry_reference",
            "client_enq_receipt_date",
            "offer_submission_planned_date",
            "actual_offer_date",
            "currency",
            "offer_value",
            "responsible_sm",
            "ahpl_offer_status",
            "customer_enquiry_status",
            "remark"
          ]
        }
      ]
    }
  });
};

export const getFilePreview = async (filePath) => {
  const PREVIEW_URL = "https://apphub.andritz.com/appsapi/ai/grid";
  const response = await fetch(PREVIEW_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    body: JSON.stringify({
      data: {
        file: filePath,
        limit: 200
      }
    })
  });

  const result = await response.json();
  return result?.data;
};

export const fetchEnquiryTable = (filters) => {
  const WORKFLOW_ID = "6073fef8-446b-11f1-8e18-73bae3646b63";
  return callWorkflowAPI(WORKFLOW_ID, filters);
};

export const saveEnquiryData = async (formValues) => {
  const cleanedData = removeEmptyFields({
    appId: "af853ae1-c513-11f0-8899-af2975f8a698",

    customer: formValues.customer,
    projects: formValues.projects,
    packages: formValues.packages,
    scope: formValues.scope,
    enquiry_type: formValues.enquiry_type,
    offer_value: formValues.offer_value,
    client_enquiry_reference: formValues.client_enquiry_reference,
    responsible_sm: formValues.responsible_sm,
    currency: formValues.currency,
    offer_reference_no: formValues.offer_reference_no,
    plant_rating: formValues.plant_rating,
    plant_location: formValues.plant_location,
    enquiry_source: formValues.enquiry_source,
    enquiry_category: formValues.enquiry_category,
    offer_submission_planned_date: formValues.offer_submission_planned_date,
    actual_offer_date: formValues.actual_offer_date,
    conversion_rate: formValues.conversion_rate,
    ahpl_offer_status: formValues.ahpl_offer_status,
    customer_enquiry_status: formValues.customer_enquiry_status,
    backlog_hot: formValues.backlog_hot,
    remark: formValues.remark,
    client_enq_receipt_date: formValues.client_enq_receipt_date
  });

  return apiCallWorkflow({
    data: cleanedData,
    workflowId: "208c9366-4924-11f1-8e18-b7ca19bb3690"
  });
};

export const deleteEnquiryRow = async (id) => {
  return apiCallWorkflow({
    data: {
      appId: "af853ae1-c513-11f0-8899-af2975f8a698"
    },
    workflowId: "ea799a0d-d211-11f0-bead-af6e54058ecd",
    variable: {
      Id_for_delete_offer: id
    }
  });
};

export const convertToOrder = async (id) => {
  return apiCallWorkflow({
    data: {
      appId: "af853ae1-c513-11f0-8899-af2975f8a698"
    },
    workflowId: "9b875474-491e-11f1-8e18-6f23cecef47a",
    variable: {
      convert_to_order_id: id
    }
  });
};

export const saveUploadedDocument = async (rowId, documentPath) => {
  return apiCallWorkflow({
    workflowId: "ffa146fd-4aa3-11f1-97a8-394b0dd5d7ce",
    variable: {
      project_id_for_doc_insert: rowId
    },
    data: {
      appId: "af853ae1-c513-11f0-8899-af2975f8a698",
      document: documentPath
    }
  });
};
