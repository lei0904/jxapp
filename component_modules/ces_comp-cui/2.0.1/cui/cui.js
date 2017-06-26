require('./cui_lib/font/iconfont.css');
require('./cui_lib/indexicon/font.css');
require('./cui_lib/style.css');

var Vue = require('vue');

var Cui = {
    name: 'cui',
    version: '1.0.0'
};

//JS 组件
var Toast = require('./toast/toast.js');
var Indicator = require('./indicator/indicator.js');
var Loadmore = require('./loadmore/loadmore.js');
var InfiniteScroll = require('./infinite-scroll/infinite-scroll.js');
var MessageBox = require('./message-box/message-box.js');
var Actionsheet = require('./actionsheet/actionsheet.js');
var Popup = require('./popup/popup.js');
var Swipe = require('./swipe/swipe.js');
var SwipeItem = require('./swipe/swipe-item.js');
var Lazyload = require('./lazyload/lazyload.js');
var Range = require('./range/range.js');
var Progress = require('./progress/progress.js');
var Picker = require('./picker/picker.js');
var DatetimePicker = require('./datetime-picker/datetime-picker.js');
var AddressPicker = require('./address-picker/address-picker.js');
var IndexList = require('./index-list/index-list.js');
var IndexSection = require('./index-section/index-section.js');

Vue.$toast = Vue.prototype.$toast = Toast;
Cui.Toast = Toast;
Vue.$indicator = Vue.prototype.$indicator = Indicator;
Cui.Indicator = Indicator;
Vue.component(Loadmore.name, Loadmore);
Vue.use(InfiniteScroll);
Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
Cui.MessageBox = MessageBox;
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Popup.name, Popup);
Vue.use(Lazyload, {
    try: 3
});
Vue.component(Range.name, Range);
Vue.component(Progress.name, Progress);
Vue.component(Picker.name, Picker);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(AddressPicker.name, AddressPicker);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);

//CSS 组件
var Header = require('./header/header.js');
var Tabbar = require('./tabbar/tabbar.js');
var Navbar = require('./navbar/navbar.js');
var Button = require('./button/button.js');
var Cell = require('./cell/cell.js');
var CellSwipe = require('./cell-swipe/cell-swipe.js');
var Spinner = require('./spinner/spinner.js');
var TabItem = require('./tab-item/tab-item.js');
var TabContainerItem = require('./tab-container-item/tab-container-item.js');
var TabContainer = require('./tab-container/tab-container.js');
var Search = require('./search/search.js');

Vue.component(Header.name, Header);
Vue.component(Tabbar.name, Tabbar);
Vue.component(Navbar.name, Navbar);
Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);
Vue.component(CellSwipe.name, CellSwipe);
Vue.component(Spinner.name, Spinner);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(Search.name, Search);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);


//FORM 组件
var Switch = require('./switch/switch.js');
var Checklist = require('./checklist/checklist.js');
var Radio = require('./radio/radio.js');
var Field = require('./field/field.js');
var Badge = require('./badge/badge.js');

Vue.component(Switch.name, Switch);
Vue.component(Checklist.name, Checklist);
Vue.component(Radio.name, Radio);
Vue.component(Field.name, Field);
Vue.component(Badge.name, Badge);


module.exports = Cui;
