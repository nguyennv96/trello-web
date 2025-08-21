<script setup>
import { getLoading } from '@/utils/el-loading'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'

const props = defineProps(['label', 'value', 'readonly', 'field'])
const value = ref(props.value)
const store = useStore()
watch(
  () => props.value,
  (newVal, oldVal) => {
    value.value = newVal
  },
)
const handleUpdateProfile = async () => {
  console.log('update profile')

  let loading
  try {
    loading = getLoading()
    const currUser = store.state.user.user
    const newUser = { ...currUser, [props.field]: value.value }
    store.dispatch('user/update', newUser)
  } catch (error) {
    notification.error(
      error?.response?.data?.message || error?.message || 'Cập nhật không thành công',
    )
  } finally {
    if (loading) loading.close()
    isShowAction.value = false
  }
}

const isShowAction = ref(false)
</script>
<template>
  <div class="mb-2">
    <label class="font-medium text-sm" for="">{{ props.label }}</label
    ><br />
    <div class="relative">
      <input
        :readonly="props.readonly"
        @focus="isShowAction = true"
        @focusout="
          () => {
            setTimeout(() => {
              isShowAction = false
            }, 100)
          }
        "
        v-model="value"
        type="text"
        class="mt-1 mb-5 px-1 py-1.5 hover:bg-gray-100 focus:border-blue-400 focus:border outline-0 text-sm w-full"
      />
      <div
        class="absolute right-0 top-10"
        :style="{ visibility: isShowAction && !props.readonly ? 'visible' : 'hidden' }"
      >
        <button @click="handleUpdateProfile" class="w-8 h-8 shadow-md text-center">
          <svg
            class="mx-auto"
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
                d="M17.0303 8.78039L8.99993 16.8107L5.4696 13.2804L6.53026 12.2197L8.99993 14.6894L15.9696 7.71973L17.0303 8.78039Z"
                fill="#080341"
              ></path>
            </g>
          </svg>
        </button>
        <button class="w-8 h-8 shadow-md">
          <svg
            class="mx-auto"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g id="Menu / Close_SM">
                <path
                  id="Vector"
                  d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
                  stroke="#44546f"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </g>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
