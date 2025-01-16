<template>
  <div class="block-list-container">
    <h1>Bitcoin Blocks - devopslite.com</h1>
    <!-- Kiểm tra nếu có blocks và block là một mảng -->
    <div v-if="Array.isArray(blocks) && blocks.length">
      <table class="block-table">
        <thead>
          <tr>
            <th>Hash</th>
            <th>Block Number</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="block in blocks" :key="block.id">
            <td>{{ block.hash }}</td>
            <td>{{ block.number }}</td>
            <!-- Kiểm tra xem timestamp có hợp lệ không trước khi chuyển đổi -->
            <td>{{ formatTimestamp(block.timestamp) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Kiểm tra nếu có 1 block duy nhất -->
    <div v-else-if="blocks && !Array.isArray(blocks)">
      <table class="block-table">
        <thead>
          <tr>
            <th>Hash</th>
            <th>Block Number</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ blocks.hash }}</td>
            <td>{{ blocks.number }}</td>
            <!-- Kiểm tra xem timestamp có hợp lệ không trước khi chuyển đổi -->
            <td>{{ formatTimestamp(blocks.timestamp) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Hiển thị nếu không có block nào -->
    <p v-else>No blocks found.</p>
  </div>
</template>

<script>
import { fetchBlocks } from '../services/api';

export default {
  data() {
    return {
      blocks: null, // Thay vì mảng, bạn có thể khởi tạo là null
    };
  },
  async created() {
    try {
      const blockData = await fetchBlocks();
      // Kiểm tra xem blockData có phải là mảng không, nếu không thì gán vào trực tiếp
      this.blocks = Array.isArray(blockData) ? blockData : blockData; 
      console.log('Fetched block data:', this.blocks); // Debug
    } catch (error) {
      console.error('Failed to fetch blocks:', error);
    }
  },
  methods: {
    formatTimestamp(timestamp) {
      // Kiểm tra xem timestamp có phải là số hợp lệ không
      const date = new Date(parseInt(timestamp));
      if (isNaN(date.getTime())) {
        return 'Invalid date'; // Trả về thông báo nếu timestamp không hợp lệ
      }
      return date.toLocaleString(); // Trả về định dạng ngày giờ hợp lệ
    }
  }
};
</script>

<style scoped>
.block-list-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin-bottom: 20px;
}

.block-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: fixed;
}

.block-table th, .block-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  word-wrap: break-word; /* Giúp ngắt chữ nếu quá dài */
}

.block-table th {
  background-color: #f4f4f4;
  font-weight: bold;
  color: #333;
}

.block-table td {
  background-color: #fff;
  color: #555;
}

.block-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.block-table tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}
</style>
