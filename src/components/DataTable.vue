<template>
  <table class="data-table">
    <thead>
      <tr>
        <th v-for="key in columns"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }">
          {{ key | humanize | capitalize }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filteredData">
        <td v-for="key in columns">
          {{ entryValueForKey(entry, key) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { has, get, capitalize } from 'lodash'

export default {
  name: "data-table",
  props: {
    data: Array,
    columns: Array,
    filterKey: String,
    initialSortKey: String,
    initialSortKeyOrder: {
      type: Number,
      default: () => 1
    }
  },
  data: function () {
    const sortOrders = {}
    this.columns.forEach((key) => {
      if (this.initialSortKey === key) {
        sortOrders[key] = this.initialSortKeyOrder
      } else {
        sortOrders[key] = 1
      }
    })
    return {
      sortOrders,
      sortKey: this.initialSortKey
    }
  },
  computed: {
    filteredData () {
      let sortKey = this.sortKey
      let filterKey = this.filterKey && this.filterKey.toLowerCase()
      let order = this.sortOrders[sortKey] || 0
      let data = this.data
      if (filterKey) {
        data = data.filter((row) => {
          return Object.keys(row).some((key) => {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort((a, b) => {
          a = get(a, sortKey)
          b = get(b, sortKey)
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    humanize (text) {
      return text.split('.').join(' ')
    },
    capitalize (text) {
      return capitalize(text)
    }
  },
  methods: {
    sortBy (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    entryValueForKey (entry, key) {
      return get(entry, key)
    }
  }
}
</script>

<style lang="scss">

.data-table {
  thead {
    th {
      cursor: pointer;
      padding: 0.5rem 1rem;
    }

    th.active .arrow {
      opacity: 1;
    }
  }
  tbody {
    td {
      padding: 0.25rem;
    }
  }

  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }

  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #2c3e50;
  }

  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #2c3e50;
  }
}
</style>
