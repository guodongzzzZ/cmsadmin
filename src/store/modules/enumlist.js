const LIST_COLLECTION = {
    addCondition : [
        {label: 'terminal_id', value: 1},
        {label: 'app_version', value: 2},
    ],
    range: [
        {label: '>', value: '>'},
        {label: '<', value: '<'},
        {label: '>=', value: '>='},
        {label: '<=', value: '<='},
        {label: 'in', value: 'in'}
    ],
    // objectModel: [
    //     {label: '苹果', value: 1},
    //     {label: '安卓', value: 2},
    // ],
    status: [
        {label: '运行中', value: 1},
        {label: '已停止', value: 2},
    ],
}

const numberToString = (list, key) => {
    return list.map(item => {
        item._value = String(item[key])
        return item
    })
}

const listToMap = (listCollection) => {
    return Object.keys(listCollection).reduce((pre, next) => {
        const list = listCollection[next]
        const map = list.reduce((p, n) => {
            p[n.value] = n.label
            return p
        }, {})
        pre[next] = map
        return pre
    }, {})
}

const listFormatStrVal = (listCollection) => {
    return Object.keys(listCollection).reduce((pre, next) => {
        const list = listCollection[next]
        pre[next] = numberToString(list, 'value')
        return pre
    }, {})
}
const state = {
    list: listFormatStrVal(LIST_COLLECTION),
    map: listToMap(LIST_COLLECTION),
}

const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}

const actions = {
    
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
