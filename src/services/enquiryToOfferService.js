import { callWorkflow } from '../utils/apiClient';
import { downloadFile } from '../utils/downloadApi';
import { getToken } from '../utils/auth';
import { removeEmptyFields } from '../utils/removeEmptyFields';
import { APP_ID, CONNECTION_ID, ENDPOINTS } from '../constants/api';
import { WORKFLOWS } from '../constants/workflows';

const E2O = WORKFLOWS.E2O;

const normalizeValue = (value, fallback = 0) => {
  if (value === "No Data" || value === null || value === undefined) return fallback;
  return value;
};

// ─── KPI ──────────────────────────────────────────────────────────────────────
const fetchKpi = (workflowId, filters, key, fallback = 0) =>
  callWorkflow({
    workflowId,
    variable: { date_from: filters?.date_from || "", date_to: filters?.date_to || "" },
  }).then(res => normalizeValue(res?.[key], fallback));

export const getTotalOfferValue     = (filters) => fetchKpi(E2O.kpi.totalOfferValue,     filters, 'totalSum');
export const getTurPackages         = (filters) => fetchKpi(E2O.kpi.turPackages,         filters, 'total_Tur_packages');
export const getDirectAtPackages    = (filters) => fetchKpi(E2O.kpi.directAtPackages,    filters, 'total_DirectAt_packages');
export const getExecutedProjects    = (filters) => fetchKpi(E2O.kpi.executedProjects,    filters, 'total_executed_projects');
export const getNonExecutedProjects = (filters) => fetchKpi(E2O.kpi.nonExecutedProjects, filters, 'total_non_executed_projects');
export const getConversionRate      = (filters) => fetchKpi(E2O.kpi.conversionRate,      filters, 'avg_conversion_rate');

// ─── Chart ────────────────────────────────────────────────────────────────────
export const getConversionChartData = (filters) =>
  callWorkflow({
    workflowId: E2O.chart.conversion,
    variable: { date_from: filters?.date_from || "", date_to: filters?.date_to || "" },
  }).then(res => res?.resultSet || []);

// ─── Filter options ───────────────────────────────────────────────────────────
export const getCustomers = (filters) =>
  callWorkflow({
    workflowId: E2O.filter.customers,
    variable: { projects: filters.projects || "", packages: filters.packages || "" },
  }).then(res => res?.resultSet || []);

export const getProjects = (filters) =>
  callWorkflow({
    workflowId: E2O.filter.projects,
    variable: { customer: filters.customer || "", packages: filters.packages || "" },
  }).then(res => res?.resultSet || []);

export const getPackages = (filters) =>
  callWorkflow({
    workflowId: E2O.filter.packages,
    variable: { customer: filters.customer || "", projects: filters.projects || "" },
  }).then(res => res?.resultSet || []);

// ─── Template ─────────────────────────────────────────────────────────────────
export const downloadTemplate = () =>
  downloadFile({
    data: {
      connectionId: CONNECTION_ID,
      tables: [{
        tableName: "enquiry_to_offer_new",
        columns: [
          "offer_reference_no", "customer", "projects", "plant_rating", "plant_location",
          "enquiry_source", "enquiry_type", "enquiry_category", "packages", "scope",
          "client_enquiry_reference", "client_enq_receipt_date",
          "offer_submission_planned_date", "actual_offer_date", "currency",
          "offer_value", "responsible_sm", "ahpl_offer_status",
          "customer_enquiry_status", "remark",
        ],
      }],
    },
  });

// ─── File preview ─────────────────────────────────────────────────────────────
export const getFilePreview = async (filePath) => {
  const response = await fetch(ENDPOINTS.filePreview, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ data: { file: filePath, limit: 200 } }),
  });

  const result = await response.json();
  return result?.data;
};

// ─── Table ────────────────────────────────────────────────────────────────────
export const fetchEnquiryTable = (filters) =>
  callWorkflow({ workflowId: E2O.table.fetch, variable: filters });

// ─── CRUD ─────────────────────────────────────────────────────────────────────
export const saveEnquiryData = async (formValues) => {
  const cleanedData = removeEmptyFields({
    appId: APP_ID,
    customer:                      formValues.customer,
    projects:                      formValues.projects,
    packages:                      formValues.packages,
    scope:                         formValues.scope,
    enquiry_type:                  formValues.enquiry_type,
    offer_value:                   formValues.offer_value,
    client_enquiry_reference:      formValues.client_enquiry_reference,
    responsible_sm:                formValues.responsible_sm,
    currency:                      formValues.currency,
    offer_reference_no:            formValues.offer_reference_no,
    plant_rating:                  formValues.plant_rating,
    plant_location:                formValues.plant_location,
    enquiry_source:                formValues.enquiry_source,
    enquiry_category:              formValues.enquiry_category,
    offer_submission_planned_date: formValues.offer_submission_planned_date,
    actual_offer_date:             formValues.actual_offer_date,
    conversion_rate:               formValues.conversion_rate,
    ahpl_offer_status:             formValues.ahpl_offer_status,
    customer_enquiry_status:       formValues.customer_enquiry_status,
    backlog_hot:                   formValues.backlog_hot,
    remark:                        formValues.remark,
    client_enq_receipt_date:       formValues.client_enq_receipt_date,
  });

  return callWorkflow({
    workflowId: E2O.crud.save,
    data: cleanedData,
    raw: true,
  });
};

export const deleteEnquiryRow = (id) =>
  callWorkflow({
    workflowId: E2O.crud.delete,
    data: { appId: APP_ID },
    variable: { Id_for_delete_offer: id },
    raw: true,
  });

export const convertToOrder = (id) =>
  callWorkflow({
    workflowId: E2O.crud.convertToOrder,
    data: { appId: APP_ID },
    variable: { convert_to_order_id: id },
    raw: true,
  });

export const saveUploadedDocument = (rowId, documentPath) =>
  callWorkflow({
    workflowId: E2O.crud.attachDoc,
    data: { appId: APP_ID, document: documentPath },
    variable: { project_id_for_doc_insert: rowId },
    raw: true,
  });
