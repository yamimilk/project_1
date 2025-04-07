<template>
    <div class="flex h-screen bg-gray-100 text-gray-800">
        <!-- sidebar -->
         <aside class="w-64 bg-white shadow-md border-r p-4">
            <h2 class="text-xl font-bold mb-6 text-blue-600">component catalog</h2>
            <ul class="space-y-3">
                <li><router-link class="block px-4 py-2 rounded hover:bg-blue-100" to="/chat">ChatWindow</router-link></li>
                <li><router-link class="block px-4 py-2 rounded hover:bg-blue-100" to="/shopping">ShoppingCart</router-link></li>
                <li><router-link class="block px-4 py-2 rounded hover:bg-blue-100" to="/lazyImage">LazyImage</router-link></li>
                <li><router-link class="block px-4 py-2 rounded hover:bg-blue-100" to="/loadingSpinner">LoadingSpinner</router-link></li>
            </ul>
         </aside>

         <main class="flex-1 p-6 overflow-auto">
                <router-view/>
         </main>
    </div>
</template>