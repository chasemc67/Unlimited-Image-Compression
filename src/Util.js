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

const sumBlock = (matrix, xStart, xEnd, yStart, yEnd, rowLength, yMax) => {
    xEnd = Math.min(xEnd, rowLength);
    yEnd = Math.min(yEnd, yMax);
    const result = {red: 0, green: 0, blue: 0, alpha: 0};
    let count = 0;
    for (let y = yStart; y < yEnd; y += rowLength) {
        for (let x = xStart; x < xEnd; x += 1) {
            const pixel = getPixel(matrix, x, y, rowLength);
            console.log(x, y)
            // console.log(pixel)
            result.red += pixel.red;
            result.green += pixel.green;
            result.blue += pixel.blue;
            result.alpha += pixel.alpha;
            count += 1;
        }
    }
    result.red = result.red / count;
    result.green = result.green / count;
    result.blue = result.blue / count;
    result.alpha = result.alpha / count;
    return result
}

const getPixel = (matrix, x, y, rowLength) => {
    const index = (y * rowLength + x) * 4
    return {red: matrix[index], green: matrix[index + 1], blue: matrix[index + 2], alpha: matrix[index + 3]};
}