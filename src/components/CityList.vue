<template>
    <div v-for="city in savedCities" :key="city.id">
        <CityCard :city="city" @click="goToCityView(city)" />
    </div>

    <p v-if="savedCities.length === 0">
        No locations added. To start tracking a location, search in
        the field above.
    </p>
</template>

<script setup>
import { ref } from 'vue';
import CityCard from './CityCard.vue';
import axios from 'axios';
import { useRouter } from "vue-router";

const savedCities = ref([]);
const getCities = async () => {
    if (localStorage.getItem("savedCities")) {
        savedCities.value = JSON.parse(localStorage.getItem("savedCities"));

        const requests = [];
        savedCities.value.forEach((city) => {
            requests.push(
                axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coodrs.lat}&lon=${city.coodrs.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`)
            );
        });

        const weatherData = await Promise.all(requests);

        await new Promise(res => setTimeout(res, 1000));
        weatherData.forEach((value, index) => {
            savedCities.value[index].weatherData = value.data;
        });
        console.log(savedCities.value[0]);
    }
};

const router = useRouter();
const goToCityView = (city) => {
    router.push({
        name: 'cityView',
        params: {state: city.state, city: city.city },
        query: { id: city.id, lat: city.coodrs.lat, lng: city.coodrs.lng }
    })
}


await getCities();


</script>
