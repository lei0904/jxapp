<div class="success">
     <div class="score">得分:<span>{{score}}</span></div>
     <div class="dis"> 结果: <span v-bind:class="{ 'green': pass, 'red': !pass }">{{dis}}</span></div>
</div>