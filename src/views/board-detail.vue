<script setup>
import Column from '@/components/column.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
console.log(router.currentRoute.value.params)
</script>
<template>
  <div
    class="h-full bg-[url(@/assets/images/bg-board-default.jpg)] bg-cover bg-no-repeat flex flex-col"
  >
    <header class="bg-[#ffffff3d] h-14 py-3 px-2 flex justify-between items-center">
      <!-- left -->
      <div class="flex gap-1">
        <input
          type="text"
          value="Board Name"
          class="bg-[#00000052] text-sm font-semibold text-[#172b4d] px-0.5 rounded-sm focus:border-blue-500 focus:border focus:outline-0"
        />
        <button class="p-2 hover:bg-[#00000029] cursor-pointer rounded-sm">
          <div class="flex">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5zm6 0H4v14h4V5zm2 0v14h4V5h-4zm6 0v14h4V5h-4z"
                  fill="#172b4d"
                ></path>
              </g>
            </svg>
            &nbsp;
            <svg
              fill="#172b4d"
              width="20px"
              height="20px"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <title>down</title>
                <path
                  d="M11.125 16.313l7.688-7.688 3.594 3.719-11.094 11.063-11.313-11.313 3.5-3.531z"
                ></path>
              </g>
            </svg>
          </div>
        </button>
      </div>
      <!-- right -->
      <div class="flex gap-2">
        <button></button>

        <button class="p-2 hover:bg-[#00000029] cursor-pointer">
          <img src="@/assets/images/rocket.svg" alt="" />
        </button>

        <button class="p-2 hover:bg-[#00000029] cursor-pointer">
          <img src="@/assets/images/automation.svg" alt="" />
        </button>
        <button class="p-2 hover:bg-[#00000029] cursor-pointer">
          <img src="@/assets/images/filter.svg" alt="" />
        </button>
        <button class="p-2 hover:bg-[#00000029] cursor-pointer">
          <img src="@/assets/images/star.svg" alt="" />
        </button>
        <button class="p-2 hover:bg-[#00000029] cursor-pointer">
          <img src="@/assets/images/people.svg" alt="" />
        </button>
        <button
          class="p-2 px-3 hover:bg-[rgba(0,0,0,0.6)] hover:text-[rgba(32,85,96,1)] bg-[rgba(32,85,96,1)] cursor-pointer flex justify-between rounded-sm"
        >
          <img src="@/assets/images/add-user.svg" class="mr-2 color-white" alt="" />
          <span class="text-white text-sm">Chia sẻ</span>
        </button>
        <button class="p-2 hover:bg-[#00000029] cursor-pointer">
          <img src="@/assets/images/more.svg" alt="" />
        </button>
      </div>
    </header>
    <div>
      <div class="flex flex-1 gap-8 overflow-x-auto whitespace-nowrap py-3 px-3">
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
