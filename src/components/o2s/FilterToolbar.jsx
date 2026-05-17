import FilterToolbar from '../common/FilterToolbar';

const O2S_FIELDS = [
  { key: 'customer', optionKey: 'customers', label: 'Customer', placeholder: 'All Customers' },
  { key: 'projects', optionKey: 'projects',  label: 'Project',  placeholder: 'All Projects'  },
];

export default function O2SFilterToolbar({ filters, options, isLoading, updateFilter }) {
  return (
    <FilterToolbar
      filters={filters}
      options={options}
      isLoading={isLoading}
      onChange={updateFilter}
      fields={O2S_FIELDS}
      variant="fixed"
    />
  );
}
