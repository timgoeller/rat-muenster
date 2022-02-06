<script setup lang="ts">
import useSeats from './composables/seats.composable'
const {
  seatMap
} = useSeats();

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

</script>

<template>
<span class="text-3xl mt-6 block font-bold">Rat Münster</span>
    <div class="flex m-4">
        <div class="flex flex-col flex-1 ">
          <div class="flex flex-row justify-center" v-for="currentRow in seatMap">
            <template v-for="currentMember in currentRow">
              <div v-if="currentMember" class="flex-1">
                <div class="h-20 relative bg-gray-100 p-1">
                  <div class="relative w-full h-full border-2 rounded-sm"  :style="{ borderColor: currentMember.color}">
                    <div :style="{ backgroundColor: currentMember.color}" class="absolute w-full h-full top-0 left-0 opacity-10"></div>
                    <div class="flex justify-center items-center h-full overflow-hidden text-ellipsis absolute w-full h-full top-0 left-0">
                      <span class="text-sm truncate line-clamp-2 whitespace-normal font-semibold m-1">{{currentMember?.name}}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="h-20 flex-1">
              </div>
            </template>
          </div>
        </div>
    </div>
</template>

<style>

</style>
