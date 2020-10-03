import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  //the underscore changes the items into a lo-dash wrapper. This is necessary so we can just chain together the separate functions.
  return (
    _(items)
      .slice(startIndex)
      .take(pageSize)
      //this last value function gets rid of the lodash wrapper.
      .value()
  );

  // _.slice(items , startIndex)
  // _.take()
}
