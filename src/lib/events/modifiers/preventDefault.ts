export function preventDefault(fn: Function) {
    return function(event: Event) {
        event.preventDefault()
        fn.call(event)
    };
}
