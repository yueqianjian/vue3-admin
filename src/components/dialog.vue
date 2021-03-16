<template>
  <el-dialog
    title="提示"
    v-model="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <span>这是一段信息</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, reactive } from "vue";

defineProps({
  msg: String,
});
</script>
