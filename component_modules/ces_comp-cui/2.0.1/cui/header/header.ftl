<header
        class="cui-header"
        :class="{ 'is-fixed': fixed }">
    <div class="cui-header-button is-left">
        <slot name="left"></slot>
    </div>
    <h1 class="cui-header-title" v-text="title"></h1>
    <div class="cui-header-button is-right">
        <slot name="right"></slot>
    </div>
</header>