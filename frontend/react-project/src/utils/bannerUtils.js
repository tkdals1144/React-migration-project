export function getNextIndex (idx, total) {
    return (idx + 1) % total;
}

export function getPrevIndex (idx, total) {
    return idx === 0 ? total - 1 : idx - 1;
}