<template>
  <el-container class="common-layout red-theme">
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <MenuDrawer />
      </el-aside>
      <el-container>
        <el-main>
          <RouterView />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import MenuDrawer from './components/MenuDrawer.vue'
import Header from './components/Header.vue'
</script>
