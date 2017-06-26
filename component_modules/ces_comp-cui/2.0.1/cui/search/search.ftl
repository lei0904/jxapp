<div class="cui-search">
    <div class="cui-searchbar">
        <div class="cui-searchbar-inner">
            <i class="cesui cesui-search" v-show="visible"></i>
            <input
                    ref="input"
                    @click="visible = true"
                    type="search"
                    v-model="currentValue"
                    :placeholder="visible ? placeholder : ''"
                    class="cui-searchbar-core">
        </div>
        <a
                class="cui-searchbar-cancel"
                @click="visible = false, currentValue = ''"
                v-show="visible"
                v-text="cancelText">
        </a>
        <label
                @click="visible = true, $refs.input.focus()"
                class="cui-searchbar-placeholder"
                v-show="!visible">
            <i class="cesui cesui-search"></i>
            <span class="cui-searchbar-text" v-text="placeholder"></span>
        </label>
    </div>
    <div class="cui-search-list" v-show="currentValue">
        <div class="cui-search-list-warp">
            <slot>
                <x-cell v-for="item in result" track-by="$index" :title="item"></x-cell>
            </slot>
        </div>
    </div>
</div>