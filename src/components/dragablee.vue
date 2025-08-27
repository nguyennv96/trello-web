<script setup>
import { useDraggable } from '@vue-dnd-kit/core'

const { elementRef, isDragging, handleDragStart } = useDraggable({
  id: 'my-draggable',
})
</script>

<template>
  <div ref="elementRef" :class="{ dragging: isDragging }" @pointerdown="handleDragStart">
    Drag me!
  </div>
</template>

<style scoped>
div {
  padding: 20px;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  cursor: grab;
  user-select: none;
  width: 150px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.dragging {
  opacity: 0.8;
  cursor: grabbing;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
</style>
