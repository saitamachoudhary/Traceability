export const mapMonthlySalesChart = (resultSet = []) => {
  const sortedData = [...resultSet].sort((a, b) => a[0] - b[0]);

  return {
    categories: sortedData.map(item => item[1]),
    totalOrders: sortedData.map(item => item[2]),
    completedOrders: sortedData.map(item => item[3]),
    monthlySales: sortedData.map(item => item[4])
  };
};
