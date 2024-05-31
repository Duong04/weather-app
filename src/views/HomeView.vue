<template>
  <mai class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input 
      type="text" 
      v-model="searchQuery"
      @input="getSearchResults"
      placeholder="Search for a city or state"
      class="py-2 px-1 w-full bg-transparent border-b transition-colors duration-500 focus:outline-none focus:border-weather-secondary focus:shadow-[0px_1px_0_0_#004e71]" >
      <ul v-if="mapboxSearchResult" class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]">
        <p v-if="searchError">Sorry, something went wrong, please try again.</p>
        <p v-if="!searchError && mapboxSearchResult.length == 0">No results match your query, try a different rerm.</p>
        <tempalte v-else>
          <li v-for="searchResult in mapboxSearchResult" :key="searchResult.id" class="py-2 cursor-pointer">{{ searchResult.properties.full_address }}</li>
        </tempalte>
      </ul>
    </div>
  </mai>
</template>

<script setup>
  import { ref } from 'vue';
  import axios from 'axios';

  const mapboxApiKey = 'pk.eyJ1IjoiZHVvbmcwNCIsImEiOiJjbHd1dWt1dXcwZDN1MmxwejBsd3pkazFzIn0.HFSprFNUNse0Dyxv1DFmjw';
  const searchQuery = ref('');
  const queryTimeout = ref(null);
  const mapboxSearchResult = ref(null);
  const searchError = ref(null);

  const getSearchResults = () => {
    clearTimeout(queryTimeout.value);
    queryTimeout.value = setTimeout(async () => {
      if (searchQuery.value !== '') {
        try {
          const result = await axios.get(`https://api.mapbox.com/search/geocode/v6/forward?q=${searchQuery.value}&access_token=${mapboxApiKey}&types=place`)
          mapboxSearchResult.value = result.data.features;
          console.log(mapboxSearchResult.value);
        } catch {
          searchError.value = true;
        }
        return;
      }
      mapboxSearchResult.value = null;
    }, 300);
  }
</script>