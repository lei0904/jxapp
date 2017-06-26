module.exports = {
    name: 'cui-index-list',

    template: __inline('index-list.ftl'),

    props: {
        height: Number,
        showIndicator: {
            type: Boolean,
            default: true
        }
    },

    data: function() {
        return {
            sections: [],
            navWidth: 0,
            indicatorTime: null,
            moving: false,
            firstSection: null,
            currentIndicator: '',
            currentHeight: this.height
        };
    },

    methods: {
        handleTouchStart: function(e) {
            if (e.target.tagName !== 'LI') {
                return;
            }
            this.scrollList(e.changedTouches[0].clientY);
            if (this.indicatorTime) {
                clearTimeout(this.indicatorTime);
            }
            this.moving = true;
            window.addEventListener('touchmove', this.handleTouchMove);
            window.addEventListener('touchend', this.handleTouchEnd);
        },

        handleTouchMove: function(e) {
            e.preventDefault();
            this.scrollList(e.changedTouches[0].clientY);
        },

        handleTouchEnd: function() {
            var _this = this;
            this.indicatorTime = setTimeout(function() {
                _this.moving = false;
                _this.currentIndicator = '';
            }, 500);
            window.removeEventListener('touchmove', this.handleTouchMove);
            window.removeEventListener('touchend', this.handleTouchEnd);
        },

        scrollList: function(y) {
            var currentItem = document.elementFromPoint(document.body.clientWidth - 10, y);
            if (!currentItem || !currentItem.classList.contains('cui-indexlist-navitem')) {
                return;
            }
            this.currentIndicator = currentItem.innerText;
            var targets = this.sections.filter(function(section){
                return section.index === currentItem.innerText;
            });
            var targetDOM;
            if (targets.length > 0) {
                targetDOM = targets[0].$el;
                this.$refs.content.scrollTop = targetDOM.getBoundingClientRect().top - this.firstSection.getBoundingClientRect().top;
            }
        }
    },

    mounted: function() {
        if (!this.currentHeight) {
            this.currentHeight = document.documentElement.clientHeight - this.$refs.content.getBoundingClientRect().top;
        }
        var _this = this;
        this.$nextTick(function(){
            _this.navWidth = _this.$refs.nav.clientWidth;
        });
        this.firstSection = this.$refs.content.getElementsByTagName('li')[0];
    }
};