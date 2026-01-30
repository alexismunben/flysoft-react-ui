export const RegularExpressions = {
    email: new RegExp('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?'),
    dateString: new RegExp('^\\d{4}[-]?((((0[13578])|(1[02]))[-]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[-]?(([0-2][0-9])|(30)))|(02[-]?[0-2][0-9]))$'),
    password: ({
       minLength = 0,
       lowerCaseMin = 0,
       upperCaseMin = 0,
       digitsMin = 0,
       specialCharMin = 0
    }) => new RegExp(`^${ lowerCaseMin ? '(?=(.*[a-z]){'+lowerCaseMin+'})' : '' }${ upperCaseMin ? '(?=(.*[A-Z]){'+upperCaseMin+'})' : '' }${ digitsMin ? '(?=(.*\\d){'+digitsMin+'})' : '' }${ specialCharMin ? '(?=(.*[^a-zA-Z0-9]){'+specialCharMin+'})' : '' }([^\\s]){${minLength},}$`)
}
