export const currencyFormat = (value: number): string => {
    return value.toFixed(2).replace(".",",").replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
