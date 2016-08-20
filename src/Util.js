export default (matrix, xLength, yLength, numXBlocks, numYBlocks) => {
    const xwidth = Math.ceil(xLength / numXBlocks);
    const ywidth = Math.ceil(yLength / numYBlocks);
    const results = [];
    for (let y = 0; y < numYBlocks; y++) {
        for (let x = 0; x < numXBlocks; x++) {
            const result = sumBlock(matrix, x * xwidth, (x + 1) * xwidth, y * ywidth, (y + 1) * ywidth, xLength, yLength);
            results.push(result);
        }
    }
    return results
}