<div class="examsDir">
    <div class="exams-title">专项训练</div>
    <div v-for='(item,index) in list' @click="toExams(item)">
        <div class="special-contnent">
            <div class="special-title">
                <div class="special-item">
                    <span class="special-title-seq">{{index+1}}</span>
                    <span class="special-title-item">{{item.name}}</span>
                </div>
            </div>
            <div class="special-length">{{item.length}}</div>
        </div>
    </div>
</div>