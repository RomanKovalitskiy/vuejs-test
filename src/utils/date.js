import { DateTime } from 'luxon';

const formatDate = (date) => DateTime.fromSQL(date).toLocaleString();

export default {
  formatDate,
};
