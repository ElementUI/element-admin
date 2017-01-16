<template>
  <div class="pagination">
    <span class="pagination__info">
      当前 {{ (page - 1) * limit + 1 }} - {{ page * limit }} 条记录
    </span>
    <el-pagination
      :total="count"
      :page-size="10"
      :current-page="page"
      @current-change="emitPageChange"
      @size-change="emitSizeChange"
      layout="total, sizes, prev, pager, next, jumper" />
  </div>
</template>

<script>
  export default {
    name: 'Pagination',

    props: {
      count: Number
    },

    computed: {
      page() {
        return parseInt(this.$route.query.page, 10) || 1;
      },

      limit() {
        return parseInt(this.$route.query.limit, 10) || 10;
      }
    },

    methods: {
      emitPageChange(page) {
        const query = this.$trim(this.$route.query);

        query.page = page;
        this.$router.push({ query });
      },

      emitSizeChange(limit) {
        const query = this.$trim(this.$route.query);

        query.limit = limit;
        this.$router.push({ query });
      }
    }
  };
</script>

<style>
  .pagination {
    display: flex;
    padding: $base-spacing 0 0;
    margin: 12px 0 0;
    align-items: center;

    .el-pagination {
      padding-right: 0;
    }

    &__info {
      flex: 1;
    }
  }
</style>
