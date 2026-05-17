import { callWorkflow } from '../utils/apiClient';
import { removeEmptyFields } from '../utils/removeEmptyFields';
import { APP_ID } from '../constants/api';
import { WORKFLOWS } from '../constants/workflows';

const O2S = WORKFLOWS.O2S;

const normalizeValue = (value) => {
  if (value === "No Data" || value === null || value === undefined || value === "") {
    return "No Data";
  }
  return value;
};

// ─── KPI ──────────────────────────────────────────────────────────────────────
const fetchKpi = (workflowId, filters, key) =>
  callWorkflow({
    workflowId,
    variable: { date_from: filters?.date_from || "", date_to: filters?.date_to || "" },
  }).then(res => normalizeValue(res?.[key]));

export const getTotalOrders     = (filters) => fetchKpi(O2S.kpi.totalOrders,     filters, 'totalOrder');
export const getTotalOrderValue = (filters) => fetchKpi(O2S.kpi.totalOrderValue, filters, 'totalOrderValue');
export const getAvgLeadTime     = (filters) => fetchKpi(O2S.kpi.avgLeadTime,     filters, 'avgleadtime');
export const getInManufacturing = (filters) => fetchKpi(O2S.kpi.inManufacturing, filters, 'In_manufacturing');
export const getDelivered       = (filters) => fetchKpi(O2S.kpi.delivered,       filters, 'delivered');
export const getOtdRate         = (filters) => fetchKpi(O2S.kpi.otdRate,         filters, 'otd');

// ─── Chart ────────────────────────────────────────────────────────────────────
export const getMonthlySalesChart = (filters) =>
  callWorkflow({
    workflowId: O2S.chart.monthlySales,
    variable: { date_from: filters?.date_from || "", date_to: filters?.date_to || "" },
  });

// ─── Filter options ───────────────────────────────────────────────────────────
export const getO2SProjects = (filters) =>
  callWorkflow({
    workflowId: O2S.filter.projects,
    variable: { customer: filters?.customer || "" },
  }).then(res => res?.resultSet || []);

export const getO2SCustomers = (filters) =>
  callWorkflow({
    workflowId: O2S.filter.customers,
    variable: { project: filters?.projects || "" },
  }).then(res => res?.resultSet || []);

// ─── Table ────────────────────────────────────────────────────────────────────
export const fetchO2STable = (filters) =>
  callWorkflow({
    workflowId: O2S.table.fetch,
    variable: {
      date_to:   filters?.date_to   || "",
      date_from: filters?.date_from || "",
      project:   filters?.projects  || "",
      customer:  filters?.customer  || "",
    },
  });

// ─── CRUD ─────────────────────────────────────────────────────────────────────
export const getO2SEditData = (id) =>
  callWorkflow({
    workflowId: O2S.crud.getForEdit,
    variable: { id_edit_shipment: id },
    raw: true,
  });

export const saveO2SEditData = (id, formValues) => {
  const cleanedData = removeEmptyFields({
    appId: APP_ID,
    oi_month:                                  formValues.oi_month,
    scope_description:                         formValues.scope_description,
    location_hip_hib:                          formValues.location_hip_hib,
    cogsII_fcst_act_comt_tbc:                  formValues.cogsII_fcst_act_comt_tbc,
    raw_material_material_receipt_grn_planned: formValues.raw_material_material_receipt_grn_planned,
    expected_delivery_date:                    formValues.expected_delivery_date,
    bom_planned_days:                          formValues.bom_planned_days,
    pr_planned_days:                           formValues.pr_planned_days,
    manufacturing_planned_days:                formValues.manufacturing_planned_days,
    placement_planned_days:                    formValues.placement_planned_days,
    remarks:                                   formValues.remarks,
  });

  return callWorkflow({
    workflowId: O2S.crud.update,
    data: cleanedData,
    variable: { id_edit_shipment: id },
    raw: true,
  });
};

export const deleteShipmentRow = (id) =>
  callWorkflow({
    workflowId: O2S.crud.delete,
    data: { appId: APP_ID },
    variable: { Id_for_delete_shipment: id },
    raw: true,
  });
