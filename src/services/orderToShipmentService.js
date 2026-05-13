import { callWorkflow } from '../utils/workflowAPi';
import { apiClientWithVariable, callWorkflowAPI as apiCallWorkflow } from '../utils/apiClient';
import { removeEmptyFields } from '../utils/removeEmptyFields';

const normalizeValue = (value) => {
  if (value === "No Data" || value === null || value === undefined || value === "") {
    return "No Data";
  }
  return value;
};

export const getTotalOrders = (filters) =>
  callWorkflow({
    workflowId: "16e89f6d-d98f-11f0-a2fd-492a4bd817ab",
    ...filters
  }).then(res => normalizeValue(res?.totalOrder));

export const getTotalOrderValue = (filters) =>
  callWorkflow({
    workflowId: "30c35aef-d99c-11f0-a2fd-61cf4ae95a74",
    ...filters
  }).then(res => normalizeValue(res?.totalOrderValue));

export const getAvgLeadTime = (filters) =>
  callWorkflow({
    workflowId: "d36480e8-d99c-11f0-a2fd-e378ef6d4db7",
    ...filters
  }).then(res => normalizeValue(res?.avgleadtime));

export const getInManufacturing = (filters) =>
  callWorkflow({
    workflowId: "00e2908b-d9a3-11f0-a2fd-ad47815792c8",
    ...filters
  }).then(res => normalizeValue(res?.In_manufacturing));

export const getDelivered = (filters) =>
  callWorkflow({
    workflowId: "2dabaf5d-d9a6-11f0-a2fd-93f7afe35fe0",
    ...filters
  }).then(res => normalizeValue(res?.delivered));

export const getOtdRate = (filters) =>
  callWorkflow({
    workflowId: "047bb5ec-df1c-11f0-a2fd-3bbc828fe82f",
    ...filters
  }).then(res => normalizeValue(res?.otd));

export const getMonthlySalesChart = (filters) =>
  callWorkflow({
    workflowId: "211ff21e-d9a8-11f0-a2fd-cfae3579ded3",
    ...filters
  }).then(res => res);

export const getO2SProjects = (filters) =>
  apiClientWithVariable({
    workflowId: "a637bf0d-4d36-11f1-bc29-2709207ca8aa",
    variable: {
      customer: filters?.customer || ""
    }
  }).then(res => res?.resultSet || []);

export const getO2SCustomers = (filters) =>
  apiClientWithVariable({
    workflowId: "0159415e-4d38-11f1-bc29-77ef2d5279ee",
    variable: {
      project: filters?.projects || ""
    }
  }).then(res => res?.resultSet || []);

export const fetchO2STable = (filters) => {
  return apiClientWithVariable({
    workflowId: "2c80d805-4790-11f1-8e18-dff8866bd8b0",
    variable: {
      date_to: filters?.date_to || "",
      date_from: filters?.date_from || "",
      project: filters?.projects || "",
      customer: filters?.customer || ""
    }
  });
};

export const getO2SEditData = async (id) => {
  return apiCallWorkflow({
    data: {},
    workflowId: "c7b9c5b7-4deb-11f1-bc29-71ebffa79f1c",
    variable: {
      id_edit_shipment: id
    }
  });
};

export const saveO2SEditData = async (id, formValues) => {
  const cleanedData = removeEmptyFields({
    appId: "af853ae1-c513-11f0-8899-af2975f8a698",
    oi_month: formValues.oi_month,
    scope_description: formValues.scope_description,
    location_hip_hib: formValues.location_hip_hib,
    cogsII_fcst_act_comt_tbc: formValues.cogsII_fcst_act_comt_tbc,
    raw_material_material_receipt_grn_planned: formValues.raw_material_material_receipt_grn_planned,
    expected_delivery_date: formValues.expected_delivery_date,
    bom_planned_days: formValues.bom_planned_days,
    pr_planned_days: formValues.pr_planned_days,
    manufacturing_planned_days: formValues.manufacturing_planned_days,
    placement_planned_days: formValues.placement_planned_days,
    remarks: formValues.remarks
  });

  return apiCallWorkflow({
    data: cleanedData,
    workflowId: "2f41f12c-dcb4-11f0-a2fd-b56674ef8b8c",
    variable: {
      id_edit_shipment: id
    }
  });
};
