/**
 * datePicker
 * @param {string} Type: datePicker type (datetimerange...)
 * @param {string} Size: datePicker size (mini,small...)
 * @param {boolean} Clearable: can is be empited 
 * @param {string} yesterday,today,theWeek,theMonth: Shortcut to the date selector sidebar,
 *      At present, it is yesterday, today, this week and this month. 
        All four parameters need to be passed,
 *      you can pass null value if you don't need it.
 * @param {array}  defaultTime:  If the date selector is of datetimerange type, 
*        when the default display time, minute and second is required, 
        this parameter will be passed in the form of array, and the default is ["00:00:00", "23:59:59"]
 */
<template>
    <div>
        <el-date-picker
        v-model="value"
        :type="Type"
        :size="Size"
        :clearable="Clearable"
        :range-separator="rangeSeparator"
        :picker-options="pickerOptions(dateString)"
        :start-placeholder="Start"
        :end-placeholder="End"
        align="right"
        :default-time="defaultTime"
        @change="search()"
        ></el-date-picker>
    </div>
</template>
<script>
var that;
export default {
    name: "datePicker",
    props: {
        Type: {
            type: String,
            default: ""
        },
        Size: {
            type: String,
            default: ""
        },
        Clearable: {
            type: Boolean,
            default: true
        },
        rangeSeparator: {
            type: String,
            default: ""
        },
        Start: {
            type: String,
            default: ""
        },
        End: {
            type: String,
            default: ""
        },
        defaultTime: {
            type: Array,
            default() {
                return [];
            }
        },
        dateString: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            startDate: "",
            endDate: "",
            value: "",
            arr: [
                {
                    text: "昨日",
                    onClick(picker) {
                        const date = new Date();
                        const time = date.getTime();
                        const year = date.getFullYear();
                        const month = date.getMonth() + 1;
                        const transTime = date.setTime(time - 3600 * 1000 * 24);
                        const transDate = new Date(transTime);
                        const transDay = transDate.getDate();
                        const start = new Date(`${year}-${month}-${transDay}`);
                        const end = new Date(`${year}-${month}-${transDay},23:59:59`);
                        picker.$emit("pick", [start, end]);
                    }
                },
                {
                    text: "今日",
                    onClick(picker) {
                        const date = new Date();
                        const time = date.getTime();
                        const year = date.getFullYear();
                        const month = date.getMonth() + 1;
                        const day = date.getDate();
                        const start = new Date(`${year}-${month}-${day}`);
                        const end = new Date(`${year}-${month}-${day},23:59:59`);
                        picker.$emit("pick", [start, end]);
                    }
                },
                {
                    text: "本周",
                    onClick(picker) {
                        switch (new Date().getDay()) {
                        case 0: //星期天
                            that.changeTime(6);
                            var start = that.startDate;
                            var end = that.endDate;
                            picker.$emit("pick", [start, end]);
                            break;
                        case 1: //星期一
                            var date = new Date();
                            var time = date.getTime();
                            var year = date.getFullYear();
                            var month = date.getMonth() + 1;
                            var day = date.getDate();
                            var start = new Date(`${year}-${month}-${day}`);
                            var end = new Date(`${year}-${month}-${day},23:59:59`);
                            picker.$emit("pick", [start, end]);
                            break;
                        case 2:
                            that.changeTime(1);
                            var start = that.startDate;
                            var end = that.endDate;
                            picker.$emit("pick", [start, end]);
                            break;
                        case 3: //星期三
                            that.changeTime(2);
                            var start = that.startDate;
                            var end = that.endDate;
                            picker.$emit("pick", [start, end]);
                            break;
                        case 4: //星期四
                            that.changeTime(3);
                            var start = that.startDate;
                            var end = that.endDate;
                            picker.$emit("pick", [start, end]);
                            break;
                        case 5: //星期五
                            that.changeTime(4);
                            var start = that.startDate;
                            var end = that.endDate;
                            picker.$emit("pick", [start, end]);
                            break;
                        case 6: //星期六
                            that.changeTime(5);
                            var start = that.startDate;
                            var end = that.endDate;
                            picker.$emit("pick", [start, end]);
                            break;
                        }
                    }
                },
                {
                    text: "本月",
                    onClick(picker) {
                        that.changeTime(new Date().getDate() - 1);
                        var start = that.startDate;
                        var end = that.endDate;
                        picker.$emit("pick", [start, end]);
                    }
                },
                {
                    text: "过去7天",
                    onClick(picker) {
                        that.changeTime(7);
                        that.changeTime1();
                        var start = that.startDate;
                        var end = that.endDate;
                        picker.$emit("pick", [start, end]);
                    }
                },
                {
                    text: "过去14天",
                    onClick(picker) {
                        that.changeTime(14);
                        that.changeTime1();
                        var start = that.startDate;
                        var end = that.endDate;
                        picker.$emit("pick", [start, end]);
                    }
                },
                {
                    text: "过去30天",
                    onClick(picker) {
                        that.changeTime(30);
                        that.changeTime1();
                        var start = that.startDate;
                        var end = that.endDate;
                        picker.$emit("pick", [start, end]);
                    }
                }
            ]
        };
    },
    created() {
        that = this;
    },
    methods: {
        changeTime(n) {
            const date = new Date();
            const time = date.getTime();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const transTime = date.setTime(time - 3600 * 1000 * 24 * n);
            const transDate = new Date(transTime);
            const transYear = transDate.getFullYear();
            const transMonth = transDate.getMonth() + 1;
            const transDay = transDate.getDate();
            this.startDate = new Date(`${transYear}-${transMonth}-${transDay}`);
            this.endDate = new Date(`${year}-${month}-${day},23:59:59`);
            return this.startDate, this.endDate;
        },
        // 过去7/14/30天调用,复用昨天的逻辑
        changeTime1() {
            const date = new Date();
            const time = date.getTime();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const transTime = date.setTime(time - 3600 * 1000 * 24);
            const transDate = new Date(transTime);
            const transDay = transDate.getDate();
            this.endDate = new Date(`${year}-${month}-${transDay},23:59:59`);
            return this.endDate;
        },
        pickerOptions(dateString) {
            var dateArr = dateString.split(",");
            var pickerOptions = {};
            pickerOptions.shortcuts = [];
            for (var i = 0; i < dateArr.length; i++) {
                for (var j = 0; j < this.arr.length; j++) {
                    if (dateArr[i] === this.arr[j].text) {
                        pickerOptions.shortcuts.push(this.arr[j]);
                    }
                }
            }
            return pickerOptions;
        },
        search() {
            this.$emit("search", this.value);
        },
        clearData() {
            this.value = "";
            this.search();
        }
    }
};
</script>
