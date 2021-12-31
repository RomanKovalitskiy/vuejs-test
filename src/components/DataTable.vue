<template>
  <div class="data-table">
    <div class="data-table__filter">
      <ui-money v-model="moneyFilter" />
    </div>

    <div class="data-table__content">
      <div class="table-row table-row__desktop-header">
        <div
          v-for="column in columns"
          :key="column.prop"
          :style="{ 'flex-basis' : column.width }"
          class="table-row__cell"
        >
          <b>{{ column.label }}</b>
        </div>
      </div>

      <div
        v-for="row in showRows"
        :key="row.id"
        class="table-row"
      >
        <div
          v-for="column in columns"
          :key="row.id + column.prop"
          :style="{ 'flex-basis' : column.width }"
          class="table-row__cell"
        >
          <b class="table-row__mobile-header">{{ column.label }}</b>
          {{ formatData(column.prop, row[column.prop]) }}
        </div>
      </div>
    </div>

    <div class="data-table__paginator">
      <ui-pagination
        v-model="page"
        :pages="pageCount"
      />
    </div>
  </div>
</template>

<script>
import date from '@/utils/date';
import money from '@/utils/money';

export default {

  name: 'DataTable',

  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    page: 1,
    pageSize: 4,
    moneyFilter: 0,
  }),

  computed: {
    pageCount() {
      return Math.ceil(this.rows.length / this.pageSize);
    },
    showRows() {
      const start = (this.page - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.rowsFilter.slice(start, end);
    },
    rowsFilter() {
      return this.moneyFilter ? this.rows.filter((el) => el.money <= this.moneyFilter) : this.rows;
    },
  },

  methods: {
    formatData(key, value) {
      if (key === 'date') return date.formatDate(value);
      if (key === 'money') return money.formatPrice(value);
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>

.data-table {
  &__filter {
    display: flex;
    justify-content: end;
  }

  &__filter,
  &__content ,
  &__paginator {
    margin-bottom: 1rem;
  }
}

.table-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  &:last-child {
    border-bottom: 1px solid black;
  }

  &__cell {
    display: flex;
    justify-content: center;
    padding: .5rem;
    border: 1px solid black;
    border-right: none;
    border-bottom: none;

    &:last-child {
      border-right: 1px solid black;
    }
  }

  &__desktop-header {
    display: flex;
  }

  &__mobile-header {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .table-row {
    flex-direction: column;
    flex-wrap: wrap;
    border: 1px solid black;
    margin-bottom: 1rem;

    &__cell {
      flex-direction: column;
      justify-content: start;
      flex-basis: 100%;
      border: none;
      padding: .5rem .5rem 0;

      &:last-child {
        border-right: none;
        padding: .5rem;
      }
    }

    &__desktop-header {
      display: none;
    }

    &__mobile-header {
      display: flex;
    }
  }
}
</style>
