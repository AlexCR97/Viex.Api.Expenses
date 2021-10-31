export function isNull(value: any) {
    return value == undefined || value == null
}

export function notNull(value: any) {
    return value != undefined && value != null
}