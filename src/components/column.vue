<script setup></script>
<template>
  <div
    class="bg-[#f1f2f4] shadow-sm rounded-lg w-64 pl-2 pr-1 py-3 flex flex-col flex-1 h-[calc(100vh-49px-56px-48px)]"
  >
    <header class="flex w-60 justify-between mb-2">
      <input
        type="text"
        class="font-semibold text-sm px-0.5 py-1 focus:border-2 focus:border-blue-500 focus:outline-0"
        value="Cấu trúc dự án"
      />
      <button>
        <img src="@/assets/images/more.svg" />
      </button>
    </header>
    <div class="overflow-y-auto flex-1 pr-1">
      <div v-for="i in 10" class="bg-white text-[#44546f] shadow-md flex rounded-md mb-2 gap-1 p-1">
        <button class="self-start">
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
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                fill="#26a653"
              ></path>
            </g>
          </svg>
        </button>
        <p class="text-wrap text-sm font-normal">
          Xác nhận khi xoá (confirm dialog) bbbbbbbbbbbbbbb Xác nhận khi xoá (confirm dialog)
          bbbbbbbbbbbbbbb
        </p>
      </div>
    </div>
    <footer></footer>
  </div>
</template>
<style scoped></style>
