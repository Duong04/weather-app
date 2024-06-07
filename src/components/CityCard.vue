<template>
    <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer">
        <div class="flex flex-col flex-1">
            <h2 class="text-3xl">{{city.city}}</h2>
            <h3>{{city.state}}</h3>
        </div>
        <div class="flex flex-col gap-2">
            <p class="text-3xl self-end">
                {{ Math.round(city.weatherData.current.temp) }}&deg;
            </p>
            <div class="flex gap-2">
                <span class="text-xs">
                    H: {{ Math.round(city.weatherData.current.humidity) }} 
                </span>
                <span class="text-xs">
                    L: {{ Math.round(city.weatherData.current.clouds) }} 
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    city: {
        type: Object,
        default: () => {},
    },
});

</script>
