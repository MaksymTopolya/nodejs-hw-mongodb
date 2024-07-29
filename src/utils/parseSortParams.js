import { SORT_ORDER } from '../constants/index.js';

function parseSortBy(sortBy) {
  const allowedKeys = ['_id', 'name', 'phoneNumber', 'email', 'contactType', 'isFavourite'];
  return allowedKeys.includes(sortBy) ? sortBy : '_id';
}

function parseSortOrder(sortOrder) {
  return [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder) ? sortOrder : SORT_ORDER.ASC;
}

function parseSortParams(query) {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
}

export { parseSortParams };
