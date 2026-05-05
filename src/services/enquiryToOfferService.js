import { callWorkflow } from '../utils/workflowApi';
import { apiClientWithVariable } from '../utils/apiClient';
import { downloadFile } from "../utils/downloadApi";
import { BEARER_TOKEN } from '../config';


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
