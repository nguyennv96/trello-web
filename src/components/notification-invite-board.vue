<script setup>
import { convertTohhmmDDMMYYYY } from '@/utils/date'
import Avatar from './avatar.vue'
import { useStore } from 'vuex'
import notification from '@/utils/el-notification'
const store = useStore()
const props = defineProps(['data'])
const handleResponseInvitation = async (id, status) => {
  try {
    await store.dispatch('invitation/responseInvitation', { inviteId: id, status })
    notification.success('Phải hồi thành công')
  } catch (error) {
    notification.error(
      error?.response?.data?.message || error?.message || 'Phản hồi không thành công',
    )
  }
}
</script>
<template>
  <div class="flex gap-3 text-[#44546f] text-sm hover:bg-gray-200 p-1 rounded-xs cursor-pointer">
    <Avatar
      :width="`36px`"
      :height="`36px`"
      :name="props.data.inviter.displayName"
      :avatar="props.data.inviter.avatar"
    />
    <div v-if="props.data.boardInvitation.status === 'PENDING'">
      <p class="mb-1">
        <b>{{ props.data.inviter.displayName }}</b> đã mời bạn tham gia bảng
        <b>{{ props.data.board.title }}</b>
      </p>
      <p>Lúc {{ convertTohhmmDDMMYYYY(props.data.createdAt) }}</p>
      <button
        @click="() => handleResponseInvitation(props.data._id, 'ACCEPTED')"
        class="bg-blue-600 text-white text-sm rounded-sm p-1.5 mr-1"
      >
        Đồng ý
      </button>
      <button
        @click="() => handleResponseInvitation(props.data._id, 'REJECTED')"
        class="bg-red-400 text-white text-sm rounded-sm p-1.5"
      >
        Từ chối
      </button>
    </div>
    <div v-if="props.data.boardInvitation.status === 'ACCEPTED'">
      <p class="mb-1">
        Bạn đã <span class="text-green-500 font-medium">đồng ý</span> tham gia bảng
        <b>{{ props.data.board.title }}</b> với
        <b>{{ props.data.inviter.displayName }}</b>
      </p>
      <p>Lúc {{ convertTohhmmDDMMYYYY(props.data.createdAt) }}</p>
    </div>
    <div v-if="props.data.boardInvitation.status === 'REJECTED'">
      <p class="mb-1">
        Bạn đã <span class="text-red-500 font-medium">từ chối</span> tham gia bảng
        <b>{{ props.data.board.title }}</b> với
        <b>{{ props.data.inviter.displayName }}</b>
      </p>
      <p>Lúc {{ convertTohhmmDDMMYYYY(props.data.createdAt) }}</p>
    </div>
  </div>
  <div></div>
</template>
<style scoped></style>
