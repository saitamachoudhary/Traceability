import FilterToolbar from '../common/FilterToolbar';

const E2O_FIELDS = [
  { key: 'customer', optionKey: 'customers', label: 'Customer',     placeholder: 'All Customers' },
  { key: 'projects', optionKey: 'projects',  label: 'Project',      placeholder: 'All Projects'  },
  { key: 'packages', optionKey: 'packages',  label: 'Package Type', placeholder: 'All Packages'  },
];

export default function E2OFilterToolbar({ filters, options, isLoading, updateFilter }) {
  return (
    <FilterToolbar
      filters={filters}
      options={options}
      isLoading={isLoading}
      onChange={updateFilter}
      fields={E2O_FIELDS}
      variant="flex"
    />
  );
}
