const resetters = new Set<() => void>()

export const registerStoreReset = (reset: () => void) => {
    resetters.add(reset)
}

export const resetAllStores = () => {
    resetters.forEach((reset) => reset())
}