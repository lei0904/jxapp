<div :class="['cui-spinner-fading-circle circle-color-' + _uid]" :style="{
      width: spinnerSize,
      height: spinnerSize
    }">
<div v-for="n in 12" :class="['is-circle' + (n + 1)]" class="cui-spinner-fading-circle-circle"></div>