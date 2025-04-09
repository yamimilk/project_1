<template>
    <el-container style="height: 100vh;">
      <!-- Sidebar -->
      <el-aside width="200px" style="background-color: #ffffff; border-right: 1px solid #ebeef5;">
        <div style="padding: 20px;">
          <h2 style="font-size: 18px; font-weight: bold; color: #409EFF; margin-bottom: 20px;">
            Component Catalog
          </h2>
          <el-menu
            default-active="$route.path"
            class="el-menu-vertical-demo"
            router
            background-color="#ffffff"
            text-color="#303133"
            active-text-color="#409EFF"
          >
            <el-menu-item index="/chat">ChatWindow</el-menu-item>
            <el-menu-item index="/shopping">ShoppingCart</el-menu-item>
            <el-menu-item index="/lazyImage">LazyImage</el-menu-item>
            <el-menu-item index="/loadingSpinner">LoadingSpinner</el-menu-item>
            <el-menu-item index="/notice">Notice</el-menu-item>
            <el-menu-item index="/tagInput">TagInput</el-menu-item>
            <el-menu-item index="/step">Step</el-menu-item>
            <el-menu-item index="/account">AccountBOOK</el-menu-item>
          </el-menu>
        </div>
      </el-aside>
  
      <!-- Main Content -->
      <el-main style="padding: 24px; overflow-y: auto;">
        <router-view />
      </el-main>
    </el-container>
  </template>
  