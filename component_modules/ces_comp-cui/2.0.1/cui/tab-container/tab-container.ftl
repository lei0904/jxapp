<div
    @touchstart="startDrag"
    @mousedown="startDrag"
    @touchmove="onDrag"
    @mousemove="onDrag"
    @mouseleave="endDrag"
    @touchend="endDrag"
    class="cui-tab-container">
    <div
      ref="wrap"
      :class="{ 'swipe-transition': swipeLeave }"
      class="cui-tab-container-wrap">
      <slot></slot>
    </div>
  </div>