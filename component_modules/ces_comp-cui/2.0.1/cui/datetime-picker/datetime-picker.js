var picker = require('../picker/picker');
var popup = require('../popup/popup.js');

const FORMAT_MAP = {
    Y: 'year',
    M: 'month',
    D: 'date',
    H: 'hour',
    m: 'minute'
};

module.exports = {
    name: 'cui-datetime-picker',

    template: __inline('datetime-picker.ftl'),

    props: {
        cancelText: {
            type: String,
            default: '取消'
        },
        confirmText: {
            type: String,
            default: '确定'
        },
        type: {
            type: String,
            default: 'datetime'
        },
        startDate: {
            type: Date,
            default: function() {
                return new Date(new Date().getFullYear() - 10, 0, 1);
            }
        },
        endDate: {
            type: Date,
            default: function() {
                return new Date(new Date().getFullYear() + 10, 11, 31);
            }
        },
        startHour: {
            type: Number,
            default: 0
        },
        endHour: {
            type: Number,
            default: 23
        },
        yearFormat: {
            type: String,
            default: '{value}'
        },
        monthFormat: {
            type: String,
            default: '{value}'
        },
        dateFormat: {
            type: String,
            default: '{value}'
        },
        hourFormat: {
            type: String,
            default: '{value}'
        },
        minuteFormat: {
            type: String,
            default: '{value}'
        },
        value: null
    },

    data: function() {
        return {
            visible: false,
            startYear: null,
            endYear: null,
            startMonth: 1,
            endMonth: 12,
            startDay: 1,
            endDay: 31,
            selfTriggered: false,
            isSlotChange: false,
            dateSlots: [],
            shortMonthDates: [],
            longMonthDates: [],
            febDates: [],
            leapFebDates: []
        };
    },

    components: {
        'cui-picker': picker,
        'cui-popup': popup
    },

    methods: {
        open: function() {
            this.$refs['popup'].currentValue = true;
            this.visible = true;
        },

        close: function() {
            this.$refs['popup'].currentValue = false;
            this.visible = false;
        },

        isLeapYear: function(year) {
            return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
        },

        isShortMonth: function(month) {
            return [4, 6, 9, 11].indexOf(month) > -1;
        },

        getTrueValue: function(formattedValue) {
            if (!formattedValue) return;
            while (isNaN(parseInt(formattedValue, 10))) {
                formattedValue = formattedValue.slice(1);
            }
            return parseInt(formattedValue, 10);
        },

        getValue: function(values) {
            var value;
            var _this = this;
            if (_this.type === 'time') {
                value = values.map(function(value) {
                    return ('0' + _this.getTrueValue(value)).slice(-2)
                }).join(':');
            } else {
                var year = this.getTrueValue(values[0]);
                var month = this.getTrueValue(values[1]);
                var date = this.getTrueValue(values[2]);
                var hour = this.typeStr.indexOf('H') > -1 ? this.getTrueValue(values[this.typeStr.indexOf('H')]) : 0;
                var minute = this.typeStr.indexOf('m') > -1 ? this.getTrueValue(values[this.typeStr.indexOf('m')]) : 0;
                value = new Date(year, month - 1, date, hour, minute);
            }
            return value;
        },

        onChange: function(picker) {
            var values = picker.$children.filter(function(item){
                return item.currentValue!==undefined
            }).map(function(item){
                return item.currentValue
            });

            if (this.selfTriggered) {
                this.selfTriggered = false;
                return;
            }
            this.isSlotChange = true;
            var currentValue = this.getValue(values);
            if (this.type.indexOf('date') > -1) {
                if (currentValue.getTime() < this.startDate.getTime()) {
                    this.currentValue = this.startDate;
                    currentValue = this.startDate;
                    this.selfTriggered = true;
                    this.setSlots();
                }
                if (currentValue.getTime() > this.endDate.getTime()) {
                    this.currentValue = this.endDate;
                    currentValue = this.endDate;
                    this.selfTriggered = true;
                    this.setSlots();
                }
                if (this.isShortMonth(this.getTrueValue(values[1]))) {
                    if (this.shortMonthDates.indexOf(values[2]) === -1) {
                        picker.setSlotValue(2, this.dateSlots[2].values[0]);
                        return;
                    }
                    this.dateSlots[2].values = this.shortMonthDates.map(function(item) {
                        return item;
                    });
                } else if (this.getTrueValue(values[1]) === 2) {
                    if (this.isLeapYear(this.getTrueValue(values[0]))) {
                        if (this.leapFebDates.indexOf(values[2]) === -1) {
                            picker.setSlotValue(2, this.dateSlots[2].values[0]);
                            return;
                        }
                        this.dateSlots[2].values = this.leapFebDates.map(function(item) {
                            return item;
                        });
                    } else {
                        if (this.febDates.indexOf(values[2]) === -1) {
                            picker.setSlotValue(2, this.dateSlots[2].values[0]);
                            return;
                        }
                        this.dateSlots[2].values = this.febDates.map(function(item) {
                            return item;
                        });
                    }
                } else {
                    this.dateSlots[2].values = this.longMonthDates.map(function(item) {
                        return item;
                    });
                }
            } else {
                var valueArr = currentValue.split(':');
                var hour = parseInt(valueArr[0], 10);
                var minute = parseInt(valueArr[1], 10);
                if (hour < this.startHour) {
                    this.currentValue = ('0' + this.startHour).slice(-2) + ':' + '0' + minute;
                    currentValue = this.currentValue;
                    this.selfTriggered = true;
                    this.setSlots();
                }
                if (hour > this.endHour) {
                    this.currentValue = ('0' + this.endHour).slice(-2) + ':' + ('0' + minute).slice(-2);
                    currentValue = this.currentValue;
                    this.selfTriggered = true;
                    this.setSlots();
                }
                this.currentValue = currentValue;
                if (this.type.indexOf('date') > -1) {
                    this.rimDetect(this.dateSlots[2].values);
                }
                this.handleValueChange();
            }
        },

        rimDetect: function(monthDates) {
            if (this.currentValue.getFullYear() === this.startDate.getFullYear()) {
                this.trimSlots('start', this.startDate, 1);
                if (this.currentValue.getMonth() === this.startDate.getMonth()) {
                    this.trimSlots('start', this.startDate, 2);
                } else {
                    this.dateSlots[2].values = monthDates.map(function(item) {
                        return item;
                    });
                }
            }
            if (this.currentValue.getFullYear() === this.endDate.getFullYear()) {
                this.trimSlots('end', this.endDate, 1);
                if (this.currentValue.getMonth() === this.endDate.getMonth()) {
                    this.trimSlots('end', this.endDate, 2);
                } else {
                    this.dateSlots[2].values = monthDates.map(function(item) {
                        return item;
                    });
                }
            }
        },

        trimSlots: function(rim, value, index) {
            var arr = [value.getFullYear(), value.getMonth() + 1, value.getDate(), value.getHours(), value.getMinutes()];
            if (rim === 'start') {
                while (this.getTrueValue(this.dateSlots[index].values[0]) < arr[index]) {
                    this.dateSlots[index].values.shift();
                }
            }
            if (rim === 'end') {
                var lastIndex = this.dateSlots[index].values.length - 1;
                while (this.getTrueValue(this.dateSlots[index].values[lastIndex]) > arr[index]) {
                    this.dateSlots[index].values.pop();
                    lastIndex--;
                }
            }
        },

        fillValues: function(type, start, end) {
            var values = [];
            for (var i = start; i <= end; i++) {
                if (i < 10) {
                    values.push(this[FORMAT_MAP[type] + 'Format'].replace('{value}', ('0' + i).slice(-2)));
                } else {
                    values.push(this[FORMAT_MAP[type] + 'Format'].replace('{value}', i));
                }
            }
            return values;
        },

        pushSlots: function(slots, type, start, end) {
            slots.push({
                flex: 1,
                values: this.fillValues(type, start, end)
            });
        },

        generateSlots: function() {
            var dateSlots = [];
            const INTERVAL_MAP = {
                Y: [this.startYear, this.endYear],
                M: [this.startMonth, this.endMonth],
                D: [this.startDay, this.endDay],
                H: [this.startHour, this.endHour],
                m: [0, 59]
            };
            var typesArr = this.typeStr.split('');
            var _this = this;
            typesArr.forEach(function(type) {
                if (INTERVAL_MAP[type]) {
                    _this.pushSlots.apply(null, [dateSlots, type].concat(INTERVAL_MAP[type]));
                }
            });
            if (this.typeStr === 'Hm') {
                dateSlots.splice(1, 0, {
                    divider: true,
                    content: ':'
                });
            }
            this.dateSlots = dateSlots;
        },

        isDateString: function(str) {
            return /\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}/.test(str);
        },

        getYear: function(value) {
            return this.isDateString(value) ? value.split(' ')[0].split('-')[0] : value.getFullYear();
        },

        getMonth: function(value) {
            return this.isDateString(value) ? value.split(' ')[0].split('-')[1] : value.getMonth() + 1;
        },

        getDate: function(value) {
            return this.isDateString(value) ? value.split(' ')[0].split('-')[2] : value.getDate();
        },

        getHour: function(value) {
            if (this.isDateString(value)) {
                const str = value.split(' ')[1] || '00:00:00';
                return str.split(':')[0];
            }
            return value.getHours();
        },

        getMinute: function(value) {
            if (this.isDateString(value)) {
                const str = value.split(' ')[1] || '00:00:00';
                return str.split(':')[1];
            }
            return value.getMinutes();
        },

        setSlots: function() {
            const setSlotValue = this.$refs.picker.setSlotValue;
            if (this.type === 'time' && typeof this.currentValue === 'string') {
                var valueArr = this.currentValue.split(':');
                setSlotValue(0, this.hourFormat.replace('{value}', valueArr[0]));
                setSlotValue(1, this.minuteFormat.replace('{value}', valueArr[1]));
            }
            if (this.type !== 'time' && (({}).toString.call(this.currentValue) === '[object Date]' || this.isDateString(this.currentValue))) {
                var year = this.getYear(this.currentValue);
                var month = this.getMonth(this.currentValue);
                var date = this.getDate(this.currentValue);
                setSlotValue(0, this.yearFormat.replace('{value}', year));
                setSlotValue(1, this.monthFormat.replace('{value}', ('0' + month).slice(-2)));
                setSlotValue(2, this.dateFormat.replace('{value}', ('0' + date).slice(-2)));
                if (this.type === 'datetime') {
                    var hour = this.getHour(this.currentValue);
                    var minute = this.getMinute(this.currentValue);
                    setSlotValue(3, this.hourFormat.replace('{value}', ('0' + hour).slice(-2)));
                    setSlotValue(4, this.minuteFormat.replace('{value}', ('0' + minute).slice(-2)));
                }
            }
        },

        confirm: function() {
            // this.visible = false;
            this.close();
            this.$emit('confirm', this.currentValue);
        },

        translateToDate: function(val) {
            if (Object.prototype.toString.call(val) === '[object Date]') return val;
            return new Date(val.split(/[\-\:/\.]/).join('-'));
        },

        handleRimChange: function() {
            this.startYear = this.startDate.getFullYear();
            this.endYear = this.endDate.getFullYear();
            if (this.startYear === this.endYear) {
                this.startMonth = this.startDate.getMonth() + 1;
                this.endMonth = this.endDate.getMonth() + 1;
                if (this.startMonth === this.endMonth) {
                    this.startDay = this.startDate.getDate();
                    this.endDay = this.endDate.getDate();
                }
            }
            this.generateSlots();
        },

        handleValueChange: function() {
            this.$emit('input', this.currentValue);
        }
    },

    computed: {
        typeStr: function() {
            if (this.type === 'time') {
                return 'Hm';
            } else if (this.type === 'date') {
                return 'YMD';
            } else {
                return 'YMDHm';
            }
        }
    },

    watch: {
        value: function(val) {
            this.currentValue = val;
        },

        startDate: function(val, oldVal) {
            if (!oldVal || val === oldVal || val.getTime() === oldVal.getTime()) return;
            this.handleRimChange();
            if (this.currentValue < this.translateToDate(val)) {
                this.currentValue = val;
            }
            var _this = this;
            this.$nextTick(function() {
                _this.setSlots();
            });
        },

        endDate: function(val, oldVal) {
            if (!oldVal || val === oldVal || val.getTime() === oldVal.getTime()) return;
            this.handleRimChange();
            if (this.currentValue > this.translateToDate(val)) {
                this.currentValue = val;
            }
            var _this = this;
            this.$nextTick(function() {
                _this.setSlots();
            });
        },

        startHour: function() {
            this.generateSlots();
            var _this = this;
            this.$nextTick(function() {
                _this.setSlots();
            });
        },

        endHour: function() {
            this.generateSlots();
            var _this = this;
            this.$nextTick(function() {
                _this.setSlots();
            });
        }
    },

    created: function() {
        for (var i = 1; i <= 28; i++) {
            this.febDates.push(this.dateFormat.replace('{value}', ('0' + i).slice(-2)));
        }
        this.leapFebDates = this.febDates.concat(this.dateFormat.replace('{value}', '29'));
        this.shortMonthDates = this.leapFebDates.concat(this.dateFormat.replace('{value}', '30'));
        this.longMonthDates = this.shortMonthDates.concat(this.dateFormat.replace('{value}', '31'));
        this.handleRimChange();
    },

    mounted: function() {
        this.currentValue = this.value;
        if (!this.value) {
            if (this.type.indexOf('date') > -1) {
                this.currentValue = this.startDate;
                this.trimSlots('start', this.currentValue, 1);
                this.trimSlots('start', this.currentValue, 2);
            } else {
                this.currentValue = ('0' + this.startHour).slice(-2) + ':00';
            }
        }
        this.setSlots();
    }
};