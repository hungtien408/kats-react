export const getQueryString = (params, filters) => {
  // const {
  //   // Items,
  //   // Sorts,
  //   // TotalCount,
  //   filters,
  //   // Finder,
  //   // Params,
  //   // Ids,
  //   // ...params
  // } = this.props;
  const paramsArray = Object.keys(params)
    .filter((key) => params[key] != null)
    .map((key) => `${key}=${params[key]}`);
  // if (state.List.Sorts.AsQueryString) {
  //   paramsArray.push(state.List.Sorts.AsQueryString);
  // }
  const queryStringFilter = asQueryString(filters);
  if (queryStringFilter) {
    paramsArray.push(queryStringFilter);
  }
  // if (state.List.Finder.AsQueryString) {
  //   paramsArray.push(state.List.Finder.AsQueryString);
  // }
  // if (state.List.Params.AsQueryString) {
  //   paramsArray.push(state.List.Params.AsQueryString);
  // }
  return paramsArray.join('&');
};

const asQueryString = (items) =>
  items
    .filter((x) => x.Value)
    .map((item, index) => {
      const value = Array.isArray(item.Value) ? item.Value.join(',') : item.Value;
      return `Filters[${index}].Field=${item.Field}&Filters[${index}].Operator${item.Operator}&Filters[${index}].Value=${value}`;
    })
    .join('&');
